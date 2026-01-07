#!/usr/bin/env node

/**
 * Script to check all categories in the database
 */

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCategories() {
  try {
    console.log('🔍 Checking all categories in database...\n');
    
    // Get all unique categories with game counts
    const { data: categories, error } = await supabase
      .from('games')
      .select('category')
      .order('category');
    
    if (error) {
      throw error;
    }
    
    // Count games per category
    const categoryCount = {};
    categories.forEach(game => {
      categoryCount[game.category] = (categoryCount[game.category] || 0) + 1;
    });
    
    console.log('📊 Categories and game counts:');
    console.log('================================');
    
    let totalCategories = 0;
    let totalGames = 0;
    
    Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a) // Sort by count descending
      .forEach(([category, count]) => {
        console.log(`   ${category}: ${count} games`);
        totalCategories++;
        totalGames += count;
      });
    
    console.log('================================');
    console.log(`📈 Total Categories: ${totalCategories}`);
    console.log(`🎮 Total Games: ${totalGames}`);
    
    // Check for SessionLab specific games
    console.log('\n🎯 SessionLab Games by Category:');
    console.log('================================');
    
    const sessionLabTitles = [
      'What Are You Bringing to the Meeting?',
      'Weather Check-in',
      'Have You Ever? (Stand Up If)',
      '5-4-3-2-1 Grounding Technique',
      'One Word at a Time',
      'Count Up',
      'Chat Waterfall',
      'Emoji Check-In',
      'Portrait Gallery',
      'Minefield'
    ];
    
    for (const title of sessionLabTitles) {
      const { data: game, error } = await supabase
        .from('games')
        .select('category, title')
        .eq('title', title)
        .single();
      
      if (game) {
        console.log(`   ${game.category}: ${game.title}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking categories:', error.message);
  }
}

checkCategories();