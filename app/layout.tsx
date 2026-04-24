import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans,
  Noto_Sans_Armenian,
  Noto_Sans_Arabic,
  Outfit,
} from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";
import AnalyticsGate from "@/components/AnalyticsGate";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SiteJsonLd from "@/components/SiteJsonLd";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConsentBanner from "@/components/ConsentBanner";
import SkipToContent from "@/components/SkipToContent";
import { getMetadataBase } from "@/lib/site-url";
import "./globals.css";

/** Must match the snippet in Google AdSense → Site → Verify (same ca-pub-…). */
const ADSENSE_CLIENT = "ca-pub-3541461663112540";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/** Display / marketing headings — modern geometric, pairs with Geist for UI body. */
const displaySans = Outfit({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoArmenian = Noto_Sans_Armenian({
  variable: "--font-arm",
  subsets: ["armenian"],
  weight: ["400", "500", "600", "700"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-ar",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
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
    "Structured AI analysis for career, relocation, relationships: scenarios, risks, timelines, and a score—plus a global network of psychologists, lawyers, and financial professionals. Not generic chat.",
  applicationName: "Life Decision Engine",
  authors: [{ name: "Life Decision Engine Editorial Team" }],
  creator: "Life Decision Engine",
  publisher: "Life Decision Engine",
  category: "decision-making, self-help, finance, careers, psychology",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
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
        {/* Google AdSense: async + crossorigin="anonymous" — respects Consent Mode defaults above. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
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
        <AnalyticsGate />
        <GoogleAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
