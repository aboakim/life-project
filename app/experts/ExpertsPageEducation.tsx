import Link from "next/link";
import PageEducation from "@/components/layout/PageEducation";

/**
 * Server-rendered educational content for /experts.
 *
 * Lives outside the Suspense boundary that wraps `<ExpertsMarketplace />`
 * (a client component using `useSearchParams`). Without this, the SSR HTML
 * for /experts is just the Suspense fallback div, and crawlers (Googlebot,
 * AdSense reviewers) see an essentially empty page — the cause of the
 * "low value content" / "ads on screens without publisher-content"
 * AdSense rejection. Keeping this block server-side guarantees ~700 words
 * of unique editorial copy in the initial document for every request.
 */
export default function ExpertsPageEducation() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-16 pt-2 sm:px-6 sm:pb-24 sm:pt-4">
      <PageEducation
        intro={
          <>
            <p>
              The Life Decision Engine experts directory is a curated index
              of independent professionals — psychologists, lawyers,
              financial planners, immigration counsel, physicians, and
              career coaches — who can review a major life decision with
              you in a private 30 to 60 minute conversation. The directory
              exists for the moments when a structured AI report has taken
              you as far as it can, and what you actually need next is a
              second pair of human eyes from someone with field
              accountability and professional liability.
            </p>
            <p>
              Every listing is added by the professional themselves through
              <Link
                href="/experts/register"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                {" "}/experts/register
              </Link>
              . We do not buy lead lists, scrape LinkedIn, or auto-generate
              profiles from public databases. Profiles include name,
              country and city, professional role, languages, a short bio
              in their own words, and an optional website. Engagement
              happens directly between you and the professional — Life
              Decision Engine does not take a commission on the first
              conversation, does not see the body of your message after
              you submit it, and does not store the contents of the
              request.
            </p>
          </>
        }
        sections={[
          {
            heading: "Roles in this directory",
            body: (
              <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    Psychologists & therapists
                  </strong>{" "}
                  — for grief in a separation, decision paralysis, anxiety
                  around a relocation, or processing a job loss. They are
                  not a substitute for emergency mental-health care; if
                  you are in crisis, contact local emergency services
                  first.
                </li>
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    Lawyers
                  </strong>{" "}
                  — civil, family, employment, real-estate or contract
                  questions. Especially helpful when an offer letter,
                  custody agreement, or rental contract needs a careful
                  second read in a language you didn&apos;t grow up writing.
                </li>
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    Financial planners & advisors
                  </strong>{" "}
                  — fee-only or commission-based; the listing notes which.
                  Think runway math before quitting, mortgage versus rent
                  in a new country, taxes when you become a remote
                  employee, or whether a side-business is worth the
                  accounting overhead.
                </li>
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    Immigration & relocation counsel
                  </strong>{" "}
                  — visa categories, employer sponsorship, family
                  reunification, residency timelines, and the practical
                  sequencing of steps when you are moving with kids or a
                  partner who needs work authorization.
                </li>
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    Physicians & medical advisors
                  </strong>{" "}
                  — for second opinions on a diagnosis, decisions about
                  treatment in a country where you are new to the system,
                  or specialist referrals. Not a replacement for primary
                  care.
                </li>
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    Coaches
                  </strong>{" "}
                  — career and life coaching; useful when you have a
                  decision in front of you and want regular accountability
                  over four to twelve weeks rather than a one-off opinion.
                </li>
              </ul>
            ),
          },
          {
            heading: "When to use a human expert vs. the analyzer",
            body: (
              <p>
                The structured analyzer at the top of the site is designed
                to take a vague feeling — &ldquo;I think I want to leave
                this job, but I&apos;m not sure&rdquo; — and turn it into
                named scenarios, weighted lenses, a timeline, and a score.
                That alone often unblocks people. Move to a human expert
                when the decision involves money you can&apos;t afford to
                lose, legal exposure, a health question, a contract
                deadline, or when there is a second person whose interests
                are tangled with yours and the analyzer can only model one
                perspective. Bring the generated report into the
                conversation; it shortens the intake by 15 to 25 minutes.
              </p>
            ),
          },
          {
            heading: "How to contact a professional",
            body: (
              <ol className="list-decimal space-y-2 ps-5 marker:font-semibold marker:text-[rgb(var(--accent-2))]">
                <li>
                  Filter by role, country, or keyword (for example
                  &ldquo;employment lawyer · Yerevan · English&rdquo;).
                </li>
                <li>
                  Open a profile, read the bio, check the languages they
                  work in.
                </li>
                <li>
                  Write a short message: your situation in two or three
                  sentences, the question you want answered, and your
                  timeline (this week / this month / no rush).
                </li>
                <li>
                  Submit — the message goes directly to the
                  professional&apos;s contact form. They reply on their own
                  schedule and on their own fee structure. We do not see
                  the contents.
                </li>
              </ol>
            ),
          },
        ]}
        faq={[
          {
            q: "Are these professionals vetted?",
            a: "Each professional self-attests to their licence, registration body, and country of practice when they register, and the listing is reviewed by an editor before it goes live. We do not, however, perform a full background or licence-board verification — that responsibility sits with you and with the professional. Always check their public registration before paying for a long engagement.",
          },
          {
            q: "Is there a fee to use the directory?",
            a: "There is no fee to browse, contact a professional, or have a first conversation through the contact form. Each professional sets their own fees for ongoing work and bills you directly. Life Decision Engine does not take a commission on these payments.",
          },
          {
            q: "Can I list myself or my practice here?",
            a: (
              <>
                Yes — independent professionals can apply via{" "}
                <Link
                  href="/experts/register"
                  className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  /experts/register
                </Link>
                . Listings are free for the first cohort and will remain
                free for verified individuals. Lead-generation agencies
                and multi-level referral networks will be removed.
              </>
            ),
          },
          {
            q: "What about my privacy when I send a message?",
            a: "The professional sees your name, email, and message body. Life Decision Engine receives a record that the contact happened (timestamp, target professional, your IP for abuse protection) but does not store the contents of the message. See the privacy page for full retention details.",
          },
        ]}
        footer={
          <p className="text-xs leading-relaxed text-[rgb(var(--ink-soft))]/85 [text-wrap:pretty]">
            Important: a directory is not legal, medical, or financial
            advice, and Life Decision Engine is not a regulated agency. The
            professional you choose is responsible for the advice they
            give. Always confirm credentials with the relevant licensing
            body before paying for an extended engagement.
          </p>
        }
      />
    </section>
  );
}
