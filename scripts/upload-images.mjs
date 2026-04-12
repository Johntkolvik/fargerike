/**
 * Upload images from fargerike.no to Sanity CMS for articles.
 *
 * Usage: node scripts/upload-images.mjs
 *
 * Reads SANITY_API_WRITE_TOKEN from .env.local and uploads images
 * for articles that need a mainImage, plus the homepage hero.
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
// 3. Image mapping: articleId -> image URL from fargerike.no
// ---------------------------------------------------------------------------
const ARTICLE_IMAGES = [
  {
    id: "315b6bd1-26f5-476b-a74c-f75444e48da2",
    title: "Beise terrassen",
    url: "https://www.fargerike.no/contentassets/75f3a5554c76402aae2a2d0793930d99/beise_terrasse_jotun.jpg",
    filename: "beise-terrasse.jpg",
  },
  {
    id: "70dbf0a1-7220-4331-a9c3-1a38574bec08",
    title: "Nordisk stue",
    url: "https://www.fargerike.no/contentassets/8bd4f85329814561b6b9d5bdc93d03e1/farger-til-stue-inspirasjon-1.jpg",
    filename: "nordisk-stue.jpg",
  },
  {
    id: "16c53161-f751-4e31-b744-835c3704ed7b",
    title: "Vaarens farger 2026",
    url: "https://www.fargerike.no/contentassets/6848cd1d35904c959706e8371e3f9674/havperle_tease-3.jpg",
    filename: "vaarens-farger-2026.jpg",
  },
  {
    id: "527e16c2-50bc-4001-8cd1-7e5db61fc582",
    title: "Male huset utvendig",
    url: "https://www.fargerike.no/contentassets/c7df16d544ff4ea5bfc167b4a17aa778/hvordan-male-hus.jpg",
    filename: "male-hus-utvendig.jpg",
  },
  {
    id: "61c332b2-de0f-4cca-b944-019c2aa57b64",
    title: "Velge farge soverom",
    url: "https://www.fargerike.no/contentassets/1814a1ccf29c4e18aae1fabae5134cc4/farger-til-soverom-inspirasjon.jpg",
    filename: "farge-soverom.jpg",
  },
  {
    id: "68fa157d-a988-491e-9e3e-c8701f61d95f",
    title: "Industriell varme",
    url: "https://www.fargerike.no/contentassets/f9dda12acf914213b630e7d821167653/manedes-stil-2.jpg",
    filename: "industriell-varme.jpg",
  },
  {
    id: "0eb6451c-4c03-48c5-953a-6a5f7136a8e7",
    title: "Male vegg",
    url: "https://www.fargerike.no/contentassets/91c8752ac7f54b95b25bb55532332e21/male-vegg-malere-teaser.jpg",
    filename: "male-vegg.jpg",
  },
  {
    id: "80dba70a-48fb-4fa7-bb9e-70762bd8b297",
    title: "Velg innendoersmaling",
    url: "https://www.fargerike.no/contentassets/4fde6e064a824a6a9965efad56aac853/velg-riktig-husmaling.jpg",
    filename: "velg-innendoersmaling.jpg",
  },
  {
    id: "10bbb849-aca8-46ea-82bf-debe2dd85056",
    title: "Maling barnerom",
    url: "https://www.fargerike.no/contentassets/3b0aa7ddb312450d80218ed9cde4be25/farger-til-barnerom.jpg",
    filename: "maling-barnerom.jpg",
  },
];

const HOMEPAGE_HERO = {
  id: "homePage",
  title: "Homepage hero",
  url: "https://www.fargerike.no/contentassets/67f6f33dc2d3475da0a36225f000c9f7/varklar-mobil_lys.jpg",
  filename: "homepage-hero.jpg",
  field: "hero.image", // nested path
};

// ---------------------------------------------------------------------------
// 4. Helpers
// ---------------------------------------------------------------------------

/**
 * Download an image from a URL and return a Buffer.
 */
async function downloadImage(url) {
  console.log(`  Downloading: ${url}`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Upload a buffer to Sanity as an image asset.
 * Returns the full asset document (with _id).
 */
async function uploadToSanity(buffer, filename) {
  console.log(`  Uploading to Sanity as "${filename}"...`);
  const asset = await client.assets.upload("image", buffer, {
    filename,
  });
  console.log(`  Asset created: ${asset._id}`);
  return asset;
}

/**
 * Patch an article's mainImage field.
 */
async function patchArticleImage(docId, assetId) {
  await client
    .patch(docId)
    .set({
      mainImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetId,
        },
      },
    })
    .commit();
  console.log(`  Patched document ${docId} with mainImage`);
}

/**
 * Patch the homepage hero image (nested field).
 */
async function patchHomepageHero(docId, assetId) {
  await client
    .patch(docId)
    .set({
      "hero.image": {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetId,
        },
      },
    })
    .commit();
  console.log(`  Patched document ${docId} with hero.image`);
}

/**
 * Publish a document (remove draft prefix if present).
 * Sanity stores drafts as "drafts.<id>" — publishing means copying
 * draft content to the published document ID. Since we're patching
 * the published doc directly with a write token, the changes should
 * be live. But if there's an existing draft, we need to patch that too.
 */
async function ensurePublished(docId) {
  // Check if there's a draft version and patch it too
  const draftId = `drafts.${docId}`;
  try {
    const draft = await client.getDocument(draftId);
    if (draft) {
      console.log(`  Found draft version, publishing...`);
      // Delete the draft to publish the current version
      await client.delete(draftId);
      console.log(`  Draft removed (published version is live)`);
    }
  } catch {
    // No draft exists, that's fine
  }
}

// ---------------------------------------------------------------------------
// 5. Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("=== Fargerike Image Upload to Sanity ===\n");

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  // Process articles
  for (const article of ARTICLE_IMAGES) {
    console.log(`\n[Article] ${article.title} (${article.id})`);
    try {
      const buffer = await downloadImage(article.url);
      const asset = await uploadToSanity(buffer, article.filename);
      await patchArticleImage(article.id, asset._id);
      await ensurePublished(article.id);
      successCount++;
      console.log(`  Done!`);
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
      errorCount++;
    }
  }

  // Process homepage hero
  console.log(`\n[Homepage] ${HOMEPAGE_HERO.title} (${HOMEPAGE_HERO.id})`);
  try {
    const buffer = await downloadImage(HOMEPAGE_HERO.url);
    const asset = await uploadToSanity(buffer, HOMEPAGE_HERO.filename);
    await patchHomepageHero(HOMEPAGE_HERO.id, asset._id);
    await ensurePublished(HOMEPAGE_HERO.id);
    successCount++;
    console.log(`  Done!`);
  } catch (err) {
    console.error(`  ERROR: ${err.message}`);
    errorCount++;
  }

  // Summary
  console.log(`\n=== Summary ===`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Skipped: ${skipCount}`);
  console.log(`  Errors:  ${errorCount}`);
  console.log(`  Total:   ${ARTICLE_IMAGES.length + 1}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
