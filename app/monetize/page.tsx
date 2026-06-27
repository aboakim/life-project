import type { Metadata } from "next";
import MonetizePageClient from "@/components/monetize/MonetizePageClient";
import MonetizeEducation from "@/lib/page-education/MonetizeEducation";
import { toolPageMetadata } from "@/lib/site-page-metadata";

export const metadata: Metadata = toolPageMetadata({
  title: "Revenue models — Life Decision Engine",
  description:
    "Expert leads, B2B, courses, partners, community support — ways to earn beyond card checkout.",
  canonical: "/monetize",
});

export default function MonetizePage() {
  return (
    <>
      <MonetizeEducation />
      <MonetizePageClient />
    </>
  );
}
