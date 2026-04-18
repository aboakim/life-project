import { NextResponse } from "next/server";
import {
  createPremiumCheckoutSession,
  isStripeConfigured,
} from "@/lib/stripe-server";
import { allowCheckoutRequest, clientKeyFromRequest } from "@/lib/checkout-rate-limit";

export const runtime = "nodejs";
// Checkout must always be server-rendered on demand; never cache at the edge.
export const dynamic = "force-dynamic";

type Body = {
  customerEmail?: string | null;
};

/**
 * POST /api/checkout/create
 *
 * Creates a Stripe-hosted Checkout Session (subscription).
 * - Secrets stay server-side; never exposed to the client.
 * - Error responses carry a short, non-leaking `code`; detailed reasons
 *   are logged server-side only.
 * - Input is length-capped to reject obviously abusive payloads.
 */
export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    console.warn(
      "[checkout] rejected: Stripe env vars missing (keys: STRIPE_SECRET_KEY / STRIPE_PRICE_ID_PREMIUM / STRIPE_WEBHOOK_SECRET).",
    );
    return NextResponse.json(
      {
        ok: false,
        code: "unavailable",
        message: "Payments are not available right now. Please try again later.",
      },
      { status: 503 },
    );
  }

  const clientKey = clientKeyFromRequest(req);
  if (!allowCheckoutRequest(clientKey)) {
    return NextResponse.json(
      {
        ok: false,
        code: "rate_limited",
        message: "Too many requests. Please wait a minute and try again.",
      },
      {
        status: 429,
        headers: { "Retry-After": "60" },
      },
    );
  }

  let body: Body = {};
  try {
    const text = await req.text();
    if (text) {
      if (text.length > 2048) {
        return NextResponse.json(
          { ok: false, code: "bad_request", message: "Request too large." },
          { status: 413 },
        );
      }
      body = JSON.parse(text) as Body;
    }
  } catch {
    return NextResponse.json(
      { ok: false, code: "bad_request", message: "Invalid request." },
      { status: 400 },
    );
  }

  const rawEmail =
    typeof body.customerEmail === "string" ? body.customerEmail : null;
  const customerEmail =
    rawEmail && rawEmail.length <= 254 ? rawEmail : null;

  try {
    const result = await createPremiumCheckoutSession({ customerEmail });

    if (!result.ok) {
      console.error("[checkout] create failed", {
        code: result.code,
        // Do not log customerEmail (PII).
      });
      return NextResponse.json(
        {
          ok: false,
          code: "unavailable",
          message: "Payments are not available right now. Please try again later.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true, url: result.url });
  } catch (err) {
    console.error("[checkout] unexpected error", err);
    return NextResponse.json(
      {
        ok: false,
        code: "unavailable",
        message: "Payments are not available right now. Please try again later.",
      },
      { status: 503 },
    );
  }
}
