import Link from "next/link";
import type { TrustLinkKey } from "@/lib/i18n/trust-pages/types";
import { getTrustLinkHref } from "@/lib/i18n/trust-pages/links";

const LINK_CLASS =
  "font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline";

type Props = {
  text: string;
  labels: Partial<Record<TrustLinkKey, string>>;
};

/** Renders `{privacy}`-style placeholders as Next.js links. */
export default function TrustInlineText({ text, labels }: Props) {
  const parts = text.split(/(\{[a-zA-Z]+\})/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = /^\{([a-zA-Z]+)\}$/.exec(part);
        if (!m) return <span key={i}>{part}</span>;
        const key = m[1] as TrustLinkKey;
        const label = labels[key];
        const href = getTrustLinkHref(key);
        if (!label || !href) return <span key={i}>{part}</span>;
        if (href.startsWith("http")) {
          return (
            <a
              key={i}
              href={href}
              className={LINK_CLASS}
              rel="noopener noreferrer"
              target="_blank"
            >
              {label}
            </a>
          );
        }
        return (
          <Link key={i} href={href} className={LINK_CLASS}>
            {label}
          </Link>
        );
      })}
    </>
  );
}
