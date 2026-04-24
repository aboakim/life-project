"use client";

import dynamic from "next/dynamic";

/**
 * Kept in a Client Component so we can `ssr: false` and avoid shipping
 * analytics bundles in the main server path / blocking hydration.
 */
const AnalyticsGate = dynamic(
  () => import("@/components/AnalyticsGate"),
  { ssr: false, loading: () => null },
);
const SpeedInsights = dynamic(
  () =>
    import("@vercel/speed-insights/next").then((m) => m.SpeedInsights),
  { ssr: false, loading: () => null },
);

export default function DeferredVercelMetrics() {
  return (
    <>
      <AnalyticsGate />
      <SpeedInsights />
    </>
  );
}
