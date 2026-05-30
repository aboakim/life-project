import type { AppLocale } from "@/lib/i18n/locale";
import { getHomeSectionNavProps } from "@/lib/home/home-section-nav";

/**
 * Server-rendered section nav — sticks under GlobalNav for the full home scroll.
 */
export default function HomeSectionNavStatic({ locale }: { locale: AppLocale }) {
  const { links, navAriaLabel } = getHomeSectionNavProps(locale);

  return (
    <div className="home-section-nav-shell">
      <nav className="home-section-nav" aria-label={navAriaLabel}>
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
    </div>
  );
}
