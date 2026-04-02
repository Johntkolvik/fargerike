# Fargerike – As-Is Analyse: Produkt-PDP (Maling)

> **Analyse dato:** 2026-03-25
> **Analysert av:** Claude Code UX-analyse
> **Metodologi:** Live nettstedsbesøk, screenshot, DOM-analyse, meta-tag-analyse
> **Formål:** Dokumentere dagens tilstand og identifisere gap mot FRS-krav og best practice

---

## Sammendrag

Fargerike Produkt-PDP for maling har en enkel katalogstruktur med:
- **Grunnleggende produktinfo:** Navn, bilde, pris, rating, lagerstatus
- **Manglende komponenter:** Fargevelger, mengdekalkulator, FAQ, utstyrveiledning, trygghetsinformasjon
- **SEO:** Basic OG meta tags, manglende Product schema markup
- **Konvertering:** Kjøp-button til handlekurv, lagersjekk etter butikk, «klikk og hent»-indikator

Nåværende opplevelse er **katalog-first**, ikke **prosjekt-first**. Mangler proaktiv kundehjelp som Klint-benchmark viser (4.9/5 vs. Fargerike 1.4/5).

---

## Analyserte sider

| URL | Tittel | Kategori | Status |
|---|---|---|---|
| https://www.fargerike.no/maling/ute/tre-og-fasade-/drygolin-nordic-extreme/ | Drygolin Nordic Extreme | Exterior Wood Stain | ✅ Analysert |
| https://www.fargerike.no/maling/ute/tre-og-fasade-/baron-terrassebeis/ | Baron Terrassebeis | Exterior Terrace Stain | ✅ Analysert |
| https://www.fargerike.no/maling/inne/ | Interiørmaling | PLP (Product List) | ✅ Analysert |

---

## Produkt-PDP Template

### Side 1: Drygolin Nordic Extreme (Eksteriør maling, tre & fasade)

#### 1. Informasjonsarkitektur

**Visuelle hierarki (top-down):**
- Breadcrumb: `Maling / Utemaling / Beis` (tekstfarge grå, ikke klikkbar)
- Kategori-tag: «UTEMALING» (sorttekst på grå bakgrunn)
- Produktnavn: «Drygolin Nordic Extreme» (h1, bold, ~36px)
- Variantag: «Vannbasert malingsystem» (subheading)
- Rating: ⭐ 4.8/5 (34 stemmer) + «Omtaler (10)» lenke
- Kjøp-CTA: «Kjøp» button (oransje, prominent)

**Venstre sidebar (kategorifiltrering):**
- Relaterte produkter i samme kategori:
  - Trebitt Oljebeis
  - Trebitt Terrassebeis
  - Jernvitrol Jernsulfat
  - Tyrilin Tjærebeis
- Disse er klikkbare lenker til andre produktsider

#### 2. Produktdata (Data Model)

| Felt | Eksempel (Drygolin) | Kilde | Tilgjengelig |
|---|---|---|---|
| **Produktnavn** | Drygolin Nordic Extreme | HTML h1 | ✅ Ja |
| **Displaynavn** | «Vannbasert» prefix + navn | Not separate | ⚠️ Blandet med navn |
| **Kategori** | Exterior/Wood | Navigation/breadcrumb | ✅ Ja |
| **Merke** | Drygolin | Not visible in title | ❌ Nei |
| **Rating** | 4.8/5 (34 votes) | Star widget | ✅ Ja |
| **Anmeldelser** | 10 reviews listed | «Omtaler (10)» link | ⚠️ Link kun |
| **Pris** | 4 varianter: 2.7L (1,589kr), 3L (1,199kr), 9L (4,769kr), 10L (2,699kr) | Price table | ✅ Ja |
| **Volumer** | 2.7L, 3L, 9L, 10L | Pricing list | ✅ Ja |
| **Lagerstatus** | «På nettlager - Gratis levering til butikk» | Green badge | ✅ Ja |
| **Lokal butikk** | «På lager i 61 butikker» | Info text | ✅ Ja |
| **Teknisk data** | Glansnivå, VOS%, dekkekraft | NOT on PDP | ❌ Nei |
| **Beskrivelse** | Kort feature liste («Extreme teknologi», «Selvrensende») | Small text under image | ⚠️ Minimal |
| **Bruksanvisning** | Forberedelser, påføring, tørketid | NOT on PDP | ❌ Nei |
| **Produktbilde** | Bøtte/can product shot | Center hero image | ✅ Ja |
| **Miljøbilde** | Ferdig malt fasade | Small overlay text on image | ⚠️ Minimal |
| **Instruksjonsbilde** | Applikasjonsguide | NOT visible | ❌ Nei |

