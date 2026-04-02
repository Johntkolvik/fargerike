# PLP – As-Is Analyse (2026-03-25)

## 1. Analyserte sider

| URL | Tittel | Produkttelling | Type |
|---|---|---|---|
| https://www.fargerike.no/tapet/ | Tapet - Våre tapeter - Vinyl, fiber, våtrom \| Fargerike | 3312 | Hub / Overordnet kategori |
| https://www.fargerike.no/tapet/vinyltapet/ | Vinyltapet - Perfekt til kjøkken \| Fargerike | 1450 | Underkategori |
| https://www.fargerike.no/gulv/vinyl/ | Vinylbelegg - Gulvbelegg - Vinylbelegg vegg \| Fargerike | 101 | Underkategori |

---

## 2. Felles template-elementer

### 2.1 Header og navigasjon
- **Breadcrumb:** Kun 1–2 nivåer synlig (f.eks. "Hjem > Tapet")
- **Tittel:** H1 med kategori-navn, som regel overline på bakgrunn
- **Undertittel/beskrivelse:** Kort beskrivelse av kategori (tekstlinje under tittel)
- **Visuell sekundærkontent:** Link til relatert innhold/artikler (f.eks. "Klassisk blå tapeter", "Lær deg hvordan du tapetserer")

### 2.2 Filterstruktur (sidebar, venstre)
Filtre er organisert i tre nivåer:

1. **Underkategorier** (øverst)
   - For tapet-hub: Vinyltapet, Fibertapet, Overmalbar, Veggbekledning, Alle tapeter
   - For gulv-hub: Klikkvinyl, Laminat, Parkett, Teppe, Kork, Herdet tregulv, Metallister, Underlag, Fotlist, Ute, Alle gulv
   - Bare 1 vises ekspandert; andre skjules under «Se mer»

2. **Merke-filtre** (collapsible)
   - Tapet: Storeys, Borås tapeter, Wall Concept, Fantasi, Casadeco, Texdecor
   - Gulv: Tarkett, Gerflor, Våtrom
   - Viser 5–6 merker, deretter «Se mer»

3. **Lokasjon-filtre** (collapsible)
   - Fargerike Oslo, Alta, Arendal, Asker, Askøy (og flere)
   - Betyr: lagerplassering/butikktilgjengelighet

### 2.3 Produktkort-struktur
Standardisert grid-layout (2–4 kolonner avhengig av viewport):

```
┌─────────────────────┐
│  [Produktbilde]     │  (Responsive, fyller bredde)
│  [Rabatt-badge %]   │  (Rød eller oransj, øvre høyre)
├─────────────────────┤
│ Produktnavn         │  (H4, bold, svart)
│ NÅ: X,- pr. m2      │  (Grønn eller rød tekst, bold)
│ Før: Y,-            │  (Gjennomstreket grå)
│ ⭐ 4.5 (12 reviews) │  (Hvis tilgjengelig)
│ ✓ Tilgjengelig      │  (Tekst, indikerer lager/click-collect)
│                     │
│ [Legg i kurv / +]   │  (CTA-knapp, grønn)
│                     │
│ [Sammenlign] [♥]    │  (Secondary actions)
└─────────────────────┘
```

### 2.4 Sortering og visning
- **Sorteringsvalg:** Dropdown i toppen («Relevans», «Navn A-Z», «Pris lav til høy», «Pris høy til lav»)
- **Grid-/list-toggle:** Ikoer for å bytte layout
- **Antall per side:** «Viser 20 av [TOTAL] treff» (fast på 20, paginering under)
- **Paginering:** «< 1 2 3 ... >» eller «Last more» button

---

## 3. Varianter per kategori

### 3.1 Tapet-hub (https://www.fargerike.no/tapet/)

**Særegenskaper:**
- Størst katalog (3312 produkt) → behov for sterk filtrering
- Underkategorier ekspanderer til 5 valg + «Alle tapeter»
- 6–7 merkefiltrer synlig
- Tydelig variantindikering ved produktkort (hvis flere farger/mønstre)

**Innholds-elementer:**
- H1: "Tapet"
- Undertekst: "Finn tapet som passer ditt hjem"
- Merke-logoer i tillegg til tekstfiltrer (visuelt lokkende)
- Ingen prominent relatert-innhold-seksjon

**Observasjon:** Høyt fokus på filtrering – få distrahere CTAer.

---

### 3.2 Underkategori – Vinyltapet (https://www.fargerike.no/tapet/vinyltapet/)

