import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { deleteImage } from '@/lib/blob';

async function adminGuard() {
  const session = await getServerSession(authOptions);
  return session && (session.user as any).role === 'ADMIN';
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await adminGuard()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const image = await prisma.galleryImage.update({
    where: { id },
    data: { sortOrder: body.sortOrder, caption: body.caption },
  });

  return NextResponse.json(image);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await adminGuard()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const image = await prisma.galleryImage.findUnique({ where: { id } });

  if (!image) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await deleteImage(image.url);
  await prisma.galleryImage.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
