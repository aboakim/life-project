import { NextResponse } from "next/server";
import Stripe from "stripe";
import { processStripeWebhookEvent } from "@/lib/stripe/process-webhook-event";
import { getStripe } from "@/lib/stripe-server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

/**
 * Stripe webhook — signature verified with STRIPE_WEBHOOK_SECRET.
 * Never trust client; subscription state is written here only.
 *
 * Dashboard → Developers → Webhooks → URL: https://your-domain.com/api/stripe/webhook
 * Events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
 */
export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "stripe_webhook_not_configured" },
      { status: 501 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  const rawBody = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  try {
    await prisma.stripeProcessedEvent.create({ data: { id: event.id } });
  } catch (e: unknown) {
    const code =
      typeof e === "object" && e !== null && "code" in e
        ? String((e as { code: string }).code)
        : "";
    if (code === "P2002") {
      return NextResponse.json({ received: true, duplicate: true });
    }
    throw e;
  }

  try {
    await processStripeWebhookEvent(event, stripe);
  } catch (err) {
    console.error("[stripe webhook] processing failed", err);
    await prisma.stripeProcessedEvent.delete({ where: { id: event.id } }).catch(() => {
      /* ignore */
    });
    return NextResponse.json({ error: "processing_failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
