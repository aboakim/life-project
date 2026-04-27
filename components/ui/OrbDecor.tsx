/** Ambient gradient orbs — layered mesh feel, shared across marketing pages */
export default function OrbDecor() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="animate-pulse-soft absolute -left-[28%] bottom-[5%] size-[min(90vw,560px)] rounded-full bg-[rgb(var(--accent-sage)/0.22)] blur-[110px]" />
      <div className="animate-pulse-soft absolute -left-36 top-14 size-[460px] max-w-[78vw] rounded-full bg-[rgb(var(--accent)/0.14)] blur-[100px]" />
      <div className="animate-pulse-soft absolute -right-32 top-1/3 size-[440px] max-w-[82vw] rounded-full bg-[rgb(var(--accent-2)/0.22)] blur-[92px] [animation-delay:1.4s]" />
      <div className="animate-shimmer-slow absolute left-[18%] bottom-0 size-[400px] max-w-[90vw] rounded-full bg-[rgb(var(--accent-mint)/0.16)] blur-[88px]" />
      <div className="animate-pulse-soft absolute right-[12%] top-[52%] size-[320px] max-w-[85vw] rounded-full bg-[rgb(var(--accent-magenta)/0.1)] blur-[78px] [animation-delay:0.8s]" />
      <div className="animate-shimmer-slow absolute left-[40%] top-[36%] size-[280px] rounded-full bg-[rgb(var(--accent-coral)/0.1)] blur-[70px] [animation-delay:0.5s]" />
      <div className="animate-pulse-soft absolute -right-[8%] bottom-[16%] size-[340px] max-w-[88vw] rounded-full bg-[rgb(var(--accent-sky)/0.12)] blur-[86px] [animation-delay:2s]" />
    </div>
  );
}
