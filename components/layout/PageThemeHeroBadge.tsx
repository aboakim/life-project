"use client";

import { usePathname } from "next/navigation";
import {
  getPageThemeMeta,
  resolvePageTheme,
  type PageTheme,
} from "@/lib/page-theme";

type Props = { theme?: PageTheme };

function useResolvedTheme(theme?: PageTheme): PageTheme {
  const pathname = usePathname();
  return theme ?? resolvePageTheme(pathname);
}

/** Gradient icon tile — route identity in marketing heroes. */
export default function PageThemeHeroBadge({ theme }: Props) {
  const resolved = useResolvedTheme(theme);
  if (resolved === "home" || resolved === "default") return null;
  const meta = getPageThemeMeta(resolved);

  return (
    <span
      className="marketing-page-hero-icon inline-flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(var(--page-accent,var(--accent)))/28] via-[rgb(var(--page-accent-mid,var(--accent-2)))/16] to-[rgb(var(--page-accent-soft,var(--accent-magenta)))/12] text-3xl ring-1 ring-white/12 shadow-[0_16px_40px_-20px_rgb(var(--page-accent,var(--accent))/0.65)] sm:text-4xl size-14 sm:size-16"
      aria-hidden
    >
      {meta.icon}
    </span>
  );
}

/** Short chip above the hero eyebrow — reinforces “where you are”. */
export function PageThemeChip({ theme }: Props) {
  const resolved = useResolvedTheme(theme);
  if (resolved === "home" || resolved === "default") return null;
  const meta = getPageThemeMeta(resolved);

  return (
    <p className="marketing-page-hero-chip inline-flex w-fit rounded-full border border-[rgb(var(--page-accent,var(--accent)))/22] bg-[rgb(var(--page-accent,var(--accent)))/10] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[rgb(var(--page-accent-mid,var(--accent-2)))] sm:text-[11px]">
      {meta.chip}
    </p>
  );
}
