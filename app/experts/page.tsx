import type { Metadata } from "next";
import { Suspense } from "react";
import ExpertsMarketplace from "./ExpertsMarketplace";

export const metadata: Metadata = {
  title: "Մասնագետների ցանց — համաշխարհային",
  description:
    "Հոգեբաններ, իրավաբաններ, ֆինանսիստներ։ Գրանցում և կապ աշխարհի ցանկացած վայրից։",
};

export default function ExpertsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[rgb(var(--surface))]" />
      }
    >
      <ExpertsMarketplace />
    </Suspense>
  );
}
