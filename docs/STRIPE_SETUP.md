# Stripe setup — from Dashboard to live checkout

This is the **shortest safe path** to turn on paid subscriptions for Life
Decision Engine. The code is already deployed; you only need to (1) create
the price in Stripe, (2) paste three secrets into Vercel, (3) wire the
webhook. No coding required.

> Quick sanity check: all Stripe code already lives under
> `lib/stripe-server.ts`, `lib/stripe/process-webhook-event.ts`,
> `app/api/checkout/create/route.ts`, and `app/api/stripe/webhook/route.ts`.
> Nothing needs to be edited to go live.

---

## 1 · Create a Stripe account

1. Go to <https://dashboard.stripe.com/register>.
2. Sign up with your business email.
3. In the left sidebar, you will see **"Test mode"** toggle at the top.
   Keep it **ON** while you follow the steps below. Flip it OFF only
   once you have done an end-to-end test with a test card.

---

## 2 · Create the Premium product + recurring price

1. Sidebar → **Product catalog** → **Create product**.
2. **Name:** `Life Decision Engine — Premium`
3. **Description:** `Unlimited decision analyses, advanced lenses, priority support.`
4. **Pricing model:** `Standard`
5. **Price:** enter your monthly price (e.g. `9.99`), **Currency** `USD`.
6. **Billing period:** `Monthly` (recurring).
7. Click **Save product**.
8. On the product page, copy the **Price ID** — it starts with `price_…`.
   This becomes `STRIPE_PRICE_ID_PREMIUM`.

> If you want a yearly plan later, just add a second Price on the same
> product and create a second env var — the code is ready to extend.

---

## 3 · Grab your API secret key

1. Sidebar → **Developers** → **API keys**.
2. Under **Standard keys**, reveal the **Secret key** (`sk_test_…` or
   `sk_live_…` depending on mode).
3. Copy it. This becomes `STRIPE_SECRET_KEY`.

> **Never commit this.** It belongs only in Vercel env vars (Production,
> Preview — not Development unless you know what you are doing).

---

## 4 · Create the webhook endpoint

1. Sidebar → **Developers** → **Webhooks** → **Add endpoint**.
2. **Endpoint URL:**
   ```
   https://YOUR_DOMAIN/api/stripe/webhook
   ```
   Replace `YOUR_DOMAIN` with your live production domain (e.g.
   `https://life-decision-engine.com`). Use the production domain, not
   the Vercel preview URL.
3. **Events to send:** choose exactly these three:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Click **Add endpoint**.
5. On the endpoint page, reveal the **Signing secret** (`whsec_…`).
   This becomes `STRIPE_WEBHOOK_SECRET`.

---

## 5 · Paste the three secrets into Vercel

Go to: **Vercel → Project → Settings → Environment Variables**, add all three
for the **Production** environment (and Preview if you want test-mode
there):

| Key | Value |
|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_…` (or `sk_live_…`) |
| `STRIPE_PRICE_ID_PREMIUM` | `price_…` from step 2 |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` from step 4 |

Then click **Redeploy** from the Deployments tab.

---

## 6 · Test the end-to-end flow (test mode)

1. Visit `https://YOUR_DOMAIN/pricing`.
2. Click **Upgrade**. You should land on Stripe's hosted Checkout page.
3. Use a Stripe test card, e.g.:
   - Card: `4242 4242 4242 4242`
   - Expiry: any future date
   - CVC: any 3 digits
   - ZIP: any 5 digits
4. Complete the payment. You should be redirected back to
   `/pricing?checkout=success` with a success banner.
5. In Stripe Dashboard → **Customers**, you should see the new customer and
   an active subscription.
6. In your database, the `PremiumSubscription` table should have a row with
   `status = active`.

**If webhook is working**, the DB row appears automatically within a few
seconds. If it does not, go to Stripe Dashboard → Webhooks → your endpoint
→ **Event attempts** — any 4xx/5xx response means the URL, secret, or
database is wrong.

---

## 7 · Go live

1. In Stripe Dashboard, toggle **Test mode** OFF (top of sidebar).
2. Repeat **steps 2–4** in Live mode:
   - Re-create the product + recurring price → new `price_…`
   - Copy the live `sk_live_…`
   - Create the webhook at the same URL, copy the live `whsec_…`
