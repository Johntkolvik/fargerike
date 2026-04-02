# Fargerike – FRS: Søk (Autocomplete + SERP)

> Levende dokument. Oppdateres med innsikt fra audit, møter og research.

**Sist oppdatert:** 2026-03-25
**Status:** Skjelett – fylles med krav etter hvert
**Fase:** 1 (erstatte Hello Retail med Algolia)

---

## Kontekst

Søk er en av de viktigste konverteringsdriverne i e-handel. I dag brukes Hello Retail (søk: 135 kNOK/år) som erstattes av Algolia (MG-standard). MG har allerede Algolia-kompetanse fra andre konsepter.

Søk på Fargerike er spesielt fordi kundene ofte søker på:
- Prosjekter, ikke produkter («male stue», «legge parkett»)
- Fargenavn og NCS-koder
- Merke + produkttype («Jotun Lady», «Bona lakk»)
- Varer de husker fra butikken

### Kjente problemer

- Hello Retail-søk er ikke evaluert grundig – ukjent kvalitet
- Ingen synlig kobling mellom søk og redaksjonelt innhold
- Fargevelger lever separat fra hovedsøk

---

## Krav

### Autocomplete (Instant Search)

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Produktforslag | Sanntidsforslag fra Algolia ved inntasting | Må ha | ✅ Algolia standard |
| Innholdsforslag | Vis relevante guider/artikler i autocomplete | Bør ha | ❓ |
| Kategoriforslag | Foreslå kategorier, ikke bare produkter | Bør ha | ❓ |
| Fargeforslag | Søk på NCS-kode eller fargenavn via mg-color `/search` (M5) – treff på tvers av merker | Bør ha | ❓ |
| Populære søk | Vis trendende/populære søk ved tom søkeboks | Kan ha | ❓ |
| Søkehistorikk | Vis brukerens tidligere søk (lokal) | Kan ha | ❓ |

### Søkeresultatside (SERP)

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Relevanstuning | Konfigurerbar vekting av attributter (navn, beskrivelse, merke, kategori) | Må ha | ❓ |
| Faceted filtering | Filtre på SERP tilpasset søkeresultatet | Må ha | ❓ |
| Blandet innhold | Produkter + redaksjonelle artikler i samme resultat | Bør ha | ❓ |
| Synonymhåndtering | «parkett» = «tregulv», «maling» = «veggmaling» etc. | Må ha | ❓ |
| Nullresultat-håndtering | Nyttig fallback ved 0 treff – foreslå alternativer, vis populære | Bør ha | ❓ |
| Stavekorreksjon | Håndter skrivefeil | Bør ha | ✅ Algolia standard |

### Redaktørverktøy

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Synonymadministrasjon | Redaktør kan legge til/redigere synonymer | Må ha | ✅ Algolia dashboard |
| Søkeanalyse | Innsikt i hva folk søker på, hva som gir 0 treff | Må ha | ✅ Algolia analytics |
| Pinning/boosting | Manuelt promotere produkter for spesifikke søkeord | Bør ha | ✅ Algolia rules |
| Kampanjebanners i søk | Vis kampanjeinnhold i søkeresultat for relevante termer | Kan ha | ❓ |

### Indeksering

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Produktdata fra PIM | Indeksere produkter fra inRiver (Fase 1) → MG Item (Fase 2) | Må ha | ❓ |
| Redaksjonelt innhold | Indeksere guider, artikler, butikksider fra Sanity | Bør ha | ❓ |
| Butikkdata | Søk på butikknavn, sted, tjenester | Bør ha | ❓ |
| Fargedata | Indeksere NCS-koder, fargenavn fra mg-color API i Algolia | Bør ha | ❓ |

### Tracking

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| GA4 search event | Spore alle søk med søketerm | Må ha | ✅ Standard |
| Klikk-gjennom-rate per søk | Forstå hvilke søk som konverterer | Bør ha | ✅ Algolia analytics |
| Nullresultat-logging | Identifisere hull i katalog/synonymer | Må ha | ✅ Algolia analytics |

---

## Benchmarks og referanser

| Kilde | URL | Hva vi kan lære |
|---|---|---|
| | | |

---

## Åpne spørsmål

1. Hva søker folk faktisk på i dag? Har Hello Retail søkelogg vi kan eksportere?
2. Bør fargevelger integreres i hovedsøk eller forbli separat?
3. Hvilke synonymer trengs fra dag én? Bør bygges iterativt.
4. Skal søk dekke «prosjektsøk» (mal stue) eller kun produktsøk i Fase 1?

---

## Endringslogg

| Dato | Endring | Kilde |
|---|---|---|
| 2026-03-25 | Skjelett opprettet | John |
