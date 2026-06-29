import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

const title = "Icebreaker Games for Work | Quick Team Activities for Meetings";
const description =
  "Practical icebreaker games for work meetings, workshops, and team building. Quick picks by time and group size, with step-by-step rules and facilitation tips.";
const canonical = "https://www.icebreakergames.site/icebreaker-games-for-work";

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
          alt: "Icebreaker games for work meetings and teams",
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

export default async function IcebreakerGamesForWorkPage() {
  const games = await getAllGames();

  const curatedSlugs = [
    "one-word-check-in",
    "emoji-check-in",
    "this-or-that-questions",
    "common-ground",
    "two-truths-and-a-lie",
    "speed-networking",
    "chat-waterfall",
    "find-your-match",
    "passions-tic-tac-toe",
    "the-question-web",
    "team-superpower-collage",
    "minefield",
  ];

  const curated = curatedSlugs
    .map((slug) => games.find((g) => g.slug === slug))
    .filter(Boolean);

  const fillers = games
    .filter((g) => !curatedSlugs.includes(g.slug))
    .filter((g) => ["Team Building", "Training", "Virtual Meeting", "Conference"].includes(g.category))
    .slice(0, 10);

  const picks = uniqBySlug([...curated, ...fillers]).slice(0, 16);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are good icebreaker games for work meetings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Good icebreaker games for work are time-boxed, inclusive, and easy to explain. Try One Word Check-In, Emoji Check-In, This or That Questions, Common Ground, or a short round of Two Truths and a Lie.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best icebreaker for a new team at work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For a new work team, choose a low-pressure activity that helps people learn names and find shared interests. Common Ground and Two Truths and a Lie are reliable choices. Keep prompts professional and optional.",
        },
      },
      {
        "@type": "Question",
        name: "How long should an icebreaker be in a meeting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most work meetings benefit from a 3–10 minute icebreaker. Use quick check-ins for routine meetings and longer activities (10–15 minutes) for workshops or offsites.",
        },
      },
      {
        "@type": "Question",
        name: "Are icebreakers appropriate for professional settings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, when framed correctly. Choose prompts that respect privacy, avoid overly personal topics, and connect to the meeting goal (energy, connection, or collaboration). Give people the option to pass.",
        },
      },
      {
        "@type": "Question",
        name: "What icebreakers work for remote teams?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Remote teams do well with chat-based or reaction-based games like Chat Waterfall, Emoji Check-In, and Emoji Introduction. These formats make it easy for everyone to participate at the same time.",
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
        </div>

        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground">
            Use these work-friendly icebreaker games to start meetings smoothly, energize workshops, and build trust without forcing anyone to overshare.
            Each activity includes clear steps so you can facilitate in minutes.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Work-Friendly Picks</h2>
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
          <h2>How to run work icebreakers without making it awkward</h2>
          <p>
            Keep the framing professional: explain the purpose (warm up, connect, or shift energy), set a time limit, and offer an easy pass option.
            Use prompts that are light, relevant, and inclusive across cultures and roles.
          </p>
          <p>
            For recurring meetings, rotate between quick check-ins and short get-to-know activities. For workshops, pick games that lead into your agenda
            (communication games before collaboration, reflection prompts before retrospectives).
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
