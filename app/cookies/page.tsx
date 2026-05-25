import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Life Decision Engine uses cookies: essential, analytics (Google Analytics), and advertising (Google AdSense). Manage your choices.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <MarketingPageShell
      eyebrow="Legal"
      title="Cookie Policy"
      subtitle={
        <p>
          Last updated May 2026. This page explains what cookies we set, why,
          and how to control non-essential cookies. For full privacy rights see{" "}
          <Link
            href="/privacy"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      }
    >
      <div className="max-w-3xl space-y-8 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            What are cookies?
          </h2>
          <p className="mt-2">
            Cookies are small text files stored in your browser. They help a
            site remember preferences, keep you signed in, measure traffic, or
            show relevant ads. Some cookies are set by us; others by partners
            such as Google when you accept advertising or analytics cookies.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Essential cookies
          </h2>
          <p className="mt-2">
            We use a locale preference cookie and local storage keys so the
            interface language and consent choice persist between visits. These
            are necessary for the product to function as you expect. They do
            not require consent under EU guidance because they are strictly
            functional.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Analytics cookies (optional)
          </h2>
          <p className="mt-2">
            With your permission we load Google Analytics 4 to understand which
            pages help readers and where the experience is slow. Analytics
            cookies stay off until you click &ldquo;Accept all&rdquo; on the
            consent banner or have previously accepted. You can reject
            non-essential cookies and still use the analyzer.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Advertising cookies (optional)
          </h2>
          <p className="mt-2">
            We participate in Google AdSense. Ad cookies and similar
            technologies may be used to deliver and measure ads, limit how
            often you see an ad, and — if you consent — personalise ads. Before
            consent, Google may still serve contextual or non-personalised ads
            depending on your region and Google&apos;s policies. Our{" "}
            <Link
              href="/ads.txt"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              ads.txt
            </Link>{" "}
            file lists our authorised seller ID (
            <code className="text-[rgb(var(--ink))]">pub-3541461663112540</code>
            ).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            How to change your choice
          </h2>
          <p className="mt-2">
            Use the consent banner at the bottom of the site when it appears, or
            clear site data for lifedecisions.space in your browser settings to
            reset the banner. You can also install browser extensions that block
            third-party cookies globally.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            More information
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 ps-6">
            <li>
              <Link
                href="/privacy"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/content-policy"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                Content Policy
              </Link>
            </li>
            <li>
              <a
                href="https://policies.google.com/technologies/ads"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                How Google uses cookies in advertising
              </a>
            </li>
          </ul>
        </section>
      </div>
    </MarketingPageShell>
  );
}
