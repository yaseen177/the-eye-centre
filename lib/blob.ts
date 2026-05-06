import { put, del } from '@vercel/blob';

export async function uploadImage(file: File, prefix = 'gallery'): Promise<string> {
  const filename = `${prefix}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const blob = await put(filename, file, { access: 'public' });
  return blob.url;
}

export async function deleteImage(url: string): Promise<void> {
  await del(url);
}
