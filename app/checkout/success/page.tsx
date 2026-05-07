import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function SuccessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-brandTeal" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Enquiry Received!</h1>
          <p className="text-gray-500 mb-2 leading-relaxed">
            Thank you for your interest. A member of our team will be in touch within 1&ndash;2 business days to confirm your order and arrange payment.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            If you have any questions in the meantime, please don&apos;t hesitate to call or email us directly.
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
