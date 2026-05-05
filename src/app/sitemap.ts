import { MetadataRoute } from "next";
import { db } from "@/db";
import { gamesTable } from "@/db/schema";
import { blogPosts } from "@/data/blog";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.icebreakergames.site";
  const articleLastModified = new Date("2026-05-05");

  try {
    const games = await db
      .select({
        slug: gamesTable.slug,
        updatedAt: gamesTable.updatedAt,
      })
      .from(gamesTable);

    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/games`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: articleLastModified,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${baseUrl}/tos`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
    ];

    const gamePages: MetadataRoute.Sitemap = games.map((game) => ({
      url: `${baseUrl}/games/${game.slug}`,
      lastModified: game.updatedAt || new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));

    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.slug === "ice-breaker-games-for-adults" ? articleLastModified : new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: post.slug === "ice-breaker-games-for-adults" ? 0.9 : 0.8,
    }));

    return [...staticPages, ...gamePages, ...blogPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/games`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/games/virtual-background-story`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/games/human-bingo`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: articleLastModified,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog/ice-breaker-games-for-adults`,
        lastModified: articleLastModified,
        changeFrequency: "monthly",
        priority: 0.9,
      },
    ];
  }
}
