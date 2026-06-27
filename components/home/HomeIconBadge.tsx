type Props = {
  icon: string;
  size?: "md" | "lg";
  className?: string;
};

/** Gradient icon tile used on home feature cards. */
export default function HomeIconBadge({
  icon,
  size = "md",
  className = "",
}: Props) {
  const dim = size === "lg" ? "size-12 text-2xl" : "size-11 text-xl";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[rgb(var(--accent))]/30 via-[rgb(var(--accent-2))]/15 to-[rgb(var(--accent-magenta))]/10 ${dim} ring-1 ring-white/10 shadow-[0_10px_28px_-14px_rgb(var(--accent)/0.55)] ${className}`.trim()}
      aria-hidden
    >
      {icon}
    </span>
  );
}
