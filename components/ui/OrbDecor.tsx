/** Soft gradient orbs — shared across marketing pages */
export default function OrbDecor() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="animate-pulse-soft absolute -left-32 top-24 size-[420px] rounded-full bg-[rgb(var(--accent)/0.14)] blur-3xl" />
      <div className="animate-pulse-soft absolute -right-24 bottom-10 size-[380px] rounded-full bg-[rgb(var(--accent-2)/0.12)] blur-3xl [animation-delay:1.2s]" />
      <div className="animate-pulse-soft absolute left-1/3 top-1/2 size-[320px] -translate-y-1/2 rounded-full bg-[rgb(var(--accent-magenta)/0.08)] blur-3xl [animation-delay:0.6s]" />
    </div>
  );
}
