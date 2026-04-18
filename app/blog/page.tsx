import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import NewsletterCta from "@/components/blog/NewsletterCta";
import BlogSearch, { type BlogSearchItem } from "@/components/blog/BlogSearch";
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

  // Pass only the fields BlogSearch needs — keeps the client bundle small
  // and avoids serialising the full article body to the client.
  const searchItems: BlogSearchItem[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    publishedAt: p.publishedAt,
    readingMinutes: p.readingMinutes,
    tags: p.tags,
    eyebrow: p.hero?.eyebrow,
  }));

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

      <BlogSearch posts={searchItems} />

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
