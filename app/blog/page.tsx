import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import { getAllPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog — Life Decision Engine",
  description:
    "Essays and frameworks for big life decisions: career changes, relocation, relationships, finance, psychology.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <MarketingPageShell
      eyebrow="Writing"
      title="Frameworks for the decisions that actually matter"
      subtitle={
        <p>
          Long-form essays on career changes, relocation, relationships, and
          the psychology of big choices. Written to help you think clearly —
          not to sell you certainty.
        </p>
      }
    >
      <ul className="grid gap-5 sm:grid-cols-2">
        {posts.map((post) => (
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

      <p className="mt-12 text-sm">
        <Link
          href="/"
          className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
        >
          ← Back to home
        </Link>
      </p>
    </MarketingPageShell>
  );
}
