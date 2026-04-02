# PDP PRD – Fase 1 (Kodevennlig spec)

> Formål: Gi nok kontekst og presisjon til at en utvikler (eller Claude Code) kan bygge
> Farge-PDP og Produkt-PDP som fungerende Next.js-sider med Sanity-data og mock mg-color-data.
>
> Bygger på: `04-kilder/2026-03-25_gap-analyse-klint-vs-fargerike-pdp.md` | `kjerneflyter-pdp.md` | `pdp-farge.md` | `pdp-produkt.md`

**Dato:** 2026-03-25 (oppdatert med as-is-funn)
**Status:** Versjon 2 – oppdatert etter as-is-analyse
**Fase:** 1 (Lik eller bedre funksjon)

---

## 1. Hva vi bygger og hvorfor

### Problemet

Fargerikes nåværende PDP scorer 1.4/5 (produkt) og 0.7/5 (farge) mot Klints 4.9/5 på en customer journey-test. Kritiske gap: ingen fargevelger, ingen FAQ, ingen utstyrkobling, ingen prosjekthjelp, ingen trygghetsinformasjon. Konvertering 0.1 %.

### As-is baseline (fra mars 2026-analyse)

Eksisterende funksjonalitet som MÅ bevares eller forbedres:

**Farge-PDP (3 239 sider under `/farger/`):**
- Fargekort med visuell swatch, navn, kode, merke, «Kjøp maling»-knapp
- Tab-basert kategoribrowsing (beige, grønn, hvit, etc.)
- 2-kolonne alternerende layout (miljøbilde + fargekort)
- Paginering (40 per side, «Vis neste treff»)
- Favoritt/hjerte-ikon

**Produkt-PDP (270+ malingssider):**
- Produktnavn, bilde, pris (flere volumer), rating (Lipscore live)
- Handlekurv med volumvalg (Kjøp-knapp, oransje)
- Lagerstatus: nettlager + antall butikker med lager
- Klikk-og-hent tilgjengelig
- Relaterte produkter i sidebar
- Omtaler via Lipscore (ikke «vurderes» – allerede i produksjon)

### Hva Fase 1 løser

Tre oppgraderte sidetyper: Farge-PDP (individuell), Fargekategori-hub (ny sidetype), og Produkt-PDP. Demonstrerer ny IA med farge som inngang, prosjekthjelp integrert, innhold og produkt tett koblet. **Bevarer eksisterende commerce-funksjonalitet** (handlekurv, pris, lager) mens ny funksjonalitet legges på topp.

### Hva Fase 1 IKKE løser

- Prosjektflyt / Flyt C (krever prosjektkalkulator)
- Romvisualisering (Roomvo/Leap Tools)
- Brukeranmeldelser med bilder (krever UGC-strategi)
- Mengdekalkulator (Fase 2)
- B2B / kundeklubb

---

## 2. Arkitektur og routing

### Tech stack

| Lag | Teknologi | Allerede satt opp |
|---|---|---|
| Frontend | Next.js 16 (App Router) | ✅ |
| Styling | Tailwind CSS 4 | ✅ |
| CMS | Sanity (via next-sanity) | ✅ client + image helper |
| Søk | Algolia (algoliasearch + react-instantsearch) | ✅ client |
| Farge-API | mg-color – **mock i Fase 1** | ❌ bygges |
| Typesikkerhet | TypeScript | ✅ |

### Filstruktur (mål)

