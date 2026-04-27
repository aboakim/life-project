import type { AppLocale } from "./locale";

export type PostAnalysisCopy = {
  followUpTitle: string;
  followUpQuestions: [string, string, string, string, string];
  assumptionsTitle: string;
  assumptionBullets: [string, string, string, string];
  actionsTitle: string;
  saveToJournal: string;
  savedToJournal: string;
  copyMarkdown: string;
  copied: string;
  shareLimited: string;
  /** Web Share API when available (mobile); falls back to copy full text + URL */
  shareNativeCta: string;
  shareFooter: string;
  printSummary: string;
  historyTitle: string;
  historyEmpty: string;
  clearHistory: string;
  remindLabel: string;
  /** @deprecated Replaced by day-specific remind buttons; kept for table fallbacks */
  remindSet: string;
  /** @deprecated */
  remindActive: string;
  remind3Days: string;
  remind7Days: string;
  remind14Days: string;
  remindActive3: string;
  remindActive7: string;
  remindActive14: string;
  remindClear: string;
  printPdfHint: string;
  specialistTitle: string;
  specialistLead: string;
  specialistPhrases: [
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  specialistCopy: string;
  reminderBanner: string;
  reminderDismiss: string;
  expertsCta: string;
  playbooksCta: string;
  guidelinesCta: string;
  mdDecision: string;
  mdContext: string;
  mdConstraints: string;
  mdSummary: string;
  mdDimensions: string;
  mdScenarios: string;
  mdTimeline: string;
  mdScore: string;
  mdTwin: string;
  mdProfessional: string;
  mdStakes: string;
  /** Nudge users to run analyses repeatedly */
  runAnotherHint: string;
  runAnotherCta: string;
  /** Short trust copy after results — transparent, autonomy-first (not pressure). */
  runAnotherTrustTitle: string;
  runAnotherTrustBody: string;
  /** After results: ask which kind of professional, then deep-link to /experts */
  needsHelpTitle: string;
  needsHelpLead: string;
  needsHelpSuggestedBadge: string;
  needsHelpUnsure: string;
  needsHelpOpenExperts: string;
  /** Use {role} placeholder for localized role label */
  needsHelpOpenForRole: string;
  historyLoadBrief: string;
  nextIterationTitle: string;
  nextIterationLead: string;
  compareTitle: string;
  compareNeedTwo: string;
  comparePickA: string;
  comparePickB: string;
  compareDecisionLabel: string;
  compareScoreLabel: string;
  compareSummaryLabel: string;
  compareDifferentRuns: string;
  emailRemindSectionTitle: string;
  emailRemindSectionLead: string;
  emailRemindFirstName: string;
  emailRemindLastName: string;
  emailRemindEmail: string;
  emailRemindSubmit: string;
  emailRemindSubmitting: string;
  emailRemindSuccess: string;
  emailRemindError: string;
  emailRemindRateLimited: string;
  /** bad_request (e.g. anti-spam field touched by autofill) */
  emailRemindBlockedRequest: string;
  emailRemindCaptchaFailed: string;
  emailRemindNeedTurnstile: string;
  emailRemindPrivacy: string;
  emailRemindDevCaptchaBypass: string;
  emailRemindIdStored: string;
  emailRemindScheduleNote: string;
  /** Required checkbox — no emails without this */
  emailRemindConsentLabel: string;
  /** Optional 7-day return nudge — only if checked */
  emailRemindOptIn7DayLabel: string;
  /** When Turnstile is not configured (consent + honeypot still protect the form) */
  emailRemindFallbackNote: string;
  emailRemindNeedConsent: string;
  emailRemindSuccess7d: string;
  /** Modal before first analysis (email gate) */
  emailRemindPreAnalysisTitle: string;
  emailRemindPreAnalysisLead: string;
  /** Shown in pre modal — no email opt-in checkboxes, bot gate only */
  emailRemindPreAnalysisVerificationNote: string;
  /** When Turnstile is off, pre modal: bot trap explanation, no consent copy */
  emailRemindPreAnalysisNoTurnstile: string;
  emailRemindPreAnalysisButton: string;
  emailRemindPreAnalysisCancel: string;
};

const en: PostAnalysisCopy = {
  followUpTitle: "Next questions to sit with",
  followUpQuestions: [
    "What would ‘good enough’ look like in 30 days?",
    "Who loses something meaningful if you choose A vs B?",
    "What single assumption, if false, breaks your favourite scenario?",
    "What would you need to see in the next 2 weeks to update your view?",
    "If you had to explain this to a calm friend, what’s the one sentence verdict?",
  ],
  assumptionsTitle: "Assumptions worth pressure-testing",
  assumptionBullets: [
    "Income, health, and family constraints stay roughly as you described.",
    "The emotional cost you’re tolerating today won’t compound past 6 months.",
    "You can access the support (time, money, people) your plan requires.",
    "Regret would come from inaction more than from a structured ‘no’.",
  ],
  actionsTitle: "Keep & share",
  saveToJournal: "Add to journal",
  savedToJournal: "Saved to your journal (browser only).",
  copyMarkdown: "Copy as Markdown",
  copied: "Copied.",
  shareLimited: "Copy short summary",
  shareNativeCta: "Share…",
  shareFooter: "— From Life Decision Engine (lifedecisions.space). Full analysis kept private on your device.",
  printSummary: "Print this analysis",
  historyTitle: "Recent analyses (this device)",
  historyEmpty: "No saved history yet — run another analysis to build a short list here.",
  clearHistory: "Clear history",
  remindLabel: "Revisit this decision",
  remindSet: "Remind me in 2 weeks",
  remindActive: "Reminder set for 2 weeks from now.",
  remind3Days: "In 3 days",
  remind7Days: "In 7 days",
  remind14Days: "In 14 days",
  remindActive3: "We’ll nudge you in 3 days (this browser).",
  remindActive7: "We’ll nudge you in 7 days (this browser).",
  remindActive14: "We’ll nudge you in 14 days (this browser).",
  remindClear: "Clear reminder",
  printPdfHint:
    "Tip: in the print dialog, choose “Save as PDF” for a one-page file.",
  reminderBanner:
    "You asked to revisit a big decision — take 10 minutes to update your brief and re-run the analyzer.",
  reminderDismiss: "Dismiss",
  expertsCta: "Browse experts",
  playbooksCta: "Topic playbooks",
  guidelinesCta: "Community guidelines",
  mdDecision: "Decision",
  mdContext: "Context",
  mdConstraints: "Constraints",
  mdSummary: "Summary",
  mdDimensions: "Dimensions",
  mdScenarios: "Scenarios",
  mdTimeline: "Timeline",
  mdScore: "Score",
  mdTwin: "Note",
  mdProfessional: "Professional guidance",
  mdStakes: "Subjective weight (1–10)",
  specialistTitle: "What to ask a specialist or coach",
  specialistLead: "Copy a line, paste it in email or chat—edit with your own details.",
  specialistPhrases: [
    "Given what I’ve shared, what would you suggest as the next 2–3 concrete steps—and why?",
    "What are the main blind spots or risks in how I’m framing this decision?",
    "If you saw five people in a similar situation, what made the difference between a good and a bad outcome?",
    "What information would you need to give advice that’s actually tailored—not generic?",
    "What is one early warning sign that I should slow down, get help, or change course?",
    "If we check in in 4–6 weeks, what would ‘meaningful progress’ look like in practical terms?",
  ],
  specialistCopy: "Copy",
  runAnotherHint:
    "Many big forks benefit from a second pass: tweak your brief, add numbers or constraints, and see how the picture shifts — at your pace.",
  runAnotherCta: "Run another analysis",
  runAnotherTrustTitle: "You stay in charge",
  runAnotherTrustBody:
    "A new question is not a gimmick to keep you scrolling — it is how structured thinking actually works. Your text and results stay on this device unless you turn on email reminders or copy something out. Each run reflects only what you enter then; take a break and come back when you want a clearer view.",
  needsHelpTitle: "What kind of support do you need next?",
  needsHelpLead:
    "Pick the closest match — we open the directory with the right filter and your question prefilled in search (you can shorten it on that page).",
  needsHelpSuggestedBadge: "Suggested",
  needsHelpUnsure: "Not sure — show all experts",
  needsHelpOpenExperts: "Continue to directory →",
  needsHelpOpenForRole: "View {role} in the directory →",
  historyLoadBrief: "Load brief & re-run",
  nextIterationTitle: "Before your next run",
  nextIterationLead:
    "A quick set of angles for your next edit. The full reflection list follows in the next section.",
  compareTitle: "Compare two saved runs",
  compareNeedTwo:
    "Run the analyzer at least twice on this device to compare scores and summaries side by side.",
  comparePickA: "Run A",
  comparePickB: "Run B",
  compareDecisionLabel: "Question",
  compareScoreLabel: "Score",
  compareSummaryLabel: "Summary",
  compareDifferentRuns: "Choose two different entries.",
  emailRemindSectionTitle: "Email nudges (optional)",
  emailRemindSectionLead:
    "Enter your name and email. We never send bulk marketing: only what you explicitly opt into below (plus an optional robot check).",
  emailRemindFirstName: "First name",
  emailRemindLastName: "Last name",
  emailRemindEmail: "Email",
  emailRemindSubmit: "Save my email for reminders",
  emailRemindSubmitting: "Saving…",
  emailRemindSuccess:
    "Saved. When you tap 3 / 7 / 14 days below, we can also email this address (Resend + cron on the host).",
  emailRemindSuccess7d:
    "Saved. You’ll get a short “come back to the analyzer” email in about 7 days — and you can still use the 3 / 7 / 14 day buttons for an earlier nudge.",
  emailRemindError: "Could not save — try again in a moment.",
  emailRemindRateLimited:
    "Too many attempts from this network. Wait a few minutes and try again.",
  emailRemindBlockedRequest:
    "The request was blocked. Refresh the page and try again — password managers sometimes auto-fill a hidden anti-spam field.",
  emailRemindCaptchaFailed: "Robot check failed — try again.",
  emailRemindNeedTurnstile:
    "Optional: add Cloudflare Turnstile (NEXT_PUBLIC_TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY) for stronger bot protection; the form works without it using consent + a hidden bot trap.",
  emailRemindFallbackNote:
    "No Turnstile keys on this site yet — we still block many bots with your consent checkbox and a hidden field. Add Turnstile anytime for an extra layer.",
  emailRemindConsentLabel:
    "I agree that Life Decision Engine may send me one-off reminder emails only in these cases: (a) when I opt in below for a ~7 day nudge, and/or (b) when I choose 3 / 7 / 14 day reminders in the analyzer on this browser. Not a newsletter.",
  emailRemindOptIn7DayLabel:
    "Optional: email me in about 7 days with a link to open the analyzer again and run another question (I can turn this off by not checking).",
  emailRemindNeedConsent: "Please tick the consent box to continue.",
  emailRemindPrivacy:
    "How we use your email: storage and sending are limited to the reminders you opt into. See the privacy policy on this site.",
  emailRemindDevCaptchaBypass:
    "Local dev: Turnstile not set — use REMINDER_SKIP_CAPTCHA=1 on the server to test without the widget.",
  emailRemindIdStored: "This browser is linked to your saved email — use the same device when you pick 3 / 7 / 14 days.",
  emailRemindScheduleNote:
    "If this browser is linked to your email (from the pre-analysis step on “Run analysis”), we can also email when you pick 3 / 7 / 14 days (not only a browser nudge).",
  emailRemindPreAnalysisTitle: "One quick step before we analyze",
  emailRemindPreAnalysisLead:
    "Add your name and a working email. They are not used to judge your question — we only use them for this check before the engine runs your analysis.",
  emailRemindPreAnalysisVerificationNote:
    "This step exists so we can be sure you are a real person, not a bot or an automated script.",
  emailRemindPreAnalysisNoTurnstile:
    "The server rate-limits this step. You can add Cloudflare Turnstile (site + secret keys) for an extra check.",
  emailRemindPreAnalysisButton: "Continue — run analysis",
  emailRemindPreAnalysisCancel: "Cancel",
};

const hy: PostAnalysisCopy = {
  followUpTitle: "Հաջորդ հարցերը մտածելու համար",
  followUpQuestions: [
    "Ի՞նչ կլինի «բավարար լավը» 30 օրվա ընթացքում։",
    "Ո՞վ կկորցնի ինչ-որ բան, եթե ընտրես A կամ B։",
    "Ո՞ր մեկ ենթադրությունը, եթե սխալ է, կփլուզի ամենալավ սցենարը։",
    "Ի՞նչ պետք է տեսնես 2 շաբաթում, որ տեսակետդ թարմացնես։",
    "Եթե մեկ նախադասությամբ բացատրես հանգիստ ընկերոջը՝ ո՞րն է վերջաբանը։",
  ],
  assumptionsTitle: "Ենթադրություններ, որոնք արժե ստուգել",
  assumptionBullets: [
    "Եկամուտը, առողջությունը և ընտանեկան սահմանները մոտավորապես այնպիսին կմնան, ինչպես նկարագրել ես։",
    "Ներկա զգացմունքային գինը չի մեծանա 6 ամիսից հետո։",
    "Կարող ես հասանելիություն ունենալ պլանիդ համար անհրաժեշտ աջակցությանը (ժամանակ, գումար, մարդիկ)։",
    "Ներքին ծանրությունը ավելի շատ կգա չգործելուց, քան կառուցված «ոչ»-ից։",
  ],
  actionsTitle: "Պահել և կիսվել",
  saveToJournal: "Ավելացնել օրագիր",
  savedToJournal: "Պահվել է օրագրում (միայն այս բրաուզերում)։",
  copyMarkdown: "Պատճենել Markdown",
  copied: "Պատճենվեց։",
  shareLimited: "Կարճ ամփոփում",
  shareNativeCta: "Կիսվել…",
  shareFooter:
    "— Life Decision Engine (lifedecisions.space)։ Լրիվ վերլուծությունը մնում է այս սարքում։",
  printSummary: "Տպել վերլուծությունը",
  historyTitle: "Վերջին վերլուծություններ (այս սարքում)",
  historyEmpty: "Դեռ պատմություն չկա — գործարկիր նոր վերլուծություն։",
  clearHistory: "Մաքրել պատմությունը",
  remindLabel: "Վերադառնալ այս որոշմանը",
  remindSet: "Հիշեցնել 2 շաբաթից",
  remindActive: "Հիշեցումը սահմանված է 2 շաբաթից։",
  remindClear: "Չեղարկել հիշեցումը",
  reminderBanner:
    "Դու խնդրել ես վերադառնալ մեծ որոշմանը — տուր 10 րոպե թարմացրու brief-ը և կրկին գործարկիր վերլուծիչը։",
  reminderDismiss: "Փակել",
  expertsCta: "Փորձագետներ",
  playbooksCta: "Playbook-ներ",
  guidelinesCta: "Համայնքի կանոններ",
  mdDecision: "Որոշում",
  mdContext: "Կոնտեքստ",
  mdConstraints: "Սահմաններ",
  mdSummary: "Ամփոփում",
  mdDimensions: "Չափանիշներ",
  mdScenarios: "Սցենարներ",
  mdTimeline: "Ժամանակացույց",
  mdScore: "Գնահատում",
  mdTwin: "Նշում",
  mdProfessional: "Մասնագիտական ուղեցույց",
  mdStakes: "Զգացողական ծանրություն (1‒10)",
  remind3Days: "3 օրից",
  remind7Days: "7 օրից",
  remind14Days: "14 օրից",
  remindActive3: "Հիշեցումը սահմանված է 3 օրից (այս բրաուզերում)։",
  remindActive7: "Հիշեցումը սահմանված է 7 օրից (այս բրաուզերում)։",
  remindActive14: "Հիշեցումը սահմանված է 14 օրից (այս բրաուզերում)։",
  printPdfHint: "Խնդրահատուկ` տպման պատուհանում ընտրիր «Պահել որպես PDF»։",
  specialistTitle: "Ի՞նչ հարց տալ մասնագետին կամ coach-ին",
  specialistLead: "Պատճենիր տողը, տեղակիր նամակում կամ չաթում, խմբագիր ձեր մանրամասներով։",
  specialistPhrases: [
    "Ինչ ես առաջարկում որպես հաջորդ 2‒3 կոնկրետ քայլ՝ հաշվի առնելով ինչ եմ գրել, և ինչու՞",
    "Ի՞նչ «կույր կետեր» կամ ռիսկեր եմ կարող բաց թողնել, եթե այսպես եմ դնում հարցը։",
    "Եթե հինգ մարդ նման իրավիճակում է եղել, ի՞նչն էր տարբերում լավ և վատ ելքը։",
    "Ի՞նչ տվյալներ պետք է տաս, որ խորհուրդը կոնկրետ լինի, ոչ թե ընդհանուր։",
    "Մի՞ ազդանշան, որ պետք է ավելի դանդաղեմ, մասնագետի դիմեմ կամ ուղի փոխեմ։",
    "Եթե 4‒6 շաբաթից նորից խոսենք, ի՞նչն է «նշանակալի առաջընթաց» աշխարհիկ իմաստով։",
  ],
  specialistCopy: "Պատճենել",
  runAnotherHint:
    "Մեծ ընտրություններին հաճախ օգնում է երկրորդ անցումը՝ խմբագրիր brief-ը, ավելացրու թվեր կամ սահմաններ, տես՝ ինչպես է փոխվում պատկերը — քո ռիթմով։",
  runAnotherCta: "Նոր վերլուծություն",
  runAnotherTrustTitle: "Քո վերահսկողությունն է",
  runAnotherTrustBody:
    "Նոր հարց տալը «կլիկ պահելու» հնարք չէ — այդպես է աշխատում կառուցված մտածելը։ Քո տեքստը և արդյունքները մնում են այս սարքում, քանի դեռ ինքդ չես միացրել էլ․ հիշեցումը կամ չես պատճենել դրսում։ Յուրաքանչյուր գործարկում արտացոլում է միայն այն, ինչ այդ պահին ես մուտքագրել — կարող ես ընդմիշտ դադար վերցնել և հետո վերադառնալ ավելի պարզ տեսանկյունով։",
  needsHelpTitle: "Հաջորդ քայլով ի՞նչ աջակցության կարիք ունես",
  needsHelpLead:
    "Ընտրիր ամենամոտ տարբերակը — կբացենք մասնագետների ցանկը ճիշտ զտումով, իսկ քո հարցը կլինի որոնման դաշտում, որպեսզի կարողանաս կարճացնել։",
  needsHelpSuggestedBadge: "Առաջարկ",
  needsHelpUnsure: "Դեռ հստակ չեմ — բոլոր մասնագետները",
  needsHelpOpenExperts: "Անցնել ցանկին →",
  needsHelpOpenForRole: "Դիտել {role} ցանկում →",
  historyLoadBrief: "Բեռնել brief-ը և կրկին գործարկել",
  nextIterationTitle: "Հաջորդ գործարկումից առաջ",
  nextIterationLead:
    "Երեք արագ ուղղություն հաջորդ խմբագրման համար։ Լրիվ հարցերի ցանկը՝ հաջորդ բաժնում։",
  compareTitle: "Երկու պահված վերլուծությունների համեմատում",
  compareNeedTwo:
    "Այս սարքում գոնե երկու անգամ գործարկիր վերլուծիչը, որպեսզի տեսնես միավորներն ու ամփոփումները կողք կողքի։",
  comparePickA: "A վերլուծություն",
  comparePickB: "B վերլուծություն",
  compareDecisionLabel: "Հարց",
  compareScoreLabel: "Միավոր",
  compareSummaryLabel: "Ամփոփում",
  compareDifferentRuns: "Ընտրիր երկու տարբեր գրառում։",
  emailRemindSectionTitle: "Էլ․ փոստով հիշեցում (ընտրովի)",
  emailRemindSectionLead:
    "Գրիր անուն, ազգանուն և էլ․ փոստ։ Նամակներ չենք ուղարկում առանց քո հստակ համաձայնության ներքևում (ինչպես նաև ընտրովի ռոբոտի ստուգում)։",
  emailRemindFirstName: "Անուն",
  emailRemindLastName: "Ազգանուն",
  emailRemindEmail: "Էլ․ փոստ",
  emailRemindSubmit: "Պահել իմ հասցեն հիշեցումների համար",
  emailRemindSubmitting: "Պահվում է…",
  emailRemindSuccess:
    "Պահվեց։ Երբ ստորև ընտրես 3 / 7 / 14 օր, կարող ենք նաև էլ․ նամակ ուղարկել (եթե սերվերում կան Resend և cron)։",
  emailRemindSuccess7d:
    "Պահվեց։ Մոտ 7 օրից կուղարկենք կարճ նամակ՝ հղումով նորից բացելու վերլուծիչը. ցանկության դեպքում ավելի շուտ հիշեցում կարող ես ընտրել 3 / 7 / 14 օր կոճակներով։",
  emailRemindError: "Չհաջողվեց — փորձիր մի քիչ հետո։",
  emailRemindRateLimited:
    "Չափից շատ փորձեր այս ցանցից. սպասիր մի քանի րոպե և կրկին փորձիր։",
  emailRemindBlockedRequest:
    "Հարցումը արգելափակվեց. թարմացրու էջը և կրկին փորձիր — գաղտնաբառերի կառավարիչները երբեմն լցնում են թաքնված դաշտը։",
  emailRemindCaptchaFailed: "Ռոբոտի ստուգումը չանցավ — կրկին փորձիր։",
  emailRemindNeedTurnstile:
    "Ընտրովի՝ Cloudflare Turnstile (NEXT_PUBLIC_TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY)՝ ավելի ուժեղ պաշտպանություն. ձևը աշխատում է նաև առանց դրանց՝ համաձայնություն + թաքնված դաշտ։",
  emailRemindFallbackNote:
    "Այս կայքում դեռ Turnstile բանալիներ չկան — մի մասը բոտերի դեմ արգելափակում ենք համաձայնության տուփով և թաքնված դաշտով. Turnstile-ը կարելի է ավելացնել ցանկացած ժամանակ։",
  emailRemindConsentLabel:
    "Համաձայն եմ, որ Life Decision Engine-ը ուղարկի միայն մեկանգամյա հիշեցումներ հետևյալ դեպքերում՝ (ա) եթե ներքևում նշեմ ~7 օրյա նամակը, և/կամ (բ) երբ այս բրաուզերում ընտրեմ 3 / 7 / 14 օրյա հիշեցումը։ Սա նամակագիր չէ։",
  emailRemindOptIn7DayLabel:
    "Ընտրովի՝ մոտ 7 օրից ուղարկիր էլ․ նամակ՝ հղումով նորից բացելու վերլուծիչը և հարց տալու (կարող եմ չնշել)։",
  emailRemindNeedConsent: "Շարունակելու համար նշիր համաձայնության տուփը։",
  emailRemindPrivacy:
    "Էլ․ փոստը օգտագործում ենք միայն քո ընտրած հիշեցումների համար։ Մանրամասներ՝ կայքի գաղտնիության քաղաքականություն։",
  emailRemindDevCaptchaBypass:
    "Տեղային dev՝ Turnstile չկա — սերվերում դրու REMINDER_SKIP_CAPTCHA=1, որ փորձես առանց վիջեթի։",
  emailRemindIdStored:
    "Այս բրաուզերը կապված է պահված հասցեի հետ — նույն սարքով ընտրիր 3 / 7 / 14 օրը։",
  emailRemindScheduleNote:
    "Եթե այս բրաուզերը կապված է քո էլ․ հասցեի հետ («Վերլուծել»-ից առաջ եղած քայլից), 3/7/14 օրյա ընտրության դեպքում կարող ենք նաև էլ․ նամակ ուղարկել, ոչ միայն բրաուզերային հիշեցում։",
  emailRemindPreAnalysisTitle: "Մեկ կարճ քայլ՝ նախքան վերլուծությունը",
  emailRemindPreAnalysisLead:
    "Գրիր անուն, ազգանուն, աշխատանքային էլ․փոստ․ չի օգտագործվի քո հարցը գնահատելու համար, միայն այս ստուգման համար, նախքան վերլուծիչը աշխատի։",
  emailRemindPreAnalysisVerificationNote:
    "Այս քայլը հենց դրա համար է, որ համոզվենք, որ դու մարդ ես, ոչ թե ավտոմատ ռոբոտ կամ բոտ։",
  emailRemindPreAnalysisNoTurnstile:
    "Սերվերը սահմանափակում է այս քայլի հաճախականությունը. Cloudflare Turnstile-ը ավելացրու, երբ public և secret բանալիներն ունենաս։",
  emailRemindPreAnalysisButton: "Շարունակել — վերլուծել",
  emailRemindPreAnalysisCancel: "Չեղարկել",
};

const table: Record<AppLocale, PostAnalysisCopy> = {
  "en-US": en,
  en,
  hy,
  ru: { ...en, expertsCta: "Эксперты", playbooksCta: "Гайды", guidelinesCta: "Правила сообщества", remindSet: "Напомнить через 2 недели", reminderDismiss: "Скрыть", copyMarkdown: "Копировать Markdown", saveToJournal: "В дневник", followUpTitle: "Следующие вопросы", assumptionsTitle: "Проверьте допущения", actionsTitle: "Сохранить и поделиться" },
  de: { ...en, expertsCta: "Experten", playbooksCta: "Playbooks", guidelinesCta: "Community-Regeln", remindSet: "In 2 Wochen erinnern", reminderDismiss: "Schließen", copyMarkdown: "Markdown kopieren", saveToJournal: "Ins Tagebuch", followUpTitle: "Nächste Fragen", assumptionsTitle: "Annahmen prüfen", actionsTitle: "Speichern & teilen" },
  fr: { ...en, expertsCta: "Experts", playbooksCta: "Guides", guidelinesCta: "Règles communauté", remindSet: "Rappel dans 2 semaines", reminderDismiss: "Fermer", copyMarkdown: "Copier Markdown", saveToJournal: "Au journal", followUpTitle: "Questions suivantes", assumptionsTitle: "Tester les hypothèses", actionsTitle: "Garder & partager" },
  es: { ...en, expertsCta: "Expertos", playbooksCta: "Guías", guidelinesCta: "Normas de la comunidad", remindSet: "Recordar en 2 semanas", reminderDismiss: "Cerrar", copyMarkdown: "Copiar Markdown", saveToJournal: "Al diario", followUpTitle: "Siguientes preguntas", assumptionsTitle: "Comprobar supuestos", actionsTitle: "Guardar y compartir" },
  it: { ...en, expertsCta: "Esperti", playbooksCta: "Guide", guidelinesCta: "Regole community", remindSet: "Promemoria tra 2 settimane", reminderDismiss: "Chiudi", copyMarkdown: "Copia Markdown", saveToJournal: "Nel diario", followUpTitle: "Prossime domande", assumptionsTitle: "Verifica le ipotesi", actionsTitle: "Salva e condividi" },
  ar: { ...en, expertsCta: "الخبراء", playbooksCta: "أدلة", guidelinesCta: "إرشادات المجتمع", remindSet: "تذكير خلال أسبوعين", reminderDismiss: "إغلاق", copyMarkdown: "نسخ Markdown", saveToJournal: "إلى اليوميات", followUpTitle: "أسئلة تالية", assumptionsTitle: "اختبر الافتراضات", actionsTitle: "احفظ وشارك" },
};

export function getPostAnalysisCopy(locale: AppLocale): PostAnalysisCopy {
  return table[locale] ?? en;
}
