import type { Metadata, Viewport } from "next";
import Script from "next/script";
import {
  Geist,
  Geist_Mono,
  Noto_Sans,
  Noto_Sans_Armenian,
  Noto_Sans_Arabic,
  Outfit,
} from "next/font/google";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SiteJsonLd from "@/components/SiteJsonLd";
import ConsentBanner from "@/components/ConsentBanner";
import SkipToContent from "@/components/SkipToContent";
import DeferredVercelMetrics from "@/components/DeferredVercelMetrics";
import LocaleRefreshBridge from "@/components/LocaleRefreshBridge";
import { isRtlLocale } from "@/lib/i18n/locale";
import { getServerPageLocale } from "@/lib/i18n/trust-pages/server-locale";
import { getMetadataBase } from "@/lib/site-url";
import "./globals.css";

/** Must match the snippet in Google AdSense → Site → Verify (same ca-pub-…). */
const ADSENSE_CLIENT = "ca-pub-3541461663112540";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  adjustFontFallback: true,
});

/** Display: variable file only (avoids 5 static weight files). */
const displaySans = Outfit({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

const notoArmenian = Noto_Sans_Armenian({
  variable: "--font-arm",
  subsets: ["armenian"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-ar",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "Life Decision Engine — Stop overthinking. Decide in seconds.",
    template: "%s | Life Decision Engine",
  },
  description:
    "Big life decisions, clearer — lifedecisions.space. AI scenarios (not random chat); private sessions, structured frameworks, experts optional.",
  applicationName: "Life Decision Engine",
  authors: [{ name: "Life Decision Engine Editorial Team" }],
  creator: "Life Decision Engine",
  publisher: "Life Decision Engine",
  category: "decision-making, self-help, finance, careers, psychology",
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      "en-US": "/",
    },
  },
  /**
   * Favicons: Google Search uses a site icon next to the title. Minimum 48×48
   * (we list 48 first). `shortcut` helps legacy crawlers; keep in sync with /public.
   * @see https://developers.google.com/search/docs/appearance/favicon-in-search
   */
  icons: {
    icon: [
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  keywords: [
    "life decisions",
    "lifedecisions",
    "decision analysis",
    "AI coaching",
    "relocation decision",
    "career decision",
    "psychologist online",
    "legal advice directory",
    "financial advisor",
    "United States",
  ],
  openGraph: {
    title: "Life Decision Engine — Stop overthinking. Decide in seconds.",
    description:
      "Big life decisions, clearer — lifedecisions.space. AI scenarios (not random chat); private sessions, structured frameworks, experts optional.",
    type: "website",
    url: "/",
    locale: "en_US",
    siteName: "Life Decision Engine",
  },
  twitter: {
    card: "summary_large_image",
    title: "Life Decision Engine — Stop overthinking. Decide in seconds.",
    description:
      "Big life decisions, clearer — lifedecisions.space. AI scenarios (not random chat); private sessions, structured frameworks, experts optional.",
  },
  other: {
    "google-adsense-account": ADSENSE_CLIENT,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerPageLocale();
  const dir = isRtlLocale(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        {/*
          Google Consent Mode v2 default: denied for all ad/analytics storage
          until the user actively accepts via <ConsentBanner />.
          This MUST execute before any gtag / AdSense script so it takes effect
          for the very first pageview. GA4 loader in GoogleAnalytics.tsx also
          re-pushes the same defaults as a safety net.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: [
              "window.dataLayer = window.dataLayer || [];",
              "function gtag(){dataLayer.push(arguments);}",
              "window.gtag = window.gtag || gtag;",
              "gtag('consent','default',{",
              "  ad_storage:'denied',",
              "  ad_user_data:'denied',",
              "  ad_personalization:'denied',",
              "  analytics_storage:'denied',",
              "  wait_for_update: 500",
              "});",
            ].join(""),
          }}
        />
      </head>
      <body
        className={`${displaySans.variable} ${geistSans.variable} ${geistMono.variable} ${notoArmenian.variable} ${notoSans.variable} ${notoArabic.variable} font-sans text-base leading-relaxed antialiased md:text-[1.0625rem] lg:text-[1.125rem]`}
      >
        {/*
          Site-wide AdSense bootstrap (matches AdSense → Verify code snippet).
          lazyOnload: after load + idle-friendly; Consent default in <head>
          runs first. ensureAdsbygoogleScript skips if this tag already exists.
        */}
        <Script
          id="adsense-adsbygoogle"
          strategy="lazyOnload"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT)}`}
          crossOrigin="anonymous"
        />
        <SkipToContent />
        <SiteJsonLd />
        <LocaleRefreshBridge />
        <GlobalNav />
        {children}
        <GlobalFooter />
        <ConsentBanner />
        <GoogleAnalytics />
        <DeferredVercelMetrics />
      </body>
    </html>
  );
}