```
src/
├── app/
│   ├── farger/
│   │   ├── page.tsx              ← Farge-hub (alle farger)
│   │   └── [kategori]/
│   │       ├── page.tsx          ← Fargekategori-hub (/farger/beige/)
│   │       └── [slug]/
│   │           └── page.tsx      ← Farge-PDP (/farger/beige/soothing-beige/)
│   ├── produkt/
│   │   └── [slug]/
│   │       └── page.tsx          ← Produkt-PDP
│   └── layout.tsx
├── components/
│   ├── pdp/
│   │   ├── ColorHero.tsx         ← Kulør-header med swatch + navn + beskrivelse
│   │   ├── ColorMoodImages.tsx   ← Miljøbilder-galleri
│   │   ├── CompatibleProducts.tsx ← Produkter gruppert per overflate
│   │   ├── RelatedColors.tsx     ← Lignende kulører (grid)
│   │   ├── ProductHero.tsx       ← Produktbilde + navn + kort beskrivelse
│   │   ├── ColorPicker.tsx       ← Fargevelger (grid + søk) – Fase 1: enkel versjon
│   │   ├── ProductSpecs.tsx      ← Tekniske spesifikasjoner accordion
│   │   ├── FaqBlock.tsx          ← FAQ-accordion (Sanity-drevet)
│   │   ├── RelatedContent.tsx    ← Relaterte guider/artikler
│   │   ├── RelatedEquipment.tsx  ← Anbefalt utstyr (seksjonert)
│   │   ├── TrustSignals.tsx      ← Trygghetsinformasjon + CTA til ekspert
│   │   └── ReviewSummary.tsx     ← Anmeldelser (enkel versjon)
│   └── shared/
│       ├── Breadcrumb.tsx
│       ├── StoreSelector.tsx     ← Butikkvelger (persistent)
│       └── ColorSwatch.tsx       ← Gjenbrukbar fargeprøve-komponent
├── lib/
│   ├── algolia/
│   │   └── client.ts             ← (eksisterer)
│   ├── sanity/
│   │   ├── client.ts             ← (eksisterer)
│   │   └── image.ts              ← (eksisterer)
│   ├── mg-color/
│   │   ├── client.ts             ← API-klient (mock i Fase 1)
│   │   ├── types.ts              ← TypeScript-typer for kulørdata
│   │   └── mock-data.ts          ← Hardkodet testdata
│   └── types/
│       ├── color.ts              ← Kulør-typer
│       ├── product.ts            ← Produkt-typer
│       └── content.ts            ← Innholdstyper (FAQ, artikler)
└── context/
    └── ProjectContext.tsx         ← Prosjekt-state (forberedt for Fase 2)
```

### URL-struktur

⚠️ **SEO-kritisk beslutning:** Dagens nettsted har 3 239 indekserte fargesider og 270+ malingssider. 69% av trafikken er organisk. URL-endringer krever 301-redirects og må planlegges som del av SEO-migreringsplan (Oppgave 3.4).

**Anbefaling:** Behold eksisterende URL-mønster der mulig. Ny IA legges i ny struktur, gammel URL redirecter.

| Side | Nåværende URL | Ny URL | Redirect |
|---|---|---|---|
| Fargekategori-hub | `/farger/beige/` | `/farger/beige/` | Ingen (behold) |
| Farge-PDP | `/farger/beige/soothing-beige/` | `/farger/beige/soothing-beige/` | Ingen (behold) |
| Produkt-PDP (maling) | `/maling/ute/tre-og-fasade-/drygolin-nordic-extreme/` | `/produkt/drygolin-nordic-extreme/` | 301 fra gammel |
| Farge-hub (alle) | `/farger/` | `/farger/` | Ingen (behold) |

**Begrunnelse:** Fargesider beholder eksisterende URL fordi de allerede er indeksert, har backlinks, og Google kjenner strukturen. Produktsider får ny URL fordi dagens dype nesting (`/maling/ute/tre-og-fasade-/…`) er upraktisk for SEO og brukerforståelse.

**Ny sidetype: Fargekategori-hub (`/farger/[kategori]/`)**
Denne finnes i dag men er kun en liste. Oppgradert versjon med filtrering, sortering, og bedre visuell presentasjon. Se seksjon 3b.

---

## 3. Farge-PDP – Spesifikasjon

### Formål

Kulør som primær inngang. Kunden lander på en farge, ser den i kontekst, og finner kompatible produkter. Fase 1: informasjon og navigasjon. Fase 2: inline kjøp.

### Sidelayout (top → bunn)

