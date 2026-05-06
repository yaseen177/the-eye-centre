'use client';

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

const STATUS_OPTIONS = [
  'PENDING',
  'PROCESSING',
  'LENSES_BEING_FITTED',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
] as const;

type OrderStatus = typeof STATUS_OPTIONS[number];

interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: string;
  guestName: string | null;
  guestEmail: string | null;
  status: OrderStatus;
  total: number;
  subtotal: number;
  createdAt: string;
  items: OrderItem[];
}

interface Props {
  initialOrders: Order[];
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING:             'bg-gray-100 text-gray-700',
  PROCESSING:          'bg-amber-50 text-amber-700',
  LENSES_BEING_FITTED: 'bg-blue-50 text-blue-700',
  SHIPPED:             'bg-purple-50 text-purple-700',
  DELIVERED:           'bg-green-50 text-green-700',
  CANCELLED:           'bg-red-50 text-red-700',
};

function formatStatus(status: OrderStatus) {
  return status.replace(/_/g, ' ').charAt(0) + status.replace(/_/g, ' ').slice(1).toLowerCase();
}

export function OrderManager({ initialOrders }: Props) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function handleStatusChange(orderId: string, status: OrderStatus) {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status } : o))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
        <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-400 text-sm">No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
            <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
            <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50/50">
              <td className="px-6 py-4">
                <p className="font-medium text-gray-900">{order.guestName ?? 'Customer'}</p>
                <p className="text-xs text-gray-400 mt-0.5">{order.guestEmail}</p>
                <p className="text-xs text-gray-400">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
              </td>
              <td className="px-4 py-4 text-gray-500 hidden sm:table-cell">
                {new Date(order.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'short', year: 'numeric',
                })}
              </td>
              <td className="px-4 py-4 font-semibold text-gray-900">£{order.total.toFixed(2)}</td>
              <td className="px-4 py-4">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                  disabled={updatingId === order.id}
                  className={`text-xs font-medium px-2.5 py-1.5 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brandTeal disabled:opacity-50 ${STATUS_COLORS[order.status]}`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{formatStatus(s)}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
