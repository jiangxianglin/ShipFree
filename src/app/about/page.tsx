import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Ice Breaker Games",
  description:
    "Ice Breaker Games publishes facilitator-ready icebreaker activities for meetings, virtual teams, classrooms, and youth groups.",
  alternates: {
    canonical: "https://www.icebreakergames.site/about",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-4xl font-bold tracking-tight">About Ice Breaker Games</h1>
      <p className="mb-6 text-lg text-muted-foreground">
        Ice Breaker Games is an editorial site that helps facilitators, managers, teachers, and
        youth leaders pick the right icebreaker—fast—with clear rules, timing, and safety notes.
      </p>

      <section className="mb-8 space-y-4 text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">What we publish</h2>
        <p>
          We publish free activity guides and scenario pages (meetings, remote teams, youth groups,
          and “games like…” comparisons). Each guide aims to be practical enough to run in the next
          five minutes: players, time, materials, steps, variations, and facilitator scripts.
        </p>
        <p>
          Browse the{" "}
          <Link href="/games" className="font-medium text-foreground underline underline-offset-2">
            games library
          </Link>
          , start with{" "}
          <Link
            href="/virtual-icebreaker-games"
            className="font-medium text-foreground underline underline-offset-2"
          >
            virtual icebreaker games
          </Link>
          , or read the{" "}
          <Link href="/blog" className="font-medium text-foreground underline underline-offset-2">
            blog
          </Link>
          .
        </p>
      </section>

      <section className="mb-8 space-y-4 text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Editorial approach</h2>
        <p>
          Content is written and reviewed by the Ice Breaker Games editorial team with a focus on
          psychological safety, inclusion, and realistic timing for real meetings—not gimmicks.
          Where we reference research or established facilitation practice, we cite sources on the
          page.
        </p>
      </section>

      <section className="space-y-4 text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Contact</h2>
        <p>
          Questions, corrections, or partnership ideas? Visit our{" "}
          <Link
            href="/contact"
            className="font-medium text-foreground underline underline-offset-2"
          >
            contact page
          </Link>{" "}
          or email{" "}
          <a
            href="mailto:support@icebreakergames.site"
            className="font-medium text-foreground underline underline-offset-2"
          >
            support@icebreakergames.site
          </a>
          .
        </p>
      </section>
    </div>
  );
}
