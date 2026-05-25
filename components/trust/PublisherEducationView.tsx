import Link from "next/link";
import PageEducation from "@/components/layout/PageEducation";
import TrustInlineText from "@/components/trust/TrustInlineText";
import type { PublisherEducationCopy } from "@/lib/i18n/trust-pages/types";
import { getTrustLinkLabels } from "@/lib/i18n/trust-pages/link-labels";
import type { AppLocale } from "@/lib/i18n/locale";

type Props = {
  copy: PublisherEducationCopy;
  locale: AppLocale;
  className?: string;
};

export default function PublisherEducationView({
  copy,
  locale,
  className = "",
}: Props) {
  const labels = getTrustLinkLabels(locale);
  const overview =
    copy.editorialOverviewLabel ?? "Editorial overview";

  return (
    <section
      className={`mx-auto max-w-3xl px-4 pb-20 pt-4 sm:px-6 sm:pb-28 ${className}`.trim()}
    >
      <PageEducation
        intro={
          <div className="space-y-3">
            {copy.introParagraphs.map((p) => (
              <p key={p.slice(0, 40)}>
                <TrustInlineText text={p} labels={labels} />
              </p>
            ))}
          </div>
        }
        sections={copy.sections.map((s) => ({
          heading: s.heading,
          body: (
            <div className="space-y-3">
              {s.blocks.map((block, i) => {
                if (block.kind === "p") {
                  return (
                    <p key={i}>
                      <TrustInlineText text={block.text} labels={labels} />
                    </p>
                  );
                }
                if (block.kind === "ul") {
                  return (
                    <ul
                      key={i}
                      className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70"
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
                    key={i}
                    className="list-decimal space-y-2 ps-5 marker:font-semibold marker:text-[rgb(var(--accent-2))]/80"
                  >
                    {block.items.map((item) => (
                      <li key={item}>
                        <TrustInlineText text={item} labels={labels} />
                      </li>
                    ))}
                  </ol>
                );
              })}
            </div>
          ),
        }))}
        faq={copy.faq?.map((item) => ({
          q: item.q,
          a: <TrustInlineText text={item.a} labels={labels} />,
          plainAnswer: item.plainAnswer ?? item.a,
        }))}
        footer={
          copy.footerParagraph ? (
            <p className="text-xs leading-relaxed text-[rgb(var(--ink-soft))]/85">
              <TrustInlineText text={copy.footerParagraph} labels={labels} />
            </p>
          ) : undefined
        }
        lastReviewed={copy.lastReviewed}
        lastReviewedISO="2026-05-25"
      />
    </section>
  );
}
