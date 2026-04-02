# Fargerike – Funksjonskrav (FRS) – Utkast

> Levende dokument. Krav trekkes ut fra møter, audit og workshops og oppdateres fortløpende.
> Hvert krav har kilde (sporbarhet) og tentativ fase-tilhørighet fra PRD.

**Sist oppdatert:** 2026-03-25
**Status:** Utkast – behov identifisert, ikke validert med kunde

---

## 1. Produktdata og PIM

### 1.1 Displaynavn per kjede
Datamodellen må støtte et eget visningsnavn per kjede, adskilt fra logistikknavnet i MG Logistik. Kunden skal aldri se «Gjortan Gatekost 1841 med gjenger 30cm» – de skal se et redaksjonelt bearbeidet produktnavn.

- **Kilde:** Eline-møte 11.03, produktnavn og datamodell
- **Fase:** 1 (Sanity) / avhenger av MG Item
- **Avhengighet:** MG Item må støtte felt for kjede-spesifikt displaynavn
- **Status:** ❓ Uavklart – må sjekkes mot MG Item-datamodell

### 1.2 Bildeoverstyrings-hierarki
Fargerike må kunne overstyre produktbilder fra NOB uten at de overskrives ved neste synkronisering. Ny plattform trenger et bildehierarki: kjede-spesifikt bilde > NOB-bilde > fallback.

- **Kilde:** Eline-møte 11.03, bildekvalitet og data fra NOB
- **Fase:** 1
- **Avhengighet:** Integrasjon mot MG Item / inRiver
- **Status:** ❓ Uavklart

### 1.3 Bildekvalitetskrav
Bilder fra PIM må leveres i riktig fargerom (sRGB for web) og med tilstrekkelig oppløsning. Komprimeringspipeline må ikke degradere bildekvalitet under akseptabelt nivå. Spesielt viktig for fargeprodukter der fargenøyaktighet er salgskritisk.

- **Kilde:** Eline-møte 11.03, bildekvalitet og data fra NOB
- **Fase:** 1
- **Status:** ❓ Må kartlegge nåværende pipeline

---

## 2. Kampanje og merchandising

### 2.1 Kampanjeflagging i PIM med tidsperiode
Kampanjeprodukter skal kunne flagges med start- og sluttdato i PIM og automatisk eksponeres på relevante flater (forside, kategori, søk) uten manuell innsats.

- **Kilde:** Eline-møte 11.03, manuelt arbeid uten system + PRD Fase 2 (kampanjemotor)
- **Fase:** 2 (ny kampanjemotor), men enkel versjon kan løses i Fase 1 via Sanity
- **Status:** ❓ Avhenger av MG Pris 2.0

### 2.2 Automatisk eksponering av aktuelle varer
Sesongfavoritter og aktuelle varer skal flyte fra PIM/CMS til alle relevante flater uten at Eline legger dem inn manuelt ett sted av gangen. Retail media-tankegang: leverandørbetalt synlighet bør også systematiseres.

- **Kilde:** Eline-møte 11.03 + Johns observasjoner (retail media)
- **Fase:** 1 (enkel versjon i Sanity) → 2 (full automatisering via PIM)
- **Status:** ❓ Behov for definert flyt

---

## 3. Innhold og redaksjonelt

### 3.1 Toveis relasjon mellom artikler og produkter
How-to-artikler og guider må kunne kobles til relevante produkter, og produktsider må vise relevante artikler. Relasjonen skal være toveis og vedlikeholdes fra begge sider.

- **Kilde:** Eline-møte 11.03, manuelt arbeid uten system
- **Fase:** 1 (Sanity)
- **Status:** ✅ Løsbart i Sanity med referanser

### 3.2 Kategoritilpassede produkttemplater
Ulike produktkategorier (maling, tapet, gulv, solskjerming) skal ha tilpassede templates som viser relevant innhold og bilder korrekt. Tomme felt skal ikke vises.

- **Kilde:** Eline-møte 11.03, templater og frontend
- **Fase:** 1
- **Status:** ✅ Standard headless-løsning

### 3.3 Mobiloptimalisert produktopplevelse
Produktanbefalinger, bilder og innhold skal fungere fullverdig på mobil. Dagens løsning kutter innhold og skjuler anbefalinger på mobil.

- **Kilde:** Eline-møte 11.03, templater og frontend
- **Fase:** 1
- **Status:** ✅ Grunnleggende krav til ny frontend

---

## 4. Fargevelger

### 4.1 Multi-brand fargevelger
→ **Detaljert i egen FRS: `fargevelger.md`** og **mg-color PRD: `02-krav/prd/2026-03-23_mg-color-prd.md`**

