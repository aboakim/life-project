import Image from "next/image";
import Link from "next/link";
import type { ThematicBandCopy } from "@/lib/i18n/home-thematic-bands";

type Props = {
  copy: ThematicBandCopy;
  imageSrc: string;
  /** LTR: image on the left; RTL-friendly via `lg:flex-row-reverse` */
  imageSide: "start" | "end";
  sectionId: string;
};

export default function ThematicImageBand({
  copy,
  imageSrc,
  imageSide,
  sectionId,
}: Props) {
  const reverse = imageSide === "end";
  return (
    <section
      id={sectionId}
      className="home-section-wash home-section-wash--product scroll-mt-36 rounded-[1.85rem] px-3 pt-10 sm:px-4 sm:pt-12"
      aria-labelledby={`${sectionId}-h`}
    >
      <div
        className={`overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-gradient-to-br from-white/[0.1] via-white/[0.04] to-[rgb(var(--surface-2))]/40 shadow-[0_24px_70px_-40px_rgb(var(--accent)/0.3)] ${
          reverse ? "lg:flex lg:flex-row-reverse" : "lg:flex"
        } lg:items-stretch lg:gap-0`}
      >
        <div
          className={`relative aspect-[16/10] w-full min-h-[12rem] shrink-0 lg:aspect-auto lg:min-h-[20rem] lg:w-[min(48%,24rem)] ${
            reverse ? "lg:rounded-s-none lg:rounded-e-[1.75rem]" : "lg:rounded-e-none lg:rounded-s-[1.75rem]"
          } overflow-hidden`}
        >
          <Image
            src={imageSrc}
            alt={copy.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, min(384px, 49vw)"
            loading="lazy"
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[rgb(var(--surface))/0.35] via-transparent to-[rgb(var(--accent-magenta))/0.1] lg:from-[rgb(var(--surface))/0.5]" />
        </div>
        <div className="flex flex-1 flex-col justify-center p-5 sm:p-7 lg:max-w-none lg:py-8 lg:pe-8 lg:ps-7">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[rgb(var(--accent-warm))]/95">
            {copy.eyebrow}
          </p>
          <h2
            id={`${sectionId}-h`}
            className="font-display mt-2 text-[clamp(1.2rem,0.9rem+1.2vw,1.7rem)] font-extrabold leading-tight tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
          >
            {copy.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty] sm:text-base sm:leading-relaxed">
            {copy.body}
          </p>
          <p className="mt-5">
            <Link
              href={copy.ctaHref}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[rgb(var(--accent)/0.25)] transition hover:brightness-110"
            >
              {copy.cta}
              <span className="ms-1.5" aria-hidden>
                →
              </span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
