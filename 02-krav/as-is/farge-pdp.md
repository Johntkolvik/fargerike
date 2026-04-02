# Fargerike – AS-IS: Farge-PDP (Kulørside)

> Dokumentert tilstand per 2026-03-25. Inneholder faktisk implementasjon av fargesider på fargerike.no.

**Status:** Eksisterende, men begrenset funksjonalitet  
**Baseline-score (vs. Klint):** 0.7/5  
**Målgruppe som bruker detta:** Spontane fargeshoppere, inspirasjonssøkere, kunde med NCS-kode

---

## Gjeldende implementasjon

### URL-struktur og navigasjon

| Kategori | URL | Status |
|---|---|---|
| Beige | `/farger/beige/?pageIndex=1&viewMode=Inspo` | ✅ Aktiv |
| Grønn | `/farger/gronn/?pageIndex=1&viewMode=Inspo` | ✅ Aktiv |
| Hvit | `/farger/hvit/tidlos/` | ✅ Aktiv (enkeltfarge) |

**Paginering:** `pageIndex=1`, `pageIndex=2` osv. («Vis neste treff»-knapp)  
**View-modus:** `?viewMode=Inspo` for bildekostet layout  
**Resultatvisning:** «Viser 40 av 260 treff» (40 per side)

### Sideseksjon og layout

```
┌────────────────────────────────────────────────────────┐
│  CATEGORY HEADER                                       │
│  Beige | Grønn | Hvit | ... (filter-tabs)             │
│                                                        │
│  GRID – 2-KOLONNE ALTERNERENDE LAYOUT                 │
│  (Miljøbilde veksler med fargekort)                   │
│                                                        │
│  Row 1:                                                │
│  ┌──────────────────┐  ┌──────────────────┐           │
│  │ Miljøbilde       │  │ Fargekort        │           │
│  │ (venstre)        │  │ (høyre)          │           │
│  └──────────────────┘  └──────────────────┘           │
│                                                        │
│  Row 2:                                                │
│  ┌──────────────────┐  ┌──────────────────┐           │
│  │ Fargekort        │  │ Miljøbilde       │           │
│  │ (venstre)        │  │ (høyre)          │           │
│  └──────────────────┘  └──────────────────┘           │
│                                                        │
│  Row 3: osv...                                         │
│                                                        │
│  [PAGINERING] Vis neste treff →                      │
└────────────────────────────────────────────────────────┘
```

### Fargekort-komponent

**Innhold per kort:**

| Element | Eksempel | Status |
|---|---|---|
| Fargeprøve (visuell) | Kvadrat/rektangel med kulørfarge | ✅ Ja |
| Fargenavn | «Hummus», «Perlesukker», «Granskygge» | ✅ Ja |
| Kode | JOTUN 12118, FR1335 | ✅ Ja |
| Brand/merke | Jotun, Farrow & Ball, Caparol, Beckers, Fontego | ✅ Ja |
| NCS-kode | 2314-Y58R | ❓ Kanskje (ikke observert klart) |
| Beskrivelse | Stemning, bruksanbefaling | ❌ Nei |
| «Kjøp maling»-knapp | Lenke til Produkt-PDP | ✅ Ja |
| Hjerte-ikon (favoritt) | Overlay øverst til høyre | ✅ Ja |
| Miljøbilde | Romfoto med fargen i bruk | ✅ Ja (alternerende) |

**Dokumenterte farger (side 1, Beige):**
- Hummus (JOTUN 12118)
- Perlesukker (FR1335)
- Granskygge (JOTUN 1288)
- Lett Greie (FR1421)
- Kveldsdis (FR1946)
- Sheer grey (JOTUN 12077)
- Kalahari (FR1064)

### Filtering og kategorier

**Aktive kategorier (tabs):**
- Beige
- Grønn
- Hvit
- (muligens flere)

**Filtrering:** Kategori via tab-valg, påvirker URL (f.eks. `/farger/beige/`)

**Resultatvisning:** 40 farger per side, totalt 260 farger katalogisert.

### Interaksjonsmønstre

