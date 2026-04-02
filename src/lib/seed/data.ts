// Ekte seed-data basert på Jotun Lady Pure Color + Warm Blush 2856
// Brukes som statisk data inntil Sanity er koblet opp

export const SEED_COLORS = {
  warmBlush: {
    _id: "color-warm-blush",
    _type: "color" as const,
    name: "Warm Blush",
    colorCode: "2856",
    slug: { current: "jotun-2856-warm-blush" },
    hexValue: "#ab8073",
    ncsCode: "S 3923-Y74R",
    brand: "Jotun",
    colorChart: "SENS by Jotun",
    colorFamily: "Rosa / rød",
    usage: ["interior"],
    description:
      "En myk, gyllenrosa tone som omslutter rommet i varme. Warm Blush balanserer mellom rødlig og rosa – ikke helt det ene, ikke helt det andre. Fargen gir en intim, lun atmosfære som fungerer like godt i soverommet som i en koselig lesekrok. Best på vegger som får naturlig dagslys.",
    environmentImages: [
      {
        url: "https://www.jotun.com/contentassetsjot03/62f4f97830d1467f8f14b7080d8441ba/039_jotun-sens-2856-warm-blush_2880x2960_tcm308-168755",
        alt: "Soverom med Warm Blush på veggene – lunt og intimt",
        caption: "Soverom i Warm Blush gir en rolig, varm atmosfære",
        room: "bedroom",
      },
      {
        url: "https://www.jotun.com/contentassetsjot03/b4c6ad806219485685df1c40bca99711/049_jotun-sens-2856-warm-blush_750x1124_tcm301-168786",
        alt: "Detalj fra soverom med Warm Blush og naturmaterialer",
        caption: "Naturmaterialer og Warm Blush skaper harmoni",
        room: "bedroom",
      },
      {
        url: "https://www.jotun.com/contentassetsjot03/7207c0516de34f618ad580c4e2e8189e/jotun-bedroom-2856-warm-blush-10580-soft-skin_1408x1760.jpg",
        alt: "Soverom med Warm Blush og Soft Skin – tofarget veggløsning",
        caption: "Kombiner Warm Blush med Soft Skin for en tofarget veggløsning",
        room: "bedroom",
      },
    ],
    compatibleProducts: [
      {
        surfaceType: "Veggmaling",
        productSlug: "lady-pure-color",
        productName: "Lady Pure Color",
        shortDescription: "Supermatt, ekstremt slitesterk. Jotuns vakreste veggmaling.",
      },
      {
        surfaceType: "Veggmaling",
        productSlug: "lady-wonderwall",
        productName: "Lady Wonderwall",
        shortDescription: "Matt, superenkel å påføre. Perfekt for nybegynnere.",
      },
      {
        surfaceType: "Veggmaling",
        productSlug: "lady-balance",
        productName: "Lady Balance",
        shortDescription: "Klimabevisst valg. Svanemerket med lavest mulig fotavtrykk.",
      },
      {
        surfaceType: "Takmaling",
        productSlug: "lady-pure-color",
        productName: "Lady Pure Color",
        shortDescription: "Helmatt finish som eliminerer refleksjoner i taket.",
      },
      {
        surfaceType: "Tre & panel",
        productSlug: "lady-supreme-finish",
        productName: "Lady Supreme Finish",
        shortDescription: "For listverk, dører og panel. Silkematt, slitesterk.",
      },
    ],
    relatedColors: [
      { name: "Soft Skin", colorCode: "10580", hexValue: "#d4bfb2", ncsCode: "S 1510-Y60R", slug: "jotun-10580-soft-skin" },
      { name: "Pebblestone", colorCode: "1877", hexValue: "#96938b", ncsCode: "S 3005-Y20R", slug: "jotun-1877-pebblestone" },
      { name: "Skylight", colorCode: "1624", hexValue: "#f2f1e8", ncsCode: "S 0804-Y10R", slug: "jotun-1624-skylight" },
      { name: "Golden Walnut", colorCode: "1974", hexValue: "#8a7e6f", ncsCode: "S 4005-Y50R", slug: "jotun-1974-golden-walnut" },
    ],
    complementaryColors: [
      { name: "Sky", colorCode: "1350", hexValue: "#bcb7ac", slug: "jotun-1350-sky" },
      { name: "Soft Skin", colorCode: "10580", hexValue: "#d4bfb2", slug: "jotun-10580-soft-skin" },
    ],
    faq: [
      {
        question: "Hva er NCS-koden for Warm Blush?",
        answer: "NCS-koden er S 3923-Y74R. Denne koden kan brukes hos alle malingforhandlere for å få en identisk farge, uavhengig av merke.",
      },
      {
        question: "Hvilke rom passer Warm Blush best til?",
        answer: "Warm Blush er en varm, myk tone som fungerer spesielt godt i soverom, stue og lesekroker. Fargen er mest flatterende i rom med naturlig dagslys fra nord eller øst. I rom med sterkt sørlys kan fargen oppleves noe mer intens.",
      },
      {
        question: "Kan jeg bruke Warm Blush på alle vegger i rommet?",
        answer: "Ja, men for et mer dynamisk uttrykk anbefaler vi å kombinere med en lysere tone som Soft Skin (10580) eller Skylight (1624) på enkelte vegger. Se miljøbildene for inspirasjon.",
      },
      {
        question: "Hvordan ser Warm Blush ut sammenlignet med lignende farger?",
        answer: "Warm Blush er varmere og mer rødlig enn Pebblestone (1877), men betydelig lysere enn terrakotta-toner. Den har en gyllen undertone som skiller den fra rene rosa-farger.",
      },
    ],
  },
};

