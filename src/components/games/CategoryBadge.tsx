import type { GameCategory } from "@/types/game";

const categoryColors: Record<GameCategory, string> = {
  "Team Building": "bg-[#e7efe9] text-[#163528]",
  "Virtual Meeting": "bg-[#dce8e0] text-[#163528]",
  Classroom: "bg-[#e7efe9] text-[#0f241c]",
  Training: "bg-[#f3e6dc] text-[#a84c22]",
  Conference: "bg-[#e7efe9] text-[#163528]",
  "Social Event": "bg-[#f3e6dc] text-[#c45c2a]",
};

type CategoryBadgeProps = {
  category: GameCategory;
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className={`px-2.5 py-0.5 rounded text-xs font-semibold whitespace-nowrap ${categoryColors[category]}`}
    >
      {category}
    </span>
  );
}
