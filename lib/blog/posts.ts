/**
 * Blog content source. Long-form, SEO-friendly articles.
 * Using plain JS/TS objects (no MDX dependency) keeps the MVP fast
 * and lets us render content as typed paragraphs/lists/headings.
 *
 * NOTE: Keep each post 600-1200 words. Cover real decision-making
 * topics so the site has authentic, indexable content for AdSense review.
 */

export type BlogBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "quote"; text: string; cite?: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  readingMinutes: number;
  publishedAt: string; // ISO date
  updatedAt?: string;
  author: string;
  hero?: {
    eyebrow: string;
    lede: string;
  };
  body: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-make-big-life-decisions",
    title: "How to make big life decisions without spiraling",
    description:
      "A practical framework for the forks that actually matter — moving, leaving a job, starting something — using scenarios, lenses, and a timeline instead of endless debate.",
    tags: ["decision-making", "psychology", "framework"],
    readingMinutes: 7,
    publishedAt: "2026-04-10",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Decision playbook",
      lede: "Big decisions feel big because they are genuinely uncertain. The fix is not more thinking — it is better structure.",
    },
    body: [
      {
        kind: "p",
        text: "Most people approach a major life decision the way they approach a minor one: they talk it over, flip back and forth, and wait for a feeling. That works for picking a restaurant. It collapses under pressure for a move, a breakup, or a career pivot, because the weight of the outcome disables the very instinct you are trying to read.",
      },
      {
        kind: "p",
        text: "The path out is not to think harder. It is to externalise the thinking so you can see it. A decision written down is a decision you can examine. A decision kept in your head is an anxiety you keep rehearsing.",
      },
      { kind: "h2", text: "Step 1 — Name the decision, not the feeling" },
      {
        kind: "p",
        text: "Start with a single sentence: “Should I do X, or continue Y, by when?” Resist the urge to pile context yet. If you cannot reduce it to that shape, you do not have a decision, you have a mood. Write one or two alternatives that are genuinely distinct — not one option and a hedged version of the same option.",
      },
      { kind: "h2", text: "Step 2 — Run three scenarios" },
      {
        kind: "p",
        text: "Forget optimism and pessimism. Model three explicit paths:",
      },
      {
        kind: "ul",
        items: [
          "Best case — what happens if this goes the way you secretly hope?",
          "Worst case — if it goes badly, how bad, and how recoverable?",
          "Likely case — what usually happens to people who take this step with your profile?",
        ],
      },
      {
        kind: "p",
        text: "The likely case is the one we all skip and it is the one that matters. It is the median outcome. Your decision is mostly a bet on that median, not on the extremes.",
      },
      { kind: "h2", text: "Step 3 — Apply four lenses" },
      {
        kind: "p",
        text: "Look at each scenario through four angles that advisors use implicitly:",
      },
      {
        kind: "ul",
        items: [
          "Finance — does this pay for itself on a realistic timeline? What is the worst-case cash risk?",
          "Psychology — is the motivation growth, escape, or fear? (Escape decisions usually under-deliver.)",
          "Risk — what is the downside if the likely case turns out closer to the worst case?",
          "Upside — if it works, what compounds over 3–5 years? This is where most of the value lives.",
        ],
      },
      { kind: "h2", text: "Step 4 — Add a timeline" },
      {
        kind: "p",
        text: "Your life will not judge this decision six weeks from now. It will judge it at 6 months, 1 year, and 5 years. Write one line per horizon for each scenario. Suddenly the “terrifying” option often looks smaller at 5 years and the “safe” option often looks smaller too — for different reasons.",
      },
      { kind: "h2", text: "Step 5 — Score, then sleep on it" },
      {
        kind: "p",
        text: "Assign a rough alignment score — how well does this choice match your values and constraints, given what you now see? A number makes the implicit explicit. Then sleep on it. If the score still looks right in the morning, you are not spiraling anymore. You are deciding.",
      },
      { kind: "h2", text: "When to bring in a human" },
      {
        kind: "p",
        text: "A structured framework helps you think clearly, but it does not replace expertise when the stakes are specialised. Legal contracts, clinical symptoms, tax structuring, couples work — these belong with professionals. The goal of a structured pre-read is not to avoid experts, but to walk into an expert session already knowing what you are asking.",
      },
      {
        kind: "quote",
        text: "A good decision is not one that looks brilliant in hindsight. It is one you made from a calm mind with the facts you could reasonably see.",
      },
    ],
  },
  {
    slug: "relocation-decision-checklist",
    title: "A relocation decision checklist for adults",
    description:
      "Should you move abroad, to a new city, or stay put? A structured checklist across finance, community, career, and reversibility.",
    tags: ["relocation", "career", "finance"],
    readingMinutes: 6,
    publishedAt: "2026-04-12",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Relocation",
      lede: "Moving is half-opportunity, half-friction. A checklist helps you see both sides before the excitement or the fear takes over.",
    },
    body: [
      {
        kind: "p",
        text: "Relocation decisions sit in a weird category: dramatic on day one, quiet on day 600. People tend to over-weight the drama (the move, the goodbye, the first week) and under-weight the quiet (rebuilding a life, the long rhythm of being new somewhere). A checklist corrects for that bias.",
      },
      { kind: "h2", text: "1. Finance — run both columns, honestly" },
      {
        kind: "ul",
        items: [
          "Gross and net income in the new location, not just the headline salary.",
          "True housing cost (rent or mortgage) plus the non-obvious costs: heating, commuting, groceries, childcare, insurance.",
          "Currency and tax exposure if crossing borders.",
          "Savings runway if income starts lower in the new place.",
        ],
      },
      { kind: "h2", text: "2. Career — is this a step, a lateral, or a restart?" },
      {
        kind: "p",
        text: "Relocation for a real career step is often worth it. Relocation that restarts your career one level below is often not — unless you have a strong non-career reason (family, climate, values). Be honest about which category you are actually in.",
      },
      { kind: "h2", text: "3. Community — who will you call on a bad Tuesday?" },
      {
        kind: "p",
        text: "New cities are lonely for longer than people admit. Map your first-year social plan: colleagues, one or two existing contacts, a hobby or sport that creates weekly repeat encounters, and a deliberate way to meet three to five new people in the first quarter.",
      },
      { kind: "h2", text: "4. Reversibility — what is the cost of going back?" },
      {
        kind: "p",
        text: "A reversible move is a low-stakes experiment. An irreversible move (selling a home, pulling kids out of school mid-year, burning a visa) is a commitment. Frame the decision at the right altitude: experiment decisions do not need a 10-year plan, commitment decisions absolutely do.",
      },
      { kind: "h2", text: "5. Values — what is the move for?" },
      {
        kind: "ul",
        items: [
          "Growth (new career, new skills, new scale of problem)",
          "Quality of life (climate, safety, care, time with family)",
          "Escape (from a bad job, bad relationship, bad period) — this one needs special attention",
        ],
      },
      {
        kind: "p",
        text: "Escape moves can work, but they work best when the escape is specific and supported. If the reason is diffuse unhappiness, geography is rarely the cure.",
      },
      { kind: "h2", text: "Quick self-check" },
      {
        kind: "ol",
        items: [
          "Can I afford the worst-case version of the first 12 months?",
          "Does this protect or upgrade my career trajectory?",
          "Do I have a realistic community plan for the first year?",
          "If it fails, what is the cost of going back?",
          "Is the underlying driver growth or escape — and is that driver healthy?",
        ],
      },
    ],
  },
  {
    slug: "career-change-without-panic",
    title: "Career change without panic: a calm method",
    description:
      "Changing jobs or fields triggers two things: excitement and fear. A calm method that filters both through values, skills, finance, and a 12-month test.",
    tags: ["career", "work", "psychology"],
    readingMinutes: 6,
    publishedAt: "2026-04-14",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Work & career",
      lede: "Career changes fail twice as often from poor framing as from poor luck. Fix the framing, and most of the fear is already gone.",
    },
    body: [
      {
        kind: "p",
        text: "Career transitions are usually framed as leaps. That framing is wrong. Good transitions look like bridges: a plank from the old role into something related-but-better, then another plank, then a new shape. Panic shows up when you try to jump instead of bridge.",
      },
      { kind: "h2", text: "Step 1 — Separate the push from the pull" },
      {
        kind: "p",
        text: "Write two lists. Push: what are you moving away from? (Specific — a manager, a stack, a commute, a culture.) Pull: what are you moving toward? (Also specific — a type of problem, a stage of company, a new skill.) If the lists are mostly push, you are not changing career, you are quitting. That is fine, but name it.",
      },
      { kind: "h2", text: "Step 2 — Audit your skills honestly" },
      {
        kind: "ul",
        items: [
          "Hard skills that transfer to 3-5 adjacent roles",
          "Soft skills you are underpaid for in your current industry",
          "Gaps you would need to close in 6–12 months to be employable in the new direction",
        ],
      },
      { kind: "h2", text: "Step 3 — Build a 12-month financial runway" },
      {
        kind: "p",
        text: "Most transitions involve a pay dip, training, or a founder-like period without salary. A realistic runway buys calm. Calm buys good decisions. The math is not glamorous but it is the difference between a successful pivot and a hurried one.",
      },
      { kind: "h2", text: "Step 4 — Test before you commit" },
      {
        kind: "p",
        text: "Before resigning, do 2-3 small experiments: a freelance project, a side build, a deep conversation with three people already in the target role. Cheap tests beat expensive assumptions.",
      },
      { kind: "h2", text: "Step 5 — Choose a version you can live with" },
      {
        kind: "p",
        text: "There is rarely a single best version of a career change. There is usually a safer one and a bolder one. Pick the version you can still feel good about if the likely case — not the best case — unfolds. That is the version you will actually finish.",
      },
    ],
  },
  {
    slug: "should-you-stay-or-go-relationship-framework",
    title: "Should you stay or go? A calmer relationship framework",
    description:
      "A non-therapy framework to think about serious relationships: what is fixable, what is not, and how to tell the difference before you decide.",
    tags: ["relationships", "psychology"],
    readingMinutes: 7,
    publishedAt: "2026-04-16",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Relationships",
      lede: "Relationship decisions are not algorithmic. But structure helps — and so does knowing what a framework can’t do.",
    },
    body: [
      {
        kind: "p",
        text: "A tool cannot decide for you whether to stay or go. But a tool can help you stop running the same loop every Sunday night. The point of a relationship framework is not to produce a verdict. It is to isolate what you actually know from what you are afraid of.",
      },
      { kind: "p", text: "Important: if there is abuse, coercion, or safety risk, this is not a structured-decision topic. Reach out to a professional or emergency service." },
      { kind: "h2", text: "1. What is fixable vs. what is not" },
      {
        kind: "p",
        text: "Fixable usually includes skills (communication, conflict, sex, household), timing (one partner in a hard career phase), and capacity (therapy, medication, rest). Not usually fixable without huge cost: fundamentally different values about children, location, monogamy, religion, or ambition.",
      },
      { kind: "h2", text: "2. What have you actually tried?" },
      {
        kind: "ul",
        items: [
          "Individual therapy for each person, not just couples therapy",
          "A structured, time-bound change plan (90 days, clear goals)",
          "A calm conversation with a couples therapist present",
          "A sober look at finance, work stress, and sleep before blaming the relationship",
        ],
      },
      { kind: "h2", text: "3. The 5-year question" },
      {
        kind: "p",
        text: "Imagine honestly: five years from now, with this relationship unchanged, who have you become? If the answer is “a calmer, better version of me,” that is signal. If it is “a quieter, smaller version of me,” that is a different signal.",
      },
      { kind: "h2", text: "4. Reversibility" },
      {
        kind: "p",
        text: "Some exits are genuinely reversible (separation, pause). Some are not (sharing children, marriage in certain jurisdictions, intertwined finances). Frame the decision at the right altitude — and, for the irreversible versions, involve legal and financial experts, not just emotional ones.",
      },
      { kind: "h2", text: "5. One sentence to carry into a professional session" },
      {
        kind: "p",
        text: "If you are going to see a therapist, lawyer, or financial planner next, write the single sentence you most want help with. That sentence, not the hour, is where the value will come from.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
