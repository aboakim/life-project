import type { AppLocale } from "@/lib/i18n/locale";
import { getHomeSectionNavProps } from "@/lib/home/home-section-nav";

/**
 * Server-rendered section nav — no client JS (scroll-spy loads later in DecisionStudio if needed).
 */
export default function HomeSectionNavStatic({ locale }: { locale: AppLocale }) {
  const { links, navAriaLabel } = getHomeSectionNavProps(locale);

  return (
    <nav
      className="home-section-nav relative sticky top-[3.25rem] z-30 min-w-0 w-full border-b border-white/[0.1] bg-[rgb(var(--surface))]/85 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[rgb(var(--accent))]/35 before:to-transparent"
      aria-label={navAriaLabel}
    >
      <div className="mx-auto flex min-w-0 max-w-6xl items-center gap-1 overflow-x-auto overscroll-x-contain px-3 py-2.5 scrollbar-none sm:px-6">
        {links.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className="shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium text-[rgb(var(--ink-soft))] transition-[color,background-color,box-shadow,transform] duration-300 ease-out hover:bg-white/[0.06] hover:text-[rgb(var(--ink))] hover:ring-1 hover:ring-white/[0.08] motion-safe:active:scale-[0.97]"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
