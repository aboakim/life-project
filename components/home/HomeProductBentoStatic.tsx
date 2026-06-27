import { isRtlLocale, type AppLocale } from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";
import HomeIconBadge from "@/components/home/HomeIconBadge";

type Props = { locale: AppLocale };

const BENTO_ICONS = ["🔀", "🔭", "⏳", "📊"] as const;

export default function HomeProductBentoStatic({ locale }: Props) {
  const t = getUi(locale);
  const rtl = isRtlLocale(locale);

  return (
    <section
      id="section-product"
      aria-labelledby="home-product-heading"
      className="relative z-[1] home-section-scroll-mt px-4 py-10 sm:px-6 sm:py-14"
      dir={rtl ? "rtl" : undefined}
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[rgb(var(--accent))]/90">
          {t.sectionNavProduct}
        </p>
        <h2
          id="home-product-heading"
          className="font-display mt-2 max-w-3xl text-[clamp(1.65rem,1.05rem+2vw,2.35rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
        >
          {t.productSectionTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[rgb(var(--ink-soft))] sm:text-lg">
          {t.productSectionSubtitle}
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.11] bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
          <div className="grid divide-white/[0.08] sm:grid-cols-2 lg:grid-cols-4 sm:divide-x lg:divide-x divide-y sm:divide-y-0 lg:divide-y-0">
            {t.bentoCards.map((card, i) => (
              <article
                key={card.pill}
                className="flex flex-col p-6 sm:p-7"
              >
                <HomeIconBadge icon={BENTO_ICONS[i] ?? "✦"} />
                <span className="mt-4 inline-flex w-fit rounded-full border border-[rgb(var(--accent))]/25 bg-[rgb(var(--accent))]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[rgb(var(--accent-2))] sm:text-xs">
                  {card.pill}
                </span>
                <h3 className="font-display mt-4 text-lg font-bold leading-snug text-[rgb(var(--ink))] sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))] sm:text-base">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
