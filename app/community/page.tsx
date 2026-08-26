import type { Metadata } from "next";
import CommunityEducation from "@/lib/page-education/CommunityEducation";
import CommunityPageClient from "./CommunityPageClient";
import PageRevenueStrip from "@/components/monetization/PageRevenueStrip";
import { toolPageMetadata } from "@/lib/site-page-metadata";

export const metadata: Metadata = toolPageMetadata({
  title: "Community Q&A",
  description:
    "Ask questions and read answers from the community. Rate-limited, text-only posts.",
  canonical: "/community",
});

export default function CommunityPage() {
  return (
    <>
      <CommunityEducation />
      <CommunityPageClient />
      <PageRevenueStrip className="pb-12" adPlacement="footer" />
    </>
  );
}