export const SEED_PRODUCTS = {
  ladyPureColor: {
    _id: "product-lady-pure-color",
    _type: "product" as const,
    sku: "14280",
    displayName: "Lady Pure Color",
    subtitle: "Supermatt veggmaling for tørre rom innendørs",
    slug: { current: "lady-pure-color" },
    brand: "Jotun",
    productLine: "Lady",
    highlights: [
      "Jotuns vakreste maling – supermatt og fløyelsmyk",
      "Dekker garantert med 2 strøk",
      "VOC under 1 g/L – trygt for barnerom",
      "Svanemerket og klimavennlig",
      "Enkel å vedlikeholde – tåler vask",
    ],
    images: [
      {
        url: "https://cdn-pim.jotun.com/images/ProductImages/126075/1300x1334/126075.png",
        alt: "Lady Pure Color – malingsboks",
        imageType: "packshot",
      },
      {
        url: "https://www.jotun.com/contentassetsjot03/62f4f97830d1467f8f14b7080d8441ba/039_jotun-sens-2856-warm-blush_2880x2960_tcm308-168755",
        alt: "Vegg malt med Lady Pure Color i Warm Blush – soverom",
        imageType: "environment",
      },
      {
        url: "https://www.jotun.com/contentassetsjot03/b4c6ad806219485685df1c40bca99711/049_jotun-sens-2856-warm-blush_750x1124_tcm301-168786",
        alt: "Detalj av Lady Pure Color supermatt finish på vegg",
        imageType: "detail",
      },
      {
        url: "https://www.jotun.com/contentassetsjot03/7207c0516de34f618ad580c4e2e8189e/jotun-bedroom-2856-warm-blush-10580-soft-skin_1408x1760.jpg",
        alt: "Lady Pure Color kombinert med Soft Skin – tofarget veggløsning",
        imageType: "environment",
      },
    ],
    // Lipscore-data (mock – reelle data hentes fra Lipscore API)
    rating: { score: 4.7, count: 312 },
    // Technical
    surfaceTypes: [
      "Gips/gipsplater",
      "Betong og mur",
      "Bygningsplater",
      "Puss",
      "Tapet",
      "Sparklet underlag",
    ],
    notSuitableFor: [
      { text: "Trepanel og dører", linkedProduct: { name: "Lady Supreme Finish", slug: "lady-supreme-finish" } },
      { text: "Vinduskarmer" },
      { text: "Betonggulv" },
      { text: "Metall" },
      { text: "Utendørs overflater" },
    ],
    coverage: "8–10 m²/liter",
    coats: 2,
    dryingTimeDust: "1 time",
    dryingTimeRecoat: "2 timer",
    gloss: "01 – Helmatt",
    binderType: "Akryldispersjon (vanntynnbar, løsemiddelfri)",
    vocContent: "Maks 1 g/L (EU-grense: 30 g/L)",
    applicationMethods: ["Rull", "Pensel", "Høytrykkssprøyte"],
    cleanup: "Vann og penselrens",
    // SEO-5: identifikatorer
    gtin13: "7029350133865",
    mpn: "14280",
    googleCategory: "Bygg & anlegg > Malervarer > Veggmaling",
    // AEO-1: langbeskrivelse
    longDescription:
      "Lady Pure Color er Jotuns mest eksklusive veggmaling – en supermatt, fløyelsmyk maling som gir veggene et dypt, rikt utseende uten refleksjoner. Med VOC-innhold på under 1 g/L er den trygg for alle rom, inkludert barnerom og soverom. Svanemerket og ISO 14001-sertifisert, med dokumentert klimaavtrykk via EPD. Dekker garantert med to strøk, er enkel å vedlikeholde, og tåler vanlig vask med fuktig klut. Tilgjengelig i alle Lady-kulører og i størrelsene 0.68 L, 2.7 L og 9 L.",
    certifications: [
      { name: "Svanemerket", description: "Nordisk miljømerke – strenge krav til kjemikalier og utslipp", url: "https://svanemerket.no/miljomerkede-produkter/merkevare/jotun-lady-297/", iconType: "swan" },
      { name: "ISO 14001", description: "Miljøstyringssertifisering", url: "https://www.iso.org/iso-14001-environmental-management.html", iconType: "certificate" },
      { name: "EPD", description: "NEPD-6018-5299-NO – dokumentert klimaavtrykk (1.81 kg CO₂-eq/kg)", url: "https://www.epd-norge.no/epd/nepd-6018-5299-no", iconType: "document" },
    ],
    technicalSpecs: [
      { label: "Volumtørrstoff", value: "39 ± 2 %" },
      { label: "Minimum påføringstemperatur", value: "10 °C" },
      { label: "Tynning", value: "Ikke tynnbar – bruksklar" },
    ],
    // Variants
    variants: [
      { volume: "0.68 L", price: 299, isPopular: false, stock: "in_stock" as const },
      { volume: "2.7 L", price: 799, isPopular: true, stock: "in_stock" as const },
      { volume: "9 L", price: 1999, isPopular: false, stock: "backorder" as const, deliveryDays: 3 },
    ],
    bases: ["Hvit", "A-base", "B-base", "C-base"],
    // FAQ
    faq: [
      {
        question: "Hvor mange strøk trenger jeg?",
        answer: "Jotun garanterer dekning med 2 strøk Lady Pure Color. Når du maler over en mørkere farge, kan det i noen tilfeller være behov for et ekstra strøk.",
      },
      {
        question: "Hvor lenge må malingen tørke?",
        answer: "Lady Pure Color er støvtørr etter 1 time og kan overmales etter 2 timer (ved 23 °C og 50 % relativ luftfuktighet). Lavere temperatur eller høyere fuktighet gir lengre tørketid.",
      },
      {
        question: "Må jeg grunne først?",
        answer: "Ja, på nye og ubehandlede overflater (gips, betong, sparklet underlag) bør du grunne med en egnet grunning for jevn absorpsjon og bedre feste. På tidligere malte overflater i god stand er det normalt ikke nødvendig.",
      },
      {
        question: "Er malingen trygg for barnerom?",
        answer: "Ja. Lady Pure Color har VOC-innhold på maks 1 g/L – godt under EU-grensen på 30 g/L – og er Svanemerket. For enda lavere emisjoner finnes Jotun SENS (helt fri for løsemidler og uten lukt).",
      },
      {
        question: "Kan jeg vaske veggen etterpå?",
        answer: "Ja. Til tross for den supermatte overflaten er Lady Pure Color robust. Bruk en ren, fuktig mikrofiberklut med mildt såpevann for å fjerne flekker.",
      },
      {
        question: "Hvor mye maling trenger jeg?",
        answer: "Lady Pure Color dekker 8–10 m² per liter. For et rom på 12 m² med vegghøyde 2,4 m er veggarealet ca. 28–30 m². Med 2 strøk trenger du ca. 6–7,5 liter. En 9-liters boks gir god margin.",
      },
      {
        question: "Kan jeg bruke sprøyte?",
        answer: "Ja, Lady Pure Color kan påføres med høytrykkssprøyte. Bruk dyse 0,017\"–0,021\" og trykk 150–180 bar. Malingen er bruksklar og skal ikke tynnes.",
      },
      {
        question: "Hva gjør jeg med maleutstyr etter bruk?",
        answer: "Rengjør ruller og pensler med vann og penselrens umiddelbart etter bruk. Ikke la malingen tørke i verktøyene.",
      },
      {
        question: "Hvilke overflater kan jeg male?",
        answer: "Gips, betong/mur, bygningsplater, puss, tapet og sparklet underlag – i tørre rom innendørs. Ikke egnet for trepanel, dører, vinduskarmer, betonggulv eller metall.",
      },
    ],
    // Equipment
    recommendedEquipment: [
      { category: "Påføring", productName: "Jordan Malerrull Ultimate Jevne Flater 18 cm", description: "For vegger – jevn finish", price: 129, tag: "must-have", slug: "jordan-malerrull-ultimate-jevne-flater-18cm", imageUrl: "https://www.fargerike.no/globalassets/inriver/resources/2854018.jpg" },
      { category: "Påføring", productName: "Jordan Rullesett Perfect 18 cm", description: "Komplett sett – rull, bøyle og brett", price: 199, slug: "jordan-rullesett-perfect-jevne-flater-18cm", imageUrl: "https://www.fargerike.no/globalassets/importedresources/n/image/7200118.jpg" },
      { category: "Påføring", productName: "Jordan Superbrett", description: "Malebrett med 3,3L kapasitet", price: 199, tag: "must-have", slug: "jordan-superbrett", imageUrl: "https://www.fargerike.no/globalassets/importedresources/n/image/super-tray-ortho-view.jpg" },
      { category: "Påføring", productName: "Jordan Ultimate Carbon forlengerskaft", description: "Lett karbonfiber – for tak og høye vegger", price: 349, tag: "popular" },
      { category: "Pensler", productName: "Jordan Pensel Ultimate Skrå m/Etui", description: "Presisjon langs listverk – etui holder fuktig 72t", price: 179, tag: "must-have", slug: "jordan-pensel-ultimate-skra", imageUrl: "https://www.fargerike.no/globalassets/importedresources/n/image/4006225.png" },
      { category: "Pensler", productName: "Jordan Pensel Ultimate Innvendig Flat", description: "For taklinjer og større flater", price: 319, slug: "jordan-pensel-ultimate-innvendig-flat", imageUrl: "https://www.fargerike.no/globalassets/inriver/resources/4000110.jpg" },
      { category: "Forberedelse", productName: "Jordan Japansparkel med Grep", description: "Fyll små hull og ujevnheter", price: 89, slug: "jordan-japansparkel", imageUrl: "https://www.fargerike.no/globalassets/inriver/resources/2720050.jpg" },
      { category: "Forberedelse", productName: "Mirka slipepapir 180-korn", description: "Slip sparklet underlag jevnt", price: 39 },
      { category: "Forberedelse", productName: "Jordan Engangsmopp Malingsklar", description: "Fjern støv før maling", price: 59, tag: "new" },
      { category: "Maskering", productName: "Tesa Malertape Innvendig", description: "Standard malertape – fjernes uten limrester", price: 99, tag: "must-have", slug: "tesa-malertape-innvendig", imageUrl: "https://www.fargerike.no/globalassets/inriver/resources/56270-00000-02_li400_front_pa.jpg" },
      { category: "Maskering", productName: "Tesa Maskeringstape Precision", description: "For skarpe linjer på glatte flater", price: 69, campaignPrice: 49 },
      { category: "Beskyttelse", productName: "Dekkpapp / gjenbrukbar malingsfilt", description: "Beskytt gulv og møbler", price: 129 },
    ],
  },
};

