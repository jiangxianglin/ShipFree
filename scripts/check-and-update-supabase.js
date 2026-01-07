#!/usr/bin/env node

/**
 * Script to check current database state and insert SessionLab games using Supabase
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials not found in environment variables');
  process.exit(1);
}

console.log('🔍 Connecting to Supabase...');

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabaseState() {
  try {
    // Check current game count
    const { count: currentCount, error: countError } = await supabase
      .from('games')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Count error:', countError);
      throw countError;
    }
    
    console.log(`📊 Current games in database: ${currentCount}`);
    
    // Check if any SessionLab games already exist (check by title patterns)
    const { data: sessionLabGames, error: sessionLabError } = await supabase
      .from('games')
      .select('title')
      .or('title.ilike.%What Are You Bringing%,title.ilike.%Weather Check%,title.ilike.%SessionLab%');
    
    if (sessionLabError) {
      console.error('SessionLab count error:', sessionLabError);
      // Don't throw here, just set to 0
      console.log(`🎯 SessionLab games already in database: 0 (could not check)`);
      return { currentCount: currentCount || 0, sessionLabCount: 0 };
    }
    
    const sessionLabCount = sessionLabGames ? sessionLabGames.length : 0;
    console.log(`🎯 SessionLab games already in database: ${sessionLabCount}`);
    
    return { currentCount: currentCount || 0, sessionLabCount: sessionLabCount || 0 };
  } catch (error) {
    console.error('❌ Error checking database state:', error);
    throw error;
  }
}

async function insertSessionLabGames() {
  try {
    console.log('📥 Reading SessionLab games data...');
    
    const sessionLabDataPath = path.join(__dirname, '../data/sessionlab-games-english.json');
    const sessionLabData = JSON.parse(fs.readFileSync(sessionLabDataPath, 'utf8'));
    
    console.log(`🎮 Found ${sessionLabData.games.length} SessionLab games to process`);
    
    let insertedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const game of sessionLabData.games) {
      try {
        // Check if game already exists
        const { data: existing, error: checkError } = await supabase
          .from('games')
          .select('id')
          .eq('title', game.title)
          .single();
        
        if (checkError && checkError.code !== 'PGRST116') {
          throw checkError;
        }
        
        const gameData = {
          id: crypto.randomUUID(),
          title: game.title,
          slug: game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          description: game.description,
          category: game.category,
          players: game.players,
          duration: game.duration,
          difficulty: game.difficulty,
          materials: game.materials,
          steps: game.steps,
          tags: Array.isArray(game.tags) ? game.tags : game.tags.split(',').map(tag => tag.trim())
        };
        
        if (existing) {
          // Update existing game
          const { error: updateError } = await supabase
            .from('games')
            .update(gameData)
            .eq('id', existing.id);
          
          if (updateError) {
            throw updateError;
          }
          
          updatedCount++;
          console.log(`✏️  Updated: ${game.title}`);
        } else {
          // Insert new game
          const { error: insertError } = await supabase
            .from('games')
            .insert([gameData]);
          
          if (insertError) {
            // Check if it's a duplicate error
            if (insertError.code === '23505') {
              console.log(`⚠️  Skipped duplicate: ${game.title}`);
              skippedCount++;
              continue;
            }
            throw insertError;
          }
          
          insertedCount++;
          console.log(`✅ Inserted: ${game.title}`);
        }
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (gameError) {
        console.error(`❌ Error processing game "${game.title}":`, gameError.message);
      }
    }
    
    console.log(`\n📈 Summary:`);
    console.log(`   New games inserted: ${insertedCount}`);
    console.log(`   Existing games updated: ${updatedCount}`);
    console.log(`   Duplicates skipped: ${skippedCount}`);
    
    return { insertedCount, updatedCount, skippedCount };
  } catch (error) {
    console.error('❌ Error inserting SessionLab games:', error.message);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Starting Supabase database check and update...\n');
    
    // Check current state
    const initialState = await checkDatabaseState();
    
    console.log('\n🔄 Inserting/updating SessionLab games...');
    const results = await insertSessionLabGames();
    
    // Check final state
    console.log('\n🔍 Checking final database state...');
    const finalState = await checkDatabaseState();
    
    console.log('\n🎉 Database update completed!');
    console.log(`📊 Total games before: ${initialState.currentCount}`);
    console.log(`📊 Total games after: ${finalState.currentCount}`);
    console.log(`📈 Net change: +${finalState.currentCount - initialState.currentCount} games`);
    
    if (results.insertedCount > 0 || results.updatedCount > 0) {
      console.log('\n✨ Your website now has the latest SessionLab games!');
      console.log('🔄 You may need to refresh your browser to see the changes.');
    }
    
  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  }
}

main();