export type Game = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: GameCategory;
  players: string | null;
  duration: string | null;
  difficulty: GameDifficulty | null;
  materials: string | null;
  steps: string | null;
  tags: string[];
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type GameCategory =
  | "Team Building"
  | "Virtual Meeting"
  | "Classroom"
  | "Training"
  | "Conference"
  | "Social Event";

export type GameDifficulty = "Easy" | "Medium" | "Hard";

export type GameCardProps = {
  game: Game;
};

export type GameDetailProps = {
  game: Game;
};
