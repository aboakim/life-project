/** Instant feedback while a route segment compiles (common in `next dev`). */
export default function AppRouteLoading() {
  return (
    <div className="relative z-10 min-h-[50vh] pb-28 pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="animate-pulse space-y-4 rounded-[2rem] border border-white/[0.07] bg-white/[0.03] px-6 py-10 sm:px-10">
          <div className="h-3 w-24 rounded-full bg-white/10" />
          <div className="h-9 max-w-md rounded-lg bg-white/[0.08]" />
          <div className="h-4 max-w-xl rounded-lg bg-white/[0.06]" />
          <div className="h-4 max-w-lg rounded-lg bg-white/[0.05]" />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="h-32 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.02]" />
          <div className="h-32 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.02]" />
        </div>
        <p className="mt-8 text-center text-xs text-[rgb(var(--ink-soft))]/80">
          Loading…
        </p>
      </div>
    </div>
  );
}
