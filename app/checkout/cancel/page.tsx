import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function CancelPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Cancelled</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Your payment was cancelled and no charges were made. Your cart items have been saved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/cart" className="bg-brandTeal text-white font-semibold px-7 py-3.5 rounded-full hover:bg-teal-700 transition-colors">
              Return to Cart
            </Link>
            <Link href="/shop" className="border border-gray-200 text-gray-700 font-semibold px-7 py-3.5 rounded-full hover:border-gray-300 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
