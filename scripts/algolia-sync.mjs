/**
 * Sync local data + Sanity articles to Algolia indexes.
 *
 * Pushes to 3 indexes:
 *   - fargerike_products  (from data/families.json)
 *   - fargerike_articles  (from Sanity CMS)
 *   - fargerike_colors    (from data/colors.json)
 *
 * Usage: node scripts/algolia-sync.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { algoliasearch } from "algoliasearch";
import { createClient } from "@sanity/client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// 1. Load .env.local
// ---------------------------------------------------------------------------
function loadEnv() {
  const envPath = resolve(projectRoot, ".env.local");
  const envContent = readFileSync(envPath, "utf-8");
  const vars = {};
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    vars[key] = value;
  }
  return vars;
}

const env = loadEnv();

const ALGOLIA_APP_ID = env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const ALGOLIA_ADMIN_KEY = env.ALGOLIA_ADMIN_API_KEY;
if (!ALGOLIA_APP_ID || !ALGOLIA_ADMIN_KEY) {
  console.error("Missing Algolia credentials in .env.local");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Clients
// ---------------------------------------------------------------------------
const algolia = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);

const sanity = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mp884evv",
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-25",
  token: env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

// ---------------------------------------------------------------------------
// 3. Helper: slugify
// ---------------------------------------------------------------------------
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[æ]/g, "ae")
    .replace(/[ø]/g, "o")
    .replace(/[å]/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------------------------------------------------------------------------
// 4. Build product records from families.json
// ---------------------------------------------------------------------------
function buildProductRecords() {
  const familiesPath = resolve(projectRoot, "data/families.json");
  const families = JSON.parse(readFileSync(familiesPath, "utf-8"));

  return families.map((f) => {
    // Lowest price across all size variants
    const priceFrom = f.products?.length
      ? Math.min(...f.products.map((p) => p.priceNOK))
      : null;

    // Derive search terms from section, finish, description keywords
    const searchTerms = [
      f.section?.replace(/-/g, " "),
      f.finishName?.toLowerCase(),
      f.applicationArea?.toLowerCase() === "interior"
        ? "veggmaling"
        : "utendorsmaling",
      ...(f.specs?.washClass ? [f.specs.washClass.toLowerCase()] : []),
    ].filter(Boolean);

    return {
      objectID: `family-${f.familyCode}`,
      type: "productFamily",
      name: f.name,
      familyCode: f.familyCode,
      brand: "Jotun",
      applicationArea: f.applicationArea,
      finishName: f.finishName,
      shortName: f.shortName,
      description: f.description,
      badge: f.badge || null,
      priceFrom,
      slug: slugify(f.name),
      searchTerms,
    };
  });
}

// ---------------------------------------------------------------------------
// 5. Fetch article records from Sanity
// ---------------------------------------------------------------------------
async function fetchArticleRecords() {
  const query = `*[_type == "article"]{
    _id,
    title,
    "slug": slug.current,
    articleType,
    excerpt,
    readingTime,
    difficulty,
    room,
    "imageUrl": mainImage.asset->url,
    publishedAt
  }`;

  const articles = await sanity.fetch(query);

  return articles.map((a) => ({
    objectID: a._id,
    type: "article",
    title: a.title,
    slug: a.slug,
    articleType: a.articleType,
    excerpt: a.excerpt || "",
    readingTime: a.readingTime || null,
    difficulty: a.difficulty || null,
    room: a.room || [],
    imageUrl: a.imageUrl || null,
    publishedAt: a.publishedAt || null,
  }));
}

// ---------------------------------------------------------------------------
// 6. Build color records from colors.json
// ---------------------------------------------------------------------------
function buildColorRecords() {
  const colorsPath = resolve(projectRoot, "data/colors.json");
  const colors = JSON.parse(readFileSync(colorsPath, "utf-8"));

  return colors.map((c) => ({
    objectID: c.id,
    type: "color",
    name: c.name,
    ncs: c.ncs,
    hex: c.hex,
    application: c.application,
    tags: c.tags || [],
    luminance: c.luminance,
  }));
}

// ---------------------------------------------------------------------------
// 7. Sync one index: clear + push records + configure settings
// ---------------------------------------------------------------------------
async function syncIndex(indexName, records, settings) {
  console.log(`\n--- ${indexName} ---`);
  console.log(`  Records to push: ${records.length}`);

  if (records.length === 0) {
    console.log("  No records — skipping.");
    return;
  }

  // Replace all objects (atomic: pushes new records, then swaps)
  console.log("  Replacing all objects...");
  await algolia.replaceAllObjects({
    indexName,
    objects: records,
  });
  console.log("  Objects replaced.");

  // Configure index settings
  console.log("  Configuring settings...");
  await algolia.setSettings({
    indexName,
    indexSettings: settings,
  });
  console.log("  Settings applied.");
}

// ---------------------------------------------------------------------------
// 8. Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("=== Algolia Sync ===");
  console.log(`App ID: ${ALGOLIA_APP_ID}`);

  // Build all record sets
  const productRecords = buildProductRecords();
  const articleRecords = await fetchArticleRecords();
  const colorRecords = buildColorRecords();

  // Sync: fargerike_products
  await syncIndex("fargerike_products", productRecords, {
    searchableAttributes: [
      "name",
      "shortName",
      "description",
      "brand",
      "searchTerms",
    ],
    attributesForFaceting: ["applicationArea", "brand", "badge"],
  });

  // Sync: fargerike_articles
  await syncIndex("fargerike_articles", articleRecords, {
    searchableAttributes: ["title", "excerpt", "articleType"],
    attributesForFaceting: ["articleType", "room", "difficulty"],
  });

  // Sync: fargerike_colors
  await syncIndex("fargerike_colors", colorRecords, {
    searchableAttributes: ["name", "ncs", "hex"],
    attributesForFaceting: ["application", "tags"],
  });

  console.log("\n=== Sync complete ===");
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
