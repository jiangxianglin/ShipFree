import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/auth/",
        "/dashboard/",
        "/api/",
      ],
    },
    sitemap: "https://www.icebreakergames.site/sitemap.xml",
    host: "https://www.icebreakergames.site",
  };
}
