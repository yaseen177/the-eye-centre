import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import type { CartItem } from '@/types';

export async function POST(req: NextRequest) {
  const { items, customerInfo } = (await req.json()) as {
    items: CartItem[];
    customerInfo: { customerName: string; customerEmail: string; line1: string; line2?: string; city: string; postcode: string };
  };

  if (!items?.length) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'gbp',
      product_data: {
        name: `${item.brand} ${item.name}`,
        images: item.image ? [item.image] : [],
        description: item.prescription
          ? `Lens: ${item.prescription.lensType} | Package: ${item.prescription.lensPackage}`
          : 'Frame only',
      },
      unit_amount: Math.round((item.unitPrice + item.lensPrice) * 100),
    },
    quantity: item.quantity,
  }));

  const origin = req.headers.get('origin') ?? 'http://localhost:3000';

  const session = await getStripe().checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    customer_email: customerInfo.customerEmail,
    metadata: {
      customerName:  customerInfo.customerName,
      customerEmail: customerInfo.customerEmail,
      itemsJson:     JSON.stringify(items),
      address:       JSON.stringify({
        line1: customerInfo.line1,
        line2: customerInfo.line2 ?? '',
        city:  customerInfo.city,
        postcode: customerInfo.postcode,
      }),
    },
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${origin}/cart`,
  });

  return NextResponse.json({ url: session.url });
}
