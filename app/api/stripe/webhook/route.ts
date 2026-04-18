import { NextResponse } from "next/server";
import Stripe from "stripe";
import { processStripeWebhookEvent } from "@/lib/stripe/process-webhook-event";
import { getStripe } from "@/lib/stripe-server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
// Webhooks must never be cached.
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Stripe webhook endpoint.
 *
 * Security properties:
 *  - Raw body is passed to `stripe.webhooks.constructEvent` together with
 *    the `stripe-signature` header so only requests signed with
 *    STRIPE_WEBHOOK_SECRET are accepted.
 *  - Idempotency: every event id is inserted into `StripeProcessedEvent`
 *    inside a unique key. A duplicate delivery short-circuits.
 *  - Failure path: if the downstream processor throws, the event row is
 *    deleted so Stripe's automatic retry can legitimately re-attempt.
 *  - No PII in logs. Only event types / ids and Stripe error codes.
 *
 * Dashboard → Developers → Webhooks → URL:
 *   https://YOUR_DOMAIN/api/stripe/webhook
 * Events (minimum set): checkout.session.completed,
 *   customer.subscription.updated, customer.subscription.deleted
 */
export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || !process.env.STRIPE_SECRET_KEY) {
    // Respond with a generic 503 so attackers can't tell whether we just
    // lack config or are under maintenance.
    return NextResponse.json(
      { error: "unavailable" },
      { status: 503 },
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  if (!rawBody || rawBody.length > 1_000_000) {
    // Stripe events are well under 1 MB; anything larger is almost
    // certainly abuse.
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.warn("[stripe webhook] invalid signature", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  // Idempotency: insert the event id; unique violation means we have
  // already processed it and should ack without reprocessing.
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
    console.error("[stripe webhook] persistence error", {
      eventId: event.id,
      code,
    });
    return NextResponse.json({ error: "store_failed" }, { status: 500 });
  }

  try {
    await processStripeWebhookEvent(event, stripe);
  } catch (err) {
    console.error("[stripe webhook] processing failed", {
      eventId: event.id,
      type: event.type,
      message: err instanceof Error ? err.message : "unknown",
    });
    // Remove the dedupe row so Stripe's automatic retry can succeed
    // later without being treated as a duplicate.
    await prisma.stripeProcessedEvent
      .delete({ where: { id: event.id } })
      .catch(() => {
        /* swallow: best-effort cleanup */
      });
    return NextResponse.json({ error: "processing_failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
