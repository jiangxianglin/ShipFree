import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/auth/",
          "/dashboard/",
          "/api/",
        ],
      },
      {
        // AI / crawler disallow rule: prevents AI bots from indexing without permission
        // while still allowing major search engines (Google, Bing, DuckDuckGo)
        userAgent: "Bytespider",
        disallow: "/",
      },
      {
        userAgent: "ClaudeBot",
        disallow: "/",
      },
      {
        // Training crawler — blocked. ChatGPT-User (answer-fetch) is allowed via * rule.
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "Imguru",
        disallow: "/",
      },
      {
        userAgent: "Diffbot",
        disallow: "/",
      },
    ],
    sitemap: "https://www.icebreakergames.site/sitemap.xml",
    host: "https://www.icebreakergames.site",
  };
}
