import { MetadataRoute } from 'next';
import { db } from '@/db';
import { gamesTable } from '@/db/schema';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://icebreakergames.site';

  try {
    // Get all games from database
    const games = await db
      .select({
        slug: gamesTable.slug,
        updatedAt: gamesTable.updatedAt
      })
      .from(gamesTable);

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
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

    // Game detail pages
    const gamePages: MetadataRoute.Sitemap = games.map((game) => ({
      url: `${baseUrl}/games/${game.slug}`,
      lastModified: game.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...staticPages, ...gamePages];
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return basic sitemap on error
    return [
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
    ];
  }
}
