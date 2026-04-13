# Vercel deploy — քայլ առ քայլ

## 1. Նախապայմաններ

- GitHub (կամ GitLab / Bitbucket) հաշիվ  
- [vercel.com](https://vercel.com) հաշիվ (GitHub-ով մուտք՝ ամենահարմարն է)  
- Պրոդակշնում **PostgreSQL** (SQLite-ը Vercel serverless-ում չի պահում տվյալները) — օրինակ [Neon](https://neon.tech) կամ [Supabase](https://supabase.com) անվճար շերտ

---

## 2. Կոդը GitHub-ում

Ձեր մեքենայից (PowerShell), `Life` թղթապանակում.

```powershell
git init
git add .
git commit -m "Initial Life Decision Engine"
```

GitHub-ում ստեղծեք **նոր repository** (օր. `life-decision-engine`), հետո.

```powershell
git remote add origin https://github.com/YOUR_USER/life-decision-engine.git
git branch -M main
git push -u origin main
```

---

## 3. Նոր նախագիծ Vercel-ում

1. Մուտք [vercel.com/new](https://vercel.com/new)  
2. **Import** ձեր repository-ն  
3. **Framework Preset** — Next.js (ինքը կճանաչի)  
4. **Build Command** — թողեք default (`npm run build` — արդեն ներառում է `prisma generate`)  
5. **Install Command** — `npm install` (default)

Չսեղմեք Deploy մինչև **Environment Variables** բաժինը չլրացնեք (կարող եք նախ deploy անել, հետո Settings → Env, բայց ավելի մաքուր է նախ լրացնել)։

---

## 4. Environment variables (Vercel → Project → Settings → Environment Variables)

| Անուն | Ուր կիրառել | Նկարագրություն |
|--------|----------------|----------------|
| `DATABASE_URL` | Production, Preview | PostgreSQL connection string (Neon / Supabase) |
| `OPENAI_API_KEY` | Production, Preview (ըստ ցանկության) | Լրիվ AI վերլուծության համար |
| `OPENAI_MODEL` | Պահեք դատարկ կամ `gpt-4o-mini` | Ըստ ցանկության |
| `NEXT_PUBLIC_SITE_URL` | Production | `https://your-domain.com` (անպայման https) |
| `NEXT_PUBLIC_STRIPE_ENABLED` | Պահեք `false` մինչև Stripe-ը կապեք | Վճարների UI-ի դրոշակ |
| `ADMIN_SECRET` | Production | Ավտոմատ **16+ նիշ**՝ `/admin` մուտքի համար |
| `RESEND_API_KEY` | Production (ըստ ցանկության) | Կապի հարցումների էլ. փոստ (տես §9) |
| `RESEND_FROM_EMAIL` | Production (ըստ ցանկության) | Օր. `Life Decisions <onboarding@resend.dev>` |

**PostgreSQL.** Ստեղծեք Neon/Supabase բազա, պատճենեք **connection string**-ը `DATABASE_URL`։

Տեղային `prisma/schema.prisma`-ում `provider = "sqlite"` է — **production-ի համար** պետք է փոխել `postgresql` և նույն schema-ն push անել.

Օրինակ `schema.prisma` datasource.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Հետո տեղային (կամ CI-ում).

```bash
npx prisma db push
# կամ
npx prisma migrate dev --name init_pg
```

Փոփոխությունը commit անել և նորից push — Vercel-ը կվերակառուցի։

---

## 5. Deploy

Vercel-ում **Deploy**։ Սխալի դեպքում ստուգեք **Build Logs** — հաճախ պատճառը `DATABASE_URL` բացակայությունն է կամ Prisma provider-ի անհամապատասխանությունը։

---

## 6. Դոմեն

1. Vercel → Project → **Settings** → **Domains**  
2. Ավելացրեք `yourdomain.com` և `www` (ըստ ցանկության)  
3. DNS-ում (GoDaddy, Cloudflare, …) Vercel-ի ցուցումով ավելացրեք **A** / **CNAME** գրառումները  
4. Սպասեք SSL-ի (սովորաբար րոպեներից մինչև մի քանի ժամ)

Վերջում `NEXT_PUBLIC_SITE_URL`-ը թարմացրեք ձեր իրական `https://...` հասցով և **Redeploy** արեք։

---

## 7. Stripe (Checkout + webhook)

1. **Stripe Dashboard** → Products → ստեղծեք **recurring Price** (Premium) → պատճենեք **Price ID** (`price_...`)։  
2. Vercel env (միայն սերվեր)`:` `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID_PREMIUM`, `STRIPE_WEBHOOK_SECRET`։  
3. `NEXT_PUBLIC_SITE_URL` պետք է լինի ձեր production `https://...` (redirect URL-ների համար)։  
4. Տես նաև `docs/STRIPE_LEGAL_AND_SECURITY.md` (PCI, իրավական հիմքեր)։

---

## 8. Admin — պահված կապի հարցումներ

1. Սահմանեք `ADMIN_SECRET` (առնվազն **16 նիշ**) Vercel env-ում։  
2. Բացեք `https://ձեր-դոմենը/admin`  
3. Մուտք գործեք գաղտնաբառով → աղյուսակում երևում են **ContactRequest**-ները (մասնագետ, հաճախորդ, հաղորդագրություն)։  
4. **Log out** կոճակը ջնջում է cookie-ն։

`/admin` և `/api/admin/*` արգելափակված են `robots.txt`-ում։

---

## 9. Resend — էլ. փոստ

1. [resend.com](https://resend.com) — API key  
2. Vercel env՝ `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (սկզբում կարող եք օգտագործել `onboarding@resend.dev`)  
3. Կապի հարցում ուղարկելուց հետո **մասնագետին** և **հաճախորդին** նամակ է գնում (եթե key-ը կա)։ Դոմեն verify անելուց հետո փոխեք `RESEND_FROM_EMAIL`-ը ձեր դոմենով։

---

## 10. SEO — ԱՄՆ որպես սկզբնական շուկա

- Կայքի default metadata-ն և `lang="en-US"`-ը նախատեսված են **ամերիկյան որոնման** և միջազգային տեսանելիության համար։  
- `app/sitemap.ts` և `app/robots.ts` աշխատում են, երբ `NEXT_PUBLIC_SITE_URL`-ը ձեր production URL-ն է։  
- Google Search Console-ում ավելացրեք property (`.com` դոմեն) և ուղարկեք sitemap՝ `https://your-domain.com/sitemap.xml`։  
- **Vercel Analytics** — `@vercel/analytics` ավելացված է layout-ում։ Vercel-ում deploy-ից հետո Analytics-ը ակտիվանում է նախագծի dashboard-ում (առանձին env պետք չէ հիմնական դեպքում)։

## 11. Stripe webhook

Dashboard → **Developers** → **Webhooks** → Add endpoint՝ `https://your-domain.com/api/stripe/webhook`։  
**Events**՝ `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`։  
**Signing secret**-ը դրեք `STRIPE_WEBHOOK_SECRET`-ում։ Սերվերը ստուգում է `stripe-signature` — առանց դրա իրադարձությունը մերժվում է։  
Բաժանորդագրության վիճակը գրվում է DB-ում (`PremiumSubscription`) webhook-ից — ոչ թե կլիենտից։

---

## Արագ checklist

- [ ] GitHub push  
- [ ] Vercel import  
- [ ] `DATABASE_URL` (Postgres) + schema `postgresql`  
- [ ] `prisma db push` / migrate  
- [ ] `OPENAI_API_KEY` (ըստ ցանկության)  
- [ ] `NEXT_PUBLIC_SITE_URL`  
- [ ] `ADMIN_SECRET` (admin վահանակ)  
- [ ] `RESEND_API_KEY` + `RESEND_FROM_EMAIL` (էլ. փոստ)  
- [ ] `STRIPE_SECRET_KEY` + `STRIPE_PRICE_ID_PREMIUM` + `STRIPE_WEBHOOK_SECRET` (վճարներ)  
- [ ] Domain + DNS  
- [ ] Redeploy  
