"use client";

import { useCallback, useEffect, useState } from "react";

type Props = {
  eyebrow: string;
  moments: readonly [string, string, string, string, string, string];
  shuffleLabel: string;
};

export default function SparkShuffleStrip({
  eyebrow,
  moments,
  shuffleLabel,
}: Props) {
  const [i, setI] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setI(Math.floor(Math.random() * moments.length));
  }, [moments]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setI((v) => (v + 1) % moments.length);
    }, 8200);
    return () => clearInterval(id);
  }, [moments.length, reducedMotion]);

  const next = useCallback(() => {
    setI((v) => (v + 1) % moments.length);
  }, [moments.length]);

  const line = moments[i] ?? moments[0]!;

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-br from-[rgb(var(--accent))]/[0.12] via-white/[0.04] to-[rgb(var(--accent-magenta))]/[0.08] px-5 py-5 shadow-[0_20px_56px_-36px_rgb(var(--accent)/0.35),inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-inset ring-white/[0.05] sm:px-6 sm:py-6"
      aria-live="polite"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[rgb(var(--accent))]/25 blur-3xl motion-safe:animate-pulse"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-14 -left-8 h-44 w-44 rounded-full bg-[rgb(var(--accent-2))]/20 blur-3xl motion-safe:animate-pulse motion-safe:[animation-delay:1.2s] motion-safe:[animation-duration:4.5s]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-[min(90%,20rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-2xl"
        aria-hidden
      />

      <p className="relative text-[10px] font-semibold uppercase tracking-[0.22em] text-[rgb(var(--accent-2))]/90">
        {eyebrow}
      </p>
      <p className="relative mt-3 min-h-[3.25rem] text-sm font-medium leading-relaxed text-[rgb(var(--ink))] [text-wrap:pretty] motion-safe:transition-opacity motion-safe:duration-500">
        {line}
      </p>
      <button
        type="button"
        onClick={next}
        className="relative mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.08] px-3 py-1.5 text-[11px] font-semibold text-[rgb(var(--ink-soft))] shadow-[0_2px_0_0_rgb(0_0_0/0.12),0_6px_20px_-8px_rgb(176_138_255/0.2)] transition hover:border-[rgb(var(--accent-2))]/40 hover:bg-white/[0.14] hover:text-[rgb(var(--ink))] motion-safe:hover:-translate-y-0.5 active:translate-y-px"
      >
        <span className="text-[rgb(var(--accent-2))]" aria-hidden>
          ✦
        </span>
        {shuffleLabel}
      </button>
    </div>
  );
}
