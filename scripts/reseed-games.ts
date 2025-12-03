import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function reseedGames() {
  console.log("🗑️  Clearing existing games from database...\n");

  // Delete all existing games
  const { error: deleteError } = await supabase
    .from("games")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all rows

  if (deleteError) {
    console.error("❌ Error deleting games:", deleteError);
    return;
  }

  console.log("✅ All games deleted successfully!\n");
  console.log("📝 Now run the seed script to import all games:");
  console.log("   pnpm tsx src/db/seed/games-supabase.ts\n");
}

reseedGames().catch(console.error);
