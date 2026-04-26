"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SECTION_IDS = [
  "section-overview",
  "section-what-it-fixes",
  "section-product",
  "section-trust",
  "section-how",
  "section-workspace",
  "section-language",
  "section-privacy",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

type LinkItem = { id: SectionId; label: string };

type Props = {
  links: LinkItem[];
  /** Localized — e.g. “On this page” */
  navAriaLabel?: string;
  /** Screen-reader label for the jump control */
  jumpLabel?: string;
  /** First option in mobile jump select */
  jumpPlaceholder?: string;
};

export default function HomeSectionNav({
  links,
  navAriaLabel = "On this page",
  jumpLabel = "Jump to section",
  jumpPlaceholder = "— On this page —",
}: Props) {
  const pathname = usePathname();
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id as SectionId);
        }
      },
      { rootMargin: "-12% 0px -55% 0px", threshold: [0.08, 0.2, 0.35] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <nav
      className="home-section-nav relative sticky top-[52px] z-30 min-w-0 w-full border-b border-white/[0.1] bg-[rgb(var(--surface))]/70 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[rgb(var(--accent))]/35 before:to-transparent"
      aria-label={navAriaLabel}
    >
      <div className="mx-auto min-w-0 max-w-6xl px-3 py-2 sm:px-6 md:hidden">
        <label className="sr-only" htmlFor="home-section-jump">
          {jumpLabel}
        </label>
        <select
          id="home-section-jump"
          className="w-full min-h-[48px] cursor-pointer rounded-xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-black/30 px-3 py-2 text-sm font-medium text-[rgb(var(--ink))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] outline-none transition focus:border-[rgb(var(--accent))]/45 focus:ring-2 focus:ring-[rgb(var(--accent))]/20"
          value={active ?? ""}
          onChange={(e) => {
            const id = e.target.value;
            if (id) window.location.hash = id;
          }}
        >
          <option value="">{jumpPlaceholder}</option>
          {links.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="mx-auto hidden min-w-0 max-w-6xl items-center gap-1 overflow-x-auto overscroll-x-contain px-4 py-2.5 scrollbar-none sm:px-6 md:flex md:flex-nowrap">
        {links.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              className={
                isActive
                  ? "shrink-0 whitespace-nowrap rounded-full bg-gradient-to-r from-[rgb(var(--accent))]/22 via-white/[0.1] to-[rgb(var(--accent-2))]/18 px-3.5 py-2 text-xs font-semibold text-[rgb(var(--ink))] shadow-[0_0_28px_-10px_rgb(var(--accent)/0.35)] ring-1 ring-[rgb(var(--accent))]/40"
                  : "shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium text-[rgb(var(--ink-soft))] transition duration-200 hover:bg-white/[0.06] hover:text-[rgb(var(--ink))] hover:ring-1 hover:ring-white/[0.08]"
              }
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