```
┌─────────────────────────────────────────────────┐
│ Breadcrumb: Hjem > Farger > Hvit > Tidløs       │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────┐                                   │
│  │  ██████  │  JOTUN 1024 Tidløs                │
│  │  ██████  │  NCS: S 1002-Y                    │
│  │  ██████  │  Fargekart: Lady Balance 2025     │
│  └──────────┘  Interior / Exterior              │
│                                                 │
│  «En gulaktig gråtone. Oppleves som en helt     │
│  lys, nesten hvitaktig gråtone utendørs.        │
│  Diskret, gyllen og lun.»                       │
│                                                 │
│  [Bestill fargeprøve →]                         │
│                                                 │
├─────────────────────────────────────────────────┤
│  MILJØBILDER (swipeable galleri)                │
│  [stue]  [soverom]  [kjøkken]                   │
├─────────────────────────────────────────────────┤
│  KOMPATIBLE PRODUKTER                           │
│                                                 │
│  Veggmaling                                     │
│  ┌─────────────────────────────────────┐        │
│  │ Lady Supreme Finish                 │        │
│  │ Matt, slitesterk, enda vakrere      │        │
│  │ finish. 0.68L / 2.7L / 9L          │        │
│  │ [Se produkt →]                      │        │
│  ├─────────────────────────────────────┤        │
│  │ Lady Wonderwall                     │        │
│  │ Superenkel å påføre, matt.          │        │
│  │ 2.7L / 9L                           │        │
│  │ [Se produkt →]                      │        │
│  └─────────────────────────────────────┘        │
│                                                 │
│  Takmaling                                      │
│  ┌─────────────────────────────────────┐        │
│  │ Lady Tak                            │        │
│  │ ...                                 │        │
│  └─────────────────────────────────────┘        │
│                                                 │
│  [Usikker? Les «Slik velger du riktig maling»]  │
│                                                 │
├─────────────────────────────────────────────────┤
│  LIGNENDE FARGER                                │
│  [████] [████] [████] [████] [████] [████]      │
│  Latte   Cocoa  Mocha  Toffee Kokos  Frostrøyk │
├─────────────────────────────────────────────────┤
│  RELATERTE GUIDER                               │
│  → Slik velger du riktig farge til stua         │
│  → 5 tips for nordvendte rom                    │
│  → Hva er forskjellen på matt og halvblank?     │
├─────────────────────────────────────────────────┤
│  FAQ                                            │
│  ▸ Må jeg grunne før jeg maler?                 │
│  ▸ Hvor lang tørketid har denne malingen?       │
│  ▸ Er denne fargen trygg for barnerom?          │
│  ▸ Hva gjør jeg om jeg søler?                   │
├─────────────────────────────────────────────────┤
│  TRYGGHET                                       │
│  «Usikker? Vi hjelper deg.»                     │
│  [Ring oss] [Chat] [Book fargekonsultasjon]     │
├─────────────────────────────────────────────────┤
│  ANMELDELSER (enkel)                            │
│  ★★★★☆ 4.0 (5 vurderinger)                     │
│  «Fin farge, passer perfekt til stua vår.»      │
└─────────────────────────────────────────────────┘
```

### Komponent-spesifikasjoner

#### ColorHero

| Prop | Type | Kilde | Beskrivelse |
|---|---|---|---|
| name | string | mg-color / Sanity | Kulørnavn (f.eks. «Tidløs») |
| code | string | mg-color | Leverandørkode (f.eks. «JOTUN 1024») |
| ncs | string \| null | mg-color | NCS-kode (f.eks. «S 1002-Y») |
| hex | string | mg-color | Hex-fargekode for swatch |
| brand | string | mg-color | Leverandør (Jotun, Caparol, Beckers) |
| collection | string \| null | mg-color | Fargekart-tilhørighet |
| usage | 'interior' \| 'exterior' \| 'both' | mg-color | Bruksområde |
| description | string \| null | Sanity | Stemningsbeskrivelse |

Rendering: Stor fargeswatch (min 120×120px), kulørnavn som h1, metadata under. Beskrivelsen skal være redaksjonell – ikke teknisk. Fallback: vis uten beskrivelse hvis Sanity-data mangler.

#### CompatibleProducts

| Prop | Type | Kilde |
|---|---|---|
| products | CompatibleProduct[] | mg-color (mock) |

```typescript
interface CompatibleProduct {
  slug: string;
  name: string;           // Kundevennlig navn
  description: string;    // Kort (1 setning) pedagogisk beskrivelse
  surfaceType: 'vegg' | 'tak' | 'trevirke' | 'metall' | 'gulv';
  volumes: string[];      // ['0.68L', '2.7L', '9L']
  url: string;            // Lenke til Produkt-PDP
}
```

Gruppering: produkter vises under overflate-overskrifter (Veggmaling, Takmaling, Trevirke). Hvert produktkort har navn, kort beskrivelse og lenke. **Fase 1: ingen pris, ingen handlekurv.**

#### RelatedColors

| Prop | Type | Kilde |
|---|---|---|
| colors | ColorSwatch[] | mg-color |
| maxVisible | number (default 6) | config |

Grid med 3–4 kolonner. Hver swatch er klikkbar → navigerer til den kulørens Farge-PDP. Viser fargenavn under swatch. Basert på NCS-nærhet eller manuell kuratering (Sanity-overstyring mulig).

#### FaqBlock

| Prop | Type | Kilde |
|---|---|---|
| faqs | FaqItem[] | Sanity |
| category | string | Kontekstuell (fra side) |

```typescript
interface FaqItem {
  question: string;
  answer: string;  // Portable Text (Sanity rich text)
  category: string; // 'maling' | 'tapet' | 'gulv' | 'barnerom' | 'generell'
}
```

Accordion-mønster. Lukket som default. Filtrert på kategori relevant for produktet/fargen.

---

## 3b. Fargekategori-hub – Spesifikasjon (ny sidetype)

### Formål

Landingsside for fargekategori (f.eks. «Beige», «Grønn»). Erstatter dagens enkle grid med en oppgradert versjon med bedre filtrering, sortering og visuell presentasjon. Denne sidetypen finnes i dag (3 239 sider) men mangler discovery-funksjoner.

