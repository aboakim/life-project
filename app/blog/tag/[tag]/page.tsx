import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import NewsletterCta from "@/components/blog/NewsletterCta";
import {
  getAllTagSlugs,
  getPostsByTagSlug,
  tagToSlug,
} from "@/lib/blog/posts";
import { getSiteUrlString } from "@/lib/site-url";

export function generateStaticParams() {
  return getAllTagSlugs().map((tag) => ({ tag }));
}

function humaniseTag(slug: string): string {
  return slug
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const posts = getPostsByTagSlug(tag);
  if (posts.length === 0) return { title: "Tag not found" };

  const label = humaniseTag(tag);
  return {
    title: `${label} — articles | Life Decision Engine`,
    description: `Long-form essays tagged “${label}”: frameworks and scripts for real-world ${label.toLowerCase()} decisions.`,
    alternates: { canonical: `/blog/tag/${tag}` },
    openGraph: {
      title: `${label} — Life Decision Engine`,
      description: `Articles on ${label.toLowerCase()} from Life Decision Engine.`,
      type: "website",
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getPostsByTagSlug(tag);
  if (posts.length === 0) notFound();

  const label = humaniseTag(tag);
  const base = getSiteUrlString().replace(/\/$/, "");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: label,
        item: `${base}/blog/tag/${tag}`,
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${label} — articles`,
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${base}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <MarketingPageShell
      eyebrow={`Tag · ${label}`}
      title={`Articles tagged “${label}”`}
      subtitle={
        <p>
          {posts.length} essay{posts.length === 1 ? "" : "s"} on the{" "}
          {label.toLowerCase()} side of big life decisions. Written to help you
          think clearly, not to sell you certainty.
        </p>
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-2 text-xs text-[rgb(var(--ink-soft))]/85"
      >
        <Link href="/" className="transition hover:text-[rgb(var(--ink))]">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/blog" className="transition hover:text-[rgb(var(--ink))]">
          Blog
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[rgb(var(--ink))]/90">{label}</span>
      </nav>

      <ul className="grid gap-5 sm:grid-cols-2">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="flex flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]/25"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-2))]/85">
              {post.hero?.eyebrow ?? "Article"}
            </p>
            <h2 className="mt-2 text-base font-semibold text-[rgb(var(--ink))] [text-wrap:balance]">
              <Link
                href={`/blog/${post.slug}`}
                className="transition hover:text-[rgb(var(--accent-2))]"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
              {post.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[rgb(var(--ink-soft))]/80">
              <span>
                {formatDate(post.publishedAt)} · {post.readingMinutes} min
              </span>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map((t) => (
                  <Link
                    key={t}
                    href={`/blog/tag/${tagToSlug(t)}`}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] transition hover:border-[rgb(var(--accent))]/35 hover:text-[rgb(var(--ink))]"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <NewsletterCta className="mt-16" />

      <p className="mt-10 text-sm">
        <Link
          href="/blog"
          className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
        >
          ← All articles
        </Link>
      </p>
    </MarketingPageShell>
  );
}