Fargevelgeren bygges på mg-color API – MGs sentrale, leverandøruavhengige fargetjeneste. Fargerike konsumerer API-et og bygger egen frontend i Fargerike visuell profil. Dekker PDP picker, kulørsider, NCS-søk og inspirasjon.

- **Kilde:** Eline-møte 11.03 + mg-color PRD v0.3
- **Fase:** 1 (PoC + Jotun fallback) → 2 (fullverdig multi-brand)
- **Avhengighet:** mg-color API, Jotun API, MGITEM Product Family ID-mapping
- **Status:** ❓ Discovery/konseptfase, PoC planlagt

---

## 5. Søk og anbefalinger

### 5.1 Algolia-søk med produktdata
Erstatte Hello Retail med Algolia. Søk skal indeksere produktdata fra PIM og redaksjonelt innhold fra Sanity. Konfigurering av synonymer, vekting og facets må være tilgjengelig for redaktør.

- **Kilde:** PRD + Johns observasjoner
- **Fase:** 1
- **Avhengighet:** Midlertidig integrasjon mot inRiver i Fase 1
- **Status:** ✅ MG har Algolia-kompetanse

### 5.2 Personaliserte anbefalinger
Algolia Recommend eller tilsvarende for produktanbefalinger basert på brukeradferd og kontekst.

- **Kilde:** PRD Fase 2
- **Fase:** 2
- **Status:** ❓ Behov for tilstrekkelig trafikkdata

---

## 6. Tracking og analyse

### 6.1 GA4 med ecommerce events
Fullstendig GA4-oppsett med ecommerce-tracking: view_item, add_to_cart, begin_checkout, purchase. Konvertering per kategori, segment og kanal fra dag én.

- **Kilde:** PRD produktprinsipp 3 + Eline-møte 11.03
- **Fase:** 1
- **Status:** ✅ Standard implementasjon

### 6.2 PDP-nivå konverteringsdata
Heatmaps eller tilsvarende for å forstå hvordan kunder bruker produktsider. Nødvendig for å optimalisere produktopplevelsen.

- **Kilde:** Eline-møte 11.03, tracking og måling
- **Fase:** 1
- **Status:** ❓ Verktøyvalg ikke besluttet (Hotjar, Clarity, etc.)

---

## 7. Butikk og lokal opplevelse

### 7.1 Butikkvelger med lokal lagerstatus
Kunden skal kunne velge butikk og se lagerstatus lokalt. Grunnlag for klikk-og-hent.

- **Kilde:** PRD Fase 1
- **Fase:** 1
- **Avhengighet:** Lindback API for lagerstatus
- **Status:** ❓ Avhenger av Lindback-integrasjon

### 7.2 Booking av interiørkonsulent
Enkel bookingløsning for konsultasjoner. Kan starte med Calendly/lignende og bygges ut.

- **Kilde:** PRD Fase 1
- **Fase:** 1 (enkel) → 3 (betalt tjeneste, 1 499 kr)
- **Status:** ❓ Må avklare med butikkene

---

## 8. SEO og synlighet

### 8.1 SEO-migrering
Fullstendig 301-redirect-plan, meta-data, strukturert data (JSON-LD). 69 % av trafikken er organisk – dette er det mest kritiske enkeltkravet for lansering.

- **Kilde:** PRD Fase 1
- **Fase:** 1 (blokkerer lansering)
- **Status:** ❓ Dedikert plan trengs

### 8.2 AEO og innholdsklynger
Innholdsarkitektur optimalisert for AI-drevne søkemotorer (Answer Engine Optimization). Klynger av innhold rundt prosjekttyper og kategorier.

- **Kilde:** PRD Fase 1
- **Fase:** 1
- **Status:** ❓ Innholdsstrategi må defineres

---

## Krav som venter på mer innsikt

Disse er identifisert i PRD men krever Fase 0-avklaringer før de kan spesifiseres:

| Område | Blokkerer | Avklares av |
|---|---|---|
| Klikk-og-hent med forhåndsbetaling | Lindback-støtte | Fargerike/MG |
| Kampanjepris-flyt i ny arkitektur | MG Pris 2.0 tidslinje | Mestergruppen |
| Kategori-spesifikk konvertering | Mangler data | John (audit) |
| CRM/nyhetsbrev-strategi | Mailchimp begrensninger | TBD |

---

## Endringslogg

| Dato | Endring | Kilde |
|---|---|---|
| 2026-03-25 | Første utkast – krav trukket ut fra Eline-møte 11.03 og PRD | John |
| 2026-03-25 | Oppdatert farge-krav med referanse til mg-color PRD og egen fargevelger-FRS | John |
