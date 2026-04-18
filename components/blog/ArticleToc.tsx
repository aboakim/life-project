"use client";

import { useEffect, useState } from "react";

export type TocItem = {
  id: string;
  text: string;
};

type Props = {
  items: TocItem[];
};

/**
 * Table of Contents sidebar for long-form articles. Highlights the current
 * section as the reader scrolls and offers an anchor-click to jump.
 * Hidden on small screens (< lg) to preserve reading room on mobile.
 */
export default function ArticleToc({ items }: Props) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 1],
      },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Article sections"
      className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block"
    >
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-dim))]">
        In this article
      </p>
      <ul className="space-y-2 border-l border-white/10 ps-4 text-sm">
        {items.map((it) => {
          const isActive = activeId === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={
                  isActive
                    ? "block leading-snug text-[rgb(var(--accent-2))]"
                    : "block leading-snug text-[rgb(var(--ink-soft))] transition hover:text-[rgb(var(--ink))]"
                }
              >
                {it.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
