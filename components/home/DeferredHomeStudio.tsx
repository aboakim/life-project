"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DecisionStudioShell = dynamic(
  () => import("@/components/home/DecisionStudioShell"),
  { ssr: false, loading: () => null },
);

/**
 * Loads the ~300kB home studio chunk after first paint / idle so LCP and FCP
 * stay on the server-rendered hero instead of blocking on hydration.
 */
export default function DeferredHomeStudio() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let cancelScheduled: (() => void) | undefined;

    const arm = () => {
      const w = window as Window & {
        requestIdleCallback?: (
          cb: IdleRequestCallback,
          opts?: IdleRequestOptions,
        ) => number;
        cancelIdleCallback?: (handle: number) => void;
      };
      const go = () => {
        if (!cancelled) setReady(true);
      };
      if (typeof w.requestIdleCallback === "function") {
        const id = w.requestIdleCallback(go, { timeout: 2200 });
        cancelScheduled = () => w.cancelIdleCallback?.(id);
      } else {
        const t = window.setTimeout(go, 400);
        cancelScheduled = () => window.clearTimeout(t);
      }
    };

    if (document.readyState === "complete") {
      arm();
    } else {
      window.addEventListener("load", arm, { once: true });
    }

    return () => {
      cancelled = true;
      cancelScheduled?.();
      window.removeEventListener("load", arm);
    };
  }, []);

  if (!ready) return null;

  return <DecisionStudioShell skipHero />;
}
