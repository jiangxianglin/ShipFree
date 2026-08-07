import { MetadataRoute } from "next";
import { db } from "@/db";
import { gamesTable } from "@/db/schema";
import { blogPosts } from "@/data/blog";

export const dynamic = "force-static";
export const revalidate = 3600;

const baseUrl = "https://www.icebreakergames.site";
const articleLastModified = new Date("2026-05-05");
const highPriorityBlogSlugs = new Set([
  "ice-breaker-games-for-adults",
  "icebreaker-games-for-students",
  "human-bingo-for-students-printable",
]);

/** Always-on SEO URLs — must never depend on DB success. */
function getStaticPages(): MetadataRoute.Sitemap {
  const now = new Date();
  const weekly = "weekly" as const;
  const daily = "daily" as const;
  const monthly = "monthly" as const;

  const paths: Array<{ path: string; changeFrequency: "weekly" | "daily" | "monthly"; priority: number; lastModified?: Date }> = [
    { path: "", changeFrequency: weekly, priority: 1.0 },
    { path: "/games", changeFrequency: daily, priority: 0.9 },
    { path: "/best-icebreaker-games", changeFrequency: weekly, priority: 0.9 },
    { path: "/icebreaker-games-for-work", changeFrequency: weekly, priority: 0.9 },
    { path: "/virtual-icebreaker-games", changeFrequency: weekly, priority: 0.9 },
    { path: "/icebreaker-games-for-meetings", changeFrequency: weekly, priority: 0.9 },
    { path: "/funny-icebreaker-games-for-meetings", changeFrequency: weekly, priority: 0.9 },
    { path: "/emoji-icebreaker-games", changeFrequency: weekly, priority: 0.9 },
    { path: "/name-game-icebreakers", changeFrequency: weekly, priority: 0.9 },
    { path: "/games-like-human-bingo", changeFrequency: weekly, priority: 0.9 },
    { path: "/games-like-the-human-knot", changeFrequency: weekly, priority: 0.9 },
    { path: "/icebreaker-games-for-youth-group", changeFrequency: weekly, priority: 0.9 },
    { path: "/riddle-icebreakers-for-virtual-meetings", changeFrequency: weekly, priority: 0.9 },
    { path: "/short-virtual-icebreakers", changeFrequency: weekly, priority: 0.9 },
    { path: "/icebreaker-games-for-teens", changeFrequency: weekly, priority: 0.9 },
    { path: "/icebreaker-games-for-small-groups", changeFrequency: weekly, priority: 0.9 },
    { path: "/about", changeFrequency: monthly, priority: 0.6 },
    { path: "/contact", changeFrequency: monthly, priority: 0.6 },
    { path: "/blog", changeFrequency: weekly, priority: 0.9, lastModified: articleLastModified },
    { path: "/privacy-policy", changeFrequency: monthly, priority: 0.5 },
    { path: "/tos", changeFrequency: monthly, priority: 0.5 },
  ];

  return paths.map(({ path, changeFrequency, priority, lastModified }) => ({
    url: `${baseUrl}${path}`,
    lastModified: lastModified ?? now,
    changeFrequency,
    priority,
  }));
}

function getBlogPages(): MetadataRoute.Sitemap {
  return blogPosts.map((post) => {
    const high = highPriorityBlogSlugs.has(post.slug);
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: high ? articleLastModified : new Date(post.date),
      changeFrequency: (high ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: high ? 0.9 : 0.8,
    };
  });
}

async function getGamePages(): Promise<MetadataRoute.Sitemap> {
  try {
    const games = await db
      .select({
        slug: gamesTable.slug,
        updatedAt: gamesTable.updatedAt,
      })
      .from(gamesTable);

    return games.map((game) => ({
      url: `${baseUrl}/games/${game.slug}`,
      lastModified: game.updatedAt || new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));
  } catch (error) {
    console.error("Sitemap: failed to load games from DB; continuing with static + blog URLs.", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [staticPages, blogPages, gamePages] = await Promise.all([
    Promise.resolve(getStaticPages()),
    Promise.resolve(getBlogPages()),
    getGamePages(),
  ]);

  return [...staticPages, ...gamePages, ...blogPages];
}
