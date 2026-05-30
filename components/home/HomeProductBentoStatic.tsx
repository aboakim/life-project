import { isRtlLocale, type AppLocale } from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";

type Props = { locale: AppLocale };

export default function HomeProductBentoStatic({ locale }: Props) {
  const t = getUi(locale);
  const rtl = isRtlLocale(locale);

  return (
    <section
      id="section-product"
      aria-labelledby="home-product-heading"
      className="relative z-[1] scroll-mt-[7.5rem] px-4 py-10 sm:px-6 sm:py-14"
      dir={rtl ? "rtl" : undefined}
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[rgb(var(--accent))]/90">
          {t.sectionNavProduct}
        </p>
        <h2
          id="home-product-heading"
          className="font-display mt-2 max-w-3xl text-[clamp(1.5rem,1rem+1.8vw,2.2rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
        >
          {t.productSectionTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[rgb(var(--ink-soft))]">
          {t.productSectionSubtitle}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.bentoCards.map((card) => (
            <article
              key={card.pill}
              className="rounded-2xl border border-white/[0.11] bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
            >
              <span className="inline-flex rounded-full border border-[rgb(var(--accent))]/25 bg-[rgb(var(--accent))]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[rgb(var(--accent-2))]">
                {card.pill}
              </span>
              <h3 className="font-display mt-4 text-base font-bold leading-snug text-[rgb(var(--ink))]">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
