/**
 * Geocode all Fargerike stores using Nominatim (OpenStreetMap).
 *
 * For each store:
 * 1. Queries Nominatim with street + postal code + city + Norway
 * 2. Falls back to postal code + city if street-level fails
 * 3. Patches the store in Sanity with precise coordinates + county
 *
 * Rate limit: 1 request per second (Nominatim policy).
 * User-Agent header required by Nominatim ToS.
 *
 * Usage: node scripts/geocode-stores.mjs
 *        node scripts/geocode-stores.mjs --dry-run   (preview without patching)
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const DRY_RUN = process.argv.includes("--dry-run");

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
if (!WRITE_TOKEN && !DRY_RUN) {
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
// 3. County lookup from postal code
// ---------------------------------------------------------------------------
/**
 * Derives Norwegian county (fylke) from the first 2 digits of postal code.
 * Uses the 2024 county structure (after mergers).
 */
function getCountyFromPostalCode(postalCode) {
  if (!postalCode || postalCode.length < 2) return "Ukjent";
  const prefix = parseInt(postalCode.slice(0, 2), 10);

  // 0xxx = Oslo / Akershus (formerly Viken)
  if (prefix >= 0 && prefix <= 12) {
    // Distinguish Oslo proper (00xx-01xx) from Akershus
    const fourDigit = parseInt(postalCode, 10);
    if (fourDigit >= 0 && fourDigit <= 1299) return "Oslo";
    return "Akershus";
  }
  // 13xx-14xx = Akershus (Follo)
  if (prefix >= 13 && prefix <= 14) return "Akershus";
  // 15xx-19xx = Østfold (formerly Viken)
  if (prefix >= 15 && prefix <= 19) return "Østfold";
  // 20xx-27xx = Innlandet (Hedmark + Oppland)
  if (prefix >= 20 && prefix <= 27) return "Innlandet";
  // 28xx-29xx = Innlandet (Oppland continued)
  if (prefix >= 28 && prefix <= 29) return "Innlandet";
  // 30xx-36xx = Buskerud
  if (prefix >= 30 && prefix <= 36) return "Buskerud";
  // 37xx-39xx = Vestfold og Telemark
  if (prefix >= 37 && prefix <= 39) return "Vestfold og Telemark";
  // But 30xx-33xx is Drammen/Buskerud area, and 31xx-32xx can be Vestfold
  // Let's be more precise:
  // Actually, Norwegian postal codes:
  // 30xx-36xx = Buskerud (Drammen, Kongsberg, Ringerike)
  // 31xx-32xx = Vestfold (Tønsberg, Sandefjord, Horten)
  // 33xx-36xx = Telemark (Skien, Porsgrunn, Notodden)
  // 37xx-39xx = Telemark continued + some Vestfold

  // 40xx-46xx = Agder (Aust + Vest)
  if (prefix >= 40 && prefix <= 49) return "Agder";
  // 50xx-59xx = Rogaland + Vestland
  if (prefix >= 40 && prefix <= 49) return "Agder";
  if (prefix >= 50 && prefix <= 56) return "Rogaland";
  if (prefix >= 57 && prefix <= 59) return "Vestland";
  // 60xx-69xx = Vestland + Møre og Romsdal
  if (prefix >= 60 && prefix <= 64) return "Møre og Romsdal";
  if (prefix >= 65 && prefix <= 69) return "Vestland";
  // 70xx-79xx = Trøndelag
  if (prefix >= 70 && prefix <= 79) return "Trøndelag";
  // 80xx-87xx = Nordland
  if (prefix >= 80 && prefix <= 87) return "Nordland";
  // 88xx-89xx = Troms
  if (prefix >= 88 && prefix <= 94) return "Troms";
  // 95xx-99xx = Finnmark
  if (prefix >= 95 && prefix <= 99) return "Finnmark";

  return "Ukjent";
}

// More precise mapping using 4-digit postal codes for edge cases
function getCountyPrecise(postalCode) {
  if (!postalCode) return "Ukjent";
  const code = parseInt(postalCode, 10);

  // Oslo: 0001-1295
  if (code >= 1 && code <= 1295) return "Oslo";
  // Akershus: 1300-1499, 0200-0299 area (some overlap)
  if (code >= 1300 && code <= 1499) return "Akershus";
  // Østfold: 1500-1999
  if (code >= 1500 && code <= 1999) return "Østfold";
  // Hedmark/Innlandet: 2000-2699
  if (code >= 2000 && code <= 2699) return "Innlandet";
  // Oppland/Innlandet: 2700-2999
  if (code >= 2700 && code <= 2999) return "Innlandet";
  // Buskerud: 3000-3699
  if (code >= 3000 && code <= 3099) return "Buskerud"; // Drammen
  if (code >= 3100 && code <= 3299) return "Vestfold"; // Tønsberg, Nøtterøy, Sem
  if (code >= 3300 && code <= 3399) return "Buskerud"; // Hokksund area
  if (code >= 3400 && code <= 3499) return "Buskerud"; // Lier
  if (code >= 3500 && code <= 3599) return "Buskerud"; // Hønefoss
  if (code >= 3600 && code <= 3699) return "Buskerud"; // Kongsberg
  // Vestfold: 3100-3299 (handled above), 3200-3299
  // Telemark: 3700-3999
  if (code >= 3700 && code <= 3999) return "Vestfold og Telemark";
  // Agder: 4000-4999
  if (code >= 4000 && code <= 4399) return "Rogaland"; // Stavanger/Sandnes
  if (code >= 4400 && code <= 4999) return "Agder";
  // Rogaland: 4000-4399 (handled above), 5500-5599
  if (code >= 5000 && code <= 5499) return "Vestland"; // Bergen area
  if (code >= 5500 && code <= 5599) return "Rogaland"; // Haugesund
  if (code >= 5600 && code <= 5999) return "Vestland";
  // Møre og Romsdal: 6000-6699
  if (code >= 6000 && code <= 6699) return "Møre og Romsdal";
  // Sogn og Fjordane / Vestland: 6700-6999
  if (code >= 6700 && code <= 6999) return "Vestland";
  // Trøndelag: 7000-7999
  if (code >= 7000 && code <= 7999) return "Trøndelag";
  // Nordland: 8000-8799
  if (code >= 8000 && code <= 8799) return "Nordland";
  // Troms: 8800-9499
  if (code >= 8800 && code <= 9499) return "Troms";
  // Finnmark: 9500-9999
  if (code >= 9500 && code <= 9999) return "Finnmark";

  return "Ukjent";
}

