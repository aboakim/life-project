import type { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Գներ / Pricing — Premium (Stripe placeholder)",
  description:
    "Free և Premium պլանների էջ։ Stripe Checkout-ը կարելի է միացնել հետագայում։",
};

export default function PricingPage() {
  return <PricingPageClient />;
}
