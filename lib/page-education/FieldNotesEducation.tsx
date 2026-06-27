import ToolPageEducation from "@/components/trust/ToolPageEducation";

export default function FieldNotesEducation() {
  return (
    <ToolPageEducation
      intro={
        <>
          <p>
            Field notes is a small browser-only writing lab. Paste a draft,
            a journal entry, the email you are about to send, the
            one-pager you are preparing for a hard conversation — anything
            you want to size up before it leaves your head — and the page
            gives you a calm read-out: how long it would take to read,
            how many distinct words you used, the eight or nine words that
            dominate the piece, and the tokens that are likely to drive
            the rest of the meaning.
          </p>
          <p>
            Nothing leaves your browser. The text you paste is analyzed
            client-side using a small statistics module bundled into the
            page; there is no upload, no API call, no logging. You can
            confirm it by opening the network tab in your browser dev
            tools and watching the request list while you type.
          </p>
        </>
      }
      sections={[
        {
          heading: "What the metrics mean",
          body: (
            <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
              <li>
                <strong className="text-[rgb(var(--ink))]">
                  Reading time
                </strong>{" "}
                is computed at roughly 220 words per minute, the average
                pace for adult silent reading. If your reader is a busy
                manager, halve it; if it is your grandmother, double it.
              </li>
              <li>
                <strong className="text-[rgb(var(--ink))]">
                  Words and unique tokens
                </strong>{" "}
                together hint at vocabulary diversity. A 600-word draft
                with 80 unique tokens is likely repetitive; the same
                length with 280 unique tokens probably reads tighter.
              </li>
              <li>
                <strong className="text-[rgb(var(--ink))]">
                  Top words
                </strong>{" "}
                is the strongest signal of what the text is actually
                about. If &ldquo;feel&rdquo;, &ldquo;maybe&rdquo;, and
                &ldquo;sorry&rdquo; are in your top eight, the reader
                will hear hesitation more than content. If
                &ldquo;deadline&rdquo;, &ldquo;number&rdquo;, and
                &ldquo;decision&rdquo; are there, you have a signal you
                can build on.
              </li>
            </ul>
          ),
        },
        {
          heading: "Useful workflows",
          body: (
            <ol className="list-decimal space-y-2 ps-5 marker:font-semibold marker:text-[rgb(var(--accent-2))]">
              <li>
                Before sending a difficult email or message, paste the
                draft and check whether your top words match what you
                actually want to say.
              </li>
              <li>
                When preparing a brief for the analyzer on the homepage,
                use field notes to make sure your one-paragraph context
                has enough specificity — fewer than 20 unique tokens
                usually means the report will be vague too.
              </li>
              <li>
                For a long journal entry, scan the top words after a few
                weeks. If the same emotional vocabulary keeps repeating
                across entries, that is a signal worth bringing to a
                therapist or coach.
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: "Does my text leave the browser?",
          a: "No. The text you paste is analyzed entirely client-side using a small statistics module bundled into the page. There is no upload, no server call, and no logging — you can confirm it by opening your browser's network tab while typing.",
        },
        {
          q: "What language does the analyzer support?",
          a: "The tokenizer treats Latin and Armenian alphabets natively and works for most European languages out of the box. For non-Latin scripts that aren't Armenian, raw word counts still work, but the top-word ranking may include common stop-words because the per-language stop-list isn't loaded.",
        },
        {
          q: "How accurate is the reading-time estimate?",
          a: "It assumes 220 words per minute, which is the median for adult silent reading on a screen. Treat it as a rough planning number rather than a precise stopwatch — managers reading on a phone are faster, students reading dense material are slower.",
        },
        {
          q: "Can I use this output in a public document?",
          a: "Yes — the metrics on the right panel are derived from your text and are yours to keep, copy, or share. There is no proprietary scoring layered on top.",
        },
      ]}
      lastReviewed="May 5, 2026"
      lastReviewedISO="2026-05-05"
    />
  );
}
