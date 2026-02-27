import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { generateSlug } from "../src/lib/utils/slug";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Christmas table games data from the blog post
const christmasTableGames = [
  {
    title: "Holiday Fortunes",
    description: "Pop balloons containing humorous Christmas fortunes and read them aloud. Perfect for dinner tables and creates instant conversation starters.",
    category: "Social Event",
    players: "5-30 people",
    duration: "10-15 minutes",
    difficulty: "Easy",
    materials: "Balloons, paper slips",
    steps: "Step 1: Write humorous Christmas fortunes on paper slips before guests arrive.\nStep 2: Insert fortunes into balloons and inflate them.\nStep 3: Place one balloon at each seat.\nStep 4: After everyone is seated, have guests pop their balloons.\nStep 5: Each person reads their fortune aloud to spark conversation.",
    tags: ["christmas", "table-game", "dinner-party", "conversation-starter", "easy"],
    type: "Table Game"
  },
  {
    title: "Christmas Roll & Poll",
    description: "Roll dice to answer different Christmas questions. Keeps conversation flowing throughout the meal with minimal facilitation needed.",
    category: "Social Event",
    players: "4-30 people",
    duration: "15-20 minutes",
    difficulty: "Easy",
    materials: "Dice, question sheets",
    steps: "Step 1: Create question sheets with 6 questions (one per dice number).\nStep 2: Pass the die around the table.\nStep 3: Each person rolls and answers their question.\nStep 4: Continue for 10-15 minutes or until everyone has gone twice.\nStep 5: Encourage follow-up questions and discussion.",
    tags: ["christmas", "table-game", "dice-game", "conversation", "easy"],
    type: "Table Game"
  },
  {
    title: "Two Truths and a Tinsel",
    description: "A festive twist on the classic game. Share two true Christmas statements and one false - others guess the lie.",
    category: "Social Event",
    players: "6-20 people",
    duration: "15-20 minutes",
    difficulty: "Easy",
    materials: "None required",
    steps: "Step 1: Each person thinks of two true Christmas facts and one lie.\nStep 2: Go around the table sharing all three statements.\nStep 3: Others discuss and vote on which is the lie.\nStep 4: The person reveals the truth.\nStep 5: Continue until everyone has had a turn.",
    tags: ["christmas", "table-game", "guessing-game", "no-prep", "easy"],
    type: "Table Game"
  },
  {
    title: "Share a Favorite Holiday Memory",
    description: "Classic storytelling game that creates emotional connections. Perfect for multi-generational gatherings.",
    category: "Social Event",
    players: "4-20 people",
    duration: "20-30 minutes",
    difficulty: "Easy",
    materials: "Optional question cards",
    steps: "Step 1: Start with the host to model vulnerability.\nStep 2: Go around the table with each person sharing a memory.\nStep 3: Allow natural conversation to flow between shares.\nStep 4: Don't rush—let people elaborate on their stories.\nStep 5: Encourage questions from other guests.",
    tags: ["christmas", "table-game", "storytelling", "emotional", "family"],
    type: "Table Game"
  },
  {
    title: "The Great Christmas Candy Pass",
    description: "Combine trivia with rewards. Answer Christmas questions correctly to earn wrapped candies. Keeps energy high!",
    category: "Social Event",
    players: "8-40 people",
    duration: "15-20 minutes",
    difficulty: "Easy",
    materials: "Wrapped candies, questions",
    steps: "Step 1: Prepare Christmas trivia questions.\nStep 2: Sit in a circle or around tables.\nStep 3: Ask questions to the group.\nStep 4: First person to answer correctly gets a candy.\nStep 5: Continue until all candies are distributed.",
    tags: ["christmas", "table-game", "trivia", "competitive", "fun"],
    type: "Table Game"
  },
  {
    title: "Message Under a Plate",
    description: "Stealth game that adds challenge throughout the meal. Try to naturally insert bizarre phrases into conversation.",
    category: "Social Event",
    players: "6-20 people",
    duration: "Throughout dinner",
    difficulty: "Medium",
    materials: "Paper slips, plates",
    steps: "Step 1: Write unusual phrases on paper slips.\nStep 2: Place one slip under each plate before guests sit.\nStep 3: Guests read their phrase secretly.\nStep 4: They must work it naturally into dinner conversation.\nStep 5: If someone correctly identifies your phrase, you're out.",
    tags: ["christmas", "table-game", "stealth", "challenge", "funny"],
    type: "Table Game"
  },
  {
    title: "Christmas Connection",
    description: "Find people with similar Christmas preferences. Great for networking and finding common ground quickly.",
    category: "Social Event",
    players: "10-50 people",
    duration: "15-20 minutes",
    difficulty: "Easy",
    materials: "Question cards",
    steps: "Step 1: Prepare Christmas preference questions.\nStep 2: Guests ask each other questions.\nStep 3: Find people with similar answers.\nStep 4: Form small groups based on connections.\nStep 5: Groups share why they have those preferences.",
    tags: ["christmas", "table-game", "networking", "preferences", "social"],
    type: "Table Game"
  },
  {
    title: "Around the World Traditions",
    description: "Learn about Christmas traditions from different countries. Educational and entertaining for diverse groups.",
    category: "Social Event",
    players: "6-30 people",
    duration: "15-20 minutes",
    difficulty: "Easy",
    materials: "Tradition cards",
    steps: "Step 1: Prepare cards describing traditions from different countries.\nStep 2: Place cards on table or pass them around.\nStep 3: Each person picks a card and reads the tradition.\nStep 4: They share whether they'd adopt it and why.\nStep 5: Encourage discussion about cultural differences.",
    tags: ["christmas", "table-game", "educational", "cultural", "discussion"],
    type: "Table Game"
  },
  {
    title: "Holiday Bingo",
    description: "Custom bingo with Christmas prompts. Find people matching each square and get their signature.",
    category: "Social Event",
    players: "10-50 people",
    duration: "15-20 minutes",
    difficulty: "Easy",
    materials: "Bingo cards, pens",
    steps: "Step 1: Create 5x5 bingo cards with Christmas prompts.\nStep 2: Give each guest a card and pen.\nStep 3: Guests mingle to find people matching each square.\nStep 4: Get matching person's signature.\nStep 5: First to complete a line wins.",
    tags: ["christmas", "table-game", "bingo", "mingling", "fun"],
    type: "Table Game"
  },
  {
    title: "What's on Your Phone? Christmas Edition",
    description: "Modern scavenger hunt using phones. Everyone has one, making it inclusive and quick to play.",
    category: "Social Event",
    players: "8-50 people",
    duration: "10-15 minutes",
    difficulty: "Easy",
    materials: "Smartphones, checklist",
    steps: "Step 1: Create a checklist of Christmas-related phone items.\nStep 2: Give each guest the checklist.\nStep 3: Guests search their phones for matching items.\nStep 4: Award points for each item found.\nStep 5: Highest score wins.",
    tags: ["christmas", "table-game", "phone", "scavenger-hunt", "modern"],
    type: "Table Game"
  },
  {
    title: "Christmas Pick a Side",
    description: "Physical preference game that creates energy through friendly debate. Even seated guests can participate by leaning or pointing.",
    category: "Social Event",
    players: "10-100 people",
    duration: "10-15 minutes",
    difficulty: "Easy",
    materials: "Question list",
    steps: "Step 1: Designate two sides of the table (or room).\nStep 2: Ask either/or Christmas questions.\nStep 3: Guests physically lean or point to their preferred side.\nStep 4: Ask a few people to explain their choice.\nStep 5: Continue with multiple questions.",
    tags: ["christmas", "table-game", "preferences", "debate", "energizer"],
    type: "Table Game"
  },
  {
    title: "Ornament Guess",
    description: "Perfect arrival game. Guests guess ornament count as they enter. Zero facilitation needed once set up.",
    category: "Social Event",
    players: "Any size",
    duration: "5 minutes",
    difficulty: "Easy",
    materials: "Christmas tree, paper",
    steps: "Step 1: Count the ornaments on your Christmas tree.\nStep 2: Place paper and pens near the entrance or on the table.\nStep 3: Guests write their guess as they arrive.\nStep 4: Collect all guesses.\nStep 5: Reveal the winner before dessert.",
    tags: ["christmas", "table-game", "guessing", "passive", "easy"],
    type: "Table Game"
  },
  {
    title: "Topics Tables",
    description: "Strategic seating by interests. Ensures conversation topics at each table and reduces host stress.",
    category: "Social Event",
    players: "20-100 people",
    duration: "Throughout event",
    difficulty: "Easy",
    materials: "Table signs",
    steps: "Step 1: Create table signs with different interest topics.\nStep 2: Let guests choose tables based on interests.\nStep 3: Ensure conversation topics at each table.\nStep 4: Optional: Switch tables between courses.\nStep 5: Creates natural networking opportunities.",
    tags: ["christmas", "table-game", "seating", "networking", "large-group"],
    type: "Table Game"
  },
  {
    title: "Guess the Gift by Sound",
    description: "Mystery and anticipation game. Shake boxes and guess contents by sound alone.",
    category: "Social Event",
    players: "5-30 people",
    duration: "10-15 minutes",
    difficulty: "Easy",
    materials: "Wrapped boxes with items",
    steps: "Step 1: Wrap different small items in identical boxes.\nStep 2: Use items that make distinct sounds.\nStep 3: Pass boxes around the table.\nStep 4: Each person shakes for 3 seconds and guesses.\nStep 5: Reveal contents at the end and award points.",
    tags: ["christmas", "table-game", "guessing", "sensory", "fun"],
    type: "Table Game"
  },
  {
    title: "Photo Booth Prompt Jar",
    description: "Create lasting memories with fun photo prompts. Perfect for social media lovers.",
    category: "Social Event",
    players: "10-100 people",
    duration: "Throughout event",
    difficulty: "Easy",
    materials: "Photo backdrop, prompts",
    steps: "Step 1: Set up simple photo area near dining table.\nStep 2: Create prompt cards with fun poses.\nStep 3: Groups draw prompts throughout the evening.\nStep 4: Take quick photos.\nStep 5: Share on social media or create a shared album.",
    tags: ["christmas", "table-game", "photos", "memories", "social-media"],
    type: "Table Game"
  }
];

