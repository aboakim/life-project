import Link from "next/link";
import { isRtlLocale, type AppLocale } from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";

type Props = { locale: AppLocale };

export default function HomeHowItWorksStatic({ locale }: Props) {
  const t = getUi(locale);
  const rtl = isRtlLocale(locale);

  return (
    <section
      id="section-how"
      aria-labelledby="home-how-heading"
      className="relative z-[1] scroll-mt-[7.5rem] px-4 py-10 sm:px-6 sm:py-14"
      dir={rtl ? "rtl" : undefined}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="home-how-heading"
          className="font-display text-center text-[clamp(1.5rem,1rem+1.8vw,2.2rem)] font-extrabold tracking-tight text-[rgb(var(--ink))]"
        >
          {t.howSectionTitle}
        </h2>

        <ol className="mx-auto mt-10 grid max-w-4xl list-none gap-6 p-0 sm:grid-cols-3">
          {t.howSteps.map((step, i) => (
            <li key={step.title} className="relative text-center sm:text-start">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(var(--accent))] to-[rgb(var(--accent-magenta))] text-lg font-extrabold text-white shadow-lg shadow-[rgb(var(--accent)/0.25)] sm:mx-0">
                {i + 1}
              </div>
              {i < t.howSteps.length - 1 ? (
                <span
                  className="pointer-events-none absolute end-0 top-6 hidden h-px w-full translate-x-1/2 bg-gradient-to-r from-[rgb(var(--accent))]/40 to-transparent sm:block"
                  aria-hidden
                />
              ) : null}
              <h3 className="font-display mt-4 text-lg font-bold text-[rgb(var(--ink))]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <Link
            href="/analyze"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.07] px-6 py-3 text-sm font-bold text-[rgb(var(--ink))] transition hover:bg-white/[0.11]"
          >
            {t.homeDemoCta} →
          </Link>
        </div>
      </div>
    </section>
  );
}
