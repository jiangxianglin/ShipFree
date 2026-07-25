"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GameFilter } from "./GameFilter";
import { GameGrid } from "./GameGrid";
import type { Game, GameType } from "@/types/game";
import { filterGames, type GameFilters } from "@/lib/game-filtering";

type FilterableGameGridProps = {
  games: Game[];
};

function asGameType(value: string | null): GameType | "all" {
  if (!value || value === "all") return "all";
  return value as GameType;
}

export function FilterableGameGrid({ games }: FilterableGameGridProps) {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<GameFilters>({
    category: (searchParams.get("category") as GameFilters["category"]) || "all",
    duration: searchParams.get("duration") || "all",
    players: searchParams.get("players") || "all",
    difficulty:
      (searchParams.get("difficulty") as GameFilters["difficulty"]) || "all",
    type: asGameType(searchParams.get("type")),
    audience: (searchParams.get("audience") as GameFilters["audience"]) || "all",
    keyword: searchParams.get("keyword") || "",
  });

  useEffect(() => {
    setFilters({
      category: (searchParams.get("category") as GameFilters["category"]) || "all",
      duration: searchParams.get("duration") || "all",
      players: searchParams.get("players") || "all",
      difficulty:
        (searchParams.get("difficulty") as GameFilters["difficulty"]) || "all",
      type: asGameType(searchParams.get("type")),
      audience:
        (searchParams.get("audience") as GameFilters["audience"]) || "all",
      keyword: searchParams.get("keyword") || "",
    });
  }, [searchParams]);

  const filteredGames = useMemo(
    () => filterGames(games, filters),
    [games, filters]
  );

  return (
    <>
      <GameFilter onFilterChange={setFilters} />

      <p
        className="mb-4 text-sm"
        style={{ color: "#5c6e63" }}
        aria-live="polite"
      >
        Showing {filteredGames.length} of {games.length} games
      </p>

      <GameGrid games={filteredGames} />
    </>
  );
}
