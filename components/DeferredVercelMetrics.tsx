"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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

/** Mount after window load + idle so first paint / TBT are not competing with Vercel scripts. */
export default function DeferredVercelMetrics() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelScheduled: (() => void) | undefined;

    const armAfterLoad = () => {
      const w = window as Window & {
        requestIdleCallback?: (
          cb: IdleRequestCallback,
          opts?: IdleRequestOptions,
        ) => number;
        cancelIdleCallback?: (handle: number) => void;
      };
      const idleMs = 2200;
      const fallbackMs = 900;
      if (typeof w.requestIdleCallback === "function") {
        const id = w.requestIdleCallback(() => setReady(true), {
          timeout: idleMs,
        });
        cancelScheduled = () => w.cancelIdleCallback?.(id);
      } else {
        const t = window.setTimeout(() => setReady(true), fallbackMs);
        cancelScheduled = () => window.clearTimeout(t);
      }
    };

    if (document.readyState === "complete") {
      armAfterLoad();
    } else {
      window.addEventListener("load", armAfterLoad, { once: true });
    }

    return () => {
      cancelScheduled?.();
      window.removeEventListener("load", armAfterLoad);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <AnalyticsGate />
      <SpeedInsights />
    </>
  );
}
