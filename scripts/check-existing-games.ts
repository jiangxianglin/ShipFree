import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkExistingGames() {
  console.log("🔍 Checking existing games in database...\n");

  try {
    // Fetch all games
    const { data: allGames, error } = await supabase
      .from("games")
      .select("id, title, tags, category")
      .order("title");

    if (error) {
      console.error("❌ Error fetching games:", error);
      throw error;
    }

    console.log(`✅ Found ${allGames?.length || 0} games in database\n`);

    // Check for Christmas-related games
    const christmasGames = allGames?.filter(game => 
      game.tags && (
        game.tags.includes("christmas") || 
        game.tags.includes("Christmas Games") ||
        game.tags.includes("Holiday Party") ||
        game.title.toLowerCase().includes("christmas") ||
        game.title.toLowerCase().includes("holiday")
      )
    );

    console.log(`🎄 Found ${christmasGames?.length || 0} Christmas-related games:\n`);
    
    if (christmasGames && christmasGames.length > 0) {
      christmasGames.forEach((game, index) => {
        console.log(`   ${index + 1}. ${game.title}`);
        console.log(`      Category: ${game.category}`);
        console.log(`      Tags: ${game.tags?.join(", ") || "none"}`);
        console.log("");
      });
    } else {
      console.log("   No Christmas games found in database.\n");
    }

    // List all game titles
    console.log("📋 All games in database:\n");
    allGames?.forEach((game, index) => {
      console.log(`   ${index + 1}. ${game.title}`);
    });

  } catch (error) {
    console.error("\n❌ Error:", error);
    process.exit(1);
  }
}

checkExistingGames()
  .then(() => {
    console.log("\n✅ Check completed!\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Script failed:", error);
    process.exit(1);
  });
