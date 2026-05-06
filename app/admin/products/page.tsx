import { prisma } from '@/lib/prisma';
import { ProductManager } from '@/components/admin/ProductManager';

export default async function AdminProductsPage() {
  const rawProducts = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const products = rawProducts.map((p) => ({
    ...p,
    description: p.description ?? undefined,
    shape: p.shape ?? undefined,
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-500 mt-1">Manage your eyewear catalog</p>
      </div>
      <ProductManager initialProducts={products} />
    </div>
  );
}
