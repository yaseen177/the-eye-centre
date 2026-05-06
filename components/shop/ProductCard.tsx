'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { PrescriptionModal } from './prescription/PrescriptionModal';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
        <Link href={`/shop/${product.slug}`} className="block relative aspect-[4/3] bg-gray-50 overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-300 text-4xl">👓</div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full">Out of Stock</span>
            </div>
          )}
        </Link>

        <div className="p-4 flex flex-col flex-1">
          <p className="text-xs font-semibold text-brandTeal uppercase tracking-wide">{product.brand}</p>
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-semibold text-gray-900 text-sm mt-0.5 mb-3 hover:text-brandTeal transition-colors line-clamp-2">{product.name}</h3>
          </Link>
          <div className="mt-auto flex items-center justify-between gap-3">
            <p className="font-bold text-gray-900">{formatPrice(product.price)}</p>
            <button
              onClick={() => setModalOpen(true)}
              disabled={!product.inStock}
              className="flex items-center gap-1.5 bg-brandTeal text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <PrescriptionModal product={product} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
