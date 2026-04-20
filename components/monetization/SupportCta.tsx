import Link from "next/link";
import { getSupportUrl, getSupportLabel } from "@/lib/monetization/config";

/**
 * "Support this project" button — Buy Me a Coffee / Ko-fi / custom page.
 * Renders nothing when no support URL is configured.
 *
 * Safe alongside AdSense: it's a direct donation link, not an ad unit, so
 * there's no policy conflict with the Google ads script loaded in layout.
 */
export default function SupportCta({ className = "" }: { className?: string }) {
  const href = getSupportUrl();
  if (!href) return null;
  const label = getSupportLabel();

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-2 rounded-xl border border-[rgb(var(--accent-warm))]/35 bg-[rgb(var(--accent-warm))]/[0.08] px-4 py-2 text-sm font-semibold text-[rgb(var(--ink))] transition hover:border-[rgb(var(--accent-warm))]/60 hover:bg-[rgb(var(--accent-warm))]/[0.14] ${className}`}
    >
      <span aria-hidden="true">☕</span>
      {label}
    </Link>
  );
}
