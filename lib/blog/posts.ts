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
    slug: "rent-vs-buy-a-home-framework",
    title: "Rent vs buy a home: a decision framework without the hype",
    description:
      "Housing is the single biggest line item most people decide on. A sober framework across cash flow, optionality, identity, and life stage — beyond the slogans.",
    tags: ["finance", "housing", "framework"],
    readingMinutes: 7,
    publishedAt: "2026-04-06",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Finance",
      lede: "Renting is not throwing money away, and buying is not always an investment. The right answer depends on your numbers and your life stage — not on the meme of the year.",
    },
    body: [
      {
        kind: "p",
        text: "Housing is the single biggest recurring line item in most budgets and the single biggest non-retirement asset many people ever hold. Yet the question of whether to rent or buy is usually decided on vibes — family pressure, memes about wasted rent, or a hot market headline. A sober framework changes the answer for about a third of the people who apply it.",
      },
      { kind: "h2", text: "1. The cash-flow comparison — both sides, honestly" },
      {
        kind: "p",
        text: "Buying looks cheap if you only count mortgage principal and interest. It stops looking cheap when you add property tax, insurance, maintenance (plan on 1–1.5% of the home’s value per year), HOA or condo fees, and the opportunity cost of your down payment. Compare monthly all-in cost of ownership to monthly rent for a comparable place, and do it honestly — not on the fantasy version of either.",
      },
      { kind: "h2", text: "2. The optionality tax" },
      {
        kind: "ul",
        items: [
          "Renting is expensive in dollars but cheap in optionality — you can move in 60 days.",
          "Buying is cheap in dollars (sometimes) but expensive in optionality — selling typically costs 6–10% of the home value in fees, taxes, and time.",
          "If there is a 30%+ chance you will want or need to move in the next 4 years (job, relationship, city), optionality tilts toward renting.",
        ],
      },
      { kind: "h2", text: "3. The 5-year rule of thumb" },
      {
        kind: "p",
        text: "A common heuristic: buying tends to beat renting if you stay 5+ years in the same home in a stable market. Shorter than that, transaction costs often eat the equity you build. This is a rule of thumb, not a law — but it filters out a lot of bad decisions when people are staring at a hot listing and ignoring their career reality.",
      },
      { kind: "h2", text: "4. Identity and life stage" },
      {
        kind: "p",
        text: "Some reasons to buy are financial. Some are not — stability for kids, customisation, deep roots in a place. Those are legitimate, but they should be named, not smuggled in. If the financial case is close and the identity reasons are strong, buying can be right. If the financial case is weak and the identity reasons are thin, you are buying someone else’s idea of adulthood.",
      },
      { kind: "h2", text: "5. Scenarios and the worst case" },
      {
        kind: "p",
        text: "Model three paths: best (you stay 10+ years, property appreciates, you save vs renting), likely (you stay 6–8 years, modest appreciation, roughly flat vs renting), worst (you need to move in 2–3 years into a soft market and eat transaction costs). If the worst case is survivable, buying can make sense. If the worst case wipes you out, you are over-levered for your life.",
      },
      { kind: "h2", text: "Quick self-check" },
      {
        kind: "ol",
        items: [
          "Will I likely stay 5+ years? If unsure, renting wins on optionality.",
          "Can I afford the all-in monthly cost, not just the headline mortgage?",
          "Do I have an emergency fund after the down payment, or am I house-poor?",
          "Am I buying for financial reasons, identity reasons, or both — named clearly?",
          "Can I survive the worst case (soft market + forced move)?",
        ],
      },
    ],
  },
  {
    slug: "start-a-business-vs-stay-employed",
    title: "Start a business vs stay employed: a sober comparison",
    description:
      "Leaving a salary to start something is romantic until it is not. A framework across runway, risk, identity, and the overlooked cost of a great job.",
    tags: ["career", "entrepreneurship", "finance"],
    readingMinutes: 7,
    publishedAt: "2026-04-08",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Career",
      lede: "Starting a business is not a single decision. It is a long series of decisions that each compound — which is why the first one deserves a real framework.",
    },
    body: [
      {
        kind: "p",
        text: "There is a cultural narrative that says quitting your job to start something is brave by default. That is not true. Bravery without structure is usually called burnout. The real question is not whether to be an entrepreneur, it is whether, given your life stage, your finances, your ideas, and your risk tolerance, the bet makes sense in the specific way you are about to make it.",
      },
      { kind: "h2", text: "1. What problem, for whom, at what price?" },
      {
        kind: "p",
        text: "Before you model runway or ambition, answer three questions you will be asked a thousand times. What specific problem are you solving? For which specific group of people? At what price point, and why are they willing to pay it? If you cannot answer these in one plain sentence each, you are not ready to leave a salary.",
      },
      { kind: "h2", text: "2. The overlooked cost of a great job" },
      {
        kind: "p",
        text: "A good salary is not just cash flow. It is health insurance, sick leave, predictable income that lets you plan, colleagues who push you, a brand that opens doors, and the compounding of skills under the guidance of people better than you. Leaving all of that at once, for an uncertain startup, is a bigger move than the spreadsheet suggests.",
      },
      { kind: "h2", text: "3. Runway math — realistic, not optimistic" },
      {
        kind: "ul",
        items: [
          "12–18 months of personal expenses covered, minimum — 24 is better.",
          "Business capital separate from personal runway.",
          "A plan for health insurance that does not rely on being healthy.",
          "A pre-agreed milestone where, if it is not hit, you return to employment without shame.",
        ],
      },
      { kind: "h2", text: "4. Full-time vs bridge" },
      {
        kind: "p",
        text: "The cleanest mistake people make is treating the choice as binary. It is not. You can prototype nights and weekends, go part-time, take a leave, or negotiate consulting off your current employer as your first client. A bridge version reduces risk by an order of magnitude with only modest cost to speed.",
      },
      { kind: "h2", text: "5. Identity and the 5-year portrait" },
      {
        kind: "p",
        text: "Imagine yourself 5 years from now. In one version, the startup worked. In another, it closed after 18 months and you rejoined a normal role. In both, do you like who you became? If the answer is yes in both, the decision is much cleaner. If it is yes only in the win scenario, you are betting on identity as much as on the business — which is fine, but name it.",
      },
      { kind: "h2", text: "Quick self-check" },
      {
        kind: "ol",
        items: [
          "Can I state the problem, user, and price point in one sentence each?",
          "Do I have 12–24 months of personal runway separate from business capital?",
          "Have I tried the bridge version (side, part-time, consulting)?",
          "Who am I in the loss scenario — and is that person still okay?",
          "Is there a named milestone at which I will return to employment without drama?",
        ],
      },
    ],
  },
  {
    slug: "decision-paralysis-regret-psychology",
    title: "Decision paralysis and the psychology of regret",
    description:
      "Why big decisions stall, how anticipated regret quietly drives bad choices, and a short playbook for acting calmly under uncertainty.",
    tags: ["psychology", "decision-making"],
    readingMinutes: 6,
    publishedAt: "2026-04-04",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Mind",
      lede: "Most big decisions are not stuck because the facts are missing. They are stuck because the feelings are doing all the thinking.",
    },
    body: [
      {
        kind: "p",
        text: "Decision paralysis is rarely a lack of information. It is usually a lack of permission — permission to accept that any choice will close some doors, permission to be wrong, permission to disappoint someone. When you see paralysis named this way, the fix shifts from spreadsheets to something more honest.",
      },
      { kind: "h2", text: "Why good decisions feel bad" },
      {
        kind: "p",
        text: "Humans feel anticipated regret more strongly than anticipated joy. A decision that is 70% likely to go well still presents itself to the nervous system as a 30% threat, and the threat is louder. This is why people often reject objectively good options — not because they disagree with the analysis, but because the body will not sign the contract.",
      },
      { kind: "h2", text: "The two regret types" },
      {
        kind: "ul",
        items: [
          "Action regret — doing something that did not work (usually loud, short-lived).",
          "Inaction regret — not doing something you might have done (usually quiet, long-lived).",
        ],
      },
      {
        kind: "p",
        text: "Most people overestimate action regret and underestimate inaction regret. That is how careers stall, relationships linger past their sell-by date, and moves that were obvious at 30 become painful at 45.",
      },
      { kind: "h2", text: "A short playbook for unsticking" },
      {
        kind: "ol",
        items: [
          "Name the decision in one sentence, then name the feared feeling (shame, loss, guilt).",
          "Write the two regret columns. Which regret is louder in 5 years — and which is louder today?",
          "Shrink the first move. A decision is never ‘do the whole thing.’ It is ‘do the next 1–2 weeks.’",
          "Set a review date. Uncertainty tolerates better when it is bounded.",
          "Talk to one person who is calm about decisions, not a group that is emotional about you.",
        ],
      },
      { kind: "h2", text: "When paralysis is a signal, not noise" },
      {
        kind: "p",
        text: "Sometimes hesitation is right. If your gut is stuck, one honest pass through values is worth ten spreadsheets. Ask: does this option violate a line I don’t want to cross? If yes, that is not paralysis. That is wisdom. If no, then the work is to act calmly under uncertainty — which is what maturity looks like from the inside.",
      },
      {
        kind: "quote",
        text: "You cannot decide your way out of uncertainty. You can only act your way into smaller uncertainty.",
      },
    ],
  },
  {
    slug: "when-to-talk-to-a-professional",
    title: "When to talk to a therapist, lawyer, or financial advisor",
    description:
      "A structured tool helps you think. A professional helps you decide. A practical guide to when it is time, and how to walk in prepared.",
    tags: ["experts", "psychology", "finance", "legal"],
    readingMinutes: 5,
    publishedAt: "2026-04-02",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Experts",
      lede: "Frameworks help you think clearly. People with a license help you decide wisely. Knowing which is which is the skill.",
    },
    body: [
      {
        kind: "p",
        text: "A common mistake people make with decision tools — ours included — is treating them as a final answer. They are not. They are a way to arrive at a specific, well-shaped question. The value of that is enormous when you bring it into a session with a qualified professional. The 50-minute therapy hour, the 30-minute lawyer call, the 45-minute financial planner meeting — they all work better when you walk in with structure.",
      },
      { kind: "h2", text: "When to talk to a therapist" },
      {
        kind: "ul",
        items: [
          "You have been stuck in the same emotional loop for weeks and structure alone is not enough.",
          "The decision is entangled with grief, identity, or relationship dynamics.",
          "You are facing symptoms beyond ordinary stress — sleep, appetite, harmful thoughts.",
          "You need someone who is not a friend to help you hear yourself.",
        ],
      },
      { kind: "h2", text: "When to talk to a lawyer" },
      {
        kind: "ul",
        items: [
          "A contract, a separation, a visa, or property is involved — anything with a paper trail.",
          "You are about to sign something you did not draft.",
          "The cost of being wrong exceeds a few thousand dollars.",
          "Someone tells you ‘you don’t need a lawyer for this.’ You usually do.",
        ],
      },
      { kind: "h2", text: "When to talk to a financial advisor or planner" },
      {
        kind: "ul",
        items: [
          "Major cash inflow or outflow (home purchase, inheritance, equity event).",
          "Tax structure crossing borders or income categories.",
          "A decision whose financial consequences stretch 10+ years.",
          "You can clearly state what you want but not how to get there tax-efficiently.",
        ],
      },
      { kind: "h2", text: "How to walk in prepared" },
      {
        kind: "ol",
        items: [
          "One sentence describing the decision you are facing.",
          "Three scenarios you have already imagined (best/worst/likely).",
          "The single question you most want answered in this session.",
          "The constraints you will not move on (ethics, values, non-negotiables).",
          "A notebook. Take notes; you will forget 60% of the session by the next morning.",
        ],
      },
      { kind: "h2", text: "One last thing" },
      {
        kind: "p",
        text: "A framework without a human is intellectual. A human without a framework is expensive. The combination is how adults make their hardest decisions — calm, informed, and not alone.",
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
