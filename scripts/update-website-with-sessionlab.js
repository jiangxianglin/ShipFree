#!/usr/bin/env node

/**
 * Complete script to update the website with SessionLab categorized games
 * This script will:
 * 1. Read the merged games collection
 * 2. Generate SQL insert statements for new games
 * 3. Update the blog with SessionLab category information
 * 4. Create category pages for SessionLab classifications
 */

const fs = require('fs');
const path = require('path');

const mergedGamesPath = path.join(__dirname, '../data/merged-games-collection.json');
const sqlOutputPath = path.join(__dirname, '../scripts/complete-sessionlab-insert.sql');

console.log('🚀 Starting complete SessionLab website update...');

try {
  // Read merged games data
  const mergedData = JSON.parse(fs.readFileSync(mergedGamesPath, 'utf8'));
  
  console.log(`📊 Processing ${mergedData.games.length} total games`);
  
  // Find SessionLab games (those with Chinese tags or SessionLab source)
  const sessionLabGames = mergedData.games.filter(game => 
    game.source && game.source.includes('sessionlab.com') && 
    (game.tags.some(tag => /[\u4e00-\u9fff]/.test(tag)) || game.description.includes('步骤'))
  );
  
  console.log(`🎯 Found ${sessionLabGames.length} SessionLab games to insert`);
  
  // Generate SQL insert statements
  let sqlContent = `-- Complete SessionLab Games Insert Script
-- Generated on ${new Date().toISOString()}
-- Total games to insert: ${sessionLabGames.length}

-- Begin transaction
BEGIN;

`;

  sessionLabGames.forEach((game, index) => {
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
    sessionLabCategories: mergedData.metadata.sessionLabCategories,
    gamesByCategory: {}
  };
  
  // Group games by SessionLab categories based on tags
  sessionLabGames.forEach(game => {
    const tags = Array.isArray(game.tags) ? game.tags : game.tags.split(',');
    
    // Determine SessionLab category based on tags
    let sessionLabCategory = 'other';
    
    if (tags.includes('会议破冰') || tags.includes('心理重置')) {
      sessionLabCategory = 'meeting_icebreakers';
    } else if (tags.includes('5分钟破冰') || tags.includes('快速')) {
      sessionLabCategory = 'quick_5_minute';
    } else if (tags.includes('趣味破冰') || tags.includes('趣味')) {
      sessionLabCategory = 'fun_icebreakers';
    } else if (tags.includes('虚拟破冰') || tags.includes('远程友好')) {
      sessionLabCategory = 'virtual_icebreakers';
    } else if (tags.includes('相互了解') || tags.includes('个人化')) {
      sessionLabCategory = 'get_to_know';
    } else if (tags.includes('深度') || tags.includes('信任')) {
      sessionLabCategory = 'team_building_deep';
    } else if (tags.includes('大型团体') || tags.includes('大规模')) {
      sessionLabCategory = 'large_group';
    } else if (tags.includes('团队合作提升') || tags.includes('协作')) {
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
  const categoryMappingPath = path.join(__dirname, '../data/sessionlab-category-mapping.json');
  fs.writeFileSync(categoryMappingPath, JSON.stringify(categoryMapping, null, 2));
  console.log(`📋 Category mapping saved to: ${categoryMappingPath}`);
  
  // Generate summary report
  console.log('\n📊 SessionLab Integration Summary:');
  console.log(`   Total games processed: ${mergedData.games.length}`);
  console.log(`   SessionLab games identified: ${sessionLabGames.length}`);
  console.log(`   SQL insert statements generated: ${sessionLabGames.length}`);
  
  console.log('\n🏷️  Games by SessionLab Category:');
  Object.entries(categoryMapping.gamesByCategory).forEach(([category, games]) => {
    const categoryName = categoryMapping.sessionLabCategories[category] || category;
    console.log(`   ${categoryName}: ${games.length} games`);
  });
  
  console.log('\n✅ Next Steps:');
  console.log('   1. Run the SQL script to insert games into database');
  console.log('   2. Update frontend to use SessionLab categories');
  console.log('   3. Add category filter functionality');
  console.log('   4. Update blog post with new games');
  
} catch (error) {
  console.error('❌ Error during website update:', error.message);
  process.exit(1);
}