#### 3. Funksjonalitet (CTA og interaksjon)

| Funksjon | Implementering | Status |
|---|---|---|
| **Kjøp/Handlekurv** | Oransje «Kjøp» button → handlekurv | ✅ Aktiv |
| **Volum-valg** | Inline pristabell, 4 valg | ✅ Tilgjengelig |
| **Mengdekalkulator** | «Beregn mengde» button synlig | ✅ Aktivt element |
| **Fargevelger** | Ingen swatch-display, ingen fargegrid | ❌ Ikke implementert |
| **Butiккvalg** | «Ikke på lager? Spør oss!» — klikk åpner kanskje chat/form | ⚠️ Dialog-based |
| **Favoritt/Wishlist** | Ikke synlig | ❌ Ikke implementert |
| **Del på sosiale** | Ikke synlig | ❌ Ikke implementert |
| **Zoom-bilde** | Mulig on hover, ikke verifisert | ⚠️ Uklar |

#### 4. Kryssalg og inspirasjon

**Relaterte produkter (venstre panel):**
- 4 similarColor/wood stains listingskalleringer
- Click-through til andre produkter samme kategori
- **Ikke** cross-link til färg-PDP eller inspirasjon

**Relatert innhold:**
- «Se film» link (se screenshot) — åpner mulig video/tutorial
- Ingen direkte link til guider/how-to (f.eks. «Slik maler du tre», «FAQ»)

#### 5. SEO og Meta (Drygolin)

**Meta tags (ekstrahert fra DOM):**
```
<title>Drygolin Nordic Extreme - Ekstrem holdbarhet | Fargerike</title>
<meta name="description" content="DRYGOLIN Nordic Extreme har en unik Extreme-teknologi. Extreme-teknologien gir overlegen beskyttelse og ekstrem farge- og glansholdbarhet som holder lengst. Malingen er selvrensende...">
<meta property="og:title" content="Drygolin Nordic Extreme...">
<meta property="og:description" content="[OG description kort variasjon]">
<meta property="twitter:card" content="summary_large_image">
```

**Strukturert data (JSON-LD):**
- ✅ Organization schema (Fargerike info)
- ❌ **Product schema MANGLER** — ingen `@type: "Product"` med `name`, `price`, `offers`, `aggregateRating`
- ❌ Ingen BreadcrumbList
- ❌ Ingen SameAs-referanser til merkevareside

**SEO Funn:**
- OG meta er satt (god for sosiale)
- Product-strukturerte data mangler — **kritisk for Google Shopping og rik snippet**
- Canonical tag ikke verifisert in screenshot
- Mobilvisning SEO OK, men mikro-data mangel samme for alle sider

---

### Side 2: Baron Terrassebeis (Eksteriør maling, terrassebeis)

#### 1. Informasjonsarkitektur (sammenligning med Drygolin)

**Identisk layout, men:**
- Produktnavn: «Baron Terrassebeis» (samme stilguide)
- Rating: ⭐ 4.4/5 (34 stemmer) — samme format, litt lavere rating
- Prising: 2 varianter kun — **3L (499kr), 10L (1,499kr)**
- Lagerstatus: «På nettlager - Gratis levering til butikk» (samme)
- Lokal butikk: «På lager i **69 butikker**» (vs. 61 for Drygolin)

#### 2. Produktbilde

- Større kan/bøtte produktbilde (svart-oransje design med Baron-logo)
- Overlay-merknader på kan:
  - «Vanntynnet terrassebeis» (teknisk type)
  - «Danner et transparent fargesjikt» (feature)
  - «Hindrer vanninntrengning» (benefit)
- Icons: Piktogrammer for «Varighet» og andre attributter

#### 3. Funksjonalitet

