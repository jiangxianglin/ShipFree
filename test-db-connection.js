// Test database connection and check for games
const https = require('https');

const testUrl = 'https://www.icebreakergames.site/api/test-db';

console.log('Testing database connection...\n');

https.get(testUrl, (res) => {
  console.log('Status Code:', res.statusCode);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      
      if (result.success) {
        console.log('\n✅ Database connection successful!');
        console.log(`\nFound ${result.count} games in database`);
        
        if (result.count === 0) {
          console.log('\n⚠️  WARNING: No games found in database!');
          console.log('\nYou need to run the seed-games.sql file in Supabase SQL Editor.');
          console.log('Steps:');
          console.log('1. Go to Supabase Dashboard');
          console.log('2. Open SQL Editor');
          console.log('3. Copy and paste the content from seed-games.sql');
          console.log('4. Click "Run"');
        } else {
          console.log('\nGames in database:');
          result.games.forEach((game, index) => {
            console.log(`  ${index + 1}. ${game.title} (slug: ${game.slug})`);
          });
        }
      } else {
        console.log('\n❌ Database connection failed!');
        console.log('\nError:', result.error);
        if (result.stack) {
          console.log('\nStack trace:');
          console.log(result.stack);
        }
      }
    } catch (error) {
      console.log('\n❌ Failed to parse response');
      console.log('Response:', data);
    }
  });
}).on('error', (err) => {
  console.error('❌ Request error:', err.message);
});
