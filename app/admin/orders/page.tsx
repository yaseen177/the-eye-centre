import { prisma } from '@/lib/prisma';
import { OrderManager } from '@/components/admin/OrderManager';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });

  const serialized = orders.map((o) => ({
    ...o,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 mt-1">{orders.length} total order{orders.length !== 1 ? 's' : ''}</p>
      </div>
      <OrderManager initialOrders={serialized} />
    </div>
  );
}
