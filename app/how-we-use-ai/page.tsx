import type { Metadata } from "next";
import HowWeUseAiEducation from "@/lib/page-education/HowWeUseAiEducation";
import HowWeUseAiPageClient from "./HowWeUseAiPageClient";
import { toolPageMetadata } from "@/lib/site-page-metadata";

export const metadata: Metadata = toolPageMetadata({
  title: "How we use AI — Life Decision Engine",
  description:
    "Transparency: how the structured analyzer works, consent, ads, and limits.",
  canonical: "/how-we-use-ai",
});

export default function HowWeUseAiPage() {
  return (
    <>
      <HowWeUseAiEducation />
      <HowWeUseAiPageClient />
    </>
  );
}
