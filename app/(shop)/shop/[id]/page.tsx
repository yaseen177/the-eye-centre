'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { PrescriptionModal } from '@/components/shop/prescription/PrescriptionModal';
import { formatPrice } from '@/lib/utils';

// This page is a client component for the image gallery + modal interactivity.
// Product data is fetched client-side via API route for simplicity.
// Alternatively, move to a Server Component and pass data as props.

async function fetchProduct(id: string) {
  const res = await fetch(`/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  if (!loaded) {
    fetchProduct(id).then((p) => {
      setProduct(p);
      setLoaded(true);
    });
  }

  if (loaded && !product) notFound();
  if (!loaded || !product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-gray-400 animate-pulse">Loading…</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/shop" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brandTeal mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100">
                {product.images?.[selectedImage] && (
                  <Image src={product.images[selectedImage]} alt={product.name} fill className="object-cover" />
                )}
              </div>
              {product.images?.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((src: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${i === selectedImage ? 'border-brandTeal' : 'border-transparent'}`}
                    >
                      <Image src={src} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <p className="text-brandTeal font-bold text-xs tracking-widest uppercase mb-1">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-gray-900 mb-6">{formatPrice(product.price)}</p>
              {product.description && (
                <p className="text-gray-500 leading-relaxed mb-8">{product.description}</p>
              )}
              <div className="flex flex-wrap gap-3 mb-8 text-sm text-gray-500">
                {product.color    && <span className="bg-gray-100 rounded-full px-3 py-1.5 font-medium">🎨 {product.color}</span>}
                {product.material && <span className="bg-gray-100 rounded-full px-3 py-1.5 font-medium">✦ {product.material}</span>}
                {product.shape    && <span className="bg-gray-100 rounded-full px-3 py-1.5 font-medium capitalize">{product.shape.toLowerCase().replace('_', ' ')}</span>}
              </div>

              {product.inStock ? (
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-brandTeal text-white font-bold py-4 rounded-full hover:bg-teal-700 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart — {formatPrice(product.price)}
                </button>
              ) : (
                <div className="w-full py-4 rounded-full bg-gray-100 text-center text-gray-500 font-semibold">
                  Out of Stock
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
      {product && <PrescriptionModal product={product} isOpen={modalOpen} onClose={() => setModalOpen(false)} />}
    </>
  );
}
