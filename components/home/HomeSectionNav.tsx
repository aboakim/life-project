"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SECTION_IDS = [
  "section-overview",
  "section-product",
  "section-trust",
  "section-how",
  "section-workspace",
  "section-language",
  "section-privacy",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

type LinkItem = { id: SectionId; label: string };

export default function HomeSectionNav({ links }: { links: LinkItem[] }) {
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
      className="home-section-nav sticky top-[52px] z-30 border-b border-white/[0.1] bg-[rgb(var(--surface))]/70 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
      aria-label="On this page"
    >
      <div className="mx-auto max-w-6xl px-3 py-2 sm:px-6 md:hidden">
        <label className="sr-only" htmlFor="home-section-jump">
          Jump to section
        </label>
        <select
          id="home-section-jump"
          className="w-full min-h-[48px] cursor-pointer rounded-xl border border-white/[0.14] bg-black/25 px-3 py-2 text-sm font-medium text-[rgb(var(--ink))] outline-none transition focus:border-[rgb(var(--accent))]/45"
          value={active ?? ""}
          onChange={(e) => {
            const id = e.target.value;
            if (id) window.location.hash = id;
          }}
        >
          <option value="">— On this page —</option>
          {links.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="mx-auto hidden max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2.5 scrollbar-none sm:px-6 md:flex">
        {links.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              className={
                isActive
                  ? "shrink-0 rounded-full bg-white/[0.1] px-3.5 py-2 text-xs font-semibold text-[rgb(var(--ink))] ring-1 ring-[rgb(var(--accent))]/35"
                  : "shrink-0 rounded-full px-3.5 py-2 text-xs font-medium text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.05] hover:text-[rgb(var(--ink))]"
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