**Særegenskaper:**
- Mindre katalog (1450 produkt)
- Færre/andre merkefiltrer enn hub (context-aware filtering)
- Relatert innhold eksplisitt vist:
  - "Klassisk blå tapeter" (link til tema)
  - "Lær deg hvordan du tapetserer" (guide-link)

**Innholds-elementer:**
- H1: "Vinyltapet"
- Undertekst: "Perfekt til kjøkken og våtrom"
- To hjelpende innholds-lenker
- Samme produktkort-struktur som hub

**Observasjon:** Typer viser at man tilpasser merkefiltrer etter underkategori + tilbyr relatert innhold (guides, temaer). Godt signal for content integration.

---

### 3.3 Gulv – Vinyl (https://www.fargerike.no/gulv/vinyl/)

**Særegenskaper:**
- Minste katalog (101 produkt)
- Helt annen underkategori-struktur enn tapet (Klikkvinyl, Laminat, Parkett, etc.)
- Bare 3 merkefiltrer (Tarkett, Gerflor, Våtrom)
- Samme lokasjon-filtre som tapet

**Innholds-elementer:**
- H1: "Vinylbelegg"
- Undertekst: "Slagsterk gulvbelegg"
- Ingen synlig relatert-innhold-sektor (samme som tapet-hub)

**Observasjon:** Viser at filter-hierarki er kategorispesifikt. Gulvkategorier har helt andre underkategorier enn tekstiler.

---

## 4. Funksjonalitet

### 4.1 Filtrering
**Virker som:**
- Multi-select within single facet (f.eks. multiple merker på samme gang)
- AND-logic mellom facets (velg merke OG lokasjon → både må match)
- Real-time oppdatering av resultattall («Viser 20 av X treff» oppdateres)
- Filtre kan kombineres: Underkategori + Merke + Lokasjon

**Mangler:**
- Ingen visuell indikasjon av «aktive filtrer» (tag-list øverst)
- Ingen «Tøm filtrer»-knapp
- Ingen «Lagre søk»-funksjonalitet

### 4.2 Sortering
**Tilgjengelig:**
- Relevans (default)
- Navn A-Z
- Pris lav til høy
- Pris høy til lav

**Observasjon:** Ingen «Nytt», «Best-selger», «Bedømt» sortering – mulig mangel.

### 4.3 Paginering
**Format:** «Viser 20 av [TOTAL] treff» med side-knapper eller «Load more»

**Observasjon:** Begrenset til 20 per side kan føle tungvint på 3300+ produkt.

### 4.4 Produktkort – Funksjonalitet
- **Legg i kurv:** Knapp (grønn, prominent)
- **Sammenlign:** Valgfunksjonalitet (legger til sammenligning-bord?)
- **Lagre/Ønskeliste:** Hjerte-ikon (♥)
- **Pris:** Viser både «Nå» og «Før» (rabatt-kontekst)
- **Bedøming:** Stjerner + antall reviews (hvis tilgjengelig)
- **Lagerstatus:** "Tilgjengelig for klikk og hent" eller lignende

**Mangler visuell feedback:**
- Ingen hover-state synlig i screenshot (kan være CSS)
- Ingen animasjon på «Legg i kurv»

### 4.5 Click-and-collect
**Funksjon:** "Tilgjengelig for klikk og hent" indikerer at lokasjon-filter styrer relevans

**Observasjon:** Mulig at ikke alle kombinasjoner av merke + lokasjon finnes (sparse data?)

---

## 5. Innhold og datafelter

### 5.1 Produktkort – Data
Viste felter:

| Felt | Eksempel | Type | Obligatorisk? |
|---|---|---|---|
| Bilde | [Produktfoto] | Image | ✅ |
| Produktnavn | "Bambus Spiletapet Caramel Ubehandlet" | String | ✅ |
| Rabatt-%-vis | -30% | Number | ❌ (Kun hvis aktuelt) |
| Pris (nå) | 594,- pr. m2 | Number + Unit | ✅ |
| Pris (før) | 849,- | Number | ❌ (Kun hvis rabatt) |
| Enhet | pr. m2, stk, etc. | Enum | ✅ |
| Bedøming | ⭐⭐⭐⭐ 4.5 | Decimal 0–5 | ❌ |
| Antall reviews | (12) | Number | ❌ |
| Lagerplassering | "Tilgjengelig for klikk og hent" | String | ❌ |
| Merke | Implicit (in filters) | String | ✅ |
| Kategori | Implicit (in URL) | String | ✅ |

### 5.2 Filtrer – Data
Filtre lagres som:

- **Underkategori:** Select (single or multiple)
- **Merke:** Multi-select
- **Lokasjon:** Multi-select (eller single?)

