/** Subtle corner lattice + slow sheen — fixed under content, no pointer capture */
export default function LatticeSheen() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-[6] hidden overflow-hidden md:block [contain:strict]"
      aria-hidden
    >
      <div className="lattice-sheen-layer absolute -end-[20%] -top-[10%] size-[min(85vw,520px)] rounded-[40%] opacity-[0.14] [background:repeating-linear-gradient(105deg,rgb(255_255_255/0.09)_0_1px,transparent_1px_11px)] [mask-image:radial-gradient(closest-side,rgb(0_0_0/0.9),transparent)]" />
      <div className="lattice-sheen-layer absolute -bottom-[8%] -start-[18%] size-[min(78vw,480px)] rounded-[45%] opacity-[0.11] [background:repeating-linear-gradient(-115deg,rgb(var(--accent-mint)/0.14)_0_1px,transparent_1px_13px)] [mask-image:radial-gradient(closest-side,rgb(0_0_0/0.85),transparent)]" />
    </div>
  );
}
