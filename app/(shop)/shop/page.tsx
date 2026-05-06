import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { ShopFilters } from '@/components/shop/ShopFilters';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { getProducts } from '@/lib/products';
import { buildProductFilters } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Shop Glasses' };
export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function Products({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const products = await getProducts(buildProductFilters(searchParams));
  return <ProductGrid products={products} />;
}

export default async function ShopPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="bg-gray-50 border-b border-gray-100 py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Shop Glasses</h1>
            <p className="text-gray-500 mt-1">Browse our curated collection of frames</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid md:grid-cols-[220px_1fr] gap-10">
            <Suspense>
              <ShopFilters />
            </Suspense>
            <Suspense fallback={<div className="text-gray-400 text-sm">Loading products…</div>}>
              <Products searchParams={resolvedParams} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
