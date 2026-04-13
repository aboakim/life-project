import type { Metadata } from "next";
import CommunityPageClient from "./CommunityPageClient";

export const metadata: Metadata = {
  title: "Community Q&A",
  description:
    "Ask questions and read answers from the community. Rate-limited, text-only posts.",
};

export default function CommunityPage() {
  return <CommunityPageClient />;
}
