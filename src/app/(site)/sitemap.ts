import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fargerike.no";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // TODO: Fetch all slugs from Sanity using SITEMAP_QUERY
  // For now, return static routes
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/butikker`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/sok`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
  ];
}
