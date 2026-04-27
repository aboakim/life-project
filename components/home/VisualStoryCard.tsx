"use client";

import Image from "next/image";
import PosterBackdrop from "@/components/home/PosterBackdrop";
import { type PosterTone, posterGradientClass } from "@/components/home/poster-gradients";

type Props = {
  tone: PosterTone;
  index: number;
  title: string;
  shortLine: string;
  fullDescription: string;
  stepNumber?: number;
  emoji?: string;
  dir?: "ltr" | "rtl";
  imageSrc?: string;
  imageAlt?: string;
};

/**
 * Solid light panel (no alpha) so section “wash” tints don’t bleed through.
 * `!text-*` avoids inheriting homepage `rgb(var(--ink-soft))` (teal/grey) from parents.
 */
function TextOnLight({ title, shortLine }: { title: string; shortLine: string }) {
  return (
    <div className="isolate border-t border-neutral-200 bg-white px-3 py-3 sm:px-4 sm:py-3.5">
      <h3 className="font-display text-base font-extrabold leading-snug !text-neutral-950 [text-wrap:balance] antialiased sm:text-lg">
        {title}
      </h3>
      <p className="mt-2 text-sm font-medium leading-relaxed !text-neutral-800 [text-wrap:pretty] antialiased sm:text-[0.95rem]">
        {shortLine}
      </p>
    </div>
  );
}

/** Fallback: no photo — white text on gradient “poster”. */
function TextOnDark({ title, shortLine }: { title: string; shortLine: string }) {
  return (
    <div className="relative z-10 flex flex-col justify-end [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
      <h3 className="font-display text-base font-extrabold leading-snug text-white [text-wrap:balance] sm:text-lg">
        {title}
      </h3>
      <p className="mt-2.5 text-sm font-medium leading-relaxed text-white/95 [text-wrap:pretty] sm:text-[0.95rem]">
        {shortLine}
      </p>
    </div>
  );
}

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
      className="group flex h-full max-w-full flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-[rgb(var(--surface-2))] shadow-[0_20px_56px_-28px_rgb(var(--accent-2)/0.28)] ring-1 ring-white/[0.08] transition duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]/40 hover:ring-[rgb(var(--accent))]/20"
      dir={dir}
    >
      <div
        className={
          withPhoto
            ? "relative h-40 w-full shrink-0 sm:h-44"
            : `relative flex min-h-[240px] w-full flex-col justify-end overflow-hidden p-4 sm:min-h-[260px] sm:p-5 ${g}`
        }
      >
        {withPhoto ? (
          <Image
            src={imageSrc!}
            alt={imageAlt ?? ""}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 340px, (min-width: 640px) min(46vw, 440px), min(94vw, 540px)"
          />
        ) : (
          <PosterBackdrop />
        )}
        {withPhoto && stepNumber != null ? (
          <span className="absolute start-2.5 top-2.5 z-20 flex size-8 items-center justify-center rounded-full bg-white/95 text-xs font-bold text-slate-900 shadow-md ring-1 ring-black/10 sm:size-9 sm:text-sm">
            {stepNumber}
          </span>
        ) : null}
        {withPhoto && emoji ? (
          <span
            className={`absolute top-2.5 z-20 rounded-md bg-white/95 px-1.5 py-0.5 text-2xl shadow-sm ring-1 ring-black/5 ${
              stepNumber != null ? "start-12 sm:start-14" : "start-2.5"
            }`}
            aria-hidden
          >
            {emoji}
          </span>
        ) : null}
        {!withPhoto ? (
          <div className="relative z-10 flex flex-1 flex-col justify-end">
            <TextOnDark title={title} shortLine={shortLine} />
          </div>
        ) : null}
      </div>
      {withPhoto ? <TextOnLight title={title} shortLine={shortLine} /> : null}
      <p className="sr-only">{fullDescription}</p>
    </article>
  );
}
