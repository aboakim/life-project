import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import TrustInlineText from "@/components/trust/TrustInlineText";
import type { TrustBlock, TrustFaqItem, TrustPageCopy } from "@/lib/i18n/trust-pages/types";
import { getTrustLinkLabels } from "@/lib/i18n/trust-pages/link-labels";
import type { AppLocale } from "@/lib/i18n/locale";

function buildFaqJsonLd(faq: TrustFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a.replace(/\{[^}]+\}/g, "").replace(/\s+/g, " ").trim(),
      },
    })),
  };
}

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
  const faqLd =
    copy.faq && copy.faq.length > 0 ? buildFaqJsonLd(copy.faq) : null;

  return (
    <MarketingPageShell
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={<p>{copy.subtitle}</p>}
    >
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}
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
        {copy.faq && copy.faq.length > 0 ? (
          <section aria-label="FAQ">
            <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
              Quick answers
            </h2>
            <dl className="mt-4 space-y-6">
              {copy.faq.map((item) => (
                <div key={item.q}>
                  <dt className="font-medium text-[rgb(var(--ink))]">
                    {item.q}
                  </dt>
                  <dd className="mt-2">
                    <TrustInlineText text={item.a} labels={labels} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
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
