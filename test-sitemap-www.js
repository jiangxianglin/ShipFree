// Test sitemap with www subdomain
const https = require('https');

const url = 'https://www.icebreakergames.site/sitemap.xml';

console.log('Testing sitemap with www:', url);

https.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('\nResponse length:', data.length);
    
    if (res.statusCode === 200) {
      console.log('\n✅ Sitemap is accessible!');
      console.log('\nFull sitemap content:');
      console.log(data);
      
      // Count game URLs
      const gameUrls = (data.match(/\/games\/[^<]+/g) || []);
      console.log(`\nFound ${gameUrls.length} game URLs in sitemap`);
      if (gameUrls.length > 0) {
        console.log('\nGame URLs:');
        gameUrls.forEach(url => console.log(`  - ${url}`));
      }
    } else {
      console.log('\n❌ Sitemap returned error status');
      console.log('\nResponse content:');
      console.log(data);
    }
  });
}).on('error', (err) => {
  console.error('❌ Error:', err.message);
});
