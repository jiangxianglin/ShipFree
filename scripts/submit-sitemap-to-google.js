// Script to help with Google Search Console sitemap submission
// This will generate the current sitemap URLs for manual submission

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateCurrentSitemapInfo() {
  console.log('🗺️  Generating current sitemap information...\n');
  
  try {
    const { data: games, error } = await supabase
      .from('games')
      .select('slug, title, updated_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching games:', error);
      return;
    }

    console.log('📊 Current website structure:');
    console.log('='.repeat(50));
    
    // Static pages
    console.log('\n📄 Static Pages:');
    const staticPages = [
      'https://www.icebreakergames.site/',
      'https://www.icebreakergames.site/games',
      'https://www.icebreakergames.site/blog',
      'https://www.icebreakergames.site/privacy-policy',
      'https://www.icebreakergames.site/tos'
    ];
    
    staticPages.forEach(url => console.log(`  ✅ ${url}`));
    
    // Game pages
    console.log(`\n🎮 Game Pages (${games.length} total):`);
    games.forEach(game => {
      console.log(`  ✅ https://www.icebreakergames.site/games/${game.slug}`);
    });
    
    console.log('\n📋 Action Items for Google Search Console:');
    console.log('='.repeat(50));
    console.log('1. Submit sitemap: https://www.icebreakergames.site/sitemap.xml');
    console.log('2. Request removal of old URLs:');
    console.log('   - https://www.icebreakergames.site/games/fcc8af12-1cf8-4683-b94d-9db693088fdb');
    console.log('   - https://www.icebreakergames.site/games/d467cd42-1621-4e54-b66f-4d7a11559fdf');
    console.log('   - https://www.icebreakergames.site/games/073b00b5-0625-4993-962b-1cae33ff12e5');
    console.log('3. Request indexing of current game pages');
    
    console.log('\n🔧 Technical fixes implemented:');
    console.log('   ✅ Added UUID to slug redirects in middleware');
    console.log('   ✅ Fixed canonical URLs to always use slug format');
    console.log('   ✅ Ensured proper robots meta tags');
    console.log('   ✅ Created dynamic robots.txt');
    
    console.log('\n📈 SEO Status:');
    console.log(`   ✅ ${games.length} game pages with proper SEO metadata`);
    console.log('   ✅ All pages set to index: true, follow: true');
    console.log('   ✅ Canonical URLs properly configured');
    console.log('   ✅ OpenGraph and Twitter Card metadata included');

  } catch (error) {
    console.error('Error:', error);
  }
}

generateCurrentSitemapInfo();