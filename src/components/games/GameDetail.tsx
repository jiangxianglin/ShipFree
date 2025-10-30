import { CategoryBadge } from "./CategoryBadge";
import { TagBadge } from "./TagBadge";
import type { GameDetailProps } from "@/types/game";

export function GameDetail({ game }: GameDetailProps) {
  const materialsList = game.materials
    ? game.materials.split("\n").filter(Boolean)
    : [];
  const stepsList = game.steps ? game.steps.split("\n").filter(Boolean) : [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
          <h1 className="text-4xl font-bold flex-1">{game.title}</h1>
          <CategoryBadge category={game.category} />
        </div>

        {game.image && (
          <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
            <img
              src={game.image}
              alt={game.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-6">
          {game.players && (
            <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
              <span className="text-lg">👥</span>
              <span className="font-medium">{game.players}</span>
            </div>
          )}
          {game.duration && (
            <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
              <span className="text-lg">⏱️</span>
              <span className="font-medium">{game.duration}</span>
            </div>
          )}
          {game.difficulty && (
            <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
              <span className="text-lg">📊</span>
              <span className="font-medium">{game.difficulty}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Description</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {game.description}
          </p>
        </div>

        {materialsList.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Materials Needed</h2>
            <ul className="list-disc list-inside space-y-2">
              {materialsList.map((material, index) => (
                <li key={index} className="text-lg text-muted-foreground">
                  {material}
                </li>
              ))}
            </ul>
          </div>
        )}

        {stepsList.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">How to Play</h2>
            <ol className="list-decimal list-inside space-y-3">
              {stepsList.map((step, index) => (
                <li
                  key={index}
                  className="text-lg leading-relaxed text-muted-foreground"
                >
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {game.tags.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
