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
  {
    slug: "how-to-evaluate-a-job-offer",
    title: "How to evaluate a job offer (without getting hypnotised by the salary)",
    description:
      "A structured way to read an offer — cash, equity, leverage, ceiling, and culture — so you choose the job that is actually better, not just the one that feels bigger.",
    tags: ["career", "finance", "decision-making"],
    readingMinutes: 7,
    publishedAt: "2026-04-17",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Career",
      lede: "An offer letter is a marketing document. Your job is to read it like an analyst — calmly, line by line.",
    },
    body: [
      {
        kind: "p",
        text: "Most people decide on a job offer the same way they decide what to order at a restaurant — emotionally, in under a minute, under social pressure. Then they spend the next two years living with that decision. It deserves more than that. A good evaluation has five parts: total comp, leverage, ceiling, culture, and exit optionality. Walk every offer through those five, and the winner usually stops being whichever one felt loudest.",
      },
      { kind: "h2", text: "1. Total comp — not just salary" },
      {
        kind: "p",
        text: "Base salary is the loudest number. It is also often the least important. Add the signing bonus (annualised over the time you actually plan to stay), target bonus at realistic hit rates, equity (in reasonable expected-value terms, not a dream scenario), benefits (health, 401k match, PTO), and any obvious cost differences (commute, relocation, taxes). The number you get here is the real offer. Compare that, not the base.",
      },
      { kind: "h2", text: "2. Leverage — how rare is this role?" },
      {
        kind: "p",
        text: "A role is leveraged when the company needs you more than you need it. Three signals: the role is new and strategic, there are few internal candidates, and there is a visible business problem that will get worse without someone doing the job. Leveraged roles grow people fast. Easy-to-fill roles, even highly paid ones, often stall careers because you are one of many.",
      },
      { kind: "h2", text: "3. Ceiling — who sits 2 levels above you?" },
      {
        kind: "p",
        text: "Look at the two people one and two levels above you. Do they impress you? Would you trade calendars with them in 5 years? If yes, the ceiling is worth climbing. If not, the job may be a local maximum — comfortable, well-paid, and a career dead end. Ceiling is the most under-analysed variable in job offers.",
      },
      { kind: "h2", text: "4. Culture — evidence, not vibes" },
      {
        kind: "ul",
        items: [
          "How long has the last person in this role stayed? Why did they leave?",
          "Who would be your manager — and what do people who report to them say?",
          "Is there a visible rhythm (1:1s, reviews, written goals), or is it all vibes and Slack?",
          "What happens when the company misses a quarter — do people get honest, or does it get political?",
        ],
      },
      { kind: "h2", text: "5. Exit optionality" },
      {
        kind: "p",
        text: "A good job should make you more employable elsewhere, not less. Ask: in 2 years, does this role open doors at companies you respect, or is it a niche that only matters internally? Roles with real exit optionality can pay less today and win anyway over a decade.",
      },
      { kind: "h2", text: "A five-question scorecard" },
      {
        kind: "ol",
        items: [
          "What is the honest total comp, not the advertised base?",
          "Do I have leverage, or am I replaceable?",
          "Do the people 2 levels above me look like a future I want?",
          "Does the culture have evidence, not just words?",
          "Will this role make me more or less hireable in 2 years?",
        ],
      },
      {
        kind: "quote",
        text: "The best career moves rarely feel obvious at the time. They feel calm.",
      },
    ],
  },
  {
    slug: "parenting-decision-framework",
    title: "Decision-making for parents: how to choose without outsourcing your judgement",
    description:
      "A calm framework for parenting decisions — school, screens, moves, discipline — based on values, reversibility, and what the child will remember.",
    tags: ["parenting", "decision-making", "values"],
    readingMinutes: 7,
    publishedAt: "2026-04-17",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Family",
      lede: "Parenting is not a product you can A/B test. It is a long series of small decisions, made tired, that add up to a person.",
    },
    body: [
      {
        kind: "p",
        text: "Parents face more micro-decisions per day than most CEOs. School choice, screen time, discipline style, whether to move cities for a better district, whether your child needs help or just time. The internet will happily supply ten thousand opinions on each. The risk is not ignorance — it is outsourcing your judgement to whichever voice is loudest.",
      },
      { kind: "h2", text: "1. Start with values, not tactics" },
      {
        kind: "p",
        text: "Before you debate tactics (phone age, sleep training, tutoring), write down your top three values as a family. Curiosity? Honesty? Resilience? Warmth? Tactics should serve values. When a parenting question feels hard, it is usually because a tactic is colliding with a value you did not name out loud.",
      },
      { kind: "h2", text: "2. Reversibility is your best friend" },
      {
        kind: "p",
        text: "Most parenting decisions are reversible within weeks. You can change a nap schedule, a school activity, or a phone rule, and almost nothing is damaged. A few decisions are not reversible on that scale: relocation, school transfer mid-year, legal decisions about custody. For reversible decisions, act and observe. For irreversible ones, slow down and get a second human.",
      },
      { kind: "h2", text: "3. The ‘what will they remember?’ lens" },
      {
        kind: "p",
        text: "A useful lens for parenting decisions is to ask: in 20 years, which version of me will my child remember doing this? Not the objectively correct version — the one they will carry. Sometimes the right call is the calmer one, not the more optimal one, because the emotional residue outlives the decision.",
      },
      { kind: "h2", text: "4. Distinguish signal from peer pressure" },
      {
        kind: "ul",
        items: [
          "Other parents are not a random sample — they are a self-selected peer group, often more anxious than average.",
          "Advice from grandparents is a data point, not a verdict — parenting science has changed.",
          "Online forums optimise for engagement, which means they amplify extremes.",
          "Trust quiet professionals (pediatricians, school counsellors) over loud influencers.",
        ],
      },
      { kind: "h2", text: "5. A short parental decision script" },
      {
        kind: "ol",
        items: [
          "Is this reversible, or is it long-horizon?",
          "Which of our family values does it serve — or violate?",
          "Am I reacting to my child, to my anxiety, or to peer comparison?",
          "Who is the one quiet expert I should call before the noisy group?",
          "What is the smallest version of the change I can try for two weeks?",
        ],
      },
      { kind: "h2", text: "When to bring in a professional" },
      {
        kind: "p",
        text: "If a decision involves sustained behavioural change, school performance that is slipping, signs of depression or anxiety, or family conflict that is not improving, a pediatrician, psychologist, or family therapist is the right next step. A tool like this engine can organise your thinking. A trained human actually helps the child.",
      },
    ],
  },
  {
    slug: "values-vs-money-tradeoff",
    title: "Values vs. money: how to decide when the two pull in opposite directions",
    description:
      "A framework for the honest trade-off between money and meaning — how much is enough, which values are real, and when to pick which.",
    tags: ["values", "career", "finance", "psychology"],
    readingMinutes: 6,
    publishedAt: "2026-04-17",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Values",
      lede: "Pretending money doesn’t matter is naive. Pretending it is the only thing that matters is exhausting. The honest work is in the trade-off.",
    },
    body: [
      {
        kind: "p",
        text: "Most adults, at some point, face a decision where the better-paying option is not the more meaningful one. Leaving a high-paying job for something smaller. Choosing a less prestigious school because it is closer to family. Turning down a promotion that would double your income but cost your evenings. This is not a rare crisis. It is the quiet background of adulthood.",
      },
      { kind: "h2", text: "1. Name the number that is actually enough" },
      {
        kind: "p",
        text: "Most money-vs-meaning debates are contaminated by a lack of clarity about what ‘enough’ means. Enough to cover fixed costs? Enough to save at a specific rate? Enough to stop being afraid? Without a number, every offer looks both attractive and insufficient, and the debate never ends. Write down your honest ‘enough’ line — then you can tell the difference between a raise and a rescue.",
      },
      { kind: "h2", text: "2. Separate status from meaning" },
      {
        kind: "p",
        text: "Status and meaning often dress the same. A loud, well-compensated role feels like meaning, until you try to articulate what it is for. Meaning is durable — it holds up at 6am, alone, with no audience. Status collapses the moment the room changes. When you catch yourself defending a decision, ask: would I still feel this way if nobody knew about it?",
      },
      { kind: "h2", text: "3. The ‘5 years, two directions’ exercise" },
      {
        kind: "p",
        text: "Imagine yourself 5 years forward. In one version, you took the meaning path and money is tighter than you would like. In the other, you took the money path and your days feel hollow but your finances are calm. Which future version of you is more honest, more interesting, more someone you respect? That does not tell you the answer. But it usually tells you which regret you can actually live with.",
      },
      { kind: "h2", text: "4. Trade-offs that are real vs. trade-offs that are lazy" },
      {
        kind: "ul",
        items: [
          "Real: the highest-meaning option pays 30% less, and that will tighten your life visibly.",
          "Lazy: assuming every well-paid role is soulless and every underpaid role is meaningful.",
          "Real: your current job drains energy so much that your values are dormant.",
          "Lazy: using ‘values’ as cover for avoiding difficult work you could grow into.",
        ],
      },
      { kind: "h2", text: "5. Honest questions that cut through" },
      {
        kind: "ol",
        items: [
          "What is the ‘enough’ number — written, not felt?",
          "Which of these options would I still pick if nobody I knew could see it?",
          "Which regret is louder in 5 years: the money I didn’t make, or the years I didn’t spend right?",
          "Have I consulted anyone whose life I actually respect — not just peers in my bubble?",
          "Am I confusing status with meaning, or meaning with avoidance?",
        ],
      },
      {
        kind: "quote",
        text: "You do not have to choose between money and meaning. You have to choose a version of each you can defend at 60.",
      },
    ],
  },
  {
    slug: "remote-vs-in-person-job",
    title: "Remote vs. in-person jobs: a structured way to choose, not a culture war",
    description:
      "Beyond the Twitter discourse: a practical framework for choosing between remote, hybrid, and in-person roles based on life stage, career stage, and personality.",
    tags: ["career", "remote-work", "decision-making"],
    readingMinutes: 6,
    publishedAt: "2026-04-17",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Work",
      lede: "The right format is not the one that wins online. It is the one that matches your specific life, career stage, and temperament.",
    },
    body: [
      {
        kind: "p",
        text: "The remote-vs-office question is treated like an ideological battle. In practice, it is almost always a personal trade-off — different for a 24-year-old first-job professional than for a 40-year-old parent in a senior role. The honest answer is: it depends, but on a small number of specific variables, which most people never actually list.",
      },
      { kind: "h2", text: "1. Career stage matters most" },
      {
        kind: "p",
        text: "Early in a career — your first 3–5 years — proximity to smarter people usually pays. You learn how decisions get made, how meetings work, who is political, who is serious. Remote work can flatten that learning curve. Mid and late career, when you already know the language, remote work often accelerates output and quality of life.",
      },
      { kind: "h2", text: "2. Life stage matters second" },
      {
        kind: "p",
        text: "Single, newly relocated, or new to a city? An office gives you humans. Parents of young children? Remote buys back the single scarcest resource in your life, which is minutes. Care-giving for a parent? Remote is not a luxury, it is the difference between sustainable work and quiet burnout.",
      },
      { kind: "h2", text: "3. Temperament is not optional" },
      {
        kind: "ul",
        items: [
          "Do you think better alone or in reaction to others?",
          "Do you self-regulate easily, or do you need the scaffolding of a room?",
          "Does social friction energise you, or does it cost you your weekend?",
          "How quickly do you feel lonely without deliberate effort?",
        ],
      },
      { kind: "h2", text: "4. Role type — some jobs punish remote" },
      {
        kind: "p",
        text: "Certain roles — creative leadership, new-team formation, client-facing sales, apprentice-heavy work — lose something real when fully remote. Other roles — deep focus work, senior individual contributors, writing, engineering — often lose something when they are fully in-office. Be honest about which one yours is, independent of what your employer prefers.",
      },
      { kind: "h2", text: "5. Hybrid — the honest version" },
      {
        kind: "p",
        text: "Hybrid often fails because it is accidental, not designed. The version that works is: a fixed number of days, a clear reason each day is in-office (meetings, reviews, social anchor), and the rest protected for deep work. Hybrid as ‘come in whenever’ tends to produce empty offices and resentful Tuesdays.",
      },
      { kind: "h2", text: "A short decision script" },
      {
        kind: "ol",
        items: [
          "Where am I in my career — apprentice, craftsman, or master?",
          "What does my life stage need more of: proximity or time?",
          "Am I the kind of person who compounds in a room or in silence?",
          "Is my role the kind that loses something real without a room?",
          "If my employer is flexible, what designed hybrid would actually work for me?",
        ],
      },
      {
        kind: "quote",
        text: "Work format is a personal infrastructure choice. Pick it like furniture, not like a flag.",
      },
    ],
  },
  {
    slug: "how-to-choose-a-university",
    title: "How to choose a university (without letting rankings do your thinking)",
    description:
      "A practical framework for choosing the right university — career fit, cost, cohort, city, and what the brand actually buys you.",
    tags: ["education", "career", "decision-making"],
    readingMinutes: 7,
    publishedAt: "2026-04-17",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Education",
      lede: "University choice is one of the most over-ranked, under-analysed decisions in modern life. Structure it like an investment, not a trophy.",
    },
    body: [
      {
        kind: "p",
        text: "At 17 or 18, most people decide on a university in a narrow window, with loud parental voices, peer pressure, and an industry of ranking lists all competing for attention. The result is often a decision that looks correct on paper and feels wrong on day one. The fix is not to ignore rankings — it is to put them in their proper place, behind four more important variables.",
      },
      { kind: "h2", text: "1. Career fit — what does this specific degree unlock?" },
      {
        kind: "p",
        text: "Ask, for the exact program you are considering: which careers does it open, and which does it close? A strong engineering school opens tech hiring pipelines even when the brand is mid-tier. A generic humanities degree at a famous brand is often less career-functional than a practical degree at a smaller school. The question is not ‘is this a good university?’ but ‘is this a good pipeline to the life I can currently imagine?’",
      },
      { kind: "h2", text: "2. Cost — total, not sticker" },
      {
        kind: "p",
        text: "Sticker price is marketing. What matters is net cost after scholarships, cost of living for the city, opportunity cost of 4 years, and loan interest over 15–25 years. A ‘cheaper’ school that puts you in debt at 8% compounded is not cheap. A ‘more expensive’ school that covers 80% of tuition may be the most affordable option. Run the real math, not the admissions math.",
      },
      { kind: "h2", text: "3. Cohort — who will you be sitting next to for four years?" },
      {
        kind: "p",
        text: "Universities shape people less through professors than through peers. The ambition, curiosity, and work ethic of your cohort will become your default. Visit, sit in a class if possible, walk the library on a Tuesday night. Do you want to become the median of the room you are walking through? If yes, that is a better signal than any ranking.",
      },
      { kind: "h2", text: "4. City — where will you actually live?" },
      {
        kind: "ul",
        items: [
          "Proximity to industry you might intern in or join after.",
          "Weather, transit, safety — lived daily for four years.",
          "Distance from family: how often will you actually go home?",
          "International mobility: does graduating in this city open or close doors in the country you might move to?",
        ],
      },
      { kind: "h2", text: "5. Brand — what does it actually buy you?" },
      {
        kind: "p",
        text: "A strong brand mainly buys you three things: a slightly higher first-job ceiling, a more trusted alumni network, and a quicker interview response for 2–3 years after graduation. It does not buy curiosity, skills, or a happy life. Weight it accordingly.",
      },
      { kind: "h2", text: "A short decision script" },
      {
        kind: "ol",
        items: [
          "Which careers does this specific program realistically open in 4 years?",
          "What is the 10-year total cost of this school vs. my best alternative?",
          "Would I be happy to become the median student in this program?",
          "Is this city a place I can live, commute, and grow in for 4 years?",
          "Is the brand buying me the first job — or just the Instagram?",
        ],
      },
      {
        kind: "quote",
        text: "The best university for you is the one where you would still work hard if nobody was impressed by the name.",
      },
    ],
  },
  {
    slug: "how-to-decide-to-have-children",
    title: "How to decide whether to have children",
    description:
      "A calm framework for one of the most asymmetric decisions in life — what it actually changes, which regrets are real, and when a professional conversation is the right next step.",
    tags: ["family", "values", "psychology", "life-stage"],
    readingMinutes: 8,
    publishedAt: "2026-04-17",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Life stage",
      lede: "Very few decisions are as asymmetric as this one. Which is exactly why it deserves a calm process, not a loud one.",
    },
    body: [
      {
        kind: "p",
        text: "The decision to have children, or not to, is often treated as a matter of feeling: either you want them or you don’t. In practice, the feeling is unstable — it moves with age, partner, financial situation, and the people around you. A slightly more structured approach does not make the decision unromantic. It makes it survivable.",
      },
      { kind: "p", text: "This essay is explicitly not advocacy. It is a framework for thinking, intended to help people make a calm, conscious choice in either direction. If you are in a fertility-sensitive window, a partnership conflict, or a mental-health strain, please pair this with a qualified professional." },
      { kind: "h2", text: "1. Asymmetry is the core property" },
      {
        kind: "p",
        text: "Most decisions are reversible on a reasonable timeline. This one is not. Choosing to have children is a 20-year commitment to another human being; choosing not to has its own asymmetry, felt most strongly in your 40s and later. Frame the decision as permanent in both directions, and then ask which permanence you can live with.",
      },
      { kind: "h2", text: "2. What genuinely changes (not the Instagram version)" },
      {
        kind: "ul",
        items: [
          "Sleep, routine, and calendar — permanently reshaped for 4–6 years at minimum.",
          "Money — honest cost is higher than most budgets admit.",
          "Career — varies by gender, by country, by role; rarely zero.",
          "Relationship — intensifies strengths and weaknesses; it does not ‘fix’ anything.",
          "Identity — you become one version of yourself more strongly, and lose access to another.",
        ],
      },
      { kind: "h2", text: "3. Regret, in two directions" },
      {
        kind: "p",
        text: "Research on regret suggests inaction regret (‘I didn’t do it’) is usually louder over a lifetime than action regret (‘I did it, it was hard’). But this is a population-level finding, not a personal one. Your own regret geometry depends on your values, your partner, and what else you would have done with the years. Imagine, honestly, being 65 in both versions. Which elder version is more recognisable to you?",
      },
      { kind: "h2", text: "4. Partnership as prerequisite" },
      {
        kind: "p",
        text: "For those deciding inside a relationship: the single strongest predictor of whether children feel like a gift or a crisis is the quality of the partnership beforehand. A fragile partnership rarely improves by adding a baby. A strong one usually survives, reshaped. Be honest about which you have.",
      },
      { kind: "h2", text: "5. When the calendar has a voice" },
      {
        kind: "p",
        text: "Biology does not care about your ambivalence. If there is a fertility window, that is a real variable, and ignoring it is itself a decision. For some people, this accelerates the process; for others, it prompts exploring egg/embryo freezing or adoption, each of which is its own decision to study.",
      },
      { kind: "h2", text: "6. When professionals belong in the conversation" },
      {
        kind: "ul",
        items: [
          "A therapist — to separate what is yours from what is inherited from your family of origin.",
          "A reproductive specialist — if age, medical history, or partner factors are relevant.",
          "A financial planner — to model multi-decade cost honestly.",
          "A couples therapist — if this decision has surfaced a partnership conflict.",
        ],
      },
      { kind: "h2", text: "A short decision script" },
      {
        kind: "ol",
        items: [
          "Can I honestly picture both 65-year-old versions of myself? Which one do I recognise?",
          "Is my decision being pushed by my values, or by the room I happen to be in?",
          "What does my partner actually believe, when the performance stops?",
          "Is the calendar a hard variable for me — and if so, in which direction?",
          "Am I using ‘not ready’ to avoid a conversation I will one day wish I had sooner?",
        ],
      },
      {
        kind: "quote",
        text: "This is not a decision you make once. It is a decision you learn to carry — in either direction.",
      },
    ],
  },
  {
    slug: "financial-independence-decision",
    title: "The financial independence decision: when enough is actually enough",
    description:
      "How to decide when to stop chasing the next level of income, how to define your ‘enough’ number, and why financial independence is more psychological than mathematical.",
    tags: ["finance", "values", "career"],
    readingMinutes: 7,
    publishedAt: "2026-04-17",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Finance",
      lede: "Financial independence is not a number. It is a relationship between three numbers, and a decision about what the extra years of work are actually buying you.",
    },
    body: [
      {
        kind: "p",
        text: "Financial independence is usually discussed as a spreadsheet problem: hit a number, live off the yield, retire. That framing misses the interesting part. The hard work is not arriving at the number; it is knowing which number, deciding how many extra years of work are worth it, and resisting the lifestyle inflation that quietly moves the goalposts.",
      },
      { kind: "h2", text: "1. The three numbers" },
      {
        kind: "ul",
        items: [
          "Survival number — the amount you need to meet fixed obligations plus modest food, housing, healthcare. Lower than most imagine.",
          "Comfort number — survival plus the non-luxuries that make your life feel dignified (a good coffee shop, a trip a year, a few hobbies).",
          "Status number — comfort plus optional luxuries (a bigger place, a newer car, global travel). Highly variable and very personal.",
        ],
      },
      {
        kind: "p",
        text: "Write down your honest three numbers. Most people stop when they hit their status number and assume it is their comfort number. That is a 10-year mistake.",
      },
      { kind: "h2", text: "2. The 4%-ish rule — and its honest caveats" },
      {
        kind: "p",
        text: "A common shorthand is that a portfolio can sustainably support annual withdrawals of roughly 3.5–4% of its starting value, inflation-adjusted, for 30+ years. It is a reasonable planning baseline, not a guarantee. Real life brings sequence-of-returns risk, healthcare shocks, taxes, and behavioural lapses during drawdowns. Treat 4% as ‘probably fine,’ not ‘guaranteed forever.’",
      },
      { kind: "h2", text: "3. The ‘one more year’ trap" },
      {
        kind: "p",
        text: "Once you are close to enough, it becomes easy to keep working ‘just one more year’ for margin. Sometimes that margin matters. Often it is anxiety wearing a spreadsheet. Before the fifth ‘one more year,’ ask a harder question: what specifically am I afraid of, and what would actually settle that fear?",
      },
      { kind: "h2", text: "4. The identity problem" },
      {
        kind: "p",
        text: "For many high-earners, the job is not just cash flow — it is identity, status, and structure. Financial independence looks thrilling until the Tuesday morning after you walk out. Design the life first, then fund it. A hobby, a part-time teaching role, or a nonprofit board often matters more to the next 30 years than the last $200k on the number.",
      },
      { kind: "h2", text: "5. ‘Coast FI’ and ‘Barista FI’ — softer versions" },
      {
        kind: "p",
        text: "Two softer versions are worth naming. Coast FI: you have saved enough that ordinary growth gets you to the full number by retirement age, so you can lower your savings rate and work lighter jobs. Barista FI: you cover recurring costs from a smaller portfolio plus a modest part-time income, often chosen for healthcare, structure, or human contact. These are often better fits than full early retirement.",
      },
      { kind: "h2", text: "6. The decision, honestly" },
      {
        kind: "ol",
        items: [
          "Which of my three numbers have I actually calculated — not felt?",
          "What ‘one more year’ is really buying me: margin, or anxiety?",
          "Who would I be on the Tuesday after I walked out?",
          "Am I chasing my number, or chasing a comparison?",
          "Would Coast or Barista FI give me 80% of the freedom for 40% of the grind?",
        ],
      },
      {
        kind: "quote",
        text: "Money is a tool for buying back your time. If it is buying you more work, it is doing its job wrong.",
      },
    ],
  },
  {
    slug: "how-to-end-a-friendship",
    title: "How to end a friendship — or decide not to",
    description:
      "Most friendship guides tell you how to make friends. Fewer talk about the harder question: when, and how, to let one go — and when to invest instead.",
    tags: ["relationships", "psychology", "decision-making"],
    readingMinutes: 6,
    publishedAt: "2026-04-17",
    author: "Life Decision Engine",
    hero: {
      eyebrow: "Relationships",
      lede: "Friendships age like milk, not wine — unless you decide, consciously, to keep refrigerating them. That decision deserves more honesty than it usually gets.",
    },
    body: [
      {
        kind: "p",
        text: "Adult friendships quietly become one of the strongest predictors of long-term wellbeing. But adults also accumulate friendships the way closets accumulate coats — most are seasonal, a few are lifetime, and a surprising number are just hanging there because nobody opened the door in ten years. Deciding which is which is real work, and most people never do it out loud.",
      },
      { kind: "h2", text: "1. Three categories of friendship" },
      {
        kind: "ul",
        items: [
          "Lifetime — people who would be at your hospital bed and whose presence you would want there.",
          "Chapter — people tied to a specific phase (school, a city, a job) who were genuinely important, and for whom drifting is not betrayal.",
          "Convenient — people you see because of circumstance (a group chat, a weekly drink) but who would not reach out if circumstance disappeared.",
        ],
      },
      { kind: "h2", text: "2. The energy audit" },
      {
        kind: "p",
        text: "For any friendship you are unsure about, ask: how do I feel in the hour before seeing them, and in the hour after? A friendship that drains you before and leaves you lighter after is often still worth it. A friendship that drains you both before and after is costing you something. Track that for a few weeks before deciding.",
      },
      { kind: "h2", text: "3. When to invest, not exit" },
      {
        kind: "p",
        text: "Some friendships are not ending; they are starving. They need a call that is not about logistics, a memory that is not a meme, a weekend that is not a wedding. Before you quietly let someone go, ask whether you are measuring them at your worst investment level — because that is what you are likely to get back.",
      },
      { kind: "h2", text: "4. Clean endings and slow fades" },
      {
        kind: "p",
        text: "Most adult friendships do not end in a conversation. They fade — sometimes respectfully, sometimes resentfully. A clean ending, where necessary, looks like one honest sentence, privately said, without a speech. Not every friendship needs one. The ones that ended badly, often do.",
      },
      { kind: "h2", text: "5. Toxic is a word, evidence is better" },
      {
        kind: "ul",
        items: [
          "Is there a pattern of disrespect, put-downs, or unreliability — not a single bad week?",
          "Is there steady jealousy of your wins, or performative support?",
          "Have you raised it honestly, and did anything change?",
          "Would you want your child to be in this kind of friendship?",
        ],
      },
      { kind: "h2", text: "6. A short script" },
      {
        kind: "ol",
        items: [
          "Which category is this friendship in today — lifetime, chapter, or convenient?",
          "Am I measuring them at my worst investment level?",
          "What does the evidence — not the story — say about how this friendship feels?",
          "If I have to end it, can I do it with one honest sentence, in private?",
          "If I want to keep it, when is the next call I will make without a reason?",
        ],
      },
      {
        kind: "quote",
        text: "Friendship, like savings, compounds — but only if you make deposits. Most people only check the balance.",
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

/** All unique, lowercase, URL-safe tag slugs across posts. */
export function getAllTagSlugs(): string[] {
  const seen = new Set<string>();
  for (const post of BLOG_POSTS) {
    for (const tag of post.tags) seen.add(tagToSlug(tag));
  }
  return [...seen].sort();
}

/** Turn a human tag ("decision-making") into a safe URL slug. */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** All posts for a given tag slug (case-insensitive). */
export function getPostsByTagSlug(slug: string): BlogPost[] {
  const target = slug.toLowerCase();
  return getAllPosts().filter((p) =>
    p.tags.some((t) => tagToSlug(t) === target),
  );
}

/**
 * Return up to `limit` posts most similar to the given one.
 * Similarity = shared-tag count, tie-broken by recency.
 */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug);
  const scored = others.map((p) => {
    const shared = p.tags.filter((t) => post.tags.includes(t)).length;
    return { post: p, shared };
  });
  scored.sort((a, b) => {
    if (b.shared !== a.shared) return b.shared - a.shared;
    return a.post.publishedAt < b.post.publishedAt ? 1 : -1;
  });
  return scored.slice(0, limit).map((s) => s.post);
}
