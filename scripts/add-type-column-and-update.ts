import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function addTypeColumnAndUpdate() {
  console.log("🚀 Starting database update...\n");

  try {
    // Step 1: Check if type column exists
    console.log("📋 Step 1: Checking if 'type' column exists...");
    const { data: columns, error: columnsError } = await supabase
      .from("games")
      .select("*")
      .limit(1);

    if (columnsError) {
      console.error("❌ Error checking columns:", columnsError);
      throw columnsError;
    }

    const hasTypeColumn = columns && columns.length > 0 && 'type' in columns[0];
    
    if (!hasTypeColumn) {
      console.log("⚠️  'type' column does not exist. You need to add it manually via Supabase SQL Editor:");
      console.log("\nRun this SQL in Supabase SQL Editor:");
      console.log("----------------------------------------");
      console.log("ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100);");
      console.log("----------------------------------------\n");
      console.log("After adding the column, run this script again.");
      return;
    }

    console.log("✅ 'type' column exists\n");

    // Step 2: Get all games
    console.log("📋 Step 2: Fetching all games...");
    const { data: allGames, error: fetchError } = await supabase
      .from("games")
      .select("id, title, tags, type");

    if (fetchError) {
      console.error("❌ Error fetching games:", fetchError);
      throw fetchError;
    }

    console.log(`✅ Found ${allGames?.length || 0} games\n`);

    // Step 3: Define Christmas table games
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

    // Step 4: Update games
    console.log("📋 Step 3: Updating game types...\n");
    
    let updatedCount = 0;
    let skippedCount = 0;
    let notFoundGames: string[] = [];

    for (const gameTitle of christmasTableGames) {
      const game = allGames?.find(g => g.title === gameTitle);
      
      if (!game) {
        console.log(`⚠️  Game not found: "${gameTitle}"`);
        notFoundGames.push(gameTitle);
        continue;
      }

      if (game.type === "Table Game") {
        console.log(`⏭️  Skipped (already set): "${gameTitle}"`);
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
        console.log(`✅ Updated: "${gameTitle}" -> type: "Table Game"`);
        updatedCount++;
      }
    }

    // Step 5: Update games with christmas tags
    console.log("\n📋 Step 4: Updating games with 'christmas' tags...\n");
    
    const gamesWithChristmasTags = allGames?.filter(game => 
      game.tags && (
        game.tags.includes("christmas") || 
        game.tags.includes("Christmas Games") ||
        game.tags.includes("Holiday Party")
      ) && !christmasTableGames.includes(game.title)
    );

    for (const game of gamesWithChristmasTags || []) {
      if (game.type === "Christmas Game") {
        console.log(`⏭️  Skipped (already set): "${game.title}"`);
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
        console.log(`✅ Updated: "${game.title}" -> type: "Christmas Game"`);
        updatedCount++;
      }
    }

    // Summary
    console.log("\n" + "=".repeat(50));
    console.log("📊 Update Summary:");
    console.log("=".repeat(50));
    console.log(`✅ Successfully updated: ${updatedCount} games`);
    console.log(`⏭️  Skipped (already set): ${skippedCount} games`);
    console.log(`⚠️  Not found in database: ${notFoundGames.length} games`);
    
    if (notFoundGames.length > 0) {
      console.log("\n⚠️  Games not found in database:");
      notFoundGames.forEach(title => console.log(`   - ${title}`));
      console.log("\n💡 These games need to be added to the database first.");
    }

    console.log("\n✨ Database update completed!\n");

    // Step 6: Verify updates
    console.log("📋 Step 5: Verifying updates...\n");
    
    const { data: tableGames, error: verifyError1 } = await supabase
      .from("games")
      .select("id, title, type")
      .eq("type", "Table Game");

    const { data: christmasGames, error: verifyError2 } = await supabase
      .from("games")
      .select("id, title, type")
      .eq("type", "Christmas Game");

    if (!verifyError1 && !verifyError2) {
      console.log(`✅ Table Games: ${tableGames?.length || 0}`);
      if (tableGames && tableGames.length > 0) {
        tableGames.forEach(game => console.log(`   - ${game.title}`));
      }
      
      console.log(`\n✅ Christmas Games: ${christmasGames?.length || 0}`);
      if (christmasGames && christmasGames.length > 0) {
        christmasGames.forEach(game => console.log(`   - ${game.title}`));
      }
    }

  } catch (error) {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  }
}

// Run the script
addTypeColumnAndUpdate()
  .then(() => {
    console.log("\n🎉 All done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Script failed:", error);
    process.exit(1);
  });
