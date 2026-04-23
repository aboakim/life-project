"use client";

import PosterBackdrop from "@/components/home/PosterBackdrop";
import { type PosterTone, posterGradientClass } from "@/components/home/poster-gradients";

type Props = {
  tone: PosterTone;
  /** 0–2: picks gradient within the section */
  index: number;
  title: string;
  /** Same ideas as the long text — the line people actually read on the “poster”. */
  shortLine: string;
  /** Long marketing line from `getUi` — for screen readers (full context). */
  fullDescription: string;
  stepNumber?: number;
  emoji?: string;
  dir?: "ltr" | "rtl";
};

export default function VisualStoryCard({
  tone,
  index,
  title,
  shortLine,
  fullDescription,
  stepNumber,
  emoji,
  dir = "ltr",
}: Props) {
  const g = posterGradientClass(tone, index);

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.12] shadow-[0_20px_56px_-28px_rgb(var(--accent-2)/0.28)] ring-1 ring-white/[0.08] transition duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]/40 hover:ring-[rgb(var(--accent))]/20"
      dir={dir}
    >
      <div
        className={`relative flex min-h-[220px] flex-col justify-end overflow-hidden p-4 sm:min-h-[260px] sm:p-5 ${g}`}
      >
        <PosterBackdrop />
        {emoji ? (
          <span
            className="absolute start-3 top-3 z-10 text-2xl drop-shadow-md"
            aria-hidden
          >
            {emoji}
          </span>
        ) : null}
        {stepNumber != null ? (
          <span className="absolute start-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white shadow-lg ring-2 ring-white/30 backdrop-blur-sm">
            {stepNumber}
          </span>
        ) : null}
        <div className="relative z-10 flex flex-col justify-end [text-shadow:0_1px_18px_rgba(0,0,0,0.45)]">
          <h3 className="font-display text-base font-extrabold leading-snug text-white [text-wrap:balance] sm:text-lg">
            {title}
          </h3>
          <p className="mt-2.5 text-sm font-medium leading-relaxed text-white/95 [text-wrap:pretty] sm:text-[0.95rem]">
            {shortLine}
          </p>
        </div>
      </div>
      <p className="sr-only">{fullDescription}</p>
    </article>
  );
}
