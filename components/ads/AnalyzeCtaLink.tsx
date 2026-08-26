"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode, MouseEvent } from "react";
import { triggerMonetagOnAnalyzeClick } from "@/lib/monetag-analyze-offer";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href?: string;
  children: ReactNode;
};

/**
 * Primary Analyze CTA — opens Monetag offer in a new tab on click,
 * then navigates the current tab to /analyze (site stays smooth).
 */
export default function AnalyzeCtaLink({
  href = "/analyze",
  onClick,
  children,
  ...rest
}: Props) {
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        triggerMonetagOnAnalyzeClick();
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
