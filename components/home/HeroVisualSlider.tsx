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
  /** Accessible name for the swipeable image area */
  ariaLabel: string;
  /** ms between auto-advance; 0 disables */
  autoMs?: number;
};

export default function HeroVisualSlider({
  slides,
  ariaLabel,
  autoMs = 0,
}: Props) {
  const [index, setIndex] = useState(0);
  /** After idle, mount images for carousel neighbors (not all slides — saves decode / network on first paint). */
  const [idleReady, setIdleReady] = useState(false);
  /** On phone, keep every slide mounted so horizontal swipe never flashes the page wash. */
  const [mobileCarousel, setMobileCarousel] = useState(false);
  const pauseRef = useRef(false);
  /** Touch swipe on the image strip only (not the arrow/dot bar). */
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const n = slides.length;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobileCarousel(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /** After first paint (2 rAF), decode neighbor slides — avoids multi‑second idle wait on mobile. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf2 = 0;
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => setIdleReady(true));
    });
    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, []);

  const showSlideImage = useCallback(
    (i: number) => {
      if (mobileCarousel) return true;
      if (i === index) return true;
      if (!idleReady) return false;
      return i === (index + 1) % n || i === (index - 1 + n) % n;
    },
    [mobileCarousel, idleReady, index, n],
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

  const SWIPE_MIN_PX = 48;

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (n <= 1) return;
      pauseRef.current = true;
      const t = e.touches[0];
      touchStartRef.current = { x: t.clientX, y: t.clientY };
    },
    [n],
  );

  const endTouchSwipe = useCallback(
    (clientX: number, clientY: number) => {
      pauseRef.current = false;
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (!start || n <= 1) return;
      const dx = clientX - start.x;
      const dy = clientY - start.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      // Prefer page scroll when the gesture is mostly vertical.
      if (absDx < SWIPE_MIN_PX || absDx < absDy * 1.15) return;
      if (dx > 0) go(-1);
      else go(1);
    },
    [go, n],
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const t = e.changedTouches[0];
      if (!t) return;
      endTouchSwipe(t.clientX, t.clientY);
    },
    [endTouchSwipe],
  );

  const onTouchCancel = useCallback(() => {
    pauseRef.current = false;
    touchStartRef.current = null;
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
      className="home-hero-carousel-shell relative overflow-hidden rounded-2xl border border-white/[0.14] shadow-[0_24px_80px_-32px_rgb(var(--accent)/0.45)] max-md:shadow-[0_10px_28px_-14px_rgb(0_0_0/0.55)]"
      onMouseEnter={() => {
        pauseRef.current = true;
      }}
      onMouseLeave={() => {
        pauseRef.current = false;
      }}
    >
      <div
        className="relative aspect-[4/5] w-full touch-pan-y select-none sm:aspect-[3/4] lg:aspect-[4/5]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
        role="region"
        aria-label={ariaLabel}
      >
        <div
          className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
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
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 42vw, 380px"
                  quality={i === 0 ? 52 : 60}
                  priority={i === 0}
                  fetchPriority={i === 0 ? "high" : "low"}
                  loading={i === 0 ? "eager" : "lazy"}
                  /**
                   * Slide 0: self-hosted static file — skip /_next/image so
                   * preload + fallback <img> share one URL (faster cold LCP).
                   */
                  unoptimized={i === 0}
                  /**
                   * `sync` decode blocks the main thread and inflates TBT in
                   * Lighthouse even when LCP is only ~100ms later. `async`
                   * keeps decode off the critical path; priority + eager fetch
                   * still prioritise the LCP image.
                   */
                  decoding="async"
                  draggable={false}
                />
              ) : (
                <div
                  className="absolute inset-0 bg-[rgb(20_18_38)]"
                  aria-hidden
                />
              )}
              <div
                className="home-hero-video-shell__caption-scrim pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[rgb(20_18_38)] via-[rgb(20_18_38/0.65)] to-transparent"
                aria-hidden
              />
              <p className="home-hero-video-shell__caption absolute bottom-0 left-0 right-0 px-4 py-3 text-center text-[13px] font-medium leading-snug text-white [text-wrap:balance] sm:px-5 sm:text-sm md:pb-5 md:pt-12 md:text-white/95">
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
