"use client";

import dynamic from "next/dynamic";
import DecisionStudioSkeleton from "@/components/home/DecisionStudioSkeleton";
import type { InitialPreset } from "@/lib/home/initial-preset";

export type { InitialPreset };

const DecisionStudio = dynamic(
  () => import("@/components/DecisionStudio"),
  {
    loading: () => <DecisionStudioSkeleton />,
  },
);

type ShellProps = {
  initialPreset?: InitialPreset;
  focusLayout?: boolean;
};

/**
 * Client wrapper — preset comes from the server page (no useSearchParams → no Suspense blank gap).
 * Dynamic import splits the large DecisionStudio bundle so mobile PSI parses less JS up front.
 */
export default function DecisionStudioShell({
  initialPreset = null,
  focusLayout = false,
}: ShellProps) {
  return (
    <DecisionStudio initialPreset={initialPreset} focusLayout={focusLayout} />
  );
}
