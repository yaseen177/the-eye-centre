import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ShoppingBag, Package, Image as ImageIcon, DollarSign } from 'lucide-react';

async function getStats() {
  const [orderCount, productCount, galleryCount, revenue] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.galleryImage.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: 'CANCELLED' } },
    }),
  ]);
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });
  return { orderCount, productCount, galleryCount, revenue: revenue._sum.total ?? 0, recentOrders };
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  const { orderCount, productCount, galleryCount, revenue, recentOrders } = await getStats();

  const stats = [
    { label: 'Total Orders', value: orderCount, icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
    { label: 'Products', value: productCount, icon: Package, color: 'bg-teal-50 text-brandTeal' },
    { label: 'Gallery Images', value: galleryCount, icon: ImageIcon, color: 'bg-purple-50 text-purple-600' },
    { label: 'Revenue', value: `£${revenue.toFixed(2)}`, icon: DollarSign, color: 'bg-green-50 text-green-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, {session?.user?.name ?? 'Admin'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {recentOrders.length === 0 ? (
            <p className="p-6 text-sm text-gray-400 text-center">No orders yet.</p>
          ) : (
            recentOrders.map((order) => (
              <div key={order.id} className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.guestName ?? 'Customer'}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{order.guestEmail} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">£{order.total.toFixed(2)}</p>
                  <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-medium mt-1 ${
                    order.status === 'DELIVERED' ? 'bg-green-50 text-green-700' :
                    order.status === 'CANCELLED' ? 'bg-red-50 text-red-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
