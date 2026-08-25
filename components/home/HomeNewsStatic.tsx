import Image from "next/image";
import Link from "next/link";
import { isRtlLocale, type AppLocale } from "@/lib/i18n/locale";
import { getAllPosts } from "@/lib/blog/posts";
import { getBlogPostCover } from "@/lib/blog/post-cover";
import { getUi } from "@/lib/i18n/ui";

type Props = { locale: AppLocale };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function HomeNewsStatic({ locale }: Props) {
  const t = getUi(locale);
  const rtl = isRtlLocale(locale);
  const posts = getAllPosts().slice(0, 4);

  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section
      id="section-news"
      aria-labelledby="home-news-heading"
      className="home-section-wash home-section-wash--news relative z-[1] home-section-scroll-mt px-4 py-10 sm:px-6 sm:py-14"
      dir={rtl ? "rtl" : undefined}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[rgb(var(--accent-warm))]/90">
              {t.newsSectionEyebrow}
            </p>
            <h2
              id="home-news-heading"
              className="font-display mt-2 max-w-xl text-[clamp(1.5rem,1rem+1.8vw,2.25rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
            >
              {t.newsSectionTitle}
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.1] sm:text-base"
          >
            {t.newsViewAll} →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured ? (
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative col-span-1 overflow-hidden rounded-2xl border border-white/[0.12] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.08] sm:col-span-2"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={getBlogPostCover(featured.slug, featured.tags).src}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 720px, 90vw"
                  quality={65}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">
                    <time dateTime={featured.publishedAt}>
                      {formatDate(featured.publishedAt)}
                    </time>
                    {" · "}
                    {featured.readingMinutes} min
                  </p>
                  <h3 className="font-display mt-2 max-w-xl text-xl font-extrabold leading-snug text-white [text-wrap:balance] sm:text-2xl">
                    {featured.title}
                  </h3>
                </div>
              </div>
            </Link>
          ) : null}

          {rest.map((post) => {
            const cover = getBlogPostCover(post.slug, post.tags);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.12] shadow-[0_20px_50px_-28px_rgba(0,0,0,0.5)] ring-1 ring-white/[0.08] transition duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]/35"
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
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                    </p>
                    <h3 className="font-display mt-1.5 line-clamp-2 text-base font-bold leading-snug text-white [text-wrap:balance] sm:text-lg">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
