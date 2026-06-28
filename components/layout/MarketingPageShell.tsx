import type { ReactNode } from "react";
import ChromeHorizon from "@/components/ui/ChromeHorizon";
import LatticeSheen from "@/components/ui/LatticeSheen";
import OrbDecor from "@/components/ui/OrbDecor";
import PageThemeHeroBadge, {
  PageThemeChip,
} from "@/components/layout/PageThemeHeroBadge";
import type { PageTheme } from "@/lib/page-theme";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  theme?: PageTheme;
};

export default function MarketingPageShell({
  eyebrow,
  title,
  subtitle,
  children,
  theme,
}: Props) {
  return (
    <main
      id="main"
      className="marketing-page-shell relative z-10 min-h-screen pb-28"
    >
      <div className="marketing-page-wash pointer-events-none fixed inset-0 -z-[5]" aria-hidden />
      <OrbDecor />
      <LatticeSheen />
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
        <header className="marketing-page-hero animate-fade-up relative overflow-hidden rounded-[2.5rem] border border-white/[0.16] bg-gradient-to-br from-white/[0.13] via-white/[0.05] to-transparent px-6 py-10 shadow-[0_32px_100px_-48px_rgb(var(--page-accent,var(--accent))/0.42),0_0_0_1px_rgba(255,255,255,0.08)_inset] backdrop-blur-md sm:px-12 sm:py-12">
          <div className="marketing-page-hero-spine pointer-events-none absolute inset-y-8 start-0 w-1 rounded-full opacity-95 shadow-[0_0_24px_rgb(var(--page-accent,var(--accent))/0.5)] sm:inset-y-10" />
          <div className="marketing-page-hero-sheen pointer-events-none absolute inset-0" />
          <div className="grid-view pointer-events-none absolute inset-0 opacity-[0.5]" />
          <div className="relative flex max-w-3xl flex-col gap-3 ps-5 sm:flex-row sm:items-start sm:gap-6 sm:ps-8">
            <PageThemeHeroBadge theme={theme} />
            <div className="min-w-0 flex-1">
              <PageThemeChip theme={theme} />
              {eyebrow ? (
                <p className="marketing-page-eyebrow text-[0.7rem] font-bold uppercase tracking-[0.28em] sm:text-xs">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="font-display mt-3 text-[clamp(1.85rem,1.1rem+3.2vw,3.15rem)] font-extrabold leading-[1.08] tracking-tight text-[rgb(var(--ink))] [text-wrap:balance] sm:mt-4">
                {title}
              </h1>
              {subtitle ? (
                <div className="mt-5 text-lg leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty] md:text-xl md:leading-relaxed">
                  {subtitle}
                </div>
              ) : null}
            </div>
          </div>
        </header>
        <ChromeHorizon className="marketing-chrome-horizon mt-8" />
        <div className="mt-10 animate-fade-up [animation-delay:120ms]">{children}</div>
      </div>
    </main>
  );
}