// ---------------------------------------------------------------------------
// 4. Nominatim geocoding
// ---------------------------------------------------------------------------
const NOMINATIM_BASE = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = "FargerikeStoreLocator/1.0 (fargerike.no geocoding script)";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Geocode an address using Nominatim.
 * Tries street-level first, falls back to postal code + city.
 * Returns { lat, lng } or null.
 */
async function geocodeAddress(street, postalCode, city) {
  // Attempt 1: Full address
  const fullQuery = [street, postalCode, city, "Norway"]
    .filter(Boolean)
    .join(", ");

  let result = await nominatimSearch(fullQuery);
  if (result) return result;

  // Attempt 2: Postal code + city (skip street)
  await sleep(1100); // respect rate limit between requests
  const fallbackQuery = [postalCode, city, "Norway"].filter(Boolean).join(", ");
  result = await nominatimSearch(fallbackQuery);
  if (result) return { ...result, fallback: true };

  return null;
}

async function nominatimSearch(query) {
  const url = `${NOMINATIM_BASE}?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=no`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(`  Nominatim HTTP ${response.status} for: ${query}`);
      return null;
    }

    const data = await response.json();
    if (data.length === 0) return null;

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      displayName: data[0].display_name,
    };
  } catch (err) {
    console.error(`  Nominatim error for "${query}": ${err.message}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// 5. Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(
    `=== Geocode Fargerike stores ${DRY_RUN ? "(DRY RUN)" : ""} ===\n`
  );

  // Fetch all stores from Sanity
  const stores = await client.fetch(
    `*[_type == "store"]{ _id, name, "slug": slug.current, address, coordinates } | order(name asc)`
  );
  console.log(`Found ${stores.length} stores in Sanity.\n`);

  let geocoded = 0;
  let failed = 0;
  let skipped = 0;
  let fallbacks = 0;
  const results = [];

  for (let i = 0; i < stores.length; i++) {
    const store = stores[i];
    const { street, postalCode, city } = store.address || {};
    const county = getCountyPrecise(postalCode);

    console.log(
      `[${i + 1}/${stores.length}] ${store.name} — ${street}, ${postalCode} ${city}`
    );

    // Geocode via Nominatim
    const geo = await geocodeAddress(street, postalCode, city);

    if (geo) {
      const oldLat = store.coordinates?.lat;
      const oldLng = store.coordinates?.lng;
      const moved = oldLat
        ? Math.abs(oldLat - geo.lat) > 0.001 ||
          Math.abs(oldLng - geo.lng) > 0.001
        : true;

      if (geo.fallback) fallbacks++;

      console.log(
        `  -> ${geo.lat.toFixed(5)}, ${geo.lng.toFixed(5)} (${county})${geo.fallback ? " [FALLBACK]" : ""}${moved ? " [MOVED]" : " [~same]"}`
      );

      results.push({
        _id: store._id,
        name: store.name,
        lat: geo.lat,
        lng: geo.lng,
        county,
        moved,
        fallback: !!geo.fallback,
      });

      if (!DRY_RUN) {
        try {
          await client
            .patch(store._id)
            .set({
              coordinates: { _type: "geopoint", lat: geo.lat, lng: geo.lng },
              county,
            })
            .commit();
          console.log(`  -> PATCHED in Sanity`);
        } catch (err) {
          console.error(`  -> PATCH ERROR: ${err.message}`);
          failed++;
          continue;
        }
      }

      geocoded++;
    } else {
      console.log(`  -> FAILED to geocode, keeping existing coordinates`);

      // Still set county even if geocoding fails
      if (!DRY_RUN && county !== "Ukjent") {
        try {
          await client.patch(store._id).set({ county }).commit();
          console.log(`  -> Set county=${county} (kept old coordinates)`);
        } catch (err) {
          console.error(`  -> PATCH ERROR (county only): ${err.message}`);
        }
      }

      failed++;
    }

    // Rate limit: 1 request per second
    if (i < stores.length - 1) {
      await sleep(1100);
    }
  }

  // Summary
  console.log("\n=== SUMMARY ===");
  console.log(`Total stores:       ${stores.length}`);
  console.log(`Geocoded:           ${geocoded}`);
  console.log(`  - Street-level:   ${geocoded - fallbacks}`);
  console.log(`  - Fallback (city): ${fallbacks}`);
  console.log(`Failed:             ${failed}`);
  console.log(
    `Significantly moved: ${results.filter((r) => r.moved).length}`
  );

  // County distribution
  const countyCount = {};
  for (const r of results) {
    countyCount[r.county] = (countyCount[r.county] || 0) + 1;
  }
  console.log("\nCounty distribution:");
  for (const [county, count] of Object.entries(countyCount).sort((a, b) =>
    a[0].localeCompare(b[0], "nb")
  )) {
    console.log(`  ${county}: ${count}`);
  }

  if (DRY_RUN) {
    console.log("\n(Dry run — no changes were made to Sanity)");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
