# Stripe — security and legal basics

This document summarizes how this project handles payments and what **you** must still do as a business before going live. It is **not** legal advice.

## Security (technical)

- **Card data never touches your server.** Checkout is hosted by Stripe; your app receives only a redirect back. That typically maps to PCI **SAQ A** eligibility (confirm with Stripe / your auditor).
- **Secrets stay server-side.** `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` must only exist in server environment variables (e.g. Vercel). Never put them in `NEXT_PUBLIC_*` or client code.
- **Webhooks are verified.** `/api/stripe/webhook` uses `stripe-signature` + `STRIPE_WEBHOOK_SECRET`. Forged requests without a valid signature are rejected.
- **Idempotency.** Stripe event IDs are stored (`StripeProcessedEvent`) so duplicate deliveries do not double-apply logic.
- **Source of truth.** Premium status in the database is updated from webhooks, not from the browser.
- **Rate limiting.** Checkout session creation is limited per IP (in-memory; use Redis/Upstash at scale).

## Legal / compliance (business)

You should:

- Publish **Terms of Service**, **Privacy Policy**, and (where required) **refund / subscription cancellation** terms.
- Comply with **consumer protection** rules in the countries where you sell (EU, US state laws, etc.).
- Use Stripe’s **tax** tools where applicable (e.g. Stripe Tax) or obtain professional tax advice.
- If you process EU/UK personal data, document GDPR roles (you are usually **controller**, Stripe is **processor**) and sign Stripe’s DPA in the Dashboard.
- For regulated advice (health, legal, financial), ensure your product marketing does not promise licensed services unless you provide them lawfully.

## Operations

- Use **test mode** keys until you are ready; switch to **live** keys only in production.
- Rotate keys if they leak; Stripe Dashboard allows rolling keys.
- Monitor Stripe Dashboard for disputes and failed payments.
