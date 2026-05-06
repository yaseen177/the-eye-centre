'use client';

import type { LensType } from '@/types';
import type { PrescriptionFormData } from './types';

const OPTIONS: { value: LensType; label: string; desc: string }[] = [
  { value: 'SINGLE_VISION',    label: 'Single Vision',      desc: 'For distance or reading — one focal point.' },
  { value: 'VARIFOCAL',        label: 'Varifocal',          desc: 'Near, intermediate, and far vision in one lens.' },
  { value: 'NON_PRESCRIPTION', label: 'Non-Prescription',   desc: 'Plano lenses — no vision correction needed.' },
  { value: 'FRAME_ONLY',       label: 'Frame Only',         desc: 'Purchase the frame without any lenses.' },
];

interface Props {
  data: PrescriptionFormData;
  onChange: (data: Partial<PrescriptionFormData>) => void;
}

export function StepUsage({ data, onChange }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-5">Select the type of lenses you need for these glasses.</p>
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange({ lensType: opt.value })}
          className={`w-full text-left flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
            data.lensType === opt.value
              ? 'border-brandTeal bg-teal-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${data.lensType === opt.value ? 'border-brandTeal' : 'border-gray-300'}`}>
            {data.lensType === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-brandTeal" />}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{opt.label}</p>
            <p className="text-gray-500 text-xs mt-0.5">{opt.desc}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
