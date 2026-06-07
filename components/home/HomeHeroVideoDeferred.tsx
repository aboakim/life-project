"use client";

import { useEffect, useRef, useState } from "react";
import { scheduleIdle } from "@/components/ads/ensure-adsbygoogle";

type Props = {
  src: string;
  poster: string;
  ariaLabel: string;
};

/**
 * Hero MP4 loads after idle (or first scroll/tap) so LCP stays on the poster
 * JPEG in server HTML. Video replaces poster once decoded — same UX, faster FCP/LCP.
 */
export default function HomeHeroVideoDeferred({ src, poster, ariaLabel }: Props) {
  const [active, setActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (active) return;
    let cancelled = false;

    const go = () => {
      if (!cancelled) setActive(true);
    };

    scheduleIdle(go, { idleTimeoutMs: 2800, fallbackDelayMs: 1400 });

    window.addEventListener("scroll", go, { once: true, passive: true });
    window.addEventListener("pointerdown", go, { once: true, passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", go);
      window.removeEventListener("pointerdown", go);
    };
  }, [active]);

  useEffect(() => {
    const v = videoRef.current;
    if (!active || !v) return;
    void v.play().catch(() => {});
  }, [active]);

  if (!active) return null;

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label={ariaLabel}
      className="home-hero-video-shell__video absolute inset-0 z-[1] h-full w-full object-cover"
    />
  );
}