### URL: `/farger/[kategori]/`

### As-is (bevares/forbedres)
- Tab-basert kategoribrowsing
- 2-kolonne alternerende layout (miljøbilde + fargekort)
- Paginering (40 per side)
- Fargekort: swatch, navn, kode, merke, «Kjøp maling»-knapp, hjerte-ikon

### Nye funksjoner (Fase 1)
- **Søk i farger** (søk på fargenavn, NCS-kode, leverandør-kode, stemning)
- **Filtrering:** merke (Jotun, Caparol, Beckers, Farrow & Ball, Fontego), bruksområde (inne/ute), fargekart
- **Sortering:** popularitet, alfabetisk, nyeste
- **Improved grid:** 3-4 kolonner, konsistent høyde, hover med mer info

### Sidelayout

```
┌─────────────────────────────────────────────────┐
│ Breadcrumb: Hjem > Farger > Beige               │
├─────────────────────────────────────────────────┤
│ h1: Beige farger                                │
│ [Beige] [Grønn] [Hvit] [Blå] [Rosa] [...]      │
│                                                 │
│ [🔍 Søk i beige farger...]                      │
│ Filter: [Merke ▾] [Inne/Ute ▾] [Fargekart ▾]  │
│ Viser 260 farger · Sortert etter popularitet    │
│                                                 │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│ │ ██████ │ │ ██████ │ │ ██████ │ │ ██████ │   │
│ │ Hummus │ │ Perle- │ │ Gran-  │ │ Lett   │   │
│ │ JOTUN  │ │ sukker │ │ skygge │ │ Greie  │   │
│ │ 12118  │ │ FR1335 │ │ J 1288 │ │ FR1421 │   │
│ │ [Kjøp] │ │ [Kjøp] │ │ [Kjøp] │ │ [Kjøp] │   │
│ └────────┘ └────────┘ └────────┘ └────────┘   │
│                                                 │
│ [Vis flere (40 av 260) →]                       │
└─────────────────────────────────────────────────┘
```

### Komponent: ColorCategoryGrid

| Prop | Type | Kilde |
|---|---|---|
| category | string | URL param |
| colors | ColorSwatch[] | mg-color / Algolia |
| totalCount | number | API |
| page | number | URL param |

Paginering via URL-parameter (`?page=2`), ikke infinite scroll (SEO-vennlig). Server-rendret med client-side filtrering som progressiv forbedring.

---

## 4. Produkt-PDP – Spesifikasjon

### Formål

Detaljside for fysiske produkter (maling, tapet, gulv, utstyr). Primær konverteringsflate.

**As-is commerce som MÅ bevares (Fase 1):**
- Handlekurv med volumvalg og priser (flere varianter per produkt)
- Lagerstatus (nettlager + butikklager med antall)
- Klikk-og-hent-indikator
- Lipscore-ratings og omtaler (allerede integrert i produksjon)

**Nye funksjoner Fase 1:**
- Fargevelger (enkel versjon) med kobling til Farge-PDP
- FAQ-blokk (Sanity-drevet)
- Anbefalt utstyr (seksjonert)
- Relaterte guider/artikler
- Trygghetsinformasjon og ekspert-CTA
- Strukturert data (Product + FAQ JSON-LD)

### Sidelayout (top → bunn)

```
┌─────────────────────────────────────────────────┐
│ Breadcrumb: Hjem > Maling > Inne > Vegg > LSF   │
├─────────────────────────────────────────────────┤
│                                                 │
│  [produktbilde]        Lady Supreme Finish       │
│  [miljøbilde]          ────────────────────      │
│  [detaljbilde]         Markedets beste maling    │
│                        til vegg og panel.        │
│                        Ekstremt slitesterk med   │
│                        vakker, matt finish.      │
│                                                 │
│                        Bruksområde: Vegg, Panel  │
│                        Glans: Matt (7)           │
│                        Tørketid: 4 timer         │
│                                                 │
│                        ★★★★½ 4.7 (222 vurd.)    │
│                                                 │
├─────────────────────────────────────────────────┤
│  VELG FARGE                                     │
│  ┌─────────────────────────────────────────┐    │
│  │ [søk farge...]                          │    │
│  │                                         │    │
│  │ Populære farger                         │    │
│  │ [██][██][██][██][██][██]                │    │
│  │                                         │    │
│  │ Lady Soulful Spaces 2026               │    │
│  │ [██][██][██][██][██][██]                │    │
│  │ [██][██][██][██][██][██]                │    │
│  │                                         │    │
│  │ [Vis alle farger →]                     │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  Valgt: JOTUN 2149 Coffee                       │
│  [Se mer om denne fargen →] (→ Farge-PDP)       │
│                                                 │
├─────────────────────────────────────────────────┤
│  ANBEFALT UTSTYR                                │
│                                                 │
│  Påføring – Det du trenger for å male           │
│  [Malerulle 25cm] [Pensel 50mm]                 │
│                                                 │
│  Beskyttelse – Beskytt det du ikke skal male    │
│  [Malertape] [Dekkplast]                        │
│                                                 │
│  Klargjøring – Forbered overflaten              │
│  [Vaskemiddel] [Sandpapir]                      │
│                                                 │
├─────────────────────────────────────────────────┤
│  TEKNISKE SPESIFIKASJONER                       │
│  ▸ Dekkevne og forbruk                          │
│  ▸ Tynning og rengjøring                        │
│  ▸ Overmalingsintervall                         │
│  ▸ Miljø og merking                             │
├─────────────────────────────────────────────────┤
│  FAQ  (samme FaqBlock-komponent)                │
├─────────────────────────────────────────────────┤
│  RELATERTE GUIDER                               │
│  → Slik maler du stua – steg for steg          │
│  → Forskjellen på Supreme Finish og Wonderwall  │
├─────────────────────────────────────────────────┤
│  TRYGGHET + ANMELDELSER (samme som Farge-PDP)   │
└─────────────────────────────────────────────────┘
```