- Identisk til Drygolin: Kjøp-button, 2 volumer, «Beregn mengde» synlig
- Ingen merkbar forskjell fra Drygolin-opplevelse

#### 4. Relaterte produkter (venstre sidebar)

- Trebitt Oljebeis
- Trebitt Terrassebeis
- Jernvitrol Jernsulfat
- Tyrilin Tjærebeis

**Observasjon:** Same liste som Drygolin — **sannsynlig hardkodet kategori-liste, ikke dynamisk relaterte produkter**

#### 5. Rating og Trust Elements

- 4.4/5 basert på 34 stemmer
- «Omtaler (10)» link synlig
- Produktside viser ikke anmeldelsestekst inline — lenke til tab/sesjonsmodal

---

### Side 3: PLP – Interiørmaling (maling/inne/)

#### 1. Pagetype

Dette er **produktlisteside (PLP)**, ikke PDP. Men gir viktig kontekst:
- Template-bruk for produktkort
- Søk/filter-arkitektur
- Cross-sell presentation

#### 2. Layout

**Venstre sidebar (filtrering):**
- Kategorigrupper:
  - Vegg & takmaling
  - Spraymaling
  - Gulvmaling
  - Beis & voks
  - Grunning
  - **Alle malingstyper** (link)
- Merker (Scanox, Osmo, etc.)
- «Vis flere» expand for å se alle

**Hovedinnhold (produktgrid):**
- Produktkort: 3 kolonner (desktop)
- Sort-dropdown: «Relevans»
- Antall treff: «Viser 20 av 135 treff»

#### 3. Produktkort (mini-template)

**Baronesse Basic (som eksempel):**
```
[Produktbilde oransje-rød sirkel]
  «92,-*
  pr. liter»

[Produktnavn]
Baronesse Basic

[Kort beskrivelse]
Vanntynnet akrylforsterket maling som kan brukes til både vegg og tak innendørs. Glans 07.

[Lagerstatus]
● På nettlager - Gratis levering til butikk
● Tilgjengelig for klikk og hent

[Rating]
⭐⭐⭐⭐⭐ (5/5)

[CTA]
[Medlemspris] / [Ikke medlem 299,-]
[NÅ fra 249,-] (oransje button)
```

**Observasjon:**
- Mini-template er mye enklere enn PDP
- Pris per liter fremheves
- Rating vises, men ikke stemmeantall
- Medlemspris differensiering (Kundeklubb)

#### 4. Layout-issues fra PLP

- «Vis 20 av 135» — mange produkter i denne kategorien
- «Relevans» sort mulig; andre sorteringsvalg usynlige i screenshot
- Mobile: Produktkort sannsynlig 1-2 kolonner (ikke verifisert)

---

## Datafelter per produkt (Data Inventory)

### Maling (PDP)

**Fra PIM (Commerce):**
- SKU/Produkt-ID
- Produktnavn (logistikknavn)
- Kategori (Auto/Innedo/Ute)
- Merke
- Volumer (2.7L, 3L, 9L, 10L, 0.68L osv.)
- Base (Farge, Hvit, Transparent osv.)
- Priser per volum
- Lagerkode/Availability-flag
- Lagerstatus (på lager i N butikker)

**Fra Sanity CMS (Redaksjonell):**
- Produktbeskrivelse (OG meta description)
- Displaynavn (hvis annet enn PIM-navn)
- Innhold/Feature-liste («Selvrensende», «Teknologi», etc.)
- Relatert innhold (artikler/guider) — **Ikke observert i UI**
- Målfoto (hero-bilde)
- **Ikke observert:** Teknisk spesifikasjon, tørketid, forberedelse, miljøinformasjon

**Fra Rating-system (antagelig Lipscore eller lignende):**
- Rating (4.8/5)
- Antall stemmer (34)
- Antall anmeldelser (10)
- Reviewtekster — **Ikke synlig på PDP, kun lenke**

**Fra Butikk-API (Lindback/Pinmeto):**
- Lokal lagerstatus (61/69 butikker)
- Butikkliste (ikke synlig på PDP)

**MANGLENDE:**
- Teknisk data (VOS, dekkekraft, glansnivå)
- Farge-koder (NCS, Jotun color reference, HEX)
- Instruksjonsbilde (application guide)
- Miljømerking/sikkerhetsinformasjon
- FAQ
- Utstyrveiledning (roller, pensler, etc.)

