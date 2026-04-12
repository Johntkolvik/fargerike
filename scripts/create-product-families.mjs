/**
 * Create productFamily documents in Sanity from families.json.
 *
 * Reads data/families.json and creates one productFamily document per entry.
 * Idempotent: checks if documents already exist before creating.
 *
 * Usage: node scripts/create-product-families.mjs
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
// 3. Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("=== Create productFamily documents ===\n");

  // Check if productFamily documents already exist
  const existing = await client.fetch(
    '*[_type == "productFamily"]{ _id, name, familyCode }',
  );
  if (existing.length > 0) {
    console.log(
      `Found ${existing.length} existing productFamily documents. Skipping creation.`,
    );
    for (const doc of existing) {
      console.log(`  - ${doc.name} (${doc.familyCode})`);
    }
    return;
  }

  // Read families.json
  const familiesPath = resolve(projectRoot, "data/families.json");
  const families = JSON.parse(readFileSync(familiesPath, "utf-8"));
  console.log(`Found ${families.length} families in families.json\n`);

  let created = 0;
  let errors = 0;

  for (const family of families) {
    try {
      console.log(`Creating: ${family.name} (${family.familyCode})...`);

      // Map applicationArea to lowercase for schema consistency
      const applicationArea = family.applicationArea?.toLowerCase() || null;

      // Build the document
      const doc = {
        _type: "productFamily",
        familyCode: family.familyCode,
        name: family.name,
        brand: "jotun",
        applicationArea,
        shortName: family.shortName || null,
        finishName: family.finishName || null,
        section: family.section || null,
        description: family.description || null,
        badge: family.badge || null,
        // Specs
        washClass: family.specs?.washClass || null,
        voc: family.specs?.voc || null,
        coverage: family.specs?.coverage || null,
        dryTime: family.specs?.dryTime || null,
        // Gloss options (Lady Supreme Finish)
        glossOptions: family.glossOptions || null,
        // Default supported color brands for Jotun families
        supportedColorBrands: ["jotun", "ncs"],
        // Variants from products array
        variants: family.products?.map((p) => ({
          _type: "object",
          _key: p.productCode,
          productCode: p.productCode,
          base: "hvit",
          volume: `${p.fillLevel}L`,
          price: p.priceNOK,
        })) || [],
      };

      // Remove null fields
      for (const key of Object.keys(doc)) {
        if (doc[key] === null) delete doc[key];
      }

      const result = await client.create(doc);
      console.log(`  Created: ${result._id}`);
      created++;
    } catch (err) {
      console.error(`  ERROR creating ${family.name}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`  Created: ${created}`);
  console.log(`  Errors:  ${errors}`);
  console.log(`  Total:   ${families.length}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
