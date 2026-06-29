import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

const title = "Icebreaker Games for Meetings | Quick, Low-Pressure Openers";
const description =
  "Icebreaker games for meetings that are quick, practical, and not cringe. Use these 3–10 minute openers to build rapport and focus, with step-by-step rules.";
const canonical = "https://www.icebreakergames.site/icebreaker-games-for-meetings";

function uniqBySlug<T extends { slug: string }>(items: T[]) {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    if (seen.has(item.slug)) continue;
    seen.add(item.slug);
    result.push(item);
  }
  return result;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      siteName: "Ice Breaker Games",
      images: [
        {
          url: "https://www.icebreakergames.site/img/Hero.png",
          width: 1200,
          height: 630,
          alt: "Icebreaker games for meetings",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.icebreakergames.site/img/Hero.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function IcebreakerGamesForMeetingsPage() {
  const games = await getAllGames();

  const curatedSlugs = [
    "one-word-check-in",
    "weather-check-in",
    "emoji-check-in",
    "this-or-that-questions",
    "the-check-in",
    "what-are-you-bringing-to-the-meeting",
    "six-word-memoirs",
    "common-ground",
    "topics-tables",
    "desert-island",
    "the-question-web",
  ];

  const curated = curatedSlugs
    .map((slug) => games.find((g) => g.slug === slug))
    .filter(Boolean);

  const fillers = games
    .filter((g) => !curatedSlugs.includes(g.slug))
    .filter((g) => ["Training", "Team Building", "Virtual Meeting"].includes(g.category))
    .slice(0, 12);

  const picks = uniqBySlug([...curated, ...fillers]).slice(0, 18);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are good icebreaker games for meetings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Good meeting icebreakers are short, inclusive, and easy to explain. Try One Word Check-In, Weather Check-In, Emoji Check-In, or This or That Questions to get everyone participating quickly.",
        },
      },
      {
        "@type": "Question",
        name: "How long should a meeting icebreaker take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most meeting icebreakers should take 3–10 minutes. For recurring meetings, keep it closer to 3–5 minutes. For workshops, you can extend to 10–15 minutes if it supports the agenda.",
        },
      },
      {
        "@type": "Question",
        name: "What are icebreakers that work for shy or introverted people?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use predictable, low-pressure formats like One Word Check-In, writing-first prompts, or chat-based answers. Keep questions optional and avoid putting anyone on the spot.",
        },
      },
      {
        "@type": "Question",
        name: "What is a good icebreaker question for a meeting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Try a single, safe prompt like: \"One word for your focus today\", \"What is one small win from this week?\", or \"What is one thing you want to leave this meeting with?\" Keep it short and relevant.",
        },
      },
      {
        "@type": "Question",
        name: "Can meeting icebreakers be used online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. For online meetings, use chat-based check-ins, simple polls, or short sharing activities. Chat formats scale better for large groups and reduce pressure.",
        },
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: ["https://www.icebreakergames.site/img/Hero.png"],
    author: {
      "@type": "Organization",
      name: "Ice Breaker Games",
    },
    publisher: {
      "@type": "Organization",
      name: "Ice Breaker Games",
      logo: {
        "@type": "ImageObject",
        url: "https://www.icebreakergames.site/img/Hero.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <Link
            href="/games"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Browse all games
          </Link>
          <Link
            href="/best-icebreaker-games"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Best icebreaker games
          </Link>
          <Link
            href="/icebreaker-games-for-work"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Icebreakers for work
          </Link>
        </div>

        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground">
            Use these meeting icebreakers to reduce awkwardness, raise energy, and help the group arrive. The best choices are short,
            structured, and optional—so everyone can participate comfortably.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Meeting-Friendly Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {picks.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.slug}`}
                className="block rounded-xl border bg-card p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-lg font-semibold truncate">{game.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {game.description}
                    </div>
                  </div>
                  <div className="shrink-0 text-xs text-muted-foreground">{game.category}</div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {game.players && <span className="bg-secondary px-2 py-1 rounded">👥 {game.players}</span>}
                  {game.duration && <span className="bg-secondary px-2 py-1 rounded">⏱️ {game.duration}</span>}
                  {game.difficulty && <span className="bg-secondary px-2 py-1 rounded">📊 {game.difficulty}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="prose max-w-none">
          <h2>How to choose the right meeting icebreaker</h2>
          <p>
            For short meetings, use a check-in style prompt (one word, emoji, or weather). For workshops, choose an activity that primes the
            group for the session goal (connection, collaboration, or creativity). Always time-box it and keep the instructions simple.
          </p>
          <p>
            <Link href="/games" className="font-semibold">
              Browse and filter all icebreaker games
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
