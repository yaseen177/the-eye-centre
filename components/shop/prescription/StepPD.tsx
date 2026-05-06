'use client';

import type { PrescriptionFormData } from './types';

interface Props {
  data: PrescriptionFormData;
  onChange: (data: Partial<PrescriptionFormData>) => void;
}

export function StepPD({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">
        Pupillary Distance (PD) is the measurement in mm between your pupils. You can find this on your prescription, or measure it at home.
      </p>

      {/* Mode toggle */}
      <div className="flex gap-2">
        {(['single', 'dual'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => onChange({ pdMode: mode })}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-full border-2 transition-all ${
              data.pdMode === mode
                ? 'border-brandTeal bg-brandTeal text-white'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            {mode === 'single' ? 'Single PD' : 'Dual PD (separate per eye)'}
          </button>
        ))}
      </div>

      {data.pdMode === 'single' ? (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">PD (mm)</label>
          <input
            type="number"
            step="0.5"
            min="50"
            max="80"
            value={data.pdSingle}
            onChange={(e) => onChange({ pdSingle: e.target.value })}
            className="w-32 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-brandTeal/30 focus:border-brandTeal"
          />
          <p className="text-xs text-gray-400 mt-1">Typical range: 55–75mm</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {(['pdRight', 'pdLeft'] as const).map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {field === 'pdRight' ? 'Right (OD)' : 'Left (OS)'}
              </label>
              <input
                type="number"
                step="0.5"
                min="25"
                max="40"
                value={data[field]}
                onChange={(e) => onChange({ [field]: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-brandTeal/30 focus:border-brandTeal"
              />
            </div>
          ))}
        </div>
      )}

      {/* Visual guide */}
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
        <p className="text-xs font-semibold text-gray-700 mb-3">How to measure your PD</p>
        {/* Simple SVG diagram */}
        <svg viewBox="0 0 200 60" className="w-full max-w-xs mx-auto mb-3" aria-hidden>
          <rect x="10" y="20" width="180" height="20" rx="10" fill="#e5e7eb" />
          <circle cx="75" cy="30" r="10" fill="white" stroke="#00897B" strokeWidth="2" />
          <circle cx="125" cy="30" r="10" fill="white" stroke="#00897B" strokeWidth="2" />
          <circle cx="75" cy="30" r="3" fill="#1B4332" />
          <circle cx="125" cy="30" r="3" fill="#1B4332" />
          <line x1="75" y1="50" x2="125" y2="50" stroke="#C9A84C" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="75" y1="47" x2="75" y2="53" stroke="#C9A84C" strokeWidth="1.5" />
          <line x1="125" y1="47" x2="125" y2="53" stroke="#C9A84C" strokeWidth="1.5" />
          <text x="100" y="60" textAnchor="middle" fontSize="9" fill="#C9A84C">PD</text>
        </svg>
        <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
          <li>Stand 20cm from a mirror with a ruler against your brow</li>
          <li>Close your right eye — align 0 with the centre of your left pupil</li>
          <li>Open your right eye, close your left — note the mm reading</li>
          <li>That reading is your PD</li>
        </ol>
      </div>
    </div>
  );
}
