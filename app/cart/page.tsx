'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShoppingBag, Trash2, ChevronLeft, Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { useCartStore } from '@/store/cart';
import { checkoutSchema, type CheckoutFormValues } from '@/lib/schemas';
import { formatPrice } from '@/lib/utils';

const LENS_TYPE_LABELS: Record<string, string> = {
  SINGLE_VISION: 'Single Vision', VARIFOCAL: 'Varifocal',
  NON_PRESCRIPTION: 'Non-Rx', FRAME_ONLY: 'Frame Only',
};

export default function CartPage() {
  const { items, removeItem, subtotal } = useCartStore();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  async function onSubmit(values: CheckoutFormValues) {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customerInfo: values }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed');
      window.location.assign(data.url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Checkout failed');
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex flex-col items-center justify-center py-20 px-4 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-200 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Add some frames to get started</p>
          <Link href="/shop" className="bg-brandTeal text-white font-semibold px-7 py-3.5 rounded-full hover:bg-teal-700 transition-colors">
            Browse Glasses
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/shop" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brandTeal mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Continue Shopping
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-10">Your Cart</h1>

          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            {/* Cart items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-5 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-24 h-18 object-cover rounded-xl bg-gray-50 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-brandTeal uppercase tracking-wide">{item.brand}</p>
                    <p className="font-semibold text-gray-900 text-sm mt-0.5">{item.name}</p>
                    {item.prescription && (
                      <div className="mt-2 space-y-0.5 text-xs text-gray-500">
                        <p><span className="font-medium">Lens:</span> {LENS_TYPE_LABELS[item.prescription.lensType]}</p>
                        <p><span className="font-medium">Package:</span> {item.prescription.lensPackage}</p>
                        <p><span className="font-medium">Tint:</span> {item.prescription.lensTint.replace(/_/g, ' ')}</p>
                        {item.prescription.sendLater && <p className="text-amber-600 font-medium">⚠ Prescription to be sent via email</p>}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button onClick={() => removeItem(item.id)} className="p-1.5 text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <p className="font-bold text-gray-900">{formatPrice((item.unitPrice + item.lensPrice) * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout form */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 h-fit">
              <h2 className="font-bold text-gray-900 text-lg mb-6">Order Summary & Checkout</h2>

              <div className="space-y-2 mb-6 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-600">
                    <span className="truncate max-w-[200px]">{item.name}</span>
                    <span>{formatPrice((item.unitPrice + item.lensPrice) * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(subtotal())}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input label="Full Name"     error={errors.customerName?.message}  {...register('customerName')} />
                <Input label="Email"         error={errors.customerEmail?.message} {...register('customerEmail')} type="email" />
                <Input label="Address"       error={errors.line1?.message}         {...register('line1')} />
                <Input label="Address Line 2 (optional)" error={undefined}         {...register('line2')} />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="City"        error={errors.city?.message}          {...register('city')} />
                  <Input label="Postcode"    error={errors.postcode?.message}      {...register('postcode')} />
                </div>

                {error && <p className="text-red-500 text-xs bg-red-50 rounded-lg p-3">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-darkGreen text-white font-bold py-4 rounded-full hover:bg-green-900 disabled:opacity-60 transition-colors"
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  {submitting ? 'Redirecting…' : `Pay ${formatPrice(subtotal())} →`}
                </button>
                <p className="text-xs text-gray-400 text-center">Secure payment via Stripe. Your data is encrypted.</p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

// Small reusable field component
function Input({ label, error, ...props }: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      <input
        {...props}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brandTeal/30 focus:border-brandTeal"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
