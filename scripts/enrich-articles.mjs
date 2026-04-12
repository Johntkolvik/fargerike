/**
 * Enrich Sanity articles with inline images and product/category references.
 *
 * Downloads images from fargerike.no, uploads them to Sanity, and inserts
 * image blocks into article body arrays at logical positions. Also adds
 * relatedCategories references based on article topic.
 *
 * Usage: node scripts/enrich-articles.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

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
// 3. Helpers
// ---------------------------------------------------------------------------

function generateKey() {
  return crypto.randomUUID().slice(0, 12);
}

async function downloadImage(url) {
  console.log(`    Downloading: ${url}`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function uploadToSanity(buffer, filename) {
  console.log(`    Uploading to Sanity as "${filename}"...`);
  const asset = await client.assets.upload("image", buffer, { filename });
  console.log(`    Asset created: ${asset._id}`);
  return asset;
}

function makeImageBlock(assetId) {
  return {
    _type: "image",
    _key: generateKey(),
    asset: {
      _type: "reference",
      _ref: assetId,
    },
  };
}

async function ensurePublished(docId) {
  const draftId = `drafts.${docId}`;
  try {
    const draft = await client.getDocument(draftId);
    if (draft) {
      console.log(`    Found draft version, removing to publish...`);
      await client.delete(draftId);
      console.log(`    Draft removed (published version is live)`);
    }
  } catch {
    // No draft exists
  }
}

// ---------------------------------------------------------------------------
// 4. Article enrichment config
// ---------------------------------------------------------------------------

const BASE_URL = "https://www.fargerike.no";

// Product category IDs (from Sanity)
const CATEGORIES = {
  veggmaling: "d004c7b4-083c-46a6-b866-5d1913b23119",
  trePanel: "12a81199-a2a1-460b-bdb7-8ec3f914f546",
  tapet: "1522b6db-e2cf-43b6-9d9f-99a36a723ce9",
  gulv: "1d0f69f0-6b3b-4a2c-98b2-f17d81b88245",
  solskjerming: "3c49153f-da39-4f94-95d3-2fc630677132",
};

// Product IDs (from Sanity)
const PRODUCTS = {
  ladyPureColor: "1a554a16-d52f-4590-8666-cc1559d20fc8",
  jordanPenselFlat: "1c1f9c3c-6c66-4dbc-8730-f820180a1ede",
  jordanRullesett: "25cf34c8-74e5-4ac7-bed5-ffd49ecaff66",
  jordanSuperbrett: "4980eefa-ea67-4773-8dcf-6dedd2c09b1d",
  jordanJapansparkel: "6befeb77-23a2-4ef6-a8fe-55bd3bdb2566",
  jordanMalerrull: "ac97bff6-90f5-4f1a-a64d-272e08629c90",
  jordanPenselSkra: "bb2d2693-c6ab-435d-92ee-76cf7b2361fb",
  malertape: "f952965c-97a3-4dd9-a486-e041066fa340",
};

/**
 * Each article config:
 *  - id: Sanity document _id
 *  - title: for logging
 *  - images: array of { url, filename, insertAfterKey }
 *      insertAfterKey = the _key of the body block after which to insert the image
 *  - relatedCategories: array of category IDs
 */
const ARTICLES = [
  {
    id: "315b6bd1-26f5-476b-a74c-f75444e48da2",
    title: "Slik beiser du terrassen — steg for steg",
    images: [
      {
        url: `${BASE_URL}/contentassets/4dbc543ab9234919b79e58dd6de984df/terrasserens.jpg`,
        filename: "beise-terrasse-rengjoring.jpg",
        insertAfterKey: "s1p1", // After Steg 1 paragraph
      },
      {
        url: `${BASE_URL}/contentassets/18d859b722174c699e21dbb23eea4142/terrassebeis-verktoy.jpg`,
        filename: "beise-terrasse-verktoy.jpg",
        insertAfterKey: "s3p1", // After Steg 3 (masking)
      },
      {
        url: `${BASE_URL}/contentassets/b4d9a324ec9e4729b85eba8a60cb501b/pensle-terrasse.jpg`,
        filename: "beise-terrasse-paforing.jpg",
        insertAfterKey: "s4p1", // After Steg 4 (påføring)
      },
    ],
    relatedCategories: [CATEGORIES.trePanel],
  },
  {
    id: "527e16c2-50bc-4001-8cd1-7e5db61fc582",
    title: "Hvordan male huset utvendig",
    images: [
      {
        url: `${BASE_URL}/contentassets/4d67b0e90e5e46fc9d37e29584a91e81/vaske-hus-fargerike.jpg`,
        filename: "male-hus-vasking.jpg",
        insertAfterKey: "p3", // After forberedelse paragraph
      },
      {
        url: `${BASE_URL}/contentassets/7ee0c390a49f40298696f15284b2da02/male_ute_host.jpg`,
        filename: "male-hus-utendors.jpg",
        insertAfterKey: "p5", // After grunning paragraph
      },
    ],
    relatedCategories: [CATEGORIES.trePanel],
  },
  {
    id: "76576cb1-1d67-4bfb-a1da-5a7fa6df34f7",
    title: "Hvordan male vegg – komplett guide",
    images: [
      {
        url: `${BASE_URL}/contentassets/b70056f0d2c84a2098f9c1875964b736/male-vegg-tildekning.jpg`,
        filename: "male-vegg-tildekning.jpg",
        insertAfterKey: "intro1", // After intro
      },
      {
        url: `${BASE_URL}/contentassets/b70056f0d2c84a2098f9c1875964b736/male-vegg-maskeringstape.jpg`,
        filename: "male-vegg-maskeringstape.jpg",
        insertAfterKey: "p3", // After first step section
      },
      {
        url: `${BASE_URL}/contentassets/062f5ec2100f4510acfaf5d8dc87d7e2/male-vegg-malerulle.jpg`,
        filename: "male-vegg-malerulle.jpg",
        insertAfterKey: "p5", // After painting section
      },
    ],
    relatedCategories: [CATEGORIES.veggmaling],
  },
  {
    id: "68fa157d-a988-491e-9e3e-c8701f61d95f",
    title: "Industriell varme – Månedens stil april 2026",
    images: [
      {
        url: `${BASE_URL}/contentassets/23f76d881c0d48eab23aedebbbf420ff/forslag_banner1.jpg`,
        filename: "industriell-varme-banner.jpg",
        insertAfterKey: "intro1", // After intro
      },
      {
        url: `${BASE_URL}/globalassets/tapet_mnd_stil.jpg`,
        filename: "industriell-varme-tapet.jpg",
        insertAfterKey: "p3", // After second section
      },
      {
        url: `${BASE_URL}/contentassets/4ad1094bb8ba45c6a5252a2b79998e2e/bambus_mnd-stil.jpg`,
        filename: "industriell-varme-bambus.jpg",
        insertAfterKey: "p5", // After fourth section
      },
    ],
    relatedCategories: [CATEGORIES.tapet, CATEGORIES.gulv],
  },
  {
    id: "70dbf0a1-7220-4331-a9c3-1a38574bec08",
    title: "Nordisk stue — tidløs eleganse med dempede toner",
    images: [
      {
        url: `${BASE_URL}/contentassets/18cf1824efa34f6ab77d902ffbe35464/gardiner_mnd-stil-.jpg`,
        filename: "nordisk-stue-gardiner.jpg",
        insertAfterKey: "p1b", // After first section
      },
      {
        url: `${BASE_URL}/contentassets/b3e44c606ce248459a4ee0d76507b0c3/gulv_mnd-stil.jpg`,
        filename: "nordisk-stue-gulv.jpg",
        insertAfterKey: "p3", // After third section
      },
    ],
    relatedCategories: [CATEGORIES.veggmaling],
  },
];

