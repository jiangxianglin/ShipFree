import type { GameCategory } from "@/types/game";

const categoryColors: Record<GameCategory, string> = {
  "Team Building": "bg-blue-500 text-white",
  "Virtual Meeting": "bg-purple-500 text-white",
  "Classroom": "bg-green-500 text-white",
  "Training": "bg-orange-500 text-white",
  "Conference": "bg-red-500 text-white",
  "Social Event": "bg-pink-500 text-white",
};

type CategoryBadgeProps = {
  category: GameCategory;
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${categoryColors[category]}`}
    >
      {category}
    </span>
  );
}
