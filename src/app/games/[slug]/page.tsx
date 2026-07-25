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
    description =
      "How to play Human Bingo: networking icebreaker with printable-style prompts, rules, and tips. 10–50 players, 20–30 minutes. See games like Human Bingo too.";
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
    description = "Run an Emoji Introduction activity for meetings, classrooms, and remote teams. Includes rules, emoji examples, facilitator script, variations, and safety tips.";
  } else if (game.title === "Emoji Check-In") {
    description = "Run a quick Emoji Check-In icebreaker for meetings and online classes. Includes mood prompts, examples, facilitation tips, and remote team variations.";
  } else if (game.title === "Icebreaker Bingo") {
    description =
      "Learn how to play Icebreaker Bingo: a large-group mingling game where participants find people matching prompts on a bingo card. 12–100+ players, 10–20 minutes.";
  } else if (game.title === "Find Your Match") {
    description =
      "Learn how to play Find Your Match: a pairing icebreaker game where participants find their matching partner by asking questions. Perfect for networking events!";
  } else if (game.title === "Wheel of Fortune Introductions") {
    description =
      "Learn how to run Wheel of Fortune Introductions: a playful virtual meeting opener where participants spin a wheel and answer prompts. 6–50 players, 8–15 minutes.";
  } else if (game.title === "Six Word Memoirs") {
    description =
      "Learn how to play Six Word Memoirs: a storytelling icebreaker where participants share their life in six words. 4–30 players, 10–15 minutes. Rules and tips included.";
  } else if (game.title === "Where Do We Come From & What Is Famous?") {
    description =
      "Learn how to play Where Do We Come From & What Is Famous?: a cultural icebreaker where participants share hometowns and local highlights. 6–50 players, 10–20 minutes.";
  } else if (game.title === "Never Have I Ever") {
    description =
      "Learn how to play Never Have I Ever: a sharing icebreaker where participants reveal things they have never done. Rules, examples, and variations for teams and classrooms.";
  } else if (game.title === "This or That Questions") {
    description =
      "Learn how to run This or That Questions: a quick binary-choice icebreaker for meetings and teams. 4–50 players, 5–10 minutes. Prompts and facilitation tips included.";
  } else if (game.title === "Would You Rather") {
    description =
      "Learn how to play Would You Rather: a fun opinion icebreaker where participants choose between two options and explain. 4–30 players, 5–15 minutes. Questions and variations included.";
  } else if (game.title === "Rock Paper Scissors Tournament") {
    description =
      "Learn how to run a Rock Paper Scissors Tournament: a high-energy large-group icebreaker with a bracket competition. 10–100+ players, 10–20 minutes. Setup and tips included.";
  } else if (game.title === "Fantasy Vacation") {
    description =
      "Learn how to play Fantasy Vacation: a creative conversation icebreaker where participants share dream travel destinations. 4–30 players, 8–15 minutes. No materials needed.";
  } else if (game.title === "Mystery Envelope") {
    description =
      "Learn how to play Mystery Envelope: a surprise icebreaker where participants draw prompts from envelopes and discuss. 6–50 players, 10–15 minutes. Examples and tips included.";
  } else if (game.title === "Invention Pitch") {
    description =
      "Learn how to run Invention Pitch: a creative team building game where small groups pitch playful inventions. 6–30 players, 15–25 minutes. Rules and variation ideas included.";
  } else if (game.title === "Scavenger Hunt") {
    description =
      "Learn how to run a Scavenger Hunt: a team competition where participants find items or complete challenges within a time limit. 10–100+ players, 30–60 minutes. Setup and tips included.";
  } else if (game.title === "Show and Tell") {
    description =
      "Learn how to run Show and Tell: a storytelling icebreaker where participants share meaningful objects and their stories. 4–15 players, 20–40 minutes. Tips for facilitation included.";
  } else if (game.title === "Appreciation Circle") {
    description =
      "Learn how to run an Appreciation Circle: a gratitude activity where participants share what they appreciate about each other. 5–20 players, 15–30 minutes. How-to and tips included.";
  } else if (game.title === "Line-Up") {
    description =
      "Learn how to run Line-Up: a non-verbal team challenge where participants silently arrange themselves by a criterion. 10–40 players, 5–15 minutes. Steps and debrief questions included.";
  } else if (game.title === "Take a Picture of Your Shoes") {
    description =
      "Learn how to play Take a Picture of Your Shoes: a quick virtual icebreaker where participants share shoe photos and stories. 5–30 players, 5–10 minutes. Examples and tips included.";
  } else if (game.title === "Near and Far") {
    description =
      "Learn how to run Near and Far: a movement-based icebreaker where participants position themselves by prompts. 10–50 players, 10–20 minutes. Steps and debrief ideas included.";
  } else if (game.title === "Desert Island Scenario") {
    description =
      "Learn how to run Desert Island Scenario: a creative get-to-know-you icebreaker where participants choose three items to bring. 4–20 players, 15–25 minutes. Examples and discussion prompts included.";
  } else if (game.title === "Guess Who (Personal Trivia)") {
    description =
      "Learn how to play Guess Who (Personal Trivia): participants submit fun facts and the group guesses who each fact belongs to. 8–40 players, 10–20 minutes. Rules and facilitation tips included.";
  } else if (game.title === "Team Trivia") {
    description =
      "Learn how to run Team Trivia: a knowledge competition where teams answer quiz questions together. 10–100+ players, 30–60 minutes. Setup and team formats included.";
  } else if (game.title === "Hot Takes") {
    description =
      "Learn how to run Hot Takes: a fast-paced opinion icebreaker where participants share and debate hot takes. 6–30 players, 10–20 minutes. Prompts and facilitation tips included.";
  } else if (game.title === "Online Charades") {
    description =
      "Learn how to play Online Charades: a virtual charades game where participants act out prompts for others to guess. 4–20 players, 10–20 minutes. Tips and prompt ideas included.";
  } else if (game.title === "Mingle Bingo") {
    description =
      "Learn how to play Mingle Bingo: a mingling icebreaker where participants find people matching bingo prompts. 10–50 players, 15–25 minutes. Setup and prompt ideas included.";
  } else if (game.title === "What's Missing") {
    description =
      "Learn how to play What's Missing: an observation icebreaker where participants recall items removed from view. 4–20 players, 5–10 minutes. Steps and variations included.";
  } else if (game.title === "Storytelling Circle") {
    description =
      "Learn how to run Storytelling Circle: a collaborative story-building icebreaker where participants add sentences in turn. 6–30 players, 10–20 minutes. Examples and facilitation tips included.";
  } else if (game.title === "Word Association") {
    description =
      "Learn how to play Word Association: a fast-paced mental warm-up where participants say the first word that comes to mind. 6–30 players, 5–15 minutes. How to run and debrief tips.";
  } else if (game.title === "Human Bingo") {
    description =
      "How to play Human Bingo: networking icebreaker with prompts, rules, and tips. 10–50 players, 20–30 minutes. Includes links to games like Human Bingo.";
  } else if (game.title === "Emoji Introduction") {
    description =
      "Learn how to play Emoji Introduction: participants introduce themselves using emojis and others guess the meaning. 5–30 players, 10–15 minutes. Steps and variation ideas included.";
  } else if (game.title === "Emoji Check-In") {
    description =
      "Learn how to play Emoji Check-In: a quick mood-sharing activity where participants express how they feel using emojis. 3–30 players, 3–5 minutes. Examples and variation ideas included.";
  } else if (game.title === "Chat Waterfall") {
    description =
      "Learn how to play Chat Waterfall: a high-energy virtual icebreaker where everyone types answers simultaneously and sends at once. 5–100+ players, 5–15 minutes. Setup and prompt ideas included.";
  } else if (game.title === "Virtual Background Story") {
    description =
      "Learn how to play Virtual Background Story: participants share creative virtual backgrounds and the story behind them. 5–30 players, 10–15 minutes. Prompt ideas and variation tips included.";
  } else if (game.title === "Speed Networking") {
    description =
      "Learn how to run Speed Networking: a structured networking activity where participants rotate through brief conversations. 10–100+ players, 30–45 minutes. Setup and conversation prompts included.";
  } else if (game.title === "Find Your Match") {
    description =
      "Learn how to play Find Your Match: a pairing icebreaker where participants find matching partners by asking yes/no questions. 10–50 players, 15–20 minutes. Setup and variation tips included.";
  } else if (game.title === "Desert Island Scenario") {
    description =
      "Learn how to play Desert Island Scenario: a creative get-to-know-you activity where participants choose three items to bring. 4–20 players, 15–25 minutes. Examples and discussion prompts included.";
  } else if (game.title === "Story Swap") {
    description =
      "Learn how to play Story Swap: a paired storytelling icebreaker where partners exchange stories using visual prompts. 6–40 players, 10–15 minutes. Steps and variation tips included.";
  } else if (game.title === "If Then") {
    description =
      "Learn how to play If Then: a creative icebreaker where participants complete playful If/Then prompts. 5–30 players, 8–12 minutes. Prompt ideas and facilitation tips included.";
  } else if (game.title === "Crossword Names") {
    description =
      "Learn how to run Crossword Names: a name-learning icebreaker that creates a visual crossword of participants' names. 8–30 players, 10–15 minutes. Steps and tips included.";
  } else if (game.title === "Blind Name-Tag") {
    description =
      "Learn how to play Blind Name-Tag: a fun movement icebreaker where participants guess their own name from clues. 8–40 players, 10–15 minutes. How-to and tips included.";
  } else if (game.title === "Sole Mate") {
    description =
      "Learn how to play Sole Mate: a quick pairing game using tokens to form random pairs for activities. 10–60 players, 5–8 minutes. Setup and variation tips included.";
  } else if (game.title === "Year Of The Coin") {
    description =
      "Learn how to play Year Of The Coin: a storytelling icebreaker where participants share a memory from a drawn year. 4–30 players, 8–12 minutes. Prompt ideas and facilitation tips included.";
  } else if (game.title === "Name That Movie Quote") {
    description =
      "Learn how to play Name That Movie Quote: a pop-culture icebreaker where participants guess movies from quotes. 4–30 players, 8–12 minutes. Examples and variation tips included.";
  } else if (game.title === "10 Things in Common") {
    description =
      "Learn how to play 10 Things in Common: a paired discovery activity where partners find shared interests. 6–50 players, 8–12 minutes. Steps and variation tips included.";
  } else if (game.title === "Guess That Team Member") {
    description =
      "Learn how to play Guess That Team Member: an anonymous fact guessing game for teams. 6–40 players, 10–15 minutes. Setup and facilitation tips included.";
  } else if (game.title === "Skittles Sharing") {
    description =
      "Learn how to play Skittles Sharing: a candy-based icebreaker where participants answer prompts by color. 6–40 players, 8–12 minutes. Setup and variation tips included.";
  } else if (game.title === "News Headline Warm-up") {
    description =
      "Learn how to run News Headline Warm-up: a creative brainstorming activity where participants write headlines about the topic. 4–30 players, 8–12 minutes. Examples and facilitation tips included.";
  } else if (game.title === "Team Superpower Collage") {
    description =
      "Learn how to run Team Superpower Collage: a visual team identity activity where groups create a superpower collage. 6–25 players, 15–25 minutes. Setup and facilitation tips included.";
  } else if (game.title === "Two Truths and a Dream") {
    description =
      "Learn how to play Two Truths and a Dream: a creative twist on get-to-know-you where participants share two facts and one aspiration. 4–30 players, 8–12 minutes. Steps and tips included.";
  } else if (game.title === "Reception Line") {
    description =
      "Learn how to run Reception Line: a fast-paced introduction game where participants answer prompts in two facing lines. 10–50 players, 10–15 minutes. Setup and prompt ideas included.";
  } else if (game.title === "Marshmallow Challenge") {
    description =
      "Learn how to run the Marshmallow Challenge: a team building activity where teams build towers to support a marshmallow. 8–40 players, 15–25 minutes. Setup and variation tips included.";
  } else if (game.title === "Picture Sharing") {
    description =
      "Learn how to play Picture Sharing: a visual storytelling icebreaker where participants share meaningful photos. 4–30 players, 8–12 minutes. Tips and variation ideas included.";
  } else if (game.title === "Train Wreck") {
    description =
      "Learn how to play Train Wreck: a high-energy movement mixer where participants swap seats when statements apply. 12–50 players, 10–15 minutes. How-to and tips included.";
  } else if (game.title === "Human Knot") {
    description =
      "Learn how to play Human Knot: a physical team challenge where participants untangle a human knot without letting go. 8–30 players, 10–15 minutes. Steps and variation tips included.";
  } else if (game.title === "Sing-Off") {
    description =
      "Learn how to run a Sing-Off: a music-based team activity where teams compete by singing songs containing a theme word. 10–60 players, 10–15 minutes. Setup and tips included.";
  } else if (game.title === "Beach Ball Q&A") {
    description =
      "Learn how to play Beach Ball Q&A: a fun tossing game where participants answer prompts written on a beach ball. 10–40 players, 10–15 minutes. Setup and variation tips included.";
  } else if (game.title === "Pterodactyl") {
    description =
      "Learn how to play Pterodactyl: a hilarious circle game where participants say 'pterodactyl' without showing teeth. 8–30 players, 8–12 minutes. Rules and variation tips included.";
  } else if (game.title === "Chainlink") {
    description =
      "Learn how to play Chainlink: an introduction chain activity where participants link facts with shared traits. 8–40 players, 10–15 minutes. Steps and tips included.";
  }

  const title =
    game.title === "Emoji Introduction"
      ? "Emoji Introduction Activity | Emoji Icebreaker for Meetings"
      : game.title === "Emoji Check-In"
        ? "Emoji Check-In Icebreaker | Quick Mood Activity for Teams"
        : game.title === "Alliterative Name Game"
          ? "Alliterative Name Game (Adjective Name Game) | How to Play + Examples"
          : game.title === "One Word Check-In"
            ? "One Word Check-In Icebreaker | Quick Team Check-In Prompts"
            : game.title === "Two Truths and a Lie"
              ? "Two Truths and a Lie Icebreaker | Rules, Examples & Questions"
              : game.title === "Minefield"
                ? "Minefield Team Building Game | How to Play + Debrief"
                : game.title === "The Name Game"
                  ? "The Name Game Icebreaker | Name Game Rules & Variations"
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
                                  : game.title === "Icebreaker Bingo"
                                    ? "Icebreaker Bingo Game | How to Play + Tips"
                                  : game.title === "Find Your Match"
                                    ? "Find Your Match Icebreaker | How to Play + Tips"
                                  : game.title === "Wheel of Fortune Introductions"
                                    ? "Wheel of Fortune Introductions | How to Play + Prompts"
                                  : game.title === "Six Word Memoirs"
                                    ? "Six Word Memoirs Icebreaker | How to Play"
                                  : game.title === "Where Do We Come From & What Is Famous?"
                                    ? "Where Do We Come From & What Is Famous? | Icebreaker"
                                  : game.title === "Never Have I Ever"
                                    ? "Never Have I Ever Icebreaker | How to Play + Examples"
                                  : game.title === "This or That Questions"
                                    ? "This or That Questions Icebreaker | Quick Team Activity"
                                  : game.title === "Would You Rather"
                                    ? "Would You Rather Icebreaker | How to Play + Questions"
                                  : game.title === "Rock Paper Scissors Tournament"
                                    ? "Rock Paper Scissors Tournament | Large Group Icebreaker"
                                  : game.title === "Fantasy Vacation"
                                    ? "Fantasy Vacation Icebreaker | How to Play"
                                  : game.title === "Mystery Envelope"
                                    ? "Mystery Envelope Icebreaker | How to Play + Tips"
                                  : game.title === "Invention Pitch"
                                    ? "Invention Pitch Team Building Game | How to Play"
                                  : game.title === "Scavenger Hunt"
                                    ? "Scavenger Hunt Team Building Game | How to Run"
                                  : game.title === "Show and Tell"
                                    ? "Show and Tell Icebreaker | How to Play + Tips"
                                  : game.title === "Appreciation Circle"
                                    ? "Appreciation Circle Icebreaker | How to Run"
                                  : game.title === "Line-Up"
                                    ? "Line-Up Icebreaker | Non-Verbal Team Challenge"
                                  : game.title === "Take a Picture of Your Shoes"
                                    ? "Take a Picture of Your Shoes | Virtual Icebreaker"
                                  : game.title === "Near and Far"
                                    ? "Near and Far Icebreaker | How to Run"
                                  : game.title === "Desert Island Scenario"
                                    ? "Desert Island Scenario Icebreaker | How to Play"
                                  : game.title === "Guess Who (Personal Trivia)"
                                    ? "Guess Who (Personal Trivia) | How to Play + Tips"
                                  : game.title === "Team Trivia"
                                    ? "Team Trivia Icebreaker | How to Run"
                                  : game.title === "Hot Takes"
                                    ? "Hot Takes Icebreaker | How to Play + Prompts"
                                  : game.title === "Online Charades"
                                    ? "Online Charades Icebreaker | How to Play"
                                  : game.title === "Mingle Bingo"
                                    ? "Mingle Bingo Icebreaker | How to Play"
                                  : game.title === "What's Missing"
                                    ? "What's Missing Icebreaker | How to Play"
                                  : game.title === "Storytelling Circle"
                                    ? "Storytelling Circle Icebreaker | How to Run"
                                  : game.title === "Word Association"
                                    ? "Word Association Icebreaker | How to Play"
                                  : game.title === "Human Bingo"
                                    ? "Human Bingo Icebreaker | How to Play + Games Like It"
                                  : game.title === "Emoji Introduction"
                                    ? "Emoji Introduction Ice Breaker Game - Fun Virtual Meeting Activity"
                                  : game.title === "Emoji Check-In"
                                    ? "Emoji Check-In Ice Breaker Game - Quick Mood Sharing Activity"
                                  : game.title === "Chat Waterfall"
                                    ? "Chat Waterfall Icebreaker | How to Play + Prompts"
                                  : game.title === "Virtual Background Story"
                                    ? "Virtual Background Story Icebreaker | How to Play"
                                  : game.title === "Speed Networking"
                                    ? "Speed Networking Icebreaker | How to Run"
                                  : game.title === "Find Your Match"
                                    ? "Find Your Match Icebreaker | How to Play"
                                  : game.title === "Story Swap"
                                    ? "Story Swap Icebreaker | How to Play"
                                  : game.title === "If Then"
                                    ? "If Then Icebreaker | How to Play"
                                  : game.title === "Crossword Names"
                                    ? "Crossword Names Icebreaker | How to Run"
                                  : game.title === "Blind Name-Tag"
                                    ? "Blind Name-Tag Icebreaker | How to Play"
                                  : game.title === "Sole Mate"
                                    ? "Sole Mate Icebreaker | How to Play"
                                  : game.title === "Year Of The Coin"
                                    ? "Year Of The Coin Icebreaker | How to Play"
                                  : game.title === "Name That Movie Quote"
                                    ? "Name That Movie Quote | Icebreaker"
                                  : game.title === "10 Things in Common"
                                    ? "10 Things in Common | Icebreaker"
                                  : game.title === "Guess That Team Member"
                                    ? "Guess That Team Member | Icebreaker"
                                  : game.title === "Skittles Sharing"
                                    ? "Skittles Sharing Icebreaker | How to Play"
                                  : game.title === "News Headline Warm-up"
                                    ? "News Headline Warm-up | Icebreaker"
                                  : game.title === "Team Superpower Collage"
                                    ? "Team Superpower Collage | Icebreaker"
                                  : game.title === "Two Truths and a Dream"
                                    ? "Two Truths and a Dream | Icebreaker"
                                  : game.title === "Reception Line"
                                    ? "Reception Line Icebreaker | How to Run"
                                  : game.title === "Marshmallow Challenge"
                                    ? "Marshmallow Challenge | Team Building Activity"
                                  : game.title === "Picture Sharing"
                                    ? "Picture Sharing Icebreaker | How to Play"
                                  : game.title === "Train Wreck"
                                    ? "Train Wreck Icebreaker | How to Play"
                                  : game.title === "Human Knot"
                                    ? "Human Knot Team Challenge | How to Play"
                                  : game.title === "Sing-Off"
                                    ? "Sing-Off Team Activity | How to Run"
                                  : game.title === "Beach Ball Q&A"
                                    ? "Beach Ball Q&A Icebreaker | How to Play"
                                  : game.title === "Pterodactyl"
                                    ? "Pterodactyl Circle Game | How to Play"
                                  : game.title === "Chainlink"
                                    ? "Chainlink Icebreaker | How to Play"
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
  } else if (game.title === "Icebreaker Bingo") {
    jsonLdDescription =
      "Icebreaker Bingo is a large-group mingling game where participants circulate to find people who match prompts on a bingo-style card. It encourages conversation, rapid introductions, and works for 12–100+ people in 10–20 minutes.";
  } else if (game.title === "Find Your Match") {
    jsonLdDescription =
      "Find Your Match is a pairing icebreaker game where participants receive a card with a famous pair and must find their matching partner by asking only yes-or-no questions. It builds curiosity, movement, and conversation at networking events.";
  } else if (game.title === "Wheel of Fortune Introductions") {
    jsonLdDescription =
      "Wheel of Fortune Introductions is a playful virtual meeting opener using a spinning wheel with fun prompts. Participants take turns spinning and answering, creating energy and engagement at the start of any meeting or event.";
  } else if (game.title === "Six Word Memoirs") {
    jsonLdDescription =
      "Six Word Memoirs is a storytelling icebreaker where each participant summarizes something meaningful about themselves in exactly six words, then shares and discusses their choices. It sparks curiosity, reflection, and deeper conversation.";
  } else if (game.title === "Where Do We Come From & What Is Famous?") {
    jsonLdDescription =
      "Where Do We Come From & What Is Famous? is a cultural icebreaker where participants share their hometown or background and what it is known for. It builds cultural awareness, personal stories, and connection across diverse groups.";
  } else if (game.title === "Never Have I Ever") {
    jsonLdDescription =
      "Never Have I Ever is a sharing icebreaker where participants read statements starting with 'never have I ever' and indicate if they have done something. It is great for revealing common ground, sparking stories, and getting people to open up in a lighthearted way.";
  } else if (game.title === "This or That Questions") {
    jsonLdDescription =
      "This or That Questions is a quick binary-choice icebreaker where participants choose between two options and briefly explain their choice. It is fast, inclusive, and works well for meetings, workshops, and classrooms with 4–50 people.";
  } else if (game.title === "Would You Rather") {
    jsonLdDescription =
      "Would You Rather is a fun opinion icebreaker where participants choose between two scenarios and explain their reasoning. It is great for revealing values, sparking debate, and getting people laughing. It works for 4–30 people in 5–15 minutes.";
  } else if (game.title === "Rock Paper Scissors Tournament") {
    jsonLdDescription =
      "A Rock Paper Scissors Tournament is a high-energy large-group icebreaker where participants compete in a bracket until one winner remains. It is a simple, physical, and surprisingly engaging activity that works for 10–100+ people.";
  } else if (game.title === "Fantasy Vacation") {
    jsonLdDescription =
      "Fantasy Vacation is a creative conversation icebreaker where participants share their dream travel destinations and activities. It is a simple, low-pressure activity that sparks imagination and reveals shared interests and travel stories.";
  } else if (game.title === "Mystery Envelope") {
    jsonLdDescription =
      "Mystery Envelope is a surprise icebreaker where participants draw prompts from envelopes and complete mini-challenges or discussions. It adds variety and humor to any meeting or event and works for 6–50 people.";
  } else if (game.title === "Invention Pitch") {
    jsonLdDescription =
      "Invention Pitch is a creative team building game where small groups invent and pitch a playful product to the group. It encourages storytelling, humor, and teamwork, and works well as a workshop or training activity for 6–30 people.";
  } else if (game.title === "Scavenger Hunt") {
    jsonLdDescription =
      "Scavenger Hunt is a team competition where participants race to find specific items or complete challenges within a time limit. It promotes teamwork, creativity, and friendly competition, and works for 10–100+ people in 30–60 minutes.";
  } else if (game.title === "Show and Tell") {
    jsonLdDescription =
      "Show and Tell is a storytelling icebreaker where each participant shares an object that is meaningful to them and explains why. It creates deeper personal connections and reveals values, and works for 4–15 people in 20–40 minutes.";
  } else if (game.title === "Appreciation Circle") {
    jsonLdDescription =
      "Appreciation Circle is a gratitude activity where participants take turns sharing something they appreciate about the person next to them. It creates a positive atmosphere, strengthens relationships, and works for 5–20 people in 15–30 minutes.";
  } else if (game.title === "Line-Up") {
    jsonLdDescription =
      "Line-Up is a non-verbal ordering challenge where participants silently arrange themselves by a given criterion. It builds focus, teamwork, and observational communication, and works for 10–40 people in 5–15 minutes.";
  } else if (game.title === "Take a Picture of Your Shoes") {
    jsonLdDescription =
      "Take a Picture of Your Shoes is a quick, lighthearted virtual icebreaker where participants share a photo of their shoes and a brief story behind them. It is simple, inclusive, and works for 5–30 people in 5–10 minutes.";
  } else if (game.title === "Near and Far") {
    jsonLdDescription =
      "Near and Far is a movement-based warm-up where participants physically position themselves near or far from a reference point based on prompts about preferences or experiences. It sparks discussion on group dynamics and works for 10–50 people in 10–20 minutes.";
  } else if (game.title === "Desert Island Scenario") {
    jsonLdDescription =
      "Desert Island Scenario is a creative get-to-know-you icebreaker where participants imagine being stranded on a desert island and choose three items to bring. It reveals personality traits and priorities, and works for 4–20 people in 15–25 minutes.";
  } else if (game.title === "Guess Who (Personal Trivia)") {
    jsonLdDescription =
      "Guess Who (Personal Trivia) is a personal trivia icebreaker where participants submit unique facts and the group guesses who each fact belongs to. It builds curiosity and quick personal connections, and works for 8–40 people in 10–20 minutes.";
  } else if (game.title === "Team Trivia") {
    jsonLdDescription =
      "Team Trivia is a knowledge competition where teams answer quiz questions together. It encourages collaboration, friendly competition, and shared learning, and works for 10–100+ people in 30–60 minutes.";
  } else if (game.title === "Hot Takes") {
    jsonLdDescription =
      "Hot Takes is a fast-paced opinion icebreaker where participants share a hot take and the group reacts. It sparks discussion, humor, and reveals values, and works for 6–30 people in 10–20 minutes.";
  } else if (game.title === "Online Charades") {
    jsonLdDescription =
      "Online Charades is a virtual charades game where participants act out prompts for others to guess in real time. It is visual, fast, and inclusive, and works for 4–20 people in 10–20 minutes.";
  } else if (game.title === "Mingle Bingo") {
    jsonLdDescription =
      "Mingle Bingo is a mingling icebreaker where participants find people matching bingo-style prompts and record names. It encourages conversation and rapid introductions, and works for 10–50 people in 15–25 minutes.";
  } else if (game.title === "What's Missing") {
    jsonLdDescription =
      "What's Missing is an observation icebreaker where a display of items is covered and participants recall what they saw. It sharpens attention and creates a shared experience, and works for 4–20 people in 5–10 minutes.";
  } else if (game.title === "Storytelling Circle") {
    jsonLdDescription =
      "Storytelling Circle is a collaborative story-building icebreaker where participants add sentences to a shared story in turn. It encourages creativity, listening, and humor, and works for 6–30 people in 10–20 minutes.";
  } else if (game.title === "Word Association") {
    jsonLdDescription =
      "Word Association is a fast-paced mental warm-up where participants say the first word that comes to mind in response to a prompt. It reveals thought patterns, builds energy, and works for 6–30 people in 5–15 minutes.";
  } else if (game.title === "Human Bingo") {
    jsonLdDescription =
      "Human Bingo is a networking icebreaker where participants receive bingo cards with personal characteristic prompts and mingle to find matches. First to complete a line wins. It encourages conversation and rapid introductions for 10–50 people in 20–30 minutes.";
  } else if (game.title === "Emoji Introduction") {
    jsonLdDescription =
      "Emoji Introduction is a modern visual icebreaker where participants introduce themselves using only emojis and others guess what the emojis represent. It is creative, inclusive, and works for 5–30 people in 10–15 minutes.";
  } else if (game.title === "Emoji Check-In") {
    jsonLdDescription =
      "Emoji Check-In is a quick mood-sharing activity where participants express how they are feeling using emojis in a virtual or in-person setting. It gets everyone speaking in seconds and helps the facilitator read the room in 3–5 minutes.";
  } else if (game.title === "Chat Waterfall") {
    jsonLdDescription =
      "Chat Waterfall is a high-energy virtual icebreaker where everyone types answers to a prompt simultaneously and sends them at the same time, creating a visual 'waterfall' effect. It is inclusive, fast, and works for 5–100+ people in 5–15 minutes.";
  } else if (game.title === "Virtual Background Story") {
    jsonLdDescription =
      "Virtual Background Story is a creative virtual meeting opener where participants choose a fun or unusual virtual background and share the story behind it. It sparks curiosity, laughter, and connection in 10–15 minutes for 5–30 people.";
  } else if (game.title === "Speed Networking") {
    jsonLdDescription =
      "Speed Networking is a structured networking activity where participants rotate through brief one-on-one conversations. It maximizes connections efficiently and works for 10–100+ people in 30–45 minutes.";
  } else if (game.title === "Find Your Match") {
    jsonLdDescription =
      "Find Your Match is a pairing icebreaker where participants receive a famous pair card and must find their match by asking only yes-or-no questions. It promotes movement, curiosity, and conversation for 10–50 people in 15–20 minutes.";
  } else if (game.title === "Story Swap") {
    jsonLdDescription =
      "Story Swap is a paired storytelling icebreaker where partners exchange short stories using visual prompts. It builds trust, listening skills, and creativity, and works for 6–40 people in 10–15 minutes.";
  } else if (game.title === "If Then") {
    jsonLdDescription =
      "If Then is a creative icebreaker where participants complete playful If/Then prompts to spark imagination and rapport. It is fast, inclusive, and works for 5–30 people in 8–12 minutes.";
  } else if (game.title === "Crossword Names") {
    jsonLdDescription =
      "Crossword Names is a name-learning icebreaker that creates a visual crossword of participants' intersecting name letters. It aids name recall and creates a memorable group artifact, and works for 8–30 people in 10–15 minutes.";
  } else if (game.title === "Blind Name-Tag") {
    jsonLdDescription =
      "Blind Name-Tag is a fun movement icebreaker where participants wear name-tags on their backs and guess their own names from yes/no clues. It creates laughter and quick introductions, and works for 8–40 people in 10–15 minutes.";
  } else if (game.title === "Sole Mate") {
    jsonLdDescription =
      "Sole Mate is a quick pairing game using tokens or card halves to form random pairs for activities. It is simple, fast, and scalable, and works for 10–60 people in 5–8 minutes.";
  } else if (game.title === "Year Of The Coin") {
    jsonLdDescription =
      "Year Of The Coin is a storytelling icebreaker where participants draw a year and share a memory or story from that year. It sparks nostalgia, connection, and conversation, and works for 4–30 people in 8–12 minutes.";
  } else if (game.title === "Name That Movie Quote") {
    jsonLdDescription =
      "Name That Movie Quote is a pop-culture icebreaker where participants quote a movie line and the group guesses the film. It creates playful competition and shared references, and works for 4–30 people in 8–12 minutes.";
  } else if (game.title === "10 Things in Common") {
    jsonLdDescription =
      "10 Things in Common is a paired discovery activity where partners find ten things they have in common beyond the obvious. It encourages deeper conversation and works for 6–50 people in 8–12 minutes.";
  } else if (game.title === "Guess That Team Member") {
    jsonLdDescription =
      "Guess That Team Member is an anonymous fact guessing game where participants read facts and the group guesses who they belong to. It builds curiosity and fun discovery, and works for 6–40 people in 10–15 minutes.";
  } else if (game.title === "Skittles Sharing") {
    jsonLdDescription =
      "Skittles Sharing is a candy-based icebreaker where participants pick candies and answer prompts assigned to each color. It adds variety and surprise to sharing activities, and works for 6–40 people in 8–12 minutes.";
  } else if (game.title === "News Headline Warm-up") {
    jsonLdDescription =
      "News Headline Warm-up is a creative brainstorming activity where participants write catchy headlines about the meeting topic. It primes focus, creativity, and shared context, and works for 4–30 people in 8–12 minutes.";
  } else if (game.title === "Team Superpower Collage") {
    jsonLdDescription =
      "Team Superpower Collage is a visual team identity activity where participants collaboratively create a collage representing imagined team superpowers. It boosts creativity, identity, and collaboration, and works for 6–25 people in 15–25 minutes.";
  } else if (game.title === "Two Truths and a Dream") {
    jsonLdDescription =
      "Two Truths and a Dream is a creative twist on the classic get-to-know-you icebreaker. Participants share two true facts and one aspiration, inspiring connection and forward-looking conversation for 4–30 people in 8–12 minutes.";
  } else if (game.title === "Reception Line") {
    jsonLdDescription =
      "Reception Line is a fast-paced introduction game where two facing lines answer quick prompts and rotate to meet new people. It maximizes introductions efficiently and works for 10–50 people in 10–15 minutes.";
  } else if (game.title === "Marshmallow Challenge") {
    jsonLdDescription =
      "The Marshmallow Challenge is a team building activity where small teams compete to build the tallest spaghetti tower that can support a marshmallow. It practices prototyping, collaboration, and iteration, and works for 8–40 people in 15–25 minutes.";
  } else if (game.title === "Picture Sharing") {
    jsonLdDescription =
      "Picture Sharing is a visual storytelling icebreaker where participants share a meaningful photo and explain its significance. It builds empathy, reveals values, and creates personal connection for 4–30 people in 8–12 minutes.";
  } else if (game.title === "Train Wreck") {
    jsonLdDescription =
      "Train Wreck is a high-energy movement mixer where participants swap seats when a statement applies to them. It gets everyone moving, creates laughter, and works for 12–50 people in 10–15 minutes.";
  } else if (game.title === "Human Knot") {
    jsonLdDescription =
      "Human Knot is a physical team challenge where participants form a tangled circle, hold hands with two non-adjacent people, and work together to untangle without letting go. It builds teamwork, communication, and trust, and works for 8–30 people in 10–15 minutes.";
  } else if (game.title === "Sing-Off") {
    jsonLdDescription =
      "Sing-Off is a music-based team activity where teams take turns singing songs containing a theme word. It energizes groups, creates shared fun, and works for 10–60 people in 10–15 minutes.";
  } else if (game.title === "Beach Ball Q&A") {
    jsonLdDescription =
      "Beach Ball Q&A is a fun tossing game where participants write prompts on a beach ball and answer the prompt near their left thumb when caught. It adds variety and movement to icebreaker activities and works for 10–40 people in 10–15 minutes.";
  } else if (game.title === "Pterodactyl") {
    jsonLdDescription =
      "Pterodactyl is a hilarious circle game where participants say 'pterodactyl' while hiding their teeth. The direction of roars flips and anyone showing teeth is out. It is pure laughter and works for 8–30 people in 8–12 minutes.";
  } else if (game.title === "Chainlink") {
    jsonLdDescription =
      "Chainlink is an introduction chain activity where each person links a shared trait with the previous person and adds a new fact. It builds memory, connection, and a visual chain across the group, and works for 8–40 people in 10–15 minutes.";
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
      }] : []),
      ...(game.title === "Icebreaker Bingo" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Icebreaker Bingo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Give each person a bingo card with prompts like 'has traveled to 5+ countries' or 'speaks two languages'. Participants mingle to find someone matching each square and write their name. First to complete a line wins, but most people keep playing for a full card."
            }
          },
          {
            "@type": "Question",
            "name": "What is a good group size for Icebreaker Bingo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It works best with 12–100+ people. Smaller groups can play but may need multiple cards or fewer prompts per card to keep the mingling going."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Icebreaker Bingo take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most games finish in 10–20 minutes. Announce a winner after the first line, then let the rest of the group keep playing for a full card."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Icebreaker Bingo prompts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use safe, inclusive prompts like: can whistle, has a pet, speaks two languages, has traveled to 5+ countries, plays an instrument, works in tech, or prefers morning coffee. Avoid prompts about age, income, or personal identity."
            }
          },
          {
            "@type": "Question",
            "name": "Can Icebreaker Bingo be played virtually?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use breakout rooms for mingling and a shared bingo card. Alternatively, use chat reactions or a polling tool to track matches in real time."
            }
          }
        ]
      }] : []),
      ...(game.title === "Find Your Match" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Find Your Match?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Give each person a card with a famous pair (e.g., Romeo & Juliet, Batman & Robin). They must find their match by walking around and asking only yes-or-no questions. Once paired, they introduce their partner to the group."
            }
          },
          {
            "@type": "Question",
            "name": "What famous pairs work best?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use well-known pairs that are recognizable to most of the group. Examples: Batman & Robin, peanut butter & jelly, Simon & Garfunkel, Romeo & Juliet, Sherlock Holmes & Watson."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Find Your Match take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical round takes 8–15 minutes. The game works well as an opening icebreaker before transitioning to the main event or meeting agenda."
            }
          },
          {
            "@type": "Question",
            "name": "How do you facilitate Find Your Match for large groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use a microphone or room leader to call out pairs as they form. For very large groups (50+), split into smaller rooms or rounds to keep movement manageable."
            }
          },
          {
            "@type": "Question",
            "name": "Can Find Your Match work as a virtual icebreaker?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use breakout rooms or a shared deck of cards in a video call. Each person picks a random card and uses private chat or direct messages to find their pair."
            }
          }
        ]
      }] : []),
      ...(game.title === "Wheel of Fortune Introductions" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Wheel of Fortune Introductions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Prepare a virtual wheel with fun intro prompts (e.g., 'biggest pet peeve', 'strangest job', 'favorite comfort food'). Participants take turns spinning and answering. Keep each turn to 30–60 seconds."
            }
          },
          {
            "@type": "Question",
            "name": "What are good prompts for Wheel of Fortune Introductions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use light, safe-for-work prompts like: 'biggest pet peeve', 'strangest thing you have eaten', 'favorite comfort food', 'most spontaneous thing you have done', or 'hidden talent'."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Wheel of Fortune Introductions take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical round is 8–15 minutes depending on group size. With 6–10 people, each person gets 1–2 spins for a quick opener. With more people, limit to one spin per person."
            }
          },
          {
            "@type": "Question",
            "name": "What tools work best for the wheel?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use Wheel Decide, Wordwall, or any spinning wheel tool integrated into your video platform. For in-person meetings, use a physical prize wheel or even a phone app."
            }
          },
          {
            "@type": "Question",
            "name": "Can Wheel of Fortune Introductions work for large groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. For large groups, invite 4–6 volunteers to spin and answer while others observe. This keeps the pace fast and engaging without requiring everyone to take a turn."
            }
          }
        ]
      }] : []),
      ...(game.title === "Six Word Memoirs" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Six Word Memoirs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ask each person to write or think of six words that describe something meaningful about themselves (their day, a life story, or a goal). They share their six words and briefly explain why they chose them."
            }
          },
          {
            "@type": "Question",
            "name": "What makes a good Six Word Memoir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The best ones are specific and personal, not generic. 'Learned to code at 45' is more memorable than 'I like learning new things'. Humor and vulnerability both work well."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Six Word Memoirs take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "With 5–10 minutes, a group of 8–15 people can share. Each person takes 30–60 seconds. For larger groups, use small-group breakouts or a volunteer format."
            }
          },
          {
            "@type": "Question",
            "name": "Can Six Word Memoirs work for team building?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Ask people to write a six-word summary of their team experience, a project, or a shared goal. It is a powerful reflective exercise that also surfaces values and themes quickly."
            }
          },
          {
            "@type": "Question",
            "name": "How do you make Six Word Memoirs safe for all groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Frame it around a specific topic (e.g., 'one word about your week', 'a goal in six words') rather than open-ended life stories. This keeps it light and inclusive for work and mixed groups."
            }
          }
        ]
      }] : []),
      ...(game.title === "Where Do We Come From & What Is Famous?" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Where Do We Come From & What Is Famous?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ask each person to share their hometown or background and what their area is known for. This can be famous food, landmarks, history, or cultural quirks. A shared map or slide deck helps visualize locations."
            }
          },
          {
            "@type": "Question",
            "name": "What makes this icebreaker work well?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It combines personal stories with cultural learning, making it both fun and inclusive. It works especially well with diverse groups where people come from many different places."
            }
          },
          {
            "@type": "Question",
            "name": "How long does this activity take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A standard round takes 10–20 minutes with 6–50 people. For larger groups, limit sharing to volunteers or small-group breakouts to keep pace."
            }
          },
          {
            "@type": "Question",
            "name": "Can it be adapted for virtual meetings?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Share a world map or Google Slides with locations and ask people to add a pin or comment. In video calls, use breakout rooms for small groups to share and then do a brief report-out."
            }
          },
          {
            "@type": "Question",
            "name": "What if someone is from a place that is not well known?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Encourage them to share what they love about their area, even if it is not famous globally. The goal is personal storytelling and connection, not trivia."
            }
          }
        ]
      }] : []),
      ...(game.title === "Never Have I Ever" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Never Have I Ever?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Participants stand or raise a hand when a statement applies to them. Read statements like 'never have I ever traveled solo'. After each round, discuss surprising facts or shared experiences briefly."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Never Have I Ever prompts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use prompts that are light and inclusive: 'never have I ever stayed up past midnight', 'never have I ever cooked a meal for more than five people', or 'never have I ever given a speech'. Avoid sensitive financial, health, or identity-related prompts."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Never Have I Ever take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical round is 5–15 minutes with 8–12 prompts. Keep it brisk and time-box each prompt to about 30–60 seconds including a brief discussion."
            }
          },
          {
            "@type": "Question",
            "name": "Can Never Have I Ever work for team building?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use prompts that surface shared work experiences or goals, like 'never have I ever led a project from scratch' or 'never have I ever presented to 50+ people'."
            }
          },
          {
            "@type": "Question",
            "name": "How do you make Never Have I Ever safe for all groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Prepare prompts in advance, avoid anything personal or sensitive, and make participation optional. People can always stay seated or pass."
            }
          }
        ]
      }] : []),
      ...(game.title === "This or That Questions" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run This or That Questions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Present pairs of options (e.g., coffee or tea). Participants physically move or vote to show their choice, then optionally explain briefly. Keep the pace fast."
            }
          },
          {
            "@type": "Question",
            "name": "What are good This or That Questions prompts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use binary pairs that are fun and safe for work: morning person or night owl, books or movies, sweet or savory, mountain or beach. Avoid anything personal or polarizing."
            }
          },
          {
            "@type": "Question",
            "name": "How long does This or That take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A quick round takes 5–10 minutes with 5–8 pairs. It works well as a 5-minute meeting opener."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for large groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use raised hands, chat reactions, or a poll tool to show choices. Keep explanations very brief for large groups."
            }
          },
          {
            "@type": "Question",
            "name": "How do you make it inclusive?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use neutral or universal pairs, allow people to pass, and keep the focus on fun rather than revealing personal information."
            }
          }
        ]
      }] : []),
      ...(game.title === "Would You Rather" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Would You Rather?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Present two scenarios and ask participants to choose one and briefly explain why. Keep the pace brisk and encourage humor. Let people pass if they prefer."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Would You Rather questions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use questions that are light and fun: 'would you rather be able to fly or be invisible', 'would you rather never use social media again or never watch TV again'. Avoid questions about sensitive or controversial topics."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a round take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each question takes 1–3 minutes. A full activity with 5–8 questions takes 10–15 minutes."
            }
          },
          {
            "@type": "Question",
            "name": "Can it be used for team building?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use work-themed questions like 'would you rather work on something creative every day or lead a team of ten'. It reveals work preferences and values in a low-pressure way."
            }
          },
          {
            "@type": "Question",
            "name": "How do you keep it appropriate for all groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Prepare prompts in advance, review them for safety and inclusivity, and allow people to pass. Focus on light, fun scenarios rather than anything personal or controversial."
            }
          }
        ]
      }] : []),
      ...(game.title === "Rock Paper Scissors Tournament" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run a Rock Paper Scissors Tournament?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pair up participants and have them play best-of-one rounds. Losers cheer for winners or join a spectator bracket. Continue until one champion remains. Keep rounds fast (15–30 seconds each)."
            }
          },
          {
            "@type": "Question",
            "name": "What is a good group size for this tournament?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It works best with 10–100+ people. Smaller groups can play round-robins; larger groups should use a bracket system with designated areas for each match."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a Rock Paper Scissors Tournament take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most tournaments finish in 10–20 minutes. A tournament with 20–30 people typically needs 8–10 rounds. Use a stopwatch or drumroll sound effect to keep rounds tight."
            }
          },
          {
            "@type": "Question",
            "name": "How do you keep it organized for large groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Designate areas or use numbers (1, 2, 3 go) to start each round simultaneously. Announce the winner of each match loudly and have losers form a cheering section for the next round."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work virtually?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use breakout rooms as match arenas, assign a 'referee' in each room, and bring everyone back to the main room after each round. Use a shared bracket or spreadsheet to track progress."
            }
          }
        ]
      }] : []),
      ...(game.title === "Fantasy Vacation" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Fantasy Vacation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ask each person to share their dream vacation destination and a few details about what they would do there. Encourage creativity and humor. After a few people share, open it up for questions or comments."
            }
          },
          {
            "@type": "Question",
            "name": "What makes a good Fantasy Vacation prompt?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Encourage specific, visual descriptions: 'I would go to Japan and spend a week eating my way through Tokyo's night markets' or 'I would rent a cabin in Iceland and chase the Northern Lights every night'."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Fantasy Vacation take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical round is 8–15 minutes with 6–15 people sharing. Keep each share to 30–60 seconds to maintain pace."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for team building?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Ask people to share a fantasy team retreat instead of a personal vacation. It surfaces shared interests and can inspire future team events."
            }
          },
          {
            "@type": "Question",
            "name": "What if someone has never traveled much?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Encourage them to dream big or imagine anywhere they have always wanted to go. There is no wrong answer in a fantasy activity."
            }
          }
        ]
      }] : []),
      ...(game.title === "Mystery Envelope" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Mystery Envelope?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Prepare envelopes with prompts or mini-challenges inside. Participants draw an envelope, open it, and complete the prompt (share a story, act something out, answer a question, etc.)."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Mystery Envelope prompts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use a mix of sharing and acting prompts: 'tell the story of your first day at work', 'act out your morning routine without using your hands', or 'share a quick win from this week'."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a Mystery Envelope round take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each envelope takes 1–3 minutes. A full activity with 6–10 envelopes takes 10–20 minutes."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for large groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use multiple rounds with 3–5 volunteers per round and audience reactions. This keeps the pace fast and the whole group engaged."
            }
          },
          {
            "@type": "Question",
            "name": "How do you keep prompts safe and inclusive?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Prepare prompts in advance and review them for safety. Use light, work-friendly challenges. Allow people to pass or swap envelopes if they prefer."
            }
          }
        ]
      }] : []),
      ...(game.title === "Invention Pitch" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Invention Pitch?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Divide into small teams of 3–5 people. Give each team a prompt (e.g., 'invent a useless product that would still sell'). They have 5–10 minutes to design and pitch it. Teams pitch in turn; allow brief Q&A after each."
            }
          },
          {
            "@type": "Question",
            "name": "What makes a good Invention Pitch prompt?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use playful, open-ended prompts: 'invent a new app that nobody needs but everyone would love', 'design a gadget that solves a first-world problem', or 'create a new holiday and its signature activity'."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Invention Pitch take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "With preparation time (5–10 minutes) and presentations (3–5 minutes each), a full activity typically takes 15–25 minutes for 3–5 teams."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use breakout rooms for team preparation and a shared presentation tool. Teams can pitch verbally or share a quick slide or document."
            }
          },
          {
            "@type": "Question",
            "name": "What skills does Invention Pitch build?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It builds creativity, storytelling, teamwork, and presentation skills in a low-stakes, fun environment. It also reveals how different people approach problems."
            }
          }
        ]
      }] : []),
      ...(game.title === "Scavenger Hunt" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run a Scavenger Hunt?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Divide participants into teams of 3–5. Give each team a list of items or challenges with clear boundaries and a time limit. Teams document their finds with photos. Reconvene, review submissions, and declare a winner."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Scavenger Hunt challenges?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use a mix of item hunts (find something red, find a business card) and creative challenges (take a photo doing jumping jacks, record a team cheer). Keep the list varied to involve different skills."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a Scavenger Hunt take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical scavenger hunt takes 30–60 minutes depending on the complexity and number of items. For shorter meetings, use a condensed list with a 15–20 minute timer."
            }
          },
          {
            "@type": "Question",
            "name": "Can a Scavenger Hunt work virtually?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use a shared document or photo board where teams upload pictures. For a faster virtual version, use chat-based scavenger hunts where participants race to send the first correct photo."
            }
          },
          {
            "@type": "Question",
            "name": "What group size works best?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It works for 10–100+ people. Divide into teams of 3–5. For very large groups, use multiple rounds or a relay format where teams pass the list."
            }
          }
        ]
      }] : []),
      ...(game.title === "Show and Tell" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Show and Tell?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ask each person to bring or describe one meaningful object. Give each person 2–3 minutes to present and explain why it is meaningful. Allow a brief Q&A after each."
            }
          },
          {
            "@type": "Question",
            "name": "What objects work best for Show and Tell?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Encourage personal items with a story: a gift from someone meaningful, a souvenir from a trip, a book that changed something, or a hobby item. Avoid expensive or flashy items that create comparison."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Show and Tell take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "With 4–8 people sharing, plan for 20–40 minutes total (2–3 minutes per person plus transitions). For larger groups, use a volunteer format or small-group breakouts."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Ask people to hold up their objects to the camera or share a photo in chat before describing it. The visual element makes it engaging even through a screen."
            }
          },
          {
            "@type": "Question",
            "name": "What if someone forgets to bring something?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Allow them to describe an object from memory, share something on their phone, or simply tell a short meaningful story without a physical object. Keep it low-pressure."
            }
          }
        ]
      }] : []),
      ...(game.title === "Appreciation Circle" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run an Appreciation Circle?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Arrange participants in a circle. Start with one person sharing something they appreciate about the person to their right. That person then shares about the next person, and so on. Keep comments genuine and specific."
            }
          },
          {
            "@type": "Question",
            "name": "What makes appreciation comments effective?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Be specific and genuine: 'I appreciate that you stayed late to help me yesterday' is more powerful than 'you are a hard worker'. Encourage observation over general praise."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Appreciation Circle take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A standard circle with 5–20 people takes 15–30 minutes. Keep each appreciation to about 30–60 seconds to maintain pace and energy."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for newly formed groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, but keep it light and surface-level at first. Once people have worked together for a while, deeper appreciations naturally emerge."
            }
          },
          {
            "@type": "Question",
            "name": "How do you make it comfortable for introverts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Allow people to write appreciations anonymously on cards first, then read them aloud. Alternatively, let people pass or share something short if they feel uncomfortable."
            }
          }
        ]
      }] : []),
      ...(game.title === "Line-Up" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Line-Up?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Explain the non-verbal rule clearly: no speaking or pointing. Announce a criterion (e.g., birthday month, alphabetical by first name, distance from home). Participants silently arrange themselves in order. Debrief on strategies and signals after."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Line-Up criteria?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use criteria that everyone knows: birth month, alphabetical by first name, distance from workplace, years in the job. For more interesting results, use creative ones like 'how you take your coffee' or 'how you spent last weekend'."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Line-Up take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each round takes 2–5 minutes. Run 2–3 rounds with a brief debrief after each. Total time: 5–15 minutes."
            }
          },
          {
            "@type": "Question",
            "name": "What makes this game effective for teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It forces non-verbal communication and forces people to find creative signals. The debrief often surfaces assumptions and how different people approach coordination."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for very large groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Run multiple lines simultaneously (one for each criterion) or split into sub-groups. The non-verbal constraint makes it scalable without chaos."
            }
          }
        ]
      }] : []),
      ...(game.title === "Take a Picture of Your Shoes" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Take a Picture of Your Shoes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ask everyone to snap a photo of their shoes and share it in the chat or on a shared board. Then invite short stories behind the shoes — where they have been, why they chose them, or a fun fact. Optionally vote on the most unique pair."
            }
          },
          {
            "@type": "Question",
            "name": "Why does this icebreaker work so well?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Shoes reveal personality without requiring disclosure. A hiker reveals adventure; a dress shoe wearer might share a commute story. It is visual, fast, and surprisingly personal."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full round with 5–15 people takes 5–10 minutes. Give people 1–2 minutes to take and post photos, then run through shares at 20–30 seconds each."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for large groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use a shared photo board and let people post ahead of time. For very large groups, show a slideshow of photos without stories, or invite 5–6 volunteers to share."
            }
          },
          {
            "@type": "Question",
            "name": "What if someone is wearing unusual shoes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "That is the point — lean into it. Unusual shoes generate the best stories and the most laughter."
            }
          }
        ]
      }] : []),
      ...(game.title === "Near and Far" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Near and Far?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Set up a physical spectrum in the room (one side = near/far, agree on a middle). Present a prompt about preferences or experiences (e.g., 'how much do you like mornings?'). Participants physically move to a position that represents their answer. Invite brief reflections after each round."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Near and Far prompts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use prompts about preferences and experiences: 'how much do you enjoy public speaking', 'how connected do you feel to your community', 'how much do you travel'. Keep them visual and easy to position."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Near and Far take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each round takes 3–5 minutes. Run 3–5 rounds with a debrief after each. Total time: 10–20 minutes."
            }
          },
          {
            "@type": "Question",
            "name": "What does this reveal in a team context?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It surfaces assumptions and group dynamics. Participants often notice that people who seemed similar are actually far apart, and that assumptions about each other are often wrong."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for virtual teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use a scale in chat (1–5 or near/far) or a shared whiteboard with a spectrum line. Participants drop a marker at their position and share reflections in chat."
            }
          }
        ]
      }] : []),
      ...(game.title === "Desert Island Scenario" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Desert Island Scenario?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ask participants to imagine being stranded on a desert island and choose three items to bring. Give them 2–3 minutes to think. Go around sharing choices and discuss the reasoning behind each one."
            }
          },
          {
            "@type": "Question",
            "name": "What makes this icebreaker effective?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It reveals priorities, creativity, and personality without requiring personal disclosure. People are often surprised by what others choose, which sparks good conversation."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Desert Island Scenario prompts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Encourage creative and specific choices: 'a guitar', 'a satellite phone', 'a year's supply of coffee'. Avoid practical essentials to keep it fun and revealing."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full round with 8–15 people sharing takes 15–25 minutes. Keep each share to 30–60 seconds to maintain pace."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Ask people to write their three items in chat before sharing verbally. This gives everyone time to think and keeps the pace fast."
            }
          }
        ]
      }] : []),
      ...(game.title === "Guess Who (Personal Trivia)" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Guess Who (Personal Trivia)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each player writes 1–3 unique facts about themselves and submits them anonymously. Draw and read each fact aloud; the group guesses who it belongs to. Reveal the author after each guess."
            }
          },
          {
            "@type": "Question",
            "name": "What makes a good fact for this game?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use facts that are interesting but not oversharing: 'has traveled to 10+ countries', 'once met a celebrity', 'plays guitar', 'volunteers on weekends'. Avoid facts that are too generic or too revealing."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical round takes 10–20 minutes depending on group size and number of facts. Collect facts before the meeting to save time."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for virtual teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Collect facts via a form or chat before the meeting. Read facts aloud in the main room or use breakout rooms for smaller group rounds."
            }
          },
          {
            "@type": "Question",
            "name": "How do you keep it inclusive?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Review facts in advance to remove anything sensitive or potentially exclusionary. Allow people to skip submitting if they prefer."
            }
          }
        ]
      }] : []),
      ...(game.title === "Team Trivia" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Team Trivia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Divide into teams of 4–6 people. Read or project questions across categories (general knowledge, pop culture, workplace). Teams discuss and submit answers. Reveal answers after each round and keep score."
            }
          },
          {
            "@type": "Question",
            "name": "What kinds of questions work best?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use a mix of difficulty levels and categories: general knowledge, pop culture, company trivia, history, science. Include a few easy questions so every team scores at least something."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a Team Trivia round take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical trivia night with 15–25 questions takes 30–60 minutes. For shorter meetings, use a quick 5–10 question format with faster rounds."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use a shared scoreboard (Google Sheets, Kahoot, or a poll tool), project questions on screen, and have teams discuss in breakout rooms or chat."
            }
          },
          {
            "@type": "Question",
            "name": "What skills does Team Trivia build?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It builds collaboration, shared knowledge, and friendly competition. Teams learn how different members think and contribute, which is useful for team dynamics debriefs."
            }
          }
        ]
      }] : []),
      ...(game.title === "Hot Takes" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Hot Takes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each person shares a hot take (a mildly controversial opinion) and briefly explains it. The group reacts and discusses. Keep it light and time-box each take to 1–2 minutes."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Hot Takes for icebreakers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use mild, fun controversies: 'pineapple belongs on pizza', 'the best season is autumn', ' Mondays are actually great'. Avoid political, religious, or genuinely divisive topics."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a Hot Takes round take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A round with 8–12 people takes 10–20 minutes. Each hot take gets 1–2 minutes including reactions. Keep the energy fast and light."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for team building?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use work-themed hot takes: 'meetings should be 25 minutes, not 30', 'email is better than Slack for complex decisions', or 'the best team lunch is pizza'."
            }
          },
          {
            "@type": "Question",
            "name": "How do you keep it safe for all groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Establish ground rules upfront: keep it light, no personal attacks, and allow people to pass. Frame it as fun opinions, not serious debates."
            }
          }
        ]
      }] : []),
      ...(game.title === "Online Charades" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Online Charades?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Divide into teams or play as one group. One person acts out a prompt without speaking; others guess in chat or verbally. Keep rounds short (60–90 seconds) and rotate actors quickly."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Online Charades prompts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use simple, visual prompts: 'making coffee', 'working from home', 'team meeting on Zoom', 'sending an email'. Avoid abstract or difficult-to-act concepts."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a round take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each round takes 10–20 minutes depending on group size. Use 60–90 second turns per actor and aim for 8–12 total guesses per round."
            }
          },
          {
            "@type": "Question",
            "name": "What tools work best for Online Charades?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use a shared prompt list, chat for guesses, and a timer. Some teams use a virtual whiteboard or shared document to track scores."
            }
          },
          {
            "@type": "Question",
            "name": "How do you make it work for large groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use breakout rooms for simultaneous small-group rounds, then bring everyone back to share highlights. Or use a volunteer format where one person acts and the whole group guesses."
            }
          }
        ]
      }] : []),
      ...(game.title === "Mingle Bingo" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Mingle Bingo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Give each person a bingo card with prompts. Participants mingle to find someone matching each square and record their name. First to complete a line (or full card) wins."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Mingle Bingo prompts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use safe, inclusive prompts: 'has traveled abroad', 'speaks two languages', 'enjoys cooking', 'has a pet', 'prefers morning coffee'. Avoid anything personal or sensitive."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical round takes 15–25 minutes. Announce a winner early to build energy and let others finish at their own pace."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for virtual teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use breakout rooms for mingling and a shared bingo card or Google Sheet. Alternatively, use a chat-based find-someone-who activity."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between Mingle Bingo and Icebreaker Bingo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mingle Bingo focuses on mingling and finding people matching personal characteristics. Icebreaker Bingo often includes challenges or competitive elements. Both work well for large groups."
            }
          }
        ]
      }] : []),
      ...(game.title === "What's Missing" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play What's Missing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Display a tray or board with 10–15 items (objects, photos, words). Give participants 30–60 seconds to memorize. Cover or remove the display; participants recall and write down what they saw."
            }
          },
          {
            "@type": "Question",
            "name": "What items work best for What's Missing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use a mix of recognizable and surprising items: everyday objects, photos, printed words, colors. Make it visually interesting so there is plenty to notice."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full round takes 5–10 minutes. Use 30–60 seconds for memorization and 2–3 minutes for recall. Reveal answers by uncovering or un-covering items one by one."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for virtual teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Share a screen with a slide of items for memorization, then switch to a blank slide. Participants type answers in chat. Reveal answers on the next slide."
            }
          },
          {
            "@type": "Question",
            "name": "What skills does this build?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It sharpens observation, attention to detail, and short-term memory. In a team context, it highlights how different people notice different things."
            }
          }
        ]
      }] : []),
      ...(game.title === "Storytelling Circle" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Storytelling Circle?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Start with an opening line. Participants add one sentence each in turn to build a collaborative story. Keep going around the circle until the story reaches a natural conclusion."
            }
          },
          {
            "@type": "Question",
            "name": "What makes a good collaborative story?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Encourage creativity and humor. Each person should add something that advances the story without derailing it. Agree on a genre upfront if you want more coherence."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Storytelling Circle take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical round with 8–15 people takes 10–20 minutes. Each person adds one sentence per turn (15–30 seconds each)."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for virtual teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use a shared document or whiteboard where people write sentences in turn, or go around verbally in a video call. Keep a visible record so people can follow the story."
            }
          },
          {
            "@type": "Question",
            "name": "What are good themes for Storytelling Circle?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use fun, open-ended starting lines: 'Once upon a time, in a very unusual office...', 'A package arrived at the office that nobody expected...', 'The team discovered a hidden room behind the printer...'."
            }
          }
        ]
      }] : []),
      ...(game.title === "Word Association" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Word Association?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Give a starting word or category. Participants say the first word that comes to mind. No hesitation, no explanation — just fast, instinctive responses. Go around the circle for several rounds."
            }
          },
          {
            "@type": "Question",
            "name": "What makes this icebreaker useful?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is a fast mental warm-up that gets everyone thinking quickly. It also reveals patterns and personality in a low-pressure way."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a Word Association round take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A quick warm-up round takes 5–10 minutes with 3–5 starting words. For longer sessions, use multiple rounds with different categories."
            }
          },
          {
            "@type": "Question",
            "name": "Can it be used for team building?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use work-related starting words to spark conversation: 'teamwork', 'deadline', 'brainstorm', 'success'. The associations often reveal how the team thinks collectively."
            }
          },
          {
            "@type": "Question",
            "name": "What are good starting words?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use simple, open words: 'summer', 'coffee', 'Monday', 'success', 'creativity'. Avoid words that are too specific or triggering."
            }
          }
        ]
      }] : []),
      ...(game.title === "Emoji Check-In" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run an Emoji Check-In?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ask each person to share one emoji that describes how they are feeling or their energy level right now. Go around quickly (or use chat for large groups) and invite brief explanations if needed."
            }
          },
          {
            "@type": "Question",
            "name": "Why does Emoji Check-In work so well?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is visual, fast, and requires no preparation or materials. It gets everyone speaking in under a minute and gives the facilitator instant insight into group mood."
            }
          },
          {
            "@type": "Question",
            "name": "How long does an Emoji Check-In take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full round takes 3–5 minutes with up to 20 people. It works as a meeting opener or mid-meeting energy check."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for large groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. For very large groups, ask people to post their emoji in chat simultaneously and scan the responses visually rather than going around verbally."
            }
          },
          {
            "@type": "Question",
            "name": "What prompts work for Emoji Check-In?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use simple prompts: 'how are you feeling right now', 'your energy level today', 'how ready you are for this meeting'. The emoji does the work — no complex instructions needed."
            }
          }
        ]
      }] : []),
      ...(game.title === "Two Truths and a Dream" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Two Truths and a Dream?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each person shares two true facts and one aspiration or dream. The group guesses which is the aspiration and discusses why they chose it."
            }
          },
          {
            "@type": "Question",
            "name": "What makes this variation effective?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It shifts focus from lying to aspiration, which is more positive and forward-looking. It reveals goals, hopes, and values rather than just curiosities."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full round with 8–12 people takes 10–15 minutes. Each person gets about 1 minute."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use chat for people to post their two truths and a dream, then discuss as a group."
            }
          },
          {
            "@type": "Question",
            "name": "What are good aspirational statements?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use forward-looking goals: 'I want to run a marathon', 'I am learning to code', 'I want to travel to Japan'. The group can discuss the aspiration rather than guess it."
            }
          }
        ]
      }] : []),
      ...(game.title === "Reception Line" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Reception Line?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Form two facing lines. Read a prompt; each pair discusses for 1–2 minutes. Rotate one line so everyone meets someone new. Repeat with new prompts."
            }
          },
          {
            "@type": "Question",
            "name": "What prompts work best?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use quick get-to-know prompts: 'what is a hobby you enjoy', 'what did you do last weekend', 'what is a goal you are working toward'. Keep them light and easy to answer."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical session with 20–30 people takes 10–15 minutes. Run 4–6 rounds of 2–3 minutes each."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use breakout rooms as 'tables' and rotate assignments manually or automatically. Use a shared timer."
            }
          },
          {
            "@type": "Question",
            "name": "What is the benefit over speed networking?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Reception Line uses prompts to guide conversation, making it less awkward for people who struggle with open-ended conversation. It is more structured and accessible."
            }
          }
        ]
      }] : []),
      ...(game.title === "Marshmallow Challenge" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run the Marshmallow Challenge?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Give each team spaghetti, tape, string, and a marshmallow. Set a time limit (18 minutes is standard). Teams build the tallest freestanding tower. The team with the tallest tower wins."
            }
          },
          {
            "@type": "Question",
            "name": "What materials do you need?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard supplies: spaghetti, tape, string, and one marshmallow per team. Some versions also include scissors. Keep quantities equal across teams."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The classic format is 18 minutes build time plus 5 minutes for measurement and debrief. Total: 25–30 minutes. For shorter sessions, use 10–12 minutes."
            }
          },
          {
            "@type": "Question",
            "name": "What does the Marshmallow Challenge teach?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It surfaces how teams approach prototyping, risk, and iteration. The debrief often reveals insights about planning vs. doing, which transfer directly to workplace dynamics."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use virtual building kits (digital tools like Figma or even a shared document) or send physical kits ahead of time. Debrief in the main session."
            }
          }
        ]
      }] : []),
      ...(game.title === "Picture Sharing" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Picture Sharing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ask each person to select a meaningful photo in advance. At the session, each person shares their photo and explains why it is significant. Others can react and ask follow-up questions."
            }
          },
          {
            "@type": "Question",
            "name": "What photos work best?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Encourage personal, meaningful photos: a travel photo, a family moment, a hobby, a milestone, a place that matters. Avoid professional headshots or stock images."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "With 5–10 people sharing, plan for 10–15 minutes. Each person gets 1–2 minutes. For larger groups, invite 5–8 volunteers."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Ask people to share screens or post photos in chat before the session. This format works especially well because photos travel better online than in person."
            }
          },
          {
            "@type": "Question",
            "name": "What if someone does not have a photo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Allow them to describe a mental image, share a screenshot, or simply tell the story verbally. The sharing is what matters, not the photo itself."
            }
          }
        ]
      }] : []),
      ...(game.title === "Train Wreck" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Train Wreck?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Arrange chairs in a circle with one fewer chair than participants. One person stands in the middle and makes a statement ('I like hiking'). Anyone who agrees stands and swaps seats. The person left standing becomes the new caller. Call 'train wreck' to reshuffle everyone randomly."
            }
          },
          {
            "@type": "Question",
            "name": "What statements work best?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use light, inclusive statements: 'I enjoy cooking', 'I have a pet', 'I speak two languages'. Avoid anything personal or sensitive. Mix statements about preferences, experiences, and fun facts."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full game takes 10–15 minutes. Run 10–20 rounds of 30–60 seconds each."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for large groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Train Wreck is especially effective for large groups (20–50 people) because the movement keeps energy high and everyone participates."
            }
          },
          {
            "@type": "Question",
            "name": "What is the train wreck call for?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Calling 'train wreck' resets everyone to new seats randomly. It prevents the same group from dominating and keeps the game unpredictable and fun."
            }
          }
        ]
      }] : []),
      ...(game.title === "Human Knot" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Human Knot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Form a circle. Each person grabs two non-adjacent hands. Without letting go, the group must communicate to untangle into a circle. If the group is too large, split into smaller circles."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical round with 8–15 people takes 10–15 minutes. Debrief for 5 minutes afterward."
            }
          },
          {
            "@type": "Question",
            "name": "What group size works best?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It works best with 8–20 people. With 20–30 people, split into two groups. Larger groups become chaotic and difficult to untangle."
            }
          },
          {
            "@type": "Question",
            "name": "What does it reveal in a team context?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It surfaces how the team communicates under ambiguity, who takes charge, and how people react to physical closeness. The debrief often reveals insights about leadership, patience, and problem-solving."
            }
          },
          {
            "@type": "Question",
            "name": "What if the knot cannot be untangled?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If the knot is truly unsolvable, start over or split into smaller groups. The attempt itself is valuable for team dynamics."
            }
          }
        ]
      }] : []),
      ...(game.title === "Sing-Off" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run a Sing-Off?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Divide into teams. Announce a theme word (e.g., 'moon'). Teams take turns singing a line from a song containing that word. Skips or repeats eliminate a team. Last team standing wins."
            }
          },
          {
            "@type": "Question",
            "name": "What theme words work best?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use broadly recognizable words: 'moon', 'heart', 'love', 'fire', 'dream'. Avoid niche references that only one team knows well."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical round with 4–6 teams takes 10–20 minutes. Run 3–5 theme rounds for a full session."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use breakout rooms for teams and a shared timer. Display the theme word on screen and let teams brainstorm songs before presenting."
            }
          },
          {
            "@type": "Question",
            "name": "What if someone cannot sing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Hum, rap, or recite lyrics. The fun is in the attempt, not vocal quality. Encourage participation over performance."
            }
          }
        ]
      }] : []),
      ...(game.title === "Beach Ball Q&A" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Beach Ball Q&A?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Write get-to-know prompts on a beach ball (e.g., 'a goal you have', 'a place you want to visit'). Toss the ball. Whoever catches it reads and answers the prompt nearest their left thumb."
            }
          },
          {
            "@type": "Question",
            "name": "What prompts work on the ball?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use varied prompts across difficulty levels: simple ('favorite food'), reflective ('a fear you have overcome'), and fun ('a talent you have'). Cover the ball evenly so any thumb landing lands on a prompt."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full round with 10–20 people takes 10–15 minutes. Toss for 15–20 rounds."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use a virtual ball (spin wheel, random prompt generator, or shared doc) and pass the turn to a random person."
            }
          },
          {
            "@type": "Question",
            "name": "What if the ball is hard to read?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Write prompts large and clearly. Use different colors for different prompt categories. Have the caller read the prompt aloud after the catcher identifies it."
            }
          }
        ]
      }] : []),
      ...(game.title === "Pterodactyl" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Pterodactyl?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sit or stand in a circle. Take turns saying 'pterodactyl'. Anyone who shows teeth while saying it is out. Roars flip the direction of play. Last person standing wins."
            }
          },
          {
            "@type": "Question",
            "name": "What makes this game effective?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is pure laughter. The challenge of saying a long word while hiding teeth is harder than it sounds, and the eliminations are always funny. It breaks tension immediately."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full game with 10–20 people takes 5–10 minutes. The game moves fast, so it works well as a quick energizer."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for large groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Run multiple circles simultaneously for very large groups. Each circle produces its own winner."
            }
          },
          {
            "@type": "Question",
            "name": "What are good variation rules?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Add speed rounds (faster pace), silent rounds (no sound, just gestures), or 'safe word' rounds (one free pass per person). Keep it fresh by changing rules each round."
            }
          }
        ]
      }] : []),
      ...(game.title === "Chainlink" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Chainlink?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Person A introduces themselves with a fact. Person B repeats Person A's fact and adds their own that links to it. Person C repeats both and adds theirs, and so on. The chain grows around the circle."
            }
          },
          {
            "@type": "Question",
            "name": "What facts work for Chainlink?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use fun, linkable facts: 'I play tennis and I like documentaries', 'I like documentaries and I have a dog'. The linking is what makes it memorable."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "With 8–15 people, a full round takes 10–15 minutes. Each person takes about 1 minute to recite the chain and add theirs."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for large groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For groups over 15, split into sub-circles. Each circle produces its own chain. Bring everyone back to share highlights."
            }
          },
          {
            "@type": "Question",
            "name": "What does Chainlink reveal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It reveals how people listen, recall, and build on each other's contributions. The debrief surfaces memory, attention, and collaborative thinking."
            }
          }
        ]
      }] : []),
      ...(game.title === "10 Things in Common" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play 10 Things in Common?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pair up participants. Give them 3–5 minutes to find ten things they have in common beyond the obvious (e.g., not just 'we both work here'). Each pair shares their top 3."
            }
          },
          {
            "@type": "Question",
            "name": "What makes this activity effective?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It goes beyond surface-level small talk. The rule 'not the obvious' forces participants to dig deeper, leading to more genuine connection."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full round takes 8–12 minutes (3–5 minutes for finding commonalities, 1–2 minutes per pair to share). For larger groups, run it in rounds with different pairs."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for newly formed teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. New teams often find surprising connections they did not know existed. It is especially powerful for teams that have been working together for a while but have not intentionally connected."
            }
          },
          {
            "@type": "Question",
            "name": "What if pairs cannot find ten things?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Lower the target to five or switch the rule to 'find three surprising things in common'. The goal is conversation, not hitting a specific number."
            }
          }
        ]
      }] : []),
      ...(game.title === "Guess That Team Member" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Guess That Team Member?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Collect 5 anonymous facts per person in advance (form or paper). Read facts aloud; the group guesses who each fact belongs to. Reveal the author after each guess."
            }
          },
          {
            "@type": "Question",
            "name": "What makes good anonymous facts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use interesting but not oversharing facts: 'has a side business', 'speaks three languages', 'ran a marathon'. Avoid anything sensitive or that could single someone out."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full round takes 10–15 minutes. Collect facts before the meeting to save time during the session."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Collect facts via a form before the meeting. Read facts in the main session or use a shared document that reveals facts one by one."
            }
          },
          {
            "@type": "Question",
            "name": "What skills does it build?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It builds curiosity about colleagues, reveals surprising skills and experiences, and creates a sense of shared discovery as a team."
            }
          }
        ]
      }] : []),
      ...(game.title === "Skittles Sharing" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Skittles Sharing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Define a color-to-question mapping before the activity (e.g., red = 'a goal you are proud of', green = 'a hobby you enjoy'). Each person picks candies and answers the question for each color."
            }
          },
          {
            "@type": "Question",
            "name": "What questions work for each color?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mix emotional, professional, and fun questions: red = proudest moment, orange = a goal, yellow = a fear, green = a hobby, purple = a value. Adjust to your group and meeting goal."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Skittles Sharing take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full round with 6–15 people takes 8–12 minutes. Give people 30–60 seconds per color they pick."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Send each person a bag of candy before the meeting, or use a virtual version where people pick colors in a shared form or spreadsheet."
            }
          },
          {
            "@type": "Question",
            "name": "What if someone has dietary restrictions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use candy-free alternatives: colored cards, numbered spins, or a virtual wheel. The structure and variety matter more than the candy itself."
            }
          }
        ]
      }] : []),
      ...(game.title === "News Headline Warm-up" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run News Headline Warm-up?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ask each person to write a catchy news headline related to today's meeting topic. Share and cluster similar themes. Use the top headlines to frame the discussion."
            }
          },
          {
            "@type": "Question",
            "name": "What makes a good headline?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Encourage creativity and humor: 'Local Team Discovers Infinite Coffee Supply', 'Sprint Planning Runners-up Announced'. Keep them specific to the team's context."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full round with 8–15 people takes 8–12 minutes. Give people 3–5 minutes to write, then 1–2 minutes per headline to share and cluster."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use a shared doc or whiteboard for writing and clustering. Display headlines in real time so everyone can see themes emerge."
            }
          },
          {
            "@type": "Question",
            "name": "What is the benefit of this activity?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It primes the brain for the meeting topic, surfaces expectations and concerns, and creates a shared context before the formal session begins."
            }
          }
        ]
      }] : []),
      ...(game.title === "Team Superpower Collage" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Team Superpower Collage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Give small teams a shared board or sticky notes. Define a theme (e.g., 'our team's superpower is...'). Teams add words, images, and notes collaboratively. Each team presents their superpower in 2–3 minutes."
            }
          },
          {
            "@type": "Question",
            "name": "What makes a good superpower theme?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Frame it as a positive team attribute: 'Our team superpower is...', 'If our team were a superhero team, we would be...', 'The one skill that makes us unstoppable is...'."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full round takes 15–25 minutes (5–10 minutes of creation, 5–10 minutes of sharing). For very short meetings, use a 5-minute express version."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use a shared digital whiteboard (Miro, Mural, or Google Jamboard) where everyone adds stickies simultaneously. Share the link and let teams build their superpower visually."
            }
          },
          {
            "@type": "Question",
            "name": "What skills does it build?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It builds team identity, collaborative creativity, and shared language. The resulting collage becomes a visual artifact that teams can revisit."
            }
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
              "text": "Ask each person to think of 3–5 emojis that represent them. Each person posts their emojis in chat. The group guesses what each set of emojis means, then the person explains their choices."
            }
          },
          {
            "@type": "Question",
            "name": "What makes a good Emoji Introduction?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Encourage specific, personal emojis: a hobby, a travel destination, a value, a mood. The more specific, the more interesting the guess becomes."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "With 5–15 people, a full round takes 10–15 minutes. Keep each person's share to about 30–60 seconds to maintain pace."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for large groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. For large groups, ask people to post their emojis in chat before the meeting and do a fast slideshow, or invite 5–8 volunteers to share live."
            }
          },
          {
            "@type": "Question",
            "name": "What if someone is not familiar with emojis?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Suggest a short list of starter emojis and let them choose. Alternatively, allow words in place of emojis for the first round."
            }
          }
        ]
      }] : []),
      ...(game.title === "Chat Waterfall" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Chat Waterfall?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ask everyone to type their answer to a prompt in chat simultaneously. Count down from three, and everyone sends at the same time. The answers appear as a visual 'waterfall' on screen. Read through highlights and discuss."
            }
          },
          {
            "@type": "Question",
            "name": "What are good Chat Waterfall prompts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use simple, quick prompts: 'one word for your mood', 'a food you love', 'something you are looking forward to this week'. Avoid anything that requires long answers."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each round takes 1–2 minutes. A full activity with 3–5 rounds takes 5–15 minutes. It works well as a 5-minute meeting opener."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for large groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Chat Waterfall is especially effective for large groups because everyone participates simultaneously. There is no bottleneck of people waiting for a turn."
            }
          },
          {
            "@type": "Question",
            "name": "What makes Chat Waterfall effective?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is inclusive, fast, and creates a sense of shared experience. Even shy participants can engage fully because there is no verbal performance required."
            }
          }
        ]
      }] : []),
      ...(game.title === "Virtual Background Story" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Virtual Background Story?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ask participants to choose a fun, creative, or unusual virtual background before the meeting. At the start, each person shares their background and the story behind it."
            }
          },
          {
            "@type": "Question",
            "name": "What makes a good Virtual Background Story?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The best backgrounds have a story: a place visited, a memory, a joke, a fantasy setting. Encourage creativity over generic choices."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full round with 8–15 people takes 10–20 minutes. Keep each share to 30–60 seconds. For larger groups, invite 5–8 volunteers to share."
            }
          },
          {
            "@type": "Question",
            "name": "What if someone cannot use virtual backgrounds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Allow them to describe a background they wish they had, or share a photo or image in chat instead. The key is the story, not the background feature."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for team building?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. It is a great meeting opener because it is light, personal, and reveals something unexpected about colleagues. It also normalizes creativity in professional settings."
            }
          }
        ]
      }] : []),
      ...(game.title === "Speed Networking" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you run Speed Networking?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Arrange chairs in two facing rows. Participants sit across from a partner and talk for 3–5 minutes. Ring a bell; one row shifts one seat. Repeat until everyone has met."
            }
          },
          {
            "@type": "Question",
            "name": "What do participants talk about?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Prepare 2–3 prompts per round: 'what brought you here', 'what is your biggest challenge this quarter', 'what is a skill you want to develop'. Keep it structured but flexible."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Speed Networking take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical session with 20–30 participants takes 30–45 minutes. With 40+ participants, plan for 45–60 minutes to ensure full rotations."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for remote teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use breakout rooms as 'tables' and a timer. Rotate assignments automatically or manually. Use a shared document for people to record contacts."
            }
          },
          {
            "@type": "Question",
            "name": "What is the best group size?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It works best with 10–100 people. For very large groups, split into multiple sessions or use a round-robin format in a larger room."
            }
          }
        ]
      }] : []),
      ...(game.title === "Find Your Match" ? [{
        "@type": "FAQPage",
        "@id": `https://www.icebreakergames.site/games/${game.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            "name": "How do you play Find Your Match?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Distribute cards with a famous pair (Batman & Robin, peanut butter & jelly). Participants walk around asking only yes-or-no questions to find their partner. Once matched, pairs introduce each other."
            }
          },
          {
            "@type": "Question",
            "name": "What famous pairs work best?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use well-known pairs recognizable to the group. Examples: Batman & Robin, Simon & Garfunkel, Romeo & Juliet, peanut butter & jelly, Sherlock Holmes & Watson."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Find Your Match take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical round takes 15–20 minutes. It works best as an opening activity before transitioning to the main meeting or event."
            }
          },
          {
            "@type": "Question",
            "name": "Can it work for virtual teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use breakout rooms or a shared card deck in a video call. Each person picks a random card and uses private chat or direct messages to find their pair."
            }
          },
          {
            "@type": "Question",
            "name": "What group size works best?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It works for 10–50 people. For larger groups, split into multiple rooms or rounds. For very small groups (under 10), use fewer pairs and repeat the round."
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
