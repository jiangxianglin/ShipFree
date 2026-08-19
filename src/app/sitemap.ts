import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { blogPosts } from "@/data/blog";
import { GAME_SLUGS } from "@/data/game-slugs";

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

  const paths: Array<{
    path: string;
    changeFrequency: "weekly" | "daily" | "monthly";
    priority: number;
    lastModified?: Date;
  }> = [
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
    { path: "/games-like-two-truths-and-a-lie", changeFrequency: weekly, priority: 0.9 },
    { path: "/icebreaker-games-for-youth-group", changeFrequency: weekly, priority: 0.9 },
    { path: "/riddle-icebreakers-for-virtual-meetings", changeFrequency: weekly, priority: 0.9 },
    { path: "/short-virtual-icebreakers", changeFrequency: weekly, priority: 0.9 },
    { path: "/icebreaker-games-for-teens", changeFrequency: weekly, priority: 0.9 },
    { path: "/icebreakers-for-teens", changeFrequency: weekly, priority: 0.9 },
    { path: "/icebreaker-games-for-high-school-students", changeFrequency: weekly, priority: 0.9 },
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

/**
 * Soft-fetch live game slugs from Supabase (same source as game pages).
 * Never throws — returns empty map on any failure so static fallback still ships.
 */
async function fetchLiveGameMeta(): Promise<Map<string, Date>> {
  const meta = new Map<string, Date>();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return meta;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });

    const { data, error } = await supabase
      .from("games")
      .select("slug, updated_at");

    if (error || !data) {
      console.error("Sitemap: Supabase games query failed; using static GAME_SLUGS.", error);
      return meta;
    }

    for (const row of data) {
      if (!row?.slug || typeof row.slug !== "string") continue;
      const updated = row.updated_at ? new Date(row.updated_at) : new Date();
      meta.set(row.slug, Number.isNaN(updated.getTime()) ? new Date() : updated);
    }
  } catch (error) {
    console.error("Sitemap: Supabase unavailable; using static GAME_SLUGS.", error);
  }

  return meta;
}

/**
 * Always emit /games/* detail URLs.
 * Static GAME_SLUGS is the safety net; Supabase adds newer slugs + lastmod when available.
 */
async function getGamePages(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const live = await fetchLiveGameMeta();
  const slugs = new Set<string>([...GAME_SLUGS, ...live.keys()]);

  return [...slugs]
    .sort()
    .map((slug) => ({
      url: `${baseUrl}/games/${slug}`,
      lastModified: live.get(slug) ?? now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [staticPages, blogPages, gamePages] = await Promise.all([
    Promise.resolve(getStaticPages()),
    Promise.resolve(getBlogPages()),
    getGamePages(),
  ]);

  return [...staticPages, ...gamePages, ...blogPages];
}
