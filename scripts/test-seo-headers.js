// 测试 SEO 头部配置的脚本
// 运行: node scripts/test-seo-headers.js

const https = require('https');
const http = require('http');

function testUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      console.log(`\n🔍 Testing: ${url}`);
      console.log(`Status: ${res.statusCode}`);
      
      // 检查相关的 SEO 头部
      const headers = res.headers;
      
      if (headers['x-robots-tag']) {
        console.log(`✅ X-Robots-Tag: ${headers['x-robots-tag']}`);
      } else {
        console.log(`ℹ️  No X-Robots-Tag header`);
      }
      
      if (headers['cache-control']) {
        console.log(`📦 Cache-Control: ${headers['cache-control']}`);
      }
      
      resolve({
        url,
        status: res.statusCode,
        robotsTag: headers['x-robots-tag'],
        cacheControl: headers['cache-control']
      });
    }).on('error', reject);
  });
}

async function testSeoHeaders() {
  console.log('🧪 Testing SEO Headers Configuration');
  console.log('=' .repeat(50));
  
  const testUrls = [
    'https://www.icebreakergames.site/',
    'https://www.icebreakergames.site/games',
    'https://www.icebreakergames.site/games/human-bingo',
    'https://www.icebreakergames.site/favicon.ico',
    'https://www.icebreakergames.site/robots.txt',
    'https://www.icebreakergames.site/sitemap.xml'
  ];
  
  try {
    for (const url of testUrls) {
      await testUrl(url);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒延迟
    }
    
    console.log('\n📋 Summary:');
    console.log('- Main pages should NOT have X-Robots-Tag (allowing indexing)');
    console.log('- favicon.ico should have X-Robots-Tag: noindex, nofollow');
    console.log('- Static files should have long cache-control headers');
    
  } catch (error) {
    console.error('❌ Error testing headers:', error.message);
  }
}

testSeoHeaders();