import { prisma } from '@/lib/prisma';
import type { ProductFilters } from '@/types';
import type { Prisma } from '@prisma/client';

export async function getProducts(filters: ProductFilters = {}) {
  const where: Prisma.ProductWhereInput = {};

  if (filters.category)              where.category  = filters.category;
  if (filters.gender)                where.gender    = filters.gender;
  if (filters.shape)                 where.shape     = filters.shape;
  if (filters.color)                 where.color     = { contains: filters.color, mode: 'insensitive' };
  if (filters.inStock !== undefined) where.inStock   = filters.inStock;
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.price = {};
    if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
    if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
  }

  return prisma.product.findMany({
    where,
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { featured: true, inStock: true },
    take: 8,
    orderBy: { createdAt: 'desc' },
  });
}
