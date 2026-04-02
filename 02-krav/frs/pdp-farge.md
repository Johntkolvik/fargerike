# Fargerike – FRS: Farge-PDP (Kulørside)

> Levende dokument. Oppdateres med innsikt fra audit, møter og research.
> Del av PDP-familien: `pdp-produkt.md` | `pdp-farge.md` | `pdp-tjeneste.md`
> Tett koblet til: `fargevelger.md`, `02-krav/prd/2026-03-23_mg-color-prd.md` og `kjerneflyter-pdp.md`
> Flyter: Primær i **Flyt A** (farge først) og **Flyt C** (prosjekt). Sekundær i **Flyt B** (via overgang fra Produkt-PDP).

**Sist oppdatert:** 2026-03-25
**Status:** Skjelett – fylles med krav etter hvert
**Fase:** 1 (PoC med Jotun-data) → 2 (multi-brand, fullverdig)

---

## Kontekst

Farge-PDP er en ny flatetype som ikke finnes i dag. Den representerer en **kulør** som primær enhet – ikke et produkt. Kunden starter med en farge og navigerer derfra til kompatible produkter.

Dette er Fargerikes mest differensierte digitale flate. Ingen norsk faghandel har dedikerte kulørsider med deep linking, multi-brand-kompatibilitet og inspirasjon. Det er også den flaten som best speiler hvordan kunder faktisk tar beslutninger – fargen velges først, produktet etterpå.

### Brukerreiser (fra mg-color PRD)

- **Journey B – Kulør → Produkt:** Kunden har bestemt seg for en farge. Browser kulører, finner én, ser kompatible produkter, velger produkt og volum.
- **Journey C – Inspirasjon → Kulør → Produkt:** Kunden ser inspirasjon, klikker på kulør, får detaljside med relaterte kulører og produkter.
- **Journey D – NCS-kode → Produkt:** Kunden har NCS-kode fra interiørarkitekt, slår opp, finner matchende produkter.

### Relasjon til andre flater

- **Produkt-PDP** (`pdp-produkt.md`): Farge-PDP lenker til Produkt-PDP for kjøp. Produkt-PDP har color picker som lenker tilbake hit.
- **Søk** (`sok-autocomplete-serp.md`): NCS-søk og fargenavn-søk lander på Farge-PDP.
- **PLP** (`plp.md`): Filtrering på fargekart kan lede til Farge-PDP.
- **Innhold** (`innhold-og-inspirasjon.md`): Inspirasjonssaker lenker til Farge-PDP for kulører som vises.
- **Annonsering:** Kulør-URL brukes som landingsside for kampanjer (f.eks. «Årets farge»).

---

## Krav

### Kulørinformasjon

| Krav | Beskrivelse | mg-color | Prioritet | Status |
|---|---|---|---|---|
| Kanonisk kulør-URL | Unik, dyplenk-bar URL per kulør (f.eks. `/farge/jotun-2149-coffee`) | M7 | Må ha | ✅ |
| Kulørnavn og kode | Visnignsnavn + leverandørkode + NCS-kode | M1, M5 | Må ha | ✅ |
| Hex-/fargeprøve | Visuell representasjon av kuløren | M1 | Må ha | ✅ |
| Beskrivende tekst | Stemningsbeskrivelse, bruksanbefaling | M1 | Bør ha | ❌ |
| Leverandør/merke | Jotun, Caparol, Beckers etc. | M1 | Må ha | ✅ |
| Fargekart-tilhørighet | Hvilke(t) fargekart kuløren tilhører (f.eks. «Lady Soulful Spaces 2026») | M2 | Bør ha | ❓ |
| Interior/exterior | Bruksområde | M1 | Må ha | ❓ |

### Kompatible produkter

| Krav | Beskrivelse | mg-color | Prioritet | Status |
|---|---|---|---|---|
| Produktliste per kulør | Vis alle produkter kuløren kan brytes i | M3 | Må ha | ❓ |
| Gruppering per produkttype | Veggmaling, takmaling, trevirke etc. | M3 | Bør ha | ❌ |
| Pris og volum per produkt | Vis pris, tilgjengelige volumer | M4 | Må ha (Fase 2) | ❌ |
| Lagerstatus per butikk | Vis tilgjengelighet i valgt butikk | – | Bør ha (Fase 2) | ❌ |
| Legg i handlekurv fra kulørside | Velg produkt + volum → handlekurv med riktig bas | M4 | Må ha (Fase 2) | ❌ |
| Lenke til Produkt-PDP | Klikk videre for full produktinfo | – | Må ha | ✅ |