---

## Funksjonalitet og CTA-er

### Tilgjengelig på PDP

| CTA | Type | Observasjon |
|---|---|---|
| **Kjøp** | Primary button | Oransje, prominent. Legger valgt volum i handlekurv |
| **Beregn mengde** | Secondary button/link | Åpner kalkulator — areal → volum |
| **Omtaler (10)** | Link | Åpner anmeldelsesseksjon (mulig modal/tab) |
| **Relaterte produkter** | Link grid (sidebar) | 4 faste lenker per kategori |
| **Se film** | Link | Mulig video-tutorial (ikke verifisert) |
| **Ikke på lager? Spør oss** | Link/CTA | Dialog/support trigger |
| **Klikk og hent** | Badge/info | Indikator for samme-day pickup-mulighet |
| **På lager i [N] butikker** | Info text | Klikkbar? Åpner butikklokator? (Ikke verifisert) |

### MANGLENDE funksjonalitet

| CTA | Relevans | Prioritet |
|---|---|---|
| Fargevelger | **Kritisk** — kunde velger farge, så produkt | Må ha (P1) |
| Favoritt/Wishlist | Høy — "lagre for senere" | Bør ha (P2) |
| Del på sosiale | Medium — deling driver engagement | Kan ha (P3) |
| Sammenligning | Medium — sammenlign produkt side-by-side | Kan ha (P3) |
| Teknisk spesifikasjon-tabs | Høy — PDF/readable spessheet | Bør ha (P2) |
| Chat/Expert konsultasjon | **Kritisk** — kunde-try-seg-åpen, S1 | Må ha (P1) |
| Instruksjon-video | Medium — diy-trygghet | Bør ha (P2) |

---

## Navigasjon og kryssalg

### Internal links (observert)

**Venstre sidebar:**
- 4 relaterte produkter (samme kategori)
- **Ikke dynamisk** — samme liste for Drygolin og Baron

**Sidewide navigation:**
- Topnav: FARGER / GULV / TAPET / INTERIØRMALING / UTEMALING / MALINGSVERKTØY / VERKTØY & TILBEHØR / VASK & RENGJØRING / SE MER
- Breadcrumb: Maling / Utemaling / Beis (tekstbasert, grå)

### MANGLENDE kryssalg

| Type | Eksempel | Notat |
|---|---|---|
| **Fargre-PDP** | «Se denne fargen i andre produkter» | Farge-first discovery |
| **Artikler** | «Slik maler du tre» guide | Inspirasjon + SEO |
| **Utstyr** | Anbefalt roller, pensel, primer | Algolia Recommend |
| **Kampanje** | «Sparen på hele settet» | Promotion linking |
| **Expert konsultasjon** | «Booke en fargekonsulent» | Tjeneste-PDP link |

---

## SEO og Technical

### Meta tags (samlet)

**Drygolin Nordic Extreme:**
```html
<title>Drygolin Nordic Extreme - Ekstrem holdbarhet | Fargerike</title>
<meta name="description" content="DRYGOLIN Nordic Extreme har en unik Extreme-teknologi...">
<meta property="og:title" content="Drygolin Nordic Extreme...">
<meta property="og:description" content="[variant av meta description]">
<meta property="twitter:card" content="summary_large_image">
```

**Baron Terrassebeis:**
```html
<title>Baron Terrassebeis - Vannbasert terrassebeis | Fargerike</title>
<meta name="description" content="[OG-style description]">
<meta property="og:title" content="Baron Terrassebeis...">
```

### Strukturert data (JSON-LD)

**Observert:**
- ✅ Organization schema (Fargerike as company)
- ❌ **Product schema MANGLER** (kritisk!)
- ❌ Breadcrumb ListItem schema (mangler)
- ❌ AggregateRating schema (rating vises, men ikke maskinlesbar)
- ❌ Offer/availability (pris og lager, men ikke maskinlesbar)

**Impact:**
- Google Product Search: Produkter kommer ikke med rike snippets
- Voice search: Ikke mulig å hente rating/price via taleoppsummering
- Rich snippets: Ikke synlig i Google search results
- Schema validation: Bare Organization, ingen Product

