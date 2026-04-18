"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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
export default function BlogSearch({ posts }: Props) {
  const [q, setQ] = useState("");

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
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles by topic, keyword, or tag"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pe-3 ps-9 text-sm text-[rgb(var(--ink))] placeholder:text-[rgb(var(--ink-soft))]/60 transition focus:border-[rgb(var(--accent))]/40 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-2))]/40"
          />
        </div>
        {q ? (
          <button
            type="button"
            onClick={() => setQ("")}
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
        Showing {filtered.length} of {posts.length} article
        {posts.length === 1 ? "" : "s"}
        {q ? ` matching “${q}”` : ""}.
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center text-sm text-[rgb(var(--ink-soft))]">
          No articles match that search.{" "}
          <button
            type="button"
            onClick={() => setQ("")}
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            Clear search
          </button>{" "}
          to see everything.
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2">
          {filtered.map((post) => (
            <li
              key={post.slug}
              className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]/25 hover:shadow-[0_20px_50px_-28px_rgb(var(--accent)/0.4)]"
            >
              <div className="flex flex-wrap items-center gap-2">
                {post.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[rgb(var(--accent))]/12 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--accent-2))]"
                  >
                    {t}
                  </span>
                ))}
                <span className="text-[11px] text-[rgb(var(--ink-soft))]/80">
                  {formatDate(post.publishedAt)} · {post.readingMinutes} min read
                </span>
              </div>
              <h2 className="mt-4 text-lg font-semibold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]">
                <Link
                  href={`/blog/${post.slug}`}
                  className="after:absolute after:inset-0 hover:text-[rgb(var(--accent-2))]"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                {post.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[rgb(var(--accent-2))]">
                Read article
                <span aria-hidden="true">→</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
