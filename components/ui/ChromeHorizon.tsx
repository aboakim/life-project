/**
 * Slim spectral accent — sits under heroes / section breaks.
 * Pure CSS; pointer-events none; safe with AdSense zones below.
 */
export default function ChromeHorizon({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative py-1 ${className}`.trim()}
      aria-hidden
    >
      <div className="relative h-px w-full overflow-hidden rounded-full bg-white/[0.12]">
        <div className="chrome-horizon-glow pointer-events-none absolute -inset-y-3 start-1/4 h-7 w-1/2 -translate-x-1/2 rounded-full bg-[rgb(var(--accent))]/25 blur-md" />
        <div className="chrome-horizon-sweep pointer-events-none absolute inset-y-0 w-[42%] rounded-full bg-gradient-to-r from-transparent via-[rgb(var(--accent-2))]/55 to-transparent opacity-90" />
      </div>
      <div className="mt-1 flex justify-center gap-1 opacity-80">
        <span className="size-1 rounded-full bg-[rgb(var(--accent))]/70 shadow-[0_0_8px_rgb(var(--accent)/0.5)]" />
        <span className="size-1 rounded-full bg-[rgb(var(--accent-2))]/70 shadow-[0_0_8px_rgb(var(--accent-2)/0.45)]" />
        <span className="size-1 rounded-full bg-[rgb(var(--accent-magenta))]/65 shadow-[0_0_8px_rgb(var(--accent-magenta)/0.4)]" />
      </div>
    </div>
  );
}
