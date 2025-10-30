import { getAllGames } from "@/db/queries/games";
import { GameGrid } from "@/components/games/GameGrid";
import { EmptyState } from "@/components/games/EmptyState";
import type { Metadata } from "next";

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
};

export default async function GamesPage() {
  const games = await getAllGames();

  if (games.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Ice Breaker Games</h1>
        <p className="text-lg text-muted-foreground">
          Browse our collection of {games.length} engaging activities to warm up
          your team
        </p>
      </div>
      <GameGrid games={games} />
    </div>
  );
}