export const SEED_ARTICLES = {
  howToPaintWall: {
    _id: "article-how-to-paint-wall",
    _type: "article" as const,
    title: "Slik maler du vegg – steg for steg",
    slug: { current: "slik-maler-du-vegg" },
    articleType: "howto",
    excerpt:
      "En komplett guide for deg som skal male innvendig vegg. Fra forberedelse og grunning til siste strøk – lær teknikken som gir profesjonelt resultat.",
    coverImage: "https://www.jotun.com/contentassetsjot03/c9495ce2752141cb9f5b88a002173cd6/jotun_soft-brown_1440x810.jpg",
    readingTime: "8 min",
    steps: [
      {
        title: "Forbered rommet",
        description: "Flytt møbler bort fra veggene eller dekk dem til. Legg dekkpapp på gulvet. Skru av listverk og kontaktdeksler der det er mulig.",
      },
      {
        title: "Vask og reparer veggen",
        description: "Vask veggen med sukkervann for å fjerne fett og støv. Fyll hull og sprekker med sparkel. La tørke og slip jevnt med 180-korn slipepapir.",
      },
      {
        title: "Masker",
        description: "Sett malertape langs listverk, vinduskarmer og tak. Bruk presisjonsteip for skarpe linjer.",
      },
      {
        title: "Grunne (ved behov)",
        description: "Nye, ubehandlede overflater trenger grunning for jevn absorpsjon. Tidligere malte vegger i god stand trenger normalt ikke grunning.",
      },
      {
        title: "Mal kanter og hjørner",
        description: "Start med å «kutte inn» langs tak, listverk og hjørner med en skråpensel. Mal ca. 5 cm fra kanten.",
      },
      {
        title: "Rull veggene",
        description: "Dypp rullen i malebrettet, rull av overskudd. Mal i W-mønster for jevn fordeling. Arbeid i felt på ca. 1 m² om gangen. Unngå å la kanten tørke – mal alltid «vått i vått».",
      },
      {
        title: "Andre strøk",
        description: "Vent minimum 2 timer (Lady Pure Color). Gjenta prosessen. Andre strøk gir endelig farge og dekning.",
      },
      {
        title: "Fjern tape og rydd",
        description: "Fjern malertape forsiktig mens siste strøk fortsatt er litt klebrig. Rengjør verktøy med vann umiddelbart.",
      },
    ],
  },
  choosingColorBedroom: {
    _id: "article-choosing-color-bedroom",
    _type: "article" as const,
    title: "Slik velger du farge til soverommet",
    slug: { current: "velge-farge-soverom" },
    articleType: "inspirasjon",
    coverImage: "https://www.jotun.com/contentassetsjot03/7207c0516de34f618ad580c4e2e8189e/jotun-bedroom-2856-warm-blush-10580-soft-skin_1408x1760.jpg",
    excerpt:
      "Soverommet er ditt mest personlige rom. Her er våre beste tips for å finne en farge som gir deg ro, varme og en god nattesøvn.",
  },
  paintSafeForKids: {
    _id: "article-paint-safe-kids",
    _type: "article" as const,
    title: "Maling til barnerom – dette bør du tenke på",
    slug: { current: "maling-barnerom-trygt" },
    articleType: "howto",
    coverImage: "https://www.jotun.com/contentassetsjot03/43d978085d3943588d9727cf6c6a489a/jotun_1939_sandbeige_1440x1480.jpg",
    excerpt:
      "VOC, lukt, merking og vaskeevne – alt du trenger å vite for å velge trygg maling til barnerommet.",
  },
};

