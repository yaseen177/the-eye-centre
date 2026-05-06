'use client';

import type { LensPackage } from '@/types';
import { LENS_PACKAGE_PRICES } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Check } from 'lucide-react';
import type { PrescriptionFormData } from './types';

const PACKAGES: {
  value: LensPackage;
  label: string;
  tag?: string;
  features: string[];
}[] = [
  {
    value: 'BRONZE',
    label: 'Bronze',
    features: ['Standard single vision', 'Hard coat included', 'UV protection'],
  },
  {
    value: 'SILVER',
    label: 'Silver',
    tag: 'Popular',
    features: ['All Bronze features', 'Anti-reflective coating', 'Scratch resistant'],
  },
  {
    value: 'GOLD',
    label: 'Gold',
    features: ['All Silver features', 'Thinner 1.6 index lenses', 'Easy-clean coating'],
  },
  {
    value: 'PLATINUM',
    label: 'Platinum',
    tag: 'Best',
    features: ['All Gold features', 'Ultra-thin 1.74 index', 'Premium anti-reflective', 'Free tint upgrade'],
  },
];

interface Props {
  data: PrescriptionFormData;
  onChange: (data: Partial<PrescriptionFormData>) => void;
}

export function StepLenses({ data, onChange }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-4">Choose the lens quality for your glasses.</p>
      {PACKAGES.map((pkg) => {
        const price = LENS_PACKAGE_PRICES[pkg.value];
        const selected = data.lensPackage === pkg.value;
        return (
          <button
            key={pkg.value}
            type="button"
            onClick={() => onChange({ lensPackage: pkg.value })}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              selected ? 'border-brandTeal bg-teal-50' : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? 'border-brandTeal bg-brandTeal' : 'border-gray-300'}`}>
                  {selected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                </div>
                <span className="font-semibold text-gray-900 text-sm">{pkg.label}</span>
                {pkg.tag && (
                  <span className="bg-gold/20 text-yellow-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{pkg.tag}</span>
                )}
              </div>
              <span className="font-bold text-brandTeal text-sm shrink-0">
                {price === 0 ? 'Included' : `+${formatPrice(price)}`}
              </span>
            </div>
            <ul className="space-y-0.5 ml-6">
              {pkg.features.map((f) => (
                <li key={f} className="text-xs text-gray-500 flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-brandTeal shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </button>
        );
      })}
    </div>
  );
}
