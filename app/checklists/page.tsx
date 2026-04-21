import type { Metadata } from "next";
import ChecklistsPageClient from "./ChecklistsPageClient";

export const metadata: Metadata = {
  title: "Printable decision checklists — Life Decision Engine",
  description:
    "Print or save as PDF: relocation, job offer, and relationship decision checklists.",
  alternates: { canonical: "/checklists" },
};

export default function ChecklistsPage() {
  return <ChecklistsPageClient />;
}
