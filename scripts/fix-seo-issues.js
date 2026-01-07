const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkGameSlugs() {
  console.log('Checking game slugs and SEO issues...');
  
  try {
    const { data: games, error } = await supabase
      .from('games')
      .select('id, slug, title')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching games:', error);
      return;
    }

    console.log(`Found ${games.length} games in database:`);
    
    const problematicGames = [];
    
    games.forEach(game => {
      console.log(`- ${game.title} (ID: ${game.id}, Slug: ${game.slug})`);
      
      // Check for missing or problematic slugs
      if (!game.slug || game.slug.includes(' ') || game.slug.length < 3) {
        problematicGames.push(game);
      }
    });

    if (problematicGames.length > 0) {
      console.log('\n⚠️  Games with potential slug issues:');
      problematicGames.forEach(game => {
        console.log(`- ${game.title}: "${game.slug}"`);
      });
    } else {
      console.log('\n✅ All games have proper slugs');
    }

    // Check for the specific games mentioned in the error
    const errorGameIds = [
      'fcc8af12-1cf8-4683-b94d-9db693088fdb',
      'd467cd42-1621-4e54-b66f-4d7a11559fdf',
      '073b00b5-0625-4993-962b-1cae33ff12e5'
    ];

    console.log('\n🔍 Checking specific games from Google Console error:');
    
    for (const gameId of errorGameIds) {
      const game = games.find(g => g.id === gameId);
      if (game) {
        console.log(`✅ Found: ${game.title} (${game.id}) -> /games/${game.slug}`);
        console.log(`   Old URL: https://www.icebreakergames.site/games/${game.id}`);
        console.log(`   New URL: https://www.icebreakergames.site/games/${game.slug}`);
      } else {
        console.log(`❌ Game not found: ${gameId}`);
      }
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

checkGameSlugs();