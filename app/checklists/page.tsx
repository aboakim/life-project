import type { Metadata } from "next";
import ChecklistsEducation from "@/lib/page-education/ChecklistsEducation";
import ChecklistsPageClient from "./ChecklistsPageClient";
import PageRevenueStrip from "@/components/monetization/PageRevenueStrip";
import { toolPageMetadata } from "@/lib/site-page-metadata";

export const metadata: Metadata = toolPageMetadata({
  title: "Printable decision checklists — Life Decision Engine",
  description:
    "Print or save as PDF: relocation, job offer, and relationship decision checklists.",
  canonical: "/checklists",
});

export default function ChecklistsPage() {
  return (
    <>
      <ChecklistsEducation />
      <ChecklistsPageClient />
      <PageRevenueStrip className="pb-12" adPlacement="footer" />
    </>
  );
}
