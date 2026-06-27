import type { Metadata } from "next";
import CommunityGuidelinesEducation from "@/lib/page-education/CommunityGuidelinesEducation";
import GuidelinesPageClient from "./GuidelinesPageClient";
import { toolPageMetadata } from "@/lib/site-page-metadata";

export const metadata: Metadata = toolPageMetadata({
  title: "Community guidelines — Life Decision Engine",
  description:
    "How community Q&A works: plain text, light moderation, not professional advice.",
  canonical: "/community/guidelines",
});

export default function CommunityGuidelinesPage() {
  return (
    <>
      <CommunityGuidelinesEducation />
      <GuidelinesPageClient />
    </>
  );
}
