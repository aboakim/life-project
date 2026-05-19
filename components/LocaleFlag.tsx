import { localeFlagSrc } from "@/lib/i18n/locale";

type Props = {
  flagCode: string;
  className?: string;
};

/** Small flag image (flagcdn) — reliable on Windows where emoji flags break in &lt;select&gt;. */
export default function LocaleFlag({
  flagCode,
  className = "h-3.5 w-5 shrink-0 rounded-[2px] object-cover shadow-sm ring-1 ring-white/10",
}: Props) {
  const w = 40;
  return (
    <img
      src={localeFlagSrc(flagCode, w)}
      srcSet={`${localeFlagSrc(flagCode, w)} 1x, ${localeFlagSrc(flagCode, w * 2)} 2x`}
      width={20}
      height={14}
      alt=""
      aria-hidden
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}
