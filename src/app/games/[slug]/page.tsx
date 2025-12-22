import { getGameBySlug, getGameById } from "@/db/queries/games";
import { GameDetail } from "@/components/games/GameDetail";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let game = await getGameBySlug(slug);

  if (!game) {
    // Try to find by ID if it looks like a UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
    if (isUuid) {
      game = await getGameById(slug);
    }
  }

  if (!game) {
    return {
      title: "Game Not Found | Ice Breaker Games",
      robots: {
        index: false,
        follow: false,
      }
    };
  }

  const gameUrl = `https://www.icebreakergames.site/games/${game.slug}`;
  
  // Custom image logic
  let imageUrl = game.image || "/img/Hero.png";
  if (game.title === "Virtual Background Story") {
    imageUrl = "/img/VirtualBackgroundStory_Hero.jpg";
  } else if (game.title === "Human Bingo") {
    imageUrl = "/img/Human-Bingo-Hero.png"; // Already handled in component, but good for metadata
  }

  // Custom description logic
  let description = game.description.substring(0, 160);
  if (game.title === "Human Bingo") {
    description = "Human Bingo - Ice Breaker Games for social events. Fun networking game where participants find people matching bingo card descriptions. Perfect for parties!";
  } else if (game.title === "Virtual Background Story") {
    description = "Virtual Background Story | Ice Breaker Games: Perfect for online meetings, participants choose creative or unusual virtual backgrounds and share the story behind their choice.";
  }

  return {
    title: `${game.title} | Ice Breaker Games`,
    description: description,
    keywords: game.title === "Human Bingo" 
      ? ["ice breaker games", "human bingo", "social event games", "team building", "networking games", "party games"]
      : game.title === "Virtual Background Story"
      ? ["ice breaker games", "Virtual Background Story", "virtual meeting games", "remote team building", "zoom icebreakers"]
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
  let game = await getGameBySlug(slug);

  if (!game) {
    // Try to find by ID if it looks like a UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
    if (isUuid) {
      game = await getGameById(slug);
      if (game) {
        // Redirect to the correct slug URL
        redirect(`/games/${game.slug}`);
      }
    }

    notFound();
  }

  // Determine image and description for JSON-LD
  let jsonLdImage = game.image || "https://www.icebreakergames.site/img/Hero.png";
  if (game.title === "Human Bingo") {
    jsonLdImage = "https://www.icebreakergames.site/img/Human-Bingo-Hero.png";
  } else if (game.title === "Virtual Background Story") {
    jsonLdImage = "https://www.icebreakergames.site/img/VirtualBackgroundStory_Hero.jpg";
  }

  let jsonLdDescription = game.description;
  if (game.title === "Human Bingo") {
    jsonLdDescription = "Human Bingo is a popular ice breaker game perfect for social events, networking, and team building. Learn how to play this engaging ice breaker game.";
  } else if (game.title === "Virtual Background Story") {
    jsonLdDescription = "Virtual Background Story | Ice Breaker Games: Perfect for online meetings, participants choose creative or unusual virtual backgrounds and share the story behind their choice.";
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#article`,
        headline: game.title === "Human Bingo" ? "Human Bingo - Ice Breaker Game" : game.title,
        description: jsonLdDescription,
        image: jsonLdImage,
        author: {
          "@type": "Organization",
          name: "Ice Breaker Games",
        },
        publisher: {
          "@type": "Organization",
          name: "Ice Breaker Games",
          logo: {
            "@type": "ImageObject",
            url: "https://www.icebreakergames.site/img/Hero.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.icebreakergames.site/games/${game.slug}`,
        },
        keywords: game.title === "Human Bingo" 
          ? "ice breaker games, human bingo, social event games, networking games, team building, party games"
          : `ice breaker games, ${game.title.toLowerCase()}, ${game.category.toLowerCase()}`,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.icebreakergames.site"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Games",
            item: "https://www.icebreakergames.site/games"
          },
          {
            "@type": "ListItem",
            position: 3,
            name: game.title,
            item: `https://www.icebreakergames.site/games/${game.slug}`
          }
        ]
      }
    ]
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
