import Link from "next/link";
import ToolPageEducation from "@/components/trust/ToolPageEducation";

/** Server-rendered revenue transparency for /monetize (AdSense reviewers). */
export default function MonetizeEducation() {
  return (
    <ToolPageEducation
      intro={
        <>
          <p>
            Life Decision Engine is a publisher-first product: long-form
            editorial articles, structured decision tools, and a curated
            experts directory. Revenue keeps the core analyzer free for
            readers who cannot pay, funds human editorial review of
            AI-assisted articles, and pays for hosting and security. We
            document every channel on this page so you always know how money
            flows — including advertising when Google AdSense is enabled.
          </p>
          <p>
            Card checkout on the site covers optional Premium features only.
            Expert introductions, B2B contracts, affiliate links, and display
            ads are separate channels with their own contracts and
            disclosures. Nothing on this page is tax or legal advice; talk
            to a professional in your jurisdiction before signing agreements.
          </p>
        </>
      }
      sections={[
        {
          heading: "How advertising fits",
          body: (
            <p>
              When approved, Google AdSense may show labeled display units on
              free pages such as the analyzer and blog. Ads load only after
              idle time, respect Consent Mode v2 (denied until you accept in
              the banner), and never replace editorial content. See{" "}
              <Link
                href="/privacy"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/cookies"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                Cookies
              </Link>{" "}
              for how ad cookies work.
            </p>
          ),
        },
        {
          heading: "Other revenue channels",
          body: (
            <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
              <li>
                <strong className="text-[rgb(var(--ink))]">
                  Expert leads
                </strong>{" "}
                — transparent referral fees when a reader books an
                independent professional listed in the directory.
              </li>
              <li>
                <strong className="text-[rgb(var(--ink))]">
                  B2B &amp; teams
                </strong>{" "}
                — invoiced access for HR, coaching, and relocation programs.
              </li>
              <li>
                <strong className="text-[rgb(var(--ink))]">
                  Affiliate links
                </strong>{" "}
                — disclosed Amazon Associates and similar programs on select
                articles; prices to you stay the same.
              </li>
              <li>
                <strong className="text-[rgb(var(--ink))]">
                  Premium subscriptions
                </strong>{" "}
                — optional Stripe checkout for power users; see{" "}
                <Link
                  href="/pricing"
                  className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  pricing
                </Link>
                .
              </li>
            </ul>
          ),
        },
        {
          heading: "Editorial independence",
          body: (
            <p>
              Revenue never buys placement in the analyzer output, blog
              rankings, or expert directory order. Sponsored slots, when
              they exist, are labeled and limited to fixed regions on the
              page. Read the full{" "}
              <Link
                href="/editorial-standards"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                editorial standards
              </Link>{" "}
              and{" "}
              <Link
                href="/content-policy"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                content policy
              </Link>{" "}
              for the review checklist every article passes.
            </p>
          ),
        },
      ]}
      faq={[
        {
          q: "Will ads appear before AdSense approves the site?",
          a: "No. Ad units render only when slot environment variables are set after Google approval. Until then the site stays ad-free while verification meta and ads.txt remain in place.",
        },
        {
          q: "Can I use the platform without seeing ads?",
          a: "Premium subscribers and pages without ad slot configuration stay free of display units. You can also reject marketing cookies in the consent banner, which keeps personalized ad storage disabled under Consent Mode v2.",
        },
      ]}
      lastReviewed="June 23, 2026"
      lastReviewedISO="2026-06-23"
    />
  );
}
