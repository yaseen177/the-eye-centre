'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { productSchema, type ProductFormValues } from '@/lib/schemas';

interface Product extends ProductFormValues {
  id: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: (product: Product) => void;
  editProduct?: Product | null;
}

const CATEGORIES = ['PRESCRIPTION', 'SUNGLASSES', 'DESIGNER', 'SPORTS'] as const;
const GENDERS    = ['MENS', 'WOMENS', 'UNISEX', 'KIDS'] as const;
const SHAPES     = ['ROUND', 'SQUARE', 'RECTANGLE', 'CAT_EYE', 'AVIATOR', 'WAYFARER', 'OVAL'] as const;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brandTeal focus:border-transparent ${className}`}
    />
  );
}

function Select({ children, className = '', ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brandTeal focus:border-transparent bg-white ${className}`}
    >
      {children}
    </select>
  );
}

export function ProductFormModal({ open, onClose, onSaved, editProduct }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      inStock: true,
      featured: false,
      stockCount: 0,
    },
  });

  useEffect(() => {
    if (editProduct) {
      reset(editProduct);
    } else {
      reset({ inStock: true, featured: false, stockCount: 0, category: 'PRESCRIPTION', gender: 'UNISEX' });
    }
  }, [editProduct, reset, open]);

  async function onSubmit(data: ProductFormValues) {
    const url    = editProduct ? `/api/admin/products/${editProduct.id}` : '/api/admin/products';
    const method = editProduct ? 'PATCH' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const saved = await res.json();
      onSaved(saved);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
                <h2 className="text-lg font-semibold text-gray-900">
                  {editProduct ? 'Edit Product' : 'New Product'}
                </h2>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Brand" error={errors.brand?.message}>
                    <Input {...register('brand')} placeholder="e.g. Ray-Ban" />
                  </Field>
                  <Field label="Name" error={errors.name?.message}>
                    <Input {...register('name')} placeholder="e.g. Wayfarer Classic" />
                  </Field>
                </div>

                <Field label="Slug (URL)" error={errors.slug?.message}>
                  <Input {...register('slug')} placeholder="e.g. ray-ban-wayfarer-classic" />
                </Field>

                <Field label="Description" error={errors.description?.message}>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brandTeal focus:border-transparent resize-none"
                    placeholder="Optional product description..."
                  />
                </Field>

                <div className="grid grid-cols-3 gap-4">
                  <Field label="Price (£)" error={errors.price?.message}>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      {...register('price', { valueAsNumber: true })}
                      placeholder="0.00"
                    />
                  </Field>
                  <Field label="Stock Count" error={errors.stockCount?.message}>
                    <Input
                      type="number"
                      min="0"
                      {...register('stockCount', { valueAsNumber: true })}
                    />
                  </Field>
                  <Field label="Category" error={errors.category?.message}>
                    <Select {...register('category')}>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c.charAt(0) + c.slice(1).toLowerCase()}</option>
                      ))}
                    </Select>
                  </Field>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Field label="Gender" error={errors.gender?.message}>
                    <Select {...register('gender')}>
                      {GENDERS.map((g) => (
                        <option key={g} value={g}>{g.charAt(0) + g.slice(1).toLowerCase()}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Frame Shape" error={errors.shape?.message}>
                    <Select {...register('shape')}>
                      <option value="">Select shape</option>
                      {SHAPES.map((s) => (
                        <option key={s} value={s}>{s.replace('_', ' ')}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Color" error={errors.color?.message}>
                    <Input {...register('color')} placeholder="e.g. Black" />
                  </Field>
                </div>

                <Field label="Material" error={errors.material?.message}>
                  <Input {...register('material')} placeholder="e.g. Acetate" />
                </Field>

                <div className="flex gap-6 pt-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" {...register('inStock')} className="rounded text-brandTeal focus:ring-brandTeal" />
                    In Stock
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" {...register('featured')} className="rounded text-brandTeal focus:ring-brandTeal" />
                    Featured
                  </label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-brandTeal text-white font-semibold py-2.5 rounded-full hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {editProduct ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
