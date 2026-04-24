"use client";

import Script from "next/script";

/**
 * GA4 loader — renders only when:
 *  - NEXT_PUBLIC_GA_MEASUREMENT_ID is set to a valid G-XXXXXXX id
 *  - running in production (avoids dev noise + double counting)
 *
 * Consent note: the Google Consent Mode v2 "default: denied" block runs
 * in the <head> of app/layout.tsx BEFORE this loader, so gtag fires with
 * ad/analytics storage already blocked. ConsentBanner.tsx calls
 * gtag('consent','update', {...}) once the user chooses, which flips the
 * state forward without reloading the page.
 */
export default function GoogleAnalytics() {
  const id = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "").trim();
  if (!/^G-[A-Z0-9]{6,}$/i.test(id)) return null;
  if (process.env.NODE_ENV !== "production") return null;

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
