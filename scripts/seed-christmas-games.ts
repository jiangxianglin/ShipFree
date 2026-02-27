import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";
import { join } from "path";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

import { db } from "@/db";
import { gamesTable } from "@/db/schema";
import { generateSlug } from "@/lib/utils/slug";

interface ChristmasGame {
  title: string;
  description: string;
  category: string;
  players: string;
  duration: string;
  difficulty: string;
  materials: string;
  steps: string;
  tags: string[];
  source: string;
}

interface ChristmasGamesData {
  metadata: {
    collectionDate: string;
    theme: string;
    sources: string[];
    notes: string;
    totalGames: number;
  };
  games: ChristmasGame[];
}

async function seedChristmasGames() {
  console.log('🎄 Starting Christmas games database import...\n');

  try {
    // Read the JSON file
    const filePath = join(process.cwd(), 'data', 'christmas-icebreaker-games.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    const data: ChristmasGamesData = JSON.parse(fileContent);

    console.log(`📊 Loading ${data.games.length} Christmas games...`);
    console.log(`📅 Collection Date: ${data.metadata.collectionDate}`);
    console.log(`🎨 Theme: ${data.metadata.theme}\n`);

    // Transform games to match database schema
    const gamesToInsert = data.games.map(game => ({
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
      image: null, // Can be added later
    }));

    console.log('💾 Inserting games into database...\n');

    // Insert games in batches to avoid overwhelming the database
    const batchSize = 10;
    let inserted = 0;

    for (let i = 0; i < gamesToInsert.length; i += batchSize) {
      const batch = gamesToInsert.slice(i, i + batchSize);
      
      try {
        await db.insert(gamesTable).values(batch);
        inserted += batch.length;
        console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1}: ${inserted}/${gamesToInsert.length} games`);
      } catch (error) {
        console.error(`❌ Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error);
        // Continue with next batch
      }
    }

    console.log(`\n🎉 Successfully imported ${inserted} Christmas games!`);
    
    // Show statistics
    const stats = {
      byCategory: {} as Record<string, number>,
      byDifficulty: {} as Record<string, number>,
    };

    gamesToInsert.forEach(game => {
      stats.byCategory[game.category] = (stats.byCategory[game.category] || 0) + 1;
      stats.byDifficulty[game.difficulty] = (stats.byDifficulty[game.difficulty] || 0) + 1;
    });

    console.log('\n📈 Import Statistics:');
    console.log('\n   By Category:');
    Object.entries(stats.byCategory).forEach(([category, count]) => {
      console.log(`      ${category}: ${count} games`);
    });

    console.log('\n   By Difficulty:');
    Object.entries(stats.byDifficulty).forEach(([difficulty, count]) => {
      console.log(`      ${difficulty}: ${count} games`);
    });

    console.log('\n✨ Christmas games are now available in your database!');
    console.log('\n📝 Next Steps:');
    console.log('   1. Visit your games page to see the new Christmas games');
    console.log('   2. Filter by "christmas" tag to see all holiday games');
    console.log('   3. Create dedicated Christmas landing pages');
    console.log('   4. Add images to games for better visual appeal');
    console.log('   5. Test the filtering and search functionality\n');

  } catch (error) {
    console.error('❌ Error during import:', error);
    throw error;
  }
}

// Run the seed
seedChristmasGames()
  .then(() => {
    console.log('🎄 Import complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Import failed:', error);
    process.exit(1);
  });
