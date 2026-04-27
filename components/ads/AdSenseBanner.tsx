"use client";

import { useEffect, useRef } from "react";
import {
  ensureAdsbygoogleScript,
  scheduleIdle,
} from "@/components/ads/ensure-adsbygoogle";

type Props = {
  className?: string;
};

/**
 * Google AdSense — revenue goes to your AdSense account (bank/payout in AdSense UI).
 * Set NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxx and NEXT_PUBLIC_ADSENSE_SLOT_HOME=xxxxxxxx
 * after site approval in https://www.google.com/adsense/
 *
 * Loads `adsbygoogle.js` only when this unit renders (idle-scheduled), so pages
 * without ads do not pay the third-party script cost. Renders nothing when env is unset.
 */
export default function AdSenseBanner({ className = "" }: Props) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME;
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || !slot || pushed.current) return;
    let cancelled = false;

    const narrow =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767.98px)").matches;

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
      narrow
        ? { idleTimeoutMs: 7200, fallbackDelayMs: 3200 }
        : { idleTimeoutMs: 1800, fallbackDelayMs: 700 },
    );

    return () => {
      cancelled = true;
    };
  }, [client, slot]);

  if (!client || !slot) return null;

  const frame =
    "relative overflow-hidden rounded-[1.35rem] border border-white/[0.14] bg-gradient-to-b from-white/[0.09] via-black/25 to-black/40 px-3 py-4 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_28px_80px_-40px_rgb(var(--accent)/0.35)] sm:px-5 sm:py-5";

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
