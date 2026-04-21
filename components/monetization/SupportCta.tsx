"use client";

import Link from "next/link";
import {
  getSupportHref,
  getSupportLabel,
  getSupportUrl,
} from "@/lib/monetization/config";

/**
 * “Support this project” — Buy Me a Coffee / Ko-fi when `NEXT_PUBLIC_*` URLs
 * are set; otherwise links to `/contact` so the footer CTA is never empty.
 */
export default function SupportCta({ className = "" }: { className?: string }) {
  const href = getSupportHref();
  const label = getSupportLabel();
  const external = Boolean(getSupportUrl());

  const cls = `inline-flex items-center gap-2 rounded-xl border border-[rgb(var(--accent-warm))]/35 bg-[rgb(var(--accent-warm))]/[0.08] px-4 py-2 text-sm font-semibold text-[rgb(var(--ink))] transition hover:border-[rgb(var(--accent-warm))]/60 hover:bg-[rgb(var(--accent-warm))]/[0.14] ${className}`;

  const icon = (
    <span className="inline-flex shrink-0 text-[1.1rem] leading-none" aria-hidden="true">
      ☕
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        aria-label={`${label} (opens in a new tab)`}
      >
        {icon}
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {icon}
      {label}
    </Link>
  );
}