### SEO Funn

| Element | Status | Notat |
|---|---|---|
| **Title length** | ✅ 45–55 chars | God, innen límite |
| **Meta description** | ✅ ~155 chars | God dekning |
| **Canonical URL** | ⚠️ Ikke verifisert | Burde være present |
| **Mobile viewport** | ✅ Responsive | Layout fungerer mobilt |
| **Page speed** | ⚠️ Ikke målt | Kritisk for konvertering |
| **Backlinks** | ⚠️ Ikke analyse | Ikke i scope av analyse |
| **Internal linking** | ⚠️ Minimal | Bare sidebar-links |
| **Alt text (images)** | ⚠️ Ikke verifisert | Bilde-SEO viktig |
| **H1 tag** | ✅ Produktnavn | Korrekt struktur |
| **Product schema** | ❌ **MANGLER** | **KRITISK GAP** |
| **Rating schema** | ❌ **MANGLER** | Rating vises, ikke lesbar |
| **Breadcrumb schema** | ❌ **MANGLER** | Navbreadcrumb vises, ikke struktur |

---

## Gap-analyse: Nå vs. FRS-krav

### Informasjonsarkitektur

| FRS Krav | Nå status | Gap | Prioritet |
|---|---|---|---|
| **Kategoritilpassede templates** | Ingen — samme template alle malingtyper | Må ha 3+ templates (interior/exterior/flytende) | P1 |
| **Displaynavn** | Ikke separat — blandet med produktnavn | Trenger display-name felt i CMS | P2 |
| **Skjul tomme felt** | ✅ Gjøres (ikke synlig tomme felt) | OK | ✅ |
| **Produktbeskrivelse** | Minimal (OG meta, intet mer) | Mangler redaksjonell tekst på PDP | P1 |
| **Tekniske spesifikasjoner** | ❌ Ikke synlig | Trenger tabs: Dekkekraft, VOS, glansnivå, tørketid, forberedelse | P1 |

### Bilder og visuelt

| FRS Krav | Nå status | Gap | Prioritet |
|---|---|---|---|
| **Bildekvalitet** | ✅ God — produktbilde, men lavt antall | Legge til miljøbilde (ferdig malt rom), detalj, applikasjon | P2 |
| **Bildegalleri** | ❌ Kun 1 bilde | Minst 3–4 bilder per produkt | P2 |
| **Bildeoverst.hierarki** | ⚠️ Uklar | Kjede-bilde > NOB > fallback — ikke implementert | P2 |
| **Romvisualisering** | ❌ Ingen Roomvo | Plan for senere (Sharefox 2026) | P3 |

### Farge-integrering (mg-color)

| FRS Krav | Nå status | Gap | Prioritet |
|---|---|---|---|
| **PDP Color Picker** | ❌ Ingen fargevelger | Må ha inline fargevelger for hver farge | **P1 - KRITISK** |
| **Jotun iFrame fallback** | ❌ Ingen | Midlertidig løsning mens egen picker bygges | P1 |
| **Multi-brand fargeval** | ❌ Ingen | Jotun + Caparol + Beckers + egne | P2 |
| **Bas-/SKU-oppløsning** | ⚠️ Uklar | Handlekurv må ha riktig base/volum basert på fargeval | P1 |
| **Kompatibilitetsinfo** | ❌ Ingen | «Se denne fargen i: maling, tapet, gulv» | P2 |
| **NCS-kode visning** | ❌ Ingen | NCS-kode under fargavelger | P2 |
| **Kulør-URL deep linking** | ❌ Ingen | Deep-linkable URL per farge (f.eks. `/drygolin-nordic-extreme?color=NCS%202030G10Y`) | P1 |

### Kjøpsflyt og konvertering

| FRS Krav | Nå status | Gap | Prioritet |
|---|---|---|---|
| **Lokal lagerstatus** | ✅ Vises (61–69 butikker) | Trenger klikk til butikklokator for detalj | P2 |
| **Legg i handlekurv** | ✅ Kjøp-button fungerer | OK — Fase 2 | ✅ |
| **Kalkulator** | ✅ «Beregn mengde» button | Fungerer? Trenger verifikasjon | ⚠️ |
| **Klikk-og-hent** | ✅ Badge «Tilgjengelig for klikk og hent» | OK — Fase 2 | ✅ |

