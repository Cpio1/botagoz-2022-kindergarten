import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/** Emitted only once the real domain is configured (NEXT_PUBLIC_SITE_URL). */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.siteUrl) return [];
  return [
    { url: site.siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${site.siteUrl}/about`, changeFrequency: "yearly", priority: 0.7 },
  ];
}