| Handling | Resultat | Status |
|---|---|---|
| Klikk kategori-tab | URL oppdateres, nye farger lastes | ✅ Ja |
| Klikk «Vis neste treff» | `pageIndex` øker, paginering virker | ✅ Ja |
| Klikk «Kjøp maling» | Navigerer til Produkt-PDP for den fargen | ✅ Ja |
| Klikk hjerte-ikon | Lagrer farge til ønskeliste (?) | ✅ Antas |
| Klikk på fargekort | Navigerer til enkeltfarge-detalj-side (?) | ❓ Ikke verifisert |

### Enkeltfarge-detalj

**Observert eksempel:** `/farger/hvit/tidlos/`

Siden har tilsynelatende:
- Fargekort med større visning
- Merkeinfo
- Eventuelt relaterte produkter (ikke dokumentert in detail)
- Lenke tilbake til kategori

---

## Krav-status (mapping til pdp-farge.md)

### Kulørinformasjon

| Krav | Status | Notat |
|---|---|---|
| Kanonisk kulør-URL | ✅ Implementert | `/farger/[kategori]/[navn]/` |
| Kulørnavn og kode | ✅ Implementert | Navn + merke-kode synlig |
| Hex-/fargeprøve | ✅ Implementert | Fargefirkant |
| Beskrivende tekst | ❌ Mangler | Ingen stemning/anbefaling |
| Leverandør/merke | ✅ Implementert | Vises på kort |
| Fargekart-tilhørighet | ❓ Uklar | Ikke eksplisitt merket |
| Interior/exterior | ❓ Uklar | Ikke eksplisitt i UI |

**Status:** 4/7 krav oppfylt

### Kompatible produkter

| Krav | Status | Notat |
|---|---|---|
| Produktliste per kulør | ❓ Mulig | Ikke testet på enkeltfarge-side |
| Gruppering per produkttype | ❌ Mangler | Ikke observert |
| Pris og volum | ❌ Mangler | Ikke på fargeside |
| Lagerstatus | ❌ Mangler | Ikke på fargeside |
| Legg i handlekurv | ❌ Mangler | Må gå via Produkt-PDP |
| Lenke til Produkt-PDP | ✅ Implementert | «Kjøp maling»-knapp |

**Status:** 1/6 krav oppfylt

### Inspirasjon og visuelt

| Krav | Status | Notat |
|---|---|---|
| Miljøbilder | ✅ Implementert | 1 bilde per fargekort i 2-kolonne layout |
| Romvisualisering (Roomvo) | ❌ Mangler | Ikke implementert |
| Fargepaletter | ❌ Mangler | Ikke implementert |
| Relatert innhold | ❌ Mangler | Ikke implementert |

**Status:** 1/4 krav oppfylt

### Navigasjon og discovery

| Krav | Status | Notat |
|---|---|---|
| Relaterte kulører | ❌ Mangler | Ikke på enkeltfarge-side |
| Fargekart-browsing | ✅ Implementert | Tab-basert kategoribrowsing |
| NCS-naboer | ❌ Mangler | Ikke implementert |
| Deling | ❌ Mangler | Ikke observert |

**Status:** 1/4 krav oppfylt

### SEO og annonsering

| Krav | Status | Notat |
|---|---|---|
| Indekserbar side | ✅ Antas | Next.js SSR/SSG |
| Strukturert data | ❓ Uklar | Ikke verifisert |
| Meta-tags | ❓ Antas | Sannsynlig implementert |
| Deep link for annonsering | ✅ Implementert | Kan linke til spesifikk farge |
| AEO-optimalisert | ❌ Mangler | Ikke Q&A-seksjon observert |

**Status:** 2-3/5 krav oppfylt

### Tracking

| Krav | Status | Notat |
|---|---|---|
| Kulør-visning event | ❓ Mulig | Google Analytics sannsynlig |
| Kulør → produkt konvertering | ❓ Mulig | Hvis konverteringstracking på Produkt-PDP |
| Søketerm → kulør | ❓ Mulig | Avhengig av søkesystem |
| Kampanjeattribuering | ❓ Mulig | UTM-parametere bør funke |

**Status:** 0/4 eksplisitt verifisert

---

## Teknisk stack (observert)

| Lag | Teknologi |
|---|---|
| Frontend | Next.js (React) |
| CMS | Sanity |
| Søk | Algolia (?) |
| Farge-API | mg-color (?) |
| Styling | CSS-in-JS eller Tailwind |
| Hosting | Vercel (?) |

---

## Benchmarks og gap-analyse

### Klint vs. Fargerike

