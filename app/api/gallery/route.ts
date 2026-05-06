import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { uploadImage } from '@/lib/blob';

export async function GET() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file     = formData.get('file') as File | null;
  const caption  = (formData.get('caption') as string) ?? '';

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const url = await uploadImage(file, 'gallery');

  const count = await prisma.galleryImage.count();
  const image = await prisma.galleryImage.create({
    data: { url, caption, sortOrder: count },
  });

  return NextResponse.json(image, { status: 201 });
}
