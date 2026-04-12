import type { MetadataRoute } from "next";
import colorsData from "../../../data/colors.json";
import familiesData from "../../../data/families.json";
import type { Color } from "@/lib/color/types";
import { client } from "@/lib/sanity/client";
import { SITEMAP_QUERY } from "@/lib/sanity/queries";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fargerike.vercel.app";
const colors = colorsData as Color[];

interface SitemapEntry {
  slug: string;
  _updatedAt?: string;
}

interface FamilyEntry {
  familyCode: string;
  [key: string]: unknown;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* ---------- Fetch dynamic slugs from Sanity ---------- */
  let sanityData: {
    articles?: SitemapEntry[];
    products?: SitemapEntry[];
    stores?: SitemapEntry[];
    categories?: SitemapEntry[];
    services?: SitemapEntry[];
  } = {};

  try {
    sanityData = await client.fetch(SITEMAP_QUERY);
  } catch (error) {
    console.error("Sitemap: Failed to fetch from Sanity, using fallback data only:", error);
  }

  const articles = sanityData?.articles ?? [];
  const sanityProducts = sanityData?.products ?? [];
  const stores = sanityData?.stores ?? [];
  const categories = sanityData?.categories ?? [];
  const services = sanityData?.services ?? [];

  /* ---------- Static routes ---------- */
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/butikker`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/farge`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/farge/velger`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/farge/fargekart`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/farge/ncs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  /* ---------- Color routes (from colors.json) ---------- */
  const colorRoutes: MetadataRoute.Sitemap = colors.map((color) => ({
    url: `${BASE_URL}/farge/${color.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  /* ---------- Article routes (from Sanity) ---------- */
  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((a) => a.slug)
    .map((a) => ({
      url: `${BASE_URL}/artikkel/${a.slug}`,
      lastModified: a._updatedAt ? new Date(a._updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  /* ---------- Product routes (from Sanity) ---------- */
  const productRoutes: MetadataRoute.Sitemap = sanityProducts
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${BASE_URL}/produkt/${p.slug}`,
      lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  /* ---------- Product family routes (from families.json) ---------- */
  const families = familiesData as FamilyEntry[];
  const familySlugs = new Set(sanityProducts.map((p) => p.slug));
  const familyRoutes: MetadataRoute.Sitemap = families
    .filter((f) => !familySlugs.has(f.familyCode))
    .map((f) => ({
      url: `${BASE_URL}/produkt/${f.familyCode}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  /* ---------- Store routes (from Sanity) ---------- */
  const storeRoutes: MetadataRoute.Sitemap = stores
    .filter((s) => s.slug)
    .map((s) => ({
      url: `${BASE_URL}/butikker/${s.slug}`,
      lastModified: s._updatedAt ? new Date(s._updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  /* ---------- Category routes (from Sanity) ---------- */
  const categoryRoutes: MetadataRoute.Sitemap = categories
    .filter((c) => c.slug)
    .map((c) => ({
      url: `${BASE_URL}/kategori/${c.slug}`,
      lastModified: c._updatedAt ? new Date(c._updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  /* ---------- Service routes (from Sanity) ---------- */
  const serviceRoutes: MetadataRoute.Sitemap = services
    .filter((s) => s.slug)
    .map((s) => ({
      url: `${BASE_URL}/tjeneste/${s.slug}`,
      lastModified: s._updatedAt ? new Date(s._updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  return [
    ...staticRoutes,
    ...colorRoutes,
    ...articleRoutes,
    ...productRoutes,
    ...familyRoutes,
    ...storeRoutes,
    ...categoryRoutes,
    ...serviceRoutes,
  ];
}
