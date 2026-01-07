#!/usr/bin/env node

/**
 * Script to check current database state and insert SessionLab games
 */

const { drizzle } = require('drizzle-orm/node-postgres');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL not found in environment variables');
  process.exit(1);
}

console.log('🔍 Connecting to database...');

const client = new Client({
  connectionString: connectionString,
});

async function checkDatabaseState() {
  try {
    // Check current game count
    const result = await client.query('SELECT COUNT(*) as count FROM games');
    const currentCount = parseInt(result.rows[0].count);
    
    console.log(`📊 Current games in database: ${currentCount}`);
    
    // Check if any SessionLab games already exist
    const sessionLabGames = await client.query(`
      SELECT COUNT(*) as count 
      FROM games 
      WHERE source LIKE '%sessionlab%'
    `);
    const sessionLabCount = parseInt(sessionLabGames.rows[0].count);
    
    console.log(`🎯 SessionLab games already in database: ${sessionLabCount}`);
    
    return { currentCount, sessionLabCount };
  } catch (error) {
    console.error('❌ Error checking database state:', error.message);
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
    
    for (const game of sessionLabData.games) {
      try {
        // Check if game already exists
        const existing = await client.query('SELECT id FROM games WHERE title = $1', [game.title]);
        
        if (existing.rows.length > 0) {
          // Update existing game
          await client.query(`
            UPDATE games SET
              description = $2,
              category = $3,
              players = $4,
              duration = $5,
              difficulty = $6,
              materials = $7,
              steps = $8,
              tags = $9,
              source = $10
            WHERE title = $1
          `, [
            game.title,
            game.description,
            game.category,
            game.players,
            game.duration,
            game.difficulty,
            game.materials,
            game.steps,
            Array.isArray(game.tags) ? game.tags.join(',') : game.tags,
            game.source
          ]);
          updatedCount++;
          console.log(`✏️  Updated: ${game.title}`);
        } else {
          // Insert new game
          await client.query(`
            INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          `, [
            game.title,
            game.description,
            game.category,
            game.players,
            game.duration,
            game.difficulty,
            game.materials,
            game.steps,
            Array.isArray(game.tags) ? game.tags.join(',') : game.tags,
            game.source
          ]);
          insertedCount++;
          console.log(`✅ Inserted: ${game.title}`);
        }
      } catch (gameError) {
        console.error(`❌ Error processing game "${game.title}":`, gameError.message);
      }
    }
    
    console.log(`\n📈 Summary:`);
    console.log(`   New games inserted: ${insertedCount}`);
    console.log(`   Existing games updated: ${updatedCount}`);
    
    return { insertedCount, updatedCount };
  } catch (error) {
    console.error('❌ Error inserting SessionLab games:', error.message);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Starting database check and update...\n');
    
    await client.connect();
    
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
    
  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();