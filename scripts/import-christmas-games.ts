import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Script to import Christmas icebreaker games into the database
 * 
 * Usage:
 * - For development: tsx scripts/import-christmas-games.ts
 * - This will read from data/christmas-icebreaker-games.json
 */

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

async function importChristmasGames() {
  console.log('🎄 Starting Christmas games import...\n');

  // Read the JSON file
  const filePath = join(process.cwd(), 'data', 'christmas-icebreaker-games.json');
  const fileContent = readFileSync(filePath, 'utf-8');
  const data: ChristmasGamesData = JSON.parse(fileContent);

  console.log(`📊 Metadata:`);
  console.log(`   Collection Date: ${data.metadata.collectionDate}`);
  console.log(`   Theme: ${data.metadata.theme}`);
  console.log(`   Total Games: ${data.metadata.totalGames}`);
  console.log(`   Sources: ${data.metadata.sources.length} websites\n`);

  // Validate data
  if (data.games.length !== data.metadata.totalGames) {
    console.warn(`⚠️  Warning: Metadata says ${data.metadata.totalGames} games, but found ${data.games.length} games`);
  }

  // Statistics
  const stats = {
    byCategory: {} as Record<string, number>,
    byDifficulty: {} as Record<string, number>,
    byDuration: {} as Record<string, number>,
    totalTags: new Set<string>(),
  };

  data.games.forEach(game => {
    // Count by category
    stats.byCategory[game.category] = (stats.byCategory[game.category] || 0) + 1;
    
    // Count by difficulty
    stats.byDifficulty[game.difficulty] = (stats.byDifficulty[game.difficulty] || 0) + 1;
    
    // Extract duration range
    const durationMatch = game.duration.match(/(\d+)-?(\d+)?/);
    if (durationMatch) {
      const minDuration = parseInt(durationMatch[1]);
      let durationCategory = '';
      if (minDuration <= 10) durationCategory = '5-10 min';
      else if (minDuration <= 20) durationCategory = '10-20 min';
      else durationCategory = '20+ min';
      stats.byDuration[durationCategory] = (stats.byDuration[durationCategory] || 0) + 1;
    }
    
    // Collect all tags
    game.tags.forEach(tag => stats.totalTags.add(tag));
  });

  console.log('📈 Statistics:');
  console.log('\n   By Category:');
  Object.entries(stats.byCategory).forEach(([category, count]) => {
    console.log(`      ${category}: ${count} games`);
  });

  console.log('\n   By Difficulty:');
  Object.entries(stats.byDifficulty).forEach(([difficulty, count]) => {
    console.log(`      ${difficulty}: ${count} games`);
  });

  console.log('\n   By Duration:');
  Object.entries(stats.byDuration).forEach(([duration, count]) => {
    console.log(`      ${duration}: ${count} games`);
  });

  console.log(`\n   Total Unique Tags: ${stats.totalTags.size}`);
  console.log(`   Most Common Tags: ${Array.from(stats.totalTags).slice(0, 10).join(', ')}\n`);

  // Display sample games
  console.log('🎮 Sample Games:\n');
  data.games.slice(0, 3).forEach((game, index) => {
    console.log(`   ${index + 1}. ${game.title}`);
    console.log(`      Category: ${game.category} | Difficulty: ${game.difficulty}`);
    console.log(`      Players: ${game.players} | Duration: ${game.duration}`);
    console.log(`      Tags: ${game.tags.slice(0, 5).join(', ')}`);
    console.log(`      Description: ${game.description.substring(0, 100)}...`);
    console.log('');
  });

  // Validation checks
  console.log('✅ Validation Checks:\n');
  
  let validationErrors = 0;
  
  data.games.forEach((game, index) => {
    const errors: string[] = [];
    
    if (!game.title || game.title.length < 3) {
      errors.push('Title too short');
    }
    
    if (!game.description || game.description.length < 20) {
      errors.push('Description too short');
    }
    
    if (!['Team Building', 'Virtual Meeting', 'Social Event', 'Classroom', 'Training', 'Conference'].includes(game.category)) {
      errors.push(`Invalid category: ${game.category}`);
    }
    
    if (!['Easy', 'Medium', 'Hard'].includes(game.difficulty)) {
      errors.push(`Invalid difficulty: ${game.difficulty}`);
    }
    
    if (!game.steps || game.steps.split('\\n').length < 3) {
      errors.push('Steps too few (minimum 3 steps)');
    }
    
    if (!game.tags || game.tags.length < 2) {
      errors.push('Too few tags (minimum 2)');
    }
    
    if (!game.tags.includes('christmas')) {
      errors.push('Missing "christmas" tag');
    }
    
    if (errors.length > 0) {
      console.log(`   ❌ Game ${index + 1} (${game.title}):`);
      errors.forEach(error => console.log(`      - ${error}`));
      validationErrors++;
    }
  });
  
  if (validationErrors === 0) {
    console.log('   ✅ All games passed validation!\n');
  } else {
    console.log(`\n   ⚠️  ${validationErrors} games have validation issues\n`);
  }

  // Recommendations for landing pages
  console.log('💡 Landing Page Recommendations:\n');
  
  const tableGames = data.games.filter(g => 
    g.tags.includes('table-game') || 
    g.tags.includes('dinner-table') || 
    g.tags.includes('seated')
  );
  console.log(`   📋 Table/Dinner Games: ${tableGames.length} games`);
  console.log(`      Perfect for "christmas table icebreaker games" landing page`);
  
  const virtualGames = data.games.filter(g => g.category === 'Virtual Meeting');
  console.log(`\n   💻 Virtual Games: ${virtualGames.length} games`);
  console.log(`      Perfect for "virtual christmas icebreaker games" landing page`);
  
  const quickGames = data.games.filter(g => {
    const match = g.duration.match(/(\d+)/);
    return match && parseInt(match[1]) <= 10;
  });
  console.log(`\n   ⚡ Quick Games (≤10 min): ${quickGames.length} games`);
  console.log(`      Perfect for "quick christmas icebreaker games" landing page`);
  
  const teamGames = data.games.filter(g => g.tags.includes('team-game'));
  console.log(`\n   👥 Team Games: ${teamGames.length} games`);
  console.log(`      Perfect for "christmas team building activities" landing page`);
  
  const noMaterialGames = data.games.filter(g => 
    g.materials === 'None required' || 
    g.tags.includes('no-materials')
  );
  console.log(`\n   🎯 No Materials Needed: ${noMaterialGames.length} games`);
  console.log(`      Great selling point for busy organizers`);

  console.log('\n🎄 Import preparation complete!');
  console.log('\n📝 Next Steps:');
  console.log('   1. Review the validation results above');
  console.log('   2. Fix any validation errors if present');
  console.log('   3. Run your database seed script to import these games');
  console.log('   4. Create landing pages based on the recommendations');
  console.log('   5. Add printable PDFs for popular games');
  console.log('   6. Optimize meta descriptions for SEO\n');
}

// Run the import
importChristmasGames().catch(console.error);
