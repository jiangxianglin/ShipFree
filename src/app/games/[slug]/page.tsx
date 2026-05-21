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
  } else if (game.title === "Chat Waterfall") {
    imageUrl = "/img/ChatWaterfall.png";
  } else if (game.title === "Emoji Introduction") {
    imageUrl = "/img/EmojiIntroduction-GameplayScene.png";
  } else if (game.title === "Emoji Check-In") {
    imageUrl = "/img/EmojiCheck-In-hero.png";
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
  } else if (game.title === "Chat Waterfall") {
    description = "Chat Waterfall | Ice Breaker Games: A high-energy virtual icebreaker where everyone types answers simultaneously and sends at once, creating a waterfall effect. Perfect for large groups!";
  } else if (game.title === "Emoji Introduction") {
    description = "Emoji Introduction | Ice Breaker Games: A fun ice breaker game where participants introduce themselves using creative emojis. Perfect for virtual meetings, online classrooms & team building. 5-30 players, 10-15 minutes. Free to play!";
  } else if (game.title === "Emoji Check-In") {
    description = "Emoji Check-In ice breaker game for virtual meetings. Express mood with emojis! Quick 3-5 min team activity. Free Emoji Check-In icebreaker for online meetings.";
  }

  return {
    title: game.title === "Emoji Introduction" ? "Emoji Introduction Ice Breaker Game - Fun Virtual Meeting Activity" : game.title === "Emoji Check-In" ? "Emoji Check-In Ice Breaker Game - Quick Mood Sharing Activity" : `${game.title} | Ice Breaker Games`,
    description: description,
    alternates: {
      canonical: gameUrl,
    },
    openGraph: {
      type: "article",
      url: gameUrl,
      title: game.title === "Emoji Introduction" ? "Emoji Introduction Ice Breaker Game - Fun Virtual Meeting Activity" : game.title === "Emoji Check-In" ? "Emoji Check-In Ice Breaker Game - Quick Mood Sharing Activity" : `${game.title} | Ice Breaker Games`,
      description: description,
      siteName: "Ice Breaker Games",
      images: [
        {
          url: game.title === "Emoji Check-In" ? "/img/EmojiCheck-In-social.jpg" : imageUrl,
          width: 1200,
          height: 630,
          alt: game.title === "Find Your Match" 
            ? "Find Your Match | Ice Breaker Games - Diverse adults matching cards in a modern conference room for networking ice breaker activities"
            : game.title === "Chat Waterfall"
            ? "Chat Waterfall | Ice Breaker Games - Simultaneous chat waterfall effect in virtual meeting ice breaker"
            : game.title === "Emoji Introduction"
            ? "Emoji Introduction | Ice Breaker Games - Participants introduce themselves using creative emojis in virtual meeting ice breaker game"
            : game.title === "Emoji Check-In"
            ? "Emoji Check-In ice breaker game - Participants share mood using emojis in virtual meeting icebreaker"
            : `${game.title} - Ice Breaker Game`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: game.title === "Emoji Introduction" ? "Emoji Introduction Ice Breaker Game - Fun Virtual Meeting Activity" : game.title === "Emoji Check-In" ? "Emoji Check-In Ice Breaker Game - Quick Mood Sharing Activity" : `${game.title} | Ice Breaker Games`,
      description: description,
      images: [game.title === "Emoji Check-In" ? "/img/EmojiCheck-In-social.jpg" : imageUrl],
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
  } else if (game.title === "Chat Waterfall") {
    jsonLdImage = "https://www.icebreakergames.site/img/ChatWaterfall.png";
  } else if (game.title === "Emoji Introduction") {
    jsonLdImage = "https://www.icebreakergames.site/img/EmojiIntroduction-GameplayScene.png";
  } else if (game.title === "Emoji Check-In") {
    jsonLdImage = "https://www.icebreakergames.site/img/EmojiCheck-In-hero.png";
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
  } else if (game.title === "Chat Waterfall") {
    jsonLdDescription = "Chat Waterfall | Ice Breaker Games: A high-energy virtual icebreaker where everyone types answers simultaneously and sends at once, creating a waterfall effect. Perfect for large groups!";
  } else if (game.title === "Emoji Introduction") {
    jsonLdDescription = "Emoji Introduction | Ice Breaker Games: A fun ice breaker game where participants introduce themselves using creative emojis. Perfect for virtual meetings, online classrooms & team building. Easy to play with 5-30 players in just 10-15 minutes.";
  } else if (game.title === "Emoji Check-In") {
    jsonLdDescription = "Emoji Check-In ice breaker game for virtual meetings. Express mood with emojis! Quick 3-5 min team activity. Free Emoji Check-In icebreaker for online meetings.";
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#article`,
        headline: game.title === "Find Your Match" ? "Find Your Match | Ice Breaker Games" : game.title === "Human Bingo" ? "Human Bingo - Ice Breaker Game" : game.title === "Chat Waterfall" ? "Chat Waterfall | Ice Breaker Games" : game.title === "Emoji Introduction" ? "Emoji Introduction - Ice Breaker Game for Virtual Meetings" : game.title === "Emoji Check-In" ? "Emoji Check-In - Quick Mood Sharing Ice Breaker Game" : game.title,
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
      }] : []),
      ...(game.title === "Chat Waterfall" ? [{
        "@type": "HowTo",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#howto`,
        name: "How to Play Chat Waterfall",
        description: "A high-energy virtual icebreaker game where everyone types answers simultaneously and sends at once, creating a waterfall effect.",
        totalTime: "PT8M",
        supply: [
          {
            "@type": "HowToSupply",
            name: "Video conferencing with chat"
          }
        ],
        step: [
          {
            "@type": "HowToStep",
            name: "Step 1: Ask a Question",
            text: "Ask a question like 'What is your favorite snack?' or any fun question suitable for your group.",
            position: 1
          },
          {
            "@type": "HowToStep",
            name: "Step 2: Type Your Answer",
            text: "Everyone types their answer in the chat but doesn't send yet. Make sure everyone has enough time to type.",
            position: 2
          },
          {
            "@type": "HowToStep",
            name: "Step 3: Send Together",
            text: "On count of 3, everyone sends their message at the same time. This creates the 'waterfall' effect!",
            position: 3
          },
          {
            "@type": "HowToStep",
            name: "Step 4: Enjoy the Results",
            text: "Watch the waterfall of responses appear on screen. Discuss the answers as a group and have fun with the results.",
            position: 4
          }
        ]
      }] : []),
      ...(game.title === "Emoji Introduction" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Emoji Introduction?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Participants think of 3-5 emojis that represent themselves. Each person then posts their emojis in the chat or shares their screen. The group tries to guess what each emoji represents, and the person explains the meaning behind their choices. This continues until everyone has shared."
            }
          },
          {
            "@type": "Question",
            "name": "How many people can play Emoji Introduction?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Emoji Introduction works best with 5-30 people. For smaller groups of 5-10, everyone can share and discuss each person's emojis in detail. For larger groups of 10-30, you may want to limit sharing time or use breakout rooms to keep the activity moving."
            }
          },
          {
            "@type": "Question",
            "name": "What materials do you need for Emoji Introduction?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You need a chat function in your video conferencing tool or a shared digital space where participants can post their emojis. If playing in person, you can use paper and markers for participants to write or draw their emojis. That's it - no special materials required!"
            }
          },
          {
            "@type": "Question",
            "name": "How long does Emoji Introduction take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Emoji Introduction typically takes 10-15 minutes, depending on group size. With a small group of 5-8 people, you can spend 1-2 minutes on each person for a total of 10-15 minutes. Larger groups may need to move faster, keeping introductions to 30-60 seconds each."
            }
          },
          {
            "@type": "Question",
            "name": "What are good emojis to use for self-introduction?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Choose emojis that represent your hobbies, interests, or personality. For example: 🏋️ for fitness lovers, 📚 for readers, 🎮 for gamers, 🍕 for foodies, 🐕 for pet owners, ✈️ for travelers. Try to pick emojis that spark conversation and reveal something meaningful about you."
            }
          },
          {
            "@type": "Question",
            "name": "Can Emoji Introduction be used in classroom settings?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! Emoji Introduction is perfect for online classrooms, virtual training sessions, and hybrid learning environments. It's especially great for getting students comfortable with each other at the start of a new semester or course. Teachers can also use it as a fun way to check understanding of concepts."
            }
          },
          {
            "@type": "Question",
            "name": "What tips make Emoji Introduction more engaging?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "First, create a welcoming environment where everyone feels comfortable participating. Give participants time to think about their emoji choices before sharing. Encourage creative emoji combinations rather than obvious ones. Allow discussion after each reveal. And follow up with a brief reflection to reinforce the connections made during the game."
            }
          }
        ]
      }] : []),
      ...(game.title === "Emoji Check-In" ? [{
        "@type": "HowTo",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#howto`,
        name: "How to Play Emoji Check-In",
        description: "A quick and fun ice breaker for virtual meetings where participants express their mood using emojis.",
        totalTime: "PT5M",
        supply: [
          {
            "@type": "HowToSupply",
            name: "Video platform with emoji reactions or chat"
          }
        ],
        step: [
          {
            "@type": "HowToStep",
            name: "Step 1: Ask everyone to choose emojis for their current mood",
            text: "Prompt participants to select emojis that represent how they're feeling right now. They can choose one or multiple emojis.",
            position: 1
          },
          {
            "@type": "HowToStep",
            name: "Step 2: Share via reactions or chat",
            text: "Participants share their emoji choices using video platform reactions or by posting in the chat.",
            position: 2
          },
          {
            "@type": "HowToStep",
            name: "Step 3: Optional - explain emoji choices briefly",
            text: "If the group is comfortable, ask a few participants to briefly explain why they chose their emojis.",
            position: 3
          },
          {
            "@type": "HowToStep",
            name: "Step 4: Acknowledge the group's overall energy",
            text: "As the facilitator, acknowledge the collective mood and use this to calibrate the energy of your meeting or session.",
            position: 4
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
