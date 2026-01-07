#!/usr/bin/env node

/**
 * Complete script to update the website with SessionLab categorized games (English version)
 * This script will:
 * 1. Read the English SessionLab games collection
 * 2. Generate SQL insert statements for new games
 * 3. Create category mapping for frontend
 * 4. Generate summary report
 */

const fs = require('fs');
const path = require('path');

const sessionLabGamesPath = path.join(__dirname, '../data/sessionlab-games-english.json');
const sqlOutputPath = path.join(__dirname, '../scripts/complete-sessionlab-insert-english.sql');

console.log('🚀 Starting SessionLab English games integration...');

try {
  // Read SessionLab games data
  const sessionLabData = JSON.parse(fs.readFileSync(sessionLabGamesPath, 'utf8'));
  
  console.log(`📊 Processing ${sessionLabData.games.length} SessionLab games`);
  
  // Generate SQL insert statements
  let sqlContent = `-- Complete SessionLab Games Insert Script (English Version)
-- Generated on ${new Date().toISOString()}
-- Total games to insert: ${sessionLabData.games.length}

-- Begin transaction
BEGIN;

`;

  sessionLabData.games.forEach((game, index) => {
    const escapeSql = (str) => str.replace(/'/g, "''");
    
    sqlContent += `-- Game ${index + 1}: ${game.title}
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('${escapeSql(game.title)}', 
'${escapeSql(game.description)}', 
'${escapeSql(game.category)}', 
'${escapeSql(game.players)}', 
'${escapeSql(game.duration)}', 
'${escapeSql(game.difficulty)}', 
'${escapeSql(game.materials)}', 
'${escapeSql(game.steps)}', 
'${Array.isArray(game.tags) ? game.tags.join(',') : game.tags}', 
'${escapeSql(game.source)}')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

`;
  });
  
  sqlContent += `-- Commit transaction
COMMIT;

-- Update statistics
SELECT 'SessionLab games inserted successfully!' as status, COUNT(*) as total_games FROM games WHERE source LIKE '%sessionlab%';
`;

  // Write SQL file
  fs.writeFileSync(sqlOutputPath, sqlContent);
  console.log(`💾 SQL insert script saved to: ${sqlOutputPath}`);
  
  // Generate category mapping for frontend
  const categoryMapping = {
    sessionLabCategories: {
      "meeting_icebreakers": "Meeting Icebreakers",
      "quick_5_minute": "Quick 5-Minute Icebreakers",
      "fun_icebreakers": "Fun Icebreakers",
      "virtual_icebreakers": "Virtual Icebreakers",
      "get_to_know": "Get to Know Each Other",
      "team_building_deep": "Team Building & Deep Connection",
      "large_group": "Large Group Activities",
      "teamwork_improvement": "Teamwork Improvement"
    },
    gamesByCategory: {}
  };
  
  // Group games by SessionLab categories based on tags
  sessionLabData.games.forEach(game => {
    const tags = Array.isArray(game.tags) ? game.tags : game.tags.split(',');
    
    // Determine SessionLab category based on tags
    let sessionLabCategory = 'other';
    
    if (tags.includes('meeting-icebreaker') || tags.includes('mental-reset')) {
      sessionLabCategory = 'meeting_icebreakers';
    } else if (tags.includes('5-minute-icebreaker') || tags.includes('quick')) {
      sessionLabCategory = 'quick_5_minute';
    } else if (tags.includes('fun-icebreaker') || tags.includes('fun')) {
      sessionLabCategory = 'fun_icebreakers';
    } else if (tags.includes('virtual-icebreaker') || tags.includes('remote-friendly')) {
      sessionLabCategory = 'virtual_icebreakers';
    } else if (tags.includes('get-to-know') || tags.includes('personal')) {
      sessionLabCategory = 'get_to_know';
    } else if (tags.includes('deep') || tags.includes('trust')) {
      sessionLabCategory = 'team_building_deep';
    } else if (tags.includes('large-group') || tags.includes('large-scale')) {
      sessionLabCategory = 'large_group';
    } else if (tags.includes('teamwork-improvement') || tags.includes('collaboration')) {
      sessionLabCategory = 'teamwork_improvement';
    }
    
    if (!categoryMapping.gamesByCategory[sessionLabCategory]) {
      categoryMapping.gamesByCategory[sessionLabCategory] = [];
    }
    categoryMapping.gamesByCategory[sessionLabCategory].push({
      title: game.title,
      description: game.description,
      duration: game.duration,
      players: game.players,
      difficulty: game.difficulty
    });
  });
  
  // Save category mapping
  const categoryMappingPath = path.join(__dirname, '../data/sessionlab-category-mapping-english.json');
  fs.writeFileSync(categoryMappingPath, JSON.stringify(categoryMapping, null, 2));
  console.log(`📋 Category mapping saved to: ${categoryMappingPath}`);
  
  // Generate tag analysis
  const allTags = new Set();
  sessionLabData.games.forEach(game => {
    const tags = Array.isArray(game.tags) ? game.tags : game.tags.split(',');
    tags.forEach(tag => allTags.add(tag.trim()));
  });
  
  // Generate summary report
  console.log('\n📊 SessionLab English Integration Summary:');
  console.log(`   Total games processed: ${sessionLabData.games.length}`);
  console.log(`   SQL insert statements generated: ${sessionLabData.games.length}`);
  console.log(`   Categories defined: ${Object.keys(categoryMapping.sessionLabCategories).length}`);
  
  console.log('\n🏷️  Games by SessionLab Category:');
  Object.entries(categoryMapping.gamesByCategory).forEach(([category, games]) => {
    const categoryName = categoryMapping.sessionLabCategories[category] || category;
    console.log(`   ${categoryName}: ${games.length} games`);
  });
  
  console.log('\n🏷️  All English Tags:');
  Array.from(allTags).sort().forEach(tag => {
    console.log(`   - ${tag}`);
  });
  
  console.log('\n✅ Next Steps:');
  console.log('   1. Run the SQL script to insert games into database');
  console.log('   2. Update frontend to use SessionLab categories');
  console.log('   3. Test the new category filtering functionality');
  console.log('   4. Deploy the updated English content');
  
} catch (error) {
  console.error('❌ Error during English website update:', error.message);
  process.exit(1);
}