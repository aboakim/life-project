/** Extra-slow gradient drift — sits under page content; respects reduced-motion in CSS */
export default function AmbientDriftLayer() {
  return (
    <div
      className="ambient-drift-layer pointer-events-none fixed inset-0 -z-[8] overflow-hidden"
      aria-hidden
    >
      <div className="ambient-drift-blob ambient-drift-blob--a absolute -left-[20%] top-[10%] size-[min(120vw,720px)] rounded-full bg-[rgb(var(--accent)/0.2)] blur-[100px]" />
      <div className="ambient-drift-blob ambient-drift-blob--b absolute -right-[15%] bottom-[5%] size-[min(100vw,620px)] rounded-full bg-[rgb(var(--accent-2)/0.17)] blur-[95px]" />
      <div className="ambient-drift-blob ambient-drift-blob--c absolute left-[5%] bottom-[12%] size-[min(85vw,520px)] rounded-full bg-[rgb(var(--accent-coral)/0.09)] blur-[90px]" />
    </div>
  );
}