**Manglende data i filtrer:**
- Pris-range (ikke synlig, men mulig backend-funksjonalitet)
- Farge/fargetone (IKKE synlig – men viktig for tapeter!)
- Material/struktur (f.eks. "glatt", "teksturert")
- Bredde/lengde for tapeter

---

## 6. Navigasjon og IA

### 6.1 Breadcrumb
Fungerer som:
```
Hjem > [Underkategori]
```
Eksempel: `Hjem > Vinyltapet`

**Observasjon:**
- Kun 2 nivå
- Mangler direkte link tilbake til «Tapet» hub fra underkategori
- Lite hierarki-kontekst

### 6.2 Sidemenyer
Venstre sidebar (persistent):
- **Sticky når man scroller:** Ja, sannsynlig
- **Collapse-knapp:** Mulig (mobile-first design)
- **Søk i filtrer:** Ikke synlig (kunne hjulpet ved 6+ merkefiltrer)

### 6.3 Relatert innhold (Vinyltapet-side kun)
```
Klassisk blå tapeter → [tema-side]
Lær deg hvordan du tapetserer → [guide-side]
```
**Tolkning:** Content-clustering ved Sanity + Algolia Recommend (mulig)

**Mangler på andre sider:** Hub-siden (Tapet) har IKKE synlig relatert-innhold-sektor

### 6.4 Hover og interaksjon
**Ikke observert i screenshot, men sannsynlig:**
- Produktkort får skyggge/dybde
- Zoom på bilde ved hover
- Knapp-animasjoner

---

## 7. SEO

### 7.1 Meta-tags (fra page titles)
```
Tapet-hub:     "Tapet - Våre tapeter - Vinyl, fiber, våtrom | Fargerike"
Vinyltapet:    "Vinyltapet - Perfekt til kjøkken | Fargerike"
Gulv vinyl:    "Vinylbelegg - Gulvbelegg - Vinylbelegg vegg | Fargerike"
```

**Observasjon:**
- Alle følger pattern: `[Produkttype] - [Utdypning] | [Merkenavn]`
- H1 i title (primary keyword)
- Branding (-| Fargerike) konsistent

**Antagelse (ikke bekreftet i screenshots):**
- Meta description: Sannsynlig syntetisert fra underkskrift
- og structured data (JSON-LD): Mulig ProductCollection og BreadcrumbList

### 7.2 URL-struktur
- **Hub:** `/tapet/`
- **Underkategori:** `/tapet/vinyltapet/`
- **Alternativ kategori:** `/gulv/vinyl/`

**SEO-styrker:**
- Kategorihierarki reflektert i URL (god for crawl)
- Keyword-rik (tapet, vinyltapet, gulv, vinyl)

**SEO-svakheter:**
- Ingen filter-parameter-handling synlig (mulig ?merke=storeys&lokasjon=oslo)
- Canonical-tag påkrevd hvis filter-kombinasjoner lager duplikater

### 7.3 Innholdsmarkering
**Ikke bekreftet, men antas:**
- `<script type="application/ld+json">` for:
  - `ProductCollection`
  - `BreadcrumbList`
  - Mulig `Product` på hver kort (om JavaScript-renderet)

---

## 8. Mobil responsiveness

### 8.1 Observasjoner fra viewport
Basert på screenshots tatt på desktop, men layout-tegn:

**Sannsynlige mobile-endringer:**
- Sidebar → Bottom sheet / Hamburger menu
- Grid (3–4 kolonner) → 1–2 kolonner
- Filtervisning: Collapsed som default
- Produktkort: Høyere aspect-ratio (mer høyde)

**Ikke bekreftet:**
- Touch-targets (knappestørrelse)
- Tap-vs.-hover-interaksjoner
- Loading-states på mobile (slower network)

---

## 9. Mangler og muligheter

### 9.1 Filtrering
| Mangel | Innvirkning | Prioritet |
|---|---|---|
| Aktiv-filter-visuell | Brukeren vet ikke hva som er aktivert | Høy |
| «Tøm alle filtrer»-knapp | Må manuelt deselect | Høy |
| Farge-filter | For tapeter: KRITISK (ingen måte å sortere etter farge/tone) | Høy |
| Pris-range-slider | Forenkler prisjakt | Medium |
| Søk-i-filtrer | Merker liste vokser > 20 | Medium |
| «Lagre søk» | Brukeren kan ikke gjenbruke filter-kombinasjoner | Lav |
| Hitung-per-filter | Vise antall treff per merke uten å velge den | Medium |

### 9.2 Sortering
| Mangel | Innvirkning | Prioritet |
|---|---|---|
| «Best-selger» | Commerce-signal mangler | Høy |
| «Nytt» | Seasonal content retention | Medium |
| «Bedømt» (highest rating først) | Quality signal | Medium |

