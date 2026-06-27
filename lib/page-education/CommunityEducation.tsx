import Link from "next/link";
import ToolPageEducation from "@/components/trust/ToolPageEducation";

export default function CommunityEducation() {
  return (
    <ToolPageEducation
      intro={
        <>
          <p>
            Community Q&amp;A is the public, plain-text part of Life
            Decision Engine: short anonymous questions about life
            decisions, and short answers from other readers who have been
            through something similar. It is not a place for medical,
            legal, or financial diagnosis — those belong in the{" "}
            <Link
              href="/experts"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              experts directory
            </Link>{" "}
            — but it is the right place for the questions that mostly need
            perspective: &ldquo;has anyone moved with school-age kids?&rdquo;,
            &ldquo;is the loneliness during a remote-job switch normal?&rdquo;,
            &ldquo;how did you tell a parent about a relocation?&rdquo;
          </p>
          <p>
            Posts are stored on our server (so the board is the same for
            everyone), but no account is required. Each post and answer is
            rate-limited per browser; spam, ads, and abusive content are
            removed by editors within 24 hours on weekdays.
          </p>
        </>
      }
      sections={[
        {
          heading: "How to ask a strong question",
          body: (
            <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
              <li>
                <strong className="text-[rgb(var(--ink))]">
                  Lead with the decision, not the feelings.
                </strong>{" "}
                &ldquo;I&apos;m considering leaving a stable engineering
                job in Yerevan for a six-month contract in Berlin&rdquo; is
                far more answerable than &ldquo;I feel stuck.&rdquo;
              </li>
              <li>
                <strong className="text-[rgb(var(--ink))]">
                  Add the constraints.
                </strong>{" "}
                Time pressure, money, family obligations, language
                ability, visa status — anything that changes which
                scenarios are even possible.
              </li>
              <li>
                <strong className="text-[rgb(var(--ink))]">
                  Say what you have already tried or considered.
                </strong>{" "}
                &ldquo;I already ran it through the analyzer and the
                report leaned 60/40 in favor of moving&rdquo; gives
                responders a starting point.
              </li>
              <li>
                <strong className="text-[rgb(var(--ink))]">
                  Ask a specific question.
                </strong>{" "}
                &ldquo;What do I need to know about Berlin schools for an
                eight-year-old?&rdquo; is more useful than &ldquo;what do
                you think?&rdquo;
              </li>
            </ul>
          ),
        },
        {
          heading: "How answers and reactions work",
          body: (
            <p>
              Anyone can answer. Each answer has a small &ldquo;Helpful&rdquo;
              button — that is the only signal we keep on quality, and we
              use it to surface the most useful answer to the top of long
              threads. We do not show karma scores, post counts, or
              badges. The intent is to keep the board feeling like a calm
              support group, not a leaderboard.
            </p>
          ),
        },
        {
          heading: "Languages",
          body: (
            <p>
              You can post in any of the site&apos;s supported languages
              (English, Armenian, Russian, German, French, Spanish,
              Italian, Arabic). The language filter at the top lets you
              focus on threads in the language you can best help with.
              Cross-language replies are welcome — most readers translate
              with a browser button anyway.
            </p>
          ),
        },
      ]}
      faq={[
        {
          q: "Is this anonymous?",
          a: "Posting does not require an account. We store your IP and a per-browser identifier strictly for rate-limiting and abuse defence — never published. Names attached to posts are whatever you type into the form. Do not include your home address, phone number, or document IDs.",
        },
        {
          q: "Will my post be edited?",
          a: "Editors may correct obvious typos, format paragraph breaks, or remove personal contact details. Substantive edits are not made. If a post is removed entirely, it is for a clear policy reason — see the community guidelines.",
        },
        {
          q: "What if I get a reply that worries me?",
          a: (
            <>
              Use the report button on the answer. For broader patterns —
              disinformation, harassment, brigading — write to the team
              via{" "}
              <Link
                href="/contact"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                /contact
              </Link>
              . If a reply suggests medical, legal, or financial decisions,
              always confirm with a licensed professional before acting on
              it.
            </>
          ),
        },
      ]}
      footer={
        <p className="text-xs leading-relaxed text-[rgb(var(--ink-soft))]/85">
          See the full{" "}
          <Link
            href="/community/guidelines"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            community guidelines
          </Link>
          {" "}for what is and isn&apos;t allowed, and the{" "}
          <Link
            href="/disclaimer"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            site disclaimer
          </Link>
          {" "}for how community advice fits next to the analyzer and the
          experts directory.
        </p>
      }
      lastReviewed="May 5, 2026"
      lastReviewedISO="2026-05-05"
    />
  );
}
