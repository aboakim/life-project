"use client";

import Image from "next/image";
import PosterBackdrop from "@/components/home/PosterBackdrop";
import { type PosterTone, posterGradientClass } from "@/components/home/poster-gradients";

type Props = {
  tone: PosterTone;
  /** 0–2: gradient fallback when `imageSrc` is omitted; image pick when `imageSrc` is set. */
  index: number;
  title: string;
  shortLine: string;
  fullDescription: string;
  stepNumber?: number;
  emoji?: string;
  dir?: "ltr" | "rtl";
  /** Photo background; readable text is ensured with dark scrims, not the raw photo. */
  imageSrc?: string;
  imageAlt?: string;
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
  imageSrc,
  imageAlt,
}: Props) {
  const g = posterGradientClass(tone, index);
  const withPhoto = Boolean(imageSrc);

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.12] shadow-[0_20px_56px_-28px_rgb(var(--accent-2)/0.28)] ring-1 ring-white/[0.08] transition duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]/40 hover:ring-[rgb(var(--accent))]/20"
      dir={dir}
    >
      <div
        className={`relative flex min-h-[220px] flex-col justify-end overflow-hidden p-4 sm:min-h-[260px] sm:p-5 ${
          withPhoto ? "bg-[rgb(var(--surface-2))]" : g
        }`}
      >
        {withPhoto ? (
          <>
            <Image
              src={imageSrc!}
              alt={imageAlt ?? ""}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 100vw"
            />
            {/* Readability: strong bottom scrim + lighter top so photo still shows through */}
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/92 via-black/50 to-black/20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(0,0,0,0.2),transparent_55%)]"
              aria-hidden
            />
          </>
        ) : (
          <PosterBackdrop />
        )}
        {emoji ? (
          <span
            className="absolute start-3 top-3 z-10 text-2xl drop-shadow-md [filter:drop-shadow(0_0_6px_rgba(0,0,0,0.9))]"
            aria-hidden
          >
            {emoji}
          </span>
        ) : null}
        {stepNumber != null ? (
          <span className="absolute start-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/50 text-xs font-bold text-white shadow-lg ring-2 ring-white/35 backdrop-blur-sm">
            {stepNumber}
          </span>
        ) : null}
        <div className="relative z-10 flex flex-col justify-end [text-shadow:0_2px_16px_rgba(0,0,0,0.85),0_1px_3px_rgba(0,0,0,0.9)]">
          <h3 className="font-display text-base font-extrabold leading-snug text-white [text-wrap:balance] sm:text-lg">
            {title}
          </h3>
          <p className="mt-2.5 text-sm font-medium leading-relaxed text-white [text-wrap:pretty] sm:text-[0.95rem]">
            {shortLine}
          </p>
        </div>
      </div>
      <p className="sr-only">{fullDescription}</p>
    </article>
  );
}
