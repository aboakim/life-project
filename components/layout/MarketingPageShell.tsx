import type { ReactNode } from "react";
import OrbDecor from "@/components/ui/OrbDecor";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
};

export default function MarketingPageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div id="main" className="relative z-10 min-h-screen pb-28">
      <OrbDecor />
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
        <header className="animate-fade-up relative overflow-hidden rounded-[2rem] border border-white/[0.14] bg-gradient-to-br from-white/[0.11] via-white/[0.04] to-white/[0.02] px-6 py-8 shadow-[0_24px_80px_-40px_rgb(var(--accent)/0.35),0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-sm sm:px-10 sm:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(var(--accent)/0.14),transparent_38%,rgb(var(--accent-2)/0.1),transparent_62%,rgb(var(--accent-magenta)/0.08))]" />
          <div className="grid-view pointer-events-none absolute inset-0 opacity-[0.45]" />
          <div className="relative max-w-3xl">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgb(var(--accent-2))]">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="font-display mt-3 text-3xl font-bold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance] sm:text-4xl lg:text-[2.45rem] lg:leading-[1.12]">
              {title}
            </h1>
            {subtitle ? (
              <div className="mt-4 text-base leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                {subtitle}
              </div>
            ) : null}
          </div>
        </header>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
