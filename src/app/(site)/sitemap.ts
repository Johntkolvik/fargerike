import type { MetadataRoute } from "next";
import colorsData from "../../../data/colors.json";
import type { Color } from "@/lib/color/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fargerike.vercel.app";
const colors = colorsData as Color[];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // TODO: Fetch product/article/store slugs from Sanity using SITEMAP_QUERY

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/butikker`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/farge`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/farge/velger`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/farge/fargekart`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/farge/ncs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const colorRoutes: MetadataRoute.Sitemap = colors.map((color) => ({
    url: `${BASE_URL}/farge/${color.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...colorRoutes];
}
