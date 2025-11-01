import { MetadataRoute } from 'next';
import { db } from '@/db';
import { gamesTable } from '@/db/schema';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://icebreakergames.site';
  
  // 静态页面
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/games`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
  
  try {
    // 获取所有游戏
    const games = await db
      .select({ 
        id: gamesTable.id, 
        updatedAt: gamesTable.updatedAt 
      })
      .from(gamesTable);
    
    // 生成游戏页面的 sitemap 条目
    const gameUrls: MetadataRoute.Sitemap = games.map((game) => ({
      url: `${baseUrl}/games/${game.id}`,
      lastModified: game.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
    
    return [...staticUrls, ...gameUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // 如果数据库查询失败，至少返回静态页面
    return staticUrls;
  }
}
