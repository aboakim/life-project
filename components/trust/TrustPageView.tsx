import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import TrustInlineText from "@/components/trust/TrustInlineText";
import type { TrustBlock, TrustPageCopy } from "@/lib/i18n/trust-pages/types";
import { getTrustLinkLabels } from "@/lib/i18n/trust-pages/link-labels";
import type { AppLocale } from "@/lib/i18n/locale";

function renderBlock(
  block: TrustBlock,
  labels: ReturnType<typeof getTrustLinkLabels>,
  key: number,
) {
  if (block.kind === "p") {
    return (
      <p key={key} className="mt-2">
        <TrustInlineText text={block.text} labels={labels} />
      </p>
    );
  }
  if (block.kind === "ul") {
    return (
      <ul
        key={key}
        className="mt-2 list-disc space-y-1.5 ps-6 marker:text-[rgb(var(--accent-2))]/70"
      >
        {block.items.map((item) => (
          <li key={item}>
            <TrustInlineText text={item} labels={labels} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ol
      key={key}
      className="mt-2 list-decimal space-y-1.5 ps-6 marker:font-semibold marker:text-[rgb(var(--accent-2))]/80"
    >
      {block.items.map((item) => (
        <li key={item}>
          <TrustInlineText text={item} labels={labels} />
        </li>
      ))}
    </ol>
  );
}

type Props = {
  copy: TrustPageCopy;
  locale: AppLocale;
};

export default function TrustPageView({ copy, locale }: Props) {
  const labels = getTrustLinkLabels(locale);

  return (
    <MarketingPageShell
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={<p>{copy.subtitle}</p>}
    >
      <div className="max-w-3xl space-y-8 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
        {copy.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
              {section.heading}
            </h2>
            {section.blocks.map((block, i) =>
              renderBlock(block, labels, i),
            )}
          </section>
        ))}
        {copy.backHome ? (
          <p className="pt-4">
            <Link
              href="/"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              {copy.backHome}
            </Link>
          </p>
        ) : null}
      </div>
    </MarketingPageShell>
  );
}
