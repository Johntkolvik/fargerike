# TASKS – Fargerike

Sist oppdatert: 2026-04-08

## Aktive oppgaver

### 🔴 Første arbeidsdag etter påske (7. april)

- [ ] **⚠️ Vercel build-feil** – 3 mislykkede prod-deploy på `main` den 4. april (kl. 08:00–08:17). Sjekk deployment-loggen og fiks. Kan blokkere videre utvikling.
- [ ] **Svar Eline – Prisestimat Luc** – Gi tilbakemelding på 9 estimerte oppgaver (~70-80t). Anbefaling: prioriter SEO-kritiske (SSR, schema, robots) og hold igjen på sitemap/paginering. Utkast i briefing 27.03.
- [ ] **Svar Eline – Datafeed Google Ads** – Bekreft at forespørsler kan gå via deg fremover. Oscar+Luc kan kjøre på med XML-feed. Utkast i briefing 27.03.
- [ ] **Svar Jotun (Magnus Sjögren)** – Bekreft at domener kommer etter avklaring av avtale internt i MG.
- [ ] **Algolia Service Order** – Frist var 2. april (påskeonsdag). Sjekk om Birger/Petter signerte. Følg opp umiddelbart.
- [ ] **Supplere Stines Algolia-post i #mg_alle** – Utkast i briefing 29.03.

### 🟡 Uke 15 (7.–11. april)

- [ ] **Book Figma-sesjon med Luke Cowley** – DM mottatt over påske. Han ønsker å utforske Figma-prosjektet og planlegge in-person-møter i Oslo. Svar med foreslåtte tidspunkter (tirsdag/onsdag). Også alpha-tilgang Figma AI.
- [ ] **Book innføringsmøte med Petter Sandholt** – MG-riggen (Omnium, Sanity, PIM, integrasjoner). Petter sa ja 19. mars. Nødvendig for workshop 17. april.
- [ ] **Forberede workshop 17. april** – As-is analyse av dagens Fargerike-plattform. Tildelt i Monday.com.
- [ ] **Hent transcripts fra 19. mars-møtene** – Oppstartsmøte Markedsføring + SEO. Trale-søk viser at de nå er tilgjengelige (19 dager). Hent og oppsummer.
- [ ] **Produktnavn og datamodell** – Monday.com-oppgave. Kartlegge nåværende produktnavnstruktur.
- [ ] **Tracking og måling (heatmap)** – Monday.com-oppgave. Sette opp Clarity/heatmap?
- [ ] **Konkurrentanalyse/business review** – Fra oppstartsmøte 11. mars. Deadline 22. april.

### 🟡 Uke 16 (14.–17. april)

- [ ] **Workshop 17. april** – Presentere as-is + fremtidig visjon for Fargerike-plattformen.
- [ ] **Plenum BC FFH uke 16** – Endelig godkjenning av business case felles e-handel.

### 🟢 Pågående / bakgrunn

- [ ] **Tekniske SEO-tiltak hos Luc** – Monday.com-oppgave. Koordiner med Eline.
- [ ] **Templater og frontend** – Monday.com-oppgave.
- [ ] **Manuelt arbeid uten system** – Monday.com-oppgave. Kartlegg manuelt arbeid.
- [ ] **FargePIM-prosjekt** – Eget budsjett (~128K). Petter ansvarlig, Magnus+John fra TRY med. **Digital Kick-off 9. april kl. 09:00** (Teams). Deltakere: Petter, Birger, John, Eline, Sandra, Magnus B.
- [ ] **Jotun Colour Picker / mg-color** – **AVKLART 26. mars:** Norsk avtale krever IKKE iframe/colour picker. MG står fritt til å lage egen FargePIM. Muntlig enighet om link til Jotun color picker fra PDP, men fri UI/UX.
- [ ] **PDP-idéer fra notater 27. mars** – Book avtale med fargerådgiver, flere content blocks, «bytte malingsprodukt»-modal med seksjonerte valg (tre, våtrom, slett vegg). Legges inn i FRS.
- [ ] **Audit av nettstedet** – Deadline 22. april. Kalenderblokk «Fargerike: Audit» brukt 30. mars.
- [ ] **Colorama duplikater** – Magnus B rapporterte duplikerte properties (Silkematt/Silkesmatt) på colorama.se. Teknisk sak for TRY Stockholm, men relevant for FargePIM-arkitektur.