// ---------------------------------------------------------------------------
// 5. Main processing
// ---------------------------------------------------------------------------

async function enrichArticle(articleConfig) {
  const { id, title, images, relatedCategories } = articleConfig;
  console.log(`\n[Article] ${title} (${id})`);

  // 1. Fetch current document body
  const doc = await client.getDocument(id);
  if (!doc) {
    console.error(`  Document not found: ${id}`);
    return false;
  }

  const body = doc.body || [];
  if (body.length === 0) {
    console.error(`  Article has no body blocks, skipping image insertion`);
    // Still add category references below
  }

  // 2. Check if images already inserted (idempotency)
  const existingImageKeys = body
    .filter((b) => b._type === "image")
    .map((b) => b._key);
  if (existingImageKeys.length > 0) {
    console.log(
      `  Article already has ${existingImageKeys.length} inline image(s), skipping image insertion`,
    );
  } else if (body.length > 0) {
    // 3. Download, upload, and insert images
    const imageBlocks = [];
    for (const img of images) {
      try {
        const buffer = await downloadImage(img.url);
        const asset = await uploadToSanity(buffer, img.filename);
        imageBlocks.push({
          block: makeImageBlock(asset._id),
          insertAfterKey: img.insertAfterKey,
        });
      } catch (err) {
        console.error(`    SKIP image ${img.filename}: ${err.message}`);
      }
    }

    // 4. Insert image blocks into body array (reverse order to preserve indices)
    if (imageBlocks.length > 0) {
      const newBody = [...body];

      // Sort by position in body (reverse) so inserts don't shift indices
      const insertions = imageBlocks
        .map(({ block, insertAfterKey }) => {
          const idx = newBody.findIndex((b) => b._key === insertAfterKey);
          return { block, idx };
        })
        .filter(({ idx }) => idx !== -1)
        .sort((a, b) => b.idx - a.idx);

      for (const { block, idx } of insertions) {
        newBody.splice(idx + 1, 0, block);
        console.log(
          `    Inserted image after block index ${idx} (key: ${body[idx]._key})`,
        );
      }

      // 5. Patch the document
      await client.patch(id).set({ body: newBody }).commit();
      console.log(
        `  Body updated: ${body.length} → ${newBody.length} blocks`,
      );
    }
  }

  // 6. Add relatedCategories references
  if (relatedCategories && relatedCategories.length > 0) {
    const categoryRefs = relatedCategories.map((catId) => ({
      _type: "reference",
      _ref: catId,
      _key: generateKey(),
    }));

    await client.patch(id).set({ relatedCategories: categoryRefs }).commit();
    console.log(
      `  Added ${categoryRefs.length} relatedCategories reference(s)`,
    );
  }

  // 7. Publish
  await ensurePublished(id);
  console.log(`  Published!`);
  return true;
}

async function main() {
  console.log("=== Fargerike Article Enrichment ===\n");
  console.log(`Processing ${ARTICLES.length} articles...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const article of ARTICLES) {
    try {
      const ok = await enrichArticle(article);
      if (ok) successCount++;
      else errorCount++;
    } catch (err) {
      console.error(`  FATAL: ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Errors:  ${errorCount}`);
  console.log(`  Total:   ${ARTICLES.length}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
