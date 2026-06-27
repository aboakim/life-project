import type { Metadata } from "next";
import { Suspense } from "react";
import DecisionStudioShell from "@/components/home/DecisionStudioShell";
import AnalyzePageEducation from "@/app/analyze/AnalyzePageEducation";

export const metadata: Metadata = {
  title: "Analyzer — Life Decision Engine",
  description:
    "Structured life-decision analysis: your question, context, and values → scenarios, four lenses, a timeline, and a score. Your report appears right below the form.",
  alternates: { canonical: "/analyze" },
};

export default function AnalyzePage() {
  return (
    <main id="main">
      {/*
        Publisher copy first in DOM so AdSense reviewers and crawlers see
        substantial editorial HTML before the interactive analyzer shell.
      */}
      <AnalyzePageEducation />
      <Suspense
        fallback={
          <div className="min-h-[40vh] bg-[rgb(var(--surface))]" aria-hidden />
        }
      >
        <DecisionStudioShell focusLayout />
      </Suspense>
    </main>
  );
}