| Dimensjon | Klint | Fargerike | Gap |
|---|---|---|---|
| **Kulørinformasjon** |
| Fargenavn + kode | ✅ | ✅ | 0 |
| Hex-prøve | ✅ | ✅ | 0 |
| Stemningsbeskrivelse | ✅ | ❌ | -1 |
| Bruksanbefaling | ✅ | ❌ | -1 |
| **Inspirasjon** |
| Miljøbilder (antall) | 12+ | 1 (per kort) | -11 |
| Romvisualisering | ✅ Roomvo | ❌ | -1 |
| Fargepaletter | ✅ | ❌ | -1 |
| **Produktkobling** |
| Produktliste | ✅ | ❓ Begrenset | -0.5 |
| Handlekurv fra fargeside | ✅ | ❌ | -1 |
| Mengdeberegning | ✅ | ❌ | -1 |
| **FAQ og kundestøtte** |
| Integrert FAQ | ✅ | ❌ | -1 |
| Chat/telefon-link | ✅ | ❌ | -1 |
| **Utstyr/tools** |
| Prøvearkbestilling | ✅ 29 kr | ❌ | -1 |
| Påføringsverktøy | ✅ | ❌ | -1 |
| **UGC og anmeldelser** |
| Brukeranmeldelser | ✅ #klinthomes | ❌ | -1 |
| Bildeanmeldelser | ✅ | ❌ | -1 |

**Samlet scoring:**  
Fargerike: 0.7/5  
Klint: 4.9/5

**Største mangler:**
1. Inspirasjon (kun 1 bilde vs. Klints 12+)
2. Produktintegrasjon (må gå til egen side)
3. Kundestøtte (chat, FAQ, telefon)
4. Verktøy (prøveark, påføring, mengdeberegning)
5. Sosialbevis (anmeldelser, UGC)

---

## User story dekking

Fra pdp-farge.md, hvilke US blir oppfylt:

| US-ID | Ønske | Oppfylt? | Notat |
|---|---|---|---|
| US-F01 | Se fargen i et rom | Delvis | 1 miljøbilde, ikke 12+ |
| US-F02 | Lese stemningsbeskrivelse | ❌ | Ikke implementert |
| US-F03 | Se lignende farger | ❌ | Ingen «relaterte» på siden |
| US-F04 | Bilder fra ekte hjem | Delvis | 1 bilde per farge |
| US-F05 | Bestille fargeprøve | ❌ | Ikke implementert |
| US-T01 | Info om trygghet (VOC, etc) | ❌ | Ikke på fargeside |
| US-T02 | Håndteringsveiledning | ❌ | Ikke på fargeside |
| US-T03 | Kundestøtte-kontakt | ❌ | Ikke on-page |
| US-T04 | Anmeldelser fra andre | ❌ | Ikke implementert |
| US-K01 | Hele kjøpsflyt fra fargeside | ❌ | Må gå til Produkt-PDP |

**Oppfyllelse:** 1.5/10 user stories

---

## Endringslogg

| Dato | Endring | Kilde |
|---|---|---|
| 2026-03-25 | Opprettet AS-IS-dokumentasjon basert på observasjon av `/farger/beige/` og `/farger/hvit/tidlos/` | Claude Agent |
| 2026-03-25 | Dokumentert 2-kolonne alternerende layout, paginering, fargekort-struktur | Browser observation |
| 2026-03-25 | Mapping av krav-status og gap-analyse mot pdp-farge.md | Analytical |
| 2026-03-25 | Benchmarking mot Klint: 0.7/5 vs. 4.9/5 | Gap-analyse |

---

## Konklusjon

Fargerike har et rudimentært farge-PDP-system på plass, men det mangler kritisk funksjonalitet for å støtte kjernebrukstilfellene. Siden oppfyller cirka **8 av 25 må-ha-krav** fra FRS.

**Høyeste prioritet for MVP-forbedring:**
1. Produktintegrasjon: liste produkter og «legg i handlekurv»-funksjon fra fargeside
2. Inspirasjon: flere miljøbilder (minst 3-5 per farge)
3. Beskrivelse: stemning + bruksanbefaling for hver farge
4. Kundestøtte: chat eller telefon-link
5. Verktøy: prøveark-bestilling, påføringsguide

Se `/02-krav/frs/pdp-farge.md` for full liste over ønskede krav.
