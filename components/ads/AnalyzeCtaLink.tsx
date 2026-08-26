"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href?: string;
  children: ReactNode;
};

/** Primary Analyze CTA — navigates to /analyze (no Direct Link pop). */
export default function AnalyzeCtaLink({
  href = "/analyze",
  children,
  ...rest
}: Props) {
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
