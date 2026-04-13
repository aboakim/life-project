"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";

type Props = {
  eyebrow: string;
  images: readonly string[];
  alts: readonly string[];
  ariaLabel: string;
};

export default function ProductSceneStrip({
  eyebrow,
  images,
  alts,
  ariaLabel,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth * 0.85;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  }, []);

  return (
    <div className="mt-10">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-magenta))]/90">
          {eyebrow}
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            className="inline-flex size-8 items-center justify-center rounded-lg border border-white/12 bg-white/[0.05] text-sm text-white/85 transition hover:bg-white/[0.1]"
            aria-label="Scroll scenes left"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            className="inline-flex size-8 items-center justify-center rounded-lg border border-white/12 bg-white/[0.05] text-sm text-white/85 transition hover:bg-white/[0.1]"
            aria-label="Scroll scenes right"
          >
            ›
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-1"
        style={{ scrollbarWidth: "none" }}
        aria-label={ariaLabel}
        role="region"
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="relative aspect-[5/3] w-[min(100%,420px)] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/[0.1] bg-[rgb(var(--surface-2))] shadow-[0_16px_48px_-24px_rgb(var(--accent-2)/0.35)]"
          >
            <Image
              src={src}
              alt={alts[i] ?? "Scene"}
              fill
              className="object-cover transition duration-500 hover:scale-[1.03]"
              sizes="420px"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[rgb(var(--accent))]/15 via-transparent to-[rgb(var(--accent-magenta))]/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
