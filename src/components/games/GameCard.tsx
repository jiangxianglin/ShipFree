"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryBadge } from "./CategoryBadge";
import { TagBadge } from "./TagBadge";
import type { GameCardProps } from "@/types/game";

export function GameCard({ game }: GameCardProps) {
  const truncatedDescription =
    game.description.length > 150
      ? game.description.substring(0, 150) + "..."
      : game.description;

  return (
    <Link href={`/games/${game.slug}`} className="block h-full">
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col border-[rgba(22,53,40,0.12)] bg-white">
        {game.image && (
          <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-[#e7efe9]">
            <img
              src={game.image}
              alt={game.title}
              className="object-contain w-full h-full"
            />
          </div>
        )}
        <CardHeader className="flex-none">
          <div className="flex items-start justify-between gap-2 mb-2">
            <CardTitle className="text-xl flex-1 text-[#163528]">{game.title}</CardTitle>
            <CategoryBadge category={game.category} />
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <p className="text-sm text-muted-foreground mb-4 flex-1">
            {truncatedDescription}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {game.players && (
              <span className="text-xs bg-[#e7efe9] text-[#163528] px-2 py-1 rounded">
                {game.players}
              </span>
            )}
            {game.duration && (
              <span className="text-xs bg-[#e7efe9] text-[#163528] px-2 py-1 rounded">
                {game.duration}
              </span>
            )}
            {game.difficulty && (
              <span className="text-xs bg-[#e7efe9] text-[#163528] px-2 py-1 rounded">
                {game.difficulty}
              </span>
            )}
          </div>
          {game.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {game.tags.slice(0, 3).map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