### Inspirasjon og visuelt

| Krav | Beskrivelse | mg-color | Prioritet | Status |
|---|---|---|---|---|
| Miljøbilder | Rombilder med kuløren i bruk | S2 | Bør ha (v1.1) | ✅ (1 per kort, trengs 3-5) |
| Romvisualisering | Se kuløren i eget rom (Roomvo/Leap Tools) | – | Kan ha | ❌ |
| Fargepaletter | Komplementære og analoge kulører | S3 | Bør ha (v1.1) | ❌ |
| Relatert innhold | Guider og artikler der kuløren er relevant | – | Bør ha | ❌ |

### Navigasjon og discovery

| Krav | Beskrivelse | mg-color | Prioritet | Status |
|---|---|---|---|---|
| Relaterte kulører | «Lignende farger» basert på NCS-nærhet eller tags | S3 | Bør ha | ❌ |
| Fargekart-browsing | Naviger til andre kulører i samme fargekart | M2 | Bør ha | ✅ (tab-basert kategori-navigasjon) |
| NCS-naboer | Vis kulører med nær NCS-kode (på tvers av merker) | M5 | Kan ha | ❌ |
| Deling | Del kulør via URL, sosiale medier, e-post | M7 | Bør ha | ❌ |

### SEO og annonsering

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Indekserbar side | SSR/SSG via Next.js | Må ha | ✅ |
| Strukturert data | JSON-LD med fargeinformasjon | Bør ha | ❓ |
| Meta-tags | Tittel, beskrivelse, OG-bilde med fargeprøve | Må ha | ❓ |
| Deep link for annonsering | Brukbar som landingsside for fargekampanjer | Må ha | ✅ |
| AEO-optimalisert | Svar på spørsmål som «hva er NCS 2314-Y58R?» | Bør ha | ❌ |

### Tracking

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Kulør-visning event | Spore hvilke kulører som ses | Må ha | ❓ |
| Kulør → produkt konvertering | Spore overgang fra kulørside til produktkjøp | Må ha | ❓ |
| Søketerm → kulør | Spore hvilke søk som leder til kulørsider | Bør ha | ❓ |
| Kampanjeattribuering | Spore trafikk fra fargekampanjer | Bør ha | ❓ |

---

## Informasjonsarkitektur – konseptuell

```
┌─────────────────────────────────────────┐
│  FARGE-PDP                               │
│                                         │
│  ┌─────────┐  Kulør: JOTUN 2149 COFFEE  │
│  │  ████   │  NCS: 2314-Y58R            │
│  │  ████   │  Fargekart: Soulful Spaces │
│  └─────────┘  Interior                   │
│                                         │
│  "En varm, dyp tone som gir rommet..."  │
│                                         │
│  ─── Kompatible produkter ────────────  │
│  Veggmaling:                            │
│    Lady Supreme Finish  0.68L / 2.7L    │
│    Lady Pure Color      0.68L / 2.7L    │
│  Takmaling:                             │
│    Lady Tak              2.7L / 9L      │
│  Trevirke:                              │
│    Lady Supreme Finish   0.68L          │
│                                         │
│  ─── Relaterte kulører ───────────────  │
│  [████] [████] [████] [████]            │
│  Latte   Cocoa  Mocha  Toffee          │
│                                         │
│  ─── Inspirasjon ─────────────────────  │
│  [miljøbilde stue] [miljøbilde soverom] │
│                                         │
│  ─── Relaterte guider ────────────────  │
│  → Slik velger du riktig farge til stua │
│  → 5 tips for nordvendte rom            │
└─────────────────────────────────────────┘
```

---

## Benchmarks og referanser

