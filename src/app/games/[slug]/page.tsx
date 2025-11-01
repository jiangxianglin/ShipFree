import { getGameBySlug } from "@/db/queries/games";
import { GameDetail } from "@/components/games/GameDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    return {
      title: "Game Not Found | Ice Breaker Games",
    };
  }

  const gameUrl = `https://icebreakergames.site/games/${game.slug}`;
  const imageUrl = game.image || "/img/Hero.png";
  
  // 为 Human Bingo 优化 description - 控制在 160 字符内
  const description = game.title === "Human Bingo" 
    ? "Human Bingo - Ice Breaker Games for social events. Fun networking game where participants find people matching bingo card descriptions. Perfect for parties!"
    : game.description.substring(0, 160);

  return {
    title: `${game.title} | Ice Breaker Games`,
    description: description,
    keywords: game.title === "Human Bingo" 
      ? ["ice breaker games", "human bingo", "social event games", "team building", "networking games", "party games"]
      : ["ice breaker games", game.title.toLowerCase(), game.category.toLowerCase()],
    alternates: {
      canonical: gameUrl,
    },
    openGraph: {
      type: "article",
      url: gameUrl,
      title: `${game.title} | Ice Breaker Games`,
      description: description,
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
      description: description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function GameDetailPage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: game.title === "Human Bingo" ? "Human Bingo - Ice Breaker Game" : game.title,
    description: game.title === "Human Bingo" 
      ? "Human Bingo is a popular ice breaker game perfect for social events, networking, and team building. Learn how to play this engaging ice breaker game."
      : game.description,
    image: game.title === "Human Bingo" 
      ? "https://icebreakergames.site/img/Human-Bingo-Hero.png"
      : (game.image || "https://icebreakergames.site/img/Hero.png"),
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
      "@id": `https://icebreakergames.site/games/${game.slug}`,
    },
    keywords: game.title === "Human Bingo" 
      ? "ice breaker games, human bingo, social event games, networking games, team building, party games"
      : `ice breaker games, ${game.title.toLowerCase()}, ${game.category.toLowerCase()}`,
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
