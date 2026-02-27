import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log("🚀 Running migration to add 'type' column...\n");

  try {
    // Read the SQL file
    const sqlPath = resolve(process.cwd(), "migrations", "001-add-type-column.sql");
    const sql = readFileSync(sqlPath, "utf-8");

    console.log("📄 SQL to execute:");
    console.log("----------------------------------------");
    console.log(sql);
    console.log("----------------------------------------\n");

    // Note: Supabase JS client doesn't support raw SQL execution with anon key
    // We need to use the SQL Editor in Supabase Dashboard or use a service role key
    console.log("⚠️  IMPORTANT: The Supabase JS client with anon key cannot execute DDL statements.");
    console.log("\n📋 Please follow these steps:\n");
    console.log("1. Go to your Supabase Dashboard: https://supabase.com/dashboard");
    console.log("2. Navigate to: SQL Editor");
    console.log("3. Create a new query");
    console.log("4. Copy and paste the SQL above");
    console.log("5. Click 'Run' to execute\n");
    console.log("After running the SQL, execute: npm run update-game-types\n");

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

runMigration();
