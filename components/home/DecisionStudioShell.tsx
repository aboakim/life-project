"use client";

import DecisionStudio from "@/components/DecisionStudio";
import type { InitialPreset } from "@/lib/home/initial-preset";

export type { InitialPreset };

type ShellProps = {
  initialPreset?: InitialPreset;
  focusLayout?: boolean;
};

/**
 * Client wrapper — preset comes from the server page (no useSearchParams → no Suspense blank gap).
 * Eager import keeps the hero carousel (LCP image) off the extra dynamic-chunk round trip.
 */
export default function DecisionStudioShell({
  initialPreset = null,
  focusLayout = false,
}: ShellProps) {
  return (
    <DecisionStudio initialPreset={initialPreset} focusLayout={focusLayout} />
  );
}
