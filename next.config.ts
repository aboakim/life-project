import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * Content Security Policy.
 *
 * Goals:
 *  - Block unknown-origin script execution (XSS defence in depth).
 *  - Explicitly allow the third parties we actually use:
 *      Stripe  (checkout + JS)
 *      Google  (AdSense, AdSense CMP, GA4)
 *      Vercel  (live insights / analytics)
 *  - Allow 'unsafe-inline' on style-src (Tailwind + CSS-in-JS) and on
 *    script-src (Next.js uses a few inline scripts for hydration + our
 *    own JSON-LD / Consent Mode blocks). A nonce-based CSP is possible
 *    later but breaks Next's static export and third-party loaders.
 *  - frame-src: only allow Stripe to frame us; we never want X-origin
 *    iframes embedding us.
 */
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self' https://checkout.stripe.com",
  "object-src 'none'",
  // Scripts we actually load today.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://checkout.stripe.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.googletagmanager.com https://www.google-analytics.com https://www.googletagservices.com https://va.vercel-scripts.com",
  "script-src-elem 'self' 'unsafe-inline' https://js.stripe.com https://checkout.stripe.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.googletagmanager.com https://www.google-analytics.com https://www.googletagservices.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  // AdSense serves creatives from several CDNs; allow the common ones.
  "img-src 'self' data: blob: https: *.gstatic.com *.doubleclick.net *.googlesyndication.com *.google.com *.stripe.com",
  "connect-src 'self' https://api.stripe.com https://checkout.stripe.com https://m.stripe.network https://www.google-analytics.com https://region1.google-analytics.com https://pagead2.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  // Stripe and AdSense both load pages in frames.
  "frame-src https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const baseSecurityHeaders: { key: string; value: string }[] = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // We already block all framing via CSP frame-ancestors; this header is
  // a belt-and-braces for older browsers.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(self), geolocation=(), payment=(self \"https://checkout.stripe.com\" \"https://js.stripe.com\")",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "Content-Security-Policy", value: CSP },
];

if (isProd) {
  baseSecurityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  });
}

const nextConfig: NextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  experimental: {
    optimizePackageImports: [
      "@vercel/analytics",
      "@vercel/speed-insights",
    ],
  },
  /** Wrong slug from an old example URL → canonical post slug. */
  async redirects() {
    return [
      {
        source:
          "/blog/how-to-decide-to-leave-a-stable-job-for-something-risky",
        destination: "/blog/how-to-decide-to-leave-a-stable-job",
        permanent: true,
      },
    ];
  },
  images: {
    /** Longer CDN cache for optimized derivatives (repeat visits / PSI cache audit). */
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      // Default: apply all security headers including CSP.
      {
        source: "/((?!api/stripe/webhook).*)",
        headers: baseSecurityHeaders,
      },
      // Stripe webhook endpoint: only keep the minimum. CSP on a POST
      // endpoint is meaningless and adding headers can interfere with
      // debugging raw-body signature verification.
      {
        source: "/api/stripe/webhook",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
};

export default nextConfig;