### Komponent-spesifikasjoner

#### ProductHero

| Prop | Type | Kilde |
|---|---|---|
| name | string | Sanity / PIM |
| description | string | Sanity (redaksjonell) |
| images | Image[] | Sanity (med fallback til PIM) |
| surfaceTypes | string[] | PIM |
| gloss | string \| null | PIM |
| dryingTime | string \| null | PIM |
| reviewScore | number \| null | Lipscore (allerede live) |
| reviewCount | number \| null | Lipscore (allerede live) |
| prices | PriceVariant[] | Omnium / eksisterende commerce |
| stockStatus | StockInfo | Lindback / eksisterende commerce |

Bildegalleri: Karusell med thumbnails. Produkt, miljø, detalj. Mobil: swipeable.

#### ColorPicker (Fase 1 – enkel versjon)

| Prop | Type | Kilde |
|---|---|---|
| productSlug | string | URL param |
| compatibleColors | ColorSwatch[] | mg-color (mock) |
| onColorSelect | (color: ColorSwatch) => void | callback |

Fase 1-versjon:
- Grid med 3–4 kolonner, bildbaserte swatches
- Søkefelt (filter på navn/NCS) – klient-side filtrering i Fase 1
- «Populære farger» som default (6 stk.)
- Valgfritt: fargekart-innganger (collections)
- Ved valg: vis valgt farge med «Se mer om denne fargen →» lenke til Farge-PDP
- **Ingen bas/SKU-oppløsning i Fase 1** – det kommer med commerce

```typescript
interface ColorSwatch {
  id: string;           // f.eks. 'jotun-2149'
  name: string;         // f.eks. 'Coffee'
  code: string;         // f.eks. 'JOTUN 2149'
  ncs: string | null;
  hex: string;
  slug: string;         // URL-slug for Farge-PDP
  imageUrl?: string;    // Swatch-bilde (foretrukket over ren hex)
}
```

#### RelatedEquipment

| Prop | Type | Kilde |
|---|---|---|
| sections | EquipmentSection[] | Sanity / Algolia Recommend (mock i Fase 1) |

```typescript
interface EquipmentSection {
  title: string;        // 'Påføring', 'Beskyttelse', etc.
  subtitle: string;     // 'Det du trenger for å male'
  items: EquipmentItem[];
}

interface EquipmentItem {
  name: string;
  imageUrl: string;
  url: string;          // Lenke til produkt
  // Fase 2: price, addToCart
}
```

Fire faste seksjoner: Påføring, Beskyttelse, Klargjøring, Festemiddel. Innhold styrt av produktkategori.

---

## 5. Datamodell – Sanity schemas

### Kulør (farge-dokument i Sanity)

Fase 1 bruker Sanity som primær datakilde for kulørsider, beriket med mg-color mock-data. Når mg-color API er klart (Fase 2), overtar API-et som primærkilde for kulørdata, mens Sanity leverer redaksjonelt innhold (beskrivelse, miljøbilder, FAQ-kobling).

