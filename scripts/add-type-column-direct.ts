import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

import pg from "pg";
const { Client } = pg;

async function addTypeColumn() {
  console.log("🚀 Adding 'type' column to games table...\n");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // Connect to database
    console.log("📋 Step 1: Connecting to database...");
    await client.connect();
    console.log("✅ Connected successfully\n");

    // Check if column exists
    console.log("📋 Step 2: Checking if 'type' column exists...");
    const checkColumnQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'games' AND column_name = 'type';
    `;
    
    const checkResult = await client.query(checkColumnQuery);
    
    if (checkResult.rows.length > 0) {
      console.log("✅ 'type' column already exists\n");
    } else {
      console.log("⚠️  'type' column does not exist, adding it now...\n");
      
      // Add type column
      console.log("📋 Step 3: Adding 'type' column...");
      await client.query(`
        ALTER TABLE games ADD COLUMN type VARCHAR(100);
      `);
      console.log("✅ Column added successfully\n");
    }

    // Create index
    console.log("📋 Step 4: Creating index on 'type' column...");
    try {
      await client.query(`
        CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);
      `);
      console.log("✅ Index created successfully\n");
    } catch (error: any) {
      if (error.code === '42P07') {
        console.log("✅ Index already exists\n");
      } else {
        throw error;
      }
    }

    // Add comment
    console.log("📋 Step 5: Adding column comment...");
    await client.query(`
      COMMENT ON COLUMN games.type IS 'Game type classification: Table Game, Christmas Game, Icebreaker, Energizer, etc.';
    `);
    console.log("✅ Comment added successfully\n");

    // Verify
    console.log("📋 Step 6: Verifying column...");
    const verifyQuery = `
      SELECT column_name, data_type, character_maximum_length 
      FROM information_schema.columns 
      WHERE table_name = 'games' AND column_name = 'type';
    `;
    
    const verifyResult = await client.query(verifyQuery);
    
    if (verifyResult.rows.length > 0) {
      console.log("✅ Verification successful:");
      console.log("   Column:", verifyResult.rows[0].column_name);
      console.log("   Type:", verifyResult.rows[0].data_type);
      console.log("   Max Length:", verifyResult.rows[0].character_maximum_length);
      console.log("");
    }

    console.log("=" .repeat(60));
    console.log("✨ Database column setup completed successfully!");
    console.log("=" .repeat(60));
    console.log("\n🎯 Next step:");
    console.log("   Run: npm run db:setup-game-types");
    console.log("   This will update the game data with type values.\n");

  } catch (error: any) {
    console.error("\n❌ Error:", error.message);
    console.error("\nFull error:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Run the script
addTypeColumn()
  .then(() => {
    console.log("🎉 All done!\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Script failed:", error);
    process.exit(1);
  });
