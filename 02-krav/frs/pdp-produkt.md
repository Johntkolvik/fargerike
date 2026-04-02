# Fargerike – FRS: Produkt-PDP

> Levende dokument. Oppdateres med innsikt fra audit, møter og research.
> Del av PDP-familien: `pdp-produkt.md` | `pdp-farge.md` | `pdp-tjeneste.md`
> Flyter: Primær i **Flyt B** (produkt først). Steg 3–5 deles med **Flyt A** og **Flyt C**. Se `kjerneflyter-pdp.md`.

**Sist oppdatert:** 2026-03-25
**Status:** Skjelett – fylles med krav etter hvert
**Fase:** 1 (grunnstruktur) → 2 (commerce) → 3 (differensiering)

---

## Kontekst

Produkt-PDP er detaljsiden for fysiske varer – maling, tapet, gulv, solskjerming, verktøy, tilbehør. Det er den viktigste konverteringsflaten for Fargerike digitalt. I dag har vi ingen konverteringsdata på PDP-nivå, og vet ikke hvilke kategorier som faktisk selger.

Ulike produktkategorier har fundamentalt ulike behov – malingsprodukter trenger fargevelger og mengdekalkulator, tapet trenger mønsterrapport og romkalkulator, gulv trenger kapp-kalkulator og prøvebestilling. Felles for alle er at de trenger gode bilder, lokal lagerstatus og kobling til butikk.

### Relasjon til andre PDP-typer

- **Farge-PDP** (`pdp-farge.md`): Kulør som primær inngang. Kunden starter med en farge og finner kompatible produkter. Lenker tilbake til Produkt-PDP for kjøp.
- **Tjeneste-PDP** (`pdp-tjeneste.md`): Konsultasjoner, fargekonsulentbooking, håndverkerformidling. Konverterer til booking, ikke handlekurv.

### Kjente problemer (fra Eline-møte 11.03)

- Templater passer ikke innholdet – tapet vises smalt, bilder kuttes
- Tomme felt vises selv når data mangler (f.eks. «Instruksjoner»)
- Mobilopplevelsen er svak – anbefalinger forsvinner, bilder dårlige
- Produktbilder ofte lav kvalitet (sRGB/RGB-problematikk fra NOB)
- Produktnavn er logistikknavn, ikke kundevennlige

---

## Krav

### Informasjonsarkitektur

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Kategoritilpassede templates | Maling, tapet, gulv, solskjerming har ulike templates med relevante felt | Må ha | ❓ |
| Displaynavn | Kundevennlig produktnavn, adskilt fra logistikknavn | Må ha | ❓ Avhenger MG Item |
| Skjul tomme felt | Felt uten data skal ikke rendres | Må ha | ✅ Standard |
| Produktbeskrivelse | Redaksjonelt bearbeidet tekst, ikke PIM-rå | Bør ha | ❓ |
| Tekniske spesifikasjoner | Strukturert visning av teknisk data per kategori | Må ha | ❓ |

### Bilder og visuelt

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Bildekvalitetskrav | Min oppløsning, korrekt fargerom (sRGB), ingen overkomprimering | Må ha | ❓ |
| Bildeoverstyrings-hierarki | Kjede-bilde > NOB-bilde > fallback | Må ha | ❓ |
| Bildegalleri | Flere bilder per produkt (produkt, miljø, detalj) | Bør ha | ❓ |
| Romvisualisering (Roomvo) | Leap Tools-integrasjon for å se produktet i eget rom | Kan ha | ❓ Sharefox ut 2026 |

### Farge-spesifikt (→ se `02-krav/prd/2026-03-23_mg-color-prd.md`)

mg-color er MG-tjenesten som leverer kulørdata til alle kjeder. Fargerike integrerer mg-color API i sin PDP. Journey A i mg-color PRD (Produkt → Kulør) er primær PDP-opplevelse.

| Krav | Beskrivelse | mg-color krav | Prioritet | Status |
|---|---|---|---|---|
| PDP Color Picker | Velg farge direkte på produktsiden, i Fargerikes visuell profil | M3, M4, M8 | Må ha | ❓ PoC planlagt |
| Jotun iFrame som fallback | Jotun-widget som compliance-minimum mens egen picker bygges | M10 | Må ha (midlertidig) | ❓ |
| Multi-brand fargevisning | Jotun, Caparol, Beckers, egne merkevarer | S1 | Må ha (v1.1) | ❓ |
| Bas- og SKU-oppløsning | Riktig bas, volum og variant i handlekurv basert på kulørvalg | M4 | Må ha | ❓ |
| Kompatibilitetsinfo | Vis hvilke produkter en kulør kan brytes i | M3 | Bør ha | ❓ |
| NCS-kode visning og søk | Vis NCS-kode per kulør, lenke til NCS-oppslag | M5 | Bør ha | ❓ |
| Kulør-URL deep linking | Kanonisk URL per kulør for annonsering og deling | M7 | Må ha | ❓ |
| Inspirasjon per kulør | Miljøbilder og moodboards knyttet til kulør | S2 | Kan ha (v1.1) | ❓ |

### Kjøpsflyt og konvertering

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Lokal lagerstatus | Vis tilgjengelighet i valgt butikk | Må ha | ❓ Lindback API |
| Legg i handlekurv | Funksjonell kjøpsknapp med variant/mengde | Må ha (Fase 2) | ❓ |
| Kalkulator | Mengdeberegning (maling: areal → liter, gulv: areal + kapp) | Bør ha (Fase 2) | ❓ |
| Klikk-og-hent | Bestill og hent i butikk | Må ha (Fase 2) | ❓ |