```typescript
// Sanity schema: 'color'
{
  name: 'color',
  title: 'Kulør',
  type: 'document',
  fields: [
    { name: 'name', title: 'Kulørnavn', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'code', title: 'Leverandørkode', type: 'string' },  // JOTUN 1024
    { name: 'ncs', title: 'NCS-kode', type: 'string' },
    { name: 'hex', title: 'Hex-fargekode', type: 'string' },
    { name: 'brand', title: 'Leverandør', type: 'string', options: {
      list: ['Jotun', 'Caparol', 'Beckers', 'Farrow & Ball', 'Fontego']
    }},
    { name: 'collection', title: 'Fargekart', type: 'string' },
    { name: 'usage', title: 'Bruksområde', type: 'string', options: {
      list: ['interior', 'exterior', 'both']
    }},
    { name: 'description', title: 'Stemningsbeskrivelse', type: 'text' },
    { name: 'moodImages', title: 'Miljøbilder', type: 'array', of: [{ type: 'image' }] },
    { name: 'compatibleProducts', title: 'Kompatible produkter', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }]
    },
    { name: 'relatedColors', title: 'Relaterte kulører', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'color' }] }]
    },
    { name: 'relatedContent', title: 'Relaterte artikler', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }]
    },
    { name: 'faqCategory', title: 'FAQ-kategori', type: 'string' }
  ]
}
```

### Produkt

```typescript
// Sanity schema: 'product'
{
  name: 'product',
  title: 'Produkt',
  type: 'document',
  fields: [
    { name: 'name', title: 'Produktnavn (kundevennlig)', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'shortDescription', title: 'Kort beskrivelse', type: 'text' },
    { name: 'description', title: 'Beskrivelse', type: 'array', of: [{ type: 'block' }] },
    { name: 'category', title: 'Kategori', type: 'string', options: {
      list: ['maling', 'tapet', 'gulv', 'solskjerming', 'utstyr']
    }},
    { name: 'surfaceTypes', title: 'Overflatetyper', type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['vegg', 'tak', 'trevirke', 'metall', 'gulv'] }
    },
    { name: 'images', title: 'Bilder', type: 'array', of: [{ type: 'image' }] },
    { name: 'specs', title: 'Tekniske spesifikasjoner', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'label', type: 'string' },
        { name: 'value', type: 'string' }
      ]
    }]},
    { name: 'volumes', title: 'Tilgjengelige volumer', type: 'array',
      of: [{ type: 'string' }]
    },
    { name: 'relatedEquipment', title: 'Anbefalt utstyr', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }]
    },
    { name: 'relatedContent', title: 'Relaterte artikler', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }]
    },
    { name: 'faqCategory', title: 'FAQ-kategori', type: 'string' }
  ]
}
```

### FAQ

```typescript
// Sanity schema: 'faq'
{
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    { name: 'question', title: 'Spørsmål', type: 'string' },
    { name: 'answer', title: 'Svar', type: 'array', of: [{ type: 'block' }] },
    { name: 'category', title: 'Kategori', type: 'string', options: {
      list: ['maling', 'tapet', 'gulv', 'barnerom', 'utstyr', 'forberedelse', 'generell']
    }}
  ]
}
```

### Artikkel (forenklet, for relatert innhold)

```typescript
// Sanity schema: 'article'
{
  name: 'article',
  title: 'Artikkel',
  type: 'document',
  fields: [
    { name: 'title', title: 'Tittel', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug' },
    { name: 'excerpt', title: 'Ingress', type: 'text' },
    { name: 'image', title: 'Bilde', type: 'image' },
    { name: 'categories', title: 'Kategorier', type: 'array',
      of: [{ type: 'string' }]
    }
  ]
}
```

---

## 6. mg-color mock-data (Fase 1)

Siden mg-color API ikke er tilgjengelig ennå, bygger vi med mock-data som speiler forventet API-respons. Mock-dataen skal inneholde nok variasjon til å teste alle UI-states.

**Skala-kontekst:** Dagens nettsted har 3 239 fargesider og 270+ malingssider. Mock-dataen representerer et tverrsnitt, men arkitekturen må tåle full skala (tusenvis av farger, paginering, søk).

### Mock-datasett

Minimum 8 kulører med full data (fra faktiske farger observert på fargerike.no):

| Kulør | Kode | NCS | Hex | Bruk |
|---|---|---|---|---|
| Tidløs | JOTUN 1024 | S 1002-Y | #E8E4DA | Interior |
| Coffee | JOTUN 2149 | S 2314-Y58R | #8B6F5E | Interior |
| Sheer Grey | JOTUN 8470 | S 1502-Y | #D8D4CC | Interior |
| Dempet Sort | JOTUN 9938 | S 8502-B | #2E2E2E | Both |
| Sjøbris | JOTUN 5225 | S 1510-B20G | #C5D4D8 | Interior |
| Nordlys | JOTUN 6170 | S 0505-R80B | #F0EFF5 | Interior |
| Skogbunn | JOTUN 8422 | S 5020-G30Y | #5E6B52 | Exterior |
| Solnedgang | JOTUN 1929 | S 1040-Y60R | #E8B882 | Both |

Minimum 4 produkter med kompatibilitetsdata:

