import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/auth/',
        '/dashboard/', 
        '/api/',
        '/_next/static/',  // 排除 Next.js 静态文件
        '/favicon.ico',    // 排除 favicon
        '*.woff',          // 排除字体文件
        '*.woff2',
        '*.ttf',
        '*.eot'
      ],
    },
    sitemap: 'https://www.icebreakergames.site/sitemap.xml',
  }
}