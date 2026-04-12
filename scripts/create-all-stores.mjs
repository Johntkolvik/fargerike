/**
 * Create ALL real Fargerike store documents in Sanity.
 *
 * Scraped from fargerike.no/fargehandel/ (86 stores from sitemap).
 * Replaces the 10 demo stores created earlier.
 *
 * Steps:
 * 1. Delete all existing store documents
 * 2. Create all real stores with actual data
 *
 * Usage: node scripts/create-all-stores.mjs
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
// 3. Helper: slugify
// ---------------------------------------------------------------------------
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/fargerike\s+/i, "")
    .replace(/[æ]/g, "ae")
    .replace(/[ø]/g, "o")
    .replace(/[å]/g, "a")
    .replace(/[éè]/g, "e")
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---------------------------------------------------------------------------
// 4. Helper: opening hours
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

function makeHours(mon, tue, wed, thu, fri, sat, sun) {
  const days = [mon, tue, wed, thu, fri, sat, sun];
  return WEEKDAYS.map((day, i) => ({
    _type: "object",
    _key: day,
    day,
    open: days[i][0],
    close: days[i][1],
  }));
}

// Shorthand: [open, close] or ["Stengt", "Stengt"]
const CLOSED = ["Stengt", "Stengt"];

// ---------------------------------------------------------------------------
// 5. ALL store data — scraped from fargerike.no April 2026
// ---------------------------------------------------------------------------
const stores = [
  {
    name: "Fargerike A.Kiellands Plass",
    slug: "oslo-a-kiellands-plass",
    street: "Waldemar Thranesgate 72",
    postalCode: "0175",
    city: "Oslo",
    phone: "22 35 75 00",
    email: "akp@fargerike-norge.no",
    lat: 59.926, lng: 10.757,
    hours: makeHours(
      ["10:00","20:00"],["10:00","20:00"],["10:00","20:00"],["10:00","20:00"],["10:00","20:00"],
      ["10:00","18:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Alta",
    slug: "alta",
    street: "Nordre Ringvei 25",
    postalCode: "9505",
    city: "Alta",
    phone: "78 44 92 40",
    email: "alta@fargerike.no",
    lat: 69.969, lng: 23.272,
    hours: makeHours(
      ["07:00","16:30"],["07:00","16:30"],["07:00","16:30"],["07:00","18:00"],["07:00","16:30"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Arendal",
    slug: "arendal-stoaveien",
    street: "Stoaveien 12D",
    postalCode: "4848",
    city: "Arendal",
    phone: "37 02 20 50",
    email: "arendal@fargerike.no",
    lat: 58.461, lng: 8.772,
    hours: makeHours(
      ["08:00","19:00"],["08:00","19:00"],["08:00","19:00"],["08:00","19:00"],["08:00","19:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Asker",
    slug: "asker",
    street: "Røykenveien 136",
    postalCode: "1386",
    city: "Asker",
    phone: "66 78 10 01",
    email: "asker@fargerike.no",
    lat: 59.833, lng: 10.435,
    hours: makeHours(
      ["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Askøy",
    slug: "askoy",
    street: "Juvikflaten 33",
    postalCode: "5308",
    city: "Kleppestø",
    phone: "55 28 91 97",
    email: "askoy@fargerike.no",
    lat: 60.397, lng: 5.199,
    hours: makeHours(
      ["10:00","18:00"],["10:00","18:00"],["10:00","18:00"],["10:00","18:00"],["10:00","18:00"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Bjugn",
    slug: "bjugn",
    street: "Emil Schanches gate 10B",
    postalCode: "7160",
    city: "Bjugn",
    phone: "72 52 88 50",
    email: "bjugn@fargerike.no",
    lat: 63.754, lng: 9.813,
    hours: makeHours(
      ["08:00","17:00"],["08:00","17:00"],["08:00","17:00"],["08:00","17:00"],["08:00","17:00"],
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Bjørvik",
    slug: "sandefjord",
    street: "Pindsleveien 1",
    postalCode: "3221",
    city: "Sandefjord",
    phone: "33 42 17 30",
    email: "bjorvik@fargerike.no",
    lat: 59.131, lng: 10.217,
    hours: makeHours(
      ["07:00","17:00"],["07:00","17:00"],["07:00","17:00"],["07:00","18:00"],["07:00","17:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Breivika",
    slug: "breivika",
    street: "Postvegen 2",
    postalCode: "6018",
    city: "Ålesund",
    phone: "70 30 11 70",
    email: "breivika@fargerike.no",
    lat: 62.474, lng: 6.190,
    hours: makeHours(
      ["07:30","18:00"],["07:30","18:00"],["07:30","18:00"],["07:30","18:00"],["07:30","18:00"],
      ["10:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Bretun",
    slug: "bretun",
    street: "Varnaveien 7",
    postalCode: "1524",
    city: "Moss",
    phone: "69 25 11 08",
    email: "bretun@fargerike.no",
    lat: 59.434, lng: 10.659,
    hours: makeHours(
      ["07:00","18:00"],["07:00","18:00"],["07:00","18:00"],["07:00","18:00"],["07:00","18:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Bø",
    slug: "bo",
    street: "Bøgata 28",
    postalCode: "3800",
    city: "Bø i Telemark",
    phone: "35 95 13 50",
    email: "bo@fargerike.no",
    lat: 59.410, lng: 9.065,
    hours: makeHours(
      ["07:00","17:00"],["07:00","17:00"],["07:00","17:00"],["07:00","17:00"],["07:00","18:00"],
      ["09:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Bygg/Miljø",
    slug: "klepp",
    street: "K.K. Kleppesvei 1",
    postalCode: "4350",
    city: "Kleppe",
    phone: "51 42 19 44",
    email: "byggmiljo@fargerike.no",
    lat: 58.774, lng: 5.635,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","19:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Bømlo",
    slug: "bomlo",
    street: "Svortlandsvegen 79",
    postalCode: "5430",
    city: "Bremnes",
    phone: "53 42 04 15",
    email: "bomlo@fargerike.no",
    lat: 59.774, lng: 5.238,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Bodø",
    slug: "bodo",
    street: "Verkstedveien 7",
    postalCode: "8008",
    city: "Bodø",
    phone: "75 50 05 40",
    email: "malerstuabodo@fargerike.no",
    lat: 67.280, lng: 14.405,
    hours: makeHours(
      ["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike C.Kristoffersen Horten",
    slug: "horten",
    street: "Trimveien 41",
    postalCode: "3188",
    city: "Horten",
    phone: "33 08 31 00",
    email: "c.kristoffersen@fargerike.no",
    lat: 59.418, lng: 10.477,
    hours: makeHours(
      ["07:00","19:00"],["07:00","19:00"],["07:00","19:00"],["07:00","19:00"],["07:00","19:00"],
      ["09:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Christensen",
    slug: "arendal-christensen",
    street: "Åsbieveien 12",
    postalCode: "4848",
    city: "Arendal",
    phone: "37 00 60 10",
    email: "christensen@fargerike.no",
    lat: 58.461, lng: 8.772,
    hours: makeHours(
      ["07:00","19:00"],["07:00","19:00"],["07:00","19:00"],["07:00","19:00"],["07:00","19:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Christoffersen Porsgrunn",
    slug: "porsgrunn",
    street: "Skippergata 12",
    postalCode: "3921",
    city: "Porsgrunn",
    phone: "41 53 47 07",
    email: "christoffersen.porsgrunn@fargerike.no",
    lat: 59.140, lng: 9.656,
    hours: makeHours(
      ["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Christoffersen Skien",
    slug: "skien",
    street: "Rødmyrsvingen 53",
    postalCode: "3740",
    city: "Skien",
    phone: "41 53 47 01",
    email: "christoffersen@fargerike.no",
    lat: 59.210, lng: 9.607,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","19:00"],["09:00","17:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Colibri",
    slug: "drammen-colibri",
    street: "Åslyveien 9",
    postalCode: "3023",
    city: "Drammen",
    phone: "32 23 49 00",
    email: "colibri@fargerike.no",
    lat: 59.737, lng: 10.188,
    hours: makeHours(
      ["08:00","17:00"],["08:00","17:00"],["08:00","17:00"],["08:00","19:00"],["08:00","17:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Corona Søgne",
    slug: "sogne",
    street: "Linnegrøvan 19",
    postalCode: "4640",
    city: "Søgne",
    phone: "97 63 80 00",
    email: "coronasogne@fargerike.no",
    lat: 58.094, lng: 7.784,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","19:00"],["09:00","17:00"],
      ["09:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Corona Sørlandsparken",
    slug: "kristiansand",
    street: "Barstølveien 5B",
    postalCode: "4636",
    city: "Kristiansand",
    phone: "97 63 80 00",
    email: "coronasorlandsparken@fargerike.no",
    lat: 58.153, lng: 8.072,
    hours: makeHours(
      ["10:00","19:00"],["10:00","19:00"],["10:00","19:00"],["10:00","19:00"],["10:00","18:00"],
      ["10:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Dikeveien",
    slug: "fredrikstad-dikeveien",
    street: "Dikeveien 35",
    postalCode: "1661",
    city: "Rolvsøy",
    phone: "69 33 33 23",
    email: "dikeveien@fargerike.no",
    lat: 59.279, lng: 11.023,
    hours: makeHours(
      ["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Dokka Farge og Miljø",
    slug: "dokka",
    street: "Bergfossenteret, Storgata 20",
    postalCode: "2870",
    city: "Dokka",
    phone: "61 11 15 99",
    email: "dokka@fargerike.no",
    lat: 60.828, lng: 10.066,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Enes og Olsen Verdal",
    slug: "verdal",
    street: "Johannes Bruns gate 9",
    postalCode: "7650",
    city: "Verdal",
    phone: "74 07 51 10",
    email: "enesogolsenverdal@fargerike.no",
    lat: 63.793, lng: 11.484,
    hours: makeHours(
      ["09:00","16:30"],["09:00","16:30"],["09:00","16:30"],["09:00","18:00"],["09:00","16:30"],
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Evje",
    slug: "evje",
    street: "Nils Heglandsveg 22",
    postalCode: "4735",
    city: "Evje",
    phone: "37 93 08 73",
    email: "evje@fargerike.no",
    lat: 58.590, lng: 7.811,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Finnsnes",
    slug: "finnsnes",
    street: "Sandvikveien 118",
    postalCode: "9300",
    city: "Finnsnes",
    phone: "77 84 09 94",
    email: "finnsnes@fargerike.no",
    lat: 69.234, lng: 17.980,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Flisa",
    slug: "flisa",
    street: "Kaffegata 26",
    postalCode: "2270",
    city: "Flisa",
    phone: "62 95 13 37",
    email: "flisa@fargerike.no",
    lat: 60.618, lng: 12.012,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Florø",
    slug: "floro",
    street: "Hjellegata 3",
    postalCode: "6900",
    city: "Florø",
    phone: "57 74 03 66",
    email: "floro@fargerike.no",
    lat: 61.600, lng: 5.032,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Førde",
    slug: "forde",
    street: "Øyane 2",
    postalCode: "6800",
    city: "Førde",
    phone: "57 82 99 50",
    email: "forde@fargerike.no",
    lat: 61.452, lng: 5.857,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Gjert",
    slug: "holmestrand",
    street: "Kleivbrottet 10",
    postalCode: "3084",
    city: "Holmestrand",
    phone: "33 05 22 26",
    email: "gjert@fargerike.no",
    lat: 59.489, lng: 10.313,
    hours: makeHours(
      ["07:30","17:00"],["07:30","17:00"],["07:30","17:00"],["07:30","17:00"],["07:30","17:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Grimstad",
    slug: "grimstad",
    street: "Odden 4",
    postalCode: "4876",
    city: "Grimstad",
    phone: "37 25 28 00",
    email: "grimstad@fargerike.no",
    lat: 58.340, lng: 8.593,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Halvorsen",
    slug: "varhaug",
    street: "Skulegata 13",
    postalCode: "4360",
    city: "Varhaug",
    phone: "51 43 61 00",
    email: "halvorsen@fargerike.no",
    lat: 58.618, lng: 5.644,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Hamar",
    slug: "hamar",
    street: "Lars Hollos gate 1",
    postalCode: "2311",
    city: "Hamar",
    phone: "62 35 35 55",
    email: "hamar@fargerike.no",
    lat: 60.794, lng: 11.068,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Hareid",
    slug: "hareid",
    street: "Strandgata 121",
    postalCode: "6060",
    city: "Hareid",
    phone: "70 09 26 90",
    email: "hareid@fargerike.no",
    lat: 62.370, lng: 5.963,
    hours: makeHours(
      ["09:00","16:30"],["09:00","16:30"],["09:00","16:30"],["09:00","18:00"],["09:00","18:00"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Harstad",
    slug: "harstad-interior",
    street: "Hans Egedesgate 19",
    postalCode: "9406",
    city: "Harstad",
    phone: "977 19 650",
    email: "butikk@fargerikeharstad.no",
    lat: 68.800, lng: 16.541,
    hours: makeHours(
      ["09:00","16:30"],["09:00","16:30"],["09:00","16:30"],["09:00","18:00"],["09:00","16:30"],
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Raglamyr",
    slug: "haugesund",
    street: "Longhammervn 21",
    postalCode: "5536",
    city: "Haugesund",
    phone: "52 70 47 47",
    email: "raglamyr@fargerike.no",
    lat: 59.403, lng: 5.289,
    hours: makeHours(
      ["09:00","19:00"],["09:00","19:00"],["09:00","19:00"],["09:00","19:00"],["09:00","19:00"],
      ["10:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Hemsedal",
    slug: "hemsedal",
    street: "Hemsedalsvg 2569",
    postalCode: "3560",
    city: "Hemsedal",
    phone: "40 06 00 02",
    email: "hemsedal@fargerike.no",
    lat: 60.860, lng: 8.564,
    hours: makeHours(
      ["09:00","16:30"],["09:00","16:30"],["09:00","16:30"],["09:00","16:30"],["09:00","16:30"],
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Herøy",
    slug: "heroy",
    street: "Rådhusgata 3",
    postalCode: "6099",
    city: "Fosnavåg",
    phone: "70 08 96 25",
    email: "heroy@fargerike.no",
    lat: 62.344, lng: 5.632,
    hours: makeHours(
      ["09:30","17:00"],["09:30","17:00"],["09:30","17:00"],["09:30","18:00"],["09:30","17:00"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Hjelle",
    slug: "eikelandsosen",
    street: "Leiro 25",
    postalCode: "5640",
    city: "Eikelandsosen",
    phone: "56 58 15 25",
    email: "hjelle@fargerike.no",
    lat: 60.231, lng: 5.833,
    hours: makeHours(
      ["10:00","18:00"],["10:00","18:00"],["10:00","18:00"],["10:00","18:00"],["10:00","18:00"],
      ["10:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Hjertenes Jernvare",
    slug: "jorpeland",
    street: "Direktør Sæthersgate 34",
    postalCode: "4100",
    city: "Jørpeland",
    phone: "51 74 72 04",
    email: "hjertenes@fargerike.no",
    lat: 59.020, lng: 6.050,
    hours: makeHours(
      ["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Husnes",
    slug: "husnes",
    street: "Sentrumsvegen 41",
    postalCode: "5460",
    city: "Husnes",
    phone: "53 47 17 28",
    email: "husnes@fargerike.no",
    lat: 59.870, lng: 5.762,
    hours: makeHours(
      ["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Husby Fagsenter",
    slug: "namsos",
    street: "Klingavegen 10",
    postalCode: "7800",
    city: "Namsos",
    phone: "74 27 07 01",
    email: "butikk@husby-as.no",
    lat: 64.467, lng: 11.495,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Kjøstelsen",
    slug: "fredrikstad-kjostelsen",
    street: "Floaveien 4",
    postalCode: "1610",
    city: "Fredrikstad",
    phone: "69 36 74 50",
    email: "kjostelsen@fargerike.no",
    lat: 59.210, lng: 10.940,
    hours: makeHours(
      ["08:00","17:00"],["08:00","17:00"],["08:00","17:00"],["08:00","17:00"],["08:00","17:00"],
      ["09:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Knarvik",
    slug: "knarvik",
    street: "Kvassnesvegen 11",
    postalCode: "5914",
    city: "Isdalstø",
    phone: "91 31 63 58",
    email: "knarvik@fargerike.no",
    lat: 60.545, lng: 5.276,
    hours: makeHours(
      ["08:00","18:00"],["08:00","18:00"],["08:00","18:00"],["08:00","20:00"],["08:00","20:00"],
      ["09:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Kolbotn",
    slug: "kolbotn",
    street: "Sønsterudveien 32",
    postalCode: "1412",
    city: "Sofiemyr",
    phone: "66 80 80 20",
    email: "kolbotn@fargerike.no",
    lat: 59.803, lng: 10.826,
    hours: makeHours(
      ["10:00","18:00"],["10:00","18:00"],["10:00","18:00"],["10:00","18:00"],["10:00","18:00"],
      ["10:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Kongsberg",
    slug: "kongsberg",
    street: "Kongensgate 6",
    postalCode: "3611",
    city: "Kongsberg",
    phone: "32 73 11 09",
    email: "kongsberg@fargerike.no",
    lat: 59.664, lng: 9.651,
    hours: makeHours(
      ["08:00","19:00"],["08:00","19:00"],["08:00","19:00"],["08:00","19:00"],["08:00","19:00"],
      ["10:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Kvinesdal",
    slug: "kvinesdal",
    street: "Industrigata 2",
    postalCode: "4480",
    city: "Kvinesdal",
    phone: "41 50 15 26",
    email: "kvinesdal@fargerike.no",
    lat: 58.310, lng: 6.968,
    hours: makeHours(
      ["09:00","16:00"],["09:00","16:00"],["09:00","16:00"],["09:00","18:00"],["09:00","16:00"],
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Larvik",
    slug: "larvik",
    street: "Løkka 6",
    postalCode: "3271",
    city: "Larvik",
    phone: "48 28 25 49",
    email: "larvik@fargerike.no",
    lat: 59.053, lng: 10.028,
    hours: makeHours(
      ["07:00","19:00"],["07:00","19:00"],["07:00","19:00"],["07:00","19:00"],["07:00","19:00"],
      ["10:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Levanger",
    slug: "levanger",
    street: "Trekanten 4",
    postalCode: "7604",
    city: "Levanger",
    phone: "74 01 60 00",
    email: "levanger@fargerike.no",
    lat: 63.746, lng: 11.299,
    hours: makeHours(
      ["09:00","16:00"],["09:00","16:00"],["09:00","16:00"],["09:00","16:00"],["09:00","16:00"],
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Lillesand",
    slug: "lillesand",
    street: "Senterveien 4",
    postalCode: "4790",
    city: "Lillesand",
    phone: "98 90 21 97",
    email: "lillesand@fargerike.no",
    lat: 58.249, lng: 8.379,
    hours: makeHours(
      ["08:00","17:00"],["08:00","17:00"],["08:00","17:00"],["08:00","17:00"],["08:00","17:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Ragnvald Moe",
    slug: "lillehammer",
    street: "Storgata 115",
    postalCode: "2615",
    city: "Lillehammer",
    phone: "61 25 15 20",
    email: "ragnvaldmoe@fargerike.no",
    lat: 61.115, lng: 10.466,
    hours: makeHours(
      ["07:00","17:00"],["07:00","17:00"],["07:00","17:00"],["07:00","17:00"],["07:00","17:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Lothe & Motzfeldt",
    slug: "drammen-lothe",
    street: "Bjørnstjerne Bjørnsons Gate 86",
    postalCode: "3044",
    city: "Drammen",
    phone: "32 23 47 80",
    email: "lothe@fargerike.no",
    lat: 59.737, lng: 10.210,
    hours: makeHours(
      ["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Lunde",
    slug: "lunde",
    street: "Hovedgata 7",
    postalCode: "3825",
    city: "Lunde",
    phone: "35 94 72 50",
    email: "lunde@fargerike.no",
    lat: 59.297, lng: 9.065,
    hours: makeHours(
      ["08:30","17:00"],["08:30","17:00"],["08:30","17:00"],["08:30","18:00"],["08:30","18:00"],
      ["08:30","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Majorstuen",
    slug: "oslo-majorstuen",
    street: "Sørkedalsveien 10",
    postalCode: "0369",
    city: "Oslo",
    phone: "95 40 60 10",
    email: "majorstuen@fargerike.no",
    lat: 59.929, lng: 10.717,
    hours: makeHours(
      ["06:30","18:00"],["06:30","18:00"],["06:30","18:00"],["06:30","19:00"],["06:30","19:00"],
      ["08:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Malerboden",
    slug: "stord",
    street: "Meatjønnshaugen 4",
    postalCode: "5412",
    city: "Stord",
    phone: "53 40 21 70",
    email: "malerboden@fargerike.no",
    lat: 59.779, lng: 5.498,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Malerbua",
    slug: "farsund",
    street: "Åptaveien 30",
    postalCode: "4550",
    city: "Farsund",
    phone: "38 39 02 63",
    email: "malerbua@fargerike.no",
    lat: 58.094, lng: 6.808,
    hours: makeHours(
      ["08:00","17:00"],["08:00","17:00"],["08:00","17:00"],["08:00","18:00"],["08:00","17:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Malern",
    slug: "mysen",
    street: "Folkenborgv. 1",
    postalCode: "1850",
    city: "Mysen",
    phone: "69 84 69 60",
    email: "malern@fargerike.no",
    lat: 59.553, lng: 11.325,
    hours: makeHours(
      ["08:00","17:00"],["08:00","17:00"],["08:00","17:00"],["08:00","19:00"],["08:00","17:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Mandal",
    slug: "mandal",
    street: "Kastellgt 11-13",
    postalCode: "4514",
    city: "Mandal",
    phone: "38 27 10 50",
    email: "mandal@fargerike.no",
    lat: 58.029, lng: 7.461,
    hours: makeHours(
      ["09:00","16:30"],["09:00","16:30"],["09:00","16:30"],["09:00","17:00"],["09:00","16:30"],
      ["09:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Manglerud",
    slug: "fargerike-manglerud",
    street: "Plogveien 6",
    postalCode: "0679",
    city: "Oslo",
    phone: "63 97 00 00",
    email: "manglerud@fargerike.no",
    lat: 59.893, lng: 10.810,
    hours: makeHours(
      ["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],
      ["10:00","18:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Meyer",
    slug: "tonsberg",
    street: "Måkeveien 2b",
    postalCode: "3112",
    city: "Tønsberg",
    phone: "33 31 13 12",
    email: "meyer@fargerike.no",
    lat: 59.273, lng: 10.408,
    hours: makeHours(
      ["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],
      ["09:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Moldehallen",
    slug: "molde",
    street: "Verftsgata 10",
    postalCode: "6416",
    city: "Molde",
    phone: "71 24 34 50",
    email: "molde@fargerike.no",
    lat: 62.737, lng: 7.161,
    hours: makeHours(
      ["07:30","19:00"],["07:30","19:00"],["07:30","19:00"],["07:30","19:00"],["07:30","19:00"],
      ["10:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Måløy",
    slug: "maloy",
    street: "Gate 1 nr. 70",
    postalCode: "6700",
    city: "Måløy",
    phone: "57 85 53 00",
    email: "maloy@fargerike.no",
    lat: 61.934, lng: 5.113,
    hours: makeHours(
      ["09:00","16:30"],["09:00","16:30"],["09:00","16:30"],["09:00","18:00"],["09:00","16:00"],
      ["09:30","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Nordås",
    slug: "bergen-nordas",
    street: "Nordåsdalen 21",
    postalCode: "5235",
    city: "Rådal",
    phone: "92 01 54 41",
    email: "nordas@fargerike.no",
    lat: 60.332, lng: 5.356,
    hours: makeHours(
      CLOSED, ["10:00","20:00"],["10:00","20:00"], CLOSED, CLOSED,
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Norheimsund",
    slug: "norheimsund",
    street: "Sandvenvegen 39A",
    postalCode: "5600",
    city: "Norheimsund",
    phone: "56 55 17 33",
    email: "norheimsund@fargerike.no",
    lat: 60.365, lng: 6.148,
    hours: makeHours(
      ["09:00","16:30"],["09:00","16:30"],["09:00","16:30"],["09:00","18:00"],["09:00","16:30"],
      ["09:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Os",
    slug: "os",
    street: "Hamnevegen 54",
    postalCode: "5200",
    city: "Os",
    phone: "56 30 03 80",
    email: "os@fargerike.no",
    lat: 60.190, lng: 5.465,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","18:00"],["09:00","18:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Reinaas",
    slug: "trondheim-reinaas",
    street: "Ivar Lykkesvei 4",
    postalCode: "7075",
    city: "Tiller",
    phone: "72 84 62 10",
    email: "reinaas@fargerike.no",
    lat: 63.364, lng: 10.377,
    hours: makeHours(
      ["09:00","20:00"],["09:00","20:00"],["09:00","20:00"],["09:00","20:00"],["09:00","18:00"],
      ["10:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Sandane",
    slug: "sandane",
    street: "Norstrandvegen 17 E",
    postalCode: "6823",
    city: "Sandane",
    phone: "57 86 91 95",
    email: "sandane@fargerike.no",
    lat: 61.773, lng: 6.218,
    hours: makeHours(
      ["08:00","16:30"],["08:00","16:30"],["08:00","16:30"],["08:00","16:30"],["08:00","16:30"],
      ["10:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Sande",
    slug: "sande",
    street: "Revåvveien 5",
    postalCode: "3070",
    city: "Sande",
    phone: "33 78 58 21",
    email: "sande@fargerike.no",
    lat: 59.594, lng: 10.219,
    hours: makeHours(
      ["08:00","19:00"],["08:00","19:00"],["08:00","19:00"],["08:00","19:00"],["08:00","19:00"],
      ["09:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Sarpsborg",
    slug: "sarpsborg",
    street: "Borggate 8",
    postalCode: "1721",
    city: "Sarpsborg",
    phone: "69 14 83 60",
    email: "sarpsborg@fargerike.no",
    lat: 59.284, lng: 11.109,
    hours: makeHours(
      ["08:00","17:00"],["08:00","17:00"],["08:00","17:00"],["08:00","17:00"],["08:00","17:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Sivertsen",
    slug: "vestnes",
    street: "Kaigata 31",
    postalCode: "6390",
    city: "Vestnes",
    phone: "71 18 01 50",
    email: "sivertsen@fargerike.no",
    lat: 62.617, lng: 7.020,
    hours: makeHours(
      ["10:00","18:00"],["10:00","18:00"],["10:00","15:00"], CLOSED, CLOSED,
      ["10:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Skadberg Hansen",
    slug: "egersund",
    street: "Nytorget 2",
    postalCode: "4370",
    city: "Egersund",
    phone: "51 49 03 94",
    email: "skadberghansen@fargerike.no",
    lat: 58.452, lng: 5.999,
    hours: makeHours(
      ["08:30","16:30"],["08:30","16:30"],["08:30","16:30"],["08:30","18:00"],["08:30","16:30"],
      ["09:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Sletvold",
    slug: "jessheim",
    street: "Ringveien 23",
    postalCode: "2066",
    city: "Jessheim",
    phone: "63 97 06 09",
    email: "sletvold@fargerike.no",
    lat: 60.143, lng: 11.174,
    hours: makeHours(
      ["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","19:00"],["09:00","18:00"],
      ["09:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Sogndal",
    slug: "sogndal",
    street: "Parkvegen 17",
    postalCode: "6856",
    city: "Sogndal",
    phone: "57 67 12 77",
    email: "sogndal@fargerike.no",
    lat: 61.229, lng: 7.094,
    hours: makeHours(
      ["09:00","16:30"],["09:00","16:30"],["09:00","16:30"],["09:00","18:00"],["09:00","16:30"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Sortland",
    slug: "sortland",
    street: "Strandgata 26",
    postalCode: "8400",
    city: "Sortland",
    phone: "94 85 88 95",
    email: "sortland@fargerike.no",
    lat: 68.694, lng: 15.413,
    hours: makeHours(
      ["09:00","19:00"],["09:00","19:00"],["09:00","19:00"],["09:00","19:00"],["09:00","19:00"],
      ["10:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Stavanger",
    slug: "stavanger",
    street: "Badehusgata 6",
    postalCode: "4014",
    city: "Stavanger",
    phone: "51 89 09 60",
    email: "stavanger@fargerike.no",
    lat: 58.970, lng: 5.733,
    hours: makeHours(
      ["06:45","18:00"],["06:45","18:00"],["06:45","18:00"],["06:45","18:00"],["06:45","18:00"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Strømmen",
    slug: "strommen",
    street: "Strømsveien 61",
    postalCode: "2010",
    city: "Strømmen",
    phone: "63 81 64 40",
    email: "teppesalongen@fargerike.no",
    lat: 59.937, lng: 11.045,
    hours: makeHours(
      ["10:00","17:00"],["10:00","17:00"],["10:00","17:00"],["10:00","17:00"],["10:00","17:00"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Sunde",
    slug: "nordfjordeid",
    street: "Leirongane 1",
    postalCode: "6770",
    city: "Nordfjordeid",
    phone: "57 86 03 77",
    email: "sunde@fargerike.no",
    lat: 61.906, lng: 5.988,
    hours: makeHours(
      ["09:00","16:30"],["09:00","16:30"],["09:00","16:30"],["09:00","16:30"],["09:00","16:30"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Syvde",
    slug: "syvde",
    street: "Gnr 89 Bnr 156",
    postalCode: "6140",
    city: "Syvde",
    phone: "70 02 08 00",
    email: "syvde@fargerike.no",
    lat: 62.092, lng: 5.695,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Torkelsen",
    slug: "odda",
    street: "Eitrheimsvegen 18",
    postalCode: "5750",
    city: "Odda",
    phone: "53 64 24 80",
    email: "torkelsen@fargerike.no",
    lat: 60.070, lng: 6.546,
    hours: makeHours(
      ["08:00","16:30"],["08:00","16:30"],["08:00","16:30"],["08:00","17:00"],["08:00","16:30"],
      ["09:00","14:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Tromsø",
    slug: "tromso",
    street: "Storgata 142",
    postalCode: "9008",
    city: "Tromsø",
    phone: "77 68 66 15",
    email: "tromso@fargerike.no",
    lat: 69.649, lng: 18.955,
    hours: makeHours(
      ["08:30","17:00"],["08:30","17:00"],["08:30","17:00"],["08:30","17:00"],["08:30","17:00"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Tvilde",
    slug: "voss",
    street: "Regimentsvegen 3",
    postalCode: "5705",
    city: "Voss",
    phone: "56 52 31 00",
    email: "tvilde@fargerike.no",
    lat: 60.629, lng: 6.412,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","18:00"],["09:00","17:00"],
      ["09:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Valdres",
    slug: "valdres",
    street: "Markavegen 11",
    postalCode: "2920",
    city: "Leira",
    phone: "61 36 06 11",
    email: "valdres@fargerike.no",
    lat: 61.104, lng: 9.372,
    hours: makeHours(
      ["07:00","17:00"],["07:00","17:00"],["07:00","17:00"],["07:00","19:00"],["07:00","19:00"],
      ["10:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Åsgårdstrand",
    slug: "asgardstrand",
    street: "Grev Wedels gate 46",
    postalCode: "3179",
    city: "Åsgårdstrand",
    phone: "94 00 13 90",
    email: "asgardstrand@fargerike.no",
    lat: 59.347, lng: 10.459,
    hours: makeHours(
      ["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],
      ["09:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Ørsta",
    slug: "orsta",
    street: "Vikegata 17",
    postalCode: "6150",
    city: "Ørsta",
    phone: "92 03 46 22",
    email: "orsta@fargerike.no",
    lat: 62.197, lng: 6.127,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Østerlie",
    slug: "trondheim-osterlie",
    street: "Haakon VIIs gate 19",
    postalCode: "7041",
    city: "Trondheim",
    phone: "73 80 78 78",
    email: "osterlie@fargerike.no",
    lat: 63.430, lng: 10.395,
    hours: makeHours(
      ["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],["09:00","18:00"],
      ["10:00","16:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Ås",
    slug: "aas",
    street: "Moerveien 4",
    postalCode: "1430",
    city: "Ås",
    phone: "64 94 06 50",
    email: "as@fargerike.no",
    lat: 59.660, lng: 10.790,
    hours: makeHours(
      ["09:00","17:00"],["09:00","17:00"],["09:00","17:00"],["09:00","18:00"],["09:00","17:00"],
      ["10:00","15:00"], CLOSED
    ),
  },
  {
    name: "Fargerike Åsane",
    slug: "asane",
    street: "Åsane Storsenter 40",
    postalCode: "5116",
    city: "Ulset",
    phone: "94 05 87 63",
    email: "asane@fargerike.no",
    lat: 60.466, lng: 5.332,
    hours: makeHours(
      ["09:00","21:00"],["09:00","21:00"],["09:00","21:00"],["09:00","21:00"],["09:00","21:00"],
      ["10:00","18:00"], CLOSED
    ),
  },
];

// ---------------------------------------------------------------------------
// 6. Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(`=== Create ALL Fargerike stores (${stores.length} total) ===\n`);

  // Step 1: Delete all existing store documents
  console.log("Step 1: Deleting existing store documents...");
  const existingStores = await client.fetch(
    `*[_type == "store"]{ _id, name }`
  );
  console.log(`  Found ${existingStores.length} existing store(s) to delete.`);

  for (const existing of existingStores) {
    await client.delete(existing._id);
    console.log(`  DELETED  ${existing.name} (${existing._id})`);
  }

  // Also delete any draft versions
  const draftStores = await client.fetch(
    `*[_type == "store" && _id match "drafts.*"]{ _id, name }`
  );
  for (const draft of draftStores) {
    await client.delete(draft._id);
    console.log(`  DELETED DRAFT  ${draft.name} (${draft._id})`);
  }

  console.log("");

  // Step 2: Create all stores
  console.log("Step 2: Creating stores...\n");
  let created = 0;
  let errors = 0;

  for (const store of stores) {
    try {
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
        openingHours: store.hours,
      };

      const result = await client.create(doc);
      console.log(`  CREATE  ${store.name} (${store.city}) → ${result._id}`);
      created++;
    } catch (err) {
      console.error(`  ERROR   ${store.name}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\n=== Done: ${created} created, ${errors} errors ===`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
