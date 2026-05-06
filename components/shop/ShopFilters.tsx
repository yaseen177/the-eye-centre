'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['PRESCRIPTION', 'SUNGLASSES', 'DESIGNER', 'SPORTS'];
const GENDERS     = ['MENS', 'WOMENS', 'UNISEX', 'KIDS'];
const SHAPES      = ['ROUND', 'SQUARE', 'RECTANGLE', 'CAT_EYE', 'AVIATOR', 'WAYFARER', 'OVAL'];

function pretty(s: string) {
  return s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ShopFilters() {
  const router     = useRouter();
  const pathname   = usePathname();
  const params     = useSearchParams();
  const [, startTransition] = useTransition();

  function setFilter(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value === null || value === '') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    startTransition(() => router.push(`${pathname}?${next.toString()}`));
  }

  function clearAll() {
    startTransition(() => router.push(pathname));
  }

  const active = ['category', 'gender', 'shape'].some((k) => params.has(k));

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </div>
        {active && (
          <button onClick={clearAll} className="text-xs font-semibold text-brandTeal hover:underline">Clear all</button>
        )}
      </div>

      {/* Category */}
      <FilterGroup label="Category">
        {CATEGORIES.map((c) => (
          <FilterChip
            key={c}
            label={pretty(c)}
            active={params.get('category') === c}
            onClick={() => setFilter('category', params.get('category') === c ? null : c)}
          />
        ))}
      </FilterGroup>

      {/* Gender */}
      <FilterGroup label="Gender">
        {GENDERS.map((g) => (
          <FilterChip
            key={g}
            label={pretty(g)}
            active={params.get('gender') === g}
            onClick={() => setFilter('gender', params.get('gender') === g ? null : g)}
          />
        ))}
      </FilterGroup>

      {/* Shape */}
      <FilterGroup label="Frame Shape">
        {SHAPES.map((s) => (
          <FilterChip
            key={s}
            label={pretty(s)}
            active={params.get('shape') === s}
            onClick={() => setFilter('shape', params.get('shape') === s ? null : s)}
          />
        ))}
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-150 ${
        active
          ? 'bg-brandTeal text-white border-brandTeal'
          : 'bg-white text-gray-600 border-gray-200 hover:border-brandTeal/50'
      }`}
    >
      {label}
    </button>
  );
}
