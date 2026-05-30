import Link from "next/link";
import { isRtlLocale, type AppLocale } from "@/lib/i18n/locale";
import { getSolveSectionCopy } from "@/lib/i18n/home-solve-section";
import { getUi } from "@/lib/i18n/ui";

type Props = { locale: AppLocale };

const ACCENTS = [
  "from-[rgb(var(--accent))]/20 to-transparent",
  "from-[rgb(var(--accent-2))]/20 to-transparent",
  "from-[rgb(var(--accent-magenta))]/20 to-transparent",
] as const;

export default function HomeWhatItFixesStatic({ locale }: Props) {
  const copy = getSolveSectionCopy(locale);
  const t = getUi(locale);
  const rtl = isRtlLocale(locale);

  return (
    <section
      id="section-what-it-fixes"
      aria-labelledby="home-fixes-heading"
      className="relative z-[1] home-section-scroll-mt px-4 py-10 sm:px-6 sm:py-14"
      dir={rtl ? "rtl" : undefined}
    >
      <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-white/[0.1] bg-white/[0.03] p-5 sm:p-8 lg:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[rgb(var(--accent-magenta))]/90">
          {copy.eyebrow}
        </p>
        <h2
          id="home-fixes-heading"
          className="font-display mt-2 max-w-2xl text-[clamp(1.5rem,1rem+1.8vw,2.2rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
        >
          {copy.title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[rgb(var(--ink-soft))]">
          {copy.intro}
        </p>

        <ol className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-3 sm:gap-5">
          {copy.blocks.map((block, i) => (
            <li key={block.label} className="h-full">
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[rgb(var(--surface-2))]/80 p-5">
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${ACCENTS[i % ACCENTS.length]}`}
                  aria-hidden
                />
                <p className="relative text-[10px] font-bold uppercase tracking-[0.18em] text-[rgb(var(--accent-2))]">
                  {block.label}
                </p>
                <p className="relative mt-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                  {block.problem}
                </p>
                <p className="relative mt-3 flex-1 text-base font-semibold leading-snug text-[rgb(var(--ink))] [text-wrap:pretty]">
                  {block.fix}
                </p>
              </article>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-center text-sm text-[rgb(var(--ink-soft))]">
          {t.homeDemoTitle}:{" "}
          <Link href="/analyze" className="font-medium text-[rgb(var(--accent-2))] hover:underline">
            {t.homeDemoExample1}
          </Link>
          {" · "}
          <Link href="/analyze" className="font-medium text-[rgb(var(--accent-2))] hover:underline">
            {t.homeDemoExample2}
          </Link>
          {" · "}
          <Link href="/analyze" className="font-medium text-[rgb(var(--accent-2))] hover:underline">
            {t.homeDemoExample3}
          </Link>
        </p>
      </div>
    </section>
  );
}
