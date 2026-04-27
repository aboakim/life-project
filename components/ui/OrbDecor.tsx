/** Ambient gradient orbs — layered mesh feel, shared across marketing pages */
export default function OrbDecor() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [contain:strict]"
      aria-hidden
    >
      {/* Phones / tablets: fewer, smaller blobs = less blur compositing & jank */}
      <div className="animate-pulse-soft absolute -left-[28%] bottom-[5%] size-[min(92vw,420px)] rounded-full bg-[rgb(var(--accent-sage)/0.22)] blur-[72px] lg:size-[min(90vw,560px)] lg:blur-[110px]" />
      <div className="animate-pulse-soft absolute -left-36 top-14 size-[min(340px,78vw)] rounded-full bg-[rgb(var(--accent)/0.14)] blur-[64px] lg:size-[460px] lg:blur-[100px]" />
      <div className="animate-pulse-soft absolute -right-32 top-1/3 size-[min(360px,82vw)] rounded-full bg-[rgb(var(--accent-2)/0.22)] blur-[68px] [animation-delay:1.4s] lg:size-[440px] lg:blur-[92px]" />
      <div className="animate-shimmer-slow absolute left-[18%] bottom-0 hidden size-[400px] rounded-full bg-[rgb(var(--accent-mint)/0.16)] blur-[88px] lg:block" />
      <div className="animate-pulse-soft absolute right-[12%] top-[52%] hidden size-[320px] rounded-full bg-[rgb(var(--accent-magenta)/0.1)] blur-[78px] [animation-delay:0.8s] lg:block" />
      <div className="animate-shimmer-slow absolute left-[40%] top-[36%] hidden size-[280px] rounded-full bg-[rgb(var(--accent-coral)/0.1)] blur-[70px] [animation-delay:0.5s] lg:block" />
      <div className="animate-pulse-soft absolute -right-[8%] bottom-[16%] hidden size-[340px] rounded-full bg-[rgb(var(--accent-sky)/0.12)] blur-[86px] [animation-delay:2s] lg:block" />
    </div>
  );
}
