/** Extra-slow gradient drift — sits under page content; respects reduced-motion in CSS */
export default function AmbientDriftLayer() {
  return (
    <div
      className="ambient-drift-layer pointer-events-none fixed inset-0 -z-[8] overflow-hidden"
      aria-hidden
    >
      <div className="ambient-drift-blob ambient-drift-blob--a absolute -left-[18%] top-[8%] size-[min(115vw,680px)] rounded-full bg-[rgb(var(--accent-sage)/0.14)] blur-[100px]" />
      <div className="ambient-drift-blob ambient-drift-blob--b absolute -right-[15%] bottom-[5%] size-[min(100vw,620px)] rounded-full bg-[rgb(var(--accent-2)/0.18)] blur-[95px]" />
      <div className="ambient-drift-blob ambient-drift-blob--c absolute left-[4%] bottom-[10%] size-[min(82vw,500px)] rounded-full bg-[rgb(var(--accent-mint)/0.1)] blur-[92px]" />
    </div>
  );
}
