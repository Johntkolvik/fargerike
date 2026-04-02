# Fargerike – FRS: Produktlisteside (PLP)

> Levende dokument. Oppdateres med innsikt fra audit, møter og research.

**Sist oppdatert:** 2026-03-25
**Status:** Skjelett – fylles med krav etter hvert
**Fase:** 1 (grunnstruktur) → 2 (commerce + personalisering)

---

## Kontekst

PLP er der kunden navigerer produktkatalogen – enten via kategori, kampanje eller søkeresultat. I dag styres kategorisider av Hello Retail (årskostnad 136 kNOK). Ved migrering erstattes dette av Algolia.

### Kjente problemer (fra Eline-møte 11.03 + lisensdata)

- Hello Retail brukes for kategorisider, søk og email – alt erstattes
- Aktuelle varer og sesongfavoritter legges inn manuelt
- Ingen automatisk kampanjeeksponering
- Manglende kobling mellom innhold og produkter

---

## Krav

### Navigasjon og filtrering

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Kategoristruktur | Logisk hierarki som speiler kundenes mentale modell, ikke logistikk | Må ha | ❓ |
| Faceted filtering (Algolia) | Filtrering på relevante attributter per kategori (farge, pris, merke, rom, bruksområde) | Må ha | ❓ |
| Sortering | Relevans, pris, nyhet, popularitet | Må ha | ✅ Standard |
| Responsivt grid | Tilpasset visning mobil/desktop med riktig bildeformat | Må ha | ✅ Standard |

### Merchandising

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Kampanjeprodukter | Automatisk eksponering basert på PIM-flagg med tidsperiode | Bør ha | ❓ |
| Redaksjonelle blokker | Mulighet for å flette inn guider/inspirasjon mellom produkter | Bør ha | ❓ |
| Aktuelle varer | Sesongfavoritter flyter automatisk fra PIM/CMS | Bør ha | ❓ |
| Retail media-plassering | Leverandørbetalt synlighet, systematisert | Kan ha (Fase 2+) | ❓ |

### Produktkort

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Displaynavn | Kundevennlig navn, ikke logistikknavn | Må ha | ❓ |
| Kvalitetsbilder | Riktig format/oppløsning per visningskontekst | Må ha | ❓ |
| Pris og kampanjepris | Tydelig visning av ordinær pris og ev. kampanjepris | Må ha | ❓ |
| Lagerstatus-indikator | Vis om produktet er tilgjengelig i valgt butikk | Bør ha | ❓ |
| Quick-add to cart | Legg i handlekurv uten å gå til PDP (Fase 2) | Kan ha | ❓ |
| Fargevelger-preview | Vis tilgjengelige farger som swatches på kortet (mg-color data) | Bør ha | ❓ |
| Fargekart-filtrering | Filtrering på fargekart/collection fra mg-color (f.eks. «Lady Soulful Spaces 2026») | Kan ha | ❓ |

### SEO

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Indekserbare kategorisider | SSR/SSG via Next.js, ikke client-side-only | Må ha | ✅ Standard |
| Strukturert data | JSON-LD for produktlister | Bør ha | ❓ |
| Kanoniske URL-er | Håndtering av filtrerte views vs. hovedkategori | Må ha | ❓ |
| 301-redirects | Mapping fra gamle EPI-URL-er | Må ha (blokkerer lansering) | ❓ |

### Tracking

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| GA4 view_item_list | Ecommerce event ved PLP-visning | Må ha | ✅ Standard |
| Filtrerings-tracking | Spore hvilke filtre som brukes per kategori | Bør ha | ❓ |
| Konvertering per kategori | Forstå hvilke kategorier som konverterer digitalt | Må ha | ✅ GA4 |

---

## Benchmarks og referanser

| Kilde | URL | Hva vi kan lære |
|---|---|---|
| | | |

---

## Åpne spørsmål

1. Hva er riktig kategoristruktur? Bør vi gjøre trekortsortering med kunder?
2. Hvilke filtreringsattributter er relevante per kategori?
3. Skal PLP ha ulike layouts per kategori (som PDP)?
4. Hvordan håndteres Algolia-indeksering fra inRiver i Fase 1 vs. MG Item i Fase 2?

---

## Endringslogg

| Dato | Endring | Kilde |
|---|---|---|
| 2026-03-25 | Skjelett opprettet | John |
