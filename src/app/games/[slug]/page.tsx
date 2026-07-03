import { getGameBySlug, getGameById } from "@/db/queries/games";
import { GameDetail } from "@/components/games/GameDetail";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import type { Game } from "@/types/game";
import Link from "next/link";

export const revalidate = 86400;

type Props = {
  params: Promise<{ slug: string }>;
};

const siteUrl = "https://www.icebreakergames.site";

function normalizeWhitespace(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function truncateMeta(text: string, maxLength: number) {
  const normalized = normalizeWhitespace(text);
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

function toAbsoluteUrl(url: string) {
  try {
    return new URL(url, siteUrl).toString();
  } catch {
    return new URL("/img/Hero.png", siteUrl).toString();
  }
}

function buildDefaultTitle(gameTitle: string) {
  return `${gameTitle} Icebreaker Game | How to Play`;
}

function buildDefaultDescription(game: Game) {
  const category = game.category ? game.category.toLowerCase() : "group";
  const players = game.players || "any group size";
  const duration = game.duration || "a few minutes";

  return truncateMeta(
    `Learn how to play ${game.title}, a ${category} icebreaker game for ${players}. Duration: ${duration}. Rules, steps, and facilitation tips included.`,
    160
  );
}

async function loadGame(slugOrId: string) {
  const bySlug = await getGameBySlug(slugOrId);
  if (bySlug) return { game: bySlug, shouldRedirect: false };

  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      slugOrId
    );
  if (!isUuid) return { game: null as Game | null, shouldRedirect: false };

  const byId = await getGameById(slugOrId);
  if (!byId) return { game: null as Game | null, shouldRedirect: false };

  return { game: byId, shouldRedirect: true };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { game } = await loadGame(slug);

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

  let description = buildDefaultDescription(game);
  if (game.title === "Find Your Match") {
    description = "Find Your Match | Ice Breaker Games: Participants get cards with famous pairs and find their match by asking questions. Perfect ice breaker for networking events!";
  } else if (game.title === "Human Bingo") {
    description = "Human Bingo - Ice Breaker Games for social events. Fun networking game where participants find people matching bingo card descriptions. Perfect for parties!";
  } else if (game.title === "Alliterative Name Game") {
    description =
      "Learn how to play the Alliterative Name Game (Adjective Name Game). A quick name icebreaker for 8-40 people (8-12 min) with rules, examples, and variations.";
  } else if (game.title === "One Word Check-In") {
    description =
      "Learn how to run a One Word Check-In icebreaker for meetings and teams. A fast 3–8 minute check-in with simple prompts, examples, and facilitation tips.";
  } else if (game.title === "Two Truths and a Lie") {
    description =
      "Learn how to play Two Truths and a Lie: rules, examples, and question ideas for teams, classrooms, and meetings. 5–40 players, 8–15 minutes.";
  } else if (game.title === "Minefield") {
    description =
      "Learn how to run the Minefield team building game: setup, rules, facilitation tips, and debrief questions. Great for trust and communication.";
  } else if (game.title === "The Name Game") {
    description =
      "Learn how to play The Name Game, a simple name icebreaker for meetings and classrooms. 8–20 players, 5–10 minutes. Rules, examples, and variations.";
  } else if (game.title === "The Question Web") {
    description =
      "Learn how to run The Question Web icebreaker using yarn or string. A fun get-to-know activity for 8–25 people with prompts, steps, and debrief tips.";
  } else if (game.title === "Count Up") {
    description =
      "Learn how to play Count Up: a listening and teamwork icebreaker where the group counts together without talking over each other. 8–25 players, 3–10 minutes.";
  } else if (game.title === "Motion Name-Game") {
    description =
      "Learn how to play Motion Name-Game, a movement-based name icebreaker. 8–30 players, 8–12 minutes. Steps, examples, and variations included.";
  } else if (game.title === "Telephone Charades") {
    description =
      "Learn how to play Telephone Charades: act a prompt down a line and see how it changes. 10–40 players, 10–15 minutes. Rules and prompt ideas included.";
  } else if (game.title === "Guess Who") {
    description =
      "Learn how to play Guess Who (icebreaker): collect fun facts and guess who they belong to. Rules, examples, and facilitation tips for teams and classrooms.";
  } else if (game.slug === "diversity-bingo") {
    description =
      "Learn how to play Diversity Bingo: a friendly icebreaker where people find shared experiences and differences. Rules, tips, and example prompts included.";
  } else if (game.slug === "skribbl-pictionary-online") {
    description =
      "Learn how to run an online Pictionary icebreaker using Skribbl-style prompts. Setup tips, rules, and variations for teams and classrooms.";
  } else if (game.slug === "telephone-charades-lines") {
    description =
      "Learn how to play Telephone Charades (Lines): two lines act prompts down the chain while the last players guess. Rules, prompts, and facilitation tips included.";
  } else if (game.title === "Dicebreakers") {
    description =
      "Learn how to play Dicebreakers: roll a die to choose prompts and start real conversations fast. A simple icebreaker for 4–30 people with questions and variations.";
  } else if (game.slug === "topics-tables") {
    description =
      "Learn how to run Topics Tables: a simple conversation icebreaker using themed prompts at each table. Great for meetings, workshops, and dinners with tips and variations.";
  } else if (game.slug === "unique-and-shared") {
    description =
      "Learn how to play Unique and Shared: a quick get-to-know icebreaker where people find one thing unique and one thing in common. Rules, examples, and facilitation tips included.";
  } else if (game.title === "Common Ground") {
    description =
      "Learn how to play Common Ground: a quick icebreaker where people find things they share in common. Great for teams and classrooms with rules, examples, and variations.";
  } else if (game.title === "The Check-In") {
    description =
      "Learn how to run The Check-In: a fast team check-in icebreaker with simple prompts and facilitation tips. Great for meetings, workshops, and retrospectives.";
  } else if (game.slug === "remote-change-3-things") {
    description =
      "Learn how to play Remote Change 3 Things: a quick virtual icebreaker for observation and laughter. 6–40 people, 5–10 minutes. Rules and variations included.";
  } else if (game.slug === "ornament-guess") {
    description =
      "Learn how to play Ornament Guess: a fun guessing icebreaker for holiday parties and teams. Rules, examples, and facilitator tips included.";
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

  const title =
    game.title === "Emoji Introduction"
      ? "Emoji Introduction Ice Breaker Game - Fun Virtual Meeting Activity"
      : game.title === "Emoji Check-In"
        ? "Emoji Check-In Ice Breaker Game - Quick Mood Sharing Activity"
        : game.title === "Alliterative Name Game"
          ? "Alliterative Name Game (Adjective Name Game) | How to Play + Examples"
          : game.title === "One Word Check-In"
            ? "One Word Check-In Icebreaker | Quick Team Check-In Prompts"
            : game.title === "Two Truths and a Lie"
              ? "Two Truths and a Lie Icebreaker | Rules, Examples & Questions"
              : game.title === "Minefield"
                ? "Minefield Team Building Game | How to Play + Debrief"
                : game.title === "The Name Game"
                  ? "The Name Game Icebreaker | How to Play + Examples"
                  : game.title === "The Question Web"
                    ? "The Question Web Icebreaker | How to Play + Prompts"
                    : game.title === "Count Up"
                      ? "Count Up Team Building Game | Rules + Tips"
                      : game.title === "Motion Name-Game"
                        ? "Motion Name-Game Icebreaker | How to Play + Examples"
                        : game.title === "Telephone Charades"
                          ? "Telephone Charades Game | How to Play + Prompts"
                          : game.title === "Guess Who"
                            ? "Guess Who Icebreaker Game | How to Play + Examples"
                            : game.slug === "diversity-bingo"
                              ? "Diversity Bingo Icebreaker | How to Play + Prompts"
                              : game.slug === "skribbl-pictionary-online"
                                ? "Online Pictionary Icebreaker | How to Play (Skribbl)"
                                : game.slug === "telephone-charades-lines"
                                  ? "Telephone Charades (Lines) | How to Play + Prompts"
                      : game.title === "Dicebreakers"
                        ? "Dicebreakers Icebreaker Game | How to Play + Prompts"
                        : game.slug === "topics-tables"
                          ? "Topics Tables Icebreaker | How to Run + Prompts"
                          : game.slug === "unique-and-shared"
                            ? "Unique and Shared Icebreaker | How to Play"
                            : game.title === "Common Ground"
                              ? "Common Ground Icebreaker | How to Play + Examples"
                              : game.title === "The Check-In"
                                ? "The Check-In Icebreaker | Quick Team Check-In Prompts"
                                : game.slug === "remote-change-3-things"
                                  ? "Remote Change 3 Things | Quick Virtual Icebreaker"
                                  : game.slug === "ornament-guess"
                                    ? "Ornament Guess Icebreaker | How to Play + Tips"
        : buildDefaultTitle(game.title);

  const openGraphImageUrl = toAbsoluteUrl(
    game.title === "Emoji Check-In" ? "/img/EmojiCheck-In-social.jpg" : imageUrl
  );

  return {
    title,
    description,
    alternates: {
      canonical: gameUrl,
    },
    openGraph: {
      type: "article",
      url: gameUrl,
      title,
      description,
      siteName: "Ice Breaker Games",
      images: [
        {
          url: openGraphImageUrl,
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
      title,
      description,
      images: [openGraphImageUrl],
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
  const { game, shouldRedirect } = await loadGame(slug);

  if (!game) notFound();
  if (shouldRedirect) redirect(`/games/${game.slug}`);

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
  } else if (game.title === "Alliterative Name Game") {
    jsonLdDescription =
      "The Alliterative Name Game (Adjective Name Game) is a quick name icebreaker where each person shares an adjective that starts with the same letter as their name, then the group repeats the growing list to build memory and connection.";
  } else if (game.title === "One Word Check-In") {
    jsonLdDescription =
      "One Word Check-In is a quick icebreaker for meetings where each participant shares a single word that describes their mood, focus, or energy. It builds psychological safety, helps the facilitator read the room, and gets everyone speaking early.";
  } else if (game.title === "Two Truths and a Lie") {
    jsonLdDescription =
      "Two Truths and a Lie is a classic icebreaker where each person shares three statements (two true and one false) and the group guesses the lie. It sparks conversation, helps teams learn surprising facts, and works in-person or virtually.";
  } else if (game.title === "Minefield") {
    jsonLdDescription =
      "Minefield is a team building game about trust and communication. One participant guides a blindfolded partner through obstacles using only verbal instructions, then the group debriefs what made communication effective.";
  } else if (game.title === "The Name Game") {
    jsonLdDescription =
      "The Name Game is a simple name icebreaker where each person repeats the names of the people before them, then adds their own. It builds attention, helps the group learn names quickly, and works well for new teams and classrooms.";
  } else if (game.title === "The Question Web") {
    jsonLdDescription =
      "The Question Web is an icebreaker using a ball of yarn or string. Participants toss the yarn while asking and answering questions, creating a visible web that represents group connection and shared attention.";
  } else if (game.title === "Count Up") {
    jsonLdDescription =
      "Count Up is a teamwork and listening game where the group tries to count upward together without speaking over each other or establishing a pattern. It highlights coordination, patience, and collective awareness.";
  } else if (game.title === "Motion Name-Game") {
    jsonLdDescription =
      "Motion Name-Game is a name icebreaker where each person pairs their name with a unique gesture, and the group repeats the growing sequence. It reinforces memory through movement and creates quick energy.";
  } else if (game.title === "Telephone Charades") {
    jsonLdDescription =
      "Telephone Charades is a blend of telephone and charades. A prompt is silently acted down a line, and the final person guesses the original prompt, often with hilarious results.";
  } else if (game.title === "Guess Who") {
    jsonLdDescription =
      "Guess Who (icebreaker) is a game where participants submit fun facts and the group guesses who each fact belongs to. It builds curiosity and quick personal connection.";
  } else if (game.slug === "diversity-bingo") {
    jsonLdDescription =
      "Diversity Bingo is an icebreaker where people find others who match prompts related to experiences, preferences, or backgrounds. It encourages conversation and connection in a respectful way.";
  } else if (game.slug === "skribbl-pictionary-online") {
    jsonLdDescription =
      "Online Pictionary (Skribbl-style) is an interactive icebreaker where players draw prompts and others guess in real time. It works well for remote teams and online classes.";
  } else if (game.slug === "telephone-charades-lines") {
    jsonLdDescription =
      "Telephone Charades (Lines) is a large-group version of Telephone Charades using two lines. Players act prompts down the chain and the last players guess the original prompt.";
  } else if (game.title === "Dicebreakers") {
    jsonLdDescription =
      "Dicebreakers is an icebreaker where participants roll a die to select a prompt, then share a short answer. It makes it easy to start conversations and works well for meetings, workshops, and classrooms.";
  } else if (game.slug === "topics-tables") {
    jsonLdDescription =
      "Topics Tables is a conversation icebreaker where each table gets a themed set of prompts. Participants discuss for a few minutes, then optionally rotate tables to meet new people and explore new topics.";
  } else if (game.slug === "unique-and-shared") {
    jsonLdDescription =
      "Unique and Shared is a get-to-know icebreaker where people find one thing unique about themselves and one thing they share with a partner or small group. It creates quick connection without forcing oversharing.";
  } else if (game.title === "Common Ground") {
    jsonLdDescription =
      "Common Ground is an icebreaker where participants quickly find things they have in common through short conversations. It helps groups feel connected fast and works well for teams, classrooms, and workshops.";
  } else if (game.title === "The Check-In") {
    jsonLdDescription =
      "The Check-In is a simple team icebreaker where each person shares a quick update using a prompt (for example: one word, a color, a weather report, or a win and a challenge). It improves presence, alignment, and psychological safety.";
  } else if (game.slug === "remote-change-3-things") {
    jsonLdDescription =
      "Remote Change 3 Things is a quick virtual icebreaker where one person changes three small things off camera, and the group tries to spot the changes. It energizes remote meetings and encourages observation and attention.";
  } else if (game.slug === "ornament-guess") {
    jsonLdDescription =
      "Ornament Guess is a light, fun guessing icebreaker often used in holiday gatherings. Participants share an ornament (or a story clue) and the group guesses what it represents, sparking conversation and laughter.";
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
        headline: game.title === "Find Your Match" ? "Find Your Match | Ice Breaker Games" : game.title === "Human Bingo" ? "Human Bingo - Ice Breaker Game" : game.title === "Chat Waterfall" ? "Chat Waterfall | Ice Breaker Games" : game.title === "Emoji Introduction" ? "Emoji Introduction - Ice Breaker Game for Virtual Meetings" : game.title === "Emoji Check-In" ? "Emoji Check-In - Quick Mood Sharing Ice Breaker Game" : game.title === "Alliterative Name Game" ? "Alliterative Name Game (Adjective Name Game) | How to Play + Examples" : game.title === "One Word Check-In" ? "One Word Check-In Icebreaker | Quick Team Check-In Prompts" : game.title === "Two Truths and a Lie" ? "Two Truths and a Lie Icebreaker | Rules, Examples & Questions" : game.title === "Minefield" ? "Minefield Team Building Game | How to Play + Debrief" : game.title === "The Name Game" ? "The Name Game Icebreaker | How to Play + Examples" : game.title === "The Question Web" ? "The Question Web Icebreaker | How to Play + Prompts" : game.title === "Count Up" ? "Count Up Team Building Game | Rules + Tips" : game.title === "Dicebreakers" ? "Dicebreakers Icebreaker Game | How to Play + Prompts" : game.slug === "topics-tables" ? "Topics Tables Icebreaker | How to Run + Prompts" : game.slug === "unique-and-shared" ? "Unique and Shared Icebreaker | How to Play" : game.title,
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
      }] : []),
      ...(game.title === "Alliterative Name Game" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "What is the Alliterative Name Game (Adjective Name Game)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Alliterative Name Game is a quick icebreaker where each person shares their name paired with an adjective that starts with the same letter (e.g., \"Curious Carlos\"). The group repeats the growing list, which helps people learn names fast."
            }
          },
          {
            "@type": "Question",
            "name": "How do you play the Alliterative Name Game?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pick an order around the circle. Person 1 says an alliterative adjective + name. Person 2 repeats Person 1, then adds their own. Continue around the group. The last person attempts to recite the full list."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Alliterative Name Game examples?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Examples include: \"Brave Ben\", \"Kind Kira\", \"Witty Will\", \"Helpful Hannah\", \"Joyful Jordan\", \"Thoughtful Theo\". Choose adjectives that are positive and easy to remember."
            }
          },
          {
            "@type": "Question",
            "name": "How many people and how long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It works best with about 8–40 people and usually takes 8–12 minutes, depending on the group size and whether you add a theme."
            }
          },
          {
            "@type": "Question",
            "name": "Can you use the Alliterative Name Game for work meetings or virtual teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. For work meetings, keep adjectives professional and optional (participants can choose neutral words). For virtual groups, run it in a fixed order and ask people to type their adjective-name in chat as a backup for memory."
            }
          }
        ]
      }] : []),
      ...(game.title === "One Word Check-In" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "What is a One Word Check-In?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A One Word Check-In is a quick icebreaker where each person shares one word that describes how they feel, what they need, or what they are focused on. It helps everyone speak early and gives the facilitator a fast read of the room."
            }
          },
          {
            "@type": "Question",
            "name": "How do you run a One Word Check-In in a meeting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ask a clear prompt (for example: \"One word for your energy today?\"). Go in a simple order. Each person shares one word, with an optional one-sentence explanation. Time-box the round and move on."
            }
          },
          {
            "@type": "Question",
            "name": "What are good One Word Check-In prompts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Try prompts like: energy, focus, mood, bandwidth, confidence, or intention. Example: \"One word for what you need from this meeting.\" Keep prompts light and optional in professional settings."
            }
          },
          {
            "@type": "Question",
            "name": "How long should a One Word Check-In take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most groups can do it in 3–8 minutes. For large groups, keep it strictly one word (no explanations) or use chat to collect answers simultaneously."
            }
          },
          {
            "@type": "Question",
            "name": "How do you run One Word Check-In for virtual teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For virtual meetings, collect one-word answers in chat (everyone hits send at once) or go around the participant list. If time is tight, ask for chat-only and summarize the overall themes."
            }
          }
        ]
      }] : []),
      ...(game.title === "Two Truths and a Lie" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Two Truths and a Lie?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each person shares three statements about themselves: two true and one false. The group asks a few follow-up questions, then votes on which statement is the lie. Reveal the answer and move to the next person."
            }
          },
          {
            "@type": "Question",
            "name": "How many people can play Two Truths and a Lie?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It works best with about 5–40 people. For large groups, split into breakout rooms or limit follow-up questions to keep the pace moving."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Two Truths and a Lie take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most groups finish in 8–15 minutes. A simple rule is 1–2 minutes per person for sharing, questions, and guessing."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Two Truths and a Lie examples?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Good statements are believable but interesting. Example set: \"I have lived in three countries\" (truth), \"I can juggle\" (truth), \"I once met a celebrity\" (lie). Avoid anything too personal for work settings."
            }
          },
          {
            "@type": "Question",
            "name": "How do you run Two Truths and a Lie for virtual meetings?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Have each person post their three statements in chat, then let others ask one or two questions before voting with reactions or a quick poll. Use breakout rooms for groups larger than 12–15."
            }
          }
        ]
      }] : []),
      ...(game.title === "Minefield" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "What is the Minefield team building game?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Minefield is a trust and communication activity where one person is blindfolded while a partner guides them through an obstacle course (the \"minefield\") using only verbal instructions."
            }
          },
          {
            "@type": "Question",
            "name": "How do you set up Minefield?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Create a clear walking path and place soft objects (cones, paper cups, stuffed items) as obstacles. Pair participants, designate one as the guide and one as the walker, and set safety rules before starting."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Minefield take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Minefield usually takes 15–25 minutes including setup, a few rounds, and a short debrief. Larger groups may need more time or multiple lanes."
            }
          },
          {
            "@type": "Question",
            "name": "What are good debrief questions for Minefield?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ask: What instructions were most helpful? When did you feel most/least trust? What assumptions did you make? How does this relate to communication at work?"
            }
          },
          {
            "@type": "Question",
            "name": "Is Minefield safe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, if you keep obstacles soft, set clear boundaries, and require walkers to move slowly. Always allow participants to opt out if they are uncomfortable being blindfolded."
            }
          }
        ]
      }] : []),
      ...(game.title === "The Name Game" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "What is The Name Game icebreaker?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Name Game is a simple circle icebreaker for learning names. Each person repeats the names of the people before them, then adds their own, helping the group build memory together."
            }
          },
          {
            "@type": "Question",
            "name": "How do you play The Name Game?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Choose an order around the circle. Person 1 says their name. Person 2 repeats Person 1 and adds their name. Continue until the last person repeats the full list and adds their name."
            }
          },
          {
            "@type": "Question",
            "name": "How many people and how long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It works best with about 8–20 people and takes around 5–10 minutes. For larger groups, split into smaller circles to keep it manageable."
            }
          },
          {
            "@type": "Question",
            "name": "How can you make The Name Game easier to remember?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Slow the pace, encourage clear pronunciation, and allow the group to help when someone forgets. You can also add a simple gesture with each name for extra memory support."
            }
          },
          {
            "@type": "Question",
            "name": "What variations work for meetings or virtual teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For meetings, keep it short and optional: names only, or name + role. For virtual teams, run it in participant-list order and ask everyone to type their name in chat as a backup."
            }
          }
        ]
      }] : []),
      ...(game.title === "The Question Web" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "What is The Question Web icebreaker?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Question Web is an icebreaker where participants toss a ball of yarn or string while asking and answering questions. The yarn forms a visible web that represents connections across the group."
            }
          },
          {
            "@type": "Question",
            "name": "What materials do you need for The Question Web?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You need a ball of yarn or string and an open space for people to stand in a circle. Optional: a list of safe prompts if the group needs help getting started."
            }
          },
          {
            "@type": "Question",
            "name": "How do you play The Question Web?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "One person holds the end of the yarn, asks someone a question, and tosses the yarn while holding their section. The receiver answers, holds their section, asks a new question, and tosses to another person. Continue until everyone is included."
            }
          },
          {
            "@type": "Question",
            "name": "How long does The Question Web take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It typically takes 15–30 minutes depending on group size and how long you spend on each question. You can time-box answers to keep it moving."
            }
          },
          {
            "@type": "Question",
            "name": "What are good prompt ideas for The Question Web?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Try: What is one small win this week? What is a hobby you enjoy? What is a value you care about? What is something you want to learn this year? Keep prompts safe for the context."
            }
          }
        ]
      }] : []),
      ...(game.title === "Count Up" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Count Up?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The group tries to count upward from 1 as high as possible. Only one person can say a number at a time. If two people speak at the same time, the group restarts at 1."
            }
          },
          {
            "@type": "Question",
            "name": "What is the goal of Count Up?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Count Up builds listening and group coordination. It helps teams practice patience, shared awareness, and adapting without a leader or fixed order."
            }
          },
          {
            "@type": "Question",
            "name": "How many people and how long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It works well with about 8–25 people and takes 3–10 minutes. You can run multiple rounds and celebrate a new high score."
            }
          },
          {
            "@type": "Question",
            "name": "What rules make Count Up more challenging?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Try no eye contact, or require a short pause between numbers. You can also switch to counting backwards or use a timer to add light pressure."
            }
          },
          {
            "@type": "Question",
            "name": "What are good debrief questions for Count Up?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ask: What helped us succeed? What caused resets? How did we adapt? Who took initiative and how? How does this relate to coordination at work?"
            }
          }
        ]
      }] : []),
      ...(game.title === "Dicebreakers" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "What is Dicebreakers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dicebreakers is an icebreaker where participants roll a die to select a prompt, then share a short answer. It creates fast conversation without needing complex rules."
            }
          },
          {
            "@type": "Question",
            "name": "How do you play Dicebreakers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Assign a prompt to each die number (1–6). One person rolls and answers the matching prompt. Rotate quickly around the group. Keep answers short and optional."
            }
          },
          {
            "@type": "Question",
            "name": "How many people and how long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dicebreakers works well with about 4–30 people and takes 8–12 minutes. For large groups, run it in small circles or breakout rooms."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Dicebreakers prompt ideas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Try prompts like: a small win this week, a hobby you enjoy, a favorite snack, a place you want to visit, something you are learning, or one thing you are grateful for."
            }
          },
          {
            "@type": "Question",
            "name": "Can Dicebreakers work for virtual meetings?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use a virtual dice roller or assign numbers and have someone call them out. You can also ask everyone to answer the same prompt at once in chat to keep it fast."
            }
          }
        ]
      }] : []),
      ...(game.slug === "topics-tables" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "What is Topics Tables?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Topics Tables is a conversation icebreaker where each table uses a themed set of prompts. People discuss for a few minutes, then optionally rotate to a new table with new topics."
            }
          },
          {
            "@type": "Question",
            "name": "How do you run Topics Tables at an event?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Place a short prompt list at each table. Set a timer (5–8 minutes). Participants discuss, then rotate tables or switch prompt cards. Close with a quick share-out of favorite answers."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Topics Tables prompts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use light, inclusive prompts like: a small win this week, a hobby you want to try, a favorite tradition, a best piece of advice, or a place you would revisit."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Topics Tables take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical session takes 15–30 minutes. Run 2–4 rounds of 5–8 minutes depending on the group size and energy."
            }
          },
          {
            "@type": "Question",
            "name": "When should you use Topics Tables?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Topics Tables works well for dinners, conferences, trainings, and workshops where you want conversation to feel natural but still guided by prompts."
            }
          }
        ]
      }] : []),
      ...(game.slug === "unique-and-shared" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "What is Unique and Shared?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Unique and Shared is an icebreaker where people find one thing unique about themselves and one thing they share in common with a partner or small group. It creates quick connection with low pressure."
            }
          },
          {
            "@type": "Question",
            "name": "How do you play Unique and Shared?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pair people up (or use groups of 3–4). Give them a few minutes to find one shared thing and one unique thing about each person. Invite quick share-outs and rotate partners if time allows."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It usually takes 8–15 minutes. Run one round for speed, or multiple rounds with partner rotations for larger groups."
            }
          },
          {
            "@type": "Question",
            "name": "What are good categories to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use safe categories like hobbies, music, food, travel, learning goals, or routines. In work settings, keep it professional and allow people to skip questions."
            }
          },
          {
            "@type": "Question",
            "name": "What is the benefit of Unique and Shared?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It balances belonging (shared) with individuality (unique), which helps groups build rapport quickly without forcing personal disclosure."
            }
          }
        ]
      }] : []),
      ...(game.title === "Motion Name-Game" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Motion Name-Game?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Stand in a circle. Each person says their name with a unique motion. The group repeats the name and motion. Continue around the circle, building a growing sequence that everyone repeats."
            }
          },
          {
            "@type": "Question",
            "name": "Why does Motion Name-Game help with remembering names?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pairing a name with a motion creates an extra memory cue. Repeating the sequence also reinforces recall and increases attention."
            }
          },
          {
            "@type": "Question",
            "name": "How many people and how long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It works well with 8–30 people and typically takes 8–12 minutes. For large groups, split into smaller circles."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Motion Name-Game variations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Try name + motion + role, or allow people to choose a simple gesture they are comfortable with. You can also repeat only the last 3–5 people for very large groups."
            }
          },
          {
            "@type": "Question",
            "name": "Can Motion Name-Game work in a work meeting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, if you keep motions simple and optional. Frame it as a quick memory exercise and allow people to pass or choose a minimal gesture."
            }
          }
        ]
      }] : []),
      ...(game.title === "Telephone Charades" || game.slug === "telephone-charades-lines" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Telephone Charades?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Form a line. The first person sees a prompt and silently acts it for the next person. The action passes down the line until the last person guesses the original prompt. Compare the start and end for laughs."
            }
          },
          {
            "@type": "Question",
            "name": "How many people can play Telephone Charades?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It works well with about 10–40 people. For large groups, run two lines in parallel (Telephone Charades Lines) to keep everyone active."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Telephone Charades take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most rounds take 2–4 minutes. A full activity usually takes 10–15 minutes depending on the number of rounds and group size."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Telephone Charades prompts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use simple actions like: brushing teeth, cooking pasta, walking a dog, riding a bike, opening an umbrella, or playing an instrument. Keep prompts appropriate for the audience."
            }
          },
          {
            "@type": "Question",
            "name": "What tips make Telephone Charades run smoothly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Enforce no talking, allow one repeat of the action if needed, and keep the line moving. Choose clear prompts and keep rounds short."
            }
          }
        ]
      }] : []),
      ...(game.title === "Guess Who" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Guess Who (icebreaker)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Collect 1–3 fun facts from each person anonymously. Read one fact aloud and let the group guess who it belongs to. Reveal the answer and allow a brief follow-up."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Guess Who icebreaker facts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use light, safe facts like: a hobby, a small talent, a favorite food, a place visited, a pet story, or a fun first job. Avoid anything sensitive in work settings."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Guess Who take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It typically takes 10–20 minutes depending on the group size. Keep guesses and reveals short to maintain energy."
            }
          },
          {
            "@type": "Question",
            "name": "Can Guess Who be played virtually?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Collect facts via a form or chat before the meeting, then read them aloud and have people vote in chat or with reactions."
            }
          },
          {
            "@type": "Question",
            "name": "How do you keep Guess Who inclusive?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Allow people to skip or submit a simple fact. Avoid prompts that require money, travel, or specific cultural references."
            }
          }
        ]
      }] : []),
      ...(game.slug === "diversity-bingo" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "What is Diversity Bingo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Diversity Bingo is an icebreaker where participants find people who match prompts related to experiences, preferences, or backgrounds. The goal is to start conversations and notice both differences and shared points."
            }
          },
          {
            "@type": "Question",
            "name": "How do you run Diversity Bingo respectfully?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use prompts that are safe and optional, avoid sensitive identity questions, and allow people to pass. Frame the activity as connection-building, not personal disclosure."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Diversity Bingo take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It usually takes 10–20 minutes depending on group size and whether you play for one line or a full card."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Diversity Bingo prompts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use prompts like: speaks more than one language, has lived in another city, has a unique hobby, prefers tea over coffee, or enjoys the same music genre. Keep prompts inclusive and non-sensitive."
            }
          },
          {
            "@type": "Question",
            "name": "Can Diversity Bingo work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use a shared sheet or board and breakout rooms, or run it as a chat-based find-someone-who activity."
            }
          }
        ]
      }] : []),
      ...(game.slug === "skribbl-pictionary-online" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "What is an online Pictionary icebreaker?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An online Pictionary icebreaker is a drawing game where one person draws a prompt and others guess in real time. It is a fast way to energize remote groups and encourage participation."
            }
          },
          {
            "@type": "Question",
            "name": "How do you run Skribbl-style Pictionary for a team?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Choose a drawing tool, set rounds and time limits, and keep prompts simple and safe for work. Rotate drawers quickly and celebrate fun guesses rather than perfect drawings."
            }
          },
          {
            "@type": "Question",
            "name": "How long should a round be?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most groups use 60–90 seconds per round. A full icebreaker can be 8–15 minutes depending on group size and number of rounds."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Pictionary prompts for icebreakers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use simple, friendly prompts like coffee, beach, laptop, teamwork, umbrella, pizza, or rocket. Avoid niche references so everyone can guess."
            }
          },
          {
            "@type": "Question",
            "name": "What makes online Pictionary work well for virtual meetings?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is visual, fast, and inclusive. People can participate by guessing in chat, and the focus stays on fun and collaboration."
            }
          }
        ]
      }] : []),
      ...(game.title === "Common Ground" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Common Ground?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pair people up or use small groups. Give them 2–3 minutes to find as many things they have in common as possible. Share a few highlights, then rotate partners for another round."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Common Ground categories?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use safe categories like hobbies, favorite foods, routines, music, learning goals, or work preferences. Avoid sensitive identity topics in mixed work settings."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Common Ground take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical version takes 8–15 minutes. Run 2–3 rounds of 2–4 minutes each, plus a quick share-out."
            }
          },
          {
            "@type": "Question",
            "name": "What if people struggle to find things in common?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Provide a short list of starter categories, or switch to prompts like ‘two things we both enjoy’ and ‘one thing we both want to learn’ to make it easier."
            }
          },
          {
            "@type": "Question",
            "name": "Can Common Ground work virtually?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use breakout rooms of 2–4 people and a shared timer. Ask each group to post their top commonalities in chat at the end of each round."
            }
          }
        ]
      }] : []),
      ...(game.title === "The Check-In" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "What is The Check-In?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Check-In is a quick icebreaker where each person shares a short update using a prompt (for example: one word, a color, weather, a win, or a challenge). It helps groups become present and aligned."
            }
          },
          {
            "@type": "Question",
            "name": "How long should a check-in take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most teams keep it to 3–8 minutes. Time-box each person (10–30 seconds) and use one prompt per round."
            }
          },
          {
            "@type": "Question",
            "name": "What are good check-in prompts for meetings?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Try: one word for your energy, a color for your mood, weather report, a small win, one thing you need, or one thing you want from this meeting."
            }
          },
          {
            "@type": "Question",
            "name": "How do you keep check-ins safe and inclusive?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Make sharing optional, allow people to pass, and keep prompts professional. Avoid asking for personal details and keep the tone supportive."
            }
          },
          {
            "@type": "Question",
            "name": "Can The Check-In work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Run it in the main room and let people answer by voice or chat. For large groups, collect responses in chat and read a few themes aloud."
            }
          }
        ]
      }] : []),
      ...(game.slug === "remote-change-3-things" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Remote Change 3 Things?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "One person turns off their camera (or steps away) and changes three small things (for example: glasses, background item, hair, lighting). They return and the group tries to spot the three changes."
            }
          },
          {
            "@type": "Question",
            "name": "What are good things to change?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Try small, safe changes like: switch a mug, move a book, change a hat, adjust lighting, swap headphones, or add/remove a background object."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A round takes about 2–3 minutes. Most groups do 2–4 rounds for a total of 5–10 minutes."
            }
          },
          {
            "@type": "Question",
            "name": "How do you run it with a large group?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use volunteers and keep rounds short. Let people guess in chat so more participants can contribute at once."
            }
          },
          {
            "@type": "Question",
            "name": "What is a good variation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Try ‘Change 1 Thing’ for speed, or ‘Change 5 Things’ for a challenge. You can also theme changes (desk items only, background only, color only)."
            }
          }
        ]
      }] : []),
      ...(game.slug === "ornament-guess" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Ornament Guess?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each person shares an ornament (or a photo of it) and gives one clue. The group guesses what the ornament represents or why it is meaningful. Reveal the story and move to the next person."
            }
          },
          {
            "@type": "Question",
            "name": "Do you need real ornaments?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. You can use any small object, a photo, or a virtual background item. The key is a short clue and a quick reveal."
            }
          },
          {
            "@type": "Question",
            "name": "How do you keep it inclusive at work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Keep it optional and avoid assuming everyone celebrates the same holidays. Frame it as ‘meaningful object guess’ and allow people to share something neutral if they prefer."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Ornament Guess take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Plan 1–2 minutes per person. For large groups, use small breakout rooms or ask for 3–5 volunteers and rotate each meeting."
            }
          },
          {
            "@type": "Question",
            "name": "What are good variations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Try ‘two clues then guess’, ‘guess the year’, or group voting for the funniest or most surprising story. For virtual teams, share photos in chat."
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
