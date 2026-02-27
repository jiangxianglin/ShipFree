import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Christmas table games titles
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

async function updateToChristmasGame() {
  console.log("🎄 Updating games to 'Christmas Game' type...\n");

  try {
    // Fetch all games
    const { data: allGames, error: fetchError } = await supabase
      .from("games")
      .select("id, title, type");

    if (fetchError) {
      console.error("❌ Error fetching games:", fetchError);
      throw fetchError;
    }

    console.log(`✅ Found ${allGames?.length || 0} games in database\n`);

    let updatedCount = 0;
    let notFoundCount = 0;
    const notFound: string[] = [];

    for (const gameTitle of christmasTableGames) {
      const game = allGames?.find(g => g.title === gameTitle);
      
      if (!game) {
        console.log(`⚠️  Not found: "${gameTitle}"`);
        notFoundCount++;
        notFound.push(gameTitle);
        continue;
      }

      console.log(`📝 Updating "${gameTitle}"...`);
      console.log(`   Current type: ${game.type || 'null'}`);

      const { error: updateError } = await supabase
        .from("games")
        .update({ type: "Christmas Game" })
        .eq("id", game.id);

      if (updateError) {
        console.error(`❌ Error updating "${gameTitle}":`, updateError);
      } else {
        console.log(`✅ Updated to: Christmas Game\n`);
        updatedCount++;
      }
    }

    console.log("=".repeat(60));
    console.log("📊 UPDATE SUMMARY");
    console.log("=".repeat(60));
    console.log(`✅ Successfully updated: ${updatedCount} games`);
    console.log(`⚠️  Not found: ${notFoundCount} games`);

    if (notFound.length > 0) {
      console.log("\n⚠️  Games not found:");
      notFound.forEach(title => console.log(`   - ${title}`));
    }

    // Verify the updates
    console.log("\n📋 Verifying updates...\n");
    
    const { data: christmasGames, error: verifyError } = await supabase
      .from("games")
      .select("id, title, type")
      .eq("type", "Christmas Game");

    if (!verifyError && christmasGames) {
      console.log(`✅ Total Christmas Games: ${christmasGames.length}\n`);
      console.log("Christmas Games in database:");
      christmasGames.forEach((game, index) => {
        console.log(`   ${index + 1}. ${game.title}`);
      });
    }

    console.log("\n" + "=".repeat(60));
    console.log("✨ Update completed successfully!");
    console.log("=".repeat(60));
    console.log("\n🎯 Next steps:");
    console.log("   1. Refresh your browser (Ctrl + F5)");
    console.log("   2. Select 'Christmas Game' in the Game Type filter");
    console.log("   3. Click 'Search Activities'");
    console.log("   4. You should see 15 Christmas games!\n");

  } catch (error) {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  }
}

updateToChristmasGame()
  .then(() => {
    console.log("🎉 All done!\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Script failed:", error);
    process.exit(1);
  });
