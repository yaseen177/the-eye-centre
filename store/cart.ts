'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, PrescriptionData } from '@/types';
import { LENS_PACKAGE_PRICES, LENS_TINT_PRICES } from '@/types';
function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (
    product: { id: string; name: string; brand: string; image: string; price: number },
    prescription?: PrescriptionData,
  ) => void;
  removeItem: (cartItemId: string) => void;
  updateQty: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

function lensPrice(prescription?: PrescriptionData): number {
  if (!prescription) return 0;
  if (prescription.lensType === 'FRAME_ONLY' || prescription.lensType === 'NON_PRESCRIPTION') return 0;
  return (
    LENS_PACKAGE_PRICES[prescription.lensPackage] +
    LENS_TINT_PRICES[prescription.lensTint]
  );
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, prescription) => {
        const newItem: CartItem = {
          id: randomId(),
          productId: product.id,
          name: product.name,
          brand: product.brand,
          image: product.image,
          unitPrice: product.price,
          lensPrice: lensPrice(prescription),
          quantity: 1,
          prescription,
        };
        set((s) => ({ items: [...s.items, newItem], isOpen: true }));
      },

      removeItem: (cartItemId) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== cartItemId) })),

      updateQty: (cartItemId, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.id !== cartItemId)
              : s.items.map((i) => (i.id === cartItemId ? { ...i, quantity: qty } : i)),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      itemCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((acc, i) => acc + (i.unitPrice + i.lensPrice) * i.quantity, 0),
    }),
    { name: 'tec-cart' },
  ),
);
