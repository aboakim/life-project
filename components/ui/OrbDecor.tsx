/** Ambient gradient orbs — layered mesh feel, shared across marketing pages */
export default function OrbDecor() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="animate-pulse-soft absolute -left-40 top-16 size-[480px] rounded-full bg-[rgb(var(--accent)/0.2)] blur-[100px]" />
      <div className="animate-pulse-soft absolute -right-32 top-1/3 size-[420px] rounded-full bg-[rgb(var(--accent-2)/0.18)] blur-[90px] [animation-delay:1.4s]" />
      <div className="animate-shimmer-slow absolute left-[20%] bottom-0 size-[380px] rounded-full bg-[rgb(var(--accent-magenta)/0.14)] blur-[85px]" />
      <div className="animate-pulse-soft absolute right-[15%] top-[55%] size-[340px] rounded-full bg-[rgb(var(--accent-warm)/0.1)] blur-[80px] [animation-delay:0.8s]" />
    </div>
  );
}
