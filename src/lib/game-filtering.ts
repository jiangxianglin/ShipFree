import type {
  Game,
  GameAudience,
  GameCategory,
  GameDifficulty,
  GameType,
} from "@/types/game";

export type GameFilters = {
  category: GameCategory | "all";
  duration: string;
  players: string;
  difficulty: GameDifficulty | "all";
  type: GameType | "all";
  audience: GameAudience | "all";
  keyword: string;
};

const audienceTagMatchers: Record<GameAudience, string[]> = {
  Students: [
    "student",
    "students",
    "classroom",
    "school",
    "high-school",
    "middle-school",
    "elementary",
    "college",
    "orientation",
    "first-day",
    "shy-students",
  ],
  Adults: [
    "adult",
    "adults",
    "workplace",
    "meeting",
    "meetings",
    "conference",
    "training",
    "professional",
    "team-building",
    "coworkers",
  ],
  Kids: [
    "kids",
    "children",
    "elementary",
    "middle-school",
    "young-learners",
  ],
  "Mixed Ages": [
    "mixed-ages",
    "all-ages",
    "family",
    "intergenerational",
  ],
};

export function filterGames(games: Game[], filters: GameFilters): Game[] {
  return games.filter((game) => {
    if (filters.category !== "all" && game.category !== filters.category) {
      return false;
    }

    if (filters.difficulty !== "all" && game.difficulty !== filters.difficulty) {
      return false;
    }

    if (filters.type !== "all" && game.type !== filters.type) {
      return false;
    }

    if (filters.audience !== "all" && !matchesAudience(game, filters.audience)) {
      return false;
    }

    if (filters.duration !== "all" && game.duration) {
      const minutes = extractMinutes(game.duration.toLowerCase());

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

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      const searchableText = [game.title, game.description, ...game.tags]
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(keyword)) {
        return false;
      }
    }

    return true;
  });
}

export function extractMinutes(duration: string): number {
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export function extractPlayerCount(players: string): number {
  const match = players.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function matchesAudience(game: Game, audience: GameAudience): boolean {
  const normalizedTags = game.tags.map((tag) => tag.toLowerCase());
  const audienceMatches = audienceTagMatchers[audience].some((tag) =>
    normalizedTags.includes(tag)
  );

  if (audienceMatches) {
    return true;
  }

  if (audience === "Students") {
    return game.category === "Classroom";
  }

  if (audience === "Adults") {
    return (
      game.category !== "Classroom" &&
      !normalizedTags.includes("student") &&
      !normalizedTags.includes("students")
    );
  }

  return false;
}
