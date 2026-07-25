import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Ice Breaker Games",
  description:
    "Contact the Ice Breaker Games editorial team for corrections, facilitation questions, or partnership inquiries.",
  alternates: {
    canonical: "https://www.icebreakergames.site/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-4xl font-bold tracking-tight">Contact</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        We read every message. Use email for corrections, content suggestions, or partnership
        inquiries.
      </p>

      <section className="mb-8 space-y-3 text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Email</h2>
        <p>
          <a
            href="mailto:support@icebreakergames.site"
            className="text-lg font-semibold text-foreground underline underline-offset-2"
          >
            support@icebreakergames.site
          </a>
        </p>
        <p className="text-sm">
          Typical topics: broken links, rule clarifications, accessibility feedback, and guest
          contributions.
        </p>
      </section>

      <section className="mb-8 space-y-3 text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Site</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link href="/about" className="font-medium text-foreground underline underline-offset-2">
              About Ice Breaker Games
            </Link>
          </li>
          <li>
            <Link
              href="/privacy-policy"
              className="font-medium text-foreground underline underline-offset-2"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/tos" className="font-medium text-foreground underline underline-offset-2">
              Terms of Service
            </Link>
          </li>
        </ul>
      </section>

      <p className="text-sm text-muted-foreground">
        Website:{" "}
        <a
          href="https://www.icebreakergames.site"
          className="underline underline-offset-2"
        >
          https://www.icebreakergames.site
        </a>
      </p>
    </div>
  );
}