## Kravarbeid (CXO Playbook)

Disse oppgavene følger CXO Playbook (`02-krav/prd/2026-03-25_cxo-playbook.md`).

### Blokk 1: Kartlegg nåsituasjonen

| # | Oppgave | Status | Output | Plassering |
|---|---|---|---|---|
| 1.1 | Sitemap-crawl og sidetype-klassifisering | ✅ Gjort | **10 371 URL-er**, ~40 unike sidetyper | `04-kilder/sitemap_fargerike_content.xml` + `04-kilder/sitemap-klassifisering.md` |
| 1.1b | As-is PRD per sidetype | ✅ Gjort | 6 filer dekker alle makro-sidetyper | `02-krav/as-is/` |
| 1.2 | Søkeordanalyse | ✅ Gjort | 2 870 søkeord, 191k søk/mnd, 39 kat. | `04-kilder/sokeordanalyse-sammendrag.md` |
| 1.3 | Trafikkanalyse + benchmark | ✅ Gjort (28d) | 143K aktive, benchmark + målrammeverk | `04-kilder/2026-03-25_ga4-benchmark.md` |
| 1.4 | BMC | ✅ Gjort | Workshop jan 2026 | Confluence |
| 1.5 | Nåsituasjonsrapport | ❌ Ikke startet | | |

### Blokk 2: Forstå gapet

| # | Oppgave | Status | Output | Plassering |
|---|---|---|---|---|
| 2.1 | Kundemøte validering | 🟡 Delvis | Eline-møte 11.03 | `03-transcripts/` |
| 2.2 | Gap-analyse per sidetype | 🟡 Kun PDP | Klint vs Fargerike | `04-kilder/gap-analyse` |
| 2.3 | Benchmark | 🟡 Kun PDP | Klint | gap-analyse |
| 2.4 | Innholdsklustere | 🟡 Førsteutkast | 8 klustere | CXO Playbook |

### Blokk 3: Definer hva som skal bygges

| # | Oppgave | Status | Output | Plassering |
|---|---|---|---|---|
| 3.1 | Sidetype-sett | 🟡 Utkast | Se playbook | CXO Playbook |
| 3.2 | Scope per sidetype | 🟡 PDP har PRD | PDP-PRD Fase 1 | `02-krav/prd/pdp-prd-fase1.md` |
| 3.3 | Dataflyt-diagram | 🟡 Overordnet | Arkitekturdiagram | PRD |
| 3.4 | SEO-migreringsplan | ❌ Ikke startet | | |
| 3.5 | Event-tracking | ❌ Ikke startet | | |
| 3.6 | Designbriefer | ❌ Ikke startet | | |

## Kontekst og beslutninger

### Algolia
- Beslutning nær: 3-årsavtal, ~99K EUR/år for hele MG-gruppen
- 75K pooled search units, kan utvides
- Frist: 2. april
- Stine kommuniserer at beslutning trolig landes over påske

### Jotun/mg-color (oppdatert 27. mars)
- **AVKLART:** Norsk avtale krever IKKE widget/iframe-implementering – MG står fritt til å lage egen FargePIM
- Muntlig enighet om at det skal finnes en link til Jotuns color picker fra PDP, men UI/UX er fritt
- Digital Kick-off FargePIM: 9. april kl. 09:00
- mg-color-prosjektet erstatter inRiver-systemet
- Magnus Bergman (TRY Göteborg) ønsker å bidra
- Varumärkes-bekymring: Colorama/Happy Homes kan ikke påvirke widget-utseende

