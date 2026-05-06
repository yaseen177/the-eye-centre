import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import type Stripe from 'stripe';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta    = session.metadata ?? {};
    const items   = JSON.parse(meta.itemsJson ?? '[]');
    const address = JSON.parse(meta.address ?? '{}');

    await prisma.order.create({
      data: {
        stripePaymentId: session.payment_intent as string,
        guestEmail: meta.customerEmail,
        guestName:  meta.customerName,
        status:     'PROCESSING',
        subtotal:   (session.amount_subtotal ?? 0) / 100,
        total:      (session.amount_total ?? 0) / 100,
        shippingAddress: address,
        items: {
          create: items.map((item: any) => ({
            productId:    item.productId,
            quantity:     item.quantity,
            unitPrice:    item.unitPrice,
            prescription: item.prescription
              ? { create: { lensType: item.prescription.lensType, lensPackage: item.prescription.lensPackage, lensTint: item.prescription.lensTint, sendLater: item.prescription.sendLater ?? false } }
              : undefined,
          })),
        },
      },
    });
  }

  return NextResponse.json({ received: true });
}
