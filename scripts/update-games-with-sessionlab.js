#!/usr/bin/env node

/**
 * Script to integrate SessionLab categorized games into the existing game collection
 * This script merges the new SessionLab games with existing games and updates the database
 */

const fs = require('fs');
const path = require('path');

// Read the existing games collection
const existingGamesPath = path.join(__dirname, '../data/raw-games-collection.json');
const sessionLabGamesPath = path.join(__dirname, '../data/sessionlab-integrated-games.json');
const outputPath = path.join(__dirname, '../data/merged-games-collection.json');

console.log('🎮 Starting SessionLab games integration...');

try {
  // Read existing games
  const existingGamesData = JSON.parse(fs.readFileSync(existingGamesPath, 'utf8'));
  const sessionLabGamesData = JSON.parse(fs.readFileSync(sessionLabGamesPath, 'utf8'));
  
  console.log(`📊 Found ${existingGamesData.games.length} existing games`);
  console.log(`🆕 Found ${sessionLabGamesData.games.length} SessionLab games`);
  
  // Create merged collection
  const mergedCollection = {
    metadata: {
      collectionDate: new Date().toISOString().split('T')[0],
      sources: [
        ...existingGamesData.metadata.sources,
        "https://www.sessionlab.com/blog/icebreaker-games/ (SessionLab categorized)"
      ],
      notes: "Merged collection with SessionLab categorized games integrated",
      totalGames: existingGamesData.games.length + sessionLabGamesData.games.length,
      sessionLabCategories: sessionLabGamesData.metadata.sessionLabCategories
    },
    games: []
  };
  
  // Add existing games first
  mergedCollection.games = [...existingGamesData.games];
  
  // Add SessionLab games, avoiding duplicates
  const existingTitles = new Set(existingGamesData.games.map(game => game.title.toLowerCase()));
  
  sessionLabGamesData.games.forEach(game => {
    if (!existingTitles.has(game.title.toLowerCase())) {
      mergedCollection.games.push(game);
      console.log(`✅ Added new game: ${game.title}`);
    } else {
      console.log(`⚠️  Skipped duplicate: ${game.title}`);
    }
  });
  
  // Write merged collection
  fs.writeFileSync(outputPath, JSON.stringify(mergedCollection, null, 2));
  
  console.log(`🎉 Successfully merged games!`);
  console.log(`📈 Total games in merged collection: ${mergedCollection.games.length}`);
  console.log(`💾 Merged collection saved to: ${outputPath}`);
  
  // Generate summary report
  const categoryCount = {};
  mergedCollection.games.forEach(game => {
    categoryCount[game.category] = (categoryCount[game.category] || 0) + 1;
  });
  
  console.log('\n📊 Games by Category:');
  Object.entries(categoryCount)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`   ${category}: ${count} games`);
    });
  
  // Generate SessionLab tags summary
  const sessionLabTags = new Set();
  sessionLabGamesData.games.forEach(game => {
    game.tags.forEach(tag => sessionLabTags.add(tag));
  });
  
  console.log('\n🏷️  SessionLab Tags Added:');
  Array.from(sessionLabTags).sort().forEach(tag => {
    console.log(`   - ${tag}`);
  });
  
} catch (error) {
  console.error('❌ Error during integration:', error.message);
  process.exit(1);
}