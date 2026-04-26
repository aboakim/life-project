"use client";

import { useEffect, useRef } from "react";

type Props = {
  /**
   * When true and env vars are missing, render a sized, styled reserve band
   * (standard horizontal ad proportions) instead of returning null.
   */
  reserveWhenDisabled?: boolean;
  placeholderEyebrow?: string;
  placeholderHint?: string;
  className?: string;
};

/**
 * Google AdSense — revenue goes to your AdSense account (bank/payout in AdSense UI).
 * Set NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxx and NEXT_PUBLIC_ADSENSE_SLOT_HOME=xxxxxxxx
 * after site approval in https://www.google.com/adsense/
 *
 * The main site layout already loads `adsbygoogle.js` in <head>; this component
 * only pushes the inline unit once the ins node exists.
 */
export default function AdSenseBanner({
  reserveWhenDisabled = false,
  placeholderEyebrow,
  placeholderHint,
  className = "",
}: Props) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME;
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || !slot || pushed.current) return;
    const id = window.requestAnimationFrame(() => {
      try {
        const w = window as unknown as {
          adsbygoogle?: unknown[];
        };
        w.adsbygoogle = w.adsbygoogle || [];
        w.adsbygoogle.push({});
        pushed.current = true;
      } catch {
        /* ignore */
      }
    });
    return () => window.cancelAnimationFrame(id);
  }, [client, slot]);

  const frame =
    "relative overflow-hidden rounded-[1.35rem] border border-white/[0.14] bg-gradient-to-b from-white/[0.09] via-black/25 to-black/40 px-3 py-4 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_28px_80px_-40px_rgb(var(--accent)/0.35)] sm:px-5 sm:py-5";

  if (!client || !slot) {
    if (!reserveWhenDisabled) return null;
    return (
      <div
        className={`ad-reserve-slot mx-auto max-w-4xl ${className}`.trim()}
        role="note"
        aria-label={placeholderEyebrow ?? "Reserved display area"}
      >
        <div className={frame}>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgb(var(--accent) / 0.22), transparent 45%), radial-gradient(circle at 80% 70%, rgb(var(--accent-2) / 0.18), transparent 42%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            aria-hidden
            style={{
              backgroundImage:
                "repeating-linear-gradient(-12deg, rgb(255 255 255 / 0.06) 0 1px, transparent 1px 14px)",
            }}
          />
          <div className="relative mx-auto flex min-h-[100px] max-w-lg flex-col items-center justify-center gap-2 sm:min-h-[120px]">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[rgb(var(--accent-2))]/95">
              {placeholderEyebrow ?? "Sponsored space"}
            </p>
            <p className="text-xs leading-relaxed text-[rgb(var(--ink-soft))]/90 [text-wrap:pretty] sm:text-sm">
              {placeholderHint ??
                "Layout reserved for display ads — your decision text never lives in this band."}
            </p>
            <div className="mt-2 flex gap-1.5" aria-hidden>
              <span className="h-1 w-8 rounded-full bg-[rgb(var(--accent))]/35" />
              <span className="h-1 w-5 rounded-full bg-[rgb(var(--accent-2))]/35" />
              <span className="h-1 w-10 rounded-full bg-[rgb(var(--accent-magenta))]/30" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`ad-live-slot mx-auto my-8 max-w-4xl overflow-hidden ${className}`.trim()}
    >
      <div className={frame}>
        <p className="relative mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--ink-soft))]/75">
          Advertisement
        </p>
        <ins
          className="adsbygoogle relative block"
          style={{ display: "block", minHeight: "90px" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
