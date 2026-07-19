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
import styles from "./home-filter.module.css";

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
    setTimeout(() => {
      document.getElementById("search-results")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
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
    <section className={styles.filterSection} aria-labelledby="filter-heading">
      <div className={styles.inner}>
        <div className={styles.panel}>
          <div className={styles.header}>
            <h2 id="filter-heading">
              Find the right icebreaker, energizer, or team-building game
            </h2>
          </div>

          <div className={styles.body}>
            <div className={styles.grid4}>
              <div>
                <label className={styles.label}>Activity type</label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => handleFilterChange("category", value)}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="Team Building">Team Building</SelectItem>
                    <SelectItem value="Virtual Meeting">Virtual Meeting</SelectItem>
                    <SelectItem value="Classroom">Classroom</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Conference">Conference</SelectItem>
                    <SelectItem value="Social Event">Social Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className={styles.label}>Game type</label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => handleFilterChange("type", value)}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="All game types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All game types</SelectItem>
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

              <div>
                <label className={styles.label}>Time</label>
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

              <div>
                <label className={styles.label}>Difficulty</label>
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

            <div className={styles.grid3}>
              <div>
                <label className={styles.label}>People</label>
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
                <label className={styles.label}>Audience</label>
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

              <div>
                <label className={styles.label}>Keyword</label>
                <div className={styles.keywordRow}>
                  <div className={styles.keywordInput}>
                    <Search className={styles.searchIcon} />
                    <Input
                      type="text"
                      placeholder="students, online, orientation…"
                      value={filters.keyword}
                      onChange={(e) => handleFilterChange("keyword", e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                      }}
                      className="pl-10 bg-white"
                    />
                  </div>
                  <Button onClick={handleSearch} className={styles.searchBtn}>
                    Search
                  </Button>
                  <Button onClick={handleClearAll} variant="secondary">
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showResults && (
          <div id="search-results" className={styles.results}>
            <div className={styles.resultsHead}>
              <div>
                <h3>Search results</h3>
                <p>
                  Found {filteredGames.length} game
                  {filteredGames.length !== 1 ? "s" : ""} matching your criteria
                </p>
              </div>
              <Link href="/games" className={styles.resultsLink}>
                View all games →
              </Link>
            </div>

            {filteredGames.length > 0 ? (
              <GameGrid games={filteredGames} />
            ) : (
              <div className={styles.empty}>
                <h3>No games found</h3>
                <p>Try adjusting your filters or search terms.</p>
                <Button onClick={handleClearAll} variant="outline">
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
