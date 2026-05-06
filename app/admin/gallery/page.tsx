import { prisma } from '@/lib/prisma';
import { GalleryManager } from '@/components/admin/GalleryManager';

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
        <p className="text-gray-500 mt-1">Manage your homepage gallery images</p>
      </div>
      <GalleryManager initialImages={images} />
    </div>
  );
}
