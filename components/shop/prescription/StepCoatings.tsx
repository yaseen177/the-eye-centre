'use client';

import type { LensTint } from '@/types';
import { LENS_TINT_PRICES } from '@/types';
import { formatPrice } from '@/lib/utils';
import type { PrescriptionFormData } from './types';

const TINTS: { value: LensTint; label: string; desc: string; emoji: string }[] = [
  { value: 'CLEAR',         label: 'Clear',              desc: 'Standard clear lenses for everyday use.',         emoji: '🔍' },
  { value: 'SUNGLASS_TINT', label: 'Sunglass Tint',      desc: 'Dark tint for sun protection outdoors.',          emoji: '🕶️' },
  { value: 'BLUE_LIGHT',    label: 'Blue Light Filter',  desc: 'Reduces digital eye strain from screens.',        emoji: '💻' },
  { value: 'TRANSITIONS',   label: 'Transitions®',       desc: 'Automatically darken in sunlight, clear indoors.', emoji: '🌤️' },
];

interface Props {
  data: PrescriptionFormData;
  onChange: (data: Partial<PrescriptionFormData>) => void;
}

export function StepCoatings({ data, onChange }: Props) {
  const isFrameOnly = data.lensType === 'FRAME_ONLY' || data.lensType === 'NON_PRESCRIPTION';
  const available = isFrameOnly ? TINTS.filter((t) => t.value === 'CLEAR' || t.value === 'SUNGLASS_TINT') : TINTS;

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-4">Add a tint or specialist coating to your lenses.</p>
      {available.map((tint) => {
        const price = LENS_TINT_PRICES[tint.value];
        const selected = data.lensTint === tint.value;
        return (
          <button
            key={tint.value}
            type="button"
            onClick={() => onChange({ lensTint: tint.value })}
            className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
              selected ? 'border-brandTeal bg-teal-50' : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <span className="text-2xl shrink-0">{tint.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">{tint.label}</p>
              <p className="text-gray-500 text-xs mt-0.5 truncate">{tint.desc}</p>
            </div>
            <span className="font-bold text-brandTeal text-sm shrink-0">
              {price === 0 ? 'Included' : `+${formatPrice(price)}`}
            </span>
            <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${selected ? 'border-brandTeal bg-brandTeal' : 'border-gray-300'}`} />
          </button>
        );
      })}
    </div>
  );
}
