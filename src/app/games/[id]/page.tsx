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

  const gameUrl = `https://icebreakergames.site/games/${id}`;
  const imageUrl = game.image || "/img/Hero.png";

  return {
    title: `${game.title} | Ice Breaker Games`,
    description: game.description.substring(0, 160),
    alternates: {
      canonical: gameUrl,
    },
    openGraph: {
      type: "article",
      url: gameUrl,
      title: `${game.title} | Ice Breaker Games`,
      description: game.description.substring(0, 160),
      siteName: "Ice Breaker Games",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${game.title} - Ice Breaker Game`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} | Ice Breaker Games`,
      description: game.description.substring(0, 160),
      images: [imageUrl],
    },
  };
}

export default async function GameDetailPage({ params }: Props) {
  const { id } = await params;
  const game = await getGameById(id);

  if (!game) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: game.title,
    description: game.description,
    image: game.image || "https://icebreakergames.site/img/Hero.png",
    author: {
      "@type": "Organization",
      name: "Ice Breaker Games",
    },
    publisher: {
      "@type": "Organization",
      name: "Ice Breaker Games",
      logo: {
        "@type": "ImageObject",
        url: "https://icebreakergames.site/img/Hero.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://icebreakergames.site/games/${id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
