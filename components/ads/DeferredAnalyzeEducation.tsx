"use client";

import { useEffect, useState, type ReactNode } from "react";
import { scheduleIdle } from "@/components/ads/ensure-adsbygoogle";

type Props = { children: ReactNode };

/** Renders analyze-page education after idle so the writing form paints first. */
export default function DeferredAnalyzeEducation({ children }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    scheduleIdle(
      () => {
        if (!cancelled) setReady(true);
      },
      { idleTimeoutMs: 2800, fallbackDelayMs: 1600 },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div
        className="mx-auto max-w-6xl px-4 py-10 sm:px-6"
        aria-hidden
      />
    );
  }

  return <>{children}</>;
}
