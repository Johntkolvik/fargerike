/**
 * Link articles to productFamily references via relatedProducts.
 *
 * Maps articles to relevant product families based on content topic.
 * Idempotent: overwrites relatedProducts each time (same result).
 *
 * Usage: node scripts/link-articles-families.mjs
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

function generateKey() {
  return crypto.randomUUID().slice(0, 12);
}

// ---------------------------------------------------------------------------
// 3. Product family IDs (from Sanity query)
// ---------------------------------------------------------------------------
const FAMILIES = {
  ladyWonderwall: "ul0wITHDFeTj8cbMvgiyUW",   // 606 Interior
  ladyBalance: "o0Z5oBPzurFYWa77gj6Qvx",       // 686 Interior
  sens: "v1f73cB1Ou5bPguIN3fT5b",               // 429 Interior
  ladyPureColor: "o0Z5oBPzurFYWa77gj6REf",      // 680 Interior
  ladySupremeFinish: "o0Z5oBPzurFYWa77gj6RO1",  // 610 Interior
  ladyMinerals: "ul0wITHDFeTj8cbMvgj08T",       // 677 Interior
  drygolinNordic: "o0Z5oBPzurFYWa77gj6Rc3",     // 300 Exterior
  drygolinUltimat: "o0Z5oBPzurFYWa77gj6RlP",    // 688 Exterior
  jotashield: "o0Z5oBPzurFYWa77gj6Rul",         // 462 Exterior
};

// ---------------------------------------------------------------------------
// 4. Article → productFamily mappings
// ---------------------------------------------------------------------------
const ARTICLE_LINKS = [
  {
    // "Slik beiser du terrassen — steg for steg"
    articleId: "315b6bd1-26f5-476b-a74c-f75444e48da2",
    title: "Beise terrassen",
    familyIds: [FAMILIES.drygolinNordic, FAMILIES.drygolinUltimat],
  },
  {
    // "Hvordan male vegg – komplett guide" / "Slik maler du stueveggene"
    articleId: "76576cb1-1d67-4bfb-a1da-5a7fa6df34f7",
    title: "Male vegg (komplett guide)",
    familyIds: [FAMILIES.ladyWonderwall, FAMILIES.sens, FAMILIES.ladyPureColor],
  },
  {
    // "Slik maler du stueveggene — fra forberedelse til siste strøk"
    articleId: "9c27eae5-df97-445a-a7b8-bbe7cfdf5008",
    title: "Male stueveggene",
    familyIds: [FAMILIES.ladyWonderwall, FAMILIES.sens, FAMILIES.ladyPureColor],
  },
  {
    // "Velg riktig innendørsmaling for hvert rom"
    articleId: "80dba70a-48fb-4fa7-bb9e-70762bd8b297",
    title: "Velg innendørsmaling",
    familyIds: [
      FAMILIES.ladyWonderwall,
      FAMILIES.sens,
      FAMILIES.ladyBalance,
      FAMILIES.ladyPureColor,
    ],
  },
  {
    // "Hvordan male huset utvendig"
    articleId: "527e16c2-50bc-4001-8cd1-7e5db61fc582",
    title: "Male huset utvendig",
    familyIds: [FAMILIES.drygolinNordic, FAMILIES.drygolinUltimat],
  },
];

// ---------------------------------------------------------------------------
// 5. Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("=== Link articles to productFamilies ===\n");

  let success = 0;
  let errors = 0;

  for (const link of ARTICLE_LINKS) {
    try {
      console.log(`[${link.title}] (${link.articleId})`);

      const refs = link.familyIds.map((id) => ({
        _type: "reference",
        _ref: id,
        _key: generateKey(),
      }));

      await client
        .patch(link.articleId)
        .set({ relatedProducts: refs })
        .commit();

      console.log(`  Linked ${refs.length} product families`);
      success++;
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
      errors++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`  Success: ${success}`);
  console.log(`  Errors:  ${errors}`);
  console.log(`  Total:   ${ARTICLE_LINKS.length}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