| Produkt | Kategori | Overflater | Volumer |
|---|---|---|---|
| Lady Supreme Finish | Maling | Vegg, Trevirke | 0.68L, 2.7L, 9L |
| Lady Wonderwall | Maling | Vegg | 2.7L, 9L |
| Lady Tak | Maling | Tak | 2.7L, 9L |
| Lady Balance | Maling | Vegg | 2.7L, 9L |

### Mock API-klient

```typescript
// src/lib/mg-color/client.ts

export async function getColor(slug: string): Promise<Color | null> { ... }
export async function getCompatibleProducts(colorId: string): Promise<CompatibleProduct[]> { ... }
export async function getRelatedColors(colorId: string): Promise<ColorSwatch[]> { ... }
export async function getCompatibleColors(productSlug: string): Promise<ColorSwatch[]> { ... }
export async function searchColors(query: string): Promise<ColorSwatch[]> { ... }
```

Alle returnerer hardkodet data i Fase 1. Signaturen er designet for å matche forventet mg-color API i Fase 2.

---

## 7. Overganger mellom sider

### Farge-PDP → Produkt-PDP

Bruker: klikker «Se produkt →» på et kompatibelt produkt.
URL: `/produkt/lady-supreme-finish?farge=jotun-2149-coffee`
Oppførsel: Produkt-PDP åpner med den fargen forhåndsvalgt i ColorPicker.

### Produkt-PDP → Farge-PDP

Bruker: velger en farge i ColorPicker, klikker «Se mer om denne fargen →».
URL: `/farge/jotun-2149-coffee?fra=lady-supreme-finish`
Oppførsel: Farge-PDP åpner med en «Tilbake til Lady Supreme Finish»-lenke synlig.

### State-bevaring

Fase 1: URL-parametre (`?farge=`, `?fra=`). Enkel, fungerer uten JavaScript-state.
Fase 2: React context (ProjectContext) tar over, parametre beholdes som fallback/deeplink.

---

## 8. SEO og metadata

### Farge-PDP

```html
<title>Tidløs (JOTUN 1024) – Farge | Fargerike</title>
<meta name="description" content="En gulaktig gråtone. Oppleves som en helt lys, nesten hvitaktig gråtone. Finn kompatible produkter og bestill fargeprøve.">
<link rel="canonical" href="https://fargerike.no/farge/jotun-1024-tidlos">
```

JSON-LD: `Product`-schema med fargeinformasjon. AEO-optimalisert for spørsmål som «hva er NCS S 1002-Y?».

### Produkt-PDP

```html
<title>Lady Supreme Finish – Veggmaling | Fargerike</title>
<meta name="description" content="Ekstremt slitesterk veggmaling med vakker, matt finish. Tilgjengelig i over 2000 farger. Se farger, teknisk info og anbefalt utstyr.">
```

JSON-LD: `Product`-schema med aggregateRating.

### Begge sider

- SSR via Next.js (generateMetadata + server components)
- Open Graph med kulør-swatch eller produktbilde som og:image
- Strukturert data for FAQ (FAQPage-schema)

---

## 9. Mobil-spesifikasjoner

Estimert 60%+ mobiltrafikk. Mobil-først design.

| Komponent | Desktop | Mobil |
|---|---|---|
| ColorHero | Swatch + metadata side om side | Stacked, swatch sentrert |
| Miljøbilder | Galleri med thumbnails | Horisontalt swipeable |
| Kompatible produkter | Kolonner med kort | Collapsible kort, stacked |
| Fargevelger | Grid i content area | Fullskjerm bottom sheet |
| FAQ | Accordion | Accordion (fungerer) |
| Utstyr-seksjoner | Horisontal scroll per seksjon | Horisontal scroll (beholder) |

**Tommelfingerregel:** Maks 3 tap-to-scroll-steg fra entry til viktigste CTA.

---

## 10. Implementeringsrekkefølge

Anbefalt rekkefølge for å bygge – hvert steg gir en fungerende side:

### Steg 1: Datalag og typer
- [ ] TypeScript-typer (`lib/types/`)
- [ ] mg-color mock-data og klient (`lib/mg-color/`)
- [ ] Sanity-schemas (color, product, faq, article)

### Steg 2: Farge-PDP (enkel)
- [ ] Route: `app/farge/[slug]/page.tsx`
- [ ] ColorHero med mock-data
- [ ] CompatibleProducts med lenker til Produkt-PDP
- [ ] RelatedColors grid

### Steg 3: Produkt-PDP (enkel)
- [ ] Route: `app/produkt/[slug]/page.tsx`
- [ ] ProductHero med bildegalleri
- [ ] ColorPicker (enkel grid + søk)
- [ ] ProductSpecs accordion

