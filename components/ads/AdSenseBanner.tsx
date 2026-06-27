"use client";

import { useEffect, useRef } from "react";
import {
  ensureAdsbygoogleScript,
  scheduleIdle,
} from "@/components/ads/ensure-adsbygoogle";
import { readAdsenseClientId } from "@/lib/adsense-config";

type Placement = "top" | "inline" | "footer";

type Props = {
  className?: string;
  /**
   * Which AdSense unit to render. Picks env var by placement:
   *   "top"    → NEXT_PUBLIC_ADSENSE_SLOT_HOME    (default; main banner)
   *   "inline" → NEXT_PUBLIC_ADSENSE_SLOT_INLINE  (between content blocks)
   *   "footer" → NEXT_PUBLIC_ADSENSE_SLOT_FOOTER  (below results / above privacy)
   * Free analyzer pages render up to 3 of these so post-AdSense-approval the
   * publisher can fill all three slot IDs and monetize the free tier.
   */
  placement?: Placement;
  /** Hard override for the slot id (rarely needed; mostly tests / experiments). */
  slot?: string;
  /** Hint to AdSense for shape; "horizontal" works for top/footer, "auto" for inline. */
  format?: "horizontal" | "auto" | "rectangle" | "fluid";
  /** Visible label above the ad — required by AdSense policy on placements that could be confused with content. */
  label?: string;
};

function pickSlot(placement: Placement): string | undefined {
  switch (placement) {
    case "inline":
      return process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE;
    case "footer":
      return process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER;
    case "top":
    default:
      return process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME;
  }
}

/**
 * Google AdSense — revenue goes to your AdSense account (bank/payout in AdSense UI).
 * Fill these env vars after site approval in https://www.google.com/adsense/ :
 *   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
 *   NEXT_PUBLIC_ADSENSE_SLOT_HOME=xxxxxxxxxx     (top banner / single-slot fallback)
 *   NEXT_PUBLIC_ADSENSE_SLOT_INLINE=xxxxxxxxxx   (in-content / between sections)
 *   NEXT_PUBLIC_ADSENSE_SLOT_FOOTER=xxxxxxxxxx   (below content)
 *
 * Loads `adsbygoogle.js` only when this unit renders (idle-scheduled), so pages
 * without ads do not pay the third-party script cost. Renders nothing when the
 * matching slot env is unset (so the live site stays ad-free pre-approval).
 */
export default function AdSenseBanner({
  className = "",
  placement = "top",
  slot,
  format,
  label = "Advertisement",
}: Props) {
  const client = readAdsenseClientId();
  const resolvedSlot = slot ?? pickSlot(placement);
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || !resolvedSlot || pushed.current) return;
    let cancelled = false;

    scheduleIdle(
      () => {
        if (cancelled) return;
        void (async () => {
          try {
            await ensureAdsbygoogleScript(client);
            if (cancelled) return;
            window.requestAnimationFrame(() => {
              if (cancelled || pushed.current) return;
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
          } catch {
            /* ignore */
          }
        })();
      },
      { idleTimeoutMs: 2200, fallbackDelayMs: 900 },
    );

    return () => {
      cancelled = true;
    };
  }, [client, resolvedSlot]);

  if (!client || !resolvedSlot) return null;

  const adFormat =
    format ?? (placement === "inline" ? "auto" : "horizontal");

  const frame =
    "relative overflow-hidden rounded-[1.35rem] border border-white/[0.14] bg-gradient-to-b from-white/[0.09] via-black/25 to-black/40 px-3 py-4 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_28px_80px_-40px_rgb(var(--accent)/0.35)] sm:px-5 sm:py-5";

  return (
    <div
      className={`ad-live-slot mx-auto my-8 max-w-4xl overflow-hidden ${className}`.trim()}
      data-ad-placement={placement}
    >
      <div className={frame}>
        <p className="relative mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--ink-soft))]/75">
          {label}
        </p>
        <ins
          className="adsbygoogle relative block"
          style={{ display: "block", minHeight: "90px" }}
          data-ad-client={client}
          data-ad-slot={resolvedSlot}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
