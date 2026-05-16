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

  // Always use the canonical slug URL for SEO, even if accessed via UUID
  const gameUrl = `https://www.icebreakergames.site/games/${game.slug}`;
  
  // Custom image logic
  let imageUrl = game.image || "/img/Hero.png";
  if (game.title === "Find Your Match") {
    imageUrl = "/img/find-your-match-hero.png";
  } else if (game.title === "Virtual Background Story") {
    imageUrl = "/img/VirtualBackgroundStory_Hero.jpg";
  } else if (game.title === "Human Bingo") {
    imageUrl = "/img/Human-Bingo-Hero.png"; // Already handled in component, but good for metadata
  } else if (game.title === "Speed Networking") {
    imageUrl = "https://www.icebreakergames.site/img/SpeedNetworking-hero.jpg";
  }

  // Custom description logic
  let description = game.description.substring(0, 160);
  if (game.title === "Find Your Match") {
    description = "Find Your Match | Ice Breaker Games: Participants get cards with famous pairs and find their match by asking questions. Perfect ice breaker for networking events!";
  } else if (game.title === "Human Bingo") {
    description = "Human Bingo - Ice Breaker Games for social events. Fun networking game where participants find people matching bingo card descriptions. Perfect for parties!";
  } else if (game.title === "Virtual Background Story") {
    description = "Virtual Background Story | Ice Breaker Games: Perfect for online meetings, participants choose creative or unusual virtual backgrounds and share the story behind their choice.";
  } else if (game.title === "Speed Networking") {
    description = "Speed Networking | Ice Breaker Games: A fast-paced structured networking event where participants have brief, timed conversations to maximize connections in a short period.";
  }

  return {
    title: `${game.title} | Ice Breaker Games`,
    description: description,
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
          alt: game.title === "Find Your Match" 
            ? "Find Your Match | Ice Breaker Games - Diverse adults matching cards in a modern conference room for networking ice breaker activities"
            : `${game.title} - Ice Breaker Game`,
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
  if (game.title === "Find Your Match") {
    jsonLdImage = "https://www.icebreakergames.site/img/find-your-match-hero.png";
  } else if (game.title === "Human Bingo") {
    jsonLdImage = "https://www.icebreakergames.site/img/Human-Bingo-Hero.png";
  } else if (game.title === "Virtual Background Story") {
    jsonLdImage = "https://www.icebreakergames.site/img/VirtualBackgroundStory_Hero.jpg";
  } else if (game.title === "Speed Networking") {
    jsonLdImage = "https://www.icebreakergames.site/img/SpeedNetworking-hero.jpg";
  }

  let jsonLdDescription = game.description;
  if (game.title === "Find Your Match") {
    jsonLdDescription = "Find Your Match | Ice Breaker Games: A popular pairing ice breaker game where participants receive cards with famous pairs and must find their matching partner through asking questions. Perfect for networking events and social gatherings!";
  } else if (game.title === "Human Bingo") {
    jsonLdDescription = "Human Bingo is a popular ice breaker game perfect for social events, networking, and team building. Learn how to play this engaging ice breaker game.";
  } else if (game.title === "Virtual Background Story") {
    jsonLdDescription = "Virtual Background Story | Ice Breaker Games: Perfect for online meetings, participants choose creative or unusual virtual backgrounds and share the story behind their choice.";
  } else if (game.title === "Speed Networking") {
    jsonLdDescription = "Speed Networking | Ice Breaker Games: A fast-paced structured networking event where participants have brief, timed conversations to maximize connections in a short period.";
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#article`,
        headline: game.title === "Find Your Match" ? "Find Your Match | Ice Breaker Games" : game.title === "Human Bingo" ? "Human Bingo - Ice Breaker Game" : game.title,
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
      },
      ...(game.title === "Find Your Match" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Find Your Match?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Participants receive cards with one half of a famous pair (like Romeo and Juliet or Sherlock Holmes and Watson). They must find their matching partner by asking yes/no questions without directly stating what's on their card. Once pairs find each other, they introduce themselves to the group."
            }
          },
          {
            "@type": "Question",
            "name": "How many people can play Find Your Match?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Find Your Match works best with 10-50 people. The game requires pairs, so you need an even number of participants. For larger groups, you can prepare more famous pairs to accommodate up to 100 people."
            }
          },
          {
            "@type": "Question",
            "name": "What materials do you need for Find Your Match?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You need cards with famous pairs written on them. Prepare pairs like: peanut butter and jelly, Sherlock Holmes and Watson, Romeo and Juliet, Batman and Robin, salt and pepper, or any recognizable pairs that fit your group demographic. Print or write each half on separate cards."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Find Your Match take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Find Your Match typically takes 15-20 minutes, including setup and introductions. The mingling phase usually lasts 5-10 minutes, and the pair introductions take another 5-10 minutes depending on group size."
            }
          },
          {
            "@type": "Question",
            "name": "What are some example famous pairs for Find Your Match?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Classic pairs include: PB and Jelly, Batman and Robin, Romeo and Juliet, Sherlock Holmes and Watson, Salt and Pepper, Mac and Cheese, chips and salsa. For corporate groups, try: email and inbox, meetings and calendars. For students: Netflix and chill, WiFi and password."
            }
          },
          {
            "@type": "Question",
            "name": "Can Find Your Match be played virtually?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! For virtual meetings, send participants their card via chat or email before the game starts. Use breakout rooms for mingling, or go around in a large room where each pair shares their identity. You can also use virtual collaboration tools like Miro or MURAL for card distribution."
            }
          }
        ]
      }] : [])
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
