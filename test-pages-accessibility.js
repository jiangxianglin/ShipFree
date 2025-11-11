// 测试所有游戏页面是否可以正常访问
// 运行: node test-pages-accessibility.js

const https = require('https');

const baseUrl = 'https://icebreakergames.site';

const urls = [
  '/',
  '/games',
  '/games/appreciation-circle',
  '/games/common-ground',
  '/games/desert-island-scenario',
  '/games/emoji-introduction',
  '/games/find-your-match',
  '/games/human-bingo',
  '/games/one-word-check-in',
  '/games/scavenger-hunt',
  '/games/show-and-tell',
  '/games/speed-networking',
  '/games/the-name-game',
  '/games/the-question-web',
  '/games/two-truths-and-a-lie',
  '/games/virtual-background-story',
  '/games/would-you-rather',
  '/privacy-policy',
  '/tos',
  '/sitemap.xml',
  '/robots.txt'
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const fullUrl = `${baseUrl}${url}`;
    
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    };
    
    https.get(fullUrl, options, (res) => {
      const { statusCode, headers } = res;
      
      // 如果是重定向，跟踪到最终 URL
      if (statusCode >= 300 && statusCode < 400 && headers.location) {
        const redirectUrl = headers.location;
        
        // 跟踪重定向
        https.get(redirectUrl, (finalRes) => {
          finalRes.resume();
          resolve({
            url: fullUrl,
            statusCode: finalRes.statusCode,
            redirectTo: redirectUrl,
            contentType: finalRes.headers['content-type'],
            success: finalRes.statusCode === 200
          });
        }).on('error', (err) => {
          resolve({
            url: fullUrl,
            statusCode: statusCode,
            redirectTo: redirectUrl,
            error: err.message,
            success: false
          });
        });
      } else {
        // 消费响应数据以释放内存
        res.resume();
        
        resolve({
          url: fullUrl,
          statusCode,
          contentType: headers['content-type'],
          success: statusCode === 200
        });
      }
    }).on('error', (err) => {
      resolve({
        url: fullUrl,
        statusCode: 'ERROR',
        error: err.message,
        success: false
      });
    });
  });
}

async function testAllPages() {
  console.log('🔍 开始测试页面可访问性...\n');
  console.log(`测试基础 URL: ${baseUrl}`);
  console.log(`总共 ${urls.length} 个页面\n`);
  console.log('='.repeat(80));
  
  const results = [];
  
  for (const url of urls) {
    const result = await checkUrl(url);
    results.push(result);
    
    const status = result.success ? '✅' : '❌';
    const statusCode = result.statusCode;
    
    console.log(`${status} [${statusCode}] ${result.url}`);
    
    if (result.redirectTo) {
      console.log(`   ↪️  重定向到: ${result.redirectTo}`);
    }
    
    if (!result.success && result.error) {
      console.log(`   错误: ${result.error}`);
    }
    
    // 避免请求过快
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('\n📊 测试总结:');
  
  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  
  console.log(`✅ 成功: ${successCount}/${urls.length}`);
  console.log(`❌ 失败: ${failCount}/${urls.length}`);
  
  if (failCount > 0) {
    console.log('\n⚠️  失败的页面:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.url} [${r.statusCode}]`);
    });
  }
  
  console.log('\n💡 建议:');
  console.log('1. 确保所有页面返回 200 状态码');
  console.log('2. 检查 sitemap.xml 是否包含所有游戏页面');
  console.log('3. 验证 robots.txt 没有阻止重要页面');
  console.log('4. 在 Google Search Console 中手动请求索引失败的页面');
}

testAllPages().catch(console.error);
