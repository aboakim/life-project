import type { Metadata } from "next";
import DecisionStudioShell from "@/components/home/DecisionStudioShell";
import { initialPresetFromSearchParams } from "@/lib/home/initial-preset";

export const metadata: Metadata = {
  title: "Analyzer — Life Decision Engine",
  description:
    "Structured life-decision analysis: your question, context, and values → scenarios, four lenses, a timeline, and a score. Your report appears right below the form.",
  alternates: { canonical: "/analyze" },
};

export default async function AnalyzePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const initialPreset = initialPresetFromSearchParams(sp);

  return (
    <main id="main">
      <DecisionStudioShell
        initialPreset={initialPreset}
        focusLayout
      />
    </main>
  );
}
