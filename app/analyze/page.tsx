import type { Metadata } from "next";
import DecisionStudioShell from "@/components/home/DecisionStudioShell";

export const metadata: Metadata = {
  title: "Analyzer — Life Decision Engine",
  description:
    "Structured life-decision analysis: your question, context, and values → scenarios, four lenses, a timeline, and a score. Your report appears right below the form.",
  alternates: { canonical: "/analyze" },
};

export default function AnalyzePage() {
  return (
    <main id="main">
      <DecisionStudioShell focusLayout />
    </main>
  );
}
