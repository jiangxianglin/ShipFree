"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GameFilter } from "./GameFilter";
import { GameGrid } from "./GameGrid";
import type { Game } from "@/types/game";
import { filterGames, type GameFilters } from "@/lib/game-filtering";

type FilterableGameGridProps = {
  games: Game[];
};

export function FilterableGameGrid({ games }: FilterableGameGridProps) {
  const searchParams = useSearchParams();
  
  // Initialize filters from URL params
  const [filters, setFilters] = useState<GameFilters>({
    category: (searchParams.get("category") as any) || "all",
    duration: searchParams.get("duration") || "all",
    players: searchParams.get("players") || "all",
    difficulty: (searchParams.get("difficulty") as any) || "all",
    type: searchParams.get("type") || "all",
    audience: (searchParams.get("audience") as any) || "all",
    keyword: searchParams.get("keyword") || "",
  });

  // Update filters when URL params change
  useEffect(() => {
    setFilters({
      category: (searchParams.get("category") as any) || "all",
      duration: searchParams.get("duration") || "all",
      players: searchParams.get("players") || "all",
      difficulty: (searchParams.get("difficulty") as any) || "all",
      type: searchParams.get("type") || "all",
      audience: (searchParams.get("audience") as any) || "all",
      keyword: searchParams.get("keyword") || "",
    });
  }, [searchParams]);

  const filteredGames = useMemo(() => filterGames(games, filters), [games, filters]);

  return (
    <>
      <GameFilter onFilterChange={setFilters} />
      
      <div className="mb-4 text-muted-foreground">
        Showing {filteredGames.length} of {games.length} games
      </div>
      
      <GameGrid games={filteredGames} />
    </>
  );
}
