import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { put, del } from '@vercel/blob';

function isAdmin(session: Session | null) {
  return session && (session.user as any)?.role === 'ADMIN';
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const blob = await put(`gallery/${Date.now()}-${file.name}`, file, { access: 'public' });

  const maxSort = await prisma.galleryImage.findFirst({ orderBy: { sortOrder: 'desc' }, select: { sortOrder: true } });

  const image = await prisma.galleryImage.create({
    data: {
      url: blob.url,
      sortOrder: (maxSort?.sortOrder ?? -1) + 1,
    },
  });

  return NextResponse.json(image, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, url } = await req.json();

  await prisma.galleryImage.delete({ where: { id } });

  try {
    await del(url);
  } catch {
    // blob may not exist — ignore
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { order } = await req.json() as { order: { id: string; sortOrder: number }[] };

  await prisma.$transaction(
    order.map(({ id, sortOrder }) =>
      prisma.galleryImage.update({ where: { id }, data: { sortOrder } })
    )
  );

  return NextResponse.json({ ok: true });
}
