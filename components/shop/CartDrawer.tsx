'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

const LENS_TYPE_LABELS: Record<string, string> = {
  SINGLE_VISION:    'Single Vision',
  VARIFOCAL:        'Varifocal',
  NON_PRESCRIPTION: 'Non-Rx',
  FRAME_ONLY:       'Frame Only',
};

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, subtotal } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brandTeal" />
                <span className="font-bold text-gray-900">Your Cart ({items.length})</span>
              </div>
              <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-gray-200 mb-4" />
                  <p className="text-gray-500 font-medium mb-1">Your cart is empty</p>
                  <p className="text-sm text-gray-400 mb-6">Find the perfect frames in our shop</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="bg-brandTeal text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-teal-700 transition-colors"
                  >
                    Browse Glasses
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-gray-50 rounded-2xl p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-14 object-cover rounded-xl bg-white shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 font-medium">{item.brand}</p>
                      <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                      {item.prescription && (
                        <div className="flex gap-1.5 mt-1 flex-wrap">
                          <span className="text-[10px] bg-brandTeal/10 text-brandTeal font-semibold px-2 py-0.5 rounded-full">
                            {LENS_TYPE_LABELS[item.prescription.lensType]}
                          </span>
                          {item.prescription.lensPackage && item.prescription.lensPackage !== 'BRONZE' && (
                            <span className="text-[10px] bg-gold/10 text-yellow-700 font-semibold px-2 py-0.5 rounded-full">
                              {item.prescription.lensPackage}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <p className="font-bold text-gray-900 text-sm">
                          {formatPrice((item.unitPrice + item.lensPrice) * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900 text-lg">{formatPrice(subtotal())}</span>
                </div>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex items-center justify-center w-full bg-darkGreen text-white font-bold text-sm py-4 rounded-full hover:bg-green-900 transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-sm text-gray-500 mt-3 hover:text-gray-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
