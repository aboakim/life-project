/**
 * @deprecated Use `@/lib/stripe-server` for `isStripeConfigured`.
 * Kept for older imports; publishable key is only needed for Stripe.js / Elements (not Checkout redirect).
 */
export { isStripeConfigured } from "./stripe-server";

export const stripePlaceholder = {
  enabled: process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true",
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
} as const;
