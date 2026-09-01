import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// AI-crawler policy (logged in design/SEO.md): TRAINING crawlers disallowed —
// UrhG §44b machine-readable Nutzungsvorbehalt; silence would read as consent.
// Live answer-engine fetchers stay allowed, so the site remains citable.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "Google-Extended",
          "CCBot",
          "Bytespider",
          "Applebot-Extended",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
