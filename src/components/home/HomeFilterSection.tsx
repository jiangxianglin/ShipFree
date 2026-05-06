"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GameGrid } from "@/components/games/GameGrid";
import type { Game } from "@/types/game";
import { filterGames, type GameFilters } from "@/lib/game-filtering";

type HomeFilterSectionProps = {
  games: Game[];
};

export function HomeFilterSection({ games }: HomeFilterSectionProps) {
  const [filters, setFilters] = useState<GameFilters>({
    category: "all",
    duration: "all",
    players: "all",
    difficulty: "all",
    type: "all",
    audience: "all",
    keyword: "",
  });
  const [showResults, setShowResults] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setShowResults(true);
    // Scroll to results
    setTimeout(() => {
      document.getElementById("search-results")?.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  const handleClearAll = () => {
    setFilters({
      category: "all",
      duration: "all",
      players: "all",
      difficulty: "all",
      type: "all",
      audience: "all",
      keyword: "",
    });
    setShowResults(false);
  };

  const filteredGames = useMemo(
    () => (showResults ? filterGames(games, filters) : []),
    [games, filters, showResults]
  );

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 rounded-t-2xl py-6 px-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Find the Perfect Icebreaker, Energiser or Team-Building Game
            </h2>
          </div>

          {/* Filter Panel */}
          <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-b-2xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {/* Activity Type */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm uppercase">
                  Activity Type
                </label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => handleFilterChange("category", value)}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Team Building">Team Building</SelectItem>
                    <SelectItem value="Virtual Meeting">Virtual Meeting</SelectItem>
                    <SelectItem value="Classroom">Classroom</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Conference">Conference</SelectItem>
                    <SelectItem value="Social Event">Social Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Game Type */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm uppercase">
                  Game Type
                </label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => handleFilterChange("type", value)}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="All game types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Game Types</SelectItem>
                    <SelectItem value="Table Game">Table Game</SelectItem>
                    <SelectItem value="Christmas Game">Christmas Game</SelectItem>
                    <SelectItem value="Icebreaker">Icebreaker</SelectItem>
                    <SelectItem value="Energizer">Energizer</SelectItem>
                    <SelectItem value="Quick Start">Quick Start</SelectItem>
                    <SelectItem value="Conversation Starter">Conversation Starter</SelectItem>
                    <SelectItem value="Interactive">Interactive</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm uppercase">
                  Time
                </label>
                <Select
                  value={filters.duration}
                  onValueChange={(value) => handleFilterChange("duration", value)}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any time</SelectItem>
                    <SelectItem value="quick">Quick (5-10 min)</SelectItem>
                    <SelectItem value="short">Short (10-20 min)</SelectItem>
                    <SelectItem value="medium">Medium (20-45 min)</SelectItem>
                    <SelectItem value="long">Long (45+ min)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm uppercase">
                  Difficulty
                </label>
                <Select
                  value={filters.difficulty}
                  onValueChange={(value) => handleFilterChange("difficulty", value)}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="All levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All levels</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* People */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm uppercase">
                  People
                </label>
                <Select
                  value={filters.players}
                  onValueChange={(value) => handleFilterChange("players", value)}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="All people" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All people</SelectItem>
                    <SelectItem value="small">Small (2-10)</SelectItem>
                    <SelectItem value="medium">Medium (10-20)</SelectItem>
                    <SelectItem value="large">Large (20+)</SelectItem>
                    <SelectItem value="any">Any size</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-sm uppercase">
                  Audience
                </label>
                <Select
                  value={filters.audience}
                  onValueChange={(value) => handleFilterChange("audience", value)}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="All audiences" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All audiences</SelectItem>
                    <SelectItem value="Students">Students</SelectItem>
                    <SelectItem value="Adults">Adults</SelectItem>
                    <SelectItem value="Kids">Kids</SelectItem>
                    <SelectItem value="Mixed Ages">Mixed Ages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Keyword Search */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm uppercase">
                  Keyword Search
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="students, online, orientation..."
                      value={filters.keyword}
                      onChange={(e) => handleFilterChange("keyword", e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                      className="pl-10 bg-white"
                    />
                  </div>
                  <Button
                    onClick={handleSearch}
                    className="bg-green-500 hover:bg-green-600 text-white px-8"
                  >
                    Search Activities
                  </Button>
                  <Button
                    onClick={handleClearAll}
                    variant="secondary"
                    className="bg-white hover:bg-gray-100"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {showResults && (
          <div id="search-results" className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Search Results</h3>
                <p className="text-muted-foreground">
                  Found {filteredGames.length} game{filteredGames.length !== 1 ? "s" : ""} matching your criteria
                </p>
              </div>
              <Link
                href="/games"
                className="text-primary hover:underline font-semibold"
              >
                View All Games →
              </Link>
            </div>

            {filteredGames.length > 0 ? (
              <GameGrid games={filteredGames} />
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No games found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={handleClearAll} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
