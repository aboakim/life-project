import type { Metadata } from "next";
import { Suspense } from "react";
import ExpertsMarketplace from "./ExpertsMarketplace";
import ExpertsPageEducation from "./ExpertsPageEducation";

export const metadata: Metadata = {
  title: "Մասնագետների ցանց — համաշխարհային",
  description:
    "Հոգեբաններ, իրավաբաններ, ֆինանսիստներ։ Գրանցում և կապ աշխարհի ցանկացած վայրից։",
  alternates: { canonical: "/experts" },
};

export default function ExpertsPage() {
  return (
    <>
      {/*
        ExpertsMarketplace is a client component that calls
        `useSearchParams()` and therefore must live inside <Suspense>.
        That means the directory list itself isn't part of the SSR HTML —
        only its fallback shell is. To make sure crawlers (Googlebot,
        AdSense reviewers) always see substantial publisher content on
        /experts, we render <ExpertsPageEducation /> outside the Suspense
        boundary as a pure server component.
      */}
      <Suspense
        fallback={
          <div className="min-h-screen bg-[rgb(var(--surface))]" />
        }
      >
        <ExpertsMarketplace />
      </Suspense>
      <ExpertsPageEducation />
    </>
  );
}
