import { MetadataRoute } from "next";
import { db } from "@/db";
import { gamesTable } from "@/db/schema";
import { blogPosts } from "@/data/blog";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.icebreakergames.site";
  const articleLastModified = new Date("2026-05-05");
  const highPriorityBlogSlugs = new Set([
    "ice-breaker-games-for-adults",
    "icebreaker-games-for-students",
    "human-bingo-for-students-printable",
  ]);

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
        url: `${baseUrl}/best-icebreaker-games`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/icebreaker-games-for-work`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/virtual-icebreaker-games`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/icebreaker-games-for-meetings`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/emoji-icebreaker-games`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/name-game-icebreakers`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/games-like-human-bingo`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/games-like-the-human-knot`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/icebreaker-games-for-youth-group`,
        lastModified: new Date(),
        changeFrequency: "weekly",
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
      lastModified: highPriorityBlogSlugs.has(post.slug) ? articleLastModified : new Date(post.date),
      changeFrequency: highPriorityBlogSlugs.has(post.slug) ? "weekly" as const : "monthly" as const,
      priority: highPriorityBlogSlugs.has(post.slug) ? 0.9 : 0.8,
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
      {
        url: `${baseUrl}/blog/icebreaker-games-for-students`,
        lastModified: articleLastModified,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog/human-bingo-for-students-printable`,
        lastModified: articleLastModified,
        changeFrequency: "weekly",
        priority: 0.9,
      },
    ];
  }
}
