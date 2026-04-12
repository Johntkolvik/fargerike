/**
 * Upload category images from fargerike.no to Sanity CMS for homepage categoryEntries.
 *
 * Usage: node scripts/upload-category-images.mjs
 *
 * Reads SANITY_API_WRITE_TOKEN from .env.local, downloads category-relevant
 * images from fargerike.no, uploads them to Sanity, and patches the homePage
 * document's categoryEntries with image references.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// 1. Read .env.local
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
const WRITE_TOKEN = env.SANITY_API_WRITE_TOKEN;
if (!WRITE_TOKEN) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Sanity client
// ---------------------------------------------------------------------------
const client = createClient({
  projectId: "mp884evv",
  dataset: "production",
  apiVersion: "2026-03-25",
  token: WRITE_TOKEN,
  useCdn: false,
});

// ---------------------------------------------------------------------------
// 3. Category image mapping
//    Each entry maps to a categoryEntry in the homePage document by title.
//    Images sourced from fargerike.no category landing pages.
// ---------------------------------------------------------------------------
const CATEGORY_IMAGES = [
  {
    title: "Farger",
    url: "https://www.fargerike.no/contentassets/2a21c38e20564b91aa7402b1f1a8495f/bla_ny.jpg",
    filename: "category-farger.jpg",
  },
  {
    title: "Maling",
    url: "https://www.fargerike.no/contentassets/4fde6e064a824a6a9965efad56aac853/velg-riktig-husmaling.jpg",
    filename: "category-maling.jpg",
  },
  {
    title: "Tapet & Gulv",
    url: "https://www.fargerike.no/globalassets/inriver/resources/7689_dahliagarden_closeup.png",
    filename: "category-tapet-gulv.png",
  },
  {
    title: "Solskjerming",
    url: "https://www.fargerike.no/contentassets/3fe7a0c5590e4c58ac52090ed2355ef6/duette-solskjerming-fargerike.jpg",
    filename: "category-solskjerming.jpg",
  },
  {
    title: "Inspirasjon",
    url: "https://www.fargerike.no/contentassets/d0ac15040a574a9cb697ee4a55865f0b/blatt_kjokken.jpg",
    filename: "category-inspirasjon.jpg",
  },
  {
    title: "Tips & råd",
    url: "https://www.fargerike.no/contentassets/91c8752ac7f54b95b25bb55532332e21/male-vegg-malere-teaser.jpg",
    filename: "category-tips-og-raad.jpg",
  },
];

// ---------------------------------------------------------------------------
// 4. Helpers
// ---------------------------------------------------------------------------

async function downloadImage(url) {
  console.log(`  Downloading: ${url}`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function uploadToSanity(buffer, filename) {
  console.log(`  Uploading to Sanity as "${filename}"...`);
  const asset = await client.assets.upload("image", buffer, { filename });
  console.log(`  Asset created: ${asset._id}`);
  return asset;
}

// ---------------------------------------------------------------------------
// 5. Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("=== Fargerike Category Image Upload ===\n");

  // Step 1: Fetch the homePage document to get categoryEntries with _key values
  console.log("Fetching homePage document...");
  const homePage = await client.fetch(
    `*[_type == "homePage"][0]{
      _id,
      categoryEntries[] { _key, title, description, image, link }
    }`
  );

  if (!homePage) {
    console.error("No homePage document found in Sanity!");
    process.exit(1);
  }

  console.log(`Found homePage: ${homePage._id}`);
  console.log(`Category entries: ${homePage.categoryEntries?.length || 0}\n`);

  if (!homePage.categoryEntries?.length) {
    console.error("No categoryEntries found on homePage document!");
    process.exit(1);
  }

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  // Step 2: For each category image, upload and patch
  for (const catImage of CATEGORY_IMAGES) {
    console.log(`\n[Category] ${catImage.title}`);

    // Find the matching entry in Sanity by title
    const entryIndex = homePage.categoryEntries.findIndex(
      (e) => e.title === catImage.title
    );

    if (entryIndex === -1) {
      console.log(`  SKIP: No matching categoryEntry with title "${catImage.title}"`);
      skipCount++;
      continue;
    }

    const entry = homePage.categoryEntries[entryIndex];

    // Check if image already exists
    if (entry.image?.asset) {
      console.log(`  SKIP: Already has an image`);
      skipCount++;
      continue;
    }

    try {
      const buffer = await downloadImage(catImage.url);
      const asset = await uploadToSanity(buffer, catImage.filename);

      // Patch the specific array item using _key
      await client
        .patch(homePage._id)
        .set({
          [`categoryEntries[_key=="${entry._key}"].image`]: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: asset._id,
            },
          },
        })
        .commit();

      console.log(`  Patched categoryEntries[${entryIndex}] (key: ${entry._key}) with image`);
      successCount++;
      console.log(`  Done!`);
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
      errorCount++;
    }
  }

  // Step 3: Clean up any draft to ensure published version is live
  console.log("\nChecking for draft...");
  const draftId = `drafts.${homePage._id}`;
  try {
    const draft = await client.getDocument(draftId);
    if (draft) {
      console.log("  Found draft version, removing to publish...");
      await client.delete(draftId);
      console.log("  Draft removed (published version is live)");
    } else {
      console.log("  No draft found (published version is already live)");
    }
  } catch {
    console.log("  No draft to clean up");
  }

  // Summary
  console.log(`\n=== Summary ===`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Skipped: ${skipCount}`);
  console.log(`  Errors:  ${errorCount}`);
  console.log(`  Total:   ${CATEGORY_IMAGES.length}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
