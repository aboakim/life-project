import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Life Decision Engine handles your data, cookies, ads (Google AdSense), and third-party services.",
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
            Children
          </h2>
          <p className="mt-2">
            The service is not directed at children under 13 (or the age
            required in your jurisdiction). Do not use the service if you are
            below that age.
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
