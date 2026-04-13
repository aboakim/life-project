"use client";

import Script from "next/script";
import { useCallback, useRef } from "react";

/**
 * Google AdSense — revenue goes to your AdSense account (bank/payout in AdSense UI).
 * Set NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxx and NEXT_PUBLIC_ADSENSE_SLOT_HOME=xxxxxxxx
 * after site approval in https://www.google.com/adsense/
 */
export default function AdSenseBanner() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME;
  const pushed = useRef(false);

  const onAdsLoaded = useCallback(() => {
    if (!client || !slot || pushed.current) return;
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
  }, [client, slot]);

  if (!client || !slot) return null;

  return (
    <>
      <Script
        id="adsense-script"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={onAdsLoaded}
      />
      <div className="mx-auto my-8 max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black/20 px-2 py-3 text-center">
        <p className="mb-2 text-[10px] uppercase tracking-wider text-[rgb(var(--ink-soft))]/70">
          Advertisement
        </p>
        <ins
          className="adsbygoogle block"
          style={{ display: "block", minHeight: "90px" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    </>
  );
}
