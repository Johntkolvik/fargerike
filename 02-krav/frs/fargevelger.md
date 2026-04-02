# Fargerike – FRS: Fargevelger og kuløropplevelse

> Levende dokument. Denne FRS-en beskriver hvordan Fargerike konsumerer mg-color-tjenesten på tvers av flater.
> For mg-color API/datamodell/arkitektur, se `02-krav/prd/2026-03-23_mg-color-prd.md`.
> For end-to-end flyter der fargevelger inngår, se `kjerneflyter-pdp.md` (Flyt A steg 2, Flyt B steg 2).

**Sist oppdatert:** 2026-03-25
**Status:** Skjelett med koblinger til mg-color PRD
**Fase:** 1 (PoC + Jotun fallback) → 2 (fullverdig) → 3 (AI-assistert)

---

## Kontekst

Fargerike er trolig den største konsumenten av mg-color i MG. Farge er kjernen i kjøpsopplevelsen – kunder starter ofte med en farge, ikke et produkt. Dagens fargevelger på fargerike.no er uforandret i to år, og Jotun presser nå en iFrame-widget som ikke kan tilpasses Fargerikes merkevare.

mg-color gir Fargerike muligheten til å bygge en differensiert fargeopplevelse i egen visuell profil, med data fra alle leverandører – noe ingen annen norsk faghandel tilbyr digitalt.

---

## Brukerreiser for Fargerike

Basert på mg-color PRD brukerreiser, tilpasset Fargerikes kontekst:

### Journey A: Produkt → Kulør (PDP)
Kunden er på PDP for f.eks. Lady Supreme Finish. Åpner fargevelger i Fargerike-profil, blar i kulører filtrert på kompatibilitet, velger kulør, får riktig bas og volum, legger i handlekurv.

**Berører:** `pdp-produkt.md` (color picker-seksjonen)
**mg-color krav:** M3, M4, M8, M10

### Journey B: Kulør → Produkt (Reverse Journey)
Kunden har bestemt seg for en farge («varm grå til stua»). Starter i fargeopplevelse, blar kulører etter nyanse/rom/stemning. Finner kulør, ser kompatible produkter, velger produkt og volum.

**Berører:** `pdp-farge.md`, `innhold-og-inspirasjon.md`
**mg-color krav:** M3, M5, M6

### Journey C: Inspirasjon → Kulør → Produkt
Kunden ser en inspirasjonssak om nordiske farger. Klikker på en kulør i bildet. Får kulørinfo, relaterte kulører, kompatible produkter.

**Berører:** `innhold-og-inspirasjon.md`
**mg-color krav:** S2, S3

### Journey D: NCS-kode → Produkt
Kunden har NCS-kode fra interiørkonsulent. Slår opp, ser produkter som matcher på tvers av leverandører.

**Berører:** `sok-autocomplete-serp.md`
**mg-color krav:** M5

### Journey E: Butikkstøtte
Butikkansatt bruker mg-color for å hjelpe kunden med NCS-oppslag og produktvalg.

**Berører:** `store-locator.md` (fremtidig butikkverktøy)

---

## Krav per flate

### PDP (→ `pdp.md`)

| Krav | mg-color | Fase | Status |
|---|---|---|---|
| Color picker i Fargerike-profil | M3, M4, M8 | 1 (PoC) → 2 | ❓ |
| Jotun iFrame som fallback | M10 | 1 | ❓ |
| Bas/SKU-oppløsning → handlekurv | M4 | 2 | ❓ |
| Kompatibilitetsinfo per kulør | M3 | 1 | ❓ |

### PLP (→ `plp.md`)

| Krav | mg-color | Fase | Status |
|---|---|---|---|
| Farge-swatches på produktkort | M3 | 2 | ❓ |
| Filtrering på fargekart/collection | M2 | 2 | ❓ |
| Filtrering på nyanse | M6 | 2 | ❓ |

### Søk (→ `sok-autocomplete-serp.md`)