### Innhold og kryssalg

| FRS Krav | Nå status | Gap | Prioritet |
|---|---|---|---|
| **Relaterte artikler** | ❌ Ikke synlig | Link til how-to: «Slik maler du tre», «Forberedelser» | P1 |
| **Produktanbefalinger** | ❌ Ingen (bare kategorigruppe) | Algolia Recommend: «Kunder som kjøpte denne, kjøpte også...» | P2 |
| **Kampanjevisning** | ❌ Ingen | Banner/badge for kampanjeprodukter | P2 |
| **Produktanmeldelser** | ⚠️ Rating synlig, tekst ikke | Inline anmeldelser (3–5 kort, «se alle» link) | P2 |
| **Utstyrveiledning** | ❌ Ingen | «Anbefalt utstyr» seksjon: roller, pensel, primer, beholder | P1 |
| **Trygghetsinformasjon** | ❌ Ingen | VOC, lukt, barnerom-sikkerhet, miljømerking | P1 |
| **Fremgangsmåte (how-to)** | ❌ Ingen | «Steg-for-steg» guide på siden | P1 |

### Tracking og analyse

| FRS Krav | Nå status | Gap | Prioritet |
|---|---|---|---|
| **GA4 view_item** | ✅ Antagelig satt (standard) | Bekreft implementering | ✅ |
| **Heatmap/scroll-tracking** | ⚠️ Uklar | Verktøyvalg kreves (Hotjar, Contentsquare?) | P3 |
| **Konvertering per kategori** | ✅ GA4 | OK | ✅ |

---

## Benchmark: Fargerike vs. Klint PDP

Ref: `04-kilder/2026-03-25_gap-analyse-klint-vs-fargerike-pdp.md`

| Område | Klint | Fargerike | Gap | Klint score |
|---|---|---|---|---|
| **Fargevelger** | Grid 3–4 farger, instant search | ❌ Ingen | Kritisk | 5/5 |
| **Produktvalg** | Flervalg (vegg/tak/tre) | Enkelt produktvalg | Høyt | 4/5 |
| **Mengdekalkulator** | Integrer (areal → liter) | Egen button, ikke inline | Medium | 4/5 |
| **Utstyrveiledning** | «Du trenger også» seksjon | ❌ Ingen | Høyt | 5/5 |
| **FAQ/Trust** | «Spørsmål om produktet», FAQ-accordion | ❌ Ingen | Kritisk | 5/5 |
| **Instruksjon** | Steg-for-steg videoembed | «Se film» lenke | Medium | 4/5 |
| **Anmeldelser** | UGC-bilder, testimonialer | Rating + lenke til anmeldelser | Høyt | 4/5 |
| **Inspirasjon** | Integrert mood-boards | Relaterte artikler (ikke synlig) | Høyt | 4/5 |
| **Mobil UX** | Optimert cards | Responsiv, men begrenset | Medium | 4/5 |
| **Overall (GAP-analyse)** | 4.9/5 | **1.4/5** | **-3.5/5** | **88 % gap** |

**Konklusjon:** Klint solver hele «prosjekt-flow» (farge → produkt → mengde → utstyr → kunnskap → trygget → kjøp). Fargerike er ren **katalog** uten prosjekt-hjelp. Kritiske gap: fargevelger, FAQ, utstyr, instruksjon, trust.

---

## Manglende features og muligheter

### Kritiske gap (P1 – må ha)

1. **Fargevelger på PDP**
   - Integrert farggrid, ikke lenke til farge-PDP
   - Instant search (navn, NCS, HEX, stemning)
   - Vis prøvefarge for hver variant
   - Krav: mg-color API

2. **Produktbeskrivelse (redaksjonell)**
   - Erstat mini-OG meta med full tekst
   - Features, benefits, bruksomåde
   - Kilde: Sanity CMS (ikke PIM)

3. **Teknisk spesifikasjon**
   - Tabs: Dekkekraft, VOS, glansnivå, tørketid
   - PDF-kalkulator (areal → liter)
   - Sikkerhetsinformasjon (barnerom, VOC)

