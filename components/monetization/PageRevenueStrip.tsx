"use client";

/**
 * High-traffic page monetization strip: Amazon Associates + AdSense region.
 * Renders nothing useful when affiliate/slots are disabled in env.
 */

import ContentAdRegion from "@/components/ads/ContentAdRegion";
import AmazonAssociatesCta from "@/components/monetization/AmazonAssociatesCta";
import type { AppLocale } from "@/lib/i18n/locale";

type Props = {
  locale?: AppLocale;
  className?: string;
  /** Prefer mid-page AdSense; footer for end of long pages. */
  adPlacement?: "mid" | "footer";
  showAmazon?: boolean;
  showAdSense?: boolean;
};

export default function PageRevenueStrip({
  locale,
  className = "",
  adPlacement = "mid",
  showAmazon = true,
  showAdSense = true,
}: Props) {
  return (
    <div className={`mx-auto max-w-4xl space-y-4 px-4 sm:px-6 ${className}`.trim()}>
      {showAmazon ? (
        <AmazonAssociatesCta variant="compact" locale={locale} />
      ) : null}
      {showAdSense ? <ContentAdRegion placement={adPlacement} /> : null}
    </div>
  );
}
