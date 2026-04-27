"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

/**
 * GA4 loader — renders only when:
 *  - NEXT_PUBLIC_GA_MEASUREMENT_ID is set to a valid G-XXXXXXX id
 *  - running in production (avoids dev noise + double counting)
 *
 * Mobile: long idle fallback so gtag does not inflate TBT on slow networks.
 * Desktop: shorter fallback (snappier). Interaction still enables immediately.
 *
 * Consent note: the Google Consent Mode v2 "default: denied" block runs
 * in the <head> of app/layout.tsx BEFORE this loader, so gtag fires with
 * ad/analytics storage already blocked. ConsentBanner.tsx calls
 * gtag('consent','update', {...}) once the user chooses, which flips the
 * state forward without reloading the page.
 */
export default function GoogleAnalytics() {
  const id = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "").trim();
  const validId = /^G-[A-Z0-9]{6,}$/i.test(id);
  const [loadScripts, setLoadScripts] = useState(false);

  useEffect(() => {
    if (!validId || process.env.NODE_ENV !== "production") return;
    const enable = () => setLoadScripts(true);
    const narrow = window.matchMedia("(max-width: 767.98px)").matches;
    const t = window.setTimeout(enable, narrow ? 16_000 : 4500);
    window.addEventListener("pointerdown", enable, { once: true, passive: true });
    window.addEventListener("keydown", enable, { once: true });
    window.addEventListener("scroll", enable, { once: true, passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("pointerdown", enable);
      window.removeEventListener("keydown", enable);
      window.removeEventListener("scroll", enable);
    };
  }, [validId]);

  if (!validId || process.env.NODE_ENV !== "production") return null;
  if (!loadScripts) return null;

  return (
    <>
      <Script
        id="ga4-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="lazyOnload"
      />
      <Script
        id="ga4-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            gtag('config', '${id}', { anonymize_ip: true, send_page_view: true });
          `,
        }}
      />
    </>
  );
}
