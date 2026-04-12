/**
 * Create demo Fargerike store documents in Sanity.
 *
 * Creates 10 demo stores with name, slug, address, coordinates,
 * phone, email, and opening hours matching the store schema.
 *
 * Idempotent: checks if documents already exist before creating.
 *
 * Usage: node scripts/create-stores.mjs
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
// 3. Demo store data
// ---------------------------------------------------------------------------
const WEEKDAYS = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
  "Søndag",
];

function makeOpeningHours() {
  return WEEKDAYS.map((day) => {
    if (day === "Søndag") {
      return { _type: "object", _key: day, day, open: "Stengt", close: "Stengt" };
    }
    if (day === "Lørdag") {
      return { _type: "object", _key: day, day, open: "10:00", close: "16:00" };
    }
    return { _type: "object", _key: day, day, open: "09:00", close: "18:00" };
  });
}

const stores = [
  {
    name: "Fargerike Oslo Sentrum",
    slug: "oslo-sentrum",
    street: "Karl Johans gate 25",
    postalCode: "0159",
    city: "Oslo",
    lat: 59.913,
    lng: 10.752,
    phone: "22 33 44 55",
    email: "oslo@fargerike.no",
  },
  {
    name: "Fargerike Majorstuen",
    slug: "majorstuen",
    street: "Bogstadveien 48",
    postalCode: "0366",
    city: "Oslo",
    lat: 59.929,
    lng: 10.713,
    phone: "22 44 55 66",
    email: "majorstuen@fargerike.no",
  },
  {
    name: "Fargerike Sandvika",
    slug: "sandvika",
    street: "Sandviksveien 12",
    postalCode: "1337",
    city: "Sandvika",
    lat: 59.889,
    lng: 10.524,
    phone: "67 54 32 10",
    email: "sandvika@fargerike.no",
  },
  {
    name: "Fargerike Bergen Sentrum",
    slug: "bergen-sentrum",
    street: "Strandgaten 18",
    postalCode: "5013",
    city: "Bergen",
    lat: 60.391,
    lng: 5.324,
    phone: "55 23 45 67",
    email: "bergen@fargerike.no",
  },
  {
    name: "Fargerike Stavanger",
    slug: "stavanger",
    street: "Klubbgata 6",
    postalCode: "4013",
    city: "Stavanger",
    lat: 58.970,
    lng: 5.733,
    phone: "51 89 01 23",
    email: "stavanger@fargerike.no",
  },
  {
    name: "Fargerike Trondheim",
    slug: "trondheim",
    street: "Olav Tryggvasons gate 30",
    postalCode: "7011",
    city: "Trondheim",
    lat: 63.430,
    lng: 10.395,
    phone: "73 80 12 34",
    email: "trondheim@fargerike.no",
  },
  {
    name: "Fargerike Tromsø",
    slug: "tromso",
    street: "Storgata 44",
    postalCode: "9008",
    city: "Tromsø",
    lat: 69.649,
    lng: 18.955,
    phone: "77 60 45 67",
    email: "tromso@fargerike.no",
  },
  {
    name: "Fargerike Kristiansand",
    slug: "kristiansand",
    street: "Markens gate 15",
    postalCode: "4611",
    city: "Kristiansand",
    lat: 58.146,
    lng: 7.996,
    phone: "38 12 34 56",
    email: "kristiansand@fargerike.no",
  },
  {
    name: "Fargerike Drammen",
    slug: "drammen",
    street: "Nedre Storgate 22",
    postalCode: "3015",
    city: "Drammen",
    lat: 59.744,
    lng: 10.204,
    phone: "32 80 11 22",
    email: "drammen@fargerike.no",
  },
  {
    name: "Fargerike Fredrikstad",
    slug: "fredrikstad",
    street: "Storgata 8",
    postalCode: "1607",
    city: "Fredrikstad",
    lat: 59.220,
    lng: 10.934,
    phone: "69 30 22 33",
    email: "fredrikstad@fargerike.no",
  },
];

// ---------------------------------------------------------------------------
// 4. Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("=== Create demo Fargerike stores ===\n");

  let created = 0;
  let skipped = 0;

  for (const store of stores) {
    // Check if already exists by slug
    const existing = await client.fetch(
      `*[_type == "store" && slug.current == $slug][0]._id`,
      { slug: store.slug }
    );

    if (existing) {
      console.log(`  SKIP  ${store.name} (already exists: ${existing})`);
      skipped++;
      continue;
    }

    const doc = {
      _type: "store",
      name: store.name,
      slug: { _type: "slug", current: store.slug },
      address: {
        _type: "object",
        street: store.street,
        postalCode: store.postalCode,
        city: store.city,
      },
      coordinates: {
        _type: "geopoint",
        lat: store.lat,
        lng: store.lng,
      },
      phone: store.phone,
      email: store.email,
      openingHours: makeOpeningHours(),
    };

    const result = await client.create(doc);
    console.log(`  CREATE  ${store.name} → ${result._id}`);
    created++;
  }

  console.log(`\nDone: ${created} created, ${skipped} skipped.`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
