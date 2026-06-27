import type { Metadata } from "next";
import JournalEducation from "@/lib/page-education/JournalEducation";
import JournalPageClient from "./JournalPageClient";
import { toolPageMetadata } from "@/lib/site-page-metadata";

export const metadata: Metadata = toolPageMetadata({
  title: "Decision journal — Life Decision Engine",
  description:
    "Private one-line notes per decision question, stored in your browser only (localStorage).",
  canonical: "/journal",
});

export default function JournalPage() {
  return (
    <>
      <JournalEducation />
      <JournalPageClient />
    </>
  );
}
