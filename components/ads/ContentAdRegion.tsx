/**
 * Labelled in-content ad region — reserved visual space so ads don't feel random.
 * Monetag In-Page Push draws its own corner UI; this marks where we allow ads
 * and hosts AdSense when slot env is set.
 */
"use client";

import AdSenseBanner from "@/components/ads/AdSenseBanner";

type Props = {
  /** Where this region sits in the page layout. */
  placement?: "mid" | "footer";
  className?: string;
  label?: string;
};

export default function ContentAdRegion({
  placement = "mid",
  className = "",
  label = "Advertisement",
}: Props) {
  const adsensePlacement = placement === "footer" ? "footer" : "inline";

  return (
    <aside
      className={`content-ad-region ${className}`.trim()}
      aria-label={label}
      data-ad-region={placement}
    >
      <AdSenseBanner
        placement={adsensePlacement}
        format={placement === "footer" ? "horizontal" : "auto"}
        label={label}
        className="my-6"
      />
    </aside>
  );
}
