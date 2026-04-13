import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";

function billingPeriodEnd(sub: Stripe.Subscription): Date | null {
  const ts = sub.items?.data?.[0]?.current_period_end;
  if (typeof ts === "number") return new Date(ts * 1000);
  return null;
}

async function resolveCustomerEmail(
  stripe: Stripe,
  customerId: string
): Promise<string | null> {
  const cust = await stripe.customers.retrieve(customerId);
  if (cust.deleted || !("email" in cust)) return null;
  const e = cust.email;
  return e ? e.trim().toLowerCase() : null;
}

async function upsertFromSubscription(
  stripe: Stripe,
  sub: Stripe.Subscription
): Promise<void> {
  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  const email = await resolveCustomerEmail(stripe, customerId);
  if (!email) {
    console.warn("[stripe] subscription without customer email", sub.id);
    return;
  }

  const currentPeriodEnd = billingPeriodEnd(sub);

  await prisma.premiumSubscription.upsert({
    where: { stripeSubscriptionId: sub.id },
    create: {
      email,
      stripeCustomerId: customerId,
      stripeSubscriptionId: sub.id,
      status: sub.status,
      currentPeriodEnd,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
    update: {
      email,
      stripeCustomerId: customerId,
      status: sub.status,
      currentPeriodEnd,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
  });
}

/**
 * Applies a verified Stripe event. Throws on failure so the webhook can retry.
 */
export async function processStripeWebhookEvent(
  event: Stripe.Event,
  stripe: Stripe
): Promise<void> {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode !== "subscription") return;
      const subId = session.subscription;
      if (typeof subId !== "string" || !subId) return;
      const sub = await stripe.subscriptions.retrieve(subId);
      await upsertFromSubscription(stripe, sub);
      return;
    }
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      await upsertFromSubscription(stripe, sub);
      return;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await prisma.premiumSubscription.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: {
          status: "canceled",
          cancelAtPeriodEnd: false,
          currentPeriodEnd: sub.ended_at
            ? new Date(sub.ended_at * 1000)
            : new Date(),
        },
      });
      return;
    }
    default:
      return;
  }
}