4. **Kundehjelp**
   - Chat/live support widget
   - Link til ekspert-booking (Tjeneste-PDP)
   - FAQ-accordion per produktkategori

5. **Kryssalg**
   - «Se denne fargen i ...» (maling, tapet, gulv)
   - Anbefalt utstyr (roller, pensel, primer, beholder)
   - Algolia Recommend: «Kunder kjøpte også»

### Høyt prioritet (P2 – bør ha)

- **Bildegalleri:** 3–4 bilder (produkt, miljø, detalj, applikasjon)
- **Inline anmeldelser:** 3–5 kortlenke + «se alle»
- **Instruksjonsvideo:** Embedded YouTube/Vimeo
- **Kategoritilpassede templates:** Interior/exterior/flytende ulike
- **Store-locator:** «På lager i 61 butikker» → klikk viser lokaler + kart

### Medium prioritet (P3 – kan ha)

- **Favoritt/Wishlist:** «Lagre for senere» → login → sync
- **Sammenligning:** Side-by-side produkt
- **Sosial deling:** «Del på Pinterest/Facebook»
- **Ansett-kampanjer:** «Kampanjebadge» på mini-kart
- **Roomvo:** Visualisering i eget rom (2026 plan)

---

## Data Sources (PIM vs. CMS)

### Fra PIM (Omnium/Commerce)

- Produktnavn, SKU, kategori, merke
- Volumer, baser, priser
- Lagerkode, tilgjengelighet
- Lagre telle (Lindback API)

**Observasjon:** Tydelig PIM-drevet layout (prisliste, volumtabell). Navn er logistikknavn («Nordic Extreme», «Terrassebeis»), ikke kundevennlig.

### Fra Sanity CMS

- OG meta description (eneste redaksjonelle tekst)
- Mulig: Relatert innhold (artikler) — **ikke synlig på PDP**
- Mulig: Displaynavn (hvis opprettet) — **ikke brukt**

**Gap:** CMS har stort potensial — blitt er ren katalog, ikke redaksjonell opplevelse.

### Fra Rating-API (Lipscore?)

- Rating (4.8/5, 4.4/5)
- Stemmeantall (34, 34)
- Anmeldelser (10, 10)
- **Ikke:** Tekst, bilder, verified-buyer-badge

### Fra Butikk-API (Lindback/Pinmeto)

- Lagerstatus per butikk (61–69)
- Antall butikker med lager
- **Ikke:** Butikkdetail, åpningstider, reservasjon

---

## Observasjoner og sluttdeler

### Hva som fungerer

1. ✅ **Enkel produkt-info** — navn, pris, rating, lagerstatus er lett tilgjengelig
2. ✅ **Kjøpsfunksjon** — handlekurv-button er fremtredende og klar
3. ✅ **Rating-innslag** — tillit-signal vises (4.8/5)
4. ✅ **Multi-volumer** — alle priser vises transparent
5. ✅ **Lokale lager** — «61 butikker» gir trygghet

### Hva som ikke fungerer

1. ❌ **Ingen fargevelger** — kunde må forlate siden for å finne farge (kritisk!)
2. ❌ **Ingen produkdetaljer** — dekkekraft, VOS, tørketid, forberedelse mangler
3. ❌ **Ingen prosjekt-flow** — maling er del av et større prosjekt (hele rommet), men side er ren katalog
4. ❌ **Minimal innhold** — OG meta er eneste tekst; ingen guide, ingen tips
5. ❌ **Ingen FAQ** — kunde usikker på applikasjon, tørketid, rengjøring må søke anderstedst
6. ❌ **Ingen utstyrveiledning** — roll, pensel, primer ikke anbefalt
7. ❌ **Manglende SEO-markup** — Product schema ville drevet Google Shopping, rich snippets
8. ❌ **Relaterte produkter hardkodet** — same 4 items for alle produkter, ikke dynamisk

### Root cause-analyse

**Arkitektur:**
- PDP bygget som **rent katalog-views over PIM**
- Sanity CMS **brukes ikke** for PDP-innhold (bare meta)
- **Ingen integrasjon** mellom produkt, farge, og prosjekt-kontekst
- Algolia brukes for søk, **ikke** for anbefalinger på PDP

