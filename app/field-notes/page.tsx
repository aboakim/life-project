import type { Metadata } from "next";
import FieldNotesPageClient from "./FieldNotesPageClient";

export const metadata: Metadata = {
  title: "Field notes lab — Life Decision Engine",
  description:
    "Browser-only text radar: reading time, token counts, and a weighted word sketch. Nothing is uploaded.",
  alternates: { canonical: "/field-notes" },
};

export default function FieldNotesPage() {
  return <FieldNotesPageClient />;
}
