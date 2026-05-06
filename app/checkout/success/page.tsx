import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ClearCartOnMount } from '@/components/shop/ClearCartOnMount';

export default function SuccessPage() {
  return (
    <>
      <Header />
      <ClearCartOnMount />
      <main className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-brandTeal" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
          <p className="text-gray-500 mb-2 leading-relaxed">
            Thank you for your order. We&apos;ve received your payment and will begin processing your glasses right away.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            You&apos;ll receive a confirmation email shortly. If you chose to send your prescription later, please check your email for instructions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop" className="bg-brandTeal text-white font-semibold px-7 py-3.5 rounded-full hover:bg-teal-700 transition-colors">
              Continue Shopping
            </Link>
            <Link href="/" className="border border-gray-200 text-gray-700 font-semibold px-7 py-3.5 rounded-full hover:border-gray-300 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
