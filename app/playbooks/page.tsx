import type { Metadata } from "next";
import PlaybooksEducation from "@/lib/page-education/PlaybooksEducation";
import PlaybooksPageClient from "./PlaybooksPageClient";
import PageRevenueStrip from "@/components/monetization/PageRevenueStrip";
import { toolPageMetadata } from "@/lib/site-page-metadata";

export const metadata: Metadata = toolPageMetadata({
  title: "Topic playbooks — Life Decision Engine",
  description:
    "Curated reading paths for relocation, career, and relationships — blog posts and next steps.",
  canonical: "/playbooks",
});

export default function PlaybooksPage() {
  return (
    <>
      <PlaybooksEducation />
      <PlaybooksPageClient />
      <PageRevenueStrip className="pb-12" adPlacement="footer" />
    </>
  );
}
