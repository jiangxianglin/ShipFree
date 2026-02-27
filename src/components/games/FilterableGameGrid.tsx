"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GameFilter, type GameFilters } from "./GameFilter";
import { GameGrid } from "./GameGrid";
import type { Game } from "@/types/game";

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
      keyword: searchParams.get("keyword") || "",
    });
  }, [searchParams]);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // Category filter
      if (filters.category !== "all" && game.category !== filters.category) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty !== "all" && game.difficulty !== filters.difficulty) {
        return false;
      }

      // Type filter
      if (filters.type !== "all" && game.type !== filters.type) {
        return false;
      }

      // Duration filter
      if (filters.duration !== "all" && game.duration) {
        const duration = game.duration.toLowerCase();
        const minutes = extractMinutes(duration);
        
        switch (filters.duration) {
          case "quick":
            if (minutes > 10) return false;
            break;
          case "short":
            if (minutes < 10 || minutes > 20) return false;
            break;
          case "medium":
            if (minutes < 20 || minutes > 45) return false;
            break;
          case "long":
            if (minutes < 45) return false;
            break;
        }
      }

      // Players filter
      if (filters.players !== "all" && game.players) {
        const players = game.players.toLowerCase();
        const playerCount = extractPlayerCount(players);
        
        switch (filters.players) {
          case "small":
            if (playerCount > 10) return false;
            break;
          case "medium":
            if (playerCount < 10 || playerCount > 20) return false;
            break;
          case "large":
            if (playerCount < 20 && !players.includes("any")) return false;
            break;
          case "any":
            if (!players.includes("any")) return false;
            break;
        }
      }

      // Keyword filter
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        const searchableText = [
          game.title,
          game.description,
          ...game.tags,
        ].join(" ").toLowerCase();
        
        if (!searchableText.includes(keyword)) {
          return false;
        }
      }

      return true;
    });
  }, [games, filters]);

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

// Helper function to extract minutes from duration string
function extractMinutes(duration: string): number {
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// Helper function to extract player count from players string
function extractPlayerCount(players: string): number {
  const match = players.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}
