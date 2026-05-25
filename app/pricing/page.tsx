import type { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";
import PricingPageEducation from "./PricingPageEducation";

export const metadata: Metadata = {
  title: "Pricing — Free and Premium plans · Life Decision Engine",
  description:
    "Compare the free analyzer and the Premium plan. Payments are processed securely by Stripe — card details never touch our servers.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PricingPageClient />
      <PricingPageEducation />
    </>
  );
}
