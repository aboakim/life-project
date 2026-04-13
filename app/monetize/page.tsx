import type { Metadata } from "next";
import MonetizePageClient from "@/components/monetize/MonetizePageClient";

export const metadata: Metadata = {
  title: "Revenue models — Life Decision Engine",
  description:
    "Expert leads, B2B, courses, partners, community support — ways to earn beyond card checkout.",
};

export default function MonetizePage() {
  return (
    <main>
      <MonetizePageClient />
    </main>
  );
}
