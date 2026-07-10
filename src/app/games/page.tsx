import { getAllGames } from "@/db/queries/games";
import { FilterableGameGrid } from "@/components/games/FilterableGameGrid";
import { EmptyState } from "@/components/games/EmptyState";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Ice Breaker Games | Browse All Activities",
  description:
    "Discover the best ice breaker games for team building, virtual meetings, classrooms, and more. Find the perfect activity for your group.",
  keywords: [
    "ice breaker games",
    "team building activities",
    "virtual icebreakers",
    "classroom games",
    "conference activities",
  ],
  alternates: {
    canonical: "https://www.icebreakergames.site/games",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.icebreakergames.site/games",
    siteName: "Ice Breaker Games",
    title: "Ice Breaker Games | Browse All Activities",
    description:
      "Discover the best ice breaker games for team building, virtual meetings, classrooms, and more. Find the perfect activity for your group.",
    images: [
      {
        url: "https://www.icebreakergames.site/img/Hero.png",
        width: 1200,
        height: 630,
        alt: "Ice Breaker Games - Team Building Activities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ice Breaker Games | Browse All Activities",
    description:
      "Discover the best ice breaker games for team building, virtual meetings, classrooms, and more. Find the perfect activity for your group.",
    images: ["https://www.icebreakergames.site/img/Hero.png"],
  },
};

export default async function GamesPage() {
  const games = await getAllGames();

  if (games.length === 0) {
    return <EmptyState />;
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are ice breaker games?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ice breaker games are short, structured activities that help people feel comfortable, start talking, and connect quickly. They are commonly used in meetings, workshops, classrooms, and team building events.",
        },
      },
      {
        "@type": "Question",
        name: "What is a good 5-minute ice breaker game?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For a quick 5-minute ice breaker, try One Word Check-In, Emoji Check-In, or a short This or That round. These require no materials and work well for most groups.",
        },
      },
      {
        "@type": "Question",
        name: "What ice breaker games work best for meetings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Meeting-friendly ice breaker games are low-pressure and time-boxed. One Word Check-In, Weather Check-In, and This or That Questions help everyone participate without long turns.",
        },
      },
      {
        "@type": "Question",
        name: "What are the best virtual ice breaker games?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Virtual ice breaker games that work well online include Chat Waterfall, Emoji Introduction, Emoji Check-In, and Virtual Background Story. These formats make it easy for everyone to join using chat and quick sharing.",
        },
      },
      {
        "@type": "Question",
        name: "How do I choose the right ice breaker game?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Choose based on time, group size, comfort level, and setting (in-person or virtual). If the group is new, use predictable formats. If time is tight, use a check-in style activity.",
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
      <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Image */}
      <div className="mb-6 grid md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Ice Breaker Games</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Browse our collection of {games.length} engaging ice breaker games to warm up
            your team and create memorable experiences.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <Link
              href="/best-icebreaker-games"
              className="inline-flex items-center rounded-full border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Best icebreaker games
            </Link>
            <Link
              href="/blog/ice-breaker-games-for-adults"
              className="inline-flex items-center rounded-full border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Icebreaker games for adults
            </Link>
            <Link
              href="/icebreaker-games-for-work"
              className="inline-flex items-center rounded-full border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Icebreaker games for work
            </Link>
            <Link
              href="/icebreaker-games-for-meetings"
              className="inline-flex items-center rounded-full border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Icebreaker games for meetings
            </Link>
            <Link
              href="/virtual-icebreaker-games"
              className="inline-flex items-center rounded-full border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Virtual icebreaker games
            </Link>
            <Link
              href="/emoji-icebreaker-games"
              className="inline-flex items-center rounded-full border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Emoji icebreaker games
            </Link>
            <Link
              href="/name-game-icebreakers"
              className="inline-flex items-center rounded-full border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Name game icebreakers
            </Link>
            <Link
              href="/blog/icebreaker-games-for-students"
              className="inline-flex items-center rounded-full border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Icebreaker games for students
            </Link>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">
              Discover the Best Ice Breaker Games for Every Occasion
            </h2>
            <p className="text-base text-muted-foreground">
              Our comprehensive collection of ice breaker games helps teams, classrooms, and groups connect meaningfully.
              Whether you're planning virtual meetings, team building sessions, or classroom activities, these ice breaker games
              are designed to break down barriers and foster genuine connections.
            </p>
          </div>
        </div>
        
        <div className="relative w-full min-h-[300px] md:h-full rounded-2xl overflow-hidden shadow-xl bg-muted/20">
          <Image
            src="/img/Hero.png"
            alt="Ice breaker games for team building and group activities"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="mb-12">
        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold mb-3 mt-0">Why Use Ice Breaker Games?</h3>
          <p className="text-base text-muted-foreground mb-4">
            Ice breaker games are essential tools for creating comfortable, engaging environments. These activities help participants
            feel at ease, encourage communication, and set a positive tone for any gathering. From quick 5-minute ice breaker games
            to more elaborate team building exercises, our library offers options for every scenario.
          </p>

          <h3 className="text-xl font-semibold mb-3">Types of Ice Breaker Games Available</h3>
          <p className="text-base text-muted-foreground mb-4">
            Explore ice breaker games for virtual meetings, in-person workshops, classroom settings, and corporate training sessions.
            Each game includes detailed instructions, time requirements, and group size recommendations to help you choose the perfect
            ice breaker games for your needs.
          </p>

          <h3 className="text-xl font-semibold mb-3">Popular Collections</h3>
          <p className="text-base text-muted-foreground mb-3">
            If you want curated picks, use these quick collections. They are designed to match common search intents and help you choose faster.
          </p>
          <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/best-icebreaker-games"
              className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow"
            >
              <div className="font-semibold mb-1">Best icebreaker games</div>
              <div className="text-sm text-muted-foreground">
                A curated list of reliable activities for teams, meetings, workshops, and events.
              </div>
            </Link>
            <Link
              href="/blog/ice-breaker-games-for-adults"
              className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow"
            >
              <div className="font-semibold mb-1">Icebreaker games for adults</div>
              <div className="text-sm text-muted-foreground">
                Practical, respectful icebreakers for adult groups in meetings, socials, and remote teams.
              </div>
            </Link>
            <Link
              href="/icebreaker-games-for-work"
              className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow"
            >
              <div className="font-semibold mb-1">Icebreaker games for work</div>
              <div className="text-sm text-muted-foreground">
                Work-friendly, low-pressure openers with time-boxed facilitation tips.
              </div>
            </Link>
            <Link
              href="/icebreaker-games-for-meetings"
              className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow"
            >
              <div className="font-semibold mb-1">Icebreaker games for meetings</div>
              <div className="text-sm text-muted-foreground">
                Quick meeting openers that help the group arrive and start talking.
              </div>
            </Link>
            <Link
              href="/virtual-icebreaker-games"
              className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow"
            >
              <div className="font-semibold mb-1">Virtual icebreaker games</div>
              <div className="text-sm text-muted-foreground">
                Online-ready activities for Zoom, Teams, and remote workshops.
              </div>
            </Link>
            <Link
              href="/emoji-icebreaker-games"
              className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow"
            >
              <div className="font-semibold mb-1">Emoji icebreaker games</div>
              <div className="text-sm text-muted-foreground">
                Fast check-ins and visual prompts for meetings, classrooms, and remote teams.
              </div>
            </Link>
            <Link
              href="/name-game-icebreakers"
              className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow"
            >
              <div className="font-semibold mb-1">Name game icebreakers</div>
              <div className="text-sm text-muted-foreground">
                Name-learning activities for students, teams, workshops, and large groups.
              </div>
            </Link>
            <Link
              href="/blog/icebreaker-games-for-students"
              className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow"
            >
              <div className="font-semibold mb-1">Icebreaker games for students</div>
              <div className="text-sm text-muted-foreground">
                Classroom-safe ideas for students, including low-pressure and online options.
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Games Grid with Filters */}
      <FilterableGameGrid games={games} />

      {/* Bottom Content Section with Image */}
      <div className="mt-12 prose max-w-none">
        <h2 className="text-2xl font-semibold mb-4">
          How to Choose the Right Ice Breaker Games
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 my-6 not-prose">
          <div className="text-center p-6 bg-card rounded-lg border">
            <div className="relative w-full h-32 mb-4">
              <Image
                src="/img/How It Works.png"
                alt="Step 1: Browse ice breaker games by category"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-semibold mb-2">Browse by Category</h3>
            <p className="text-sm text-muted-foreground">
              Filter ice breaker games by meeting type, group size, or activity duration.
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-lg border">
            <div className="relative w-full h-32 mb-4">
              <Image
                src="/img/How It Works2.png"
                alt="Step 2: Review ice breaker game details"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-semibold mb-2">Review Details</h3>
            <p className="text-sm text-muted-foreground">
              Check game instructions, materials needed, and difficulty level.
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-lg border">
            <div className="relative w-full h-32 mb-4">
              <Image
                src="/img/How It Works3.png"
                alt="Step 3: Play ice breaker games with your team"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-semibold mb-2">Start Playing</h3>
            <p className="text-sm text-muted-foreground">
              Follow the step-by-step guide to facilitate engaging ice breaker games.
            </p>
          </div>
        </div>

        <p className="text-base text-muted-foreground mb-4">
          Selecting appropriate ice breaker games depends on your group size, available time, and meeting format.
          Consider your audience and objectives when browsing our ice breaker games collection. Filter by category,
          duration, or group size to find activities that match your specific requirements.
        </p>

        {/* Featured Games Section with Images */}
        <div className="grid md:grid-cols-2 gap-8 my-8 not-prose">
          <div className="bg-card rounded-lg overflow-hidden shadow-sm border h-full flex flex-col">
            <div className="relative h-64 w-full">
              <Image
                src="/img/Two-Truths-and-a-Lie.png"
                alt="Two Truths and a Lie ice breaker game example"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex-grow">
              <h3 className="text-lg font-semibold mb-2">Classic Ice Breaker Games</h3>
              <p className="text-sm text-muted-foreground">
                Popular games like Two Truths and a Lie help participants share interesting facts and build connections quickly.
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg overflow-hidden shadow-sm border h-full flex flex-col">
            <div className="relative h-64 w-full">
              <Image
                src="/img/Human-Bingo-Hero.png"
                alt="Human Bingo ice breaker game for networking"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex-grow">
              <h3 className="text-lg font-semibold mb-2">Interactive Team Activities</h3>
              <p className="text-sm text-muted-foreground">
                Engaging activities like Human Bingo encourage networking and help team members discover common interests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
