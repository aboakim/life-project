import Stripe from "stripe";
import { getSiteUrlString } from "@/lib/site-url";

let stripeSingleton: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!stripeSingleton) {
    stripeSingleton = new Stripe(key, { typescript: true });
  }
  return stripeSingleton;
}

/** Required for live Checkout + verified webhooks */
export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_PRICE_ID_PREMIUM &&
      process.env.STRIPE_WEBHOOK_SECRET
  );
}

/**
 * Public site origin (https only in production). Used only server-side for Checkout redirect URLs.
 */
export function getCheckoutOrigin(): string {
  const base = getSiteUrlString();
  try {
    const u = new URL(base);
    if (process.env.NODE_ENV === "production" && u.protocol !== "https:") {
      throw new Error("Production Checkout requires HTTPS site URL");
    }
    return `${u.protocol}//${u.host}`;
  } catch {
    return "http://localhost:3000";
  }
}

export type CreateCheckoutResult =
  | { ok: true; url: string }
  | { ok: false; code: string; message: string };

/**
 * Creates a Stripe-hosted Checkout Session (subscription). Card details never touch this app.
 */
export async function createPremiumCheckoutSession(options: {
  customerEmail?: string | null;
}): Promise<CreateCheckoutResult> {
  if (!isStripeConfigured()) {
    return {
      ok: false,
      code: "stripe_not_configured",
      message:
        "Set STRIPE_SECRET_KEY, STRIPE_PRICE_ID_PREMIUM, STRIPE_WEBHOOK_SECRET on the server.",
    };
  }

  const priceId = process.env.STRIPE_PRICE_ID_PREMIUM!;
  const origin = getCheckoutOrigin();

  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/pricing?checkout=success`,
    cancel_url: `${origin}/pricing?checkout=canceled`,
    allow_promotion_codes: true,
    billing_address_collection: "required",
    ...(options.customerEmail &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(options.customerEmail.trim())
      ? { customer_email: options.customerEmail.trim().toLowerCase() }
      : {}),
    subscription_data: {
      metadata: { app: "life-decision-engine" },
    },
    metadata: { app: "life-decision-engine" },
  });

  if (!session.url) {
    return {
      ok: false,
      code: "stripe_no_url",
      message: "Checkout session did not return a URL.",
    };
  }

  return { ok: true, url: session.url };
}
