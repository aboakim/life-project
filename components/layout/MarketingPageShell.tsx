import type { ReactNode } from "react";
import ChromeHorizon from "@/components/ui/ChromeHorizon";
import LatticeSheen from "@/components/ui/LatticeSheen";
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
      <LatticeSheen />
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
        <header className="animate-fade-up relative overflow-hidden rounded-[2.5rem] border border-white/[0.16] bg-gradient-to-br from-white/[0.13] via-white/[0.05] to-transparent px-6 py-10 shadow-[0_32px_100px_-48px_rgb(var(--accent)/0.42),0_0_0_1px_rgba(255,255,255,0.08)_inset] backdrop-blur-md sm:px-12 sm:py-12">
          <div className="pointer-events-none absolute inset-y-8 start-0 w-1 rounded-full bg-gradient-to-b from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] opacity-95 shadow-[0_0_24px_rgb(var(--accent)/0.5)] sm:inset-y-10" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgb(var(--accent)/0.16),transparent_40%,rgb(var(--accent-2)/0.12),transparent_65%,rgb(var(--accent-magenta)/0.1))]" />
          <div className="grid-view pointer-events-none absolute inset-0 opacity-[0.5]" />
          <div className="relative max-w-3xl ps-5 sm:ps-8">
            {eyebrow ? (
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-[rgb(var(--accent-2))] sm:text-xs">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="font-display mt-4 text-[clamp(1.85rem,1.1rem+3.2vw,3.15rem)] font-extrabold leading-[1.08] tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]">
              {title}
            </h1>
            {subtitle ? (
              <div className="mt-5 text-lg leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty] md:text-xl md:leading-relaxed">
                {subtitle}
              </div>
            ) : null}
          </div>
        </header>
        <ChromeHorizon className="mt-8" />
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