// Produkter for PLP-visning
export const SEED_PRODUCT_LIST = [
  {
    slug: "lady-pure-color",
    displayName: "Lady Pure Color",
    subtitle: "Supermatt veggmaling",
    brand: "Jotun",
    productLine: "Lady",
    priceFrom: 299,
    imageUrl: "https://cdn-pim.jotun.com/images/ProductImages/126075/296x388/126075.png",
    highlights: ["Helmatt", "Svanemerket", "VOC < 1 g/L"],
    category: "Veggmaling",
  },
  {
    slug: "lady-wonderwall",
    displayName: "Lady Wonderwall",
    subtitle: "Matt veggmaling – enkel å påføre",
    brand: "Jotun",
    productLine: "Lady",
    priceFrom: 279,
    imageUrl: "https://cdn-pim.jotun.com/images/ProductImages/126075/296x388/126075.png",
    highlights: ["Matt", "Svanemerket", "Nybegynnervennlig"],
    category: "Veggmaling",
  },
  {
    slug: "lady-balance",
    displayName: "Lady Balance",
    subtitle: "Klimabevisst veggmaling",
    brand: "Jotun",
    productLine: "Lady",
    priceFrom: 319,
    imageUrl: "https://cdn-pim.jotun.com/images/ProductImages/126075/296x388/126075.png",
    highlights: ["Matt", "Svanemerket", "Lavest fotavtrykk"],
    category: "Veggmaling",
  },
  {
    slug: "lady-supreme-finish",
    displayName: "Lady Supreme Finish",
    subtitle: "Silkematt for tre, panel og listverk",
    brand: "Jotun",
    productLine: "Lady",
    priceFrom: 349,
    imageUrl: "https://cdn-pim.jotun.com/images/ProductImages/126075/296x388/126075.png",
    highlights: ["Silkematt", "Svanemerket", "Ekstremt slitesterk"],
    category: "Tre & panel",
  },
  {
    slug: "sens-veggmaling",
    displayName: "SENS Veggmaling",
    subtitle: "Helt luktfri veggmaling",
    brand: "Jotun",
    productLine: "SENS",
    priceFrom: 399,
    imageUrl: "https://cdn-pim.jotun.com/images/ProductImages/126075/296x388/126075.png",
    highlights: ["Luktfri", "0 VOC", "Perfekt for barnerom"],
    category: "Veggmaling",
  },
];
