// 测试 sitemap 是否可以访问
const https = require('https');

const url = 'https://icebreakergames.site/sitemap.xml';

console.log('Testing sitemap:', url);

https.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('\nResponse length:', data.length);
    console.log('\nFirst 500 characters:');
    console.log(data.substring(0, 500));
    
    if (res.statusCode === 200) {
      console.log('\n✅ Sitemap is accessible!');
    } else {
      console.log('\n❌ Sitemap returned error status');
    }
  });
}).on('error', (err) => {
  console.error('❌ Error:', err.message);
});