### Innhold og kryssalg

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Relaterte artikler | Toveis kobling til how-to/guider | Må ha | ✅ Sanity |
| Produktanbefalinger | Algolia Recommend eller tilsvarende | Bør ha (Fase 2) | ❓ |
| Kampanjevisning | Automatisk eksponering av kampanjeprodukter | Bør ha | ❓ |
| Produktanmeldelser | Lipscore eller tilsvarende | Bør ha | ❓ Vurdere videreføring |

### Tracking

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| GA4 view_item | Ecommerce event ved PDP-visning | Må ha | ✅ Standard |
| Heatmap/scroll-tracking | Forstå hvordan kunder bruker PDP | Bør ha | ❓ Verktøyvalg |
| Konvertering per kategori | Spore konvertering per produktkategori | Må ha | ✅ GA4 |

---

## Benchmarks og referanser

| Kilde | URL | Hva vi kan lære |
|---|---|---|
| Klint PDP (Himla) | klint.com/no/farger/himla | Farge som inngang, tabs for overflate (vegg/tak/tre), innebygd mengdeveiledning, utstyranbefaling, massiv FAQ, UGC-bilder |
| GAP-analyse | `04-kilder/2026-03-25_gap-analyse-klint-vs-fargerike-pdp.md` | Fargerike Produkt-PDP scorer 1.4/5 vs. Klint 4.9/5 på customer journey |

**Nøkkelfunn fra GAP-analyse (2026-03-25):**
Klint løser hele kundeprosjektet på én side – farge, produkt, mengde, utstyr, FAQ, trygghet. Fargerikes Produkt-PDP er en katalogside uten prosjekthjelp. Kritiske gap: ingen fargevelger, ingen FAQ, ingen utstyrkobling, ingen trygghetsinformasjon, ingen fremgangsmåte.

---

## User stories (fra GAP-analyse)

Ref: `04-kilder/2026-03-25_gap-analyse-klint-vs-fargerike-pdp.md`

### Produkt og prosjekt

- **US-P01:** Som kunde som har valgt en farge, vil jeg se hvilke produkter den finnes i (vegg, tak, tre & metall), slik at jeg kan kjøpe riktig for hele rommet.
- **US-P02:** Som usikker maler vil jeg vite forskjellen mellom produktene, slik at jeg velger riktig for overflaten jeg skal male.
- **US-P03:** Som kunde vil jeg beregne hvor mye maling jeg trenger basert på rommets størrelse, slik at jeg verken kjøper for mye eller for lite.
- **US-P04:** Som kunde vil jeg se anbefalt utstyr for dette prosjektet, slik at jeg kan kjøpe alt jeg trenger i én handel.
- **US-P05:** Som kunde vil jeg se en steg-for-steg-guide for fremgangsmåten, slik at jeg vet hva jeg gjør.
- **US-P06:** Som kunde vil jeg vite om tørketider, grunning og forberedelser, slik at jeg planlegger riktig.

### Trygghet

- **US-T01:** Som forelder vil jeg vite om malingen er trygg for barnerom (VOC, lukt, merking), slik at jeg føler meg trygg.
- **US-T02:** Som usikker maler vil jeg vite hva jeg gjør ved søl, rengjøring av utstyr, og håndtering av rester, slik at jeg tør å starte.
- **US-T03:** Som kunde vil jeg enkelt kunne spørre en ekspert (chat, telefon, booking), slik at jeg får hjelp når jeg trenger det.
- **US-T04:** Som kunde vil jeg se anmeldelser fra andre som har brukt produktet, gjerne med bilder, slik at jeg ser ekte resultater.

### Kjøp og levering

- **US-K01:** Som kunde vil jeg kunne velge farge, produkt, mengde og utstyr og legge alt i handlekurv i én flyt, slik at jeg slipper å hoppe mellom sider.
- **US-K02:** Som kunde vil jeg se om varene er på lager i min butikk, slik at jeg kan hente dem i dag.
- **US-K03:** Som kunde vil jeg kunne få alt levert hjem eller til butikk, slik at det passer min hverdag.

---

## Åpne spørsmål

1. Hvilke kategorier skal ha egne templates, og hva er forskjellene?
2. Skal Lipscore videreføres eller erstattes?
3. Hva er kravene til Roomvo-integrasjon i ny stack?
4. Hvordan håndteres produktvarianter (størrelse, base, farge)?
5. Hva er Jotuns faktiske krav til iFrame-bruk? Avtalen nevner «Programvaran» generelt – ikke eksplisitt iFrame. Kan vi bruke API alene?
6. Når er mg-color API tilgjengelig for Fargerike? Avhenger av MG-prioritering og Colorama Fase 2-scope.
7. Skal Fargerike bygge egen PDP-picker eller bruke referansekomponent (mg-color S6)?

---

## Endringslogg

| Dato | Endring | Kilde |
|---|---|---|
| 2026-03-25 | Skjelett opprettet fra FRS-utkast og Eline-møte | John |
| 2026-03-25 | Splittet PDP i tre typer: produkt, farge, tjeneste. Denne er produkt. | John |
| 2026-03-25 | Lagt til benchmarks (Klint), user stories US-P01–P06, US-T01–T04, US-K01–K03 fra GAP-analyse | John |
