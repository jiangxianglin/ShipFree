import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

const title = "Virtual Icebreaker Games | Easy Online Meeting Activities";
const description =
  "Virtual icebreaker games for Zoom, Teams, and online meetings. Fast, inclusive activities with clear steps, time estimates, and facilitator tips.";
const canonical = "https://www.icebreakergames.site/virtual-icebreaker-games";

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
          alt: "Virtual icebreaker games for online meetings",
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

export default async function VirtualIcebreakerGamesPage() {
  const games = await getAllGames();

  const curatedSlugs = [
    "chat-waterfall",
    "emoji-check-in",
    "emoji-introduction",
    "virtual-background-story",
    "take-a-picture-of-your-shoes",
    "picture-sharing",
    "telephone-charades",
    "this-or-that-questions",
    "one-word-check-in",
    "weather-check-in",
    "share-a-favorite-holiday-memory",
  ];

  const curated = curatedSlugs
    .map((slug) => games.find((g) => g.slug === slug))
    .filter(Boolean);

  const fillers = games
    .filter((g) => !curatedSlugs.includes(g.slug))
    .filter((g) => g.category === "Virtual Meeting")
    .slice(0, 12);

  const picks = uniqBySlug([...curated, ...fillers]).slice(0, 18);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are good virtual icebreaker games for Zoom or Teams?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Good virtual icebreaker games are fast, inclusive, and easy to run in chat or on camera. Try Chat Waterfall, Emoji Check-In, Emoji Introduction, Virtual Background Story, or Take a Picture of Your Shoes.",
        },
      },
      {
        "@type": "Question",
        name: "What is a quick 5-minute virtual icebreaker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Emoji Check-In or One Word Check-In usually takes 3–5 minutes. Ask a single prompt, collect answers in chat, and then summarize the overall mood or themes.",
        },
      },
      {
        "@type": "Question",
        name: "How do you make virtual icebreakers not awkward?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Set a clear purpose, keep it short, give people an easy pass option, and use prompts that are light and optional. Prefer simultaneous formats (chat) for large groups to reduce pressure.",
        },
      },
      {
        "@type": "Question",
        name: "What virtual icebreakers work for large groups?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For large groups, use activities that scale: chat-based rounds like Chat Waterfall, Emoji Check-In, or quick polls. Avoid long turn-taking.",
        },
      },
      {
        "@type": "Question",
        name: "Do virtual icebreaker games need special tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not usually. Most virtual icebreakers only require video + chat (Zoom, Teams, Meet). Some variations can use a shared whiteboard, but it is optional.",
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
            These virtual icebreaker games work well for online meetings because they are simple, inclusive, and easy to facilitate
            using chat, reactions, and quick sharing. Looking for something specific? Try{" "}
            <Link href="/short-virtual-icebreakers" className="font-semibold text-foreground underline-offset-2 hover:underline">
              short virtual icebreakers / 5 minute ice breakers for virtual meetings
            </Link>{" "}
            or{" "}
            <Link href="/riddle-icebreakers-for-virtual-meetings" className="font-semibold text-foreground underline-offset-2 hover:underline">
              riddle icebreakers for virtual meetings
            </Link>
            .
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Virtual-Friendly Picks</h2>
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
          <h2>Tips for facilitating virtual icebreakers</h2>
          <p>
            Keep it short and predictable. Use chat-based answers for large groups, time-box the activity, and ask a single clear prompt.
            If the meeting is formal, avoid overly personal questions and give people an easy pass option.
          </p>
          <p>
            Need a curated shortlist? Start with{" "}
            <Link href="/short-virtual-icebreakers">short virtual icebreakers</Link> for five-minute warm-ups, or{" "}
            <Link href="/riddle-icebreakers-for-virtual-meetings">riddle icebreakers for virtual meetings</Link> when you want puzzle energy.
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
