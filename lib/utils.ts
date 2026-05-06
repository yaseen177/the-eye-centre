import type { ProductFilters } from '@/types';

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function buildProductFilters(
  searchParams: Record<string, string | string[] | undefined>,
): ProductFilters {
  const filters: ProductFilters = {};

  const category = searchParams.category;
  if (category && typeof category === 'string') {
    filters.category = category as ProductFilters['category'];
  }

  const gender = searchParams.gender;
  if (gender && typeof gender === 'string') {
    filters.gender = gender as ProductFilters['gender'];
  }

  const shape = searchParams.shape;
  if (shape && typeof shape === 'string') {
    filters.shape = shape as ProductFilters['shape'];
  }

  const minPrice = searchParams.minPrice;
  if (minPrice && typeof minPrice === 'string') {
    filters.minPrice = parseFloat(minPrice);
  }

  const maxPrice = searchParams.maxPrice;
  if (maxPrice && typeof maxPrice === 'string') {
    filters.maxPrice = parseFloat(maxPrice);
  }

  const color = searchParams.color;
  if (color && typeof color === 'string') {
    filters.color = color;
  }

  const inStock = searchParams.inStock;
  if (inStock === 'true') filters.inStock = true;

  return filters;
}
