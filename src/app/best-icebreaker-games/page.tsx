import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

const title = "Best Icebreaker Games (Free) | Team Building, Meetings & Virtual";
const description =
  "Explore the best icebreaker games for work, team building, meetings, and virtual sessions. Fast, facilitator-friendly picks with players, time, and step-by-step rules.";
const canonical = "https://www.icebreakergames.site/best-icebreaker-games";

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
          alt: "Best icebreaker games for teams and meetings",
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

export default async function BestIcebreakerGamesPage() {
  const games = await getAllGames();

  const curatedSlugs = [
    "human-bingo",
    "two-truths-and-a-lie",
    "find-your-match",
    "common-ground",
    "speed-networking",
    "emoji-check-in",
    "emoji-introduction",
    "chat-waterfall",
    "this-or-that-questions",
    "one-word-check-in",
    "one-word-at-a-time",
    "10-things-in-common",
  ];

  const curated = curatedSlugs
    .map((slug) => games.find((g) => g.slug === slug))
    .filter(Boolean);

  const fillers = games
    .filter((g) => !curatedSlugs.includes(g.slug))
    .slice(0, 12);

  const topPicks = uniqBySlug([...curated, ...fillers]).slice(0, 18);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are the best icebreaker games for teams at work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best icebreaker games for work teams are simple to explain, inclusive, and time-boxed. Good options include Human Bingo, Two Truths and a Lie, One Word Check-In, This or That Questions, and Common Ground.",
        },
      },
      {
        "@type": "Question",
        name: "What is a good 5-minute icebreaker game?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Try One Word Check-In, Emoji Check-In, or a quick This or That round. These activities are easy to run, require no materials, and quickly get everyone participating.",
        },
      },
      {
        "@type": "Question",
        name: "What are the best icebreakers for a new group?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For new groups, use low-pressure name and get-to-know formats like the Alliterative Name Game, Two Truths and a Lie, or Common Ground. Keep the prompts light and avoid anything too personal.",
        },
      },
      {
        "@type": "Question",
        name: "What icebreaker games work well for virtual meetings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Virtual-friendly icebreakers include Chat Waterfall, Emoji Introduction, Emoji Check-In, and Virtual Background Story. They use chat, reactions, or simple sharing so everyone can join in quickly.",
        },
      },
      {
        "@type": "Question",
        name: "How do I choose the best icebreaker game?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Choose based on group size, time available, how well people know each other, and your meeting goal (energy, connection, or discussion). Prefer activities with clear steps and a time limit.",
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
        <div className="mb-8">
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
        </div>

        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground">
            This curated list focuses on icebreaker games that work in real groups: easy to explain, inclusive, and time-boxed.
            Each pick links to step-by-step rules so you can facilitate with confidence.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Top Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topPicks.map((game) => (
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
          <h2>How to choose the best icebreaker games</h2>
          <p>
            Start by choosing an activity that matches your time, group size, and comfort level. For professional settings,
            prefer prompts that are light and optional. For large groups, pick games that scale and avoid long turns.
          </p>
          <p>
            If you want a faster way to browse, use the filters on the main games page to narrow by time, difficulty, and type.
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
