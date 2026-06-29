import { NextConfig } from "next";

const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  pageExtensions: ["ts", "tsx", "mdx"],
  serverExternalPackages: ['enamdict'],
  async redirects() {
    return [
      {
        source: "/games/two-truths-and-one-lie",
        destination: "/games/two-truths-and-a-lie",
        permanent: true,
      },
      {
        source: "/games/name-game",
        destination: "/games/the-name-game",
        permanent: true,
      },
      {
        source: "/icebreaker-games-for-adults",
        destination: "/blog/ice-breaker-games-for-adults",
        permanent: true,
      },
      {
        source: "/icebreaker-games-for-students",
        destination: "/blog/icebreaker-games-for-students",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      // 为静态资源添加缓存和 noindex 头部
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      // 字体文件
      {
        source: "/:path*.woff",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/:path*.woff2",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/:path*.ttf",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/:path*.eot",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
} satisfies NextConfig;

export default nextConfig;