async function addChristmasTableGames() {
  console.log("🎄 Adding Christmas table games to database...\n");

  try {
    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const game of christmasTableGames) {
      const gameData = {
        id: crypto.randomUUID(),
        slug: generateSlug(game.title),
        title: game.title,
        description: game.description,
        category: game.category,
        players: game.players,
        duration: game.duration,
        difficulty: game.difficulty,
        materials: game.materials,
        steps: game.steps,
        tags: game.tags,
        type: game.type,
        image: null,
      };

      const { error } = await supabase
        .from("games")
        .insert(gameData);

      if (error) {
        console.error(`❌ Error adding "${game.title}":`, error.message);
        errorCount++;
        errors.push(`${game.title}: ${error.message}`);
      } else {
        console.log(`✅ Added: "${game.title}"`);
        successCount++;
      }
    }

    console.log("\n" + "=".repeat(60));
    console.log("📊 SUMMARY");
    console.log("=".repeat(60));
    console.log(`✅ Successfully added: ${successCount} games`);
    console.log(`❌ Failed: ${errorCount} games`);

    if (errors.length > 0) {
      console.log("\n❌ Errors:");
      errors.forEach(error => console.log(`   - ${error}`));
    }

    console.log("\n✨ Christmas table games added successfully!");
    console.log("\n🎯 Next step:");
    console.log("   Run: npm run db:setup-game-types");
    console.log("   This will set the type field for all games.\n");

  } catch (error) {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  }
}

addChristmasTableGames()
  .then(() => {
    console.log("🎉 All done!\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Script failed:", error);
    process.exit(1);
  });
