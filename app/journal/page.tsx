import type { Metadata } from "next";
import JournalPageClient from "./JournalPageClient";

export const metadata: Metadata = {
  title: "Decision journal — Life Decision Engine",
  description:
    "Private one-line notes per decision question, stored in your browser only (localStorage).",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return <JournalPageClient />;
}
