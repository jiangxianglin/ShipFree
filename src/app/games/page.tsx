import { getAllGames } from "@/db/queries/games";
import { FilterableGameGrid } from "@/components/games/FilterableGameGrid";
import { EmptyState } from "@/components/games/EmptyState";
import type { Metadata } from "next";
import Image from "next/image";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

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
        url: "/img/Hero.png",
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
    images: ["/img/Hero.png"],
  },
};

export default async function GamesPage() {
  const games = await getAllGames();

  if (games.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Image */}
      <div className="mb-12">
        <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6">
          <Image
            src="/img/Hero.png"
            alt="Ice breaker games for team building and group activities"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Ice Breaker Games</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Browse our collection of {games.length} engaging ice breaker games to warm up
          your team and create memorable experiences.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="mb-12">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">
            Discover the Best Ice Breaker Games for Every Occasion
          </h2>
          <p className="text-base text-muted-foreground mb-6">
            Our comprehensive collection of ice breaker games helps teams, classrooms, and groups connect meaningfully.
            Whether you're planning virtual meetings, team building sessions, or classroom activities, these ice breaker games
            are designed to break down barriers and foster genuine connections.
          </p>

          {/* Featured Games Section with Images */}
          <div className="grid md:grid-cols-2 gap-8 my-8 not-prose">
            <div className="bg-card rounded-lg overflow-hidden shadow-sm border">
              <div className="relative h-48">
                <Image
                  src="/img/Two-Truths-and-a-Lie.png"
                  alt="Two Truths and a Lie ice breaker game example"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Classic Ice Breaker Games</h3>
                <p className="text-sm text-muted-foreground">
                  Popular games like Two Truths and a Lie help participants share interesting facts and build connections quickly.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg overflow-hidden shadow-sm border">
              <div className="relative h-48">
                <Image
                  src="/img/Human-Bingo-Hero.png"
                  alt="Human Bingo ice breaker game for networking"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Interactive Team Activities</h3>
                <p className="text-sm text-muted-foreground">
                  Engaging activities like Human Bingo encourage networking and help team members discover common interests.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Why Use Ice Breaker Games?</h3>
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
      </div>
    </div>
  );
}
