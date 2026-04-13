import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans,
  Noto_Sans_Armenian,
  Noto_Sans_Arabic,
} from "next/font/google";
import GlobalNav from "@/components/GlobalNav";
import AnalyticsGate from "@/components/AnalyticsGate";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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

export const metadata: Metadata = {
  title: {
    default:
      "Life Decision Engine — AI decision analysis for big life choices (USA & worldwide)",
    template: "%s | Life Decision Engine",
  },
  description:
    "Structured AI analysis for career, relocation, relationships: scenarios, risks, timelines, and a score—plus a global network of psychologists, lawyers, and financial professionals. Not generic chat.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoArmenian.variable} ${notoSans.variable} ${notoArabic.variable} font-sans`}
      >
        <GlobalNav />
        {children}
        <AnalyticsGate />
      </body>
    </html>
  );
}
