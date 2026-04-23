"use client";

import PosterBackdrop from "@/components/home/PosterBackdrop";
import { whatItFixesPosterClass } from "@/components/home/poster-gradients";
import type { SolveSectionCopy } from "@/lib/i18n/home-solve-section";

type Props = {
  copy: SolveSectionCopy;
  dir?: "ltr" | "rtl";
};

export default function WhatItFixesSection({ copy, dir = "ltr" }: Props) {
  return (
    <section
      id="section-what-it-fixes"
      className="home-section-wash home-section-wash--solves scroll-mt-36 rounded-[1.85rem] px-3 pt-16 pb-1 sm:px-4 sm:pt-20"
      aria-labelledby="what-it-fixes-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-magenta))]/90">
          {copy.eyebrow}
        </p>
        <h2
          id="what-it-fixes-heading"
          className="font-display mt-2 text-[clamp(1.5rem,1.05rem+1.5vw,2.1rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
        >
          {copy.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
          {copy.intro}
        </p>
        <ol className="mt-10 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {copy.blocks.map((b, i) => (
            <li key={b.label} className="h-full">
              <article
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.12] shadow-[0_20px_56px_-28px_rgb(var(--accent-2)/0.3)] ring-1 ring-white/[0.08] transition duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]/35"
                dir={dir}
              >
                <div
                  className={`relative flex min-h-[280px] flex-col justify-between overflow-hidden p-4 sm:min-h-[300px] sm:p-5 ${whatItFixesPosterClass(
                    i,
                  )}`}
                >
                  <PosterBackdrop />
                  <p className="relative z-10 text-[0.65rem] font-bold uppercase leading-tight tracking-[0.2em] text-white/80 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]">
                    {b.label}
                  </p>
                  <div className="relative z-10 mt-4 flex flex-1 flex-col justify-center gap-3 [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]">
                    <p className="text-sm font-medium leading-relaxed text-white/90 [text-wrap:pretty] sm:text-base">
                      {b.problem}
                    </p>
                    <p className="font-display text-base font-extrabold leading-snug text-white [text-wrap:pretty] sm:text-lg">
                      {b.fix}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
