import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import NewsletterCta from "@/components/blog/NewsletterCta";
import { getAllPosts, getAllTagSlugs } from "@/lib/blog/posts";
import { getSiteUrlString } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Blog — Life Decision Engine",
  description:
    "Essays and frameworks for big life decisions: career changes, relocation, relationships, finance, psychology.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Life Decision Engine",
    description:
      "Long-form essays on big life decisions — career, relocation, relationships, finance, psychology.",
    type: "website",
  },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function humaniseTag(slug: string): string {
  return slug
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tagSlugs = getAllTagSlugs();
  const base = getSiteUrlString().replace(/\/$/, "");

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Life Decision Engine — Blog",
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${base}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
    ],
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[rgb(var(--ink-soft))]/85"
      >
        <Link href="/" className="transition hover:text-[rgb(var(--ink))]">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[rgb(var(--ink))]/90">Blog</span>
      </nav>

      {tagSlugs.length > 0 ? (
        <section aria-labelledby="blog-tags-heading" className="mb-8">
          <h2
            id="blog-tags-heading"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--accent-dim))]"
          >
            Browse by topic
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {tagSlugs.map((t) => (
              <li key={t}>
                <Link
                  href={`/blog/tag/${t}`}
                  className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[rgb(var(--ink-soft))] transition hover:border-[rgb(var(--accent))]/35 hover:text-[rgb(var(--ink))]"
                >
                  #{humaniseTag(t)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

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

      <NewsletterCta className="mt-16" />

      <p className="mt-10 text-sm">
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
