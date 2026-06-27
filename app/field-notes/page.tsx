import type { Metadata } from "next";
import FieldNotesEducation from "@/lib/page-education/FieldNotesEducation";
import FieldNotesPageClient from "./FieldNotesPageClient";
import { toolPageMetadata } from "@/lib/site-page-metadata";

export const metadata: Metadata = toolPageMetadata({
  title: "Field notes lab — Life Decision Engine",
  description:
    "Browser-only text radar: reading time, token counts, and a weighted word sketch. Nothing is uploaded.",
  canonical: "/field-notes",
});

export default function FieldNotesPage() {
  return (
    <>
      <FieldNotesEducation />
      <FieldNotesPageClient />
    </>
  );
}
