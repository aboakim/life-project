import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import NewsletterCta from "@/components/blog/NewsletterCta";
import ArticleToc, { type TocItem } from "@/components/blog/ArticleToc";
import ReadingProgress from "@/components/blog/ReadingProgress";
import {
  type BlogBlock,
  type BlogPost,
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  tagToSlug,
} from "@/lib/blog/posts";
import { getSiteUrlString } from "@/lib/site-url";

/** Turn a heading string into a stable, URL-safe anchor id. */
function headingToId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

function buildToc(body: BlogBlock[]): TocItem[] {
  const seen = new Set<string>();
  const out: TocItem[] = [];
  for (const b of body) {
    if (b.kind !== "h2") continue;
    let id = headingToId(b.text);
    if (!id) continue;
    let suffix = 2;
    while (seen.has(id)) {
      id = `${headingToId(b.text)}-${suffix++}`;
    }
    seen.add(id);
    out.push({ id, text: b.text });
  }
  return out;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: `${post.title} — Life Decision Engine`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderBlock(
  block: BlogBlock,
  i: number,
  tocIdFor?: (text: string) => string | undefined,
) {
  switch (block.kind) {
    case "h2": {
      const id = tocIdFor?.(block.text);
      return (
        <h2
          key={i}
          id={id}
          className="mt-10 scroll-mt-28 text-xl font-semibold tracking-tight text-[rgb(var(--ink))] sm:text-2xl [text-wrap:balance]"
        >
          {block.text}
        </h2>
      );
    }
    case "h3":
      return (
        <h3
          key={i}
          className="mt-6 text-base font-semibold text-[rgb(var(--ink))]"
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p
          key={i}
          className="mt-4 text-[15px] leading-[1.75] text-[rgb(var(--ink-soft))] [text-wrap:pretty]"
        >
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul
          key={i}
          className="mt-4 list-disc space-y-2 ps-6 text-[15px] leading-[1.7] text-[rgb(var(--ink-soft))] marker:text-[rgb(var(--accent-2))]/80"
        >
          {block.items.map((it, j) => (
            <li key={j}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol
          key={i}
          className="mt-4 list-decimal space-y-2 ps-6 text-[15px] leading-[1.7] text-[rgb(var(--ink-soft))] marker:font-semibold marker:text-[rgb(var(--accent-2))]"
        >
          {block.items.map((it, j) => (
            <li key={j}>{it}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="mt-8 rounded-2xl border-l-2 border-[rgb(var(--accent))]/60 bg-white/[0.035] px-5 py-4 text-[15px] italic leading-relaxed text-[rgb(var(--ink))]/95"
        >
          “{block.text}”
          {block.cite ? (
            <cite className="mt-2 block text-xs not-italic text-[rgb(var(--ink-soft))]">
              — {block.cite}
            </cite>
          ) : null}
        </blockquote>
      );
  }
}

function buildArticleJsonLd(post: BlogPost): Record<string, unknown> {
  const base = getSiteUrlString().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: `${base}/editorial-team`,
      "@id": `${base}/#editorial-team`,
    },
    publisher: {
      "@type": "Organization",
      name: "Life Decision Engine",
      "@id": `${base}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${base}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.hero?.eyebrow ?? "Decision-making",
    wordCount: post.readingMinutes * 200,
    inLanguage: "en-US",
  };
}

function buildBreadcrumbJsonLd(post: BlogPost): Record<string, unknown> {
  const base = getSiteUrlString().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${base}/blog/${post.slug}`,
      },
    ],
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const toc = buildToc(post.body);
  const tocByText = new Map(toc.map((t) => [t.text, t.id]));
  const resolveId = (text: string) => tocByText.get(text);

  const wasUpdated =
    post.updatedAt && post.updatedAt !== post.publishedAt ? true : false;

  return (
    <MarketingPageShell
      eyebrow={post.hero?.eyebrow ?? "Article"}
      title={post.title}
      subtitle={
        <>
          <p className="text-base text-[rgb(var(--ink-soft))]">
            {post.hero?.lede ?? post.description}
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-[rgb(var(--ink-soft))]/80">
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            {wasUpdated && post.updatedAt ? (
              <>
                {" "}
                · Updated{" "}
                <time dateTime={post.updatedAt}>
                  {formatDate(post.updatedAt)}
                </time>
              </>
            ) : null}{" "}
            · {post.readingMinutes} min read ·{" "}
            <Link
              href="/editorial-team"
              className="text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              {post.author}
            </Link>
          </p>
        </>
      }
    >
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildArticleJsonLd(post)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd(post)),
        }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[rgb(var(--ink-soft))]/85"
      >
        <Link
          href="/"
          className="transition hover:text-[rgb(var(--ink))]"
        >
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href="/blog"
          className="transition hover:text-[rgb(var(--ink))]"
        >
          Blog
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[rgb(var(--ink))]/90">
          {post.hero?.eyebrow ?? "Article"}
        </span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
        <article className="min-w-0 max-w-3xl">
          {post.body.map((b, i) => renderBlock(b, i, resolveId))}

          <div className="mt-12 rounded-2xl border border-[rgb(var(--accent))]/25 bg-gradient-to-br from-[rgb(var(--accent))]/[0.08] to-transparent p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent-2))]/90">
              Try the framework
            </p>
            <h3 className="mt-2 text-base font-semibold text-[rgb(var(--ink))]">
              Apply this to your own decision in 60 seconds
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
              Use the structured decision engine to map scenarios, lenses, and
              a 5-year timeline for what you are actually facing.
            </p>
            <Link
              href="/#section-workspace"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[rgb(var(--accent)/0.28)] transition hover:brightness-110"
            >
              Open analyzer
              <span aria-hidden="true">↓</span>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-6 text-sm">
            <Link
              href="/blog"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              ← All articles
            </Link>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Link
                  key={t}
                  href={`/blog/tag/${tagToSlug(t)}`}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[rgb(var(--ink-soft))] transition hover:border-[rgb(var(--accent))]/35 hover:text-[rgb(var(--ink))]"
                >
                  #{t}
                </Link>
              ))}
            </div>
          </div>
        </article>

        <aside className="min-w-0">
          <ArticleToc items={toc} />
        </aside>
      </div>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-posts-heading"
          className="mt-20 border-t border-white/[0.07] pt-12"
        >
          <h2
            id="related-posts-heading"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[rgb(var(--accent-dim))]"
          >
            Keep reading
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li
                key={r.slug}
                className="flex flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]/25"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-2))]/85">
                  {r.hero?.eyebrow ?? "Article"}
                </p>
                <h3 className="mt-2 text-base font-semibold text-[rgb(var(--ink))] [text-wrap:balance]">
                  <Link
                    href={`/blog/${r.slug}`}
                    className="transition hover:text-[rgb(var(--accent-2))]"
                  >
                    {r.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                  {r.description}
                </p>
                <p className="mt-4 text-xs text-[rgb(var(--ink-soft))]/80">
                  {formatDate(r.publishedAt)} · {r.readingMinutes} min read
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <NewsletterCta className="mt-16" />
    </MarketingPageShell>
  );
}