### BC FFH – Felles e-handelsplattform (oppdatert 29. mars)
- Felles backend/checkout/logistikk for Bolist, Colorama, Happy Homes – kun frontend unik
- Last mile, pick-up-in-store, dropship som standard
- MG Logistikk AB selgende part
- Västerås håndterer fargeblanding, Jönköping utredes etter påske
- **Ambisjon:** 100 MSEK/år farge på nett innen år 3
- **Budsjett Colorama:** 200K SEK for full netthandel
- **Tidsplan:** Aksjoner uke 15 → Plenum uke 16 → Colorama checkout etter sommer
- Sandra jobber med BC-underlag sammen med Sven (tidl. inköpschef), leverer uke 15

### Prosessplan e-handel (konfidensielt, oppdatert 27. mars)
- Bolist: pilot etter påske – smygstartet allerede (TRY Stockholm)
- Colorama: etter sommeren (strenge krav til organisering før sommeren)
- Fargerike Norge: etter sommeren
- Fokus nå: Bolist-checkout ferdigstilles (Julia Jäderberg, TRY Stockholm)
- Sentralt før sommeren: FargePIM (Magnus+John), Klaviyo CRM (Julie Lium), Checkout (Stian), Min Side
- Colorama ønsker IKKE Click & Collect som første steg, men dropship og hemleveranse

### MGxTRY Nyhetsbrev (24. mars)
- Første månedlige nyhetsbrev sendt til Mestergruppen
- Nina Hove Stiansen koordinerer
- Alle i mg_alle oppfordres til å dele arbeid som kan inkluderes

### Fargerike Arena (21. mars)
- Stine Ekström holdt presentasjon om AI-synlighet og SEO for butikksjefer
- Tiltak iverksatt umiddelbart av Fargerikets markedsavdeling

### Sitemap-innsikter (ny)
- Sitemapen inneholder **10 371 URL-er** – langt mer enn estimert (1 097)
- Tapet-PLP: 3 431 sider (største kategori)
- Farge-PDP/oversikt: 3 239 sider
- Tilbehør/verktøy: 1 738 sider
- Gulv: 695 sider
- Maling-PDP: 270 sider
- Inspirasjon: 438 sider (fordelt på 8 undertyper)
- Tips & råd: 103 artikler

## PDP UX/SEO/AEO-forbedringer

Basert på audit 26. mars. Alle oppgaver gjelder `src/app/(site)/produkt/[sku]/page.tsx` og tilhørende komponenter med mindre annet er spesifisert.

### 🔴 SEO – Kritisk

- [x] **PDP-SEO-1: Canonical-tag** – Legg til `<link rel="canonical">` i `generateMetadata()`. Bruk `https://fargerike.no/produkt/${sku}` som canonical URL.
  - Fil: `src/app/(site)/produkt/[sku]/page.tsx` → `generateMetadata()`

- [x] **PDP-SEO-2: Open Graph + Twitter Card** – Legg til `og:title`, `og:description`, `og:image`, `og:type=product`, `og:url`, `twitter:card=summary_large_image` i `generateMetadata()`. Bruk `product.images[0].url` som bilde.
  - Fil: `src/app/(site)/produkt/[sku]/page.tsx` → `generateMetadata()`

- [x] **PDP-SEO-3: BreadcrumbList JSON-LD** – Legg til `BreadcrumbList`-schema som eget `<JsonLd>`-element ved siden av breadcrumb-komponenten. Bruk `itemListElement` med posisjon, navn og URL for hvert ledd.
  - Fil: `src/app/(site)/produkt/[sku]/page.tsx`, breadcrumb-seksjonen

- [x] **PDP-SEO-4: Product-schema `image`** – Legg til `image: product.images[0].url` i Product JSON-LD. Obligatorisk for Google Product snippets.
  - Fil: `src/app/(site)/produkt/[sku]/page.tsx`, Product `<JsonLd>`