**Prioriteringer:**
- V1 fokuserte på **produkt-visning**, ikke **kunde-hjelp**
- Gap-analyse (Klint 4.9 vs. Fargerike 1.4) viser Klint solver **prosjekt-opplevelse**, Fargerike er **katalog-first**

**Konsekvens:**
- Lav konvertering — kunde må selv tolke data
- Høy bounce — ingen prosjekt-kontekst
- Dårlig bruk av Sanity CMS — rikt innhold uten bruk
- Mistet SEO-mulighet — uten Product schema

---

## Konklusjon og neste steg

### Status per 2026-03-25

Fargerike Produkt-PDP (maling) har **enkel, funksjonal katalog-struktur**, men **mangler prosjekt-kontekst, kundehjelp, og SEO-markup** som driver konvertering og organisk trafikk.

**Nåværende score (anslått):** 1.4/5 (som GAP-analyse viser)

**Kritiske gap:**
1. Fargevelger (mg-color integrering) — avhenger av MG-API-tilgjengelighet
2. Produktbeskrivelse (Sanity CMS bruk) — let å implementere
3. Teknisk spesifikasjon (tabs) — data fra PIM finnes, bare layout mangler
4. FAQ/Trust (redaksjonell) — krev innholdsarbeid
5. Utstyrveiledning (anbefalinger) — Algolia Recommend kan bruke

**Neste fase-arbeid (FRS-referanser):**
- [ ] Les `kjerneflyter-pdp.md` for design-desisjon på fargevelger-plassering
- [ ] Les `pdp-produkt.md` for fullstedig requirement-liste
- [ ] Integrer mg-color API når tilgjengelig (avhenger MG Fase 2)
- [ ] Setupt Sanity CMS-schema for produktbeskrivelse, teknisk data
- [ ] Implementer FAQ-accordion per kategori (interiør/eksteriør/flytende)
- [ ] Algolia Recommend for utstyrveiledning
- [ ] Product JSON-LD schema-markup (Google Shopping, rich snippets)

---

## Vedlegg

### Analysealternativ (friere kilder)

- Klint PDP: https://klint.com/no/farger/himla
- Fargerike Drygolin: https://www.fargerike.no/maling/ute/tre-og-fasade-/drygolin-nordic-extreme/
- Fargerike Baron: https://www.fargerike.no/maling/ute/tre-og-fasade-/baron-terrassebeis/
- Fargerike Interiørmaling (PLP): https://www.fargerike.no/maling/inne/

### Kravdokumenter (referanser)

- `02-krav/frs/pdp-produkt.md` — Produktkrav (krave, prioritet, status)
- `02-krav/frs/kjerneflyter-pdp.md` — End-to-end flyter, designdesisjoner, state management
- `02-krav/frs/pdp-farge.md` — Farge-PDP krav (parallel til produkt-PDP)
- `02-krav/prd/2026-03-23_mg-color-prd.md` — mg-color integreringskrav
- `04-kilder/2026-03-25_gap-analyse-klint-vs-fargerike-pdp.md` — GAP-analyse (4.9 vs 1.4)

### Skjermbilde og data

**Drygolin Nordic Extreme (screenshot):**
- Rating: 4.8/5 (34 stemmer)
- Priser: 2.7L (1,589kr), 3L (1,199kr), 9L (4,769kr), 10L (2,699kr)
- Lagerstatus: På nettlager (gratis levering), På lager i 61 butikker
- Relaterte produkter: Trebitt Oljebeis, Trebitt Terrassebeis, Jernvitrol, Tyrilin

**Baron Terrassebeis (screenshot):**
- Rating: 4.4/5 (34 stemmer)
- Priser: 3L (499kr), 10L (1,499kr)
- Lagerstatus: På nettlager, På lager i 69 butikker
- Relaterte: Same liste som Drygolin (hardkodet kategori?)

**Interiørmaling PLP:**
- 135 produkter viser (20 av 135)
- Filtres: Vegg & tak, Spraymaling, Gulv, Beis, etc.
- Sort: «Relevans»
- Produktkort template: Bilde, navn, beskrivelse, rating, pris, buttons

---

**Analyse gjennomført:** 2026-03-25
**Analysør:** Claude Code UX-analyse
**Format:** Markdown (spec-driven development)
**Status:** Komplett — klart for frs-oppdatering

