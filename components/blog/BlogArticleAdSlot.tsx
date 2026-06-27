"use client";

import AdSenseBanner from "@/components/ads/AdSenseBanner";

type Props = {
  placement: "inline" | "footer";
  className?: string;
};

/** Labelled AdSense unit for blog articles (renders nothing until slot env is set). */
export default function BlogArticleAdSlot({ placement, className = "" }: Props) {
  return (
    <AdSenseBanner
      placement={placement}
      format={placement === "inline" ? "fluid" : "horizontal"}
      label="Advertisement"
      className={className}
    />
  );
}
