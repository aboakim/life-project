import type { Metadata, Viewport } from "next";
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
import { getMetadataBase } from "@/lib/site-url";
import "./globals.css";

/** Must match the snippet in Google AdSense → Site → Verify (same ca-pub-…). */
const ADSENSE_CLIENT = "ca-pub-3541461663112540";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/** Display: variable file only (avoids 5 static weight files). */
const displaySans = Outfit({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
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
    default:
      "Life Decision Engine — AI decision analysis for big life choices (USA & worldwide)",
    template: "%s | Life Decision Engine",
  },
  description:
    "Stop overthinking. Get instant AI scenarios for big life decisions—6 months to 5 years out. Private by design; talk to a pro only if you want. Not generic chat.",
  applicationName: "Life Decision Engine",
  authors: [{ name: "Life Decision Engine Editorial Team" }],
  creator: "Life Decision Engine",
  publisher: "Life Decision Engine",
  category: "decision-making, self-help, finance, careers, psychology",
  alternates: { canonical: "/" },
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
    title: "Life Decision Engine — structured AI for major life decisions",
    description:
      "Best/worst/likely scenarios, finance & psychology lenses, 6-month to 5-year view, decision score. Experts worldwide.",
    type: "website",
    locale: "en_US",
    siteName: "Life Decision Engine",
  },
  twitter: {
    card: "summary_large_image",
    title: "Life Decision Engine — AI + global expert network",
    description:
      "Make big decisions with scenarios, risk lenses, and optional human experts.",
  },
  other: {
    "google-adsense-account": ADSENSE_CLIENT,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
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
        {/*
          AdSense loader is injected client-side only when <AdSenseBanner /> mounts
          (idle-scheduled) — avoids loading ~200KB+ ad JS on pages with no ad slot.
          Publisher id remains in metadata.other["google-adsense-account"] for verification.
        */}
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${displaySans.variable} ${geistSans.variable} ${geistMono.variable} ${notoArmenian.variable} ${notoSans.variable} ${notoArabic.variable} font-sans text-base leading-relaxed antialiased md:text-[1.0625rem] lg:text-[1.125rem]`}
      >
        <SkipToContent />
        <SiteJsonLd />
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
