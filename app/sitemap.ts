import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/work/ultraweb`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work/hardmode`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
