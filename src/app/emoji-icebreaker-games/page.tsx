import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

const title = "Emoji Icebreaker Games and Check-In Activities for Meetings";
const description =
  "Use emoji icebreaker games for quick meeting check-ins, remote team warmups, classrooms, and low-pressure introductions. Includes prompts, rules, and facilitation tips.";
const canonical = "https://www.icebreakergames.site/emoji-icebreaker-games";

const targetSlugs = [
  "emoji-introduction",
  "emoji-check-in",
  "chat-waterfall",
  "one-word-check-in",
  "virtual-background-story",
  "this-or-that-questions",
  "picture-sharing",
  "storytelling-circle",
];

const promptGroups = [
  {
    title: "Quick emoji check-in prompts",
    prompts: [
      "Choose one emoji for your energy level today.",
      "Pick an emoji that describes your week so far.",
      "Share one emoji for what you need from this meeting.",
      "Choose an emoji for your current focus mode.",
    ],
  },
  {
    title: "Emoji introduction prompts",
    prompts: [
      "Pick three emojis that tell us something about you.",
      "Choose one emoji for your role, one for your hobby, and one for your mood.",
      "Share an emoji that represents a small win from this week.",
      "Choose an emoji for a place you would like to visit.",
    ],
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    alternates: { canonical },
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
          alt: "Emoji icebreaker games for meetings and remote teams",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.icebreakergames.site/img/Hero.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function EmojiIcebreakerGamesPage() {
  const games = await getAllGames();
  const featured = targetSlugs
    .map((slug) => games.find((game) => game.slug === slug))
    .filter(Boolean);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are emoji icebreaker games?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Emoji icebreaker games are short activities where participants use emojis to introduce themselves, show mood, answer prompts, or react to a question. They work especially well for remote meetings because everyone can join through chat or reactions.",
        },
      },
      {
        "@type": "Question",
        name: "What is a good emoji check-in prompt?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A simple prompt is: Choose one emoji that describes your energy today. It is fast, low-pressure, and gives the facilitator a quick read on the room.",
        },
      },
      {
        "@type": "Question",
        name: "Are emoji icebreakers good for remote teams?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Emoji icebreakers are remote-friendly because they are visual, quick, and easy to answer in chat. They reduce pressure for people who do not want to speak first.",
        },
      },
      {
        "@type": "Question",
        name: "How long should an emoji icebreaker take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most emoji icebreakers should take 3 to 8 minutes. Use one emoji per person for large groups, and allow short explanations only when time permits.",
        },
      },
      {
        "@type": "Question",
        name: "How do you make emoji icebreakers inclusive?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Let people pass, offer text alternatives, avoid prompts that require personal disclosure, and explain that there is no correct emoji. Keep workplace prompts light and optional.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8">
          <Link href="/games" className="text-sm text-muted-foreground hover:text-foreground">
            ← Browse all icebreaker games
          </Link>
        </div>

        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Emoji icebreaker cluster
          </p>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="text-lg text-muted-foreground">
            Emoji icebreakers are quick, visual activities where people answer with emojis before sharing a short explanation. They are ideal for virtual meetings, classrooms, and low-pressure team warmups because everyone can participate in chat, reactions, or a shared board.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/games/emoji-introduction" className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
              Start with Emoji Introduction
            </Link>
            <Link href="/games/emoji-check-in" className="rounded-xl border px-4 py-2.5 text-sm font-semibold hover:bg-muted">
              Try Emoji Check-In
            </Link>
            <Link href="/virtual-icebreaker-games" className="rounded-xl border px-4 py-2.5 text-sm font-semibold hover:bg-muted">
              Browse virtual icebreakers
            </Link>
          </div>
        </header>

        <section className="mb-10 rounded-2xl border bg-emerald-50 p-6 dark:bg-emerald-950/20">
          <h2 className="mb-4 text-2xl font-semibold">Best games for this situation</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/games/emoji-check-in" className="rounded-xl bg-white p-4 shadow-sm hover:shadow-md dark:bg-gray-950">
              <h3 className="font-semibold">Fast mood check</h3>
              <p className="mt-1 text-sm text-muted-foreground">Use Emoji Check-In when you have 3–5 minutes and need a quick read on the room.</p>
            </Link>
            <Link href="/games/emoji-introduction" className="rounded-xl bg-white p-4 shadow-sm hover:shadow-md dark:bg-gray-950">
              <h3 className="font-semibold">New group introductions</h3>
              <p className="mt-1 text-sm text-muted-foreground">Use Emoji Introduction when people need a playful, low-pressure way to share about themselves.</p>
            </Link>
            <Link href="/games/chat-waterfall" className="rounded-xl bg-white p-4 shadow-sm hover:shadow-md dark:bg-gray-950">
              <h3 className="font-semibold">Large remote groups</h3>
              <p className="mt-1 text-sm text-muted-foreground">Use Chat Waterfall when you want everyone to participate at once without long speaking turns.</p>
            </Link>
          </div>
        </section>

        <section className="mb-10 rounded-2xl border bg-card p-6">
          <h2 className="mb-3 text-2xl font-semibold">When to use emoji icebreakers</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h3 className="font-semibold">Best for</h3>
              <p className="text-sm text-muted-foreground">Remote meetings, quick check-ins, new groups, classrooms, and hybrid teams.</p>
            </div>
            <div>
              <h3 className="font-semibold">Time</h3>
              <p className="text-sm text-muted-foreground">3–8 minutes for most teams; 10–15 minutes if people explain their choices.</p>
            </div>
            <div>
              <h3 className="font-semibold">Avoid when</h3>
              <p className="text-sm text-muted-foreground">The topic requires deep discussion, accessibility alternatives are unavailable, or the group dislikes chat-based activities.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">Best emoji icebreaker games</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((game) => (
              <Link key={game.id} href={`/games/${game.slug}`} className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow">
                <div className="text-lg font-semibold">{game.title}</div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{game.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {game.players && <span className="rounded bg-secondary px-2 py-1">{game.players}</span>}
                  {game.duration && <span className="rounded bg-secondary px-2 py-1">{game.duration}</span>}
                  {game.difficulty && <span className="rounded bg-secondary px-2 py-1">{game.difficulty}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="prose max-w-none mb-10">
          <h2>How to run an emoji check-in</h2>
          <ol>
            <li>Choose one clear prompt and post it where everyone can see it.</li>
            <li>Ask participants to answer with one emoji in chat, reactions, or a shared doc.</li>
            <li>Invite a few optional explanations, starting with volunteers.</li>
            <li>Reflect back useful themes without putting anyone on the spot.</li>
            <li>Transition to the meeting purpose: energy, focus, or connection.</li>
          </ol>

          <h2>Facilitator notes</h2>
          <p>
            Keep the prompt simple and give people permission to pass. For remote teams, chat-first participation helps introverted participants join without being called on. If emojis may not display consistently, allow short words as an alternative.
          </p>
        </section>

        <section className="mb-10 grid gap-4 md:grid-cols-2">
          {promptGroups.map((group) => (
            <div key={group.title} className="rounded-xl border bg-card p-5">
              <h2 className="mb-3 text-xl font-semibold">{group.title}</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {group.prompts.map((prompt) => <li key={prompt}>• {prompt}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section className="prose max-w-none">
          <h2>Related icebreaker guides</h2>
          <p>
            Continue with <Link href="/games/emoji-introduction">Emoji Introduction</Link>, <Link href="/games/emoji-check-in">Emoji Check-In</Link>, <Link href="/virtual-icebreaker-games">Virtual Icebreaker Games</Link>, or <Link href="/icebreaker-games-for-meetings">Icebreaker Games for Meetings</Link>.
          </p>
        </section>
      </main>
    </>
  );
}