| Kilde | URL | Hva vi kan lære |
|---|---|---|
| Klint PDP (Himla) | klint.com/no/farger/himla | Farge som primærenhet, tabs for overflate, miljøbilder, UGC (#klinthomes), prøveark 29 kr, FAQ integrert |
| GAP-analyse | `04-kilder/2026-03-25_gap-analyse-klint-vs-fargerike-pdp.md` | Fargerike Farge-PDP scorer 0.7/5 vs. Klint 4.9/5 – mangler produktkobling, handlekurv, FAQ, utstyr |

**Nøkkelfunn fra GAP-analyse (2026-03-25):**
Fargerikes `/farger/hvit/tidlos/` er et spede forsøk på farge-først, men mangler alt som gjør Klints modell fungerende: produktkobling, mengdeberegning, handlekurv, FAQ og utstyr. Kun 1 miljøbilde vs. Klints 12+. Ingen kobling til artikler eller guider. Kunden kan ikke kjøpe fra denne siden.

---

## User stories (fra GAP-analyse)

Ref: `04-kilder/2026-03-25_gap-analyse-klint-vs-fargerike-pdp.md`

### Farge og inspirasjon

- **US-F01:** Som en usikker førstegangsbruker vil jeg se fargen i et rom, slik at jeg kan forestille meg resultatet.
- **US-F02:** Som kunde vil jeg lese en stemningsbeskrivelse av fargen, slik at jeg forstår om den passer til prosjektet mitt.
- **US-F03:** Som kunde vil jeg se lignende farger, slik at jeg kan sammenligne og finne den riktige.
- **US-F04:** Som kunde vil jeg se bilder fra ekte hjem med denne fargen, slik at jeg føler meg trygg på valget.
- **US-F05:** Som kunde vil jeg kunne bestille fargeprøve med lav terskel, slik at jeg kan teste fysisk før jeg forplikter meg.

### Trygghet

- **US-T01:** Som forelder vil jeg vite om malingen er trygg for barnerom (VOC, lukt, merking), slik at jeg føler meg trygg.
- **US-T02:** Som usikker maler vil jeg vite hva jeg gjør ved søl, rengjøring av utstyr, og håndtering av rester, slik at jeg tør å starte.
- **US-T03:** Som kunde vil jeg enkelt kunne spørre en ekspert (chat, telefon, booking), slik at jeg får hjelp når jeg trenger det.
- **US-T04:** Som kunde vil jeg se anmeldelser fra andre som har brukt fargen, gjerne med bilder, slik at jeg ser ekte resultater.

### Kjøp og levering

- **US-K01:** Som kunde vil jeg kunne velge farge, produkt, mengde og utstyr og legge alt i handlekurv i én flyt, slik at jeg slipper å hoppe mellom sider.

---

## Åpne spørsmål

1. **URL-struktur:** `/farge/[brand]-[id]-[name]` eller `/farge/[ncs-code]` eller begge?
2. **Skal kulørsider eksistere uavhengig av mg-color?** Kan Fargerike ha egne kulørsider i Sanity som berikes med mg-color-data?
3. **Hvordan håndteres kulører som finnes hos flere leverandører?** Én side per leverandør-kulør, eller én samlet side per NCS-kode?
4. **Hva er MVP?** Kan vi lansere kulørsider med kun Jotun-data fra API i Fase 1, og legge til flere leverandører etterpå?
5. **Fargekampanjer:** Hvem eier kampanjeflyten? Kategoriansvarlig → Eline → Sanity, eller automatisk fra mg-color?

---

## Implementasjonsstatus – oppsummering

**Overordnet score (v1.0):** 8/25 må-ha-krav implementert (32%)

**Fordelt på seksjoner:**
- Kulørinformasjon: 4/7 ✅ (57%)
- Kompatible produkter: 1/6 ✅ (17%)
- Inspirasjon og visuelt: 1/4 ✅ (25%)
- Navigasjon og discovery: 1/4 ✅ (25%)
- SEO og annonsering: 2/5 ✅ (40%)
- Tracking: 0/4 verifisert (0%)

**Kritiske gap for Fase 2 (prioritert):**
1. ❌ Produktintegrasjon: liste + handlekurv
2. ❌ Inspirasjon: 3-5 bilder per farge (nå: 1)
3. ❌ Beskrivelse: stemning + bruksanbefaling
4. ❌ Kundestøtte: chat/telefon-link
5. ❌ Verktøy: prøveark, påføringsguide

Detaljert analyse: `02-krav/as-is/farge-pdp.md`

---

## Endringslogg

| Dato | Endring | Kilde |
|---|---|---|
| 2026-03-25 | Opprettet som ny flatetype, koblet til mg-color PRD | John |
| 2026-03-25 | Lagt til benchmarks (Klint), user stories US-F01–F05, US-T01–T04, US-K01 fra GAP-analyse | John |
| 2026-03-25 | Oppdatert alle status-felter basert på AS-IS-analyse av `/farger/beige/` og `/farger/hvit/tidlos/` | Claude Agent |
| 2026-03-25 | Lagt til implementasjonsstatus-oppsummering med prioritert gap-liste | Claude Agent |
