import { getGameById } from "@/db/queries/games";
import { GameDetail } from "@/components/games/GameDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const game = await getGameById(id);

  if (!game) {
    return {
      title: "Game Not Found | Ice Breaker Games",
    };
  }

  return {
    title: `${game.title} | Ice Breaker Games`,
    description: game.description.substring(0, 160),
    openGraph: {
      title: game.title,
      description: game.description,
      images: game.image ? [game.image] : [],
    },
  };
}

export default async function GameDetailPage({ params }: Props) {
  const { id } = await params;
  const game = await getGameById(id);

  if (!game) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/games"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to all games
        </Link>
      </div>
      <GameDetail game={game} />
    </>
  );
}
