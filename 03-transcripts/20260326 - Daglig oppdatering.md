# Daglig oppdatering – 26. mars 2026

## Kalender i dag

Ingen Fargerike/Mestergruppen-møter i dag. Dagens kalender:
- **08:00–14:55** DS Focus (egen blokkering)
- **10:30–11:30** Friends of Figma workshop (Dennis)
- **13:00–14:00** Bjørklund – Roadmap (Peter Wroldsen)

---

## E-post som krever handling

### 1. 🔴 Eline – Prisestimat Luc (23. mars, ULEST)

Eline sender Lucs estimat for 9 oppgaver på eksisterende Fargerike-plattform. Totalramme ca. 70–80 timer. Oppgavene:
1. Paginering (20-30t) – alternativt en tydeligere knapp i stedet for infinite scroll (10t)
2. Support-ärende mot Optimizely (2t)
3. SSR fallback for crawlers (6t)
4. Mindre fix (1t)
5. Sitemap-rebuilding (20-30t)
6. Schema-implementering (5t)
7. Robots.txt via Optimizely (2t)
8. Seksjonsside-aktivering (2t)
9. Mindre fix (1t)

**Utkast til svar:**

> Hei Eline,
>
> Takk for oversikten. Min anbefaling er at vi prioriterer oppgavene etter hva som gir mest SEO-verdi på kort sikt, og holder igjen på ting som har stor risiko for å bli overflødig når ny plattform kommer.
>
> **Anbefaler å kjøre nå:**
> - Punkt 3 (SSR fallback, 6t) – kritisk for crawlers
> - Punkt 6 (Schema, 5t) – direkte effekt på SERP-visning
> - Punkt 7 (Robots.txt, 2t) – enkel og viktig
> - Punkt 8 (Seksjonsside, 2t) – lav risiko
> - Punkt 9 (1t) – lav risiko
>
> **Anbefaler å avvente:**
> - Punkt 1 (Paginering, 20-30t) – stor jobb, potensielt overflødig med ny plattform. Alternativ 1.B med tydeligere knapp (10t) er fornuftig kompromiss.
> - Punkt 5 (Sitemap, 20-30t) – ny sitemap-struktur vil bli helt annerledes. Kun verdt det om det er kritisk for indeksering nå.
>
> Total anbefalt nå: ~16–26 timer (avhengig av om vi tar 1.B).
>
> Hva tenker du?

---

### 2. 🔴 Eline – Datafeed Google Ads (25. mars)

Eline videresender en dialog mellom Oscar (TSM), Luc (Epinova) og henne selv om ny XML-datafeed for Google Ads. Detaljert feltliste for produktfeed. Luc estimerer 4-10 timer. Eline spør om slike forespørsler kan gå via deg fremover.

**Utkast til svar:**

> Hei Eline,
>
> Absolutt – slike forespørsler kan gjerne gå via meg fremover, så slipper du å bruke tid på dette. Feltoversikten ser komplett ut. Si til Oscar og Luc at de kan kjøre på.
>
> Én ting: på ny plattform vil produktfeed-generering bli en del av Algolia/Sanity-riggen, men inntil da gir det mening å ha en fungerende feed i eksisterende system.

---

### 3. 🟡 Algolia Service Order (24. mars, lest)

Christoffer Fagerström (Algolia) har sendt utkast til Service Order for samarbetsavtal mellom Algolia og Mestergruppen. Nøkkelpunkter:
- Inkluderer alle selskaper, inkl. Proffnett 2.0
- 3-årsavtal med låste priser (~99K EUR/år)
- Pooled search units (75K × 3), overføring mellom år
- Mulighet for utvidelse til samme enhetspris
- Opptil 20 apper/sajter, anbefaler ~10
- Offert gyldig til **2. april**. Kontraktstart 15. april 2026.

**Handling:** Birger og Petter i MG eier denne beslutningen, men du bør gjennomgå SO og ha en mening klar. Stine har allerede kommunisert i #mg_alle at beslutning trolig landes over påske.

---

### 4. 🟡 Jotun Colour Picker – Dokumentasjon (23. mars, ULEST)

Magnus Sjögren (Jotun) har sendt API-dokumentasjon og widget-docs. Ber om domener for prod og test for whitelisting + API-nøkler.

**Handling:** Avventer avtale mellom Jotun og MG. Oppdater Magnus med: "Vi avventer den interne avtalediskusjonen i MG. Kommer tilbake med domener så snart det er avklart."

---

### 5. 🟢 Hello Retail / Followup (24. mars, håndtert)

Kasper fra Hello Retail vil gjenoppta dialog rundt Mestergruppen. Barbro ba om input. Stine har allerede skrevet et svar som høflig avviser og peker dem mot MGs IT/produkt-organisasjon direkte. Saken virker håndtert.

---

## Slack som krever handling

### 1. 🔴 Supplere Stines Algolia-post i #mg_alle

Stine postet i #mg_alle (25. mars) om to ting: visuelle playbooks via Claude, og Algolia-beslutningen. Hun tagget deg og ba deg supplere. Du er nå med i kanalen.

**Forslag til innlegg:**

> Takk Stine! Kort supplement på Algolia-delen:
>
> Det som gjør Algolia spennende for oss er at vi får ett felles søke-lag på tvers av alle kjeder – med AI-drevet merchandising, personalisering og NeuralSearch. Konkret betyr det:
> - Bedre produktranking basert på konverteringsdata
> - "Did you mean"-funksjonalitet og synonymhåndtering
> - Mulighet for AI-assistert søk der kunder kan spørre med naturlig språk
> - Algolia Recommend for utstyranbefalinger og kryssalg
>
> For Fargerike spesielt betyr dette at fargevelgeren, produktsøk og inspirasjon kan kobles tettere sammen. Mer om dette etter påske 🐣

---

### 2. 🟡 #mg_sverige_intern – Stines prosessoversikt (25. mars)

Stine delte en konfidensielt prosessoversikt om e-handel-utrullingen:
- **Bolist** starter etter påske (pilot)
- **Colorama** etter sommeren
- **Fargerike Norge** etter sommeren

Sentralt arbeid før sommeren: FargePIM (Magnus+John fra TRY), Klaviyo CRM (Julie Lium), Checkout (Stian), Min Side.

**Handling:** Ingen direkte respons nødvendig, men god kontekst. FargePIM-involveringen bekrefter at du har en rolle i dette prosjektet.

---

### 3. 🟢 #mg_overflate_ecom – Stine foreslår MG-rigg-innføring (19. mars)

Stine foreslo at Petter Sandholt gir deg en innføring i MG-riggen, og at dere samarbeider om as-is + fremtidig visjon for 17. april-workshop.

**Handling:** Følg opp med Petter for å avtale tid for innføring.

---

## Ingen møtetranscripts å hente i dag

Ingen Fargerike/MG-møter i dag. Jotun Colour Picker-møtet fra 23. mars er nå dokumentert som `03-transcripts/20260323 - Jotun Colour Picker.md`.

---

## Oppsummering: Topp 3 handlinger

1. **Svar Eline på prisestimat** – anbefal prioritering av SEO-tiltak (~16-26t)
2. **Svar Eline på datafeed** – bekreft at du tar over koordinering
3. **Suppler Stines Algolia-post** i #mg_alle