- [x] **PDP-SEO-5: Product-schema identifikatorer** – Legg til `gtin13`, `mpn` og `category` i Product JSON-LD. Utvid `SEED_PRODUCTS.ladyPureColor` i seed-data med disse feltene.
  - Filer: `src/lib/seed/data.ts` + `src/app/(site)/produkt/[sku]/page.tsx`

### 🟡 UX – Kritisk

- [x] **PDP-UX-1: Anbefalt utstyr – klikkbare kort med bilder** – Gjør hvert utstyrselement til et klikkbart kort med: (a) produktbilde-placeholder (thumbnail), (b) lenke til produktside `/produkt/[slug]`, (c) pris-placeholder. Utvid `recommendedEquipment` i seed-data med `slug`, `imageUrl`, `price`. Lag en `EquipmentCard`-komponent.
  - Filer: `src/lib/seed/data.ts`, ny `src/components/pdp/EquipmentCard.tsx`, `page.tsx` utstyrsseksjon

- [x] **PDP-UX-2: Sertifiseringer – lenker og ikoner** – (a) Gjør «Svanemerket» til lenke med offisiell logo/ikon. (b) Gjør EPD-nummer `NEPD-6018-5299-NO` til ekstern lenke til `epd-norge.no` med `target="_blank" rel="noopener"` + eksternt-lenke-ikon. (c) Gjør «ISO 14001» til lenke med filikon. Utvid `certifications` i seed-data med `url` og `iconType`.
  - Filer: `src/lib/seed/data.ts`, `page.tsx` sertifiseringsseksjon

- [x] **PDP-UX-3: «Ikke egnet for» – krysslenke til riktig produkt** – Parse teksten i `notSuitableFor`-array og gjør produktnavn (f.eks. «Lady Supreme Finish») til `<Link>` til `/produkt/lady-supreme-finish`. Utvid seed-data med `linkedProduct`-felt per entry, eller bruk regex-match.
  - Filer: `src/lib/seed/data.ts`, `page.tsx` overflateseksjon

- [x] **PDP-UX-4: Guider – bilder på kort** – Legg til `coverImage`-felt i `SEED_ARTICLES` og vis som bilde øverst i guidekortene. Bruk plausible placeholder-URL-er.
  - Filer: `src/lib/seed/data.ts`, `page.tsx` guider-seksjon

### 🟡 UX – Viktig

- [x] **PDP-UX-5: Prisformatering med tusenskilletegn** – Bruk `toLocaleString("nb-NO")` for alle prisvisninger. Sjekk `VolumePicker.tsx`, `StickyBuyBar.tsx`, og `page.tsx`.
  - Filer: `src/components/pdp/VolumePicker.tsx`, `src/components/pdp/StickyBuyBar.tsx`

- [x] **PDP-UX-6: Literpris per variant** – Beregn og vis kr/L for hver variant i `VolumePicker`. F.eks. «2.7 L – 799 kr (296 kr/L)».
  - Fil: `src/components/pdp/VolumePicker.tsx`

- [x] **PDP-UX-7: «Mest populær»-badge** – Legg til `isPopular: true` på 2.7L-varianten i seed-data og vis en «Mest populær»-badge i `VolumePicker`.
  - Filer: `src/lib/seed/data.ts`, `src/components/pdp/VolumePicker.tsx`

- [x] **PDP-UX-8: «Egnet for»-tagger som lenker** – Gjør overflatetyper til `<Link>` som peker til filtrerte kategorisider, f.eks. `/kategori/maling?overflate=gips`. Forbedrer intern lenkestruktur.
  - Fil: `page.tsx` overflateseksjon

### 🟡 AEO – Forbedringer

