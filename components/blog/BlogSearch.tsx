"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getBlogPostCover } from "@/lib/blog/post-cover";

export type BlogSearchItem = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  eyebrow?: string;
};

type Props = {
  posts: BlogSearchItem[];
  /** From `/blog?q=` so JSON-LD SearchAction URLs show matching results (also shareable). */
  initialQuery?: string;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Lightweight, client-side search that filters the already-loaded
 * blog index by title / description / tag substring.
 *
 * No backend, no network calls — the list is small enough that this
 * runs instantly and lets the page stay fully static. The server already
 * emits the full ItemList JSON-LD before hydration so crawlers still see
 * every article without executing JS.
 */
export default function BlogSearch({ posts, initialQuery = "" }: Props) {
  const [q, setQ] = useState(() => initialQuery.trim());
  const [visible, setVisible] = useState(9);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return posts;
    return posts.filter((p) => {
      return (
        p.title.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.tags.some((t) => t.toLowerCase().includes(needle)) ||
        (p.eyebrow ?? "").toLowerCase().includes(needle)
      );
    });
  }, [q, posts]);

  const shown = filtered.slice(0, visible);

  return (
    <>
      <form
        role="search"
        aria-label="Search articles"
        className="mb-8 flex items-center gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="blog-search-input" className="sr-only">
          Search articles
        </label>
        <div className="relative flex-1">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--ink-soft))]/70"
          >
            🔎
          </span>
          <input
            id="blog-search-input"
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setVisible(9);
            }}
            placeholder="Search articles by topic, keyword, or tag"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pe-3 ps-9 text-sm text-[rgb(var(--ink))] placeholder:text-[rgb(var(--ink-soft))]/60 transition focus:border-[rgb(var(--accent))]/40 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-2))]/40"
          />
        </div>
        {q ? (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setVisible(9);
            }}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-[rgb(var(--ink-soft))] transition hover:border-white/20 hover:text-[rgb(var(--ink))]"
          >
            Clear
          </button>
        ) : null}
      </form>

      <p
        className="mb-4 text-xs text-[rgb(var(--ink-soft))]/80"
        aria-live="polite"
      >
        Showing {shown.length} of {filtered.length} article
        {filtered.length === 1 ? "" : "s"}
        {q ? ` matching “${q}”` : ""}.
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center text-sm text-[rgb(var(--ink-soft))]">
          No articles match that search.{" "}
          <button
            type="button"
            onClick={() => {
              setQ("");
              setVisible(9);
            }}
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            Clear search
          </button>{" "}
          to see everything.
        </div>
      ) : (
        <>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {shown.map((post) => {
              const cover = getBlogPostCover(post.slug, post.tags);
              return (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative block overflow-hidden rounded-2xl border border-white/[0.1] shadow-[0_20px_50px_-28px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.06] transition duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]/30"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={cover.src}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 100vw"
                        quality={60}
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                        aria-hidden
                      />
                      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
                          {formatDate(post.publishedAt)} · {post.readingMinutes}{" "}
                          min
                        </p>
                        <h2 className="font-display mt-1.5 line-clamp-3 text-base font-bold leading-snug text-white [text-wrap:balance] sm:text-lg">
                          {post.title}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          {shown.length < filtered.length ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((n) => n + 9)}
                className="rounded-xl border border-white/[0.14] bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.1]"
              >
                Load more
              </button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
