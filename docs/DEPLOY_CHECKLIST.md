# Deploy checklist — Vercel + Neon (այս repo-ի համար)

Մեկ էջով քայլեր և **իրական environment փոփոխականների անուններ**, ինչպես `grep`-ով երևում են կոդից։

---

## Նախապայմաններ

- Նախագիծը GitHub-ում repo-ի մեջ (օր. `life-decision-engine`).
- Քո production դոմեյնը (կամ սկզբում `*.vercel.app`).

---

## 1) Neon — PostgreSQL (production տվյալների բազա)

1. Մտիր [neon.tech](https://neon.tech) → նոր **Project** / **Database**.
2. Ստեղծիր բազան, պատճենիր **Connection string**-ը (սովորաբար `postgresql://...@...neon.tech/neondb?sslmode=require`).
3. **Կարևոր.** Այս repo-ում `prisma/schema.prisma`-ը արդեն **`postgresql`** է։ Vercel build-ը անում է `prisma migrate deploy` — տվյալների բազան ստեղծվում/թարմացվում է migration-ներով։

4. Տեղական dev-ում ևս պետք է **PostgreSQL** (Neon անվճար branch, Docker, կամ տեղական `postgres`):

```bash
npx prisma generate
npx prisma migrate deploy
```

(կամ նոր DB-ի համար առաջին անգամ՝ `npx prisma migrate deploy` build-ից առաջ՝ Neon connection string-ով)։

---

## 2) Vercel — deploy

1. [vercel.com](https://vercel.com) → **Add New → Project** → Import GitHub repo-ն։
2. **Framework:** Next.js (ինքը կճանաչի)։
3. **Build Command** — թող լինի default (`npm run build`), քանի որ `package.json`-ում `build` արդեն անում է `prisma generate && prisma migrate deploy && next build` (պետք է **`DATABASE_URL`** Vercel env-ում)։
4. **Install Command** — `npm install` (կամ `pnpm install` եթե փոխես)։
5. **Environment Variables** — լրացրու ստորևի աղյուսակը (քայլ 3)։
6. **Deploy**։
7. Vercel → **Settings → Domains** — ավելացրու քո դոմեյնը, DNS-ում կիրառիր Vercel-ի տված գրառումները։

---

## 3) Environment variables — ցանկ (իրական անուններ)

| Փոփոխական | Որտեղ է պետք | Նշում |
|-----------|----------------|-------|
| `DATABASE_URL` | **Պարտադիր** production-ում | Neon connection string (`postgresql://...`) |
| `NEXT_PUBLIC_SITE_URL` | **Խորհուրդ է** | `https://քո-դոմեյն.com` — դատարկ/սխալ URL-ը կարող է խափանել metadata-ն (տե՛ս `lib/site-url.ts`) |
| `OPENAI_API_KEY` | Ընտրովի | Live AI վերլուծություն (`/api/analyze`) |
| `OPENAI_MODEL` | Ընտրովի | Default `gpt-4o-mini` |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Ընտրովի | `ca-pub-...` — գովազդներ (`components/ads/AdSenseBanner.tsx`) |
| `NEXT_PUBLIC_ADSENSE_SLOT_HOME` | Ընտրովի | Ad unit slot ID — **երկուսը միասին**, թե ոչ գովազդ չի ցուցադրվի |
| `STRIPE_SECRET_KEY` | Ընտրովի Premium | `sk_live_...` / `sk_test_...` |
| `STRIPE_PRICE_ID_PREMIUM` | Ընտրովի | `price_...` |
| `STRIPE_WEBHOOK_SECRET` | Ընտրովի | `whsec_...` — Stripe Dashboard → Webhooks → `https://ՔՈԴՈՄԵՆ/api/stripe/webhook` |
| `NEXT_PUBLIC_STRIPE_ENABLED` | Ընտրովի | `true` — եթե UI-ում Stripe-ը միացնես (`lib/stripe-placeholder.ts`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Ընտրովի | `pk_...` — եթե ավելացնես Stripe.js |
| `ADMIN_SECRET` | Ընտրովի | Մին. ~16 նիշ — `/admin` մուտք |
| `RESEND_API_KEY` | Ընտրովի | Էլ․ փոստ expert contact-ի համար |
| `RESEND_FROM_EMAIL` | Ընտրովի | Օրինակ `Name <onboarding@resend.dev>` |

**Չի պետք Vercel-ում ձեռքով**՝ `NODE_ENV` — սովորաբար production է դրվում host-ի կողմից։

**Գաղտնիքներ**՝ `STRIPE_*`, `ADMIN_SECRET`, `RESEND_*`, `OPENAI_API_KEY`, `DATABASE_URL` — **երբեք** `NEXT_PUBLIC_*` մի՛ դարձրու (բացառությամբ այն ինչ արդեն հանրային է նախատեսված)։

---

## 4) Stripe webhook (եթե Premium ես միացնում)

1. Stripe Dashboard → **Developers → Webhooks** → Add endpoint․  
   **URL:** `https://ՔՈԴՈՄԵՆ/api/stripe/webhook`
2. Իրադարձություններ՝ `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted` (ինչպես `docs/STRIPE_LEGAL_AND_SECURITY.md`-ում)։
3. Պատճենիր **Signing secret** → `STRIPE_WEBHOOK_SECRET` Vercel env-ում։

---

## 5) Deploy-ից հետո ստուգում

- [ ] Գլխավոր էջը բացվում է `https://...`
- [ ] `/experts`, `/pricing`, `/community` բացվում են
- [ ] `/api/analyze` — եթե `OPENAI_API_KEY` չկա, demo/fallback պետք է աշխատի (սխալ չի նշանակում deploy провал)
- [ ] Community հարց — DB-ում գրառում է երևում (Neon console / Prisma Studio)
- [ ] Stripe — թեստային checkout (եթե միացրել ես)

---

## 6) Հաճախ խնդիրներ

| Խնդիր | Լուծում |
|--------|---------|
| Build-ում Prisma սխալ | `DATABASE_URL`-ը ճիշտ է Neon-ին, `provider = postgresql` |
| Metadata / OG 500 | Լրացրու `NEXT_PUBLIC_SITE_URL` վավեր `https://...` |
| Գովազդ չի երևում | AdSense հաստատում + `NEXT_PUBLIC_ADSENSE_*` երկուսը |
| LAN dev «Failed to fetch» | Տեղային՝ `npm run dev:lan`, ոչ production խնդիր |

---

Ֆայլը համահունչ է `/.env.example`-ի հետ — մանրամասները կրկնելու կարիք չկա, սա **deploy-ի հերթականությունը** է։
