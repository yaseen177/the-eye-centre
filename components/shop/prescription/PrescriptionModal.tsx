'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft } from 'lucide-react';
import type { Product } from '@/types';
import { LENS_PACKAGE_PRICES, LENS_TINT_PRICES } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { defaultFormData } from './types';
import type { PrescriptionFormData } from './types';
import { StepUsage } from './StepUsage';
import { StepPrescription } from './StepPrescription';
import { StepPD } from './StepPD';
import { StepLenses } from './StepLenses';
import { StepCoatings } from './StepCoatings';

interface Props {
  product: Pick<Product, 'id' | 'name' | 'brand' | 'price' | 'images'>;
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  { label: 'Usage',        num: 1 },
  { label: 'Prescription', num: 2 },
  { label: 'PD',           num: 3 },
  { label: 'Lenses',       num: 4 },
  { label: 'Coatings',     num: 5 },
];

function stepTitle(step: number) {
  return ['Select Lens Type', 'Enter Your Prescription', 'Pupillary Distance', 'Choose Lens Package', 'Tints & Coatings'][step - 1];
}

export function PrescriptionModal({ product, isOpen, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<PrescriptionFormData>(defaultFormData);
  const { addItem, openCart } = useCartStore();

  function handleChange(partial: Partial<PrescriptionFormData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  function next() {
    // Frame Only: skip steps 2, 3, 4 — jump straight to coatings
    if (step === 1 && data.lensType === 'FRAME_ONLY') { setStep(5); return; }
    if (step < 5) setStep((s) => s + 1);
  }

  function back() {
    if (step === 5 && data.lensType === 'FRAME_ONLY') { setStep(1); return; }
    if (step > 1) setStep((s) => s - 1);
  }

  function addToCart() {
    addItem(
      {
        id: product.id,
        name: product.name,
        brand: product.brand,
        image: product.images[0] ?? '',
        price: product.price,
      },
      {
        lensType:    data.lensType,
        sendLater:   data.sendLater,
        rightSph:    parseFloat(data.rightSph)  || undefined,
        rightCyl:    parseFloat(data.rightCyl)  || undefined,
        rightAxis:   parseInt(data.rightAxis)   || undefined,
        rightAdd:    parseFloat(data.rightAdd)  || undefined,
        leftSph:     parseFloat(data.leftSph)   || undefined,
        leftCyl:     parseFloat(data.leftCyl)   || undefined,
        leftAxis:    parseInt(data.leftAxis)    || undefined,
        leftAdd:     parseFloat(data.leftAdd)   || undefined,
        pdSingle:    data.pdMode === 'single' ? parseFloat(data.pdSingle) || undefined : undefined,
        pdRight:     data.pdMode === 'dual'   ? parseFloat(data.pdRight)  || undefined : undefined,
        pdLeft:      data.pdMode === 'dual'   ? parseFloat(data.pdLeft)   || undefined : undefined,
        lensPackage: data.lensPackage,
        lensTint:    data.lensTint,
      },
    );
    openCart();
    onClose();
    setStep(1);
    setData(defaultFormData);
  }

  const totalLensPrice = LENS_PACKAGE_PRICES[data.lensPackage] + LENS_TINT_PRICES[data.lensTint];
  const totalPrice = product.price + totalLensPrice;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-4 top-[5%] bottom-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[520px] z-50 bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <div>
                <p className="text-xs text-gray-400 font-medium">Configuring lenses for</p>
                <p className="font-semibold text-gray-900 text-sm truncate max-w-[240px]">{product.brand} {product.name}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="px-6 pt-4 shrink-0">
              <div className="flex gap-1">
                {STEPS.map((s) => (
                  <div
                    key={s.num}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${s.num <= step ? 'bg-brandTeal' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-gray-400">Step {step} of 5</p>
                <p className="text-sm font-bold text-gray-900">{stepTitle(step)}</p>
              </div>
            </div>

            {/* Step content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {step === 1 && <StepUsage data={data} onChange={handleChange} />}
                  {step === 2 && <StepPrescription data={data} onChange={handleChange} />}
                  {step === 3 && <StepPD data={data} onChange={handleChange} />}
                  {step === 4 && <StepLenses data={data} onChange={handleChange} />}
                  {step === 5 && <StepCoatings data={data} onChange={handleChange} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 shrink-0">
              {/* Price summary */}
              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="text-gray-500">Total</span>
                <div className="text-right">
                  <span className="font-bold text-gray-900">{formatPrice(totalPrice)}</span>
                  {totalLensPrice > 0 && (
                    <p className="text-xs text-gray-400">
                      {formatPrice(product.price)} frame + {formatPrice(totalLensPrice)} lenses
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                {step > 1 && (
                  <button
                    onClick={back}
                    className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors px-3"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                )}
                {step < 5 ? (
                  <button
                    onClick={next}
                    className="flex-1 bg-brandTeal text-white font-semibold text-sm py-3.5 rounded-full hover:bg-teal-700 transition-colors"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={addToCart}
                    className="flex-1 bg-darkGreen text-white font-semibold text-sm py-3.5 rounded-full hover:bg-green-900 transition-colors"
                  >
                    Add to Cart — {formatPrice(totalPrice)}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
