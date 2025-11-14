import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import type React from "react"; // Import React
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.icebreakergames.site"),
  title: "Ice Breaker Games",
  description:
    "Discover the best ice breaker games for team building, virtual meetings, classrooms, and more. Find the perfect activity for your group.",
  keywords: [
    "ice breaker games",
    "team building activities",
    "virtual icebreakers",
    "classroom games",
    "conference activities",
    "training games",
  ],
  alternates: {
    canonical: "https://www.icebreakergames.site",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D5XT9FCNRG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D5XT9FCNRG');
          `}
        </Script>
      </head>
      <body
        className={cn(
          bricolageGrotesque.className,
          "antialiased flex flex-col min-h-screen"
        )}
      >
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
