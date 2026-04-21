import type { Metadata } from "next";
import HowWeUseAiPageClient from "./HowWeUseAiPageClient";

export const metadata: Metadata = {
  title: "How we use AI — Life Decision Engine",
  description:
    "Transparency: how the structured analyzer works, consent, ads, and limits.",
  alternates: { canonical: "/how-we-use-ai" },
};

export default function HowWeUseAiPage() {
  return <HowWeUseAiPageClient />;
}
