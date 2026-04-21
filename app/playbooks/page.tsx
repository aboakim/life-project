import type { Metadata } from "next";
import PlaybooksPageClient from "./PlaybooksPageClient";

export const metadata: Metadata = {
  title: "Topic playbooks — Life Decision Engine",
  description:
    "Curated reading paths for relocation, career, and relationships — blog posts and next steps.",
  alternates: { canonical: "/playbooks" },
};

export default function PlaybooksPage() {
  return <PlaybooksPageClient />;
}
