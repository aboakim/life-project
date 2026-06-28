import Link from "next/link";
import { isRtlLocale, type AppLocale } from "@/lib/i18n/locale";
import { getAllPosts } from "@/lib/blog/posts";
import { getUi } from "@/lib/i18n/ui";
import HomeIconBadge from "@/components/home/HomeIconBadge";

type Props = { locale: AppLocale };

const TOPIC_ICONS = ["📰", "🧭", "💼", "🏠"] as const;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function HomeNewsStatic({ locale }: Props) {
  const t = getUi(locale);
  const rtl = isRtlLocale(locale);
  const posts = getAllPosts().slice(0, 4);

  if (posts.length === 0) return null;

  return (
    <section
      id="section-news"
      aria-labelledby="home-news-heading"
      className="home-section-wash home-section-wash--news relative z-[1] home-section-scroll-mt px-4 py-10 sm:px-6 sm:py-14"
      dir={rtl ? "rtl" : undefined}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[rgb(var(--accent-warm))]/90">
              {t.newsSectionEyebrow}
            </p>
            <h2
              id="home-news-heading"
              className="font-display mt-2 max-w-2xl text-[clamp(1.5rem,1rem+1.8vw,2.25rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
            >
              {t.newsSectionTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[rgb(var(--ink-soft))] sm:text-lg">
              {t.newsSectionSubtitle}
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.1] sm:text-base"
          >
            {t.newsViewAll} →
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.11] bg-gradient-to-br from-white/[0.05] to-transparent">
          <ul className="divide-y divide-white/[0.08]">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <article className="group flex gap-4 p-5 transition hover:bg-white/[0.04] sm:gap-5 sm:p-6">
                  <HomeIconBadge
                    icon={TOPIC_ICONS[i % TOPIC_ICONS.length] ?? "📰"}
                    className="mt-0.5 max-sm:hidden"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[rgb(var(--accent-2))]/85 sm:text-[13px]">
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                      {" · "}
                      {post.readingMinutes} min
                    </p>
                    <h3 className="font-display mt-2 text-lg font-bold leading-snug text-[rgb(var(--ink))] [text-wrap:balance] sm:text-xl">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition group-hover:text-[rgb(var(--accent-2))]"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))] sm:text-base">
                      {post.description}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-3 inline-flex text-sm font-semibold text-[rgb(var(--accent-2))] underline-offset-4 hover:underline sm:text-[15px]"
                    >
                      {t.newsReadLabel} →
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