### Steg 4: Delte komponenter
- [ ] FaqBlock (Sanity-drevet)
- [ ] RelatedContent (artikkelkort)
- [ ] RelatedEquipment (seksjonert)
- [ ] TrustSignals (CTA-er til ekspert)

### Steg 5: Overganger og SEO
- [ ] URL-parametre for kontekstbevaring
- [ ] generateMetadata for begge sider
- [ ] JSON-LD strukturert data
- [ ] Breadcrumb med kontekst

### Steg 6: Mobil-optimalisering
- [ ] Responsive layout for alle komponenter
- [ ] Swipeable gallerier
- [ ] Bottom sheet for fargevelger på mobil

---

## 11. Akseptansekriterier

Fase 1 PDP er «ferdig» når:

1. **Fargekategori-hub rendrer** med grid, tab-navigasjon, søk, filtrering, og paginering
2. **Farge-PDP rendrer** med kulørinformasjon, miljøbilder, kompatible produkter og FAQ
3. **Produkt-PDP rendrer** med produktinfo, fargevelger, utstyr, pris, handlekurv og FAQ
4. **Commerce bevart** – handlekurv, volumvalg med pris, lagerstatus og klikk-og-hent fungerer
5. **Overganger fungerer** – farge ↔ produkt med kontekstbevaring via URL-params
6. **SEO fungerer** – SSR, metadata, JSON-LD, kanoniske URL-er, redirects fra gamle produkt-URLs
7. **Mobil fungerer** – responsivt, swipeable gallerier, lesbart
8. **Mock-data er realistisk** – 8+ kulører, 4+ produkter, FAQ-er, artikler
9. **Sanity-schemas er definert** – klar for redaksjonelt innhold
10. **Lipscore-integrasjon bevart** – ratings og omtaler fungerer
11. **Koden er forberedt for Fase 2** – typer og interfaces matcher forventet mg-color API

---

## 12. Krav-IDer (sporbarhet)

| Krav-ID | Beskrivelse | Dekket av komponent | Fase 1 |
|---|---|---|---|
| US-F01 | Se fargen i et rom | ColorMoodImages | ✅ (mock-bilder) |
| US-F02 | Stemningsbeskrivelse | ColorHero.description | ✅ |
| US-F03 | Se lignende farger | RelatedColors | ✅ |
| US-F04 | Bilder fra ekte hjem | ColorMoodImages | 🟡 (Sanity-bilder, ikke UGC) |
| US-F05 | Bestille fargeprøve | ColorHero CTA | 🟡 (lenke, ikke e-commerce) |
| US-P01 | Kompatible produkter per farge | CompatibleProducts | ✅ |
| US-P02 | Forstå produktforskjeller | CompatibleProducts.description | ✅ |
| US-P03 | Mengdeberegning | – | ❌ (Fase 2) |
| US-P04 | Anbefalt utstyr | RelatedEquipment | ✅ (informasjon, ikke kjøp) |
| US-P05 | Fremgangsmåte | RelatedContent | 🟡 (lenke til guide) |
| US-P06 | Tørketider, grunning | FaqBlock + ProductSpecs | ✅ |
| US-T01 | Trygt for barnerom | FaqBlock | ✅ |
| US-T02 | Søl og rengjøring | FaqBlock | ✅ |
| US-T03 | Spørre ekspert | TrustSignals | ✅ (CTA, ikke live chat) |
| US-T04 | Anmeldelser med bilder | ReviewSummary | 🟡 (tekst, ikke bilder) |
| US-K01 | Alt i kurv i én flyt | – | ❌ (Fase 2) |
| US-K02 | Lagerstatus i min butikk | – | ❌ (Fase 2) |
| US-K03 | Levering hjem eller butikk | – | ❌ (Fase 2) |

---

## Endringslogg

| Dato | Endring | Kilde |
|---|---|---|
| 2026-03-25 | Opprettet fra GAP-analyse, PRD, FRS og kjerneflyter | John + Claude |
| 2026-03-25 | v2: Oppdatert basert på as-is-analyse | John + Claude |
| | – Korrigert fra «uten commerce» til «lik eller bedre funksjon» | |
| | – Lagt til Fargekategori-hub som ny sidetype (seksjon 3b) | |
| | – Oppdatert URL-strategi: behold eksisterende farge-URLer (SEO-kritisk) | |
| | – Utvidet leverandørliste med Farrow & Ball og Fontego | |
| | – Lipscore endret fra «vurderes» til «allerede live» | |
| | – Lagt til PriceVariant og StockInfo i ProductHero | |
| | – Lagt til skala-kontekst: 3 239 fargesider, 270+ malingssider | |
| | – Akseptansekriterier utvidet med commerce, Lipscore, redirect-krav | |
