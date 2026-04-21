import type { Metadata } from "next";
import GuidelinesPageClient from "./GuidelinesPageClient";

export const metadata: Metadata = {
  title: "Community guidelines — Life Decision Engine",
  description:
    "How community Q&A works: plain text, light moderation, not professional advice.",
  alternates: { canonical: "/community/guidelines" },
};

export default function CommunityGuidelinesPage() {
  return <GuidelinesPageClient />;
}
