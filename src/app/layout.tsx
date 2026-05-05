import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import type React from "react"; // Import React
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/Navigation";
import { HomeToolbarBanner } from "@/components/HomeToolbarBanner";
import { Footer } from "@/components/Footer";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

const GOOGLE_ANALYTICS_ID = "G-D5XT9FCNRG";
const GOOGLE_ADSENSE_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.icebreakergames.site"),
  title: "Ice Breaker Games",
  description:
    "Discover the best ice breaker games for team building, virtual meetings, classrooms, and more. Find the perfect activity for your group.",
  alternates: {
    canonical: "https://www.icebreakergames.site",
  },
  icons: {
    icon: [
      { url: "/icon", sizes: "32x32", type: "image/png" },
      { url: "/icon", sizes: "any", type: "image/png" },
    ],
    shortcut: "/icon",
    apple: "/apple-icon",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.icebreakergames.site",
    siteName: "Ice Breaker Games",
    title: "Ice Breaker Games - Find the Perfect Activity for Your Team",
    description:
      "Discover the best ice breaker games for team building, virtual meetings, classrooms, and more. Find the perfect activity for your group.",
    images: [
      {
        url: "/img/Hero.png",
        width: 1200,
        height: 630,
        alt: "Ice Breaker Games - Team Building Activities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ice Breaker Games - Find the Perfect Activity for Your Team",
    description:
      "Discover the best ice breaker games for team building, virtual meetings, classrooms, and more. Find the perfect activity for your group.",
    images: ["/img/Hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon" sizes="32x32" type="image/png" />
        <link rel="shortcut icon" href="/icon" />
        <link rel="apple-touch-icon" href="/apple-icon" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
        {GOOGLE_ADSENSE_ID ? (
          <Script
            id="google-adsense"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADSENSE_ID}`}
          />
        ) : null}
      </head>
      <body
        className={cn(
          bricolageGrotesque.className,
          "antialiased flex flex-col min-h-screen"
        )}
      >
        <Navigation />
        <HomeToolbarBanner />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
