import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Christmas table games from the blog post
const christmasTableGames = [
  "Holiday Fortunes",
  "Christmas Roll & Poll",
  "Two Truths and a Tinsel",
  "Share a Favorite Holiday Memory",
  "The Great Christmas Candy Pass",
  "Message Under a Plate",
  "Christmas Connection",
  "Around the World Traditions",
  "Holiday Bingo",
  "What's on Your Phone? Christmas Edition",
  "Christmas Pick a Side",
  "Ornament Guess",
  "Topics Tables",
  "Guess the Gift by Sound",
  "Photo Booth Prompt Jar"
];

async function setupGameTypes() {
  console.log("🎮 Setting up game types for Christmas table games...\n");

  try {
    // Step 1: Check if we can access the games table
    console.log("📋 Step 1: Checking database connection...");
    const { data: testData, error: testError } = await supabase
      .from("games")
      .select("id, title")
      .limit(1);

    if (testError) {
      console.error("❌ Database connection error:", testError);
      throw testError;
    }

    console.log("✅ Database connection successful\n");

    // Step 2: Check if type column exists by trying to select it
    console.log("📋 Step 2: Checking if 'type' column exists...");
    const { data: typeCheck, error: typeError } = await supabase
      .from("games")
      .select("id, type")
      .limit(1);

    if (typeError) {
      console.log("⚠️  'type' column does not exist or is not accessible.");
      console.log("\n" + "=".repeat(60));
      console.log("📝 MANUAL STEP REQUIRED:");
      console.log("=".repeat(60));
      console.log("\n1. Go to Supabase Dashboard: https://supabase.com/dashboard");
      console.log("2. Select your project");
      console.log("3. Go to SQL Editor");
      console.log("4. Run this SQL:\n");
      console.log("   ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100);");
      console.log("   CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);\n");
      console.log("5. After running the SQL, run this script again:\n");
      console.log("   npm run db:update-game-types\n");
      console.log("=".repeat(60) + "\n");
      return;
    }

    console.log("✅ 'type' column exists\n");

    // Step 3: Fetch all games
    console.log("📋 Step 3: Fetching all games from database...");
    const { data: allGames, error: fetchError } = await supabase
      .from("games")
      .select("id, title, tags, type");

    if (fetchError) {
      console.error("❌ Error fetching games:", fetchError);
      throw fetchError;
    }

    console.log(`✅ Found ${allGames?.length || 0} games in database\n`);

    // Step 4: Update Christmas table games
    console.log("📋 Step 4: Updating Christmas table games...\n");
    console.log("Target games to update:");
    christmasTableGames.forEach((title, index) => {
      console.log(`   ${index + 1}. ${title}`);
    });
    console.log("");

    let updatedCount = 0;
    let skippedCount = 0;
    const notFoundGames: string[] = [];

    for (const gameTitle of christmasTableGames) {
      const game = allGames?.find(g => g.title === gameTitle);
      
      if (!game) {
        console.log(`⚠️  Not found in DB: "${gameTitle}"`);
        notFoundGames.push(gameTitle);
        continue;
      }

      if (game.type === "Table Game") {
        console.log(`⏭️  Already set: "${gameTitle}"`);
        skippedCount++;
        continue;
      }

      const { error: updateError } = await supabase
        .from("games")
        .update({ type: "Table Game" })
        .eq("id", game.id);

      if (updateError) {
        console.error(`❌ Error updating "${gameTitle}":`, updateError);
      } else {
        console.log(`✅ Updated: "${gameTitle}" → type: "Table Game"`);
        updatedCount++;
      }
    }

    // Step 5: Update other Christmas games (by tags)
    console.log("\n📋 Step 5: Updating other Christmas-tagged games...\n");
    
    const otherChristmasGames = allGames?.filter(game => 
      game.tags && (
        game.tags.includes("christmas") || 
        game.tags.includes("Christmas Games") ||
        game.tags.includes("Holiday Party")
      ) && 
      !christmasTableGames.includes(game.title) &&
      game.type !== "Table Game" // Don't override Table Game type
    );

    console.log(`Found ${otherChristmasGames?.length || 0} other Christmas games\n`);

    for (const game of otherChristmasGames || []) {
      if (game.type === "Christmas Game") {
        console.log(`⏭️  Already set: "${game.title}"`);
        skippedCount++;
        continue;
      }

      const { error: updateError } = await supabase
        .from("games")
        .update({ type: "Christmas Game" })
        .eq("id", game.id);

      if (updateError) {
        console.error(`❌ Error updating "${game.title}":`, updateError);
      } else {
        console.log(`✅ Updated: "${game.title}" → type: "Christmas Game"`);
        updatedCount++;
      }
    }

    // Summary
    console.log("\n" + "=".repeat(60));
    console.log("📊 UPDATE SUMMARY");
    console.log("=".repeat(60));
    console.log(`✅ Successfully updated: ${updatedCount} games`);
    console.log(`⏭️  Skipped (already set): ${skippedCount} games`);
    console.log(`⚠️  Not found in database: ${notFoundGames.length} games`);
    
    if (notFoundGames.length > 0) {
      console.log("\n⚠️  Games not found in database:");
      notFoundGames.forEach(title => console.log(`   - ${title}`));
      console.log("\n💡 Tip: These games need to be added to the database first.");
      console.log("   You can add them using the seed scripts or manually.");
    }

    // Step 6: Verify the updates
    console.log("\n📋 Step 6: Verifying updates...\n");
    
    const { data: tableGames } = await supabase
      .from("games")
      .select("id, title, type")
      .eq("type", "Table Game");

    const { data: christmasGames } = await supabase
      .from("games")
      .select("id, title, type")
      .eq("type", "Christmas Game");

    console.log(`✅ Total Table Games: ${tableGames?.length || 0}`);
    if (tableGames && tableGames.length > 0) {
      console.log("\nTable Games:");
      tableGames.forEach((game, index) => {
        console.log(`   ${index + 1}. ${game.title}`);
      });
    }
    
    console.log(`\n✅ Total Christmas Games: ${christmasGames?.length || 0}`);
    if (christmasGames && christmasGames.length > 0) {
      console.log("\nChristmas Games:");
      christmasGames.forEach((game, index) => {
        console.log(`   ${index + 1}. ${game.title}`);
      });
    }

    console.log("\n" + "=".repeat(60));
    console.log("✨ Setup completed successfully!");
    console.log("=".repeat(60));
    console.log("\n🎯 Next steps:");
    console.log("   1. Start the dev server: npm run dev");
    console.log("   2. Visit: http://localhost:3000");
    console.log("   3. Use the 'Game Type' filter to select 'Table Game'");
    console.log("   4. Click 'Search Activities' to see the results\n");

  } catch (error) {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  }
}

// Run the script
setupGameTypes()
  .then(() => {
    console.log("🎉 All done!\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Script failed:", error);
    process.exit(1);
  });
