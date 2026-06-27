import type { Metadata } from "next";
import CommunityEducation from "@/lib/page-education/CommunityEducation";
import CommunityPageClient from "./CommunityPageClient";

export const metadata: Metadata = {
  title: "Community Q&A",
  description:
    "Ask questions and read answers from the community. Rate-limited, text-only posts.",
  alternates: { canonical: "/community" },
};

export default function CommunityPage() {
  return (
    <>
      <CommunityPageClient />
      <CommunityEducation />
    </>
  );
}
