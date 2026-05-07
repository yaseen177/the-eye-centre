import { z } from 'zod';

// ─── Prescription ─────────────────────────────────────────────────────────────

export const eyeValuesSchema = z.object({
  sph:  z.string(),
  cyl:  z.string(),
  axis: z.string(),
  add:  z.string(),
});

export const prescriptionSchema = z.object({
  sendLater: z.boolean(),
  right: eyeValuesSchema,
  left:  eyeValuesSchema,
  pdMode:   z.enum(['single', 'dual']),
  pdSingle: z.string(),
  pdRight:  z.string(),
  pdLeft:   z.string(),
});

// ─── Product ─────────────────────────────────────────────────────────────────

export const productSchema = z.object({
  name:        z.string().min(1, 'Name is required'),
  brand:       z.string().min(1, 'Brand is required'),
  slug:        z.string().min(1).regex(/^[a-z0-9-]+$/, 'Lowercase letters, numbers, hyphens only'),
  description: z.string().optional(),
  price:       z.number().positive('Must be a positive number'),
  category:    z.enum(['PRESCRIPTION', 'SUNGLASSES', 'DESIGNER', 'SPORTS']),
  gender:      z.enum(['MENS', 'WOMENS', 'UNISEX', 'KIDS']),
  shape:       z.enum(['ROUND', 'SQUARE', 'RECTANGLE', 'CAT_EYE', 'AVIATOR', 'WAYFARER', 'OVAL']).optional(),
  color:       z.string().min(1),
  material:    z.string().min(1),
  inStock:     z.boolean(),
  featured:    z.boolean(),
  stockCount:  z.number().int().min(0),
});

export type ProductFormValues = z.infer<typeof productSchema>;

// ─── Enquiry / Cart submission ────────────────────────────────────────────────

export const checkoutSchema = z.object({
  customerName:  z.string().min(1, 'Name is required'),
  customerEmail: z.string().email('Valid email required'),
  customerPhone: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
