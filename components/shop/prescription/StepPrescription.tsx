'use client';

import type { PrescriptionFormData } from './types';

interface Props {
  data: PrescriptionFormData;
  onChange: (data: Partial<PrescriptionFormData>) => void;
}

type Eye = 'right' | 'left';

const FIELDS: { key: 'Sph' | 'Cyl' | 'Axis' | 'Add'; label: string; placeholder: string }[] = [
  { key: 'Sph',  label: 'SPH',  placeholder: '0.00' },
  { key: 'Cyl',  label: 'CYL',  placeholder: '0.00' },
  { key: 'Axis', label: 'AXIS', placeholder: '0'    },
  { key: 'Add',  label: 'ADD',  placeholder: '0.00' },
];

function EyeRow({ eye, data, onChange }: { eye: Eye; data: PrescriptionFormData; onChange: (d: Partial<PrescriptionFormData>) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{eye === 'right' ? 'Right Eye (OD)' : 'Left Eye (OS)'}</p>
      <div className="grid grid-cols-4 gap-2">
        {FIELDS.map(({ key, label, placeholder }) => {
          const fieldKey = `${eye}${key}` as keyof PrescriptionFormData;
          return (
            <div key={key}>
              <label className="block text-[10px] font-semibold text-gray-400 uppercase mb-1">{label}</label>
              <input
                type="number"
                step={key === 'Axis' ? '1' : '0.25'}
                placeholder={placeholder}
                value={data[fieldKey] as string}
                onChange={(e) => onChange({ [fieldKey]: e.target.value })}
                disabled={data.sendLater}
                className="w-full border border-gray-200 rounded-lg px-2 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-brandTeal/30 focus:border-brandTeal disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StepPrescription({ data, onChange }: Props) {
  const needsRx = data.lensType === 'SINGLE_VISION' || data.lensType === 'VARIFOCAL';

  if (!needsRx) {
    return (
      <div className="rounded-xl bg-teal-50 border border-brandTeal/20 p-5 text-sm text-brandTeal font-medium text-center">
        No prescription required for {data.lensType === 'FRAME_ONLY' ? 'Frame Only' : 'Non-Prescription'} lenses.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Send later toggle */}
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <div
          onClick={() => onChange({ sendLater: !data.sendLater })}
          className={`relative w-10 h-5 rounded-full transition-colors ${data.sendLater ? 'bg-brandTeal' : 'bg-gray-200'}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${data.sendLater ? 'translate-x-5' : 'translate-x-0'}`} />
        </div>
        <span className="text-sm font-medium text-gray-700">Send prescription later via email</span>
      </label>

      {data.sendLater && (
        <p className="text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
          We&apos;ll email you after purchase with instructions to send your prescription. Your order won&apos;t be processed until we receive it.
        </p>
      )}

      <EyeRow eye="right" data={data} onChange={onChange} />
      <EyeRow eye="left"  data={data} onChange={onChange} />
    </div>
  );
}
