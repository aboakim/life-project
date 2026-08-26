import type { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";
import PricingPageEducation from "./PricingPageEducation";
import PageRevenueStrip from "@/components/monetization/PageRevenueStrip";
import { toolPageMetadata } from "@/lib/site-page-metadata";

export const metadata: Metadata = toolPageMetadata({
  title: "Pricing — Free and Premium plans · Life Decision Engine",
  description:
    "Compare the free analyzer and the Premium plan. Payments are processed securely by Stripe — card details never touch our servers.",
  canonical: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PricingPageEducation />
      <PricingPageClient />
      <PageRevenueStrip className="pb-12" adPlacement="footer" />
    </>
  );
}
