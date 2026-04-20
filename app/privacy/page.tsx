import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Life Decision Engine handles your data, cookies, ads (Google AdSense), and third-party services. Includes your GDPR and CCPA rights and data retention periods.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <MarketingPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle={
        <p>
          Last updated April 2026. This page helps meet transparency expectations
          for visitors and ad programs (including Google AdSense). It is not
          legal advice; adapt with your counsel if needed.
        </p>
      }
    >
      <div className="max-w-3xl space-y-8 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Who we are
          </h2>
          <p className="mt-2">
            <strong className="text-[rgb(var(--ink))]">
              Life Decision Engine
            </strong>{" "}
            provides a structured decision-analysis experience (including
            optional AI features) and links to third-party professionals. The
            site is operated as described on the home page and in these terms
            of transparency.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Information you provide
          </h2>
          <p className="mt-2">
            When you use the analyzer or forms, you may enter text describing
            personal situations. That content is used to generate your session
            results. Do not submit information you are not comfortable processing
            for this purpose. Life Decision Engine is an informational and
            decision-support tool; it is not a medical, legal, or therapeutic
            service.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Cookies & advertising (Google AdSense)
          </h2>
          <p className="mt-2">
            We may display ads through{" "}
            <strong className="text-[rgb(var(--ink))]">
              Google AdSense
            </strong>
            . Google and its partners may use cookies or similar technology to
            show personalized or non-personalized ads, depending on your
            region and choices. See{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              How Google uses information from sites that use their services
            </a>
            . Where required, we use a consent mechanism compatible with
            regulations such as GDPR / ePrivacy.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            AI providers
          </h2>
          <p className="mt-2">
            If live AI analysis is enabled on the server, your prompt text may
            be sent to an AI provider (e.g. OpenAI) solely to generate a
            response. That processing is governed by the provider’s terms and
            policies.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Payments
          </h2>
          <p className="mt-2">
            Paid features may be processed by{" "}
            <strong className="text-[rgb(var(--ink))]">Stripe</strong>. We do not
            store full card numbers on our servers; Stripe handles payment data
            according to its policies.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Data retention
          </h2>
          <p className="mt-2">
            We retain data only as long as needed for the purpose it was
            collected:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 ps-5">
            <li>
              Analyzer inputs and AI outputs: processed for your session and
              not associated with an account unless you explicitly save them.
              Logs useful for diagnosing service errors are kept for up to
              30 days and then deleted or anonymised.
            </li>
            <li>
              Contact and expert-registration submissions: kept for the time
              required to respond and, where applicable, to maintain a
              directory listing. You may request deletion at any time.
            </li>
            <li>
              Billing records (if you purchase Premium or book an expert):
              retained by our payment processor (Stripe) for as long as
              required by applicable tax and accounting law. We keep minimal
              internal records (invoice identifiers and plan status), not
              full card data.
            </li>
            <li>
              Cookies and advertising identifiers set by Google or partners
              follow their own retention policies, which you can review on
              Google&rsquo;s privacy pages.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Your privacy rights (GDPR, UK GDPR, CCPA/CPRA, and similar)
          </h2>
          <p className="mt-2">
            Depending on where you live, you may have the following rights
            regarding your personal information:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 ps-5">
            <li>
              <strong className="text-[rgb(var(--ink))]">Right to access</strong> — ask
              us what personal data we hold about you, in a portable format.
            </li>
            <li>
              <strong className="text-[rgb(var(--ink))]">
                Right to rectification
              </strong>{" "}
              — ask us to correct inaccurate or incomplete data.
            </li>
            <li>
              <strong className="text-[rgb(var(--ink))]">
                Right to erasure (&ldquo;be forgotten&rdquo;)
              </strong>{" "}
              — ask us to delete personal data we hold about you, subject to
              legal obligations we cannot override.
            </li>
            <li>
              <strong className="text-[rgb(var(--ink))]">
                Right to restrict or object to processing
              </strong>{" "}
              — including objecting to personalised advertising or profiling.
            </li>
            <li>
              <strong className="text-[rgb(var(--ink))]">
                Right to withdraw consent
              </strong>{" "}
              — where we rely on consent (e.g. ad personalisation), you can
              withdraw it at any time via the cookie banner, which you can
              reopen from the footer.
            </li>
            <li>
              <strong className="text-[rgb(var(--ink))]">
                Right to data portability
              </strong>{" "}
              — receive your data in a machine-readable format.
            </li>
            <li>
              <strong className="text-[rgb(var(--ink))]">
                Right to non-discrimination (CCPA/CPRA)
              </strong>{" "}
              — we will not deny service, charge different prices, or provide
              a lower quality of service because you exercised your privacy
              rights.
            </li>
            <li>
              <strong className="text-[rgb(var(--ink))]">
                Right to lodge a complaint
              </strong>{" "}
              — with your local data-protection authority.
            </li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, email us from the{" "}
            <Link
              href="/contact"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              contact page
            </Link>
            . We will verify your request and respond within a reasonable
            timeframe (generally within 30 days).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            &ldquo;Do Not Sell or Share My Personal Information&rdquo; (California)
          </h2>
          <p className="mt-2">
            We do not sell personal information for money. However, under
            CCPA/CPRA, the use of advertising cookies (including some
            AdSense features) may be considered &ldquo;sharing&rdquo; for
            cross-context behavioural advertising. California residents can
            opt out by:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 ps-5">
            <li>
              Declining or later withdrawing consent in the cookie banner
              (which disables ad and analytics storage via Google Consent
              Mode).
            </li>
            <li>
              Using the Global Privacy Control (GPC) signal in your browser —
              we honour GPC where technically possible.
            </li>
            <li>
              Emailing us via the{" "}
              <Link
                href="/contact"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                contact page
              </Link>{" "}
              with the subject &ldquo;Do Not Sell / Share&rdquo;.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            International transfers
          </h2>
          <p className="mt-2">
            The service is hosted on infrastructure operated internationally.
            Data you submit (including analyzer prompts and contact messages)
            may be processed in countries other than your own, including the
            United States. Where such transfers are subject to GDPR, we rely
            on Standard Contractual Clauses or equivalent safeguards offered
            by our providers.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Security
          </h2>
          <p className="mt-2">
            We apply reasonable technical and organisational measures to
            protect data in transit (HTTPS/TLS everywhere) and at rest.
            Payment data is handled by Stripe on PCI-DSS certified
            infrastructure. No system is 100% secure; if we ever learn of a
            breach affecting your personal data, we will notify affected
            users and regulators as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Children
          </h2>
          <p className="mt-2">
            The service is not directed at children under 13 (or the age
            required in your jurisdiction — 16 in much of the EU). Do not use
            the service if you are below that age. If we learn we collected
            data from a child without parental consent, we will delete it.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Changes to this policy
          </h2>
          <p className="mt-2">
            We may update this policy to reflect new features, providers, or
            legal requirements. Material changes will be flagged on this
            page with a revised &ldquo;Last updated&rdquo; date.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Contact
          </h2>
          <p className="mt-2">
            For privacy-related questions or data requests (access,
            correction, deletion), use the{" "}
            <Link
              href="/contact"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              contact page
            </Link>
            . You can also review our{" "}
            <Link
              href="/terms"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and the{" "}
            <Link
              href="/about"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              About
            </Link>{" "}
            page to learn who operates the service.
          </p>
        </section>

        <p>
          <Link
            href="/"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </MarketingPageShell>
  );
}
