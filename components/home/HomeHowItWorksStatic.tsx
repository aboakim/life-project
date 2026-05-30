import Link from "next/link";
import { isRtlLocale, type AppLocale } from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";
import { getHowFlowIntro, getHowFlowSteps } from "@/lib/home/home-how-flow";

type Props = { locale: AppLocale };

function StepVisual({
  index,
  sample,
  locale,
}: {
  index: number;
  sample: string;
  locale: AppLocale;
}) {
  const t = getUi(locale);

  if (index === 0) {
    return (
      <div className="rounded-xl border border-white/[0.12] bg-[rgb(var(--surface-2))]/90 p-4 shadow-inner">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[rgb(var(--accent-2))]">
          {t.workspaceTitle}
        </p>
        <div className="mt-3 rounded-lg border border-dashed border-white/[0.14] bg-black/20 px-3 py-3 text-sm italic leading-relaxed text-[rgb(var(--ink))]/90">
          “{sample}”
        </div>
        <p className="mt-2 text-[11px] text-[rgb(var(--ink-soft))]">
          {t.analyzingProgressLine}
        </p>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="space-y-2">
        {t.bentoCards.slice(0, 3).map((card, i) => (
          <div
            key={card.pill}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.1] bg-white/[0.05] px-3 py-2.5"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-[rgb(var(--accent-2))]">
                {card.pill}
              </p>
              <p className="text-sm font-semibold text-[rgb(var(--ink))]">
                {card.title}
              </p>
            </div>
            <span className="shrink-0 rounded-lg bg-[rgb(var(--accent))]/15 px-2 py-1 text-xs font-bold text-[rgb(var(--accent-2))]">
              {i === 0 ? "72%" : i === 1 ? "4×" : "6mo→5y"}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[rgb(var(--accent))]/25 bg-gradient-to-br from-[rgb(var(--accent))]/12 to-transparent p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[rgb(var(--accent-2))]">
        {t.previewCardTitle}
      </p>
      <p className="mt-2 font-display text-2xl font-extrabold text-[rgb(var(--ink))]">
        64%
      </p>
      <p className="text-xs text-[rgb(var(--ink-soft))]">{sample}</p>
      <ul className="mt-3 space-y-1.5 text-[11px] text-[rgb(var(--ink-soft))]">
        {t.previewRows.map((row) => (
          <li key={row.label} className="flex justify-between gap-2">
            <span>{row.label}</span>
            <span className="font-medium text-[rgb(var(--ink))]">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HomeHowItWorksStatic({ locale }: Props) {
  const t = getUi(locale);
  const rtl = isRtlLocale(locale);
  const intro = getHowFlowIntro(locale);
  const steps = getHowFlowSteps(locale);

  return (
    <section
      id="section-how"
      aria-labelledby="home-how-heading"
      className="relative z-[1] home-section-scroll-mt px-4 py-12 sm:px-6 sm:py-16"
      dir={rtl ? "rtl" : undefined}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[rgb(var(--accent-2))]">
            {t.sectionNavHow}
          </p>
          <h2
            id="home-how-heading"
            className="font-display mt-3 text-[clamp(1.65rem,1.1rem+2vw,2.45rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
          >
            {t.howSectionTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[rgb(var(--ink-soft))] sm:text-lg">
            {intro}
          </p>
        </div>

        <ol className="relative mx-auto mt-12 max-w-4xl list-none space-y-8 p-0 sm:space-y-10">
          <div
            className="pointer-events-none absolute start-[1.65rem] top-4 bottom-4 hidden w-px bg-gradient-to-b from-[rgb(var(--accent))]/50 via-[rgb(var(--accent-2))]/30 to-[rgb(var(--accent-magenta))]/40 sm:block"
            aria-hidden
          />

          {steps.map((step, i) => {
            const even = i % 2 === 1;
            return (
              <li key={step.title}>
                <article
                  className={`relative grid gap-6 rounded-[1.5rem] border border-white/[0.1] bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-5 shadow-[0_24px_60px_-36px_rgb(var(--accent)/0.35)] sm:grid-cols-2 sm:items-center sm:gap-8 sm:p-7 ${
                    even ? "sm:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="flex gap-4 sm:block">
                    <div
                      className="relative z-[1] flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(var(--accent))] to-[rgb(var(--accent-magenta))] text-lg font-extrabold text-white shadow-lg shadow-[rgb(var(--accent)/0.3)] sm:absolute sm:-start-3 sm:top-7"
                      aria-hidden
                    >
                      {i + 1}
                    </div>
                    <div className="min-w-0 sm:ps-10">
                      <span className="text-xl" aria-hidden>
                        {step.icon}
                      </span>
                      <h3 className="font-display mt-1 text-xl font-bold leading-snug text-[rgb(var(--ink))] sm:text-[1.35rem]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                        {step.body}
                      </p>
                      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200/95">
                        <span aria-hidden>→</span>
                        {step.payoff}
                      </p>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <StepVisual index={i} sample={step.sample} locale={locale} />
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/analyze"
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-[rgb(var(--accent)/0.28)] transition hover:brightness-110 sm:w-auto"
          >
            {t.heroCtaPrimary}
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/analyze"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] px-6 py-3 text-sm font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.1] sm:w-auto"
          >
            {t.homeDemoCta}: {t.homeDemoExample2}
          </Link>
        </div>
      </div>
    </section>
  );
}
