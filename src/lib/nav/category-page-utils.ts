import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { CATEGORY_PAGE_QUERY } from "@/lib/sanity/queries";
import { SECTION_META, getSegmentLabel } from "./section-labels";

type SanityResult = {
  category: { title: string; description?: string; imageUrl?: string } | null;
  contentCluster: {
    title: string;
    description?: string;
    imageUrl?: string;
  } | null;
  articles: Array<{
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    articleType?: string;
    imageUrl?: string;
  }>;
  subcategories: Array<{
    _id: string;
    title: string;
    slug: string;
    imageUrl?: string;
  }>;
};

export type CategoryPageData = {
  title: string;
  description?: string;
  imageUrl?: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  articles: SanityResult["articles"];
  subcategories: SanityResult["subcategories"];
  subcategoryBaseHref: string;
  section: string;
  segments: string[];
};

/**
 * Fetches category data from Sanity and builds the page props
 * for a catch-all route under a given section.
 */
export async function getCategoryPageData(
  section: string,
  segments: string[]
): Promise<CategoryPageData> {
  const slug = segments[segments.length - 1];
  const sectionMeta = SECTION_META[section];

  // Try fetching from Sanity
  let sanityData: SanityResult | null = null;
  try {
    sanityData = await client.fetch(CATEGORY_PAGE_QUERY, { slug });
  } catch (error) {
    console.error(`Failed to fetch category page for ${slug}:`, error);
  }

  const source = sanityData?.category || sanityData?.contentCluster;

  const title = source?.title || getSegmentLabel(slug);
  const description = source?.description;
  const imageUrl = source?.imageUrl;

  // Build breadcrumbs
  const breadcrumbs: Array<{ label: string; href?: string }> = [
    { label: "Hjem", href: "/" },
    { label: sectionMeta?.title || getSegmentLabel(section), href: `/${section}` },
  ];

  let hrefAccum = `/${section}`;
  for (let i = 0; i < segments.length - 1; i++) {
    hrefAccum += `/${segments[i]}`;
    breadcrumbs.push({
      label: getSegmentLabel(segments[i]),
      href: hrefAccum,
    });
  }
  breadcrumbs.push({ label: title });

  const subcategoryBaseHref = `/${section}/${segments.join("/")}`;

  return {
    title,
    description,
    imageUrl,
    breadcrumbs,
    articles: sanityData?.articles || [],
    subcategories: sanityData?.subcategories || [],
    subcategoryBaseHref,
    section,
    segments,
  };
}

/**
 * Generates metadata for a catch-all category page.
 */
export async function getCategoryMetadata(
  section: string,
  segments: string[]
): Promise<Metadata> {
  const slug = segments[segments.length - 1];

  let title: string | null = null;
  let description: string | null = null;
  try {
    const data: SanityResult = await client.fetch(CATEGORY_PAGE_QUERY, {
      slug,
    });
    const source = data?.category || data?.contentCluster;
    if (source) {
      title = source.title;
      description = source.description || null;
    }
  } catch {
    // fall through to fallback
  }

  const sectionMeta = SECTION_META[section];
  const fallbackTitle = getSegmentLabel(slug);

  return {
    title: `${title || fallbackTitle} | ${sectionMeta?.title || getSegmentLabel(section)} | Fargerike`,
    description:
      description ||
      `Utforsk ${(title || fallbackTitle).toLowerCase()} hos Fargerike. Stort utvalg, fagkunnskap og 89 butikker.`,
  };
}

/**
 * Generates metadata for a hub (top-level section) page.
 */
export function getHubMetadata(section: string): Metadata {
  const meta = SECTION_META[section];
  return {
    title: `${meta?.title || getSegmentLabel(section)} | Fargerike`,
    description:
      meta?.description ||
      `Utforsk ${(meta?.title || section).toLowerCase()} hos Fargerike.`,
  };
}

/**
 * Fetches hub page data for a top-level section.
 */
export async function getHubPageData(section: string): Promise<CategoryPageData> {
  const sectionMeta = SECTION_META[section];

  let sanityData: SanityResult | null = null;
  try {
    sanityData = await client.fetch(CATEGORY_PAGE_QUERY, { slug: section });
  } catch (error) {
    console.error(`Failed to fetch hub page for ${section}:`, error);
  }

  const source = sanityData?.category || sanityData?.contentCluster;

  return {
    title: source?.title || sectionMeta?.title || getSegmentLabel(section),
    description: source?.description || sectionMeta?.description,
    imageUrl: source?.imageUrl,
    breadcrumbs: [
      { label: "Hjem", href: "/" },
      { label: sectionMeta?.title || getSegmentLabel(section) },
    ],
    articles: sanityData?.articles || [],
    subcategories: sanityData?.subcategories || [],
    subcategoryBaseHref: `/${section}`,
    section,
    segments: [],
  };
}