3. Update the three Vercel env vars with the **live** values.
4. Redeploy.

> You can keep two sets of keys by scoping them per Vercel environment
> (test keys on Preview, live keys on Production), but start simple: live
> on Production only.

---

## 8 · Common gotchas

| Symptom | Likely cause |
|---|---|
| **Pricing page shows "Stripe not configured"** | One of the three env vars missing or not deployed. Click Redeploy. |
| **Checkout loads, but DB never updates** | Webhook URL wrong, or `STRIPE_WEBHOOK_SECRET` mismatched with the endpoint. |
| **`invalid_signature` in webhook logs** | Wrong secret — you probably copied the one from a different endpoint. |
| **Customer paid but status isn't `active`** | The event may have failed once; Stripe retries. Check **Event attempts** and hit **Resend** if needed. |
| **Wrong environment (test vs live) selected** | Check the Mode toggle at the top of Stripe Dashboard — keys are scoped per mode. |

---

## Not included in this guide (do later if needed)

- **Customer portal** (self-serve cancel / update card). Easy to add with
  `stripe.billingPortal.sessions.create`, but needs an auth flow (magic
  link by email is the usual pattern).
- **Tax collection** — enable Stripe Tax when you have real revenue and
  know your tax obligations.
- **Multiple plans / yearly** — add another Price on the same product and
  create `STRIPE_PRICE_ID_PREMIUM_YEARLY`; minor code change.
- **Refund rules** — state them on `/terms` and handle manually from the
  Stripe Dashboard.

See also: [`docs/STRIPE_LEGAL_AND_SECURITY.md`](./STRIPE_LEGAL_AND_SECURITY.md).

---

## Security properties of this integration (for your records)

- **No card data ever touches this app.** Stripe hosts Checkout; we only
  receive a redirect and a signed webhook.
- **Secrets are server-only.** `STRIPE_SECRET_KEY` and
  `STRIPE_WEBHOOK_SECRET` are read through `process.env` in server
  components / API routes; they are never exposed to the browser and
  never prefixed with `NEXT_PUBLIC_`.
- **Webhook requests are signature-verified.** `/api/stripe/webhook`
  rejects any request without a valid `stripe-signature` header matching
  `STRIPE_WEBHOOK_SECRET`. Raw body is used; body parsing middleware is
  not applied.
- **Idempotent webhook processing.** Each Stripe event id is inserted
  into `StripeProcessedEvent`; duplicate deliveries are acked without
  reprocessing.
- **Fail-safe on errors.** If downstream processing throws, the dedupe
  row is deleted so Stripe's automatic retry can legitimately re-attempt.
- **Rate limit on checkout creation.** 8 requests / 60 s per IP.
  Unknown-IP clients share a much smaller bucket (3 / 60 s) so a lack of
  proxy headers can't be exploited as a shared bypass.
- **CSP + security headers.** `next.config.ts` emits a restrictive
  Content-Security-Policy that only allows Stripe, Google (AdSense +
  Analytics), and Vercel Insights as third-party origins. HSTS, COOP,
  X-Frame-Options DENY, and a locked-down Permissions-Policy are also
  set site-wide.
- **No PII in server logs.** We log event ids, event types, and
  Stripe error codes only. We do not log emails, names, or amounts.
- **Subscription status is the DB's, not the browser's.** Premium
  entitlement is read from `PremiumSubscription` rows that are written
  exclusively by verified webhook events.
- **Generic client-facing errors.** Users see "Payments are not
  available right now" instead of internal codes / env var names.

## Going from Test to Live — checklist before flipping

- [ ] Real domain set as `NEXT_PUBLIC_SITE_URL` (must be `https://`).
- [ ] Webhook endpoint in Live mode points at the live domain.
- [ ] Three env vars updated with **Live** values in Vercel → Production.
- [ ] Redeployed after swapping values.
- [ ] Completed a real test-card transaction to confirm success page and
      DB row appear.
- [ ] Test mode keys removed from Production env (keep them on Preview
      if you want test mode for preview deployments).
- [ ] Stripe Tax reviewed (enable it before you exceed any nexus).
- [ ] Refund / cancellation policy linked from `/terms` and visible at
      checkout.
