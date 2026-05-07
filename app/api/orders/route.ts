import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { CartItem } from '@/types';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          product: { select: { id: true, name: true, brand: true, images: true } },
          prescription: true,
        },
      },
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  const body = await req.json() as {
    items: CartItem[];
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
  };

  const { items, customerName, customerEmail, customerPhone } = body;

  if (!items?.length) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }
  if (!customerName || !customerEmail) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
  }

  const subtotal = items.reduce((sum, item) => sum + (item.unitPrice + item.lensPrice) * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      guestName:  customerName,
      guestEmail: customerEmail,
      status:     'PENDING',
      subtotal,
      total: subtotal,
      shippingAddress: customerPhone ? { phone: customerPhone } : undefined,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity:  item.quantity,
          unitPrice: item.unitPrice + item.lensPrice,
          ...(item.prescription ? {
            prescription: {
              create: {
                lensType:    item.prescription.lensType    as any,
                lensPackage: item.prescription.lensPackage as any,
                lensTint:    item.prescription.lensTint    as any,
                sendLater:   item.prescription.sendLater,
                rightSph:    item.prescription.rightSph,
                rightCyl:    item.prescription.rightCyl,
                rightAxis:   item.prescription.rightAxis,
                rightAdd:    item.prescription.rightAdd,
                leftSph:     item.prescription.leftSph,
                leftCyl:     item.prescription.leftCyl,
                leftAxis:    item.prescription.leftAxis,
                leftAdd:     item.prescription.leftAdd,
                pdSingle:    item.prescription.pdSingle,
                pdRight:     item.prescription.pdRight,
                pdLeft:      item.prescription.pdLeft,
              },
            },
          } : {}),
        })),
      },
    },
  });

  return NextResponse.json({ orderId: order.id });
}
