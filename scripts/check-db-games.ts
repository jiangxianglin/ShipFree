import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkGames() {
  console.log("🔍 Checking games in database...\n");

  const { data, error, count } = await supabase
    .from("games")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Error fetching games:", error);
    return;
  }

  console.log(`📊 Total games in database: ${count}`);
  console.log(`📦 Games returned: ${data?.length || 0}\n`);

  if (data && data.length > 0) {
    console.log("📝 First 5 games:");
    data.slice(0, 5).forEach((game, index) => {
      console.log(`  ${index + 1}. ${game.title} (slug: ${game.slug})`);
      console.log(`     Created: ${game.created_at}`);
    });

    console.log("\n📝 Last 5 games:");
    data.slice(-5).forEach((game, index) => {
      console.log(`  ${data.length - 4 + index}. ${game.title} (slug: ${game.slug})`);
      console.log(`     Created: ${game.created_at}`);
    });
  }
}

checkGames().catch(console.error);
