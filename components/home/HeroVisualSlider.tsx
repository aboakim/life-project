"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type HeroSlide = {
  src: string;
  alt: string;
  caption: string;
};

type Props = {
  slides: readonly HeroSlide[];
  /** ms between auto-advance; 0 disables */
  autoMs?: number;
};

export default function HeroVisualSlider({
  slides,
  autoMs = 5200,
}: Props) {
  const [index, setIndex] = useState(0);
  /** After idle, mount images for carousel neighbors (not all slides — saves decode / network on first paint). */
  const [idleReady, setIdleReady] = useState(false);
  const pauseRef = useRef(false);
  const n = slides.length;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ric = window.requestIdleCallback?.bind(window);
    const cancelIdle = window.cancelIdleCallback?.bind(window);
    if (ric) {
      const id = ric(
        () => {
          setIdleReady(true);
        },
        { timeout: 2200 },
      );
      return () => cancelIdle?.(id);
    }
    const t = window.setTimeout(() => setIdleReady(true), 220);
    return () => window.clearTimeout(t);
  }, []);

  const showSlideImage = useCallback(
    (i: number) => {
      if (i === index) return true;
      if (!idleReady) return false;
      return i === (index + 1) % n || i === (index - 1 + n) % n;
    },
    [idleReady, index, n],
  );

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + n) % n);
    },
    [n]
  );

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    if (n <= 1 || autoMs <= 0) return;
    const id = window.setInterval(() => {
      if (!pauseRef.current) setIndex((i) => (i + 1) % n);
    }, autoMs);
    return () => window.clearInterval(id);
  }, [autoMs, n]);

  if (n === 0) return null;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/[0.14] bg-[rgb(var(--surface-2))] shadow-[0_24px_80px_-32px_rgb(var(--accent)/0.45)]"
      onMouseEnter={() => {
        pauseRef.current = true;
      }}
      onMouseLeave={() => {
        pauseRef.current = false;
      }}
    >
      <div className="relative aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-[4/5]">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translate3d(-${index * 100}%,0,0)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={`${slide.src}-${i}`}
              className="relative h-full min-w-full shrink-0"
            >
              {showSlideImage(i) ? (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) min(100vw, 440px), (max-width: 1024px) min(92vw, 440px), min(420px, 40vw)"
                  quality={i === 0 ? 65 : 72}
                  priority={i === 0}
                  fetchPriority={i === 0 ? "high" : "low"}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding={i === 0 ? "sync" : "async"}
                  draggable={false}
                />
              ) : (
                <div
                  className="absolute inset-0 bg-[rgb(var(--surface-2))]"
                  aria-hidden
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(28_24_52/0.9)] via-[rgb(40_36_70/0.32)] to-[rgb(var(--accent)/0.12)]" />
              <p className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-12 text-center text-[13px] font-medium leading-snug text-white/95 [text-wrap:balance] sm:px-5 sm:pb-5 sm:text-sm">
                {slide.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-white/[0.08] bg-black/35 px-3 py-2.5 backdrop-blur-md sm:px-4">
        <button
          type="button"
          onClick={() => go(-1)}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-lg text-white/90 transition hover:bg-white/[0.12]"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <div className="flex flex-1 flex-wrap items-center justify-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={
                i === index
                  ? "h-2 w-6 rounded-full bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-2))] shadow-[0_0_16px_rgb(var(--accent)/0.5)] transition"
                  : "h-2 w-2 rounded-full bg-white/25 transition hover:bg-white/45"
              }
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-lg text-white/90 transition hover:bg-white/[0.12]"
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </div>
  );
}
