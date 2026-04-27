"use client";

import Image from "next/image";
import type { SolveSectionCopy } from "@/lib/i18n/home-solve-section";
import { getWhatItFixesImage } from "@/lib/home/visual-story-images";

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
          {copy.blocks.map((b, i) => {
            const { src, alt } = getWhatItFixesImage(i);
            return (
              <li key={b.label} className="h-full">
                <article
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-[rgb(var(--surface-2))] shadow-[0_20px_56px_-28px_rgb(var(--accent-2)/0.3)] ring-1 ring-white/[0.08] transition duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]/35"
                  dir={dir}
                >
                  <div className="relative h-44 w-full shrink-0 sm:h-48">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) min(46vw, 440px), min(94vw, 560px)"
                      quality={72}
                    />
                  </div>
                  <div className="isolate border-t border-neutral-200 bg-white px-3 py-3 sm:px-4 sm:py-3.5">
                    <p className="text-[0.65rem] font-bold uppercase leading-tight tracking-[0.18em] !text-neutral-500 antialiased">
                      {b.label}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-relaxed !text-neutral-800 [text-wrap:pretty] antialiased sm:text-base">
                      {b.problem}
                    </p>
                    <p className="mt-2 font-display text-base font-extrabold leading-snug !text-neutral-950 [text-wrap:pretty] antialiased sm:text-lg">
                      {b.fix}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
