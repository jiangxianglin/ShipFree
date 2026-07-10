import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

const title = "Name Game Icebreakers: Fun Name Games for Groups and Students";
const description =
  "Find name game icebreakers for students, teams, teens, and large groups. Includes how to play The Name Game, examples, variations, and facilitation tips.";
const canonical = "https://www.icebreakergames.site/name-game-icebreakers";

const targetSlugs = [
  "the-name-game",
  "blind-name-tag",
  "alliterative-name-game",
  "motion-name-game",
  "crossword-names",
  "wheel-of-fortune-introductions",
  "find-your-match",
  "human-bingo",
];

const comparisonRows = [
  ["The Name Game", "New groups", "5–10 min", "Low"],
  ["Alliterative Name Game", "Students and workshops", "5–12 min", "Medium"],
  ["Motion Name Game", "High-energy groups", "8–15 min", "High"],
  ["Blind Name Tag", "Playful adult groups", "10–15 min", "Medium"],
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
          alt: "Name game icebreakers for students and groups",
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

export default async function NameGameIcebreakersPage() {
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
        name: "What is a name game icebreaker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A name game icebreaker is a short activity that helps participants learn names while adding a memorable prompt, movement, adjective, or interaction. It is commonly used with students, new teams, camps, workshops, and orientation groups.",
        },
      },
      {
        "@type": "Question",
        name: "How do you play The Name Game icebreaker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ask each person to say their name plus a simple prompt such as an adjective, motion, or favorite thing. The next person repeats previous names before adding their own. Keep rounds short and allow help so the activity stays supportive.",
        },
      },
      {
        "@type": "Question",
        name: "What name games work best for students?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Students usually respond well to Alliterative Name Game, Motion Name Game, Crossword Names, and Human Bingo. Use light prompts and avoid anything embarrassing or too personal.",
        },
      },
      {
        "@type": "Question",
        name: "Are name games good for work meetings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, if the group is new or cross-functional. Use professional, low-pressure versions such as The Name Game, Find Your Match, or a quick introduction round with roles and work interests.",
        },
      },
      {
        "@type": "Question",
        name: "How do you make name games safe for introverts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Avoid memory tests that shame mistakes, let people pass, give name tags or written support, and use prompts that do not require personal disclosure. Frame mistakes as normal and help the group succeed together.",
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
            Name game cluster
          </p>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="text-lg text-muted-foreground">
            Name game icebreakers help people learn names without turning introductions into a long lecture. The best versions combine repetition with a light prompt, movement, or pattern so names become easier to remember.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/games/the-name-game" className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
              Start with The Name Game
            </Link>
            <Link href="/games/alliterative-name-game" className="rounded-xl border px-4 py-2.5 text-sm font-semibold hover:bg-muted">
              Try Alliterative Name Game
            </Link>
            <Link href="/games/blind-name-tag" className="rounded-xl border px-4 py-2.5 text-sm font-semibold hover:bg-muted">
              Try Blind Name Tag
            </Link>
          </div>
        </header>

        <section className="mb-10 rounded-2xl border bg-blue-50 p-6 dark:bg-blue-950/20">
          <h2 className="mb-4 text-2xl font-semibold">Best name games by situation</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/games/the-name-game" className="rounded-xl bg-white p-4 shadow-sm hover:shadow-md dark:bg-gray-950">
              <h3 className="font-semibold">Fast name learning</h3>
              <p className="mt-1 text-sm text-muted-foreground">Use The Name Game when a new group needs to learn names in 5–10 minutes.</p>
            </Link>
            <Link href="/games/motion-name-game" className="rounded-xl bg-white p-4 shadow-sm hover:shadow-md dark:bg-gray-950">
              <h3 className="font-semibold">High-energy students</h3>
              <p className="mt-1 text-sm text-muted-foreground">Use Motion Name Game when movement and repetition will help names stick.</p>
            </Link>
            <Link href="/games/blind-name-tag" className="rounded-xl bg-white p-4 shadow-sm hover:shadow-md dark:bg-gray-950">
              <h3 className="font-semibold">Playful adult groups</h3>
              <p className="mt-1 text-sm text-muted-foreground">Use Blind Name Tag when the group is comfortable with a more playful guessing activity.</p>
            </Link>
          </div>
        </section>

        <section className="mb-10 rounded-2xl border bg-card p-6">
          <h2 className="mb-3 text-2xl font-semibold">How to play a name game icebreaker</h2>
          <ol className="space-y-2 text-muted-foreground">
            <li>1. Choose a simple name pattern: adjective, motion, favorite object, or work role.</li>
            <li>2. Model the first turn so participants know the expected length.</li>
            <li>3. Let each person share their name and prompt answer.</li>
            <li>4. Repeat names as a group, but help quickly if someone forgets.</li>
            <li>5. Close by connecting the activity to the session purpose.</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">Best name games</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((game) => (
              <Link key={game.id} href={`/games/${game.slug}`} className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow">
                <div className="text-lg font-semibold">{game.title}</div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{game.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {game.players && <span className="rounded bg-secondary px-2 py-1">{game.players}</span>}
                  {game.duration && <span className="rounded bg-secondary px-2 py-1">{game.duration}</span>}
                  {game.category && <span className="rounded bg-secondary px-2 py-1">{game.category}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10 overflow-hidden rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-3 font-semibold">Name game</th>
                <th className="p-3 font-semibold">Best for</th>
                <th className="p-3 font-semibold">Time</th>
                <th className="p-3 font-semibold">Energy</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([game, bestFor, time, energy]) => (
                <tr key={game} className="border-t">
                  <td className="p-3 font-medium">{game}</td>
                  <td className="p-3 text-muted-foreground">{bestFor}</td>
                  <td className="p-3 text-muted-foreground">{time}</td>
                  <td className="p-3 text-muted-foreground">{energy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="prose max-w-none mb-10">
          <h2>Name games for different groups</h2>
          <h3>Name games for students</h3>
          <p>
            Use playful formats with clear rules: Alliterative Name Game, Motion Name Game, and Crossword Names. Keep turns short and avoid prompts that make students reveal sensitive personal information.
          </p>
          <h3>Name games for work</h3>
          <p>
            Choose professional prompts such as name, role, project, or one useful skill. For distributed teams, pair a name game with <Link href="/virtual-icebreaker-games">virtual icebreaker games</Link> so remote participants have equal ways to contribute.
          </p>
          <h3>Name games for large groups</h3>
          <p>
            Use small circles or pairs instead of one long full-group round. Large groups need visible names, strict time limits, and an easy opt-out if someone forgets.
          </p>

          <h2>Facilitator safety notes</h2>
          <p>
            A name game should make names easier, not embarrass people for forgetting. Normalize mistakes, invite the group to help, and avoid competitive memory pressure with new or anxious groups.
          </p>
        </section>

        <section className="prose max-w-none">
          <h2>Related icebreaker guides</h2>
          <p>
            Start with <Link href="/games/the-name-game">The Name Game</Link>, then explore <Link href="/games/blind-name-tag">Blind Name Tag</Link>, <Link href="/games/alliterative-name-game">Alliterative Name Game</Link>, <Link href="/icebreaker-games-for-meetings">meeting icebreakers</Link>, and <Link href="/games">the full games library</Link>.
          </p>
        </section>
      </main>
    </>
  );
}