- [x] **PDP-AEO-1: Produktbeskrivelse i prosa** – Legg til en sammenhengende paragraf (3-5 setninger) mellom hero og tekniske specs som beskriver produktets posisjon, egenskaper og bruksområder. Denne gir AI-søkemotorer bedre utdrag enn bare punktlister. Legg til `longDescription`-felt i seed-data.
  - Filer: `src/lib/seed/data.ts`, `page.tsx` (ny seksjon etter hero)

- [ ] **PDP-AEO-2: HowTo-schema for guider** – Legg til `HowTo` JSON-LD for artikler med `articleType: "howto"`. Bruk `steps`-arrayet fra `SEED_ARTICLES.howToPaintWall`. Implementer på artikkelsidene.
  - Fil: `src/app/(site)/artikkel/[slug]/page.tsx`

### 🟢 Tilgjengelighet

- [x] **PDP-A11Y-1: Skip-link** – Legg til en skip-link som hopper til `<main>` i layout. Skal være visuelt skjult men synlig ved focus. WCAG 2.1 A-krav.
  - Fil: `src/app/(site)/layout.tsx` (eller `src/app/layout.tsx`)

- [x] **PDP-A11Y-2: Søkefelt-label** – Legg til `aria-label="Søk"` på søkefeltet i header. Mangler `<label>` for skjermlesere.
  - Fil: `src/components/layout/Header.tsx` (eller tilsvarende søkekomponent)

### 🟢 SEO – Nice-to-have

- [x] **PDP-SEO-6: Robots-meta** – Legg til eksplisitt `robots: "index, follow"` i `generateMetadata()`.
  - Fil: `src/app/(site)/produkt/[sku]/page.tsx`

- [ ] **PDP-SEO-7: Preconnect for Lipscore** – Legg til `<link rel="preconnect" href="https://widget.lipscore.com">` når Lipscore-integrasjonen er på plass.
  - Fil: `src/app/layout.tsx`

## Gjennomført

