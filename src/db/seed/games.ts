import { db } from "@/db";
import { gamesTable } from "@/db/schema";

const seedGames = [
  {
    id: crypto.randomUUID(),
    title: "Two Truths and a Lie",
    description: "A classic ice breaker where each person shares three statements about themselves - two true and one false. The group tries to guess which statement is the lie.",
    category: "Team Building",
    players: "3-20 people",
    duration: "15-20 minutes",
    difficulty: "Easy",
    materials: "None required",
    steps: "Each person thinks of two true statements and one false statement about themselves\nGo around the room, with each person sharing their three statements\nAfter each person shares, the group discusses and votes on which statement they think is the lie\nThe person reveals which statement was false\nContinue until everyone has had a turn",
    tags: ["getting-to-know-you", "no-prep", "indoor", "virtual-friendly"],
    image: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Human Bingo",
    description: "Participants receive bingo cards with various characteristics or experiences in each square. They must find people who match each description and get their signatures.",
    category: "Social Event",
    players: "10-50 people",
    duration: "20-30 minutes",
    difficulty: "Easy",
    materials: "Bingo cards, pens",
    steps: "Create bingo cards with different characteristics in each square\nDistribute cards and pens to all participants\nSet a time limit (usually 15-20 minutes)\nParticipants mingle and find people who match each square\nFirst person to complete a line shouts Bingo\nVerify the winner's card",
    tags: ["networking", "large-group", "active", "customizable"],
    image: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Virtual Background Story",
    description: "Perfect for online meetings, participants choose creative or unusual virtual backgrounds and share the story behind their choice.",
    category: "Virtual Meeting",
    players: "5-30 people",
    duration: "10-15 minutes",
    difficulty: "Easy",
    materials: "Video conferencing software with virtual background feature",
    steps: "Before the meeting, ask participants to select an interesting virtual background\nAt the start of the meeting, go around and have each person share their background\nEach person explains why they chose that particular background\nEncourage questions and comments from the group\nOptionally vote on the most creative background",
    tags: ["virtual", "creative", "remote-work", "quick"],
    image: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Speed Networking",
    description: "Participants pair up for quick one-on-one conversations, then rotate to meet new people. Great for conferences and large networking events.",
    category: "Conference",
    players: "10-100 people",
    duration: "30-45 minutes",
    difficulty: "Medium",
    materials: "Timer or bell, name tags",
    steps: "Arrange chairs in two rows facing each other\nAssign participants to seats\nSet a timer for 3-5 minutes per conversation\nRing a bell when time is up\nThe rotating row moves one seat to the right\nRepeat until everyone has met\nOptionally provide conversation prompts",
    tags: ["networking", "structured", "large-group", "professional"],
    image: null,
  },
  {
    id: crypto.randomUUID(),
    title: "The Name Game",
    description: "A memory game where each person says their name along with an adjective that starts with the same letter. Helps with name retention in new groups.",
    category: "Classroom",
    players: "5-25 people",
    duration: "10-20 minutes",
    difficulty: "Medium",
    materials: "None required",
    steps: "Arrange participants in a circle\nFirst person says an adjective and name (e.g. Jolly John)\nSecond person repeats the first, then adds their own\nEach person repeats all previous names before adding theirs\nIf someone forgets, the group can help\nContinue until everyone has introduced themselves",
    tags: ["memory", "names", "circle-game", "educational"],
    image: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Desert Island Scenario",
    description: "Participants imagine they're stranded on a desert island and must choose three items to bring. Reveals personality traits and priorities.",
    category: "Team Building",
    players: "4-20 people",
    duration: "15-25 minutes",
    difficulty: "Easy",
    materials: "None required",
    steps: "Explain the scenario: stranded on a desert island\nEach person chooses three items to bring\nGive participants 2-3 minutes to think\nGo around the group with each person sharing their choices\nEncourage questions and discussion\nOptionally vote on most creative choices",
    tags: ["hypothetical", "discussion", "creative-thinking", "no-prep"],
    image: null,
  },
  {
    id: crypto.randomUUID(),
    title: "One Word Check-In",
    description: "A quick activity where each person shares one word that describes how they're feeling. Perfect for starting meetings or training sessions.",
    category: "Training",
    players: "3-30 people",
    duration: "5-10 minutes",
    difficulty: "Easy",
    materials: "None required",
    steps: "Explain that each person will share just one word\nOptionally provide a prompt\nGo around the room or call on people randomly\nEach person says their one word\nAfter everyone has shared, discuss patterns or themes\nKeep it moving quickly",
    tags: ["quick", "emotional-intelligence", "check-in", "simple"],
    image: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Find Your Match",
    description: "Participants receive cards with one half of a famous pair. They must find their matching partner by asking questions without directly stating what's on their card.",
    category: "Social Event",
    players: "10-50 people",
    duration: "15-20 minutes",
    difficulty: "Medium",
    materials: "Cards with famous pairs written on them",
    steps: "Prepare cards with famous pairs\nDistribute one card to each participant\nExplain they cannot directly say what's on their card\nParticipants mingle and ask yes/no questions\nOnce pairs find each other, they sit down together\nHave pairs introduce themselves",
    tags: ["active", "pairing", "large-group", "fun"],
    image: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Show and Tell",
    description: "Participants bring an object that's meaningful to them and share its story. Creates deeper connections and reveals personal values.",
    category: "Team Building",
    players: "4-15 people",
    duration: "20-40 minutes",
    difficulty: "Easy",
    materials: "Personal items brought by participants",
    steps: "Ask participants to bring one meaningful object\nExplain each person has 2-3 minutes to share\nGo around the group with each person presenting\nEncourage them to explain why it's meaningful\nAllow time for questions after each presentation\nOptionally vote on most interesting story",
    tags: ["personal", "storytelling", "meaningful", "virtual-friendly"],
    image: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Would You Rather",
    description: "Participants answer a series of Would you rather questions, choosing between two options. Reveals preferences and sparks fun debates.",
    category: "Classroom",
    players: "5-50 people",
    duration: "10-20 minutes",
    difficulty: "Easy",
    materials: "List of Would you rather questions",
    steps: "Prepare a list of questions\nDesignate two sides of the room for each option\nRead the first question with two options\nParticipants move to the side representing their choice\nAsk people from each side to explain their reasoning\nContinue with remaining questions",
    tags: ["decision-making", "active", "debate", "adaptable"],
    image: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Emoji Introduction",
    description: "Participants introduce themselves using only emojis. Others try to guess what the emojis represent. A modern, visual twist on introductions.",
    category: "Virtual Meeting",
    players: "5-30 people",
    duration: "10-15 minutes",
    difficulty: "Easy",
    materials: "Chat function or paper and markers",
    steps: "Ask participants to think of 3-5 emojis that represent them\nHave each person post their emojis in the chat\nGo through each person's emojis one at a time\nThe group tries to guess what each emoji represents\nThe person explains the meaning behind their choices\nContinue until everyone has shared",
    tags: ["virtual", "creative", "modern", "visual"],
    image: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Common Ground",
    description: "Small groups work together to find things they all have in common. Builds team cohesion and reveals unexpected connections.",
    category: "Team Building",
    players: "8-40 people",
    duration: "15-25 minutes",
    difficulty: "Medium",
    materials: "Paper and pens for each group",
    steps: "Divide participants into groups of 4-6 people\nGive each group paper and a pen\nSet a timer for 10 minutes\nGroups find as many things as possible that everyone has in common\nExclude obvious things\nGroups share their most interesting commonalities\nOptionally award prizes",
    tags: ["small-groups", "discovery", "team-bonding", "competitive"],
    image: null,
  },
  {
    id: crypto.randomUUID(),
    title: "The Question Web",
    description: "Using a ball of yarn, participants toss it to each other while asking questions. The yarn creates a physical web showing connections between people.",
    category: "Training",
    players: "8-25 people",
    duration: "20-30 minutes",
    difficulty: "Medium",
    materials: "Ball of yarn or string",
    steps: "Have participants stand in a circle\nGive the ball of yarn to one person\nThat person holds the end and asks someone else a question\nThey toss the ball while holding their section of yarn\nThe receiver answers and asks a new question\nContinue until everyone is included\nDiscuss how the web represents connections",
    tags: ["visual", "metaphor", "circle-game", "symbolic"],
    image: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Scavenger Hunt",
    description: "Participants race to find specific items or complete challenges within a time limit. Promotes teamwork, creativity, and friendly competition.",
    category: "Conference",
    players: "10-100 people",
    duration: "30-60 minutes",
    difficulty: "Hard",
    materials: "List of items/challenges, prizes",
    steps: "Create a list of items to find or challenges to complete\nDivide participants into teams of 3-5 people\nDistribute the scavenger hunt list\nSet clear boundaries and time limit\nTeams work together to find items\nTeams document their finds with photos\nReconvene and review submissions\nDeclare a winner and award prizes",
    tags: ["active", "team-based", "competitive", "outdoor"],
    image: null,
  },
  {
    id: crypto.randomUUID(),
    title: "Appreciation Circle",
    description: "Participants sit in a circle and take turns sharing something they appreciate about others. Creates a positive atmosphere and strengthens relationships.",
    category: "Team Building",
    players: "5-20 people",
    duration: "15-30 minutes",
    difficulty: "Easy",
    materials: "None required",
    steps: "Arrange participants in a circle\nExplain each person will share an appreciation\nStart with one person sharing about the person to their right\nThat person then shares about the person to their right\nContinue around the circle\nAlternatively use random order\nKeep comments genuine and specific\nEnd with a moment of reflection",
    tags: ["positive", "gratitude", "emotional", "team-bonding"],
    image: null,
  },
];

async function runSeed() {
  try {
    console.log("Starting to seed games...");
    
    const existingGames = await db.select().from(gamesTable).limit(1);
    
    if (existingGames.length > 0) {
      console.log("Games already exist in database. Skipping seed.");
      console.log("To re-seed, first delete existing games from the database.");
      return;
    }

    await db.insert(gamesTable).values(seedGames);
    
    console.log(`Successfully seeded ${seedGames.length} games!`);
    console.log("Games added:");
    seedGames.forEach((game, index) => {
      console.log(`${index + 1}. ${game.title} (${game.category})`);
    });
    
  } catch (error) {
    console.error("Error seeding games:", error);
    throw error;
  }
}

runSeed()
  .then(() => {
    console.log("Seed completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
