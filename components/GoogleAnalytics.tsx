"use client";

import Script from "next/script";

/**
 * GA4 loader — renders only when:
 *  - NEXT_PUBLIC_GA_MEASUREMENT_ID is set to a valid G-XXXXXXX id
 *  - running in production (avoids dev noise + double counting)
 *
 * Consent note: Google Consent Mode v2 defaults are set to "denied" for
 * ad/analytics storage until the user interacts. If you add a full CMP
 * later, it can call gtag('consent','update',{...}) to flip these to
 * 'granted'. This keeps us compliant-by-default for EU/UK traffic.
 */
export default function GoogleAnalytics() {
  const id = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "").trim();
  if (!/^G-[A-Z0-9]{6,}$/i.test(id)) return null;
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        id="ga4-consent-default"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500
            });
          `,
        }}
      />
      <Script
        id="ga4-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
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
