/** Lightweight first paint while the DecisionStudio chunk downloads (mobile PSI). */
export default function DecisionStudioSkeleton() {
  return (
    <div
      className="relative z-10 min-h-[min(88vh,52rem)] px-4 py-6 sm:py-10"
      aria-busy="true"
      aria-label="Loading workspace"
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="h-9 w-40 animate-pulse rounded-lg bg-white/[0.08] sm:h-10" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] lg:items-start">
          <div className="space-y-4">
            <div className="h-12 w-56 max-w-full animate-pulse rounded-2xl bg-gradient-to-r from-fuchsia-500/40 via-violet-500/35 to-indigo-500/40" />
            <div className="h-24 max-w-xl animate-pulse rounded-xl bg-white/[0.06]" />
            <div className="h-40 max-w-xl animate-pulse rounded-2xl bg-white/[0.05]" />
          </div>
          <div className="h-[min(52vh,28rem)] animate-pulse rounded-[1.75rem] bg-white/[0.06] ring-1 ring-white/10" />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="h-24 animate-pulse rounded-2xl bg-white/[0.04]" />
          <div className="h-24 animate-pulse rounded-2xl bg-white/[0.04]" />
          <div className="h-24 animate-pulse rounded-2xl bg-white/[0.04]" />
        </div>
      </div>
    </div>
  );
}
