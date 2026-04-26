"use client";

import { useEffect, useState } from "react";

type Props = {
  eyebrow: string;
  moments: readonly [string, string, string, string, string];
};

const INTERVAL_MS = 8000;

export default function StayMomentsStrip({ eyebrow, moments }: Props) {
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
      INTERVAL_MS
    );
    return () => window.clearInterval(t);
  }, [moments.length, reducedMotion]);

  const line = moments[reducedMotion ? 0 : i] ?? moments[0];

  return (
    <div
      className="mt-6 rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.09] via-white/[0.04] to-transparent px-4 py-3 shadow-[0_16px_48px_-28px_rgb(var(--accent)/0.22)] backdrop-blur-md sm:px-5 sm:py-3.5"
      role="region"
      aria-label={eyebrow}
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[rgb(var(--accent-warm))]/95">
        {eyebrow}
      </p>
      <p
        dir="auto"
        className="mt-2 min-h-[3.1rem] text-sm font-medium leading-relaxed text-[rgb(var(--ink))] [text-wrap:pretty] sm:min-h-[2.75rem] motion-safe:transition-opacity motion-safe:duration-500"
        key={reducedMotion ? "static" : i}
        aria-live="polite"
      >
        {line}
      </p>
      <div className="mt-3 flex gap-1.5" aria-hidden>
        {moments.map((_, di) => (
          <span
            key={di}
            className={
              di === (reducedMotion ? 0 : i)
                ? "h-1.5 w-5 rounded-full bg-[rgb(var(--accent-2))]/80 transition-all duration-300"
                : "h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-300"
            }
          />
        ))}
      </div>
    </div>
  );
}