| Krav | mg-color | Fase | Status |
|---|---|---|---|
| NCS-kode-søk i autocomplete | M5 | 1–2 | ❓ |
| Fargenavn i søkeresultat | M5 | 1–2 | ❓ |
| Kulørdata i Algolia-indeks | M5 | 1 | ❓ |

### Farge-PDP / kulørsider (→ `pdp-farge.md`)

| Krav | mg-color | Fase | Status |
|---|---|---|---|
| Kulørside med kanonisk URL | M7 | 1 | ❓ |
| Kulør-metadata (NCS, hex, beskrivelse) | M1 | 1 | ❓ |
| Kompatible produkter per kulør | M3 | 1 | ❓ |
| Relaterte/komplementære kulører | S3 | 2 | ❓ |
| Miljøbilder per kulør | S2 | 2 | ❓ |
| SEO: strukturert data for farge | – | 1 | ❓ |

### Innhold (→ `innhold-og-inspirasjon.md`)

| Krav | mg-color | Fase | Status |
|---|---|---|---|
| Koble kulører til inspirasjonssaker | S2 | 2 | ❓ |
| Fargekart-kampanjesider | M2, M7 | 1 | ❓ |
| Interaktive fargepaletter i artikler | S3 | 2–3 | ❓ |

---

## Avhengigheter

| Avhengighet | Eier | Risiko | Mitigering |
|---|---|---|---|
| mg-color API tilgjengelighet | MG (Mikael/Petter) | Tidslinje ukjent – kan forsinke | PoC med Jotun API direkte, migrér til mg-color |
| Jotun iFrame-krav | Jotun | Kan kreve widget for API-tilgang | Implementer iFrame som fallback, bygg eget i parallell |
| Product Family ID i MGITEM | MG | Blokkerer kulør→produkt-kobling | Sandra sjekker. Manuell mapping som fallback |
| Caparol/Beckers data | Leverandører | Trolig ingen API | CSV/XML-import i mg-color |
| NCS-lisensdata | NCS Colour (eksisterende avtale) | Årskostnad, ukjent beløp | Allerede i bruk hos Fargerike |

---

## Arkitekturskisse: Farge i Fargerikes stack

```
                    fargerike.no (Next.js)
                           │
            ┌──────────────┼──────────────┐
            │              │              │
    ┌───────▼──────┐ ┌────▼─────┐ ┌──────▼──────┐
    │  PDP picker  │ │ Kulør-   │ │  Søk        │
    │  (React)     │ │ sider    │ │  (Algolia)  │
    └───────┬──────┘ └────┬─────┘ └──────┬──────┘
            │              │              │
            └──────────────┼──────────────┘
                           │
                    ┌──────▼──────┐
                    │  mg-color   │
                    │  API        │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼──┐  ┌─────▼─────┐ ┌───▼──────┐
       │ Jotun   │  │ NCS       │ │ Caparol  │
       │ API     │  │ register  │ │ (CSV)    │
       └─────────┘  └───────────┘ └──────────┘
```

---

## Åpne spørsmål

1. **Når er mg-color API tilgjengelig?** PoC-planen avhenger av dette. Fargerike kan bygge direkte mot Jotun API som midlertidig løsning.
2. **Skal Fargerike bygge egen picker eller bruke mg-color referansekomponent (S6)?** Fargerike har sterkere merkevare-krav enn andre kjeder.
3. **Hvordan håndteres fargevelger for ikke-malingsprodukter?** Tapet, gulv, solskjerming har også fargevalg men ikke via blanderi.
4. **Hva skjer med Roomvo (Leap Tools) i kontekst av fargevelger?** Romvisualisering + fargevalg er en naturlig kombinasjon.
5. **Kan vi indeksere mg-color-data i Algolia i Fase 1?** Ville gi NCS-søk og fargenavn i søk tidlig.

---

## Endringslogg

| Dato | Endring | Kilde |
|---|---|---|
| 2026-03-25 | Opprettet med koblinger til mg-color PRD v0.3 og berørte FRS-dokumenter | John |
