# FRS: Innhold, Content Blocks og Forside

**Dato:** 12. april 2026
**Status:** Planlagt

## Prinsipp

**Aldri hardkode innhold.** Alle content blocks har en innholdsmodell i Sanity og henter data derfra. Seed-data brukes KUN som fallback under utvikling inntil Sanity er populert.

---

## Nye Sanity-skjemaer

### Content blocks (objects)
1. `productCard` — inline produktanbefaling i artikler
2. `colorPaletteEmbed` — fargepalett med swatches
3. `stepByStep` — nummererte instruksjoner med bilder per steg
4. `beforeAfter` — før/etter bildesammenligning
5. `videoEmbed` — YouTube/Vimeo med poster og transkripsjon
6. `ctaBlock` — CTA (book konsultasjon, finn butikk, bestill prøve)
7. `calloutBox` — tips fra proff / advarsel / info
8. `comparisonTable` — produktsammenligning
9. `materialsList` — utstyrssjekkliste

### Dokumenttyper
10. `articlePortableText` — rik Portable Text med alle 9 blokker
11. `homePage` — singleton for forsiden

### Utvidelser
- `article` — feltgrupper, metadata, room/season/style, relaterte artikler
- `contentCluster` — relaterte produkter/farger, coverImage

## Demo-innhold i Sanity

### Forside
- Kampanje-hero: "Gjør uteplassen vårklar" med CTA
- 6 kategori-innganger
- 3 inspirasjonsartikler
- 3 guider

### Artikler (minimum 4)
1. Guide: "Slik beiser du terrassen" (howto, 5 steg, produktkort)
2. Guide: "Velg riktig innendørsmaling" (howto, sammenligningstabell)
3. Inspirasjon: "Vårens farger 2026" (fargepalett, eksperttips)
4. Inspirasjon: "Nordisk stue" (rom-inspirasjon, produktreferanser)

## Frontend-komponenter
- Forside: 8 seksjoner (alle CMS-drevet)
- Artikkelmal: to-kolonne med sidebar
- Inspirasjonshub: hero + filter + masonry grid
- PortableText-renderers for alle 9 nye blokk-typer
