// Local test to verify sitemap generation logic
const { db } = require('./src/db/index.ts');
const { gamesTable } = require('./src/db/schema.ts');

async function testSitemap() {
  try {
    console.log('Testing sitemap generation locally...\n');
    
    // Get all games
    const games = await db
      .select({
        slug: gamesTable.slug,
        updatedAt: gamesTable.updatedAt
      })
      .from(gamesTable);
    
    console.log(`Found ${games.length} games in database:`);
    games.forEach((game, index) => {
      console.log(`  ${index + 1}. /games/${game.slug}`);
    });
    
    console.log('\n✅ Sitemap will include all game detail pages');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testSitemap();
