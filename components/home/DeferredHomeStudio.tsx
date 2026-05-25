"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DecisionStudioShell = dynamic(
  () => import("@/components/home/DecisionStudioShell"),
  { ssr: false, loading: () => null },
);

function shouldLoadOnIntent(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      'a[href="/analyze"], a[href^="#section-"], #section-workspace, [data-load-studio]',
    ),
  );
}

/**
 * Loads the ~300kB home studio chunk after idle or explicit intent (scroll to
 * analyzer / click Analyze) so FCP, LCP, and INP stay on server-rendered HTML.
 */
export default function DeferredHomeStudio() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    let cancelled = false;
    let cancelScheduled: (() => void) | undefined;

    const go = () => {
      if (!cancelled) setReady(true);
    };

    const onIntent = (e: Event) => {
      if (shouldLoadOnIntent(e.target)) go();
    };

    const onScroll = () => {
      const el = document.getElementById("section-workspace");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.2) go();
    };

    window.addEventListener("pointerdown", onIntent, { passive: true });
    window.addEventListener("keydown", onIntent);
    window.addEventListener("scroll", onScroll, { passive: true });

    const armIdle = () => {
      const w = window as Window & {
        requestIdleCallback?: (
          cb: IdleRequestCallback,
          opts?: IdleRequestOptions,
        ) => number;
        cancelIdleCallback?: (handle: number) => void;
      };
      if (typeof w.requestIdleCallback === "function") {
        const id = w.requestIdleCallback(go, { timeout: 4000 });
        cancelScheduled = () => w.cancelIdleCallback?.(id);
      } else {
        const t = window.setTimeout(go, 1200);
        cancelScheduled = () => window.clearTimeout(t);
      }
    };

    if (document.readyState === "complete") {
      armIdle();
    } else {
      window.addEventListener("load", armIdle, { once: true });
    }

    return () => {
      cancelled = true;
      cancelScheduled?.();
      window.removeEventListener("pointerdown", onIntent);
      window.removeEventListener("keydown", onIntent);
      window.removeEventListener("load", armIdle);
    };
  }, [ready]);

  if (!ready) return null;

  return <DecisionStudioShell skipHero />;
}
