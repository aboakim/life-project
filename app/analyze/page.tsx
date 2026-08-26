import type { Metadata } from "next";
import { Suspense } from "react";
import DecisionStudioShell from "@/components/home/DecisionStudioShell";
import AnalyzePageEducation from "@/app/analyze/AnalyzePageEducation";
import DeferredAnalyzeEducation from "@/components/ads/DeferredAnalyzeEducation";
import PageRevenueStrip from "@/components/monetization/PageRevenueStrip";
import { toolPageMetadata } from "@/lib/site-page-metadata";

export const metadata: Metadata = toolPageMetadata({
  title: "Analyzer — Life Decision Engine",
  description:
    "Structured life-decision analysis: your question, context, and values → scenarios, four lenses, a timeline, and a score.",
  canonical: "/analyze",
});

export default function AnalyzePage() {
  return (
    <main id="main">
      {/* Writing platform first — users land on the form immediately. */}
      <Suspense
        fallback={
          <div className="min-h-[50vh] bg-[rgb(var(--surface))]" aria-hidden />
        }
      >
        <DecisionStudioShell focusLayout />
      </Suspense>
      {/* Publisher/education copy after idle so it does not delay the form. */}
      <DeferredAnalyzeEducation>
        <AnalyzePageEducation />
      </DeferredAnalyzeEducation>
      <PageRevenueStrip className="pb-10" adPlacement="footer" />
    </main>
  );
}