### 9.3 Paginering og load
| Mangel | Innvirkning | Prioritet |
|---|---|---|
| «Viser 20» – begrenset per side | Ved 3312 produkt = 165+ sider | Høy |
| «Load more» vs. side-nummere | Infinite scroll bedre på mobile | Medium |
| Jump-to-page input | Raskere navigering | Lav |

### 9.4 Produktkort
| Mangel | Innvirkning | Prioritet |
|---|---|---|
| Variant-velger (farge/størrelse preview) | Brukeren må klikke inn for å se varianter | Høy |
| Lagerindikator per lokasjon | «Tilgjengelig for klikk og hent» er vagt | Høy |
| Ytterligere bildegalleri (thumbnail preview) | Kun 1 bilde → mangel på kontekst | Medium |
| Spesifikasjon-snippet (f.eks. «58 m»-ruller) | Intuitivt inntak av mengde | Medium |
| CTA-animasjon på «Legg i kurv» | Konfirmasjon før cart-popup | Lav |

### 9.5 Relatert innhold og krysslinking
| Mangel | Innvirkning | Prioritet |
|---|---|---|
| Tapet-hub mangler «Guides» og «Inspirasjon» | Vinyltapet-siden har det – inkonsistent | Medium |
| Ingen «Se også»-sektor ved underkategorier | Cross-category discovery = lost revenue | Medium |
| Ingen merke-landingsider synlige | Merke-SEO / brand-pages savnes | Medium |

### 9.6 SEO og teknisk
| Mangel | Innvirkning | Prioritet |
|---|---|---|
| Filter-parameter-handling uklar | Mulige duplikat-issues (f.eks. ?merke=X vs. ?merke=X&lager=Y) | Høy |
| Canonical-tag (mulig ikke satt riktig) | Risk for filter-duplikater i index | Medium |
| Structured data for Product ikke bekreftet | Rich snippets i SERP = click-through boost | Medium |
| Meta descriptions for filter-kombinasjoner | User-facing, men mulig auto-generated | Lav |

### 9.7 Brukeropplevelse – generelt
| Mangel | Innvirkning | Prioritet |
|---|---|---|
| Ingen «Sammenlign»-knapp-feedback | Brukeren vet ikke om produkt ble lagt til | Medium |
| Ingen «Lagre til ønskeliste»-validering | Hjertet bør ændres til ♥-fyllt | Medium |
| Filter-state ikke lagret i URL | Bokmerk av filter-kombinasjon fungerer ikke | Medium |
| Tooltip for «Tilgjengelig for klikk og hent» | Forklaringen er skjult for nye brukere | Lav |

---

## 10. Konklusjon og next steps

### Styrker
1. ✅ Konsistent produktkort-template
2. ✅ Solid filterarkitektur (3-nivå)
3. ✅ Lokasjonsbinding til click-and-collect
4. ✅ Integrasjon av relatert innhold (minst på Vinyltapet)
5. ✅ Rabatt-visning og før/nå-prising

### Kritiske mangler (bør fikses før Fase 1 avsluttet)
1. ❌ **Farge-filter** for tapeter (ikke implementert – eksisterer ikke i UI)
2. ❌ **Aktiv-filter-visning** (bruker vet ikke hva som er valgt)
3. ❌ **«Tøm filtrer»-knapp**
4. ❌ **Variant-preview** på produktkort (farge/størrelse swatches)
5. ❌ **Relatert innhold** inkonsistent (bare på Vinyltapet, ikke på Tapet-hub)

### Anbefalt arbeid (prioritet)
1. **Umiddelbar:** Legg inn farge-filter for tapeter (MUST-have for Farge-PDP integration)
2. **Sprint 1:** Implementer aktiv-filter-tag-list og tøm-knapp
3. **Sprint 2:** Variant-velger på kort (thumbnail swatches)
4. **Sprint 3:** Innhold-sektor på alle PLP-er (Algolia Recommend + Sanity override)
5. **Sprint 4:** Filter-state i URL + lagre-søk-funksjonalitet

### Referanser til FRS
Denne analysen refererer indirekte til:
- `02-krav/frs/plp.md` (ikke eksaminert ennå – bør validere mot spec)
- `02-krav/frs/fargevelger.md` (farge-filter correlation)
- `02-krav/frs/innhold-og-inspirasjon.md` (relatert innhold strategi)

---

*Analyse gjennomført 2026-03-25 av Claude Code UX Agent.*
*Innspill fra screenshots og page-reads av 3 PLP-varianter.*
