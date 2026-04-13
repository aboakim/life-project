import { NextResponse } from "next/server";
import {
  createPremiumCheckoutSession,
  isStripeConfigured,
} from "@/lib/stripe-server";
import { allowCheckoutRequest, clientKeyFromRequest } from "@/lib/checkout-rate-limit";

export const runtime = "nodejs";

type Body = {
  customerEmail?: string | null;
};

/**
 * POST /api/checkout/create
 * Creates a Stripe-hosted Checkout Session (subscription). Secrets stay server-side only.
 */
export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        code: "stripe_not_configured",
        message:
          "Set STRIPE_SECRET_KEY, STRIPE_PRICE_ID_PREMIUM, STRIPE_WEBHOOK_SECRET. Webhook: /api/stripe/webhook",
      },
      { status: 501 }
    );
  }

  const key = clientKeyFromRequest(req);
  if (!allowCheckoutRequest(key)) {
    return NextResponse.json(
      { ok: false, code: "rate_limited", message: "Too many requests. Try again shortly." },
      { status: 429 }
    );
  }

  let body: Body = {};
  try {
    const text = await req.text();
    if (text) body = JSON.parse(text) as Body;
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_json" }, { status: 400 });
  }

  const result = await createPremiumCheckoutSession({
    customerEmail: body.customerEmail,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, code: result.code, message: result.message },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, url: result.url });
}
