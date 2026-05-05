import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

import { db } from "@/db";
import { gamesTable } from "@/db/schema";
import { seedGames } from "./games-supabase";

async function runSeed() {
  try {
    console.log("Starting to seed games using shared seed data...");
    
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
