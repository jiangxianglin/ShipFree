import { GameCard } from "./GameCard";
import type { Game } from "@/types/game";

type GameGridProps = {
  games: Game[];
};

export function GameGrid({ games }: GameGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
