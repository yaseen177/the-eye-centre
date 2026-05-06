'use client';

import { useState, useTransition } from 'react';
import { motion, AnimatePresence, Reorder, type Variants } from 'framer-motion';
import Image from 'next/image';
import { Trash2, Upload, Loader2, GripVertical } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  sortOrder: number;
}

interface Props {
  initialImages: GalleryImage[];
}

const itemVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit:    { opacity: 0, scale: 0.95 },
};

export function GalleryManager({ initialImages }: Props) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/admin/gallery', { method: 'POST', body: formData });
        if (res.ok) {
          const newImage = await res.json();
          setImages((prev) => [...prev, newImage]);
        }
      }
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  async function handleDelete(id: string, url: string) {
    if (!confirm('Delete this image?')) return;
    setDeletingId(id);
    try {
      await fetch('/api/admin/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, url }),
      });
      setImages((prev) => prev.filter((img) => img.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  async function handleReorder(newOrder: GalleryImage[]) {
    setImages(newOrder);
    startTransition(async () => {
      await fetch('/api/admin/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newOrder.map((img, i) => ({ id: img.id, sortOrder: i })) }),
      });
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Gallery Images</h2>
          <p className="text-sm text-gray-500 mt-0.5">Drag to reorder. Images appear on the homepage gallery.</p>
        </div>
        <label className={`flex items-center gap-2 bg-brandTeal text-white text-sm font-semibold px-4 py-2.5 rounded-full cursor-pointer hover:bg-teal-700 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          Upload Images
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
      </div>

      {images.length === 0 ? (
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-16 text-center">
          <p className="text-gray-400 text-sm">No images yet. Upload some to get started.</p>
        </div>
      ) : (
        <Reorder.Group axis="y" values={images} onReorder={handleReorder} className="space-y-3">
          <AnimatePresence initial={false}>
            {images.map((img) => (
              <Reorder.Item key={img.id} value={img}>
                <motion.div
                  variants={itemVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="bg-white border border-gray-100 rounded-xl p-3 flex items-center gap-4 cursor-grab active:cursor-grabbing select-none"
                >
                  <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
                    <Image src={img.url} alt={img.caption ?? 'Gallery image'} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 truncate">{img.caption ?? 'No caption'}</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{img.url}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(img.id, img.url)}
                    disabled={deletingId === img.id}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 flex-shrink-0"
                  >
                    {deletingId === img.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </motion.div>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      )}

      {isPending && (
        <p className="text-xs text-gray-400 mt-3 text-center">Saving order...</p>
      )}
    </div>
  );
}
