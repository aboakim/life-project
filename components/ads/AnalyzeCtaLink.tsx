"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, ReactNode, MouseEvent } from "react";
import { PACKAGE_GATE_EVENT } from "@/lib/referral-shared";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href?: string;
  children: ReactNode;
};

/**
 * Analyze CTA — opens package picker (free=5 shares / premium=buy|20)
 * before the analyzer, via /analyze?package=1.
 */
export default function AnalyzeCtaLink({
  href = "/analyze?package=1",
  onClick,
  children,
  ...rest
}: Props) {
  const router = useRouter();

  return (
    <Link
      href={href}
      {...rest}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        try {
          window.dispatchEvent(new Event(PACKAGE_GATE_EVENT));
        } catch {
          /* ignore */
        }
        onClick?.(e);
        const target = href.startsWith("/analyze")
          ? href.includes("package=")
            ? href
            : href.includes("?")
              ? `${href}&package=1`
              : "/analyze?package=1"
          : "/analyze?package=1";
        router.push(target);
      }}
    >
      {children}
    </Link>
  );
}
