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
 * Loads the home analyzer after idle or intent. Uses focusLayout+skipHero so
 * marketing sections (already SSR’d above) are not duplicated client-side.
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
      const el = document.getElementById("section-workspace-slot");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.15) go();
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
        const id = w.requestIdleCallback(go, { timeout: 8000 });
        cancelScheduled = () => w.cancelIdleCallback?.(id);
      } else {
        const t = window.setTimeout(go, 4500);
        cancelScheduled = () => window.clearTimeout(t);
      }
    };

    if (document.readyState === "complete") {
      armIdle();
    } else {
      window.addEventListener("load", armIdle, { once: true });
    }

    // Nudge once in case the slot is already near viewport.
    onScroll();

    return () => {
      cancelled = true;
      cancelScheduled?.();
      window.removeEventListener("pointerdown", onIntent);
      window.removeEventListener("keydown", onIntent);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", armIdle);
    };
  }, [ready]);

  return (
    <div id="section-workspace-slot" className="min-h-[12rem]">
      {ready ? <DecisionStudioShell skipHero focusLayout /> : null}
    </div>
  );
}
