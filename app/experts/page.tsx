import type { Metadata } from "next";
import { Suspense } from "react";
import ExpertsMarketplace from "./ExpertsMarketplace";
import ExpertsPageEducation from "./ExpertsPageEducation";
import { toolPageMetadata } from "@/lib/site-page-metadata";

export const metadata: Metadata = toolPageMetadata({
  title: "Experts directory — psychologists, lawyers, planners",
  description:
    "Curated directory of independent professionals for major life decisions. Register your practice or browse by role, country, and language.",
  canonical: "/experts",
});

export default function ExpertsPage() {
  return (
    <>
      <ExpertsPageEducation />
      <Suspense
        fallback={
          <div className="min-h-[40vh] bg-[rgb(var(--surface))]" aria-hidden />
        }
      >
        <ExpertsMarketplace />
      </Suspense>
    </>
  );
}