- [x] Joinet #mg_alle, #mg_overflate_ecom, #mg_produktleder (19. mars)
- [x] Oppstartsmøte Markedsføring + Nettbutikk (11. mars)
- [x] Meet and greet Eline Fjeld
- [x] Jotun Colour Picker møte (23. mars) – Trale-referat mottatt
- [x] GAP-analyse PDP: Klint vs Fargerike (score 4.9 vs 0.7-1.4)
- [x] PDP-PRD Fase 1 (kodevennlig, med TypeScript interfaces, Sanity-schemas, mock data)
- [x] Søkeordanalyse-sammendrag (2 870 søkeord fra Riff)
- [x] CXO Playbook opprettet (oppgavedrevet, generaliserbar)
- [x] 8 innholdsklustere definert (data-informert, basert på søkeord + sitemap + BMC)
- [x] GA4-data samlet: 143K aktive brukere, kanal-fordeling, topp-sider
- [x] Sitemap-crawl og klassifisering: 10 371 URL-er → 40 sidetyper
- [x] As-is PRD: 6 filer via Chrome-agenter (PLP, Farge-PDP, PDP Maling, Inspirasjon+Tips, Butikk+Tjenester, Forside+Søk+Kundeservice)
- [x] GA4 benchmark-dokument med målrammeverk for case-bygging
- [x] CXO Playbook oppdatert med benchmark-rammeverk og datagap-sjekkliste
- [x] Jotun Colour Picker møtereferat dokumentert (`03-transcripts/20260323 - Jotun Colour Picker.md`)
- [x] Sanity-tokens opprettet for Fargerike-prosjektet (MCP agent read/write + readonly, 25. mars)
- [x] Joinet #mg_alle (25. mars)
- [x] PDP UX-hygiene: ImageGallery med thumbnails + lightbox, ColorPickerDrawer (slide-over med grid + søk), VolumePicker med antall per størrelse, AddToCartButton, Breadcrumb, RatingStars, StickyBuyBar, ProductHeroClient-orkestrator (26. mars)
- [x] PDP UX/SEO/AEO-audit gjennomført – 18 oppgaver lagt inn i TASKS.md (26. mars)
- [x] BC FFH besluttingsmøte-oppsummering mottatt – felles plattform Bolist/Colorama/HH, FargePIM fri fra Jotun-krav (26. mars)
- [x] FargePIM Digital Kick-off innkalt 9. april (26. mars)
- [x] Algolia purring mottatt – frist 2. april (26. mars)
- [x] Daglig oppdatering 29. mars – e-post, Slack, transcripts sjekket. Utkast til svar på Algolia-supplement og Petter-innføring. (`03-transcripts/20260329 - Daglig oppdatering.md`)
- [x] Daglig oppdatering 30. mars (påskehelg) – ingen nye svar nødvendig, alle kanaler stille. Transcripts fra 19. mars fortsatt under prosessering. (`03-transcripts/20260330 - Daglig oppdatering.md`)
- [x] Daglig oppdatering 31. mars (påskeuke) – 3 uleste e-poster lest (BC FFH oppsummering, FargePIM kick-off, Algolia purring). Utkast til svar Eline (datafeed) og Algolia-oppfølging. Ingen nye Slack-svar nødvendig. (`03-transcripts/20260331 - Daglig oppdatering.md`)
- [x] Daglig oppdatering 2. april (Skjærtorsdag) – Ingen nye e-poster eller Slack-meldinger. Alle møter avlyst (påske). BC FFH-mail og FargePIM kick-off-mail lest. Utkast til svar Eline (prisestimat + datafeed) og Algolia-supplement klart. (`03-transcripts/20260402 - Daglig oppdatering.md`)
- [x] Daglig oppdatering 3. april (Langfredag) – Alle kanaler stille (påske). Begge møter avlyst. Transkripter 19. mars fortsatt pending i Trale (15 dager). Ingen nye svar nødvendig. (`03-transcripts/20260403 - Daglig oppdatering.md`)
- [x] Daglig oppdatering 4. april (Påskeaften) – Alle kanaler stille. Ingen nye e-poster, Slack-meldinger eller møter. Transkripter 19. mars fortsatt pending i Trale (16 dager). Første arbeidsdag mandag 7. april – da må oppgavene under 🔴 tas. (`03-transcripts/20260404 - Daglig oppdatering.md`)
- [x] Daglig oppdatering 5. april (2. påskedag) – Påskestille. 3 Vercel build-feil oppdaget (4. april) – lagt til som 🔴-oppgave. Alle Slack-kanaler stille. Trale-transkripter 17 dager pending. (`03-transcripts/20260405 - Daglig oppdatering.md`)
- [x] Daglig oppdatering 6. april (søndag) – Påskestille. Ny oppgave: Luke Cowley (Figma) ønsker sesjon uke 15 + Oslo-besøk. Utkast til svar klart. Alle 🔴-oppgaver står til mandag 7. april. Trale-transkripter 18 dager pending. (`03-transcripts/20260406 - Daglig oppdatering.md`)
- [x] Daglig oppdatering 7. april (mandag, første arbeidsdag) – Ingen nye e-poster som krever svar. Slack stille over påsken. MG PARTY-møte med Stine+Marthy kl. 11. FargePIM kick-off i morgen 9. april. Vercel build-feil og Eline-svar er prioritet. (`03-transcripts/20260407 - Daglig oppdatering.md`)
- [x] Daglig oppdatering 8. april (tirsdag) – Ingen nye e-poster/Slack som krever svar. Algolia usage report mottatt (informativ). FargePIM Digital Kick-off i morgen 09:00. Utkast til Algolia-supplement i #mg_alle og innføringsmøte Petter Sandholt klart. 🔴-oppgaver (Vercel, Eline-svar, Algolia signering) fortsatt åpne. (`03-transcripts/20260408 - Daglig oppdatering.md`)
