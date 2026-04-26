"use client";

import { useEffect, useState } from "react";

type Props = {
  eyebrow: string;
  moments: readonly [string, string, string, string, string];
};

const INTERVAL_MS = 9400;

/** Rotating “brief lab” hints — distinct accent from StayMomentsStrip */
export default function LabMomentsStrip({ eyebrow, moments }: Props) {
  const [i, setI] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const t = window.setInterval(
      () => setI((v) => (v + 1) % moments.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(t);
  }, [moments.length, reducedMotion]);

  const line = moments[reducedMotion ? 0 : i] ?? moments[0];

  return (
    <div
      className="relative mt-4 overflow-hidden rounded-2xl border border-cyan-400/20 border-s-[3px] border-s-[rgb(var(--accent-2))]/55 bg-gradient-to-br from-[rgb(var(--accent-2))]/[0.08] via-white/[0.04] to-transparent px-4 py-3 shadow-[0_14px_40px_-26px_rgb(var(--accent-2)/0.28),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:px-5 sm:py-3.5"
      role="region"
      aria-label={eyebrow}
    >
      <div
        className="pointer-events-none absolute -end-8 -top-10 h-28 w-28 rounded-full bg-cyan-400/15 blur-2xl"
        aria-hidden
      />
      <p className="relative text-[0.65rem] font-bold uppercase tracking-[0.2em] text-cyan-200/90">
        {eyebrow}
      </p>
      <p
        dir="auto"
        className="relative mt-2 min-h-[3rem] text-sm font-medium leading-relaxed text-[rgb(var(--ink))] [text-wrap:pretty] sm:min-h-[2.65rem] motion-safe:transition-opacity motion-safe:duration-500"
        key={reducedMotion ? "static" : i}
        aria-live="polite"
      >
        {line}
      </p>
      <div className="relative mt-3 flex gap-1.5" aria-hidden>
        {moments.map((_, di) => (
          <span
            key={di}
            className={
              di === (reducedMotion ? 0 : i)
                ? "h-1.5 w-5 rounded-full bg-[rgb(var(--accent-2))]/85 transition-all duration-300"
                : "h-1.5 w-1.5 rounded-full bg-white/18 transition-all duration-300"
            }
          />
        ))}
      </div>
    </div>
  );
}
