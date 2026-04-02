# PRD: mg-color – Mestergruppens Fargeblander Digital Service

**Versjon:** 0.3 (utvidet datamodell med Variant/SKU, feed-integrasjon, og Jotun product feed-attributter)
**Dato:** 23. mars 2026
**Eier:** Mestergruppen (Mikael Österlund, Product Owner digitale kanaler)
**Bidragsytere:** TRY (John Kolvik, Magnus Bergman), Mestergruppen Norge (Stine Stenhaug, Petter Sandholt), Mestergruppen Sverige (Sandra Wigfors, Ylva Widegren), Fargerike (Eline Fjeld)
**Status:** Discovery / konseptfase

---

## 1. Problemstilling

Mestergruppens kjeder (Colorama, Happy Homes, Bolist, Fargerike m.fl.) mangler en enhetlig, moderne løsning for fargevalg i digitale kanaler. Dagens situasjon:

**Manuell kulørforvaltning.** Jotun sender Excel-filer med hex-koder og kulørdata. Hver kjede håndterer dette manuelt – kopierer inn i egne systemer, vedlikeholder mapping mellom kulør og produkt. Ved ny fargekartlansering (typisk uke 35) må alt oppdateres for hånd.

**Leverandørlåsing gjennom iFrame.** Jotuns nye Color Picker-løsning tilbyr et API kombinert med en obligatorisk iFrame-widget. Widgeten er visuelt satt (Jotun-branding, ingen tilpasning) og må implementeres på PDP for å få tilgang til API-et. For en multibrand-forhandler som Colorama – som selger Jotun, Caparol, Beckers m.fl. – betyr dette at kjøpsopplevelsen ser lik ut som hos alle andre forhandlere, og at bare Jotun-kulører støttes.

**Fragmenterte systemer.** Fargerike bruker inRiver for kulørdata. Colorama har predefinerte JSON-filer. Happy Homes har en enklere løsning. Det finnes ingen sentral kilde for farge-/kulørdata på tvers av kjeder og leverandører.

**Lineær kjøpsreise som ikke matcher virkeligheten.** Jotuns widget forutsetter at kunden starter med et produkt og deretter velger kulør. I praksis starter mange kunder med inspirasjon eller en kulør (ofte NCS), og finner deretter riktig produkt. Denne reverse journey støttes ikke av noen eksisterende løsning.

---

## 1b. Prosjekthistorikk og status

### Farge-PIM-prosjektet (pågående, men på is)

Internt i Mestergruppen har det lenge vært snakk om et «Farge-PIM»-prosjekt – en sentral kilde for kulørdata på tvers av kjeder. **Stine Stenhaug** (TRY/MG) bekrefter i Slack (2. mars 2026) at prosjektet har *"ligget litt på is pga mangel på beslutning"*, men at det nå skal *"gi det et friskt pust med Kristian på banen"* og bør inn i **scope for Colorama fase 2**.

**Petter Sandholt** (MG) noterer at Jotun sa det samme til Fargerike og Mal Proff for et år siden – at de ville slutte med manuelle hex-filer – men aldri fulgte opp. Nå følger de opp.

**Eline Fjeld** (Fargerike) er identifisert som viktig stakeholder da Fargerike trolig blir den største konsumenten av et MG farge-PIM.

Kanalen `#mg-färgfackhandel-external` er sentral for denne diskusjonen.

### Sandras trigger (2. mars 2026)

Sandra Wigfors (MG Sverige) satte i gang prosessen da hun postet i `#mg-färgfackhandel-external`:

> *"Jotun meddelar att det inte längre kommer att förse oss manuellt med artikeldata för kulörer 'då all information finns i det nya verktyget' aka vill vi sälja Jotuns kulörer digitalt så blir vi intvingade i deras system."*

Sandra hadde tidligere takket nei til widgeten fordi designen ikke gikk å tilpasse, og de ville ha en enhetlig kulørvelger for Happy Homes.

### TRYs historikk med Jotun Color/instore

TRY har betydelig erfaring med dette domenet:

**instore.jotun.com** – TRY bygget den digitale representasjonen av JCCI (Jotun Colour Collection Interior) og JCCE (Exterior). Løsningen speiler de fysiske fargeinstallasjonene digitalt – med inspirasjonsbilder, fargekombinasjoner, matchende kulører, og mulighet for å lagre utvalg mot en Jotun-konto. Bygget med **Next.js + Sanity**, multi-market/multi-language (NO, SE, DK, EN, ES, TR).

**Jernia** – TRY bygget fargesider for Jernia med data fra Hybris Farge-API (`/paint/colors`, `/paint/colors/<code>`). Kulørdata lå delvis i Sanity, delvis i SAP. Algolia brukt for søk (indeks: `prod_jernia_paint_color_index`).

**Jotun Colour Picker API** – Henrik Sørhaug (TRY) dokumenterte endepunktet `https://jotuncolourpicker-api.jotun.com/v1/colours` i mai 2024. Backend er Bluestone PIM. Identifikator for farge: `colourCode` (Standardnummer). Data inkluderer hexCode og matchingColours.

**John Kolvik → Stine (2. mars 2026):**

> *"Løsningen vi utviklet den gangen var en digital representasjon av JCCI og JCCE. Målet var å speile deres fysiske installasjoner digitalt – med inspirasjonsbilder, fargekombinasjoner og mulighet for å lagre utvalg mot en Jotun-konto. Jeg antar det er denne kontoen de nå ønsker at brukerne skal dobbel-logge inn med, for å få tilgang til sine Jotun-«collections» på tvers av flater."*

### instore.jotun.com som referansearkitektur

Løsningen TRY bygget for Jotun er direkte relevant som referanse for mg-color:

| Feature | instore.jotun.com | mg-color (mål) |
|---------|-------------------|-----------------|
| Fargekolleksjoner/temaer | Ja (JCCI, JCCE, Lady-serier) | Ja, men multi-brand |
| Matchende kulører | Ja (fargeharmonier) | Ja |
| Inspirasjonsfoto per kulør | Ja | Ja |
| Favoritter/samlinger | Ja (Jotun-konto) | Ja, men MG-konto på tvers av merker |
| Multi-market/språk | Ja (6 markeder) | Ja (NO, SE, DK) |
| Produktkobling | Nei (kun kulør) | Ja (kulør → SKU → handlekurv) |
| Multi-brand | Nei (kun Jotun) | Ja |
| CMS | Sanity | Sanity (allerede i bruk hos Colorama) |
| API | Sanity GROQ | mg-color REST API |

Nøkkelpoenget: instore.jotun.com er en **bro mellom fysiske fargeprøver og digitalt fargevalg**. mg-color kan bygge videre på denne tankegangen, men med login for å få tilgang til egne collections på tvers av Mestergruppens merkevarer/kjeder.

---

## 2. Visjon

**mg-color er en sentral, leverandøruavhengig fargetjeneste som gjør at Mestergruppens kjeder kan tilby den beste digitale fargeopplevelsen i Norden.**

Tjenesten skal:
- Gi alle kjeder tilgang til ett felles API for kulørdata, produktkompatibilitet og fargekart – uavhengig av leverandør.
- Muliggjøre at hver kjede bygger sin egen merkevareriktige brukeropplevelse, uten å være låst til en leverandørs widget.
- Erstatte manuell kulørforvaltning med automatiserte dataflyter.
- Støtte dagens kjøpsreiser og fremtidens (AI-basert fargerådgivning, moodboards, visualisering).

---

## 3. Nåsituasjon: Jotun Color Picker

Basert på gjennomgang av Jotuns implementering hos XL-Byg Danmark og to møter med Jotun (10. og 23. mars 2026).

### 3.1 Arkitektur

Jotun tilbyr en kombinasjon av:

**API** – RESTful tjeneste som returnerer kulørdata, produktfamiljer, kompabilitet (hvilke kulører kan brytes i hvilke produkter), riktig bas per kulør/produkt, og SKU-nivå varianter. Krever Product Family ID som input. Dokumentasjon finnes (Swagger), men er ikke offentlig tilgjengelig ennå.

**Widget (iFrame)** – En ferdig visuell komponent som embeddes på forhandlerens PDP. Viser Jotuns fargeunivers med filtrering på fargekart, fargenyanse-kategorier og søk. Returnerer valgt kulør + bas + SKU via postMessage tilbake til host-siden. Helt Jotun-branded (logo, fonter, farger). Ingen tilpasningsmuligheter.

### 3.2 Observert UX hos XL-Byg

Basert på screenshots fra xl-byg.dk:

**Entry point (PDP):** "Vælg din farve"-knapp med Jotun-ikon. Dropdown for farge, felt for størrelse. Kalkulatorfunksjon ("Beregn dit forbrug").

**Color Picker (iFrame overlay):** Jotun-logo + "Jotuns farveunivers" header. Venstre side: søkefelt, filter på fargekart (Lady Soulful Spaces 2026 osv.), fargenyanse-checkboxer (Rød og rosa, Hvid, Lilla, Gule, Blå, Grøn, etc.). Høyre side: kulør-swatches i grid organisert etter fargekart-tema (f.eks. "Passage of Time", "Joyful Living", "Art of Stillness"). Hver kulør viser: navn (JOTUN 20362 PINK AMBIENCE), NCS-kode (2314-Y58R), beskrivende tekst. Kompatibilitetsinformasjon nederst: "Farven kan tones i LADY Minerals", "Farven kan tones i LADY Perfection" osv.

**Etter valg:** Kulør vises i "Vælg farve"-feltet med fargeprøve. URL endres (artikelnummer). Produkten kan legges i handlekurv med riktig base.

### 3.3 Styrker

- Sikrer riktig kulør-produkt-bas-kombinasjon (eliminerer feilbestillinger)
- Automatisk oppdatering ved nye fargekart
- NCS-kode og beskrivende tekst gir god informasjon
- Kompabilitetsoversikt per kulør er nyttig
- Enkel å implementere (iFrame = "plug and play")

### 3.4 Svakheter og begrensninger

- **Kun Jotun.** Ingen støtte for andre leverandørers kulører.
- **Ikke tilpassbar.** Kjedens merkevare forsvinner i kulørvalget. Sandra Wigfors: *"Det er skit."* Ylva Widegren: *"En mulig dealbreaker."*
- **Kun PDP-journey.** Starter med produkt → kulør. Ingen støtte for kulør → produkt.
- **Ingen kulør-URL-er.** Kan ikke lenke til en spesifikk kulør for annonsering/landingssider.
- **Ingen miljøbilder.** Inspirasjonsfoto følger ikke med i API-et (kommer på sikt).
- **Ingen NCS-oppslag.** Standard NCS-søk (uavhengig av leverandør) må bygges separat.
- **Alle ser like ut.** Colorama, Jernnia, Coop, XL-Byg – samme widget, samme opplevelse.

### 3.5 Avtalevilkår

Tilläggsavtal E-handel (desember 2025) regulerer:
- Lisens: 1 500 SEK/mnd per API-løsning, fakturert årsvis.
- Jotun eier programvaren. Kan ikke modifiseres, kopieres eller distribueres.
- Jotun kan ekskludere produkter fra e-handel (3.3).
- Forbud mot tredjepartssalg (Amazon, CDON, Bygghemma).
- 3 mnd oppsigelse.

**Viktig observasjon:** Avtalen definerer ikke at iFrame-widgeten må brukes. Den omtaler "Programvaran" generelt. Det muntlige kravet om widget + API som pakke er en forretningsposisjon fra Jotun, ikke et kontraktsvilkår.

---

## 4. Brukerreiser

### 4.1 Sluttbrukere (kunder)

**Journey A: Produkt → Kulør (PDP Color Picker)**
Kunden er på en PDP for f.eks. Lady Supreme Finish. Vil velge farge. Åpner color picker, browser kulører filtrert på kompatibilitet med produktet, velger kulør, får riktig bas og volum. Legger i handlekurv.

*Tilsvarer det Jotun-widgeten gjør i dag – men med kjedens egen merkevare og støtte for alle leverandører.*

**Journey B: Kulør → Produkt (Reverse Journey)**
Kunden har bestemt seg for en farge (f.eks. "jeg vil ha en varm grå"). Starter i en fargeopplevelse – browser kulører, filtrerer på rom/stemning/nyanse. Finner en kulør. Ser hvilke produkter den kan brytes i (veggmaling, takmaling, trevirke). Velger produkt og volum.

*Denne journeyen finnes delvis i butikk (fargekort → blandemaskin), men ikke digitalt. Den er kritisk fordi fargevalget ofte er det første valget kunden tar.*

**Journey C: Inspirasjon → Kulør → Produkt**
Kunden søker inspirasjon. Ser et moodboard, et rombilde, eller en fargekombinasjon. Klikker på en kulør i bildet. Får informasjon om kuløren, relaterte kulører, og kompatible produkter.

*Krever miljøbilder og kulørrelasjon-data som ikke finnes i Jotuns API i dag, men som mg-color kan bygge selv.*

**Journey D: NCS/fargekode → Produkt**
Kunden har en NCS-kode fra en interiørarkitekt, en fargekort-prøve, eller et annet referansesystem. Slår opp koden, ser hvilke leverandørers produkter som matcher, sammenligner pris og egenskaper.

*En ekte multi-brand journey som ingen leverandør-spesifikk widget kan tilby.*

**Journey E: AI-assistert fargevalg (fremtidig)**
Kunden beskriver prosjektet sitt: "Jeg skal male stuen, den er nordvendt, 20 kvm, vi liker skandinavisk stil." AI-en foreslår kulørpaletter, viser visualiseringer, anbefaler produkter og mengder.

*Magnus Bergman: "Neste steg er en helautomatisk AI-kjede som tar frem moodboards og lager forslag på alle kulører i hele huset."*

### 4.2 Redaksjonelle brukere (kjede-markedsavdeling)

**Journey F: Kampanje og annonsering**
Markedsavdelingen skal annonsere "Årets farge" eller en sesongkampanje. Trenger kulør-URL-er for å sende trafikk til en landingsside med riktig kulør forhåndsvalgt. Trenger farge-swatches og bilder for annonsemateriell.

**Journey G: Kulørsider**
Redaksjonen bygger innholdssider rundt en kulør: "Coffee" – med beskrivelse, inspirasjon, relaterte kulører, og kompatible produkter fra alle leverandører. Bruker API-data + eget innhold fra Sanity.

### 4.3 Interne brukere (butikkansatte)

**Journey H: Butikkstøtte**
En butikkansatt hjelper en kunde som har en NCS-kode. Slår opp i mg-color, finner matching kulører og produkter, hjelper kunden velge.

---

## 5. Designprinsipper

**Kjedens merkevare, alltid.** Fargevalget er en del av kjøpsopplevelsen. Det skal se ut som Colorama på colorama.se, Happy Homes på happyhomes.se, Fargerike på fargerike.no. Aldri som en leverandørs widget.

**Kulør først, produkt etterpå.** Arkitekturen skal støtte at fargevalget er det primære. Produktet er sekundært. Motsatt av hvordan de fleste e-handelssystemer er bygget.

**Leverandøragnostisk.** En kulør er en kulør – uavhengig av om den heter JOTUN 2149 COFFEE eller BECKERS 782 ESPRESSO. NCS er lingua franca.

**API-first.** Alt bygges som API-er først. Frontend-komponenter er konsumenter av API-ene, ikke omvendt. Dette muliggjør at ulike kjeder bygger ulike opplevelser, og at nye kanaler (app, butikk-skjerm, AI) kan kobles til.

**Progressiv forbedring.** Start med Jotun-data (fordi API-et finnes). Legg til NCS-oppslag. Legg til flere leverandører over tid. Legg til bilder, AI, visualisering. Arkitekturen skal tåle dette uten redesign.

---

## 6. Overordnet arkitektur

```
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND-LAGET                         │
│                                                         │
│  Colorama.se    HappyHomes.se    Bolist.se    Fargerike │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐            │
│  │ PDP      │   │ Kulør-   │   │ NCS-     │   ...      │
│  │ Picker   │   │ sider    │   │ oppslag  │            │
│  └────┬─────┘   └────┬─────┘   └────┬─────┘            │
│       │              │              │                   │
└───────┼──────────────┼──────────────┼───────────────────┘
        │              │              │
        ▼              ▼              ▼
┌─────────────────────────────────────────────────────────┐
│              mg-color API (sentralt)                     │
│                                                         │
│  /colors         – Kulører med metadata                  │
│  /collections    – Fargekart / paletter                  │
│  /products       – Produktfamiljer og kompabilitet       │
│  /resolve        – Kulør + produkt → SKU + bas           │
│  /search         – Fritekst, NCS, hex, nyanse            │
│  /inspiration    – Moodboards, rombilder (fremtidig)     │
│  /ai/suggest     – AI-fargerådgivning (fremtidig)        │
│                                                         │
└───────┬──────────────┬──────────────┬───────────────────┘
        │              │              │
        ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Jotun API    │ │ NCS-register │ │ Caparol      │
│ (ekstern)    │ │ (intern/eks.)│ │ (fremtidig)  │
└──────────────┘ └──────────────┘ └──────────────┘
        │
        ▼
┌──────────────┐
│ MGITEM       │
│ (produkt-    │
│  master)     │
└──────────────┘
```

**mg-color API** er proxy-/orkestreringslaget. Det wrapper leverandør-API-er, normaliserer data til en felles modell, og eksponerer et konsistent grensesnitt mot alle frontend-løsninger. Hvert kall til mg-color returnerer data som er uavhengig av leverandør.

**MGITEM** er Mestergruppens eksisterende produktmasterdata. Product Family ID (fra Jotun) må finnes her, eller mappes. mg-color bruker MGITEM for å koble kulør-data til faktiske salgsbare produkter.

### 6.1 Eksisterende tech stack (relevant kontekst)

mg-color bygges ikke fra scratch – det finnes allerede en rekke systemer og erfaringer å bygge på:

**Colorama.se (i produksjon):**
- Frontend: Next.js + Sanity CMS
- E-handel: Omnium (OMS)
- Søk: Algolia (`prod_products`-indeks, app-ID `6CR8FG3D99`)
- Produktdata: Omnium → Algolia med ETIM-klassifisering, variantdimensjoner (volum), prisdata
- Bilder: Sanity CDN (`cdn.sanity.io/images/vqwfk8xt/production/`)
- Eksempel produktstruktur: `variantId: "jotun_lady_pure_color"`, `baseProductName`, `variantCount`, `facets` (Glansvärde, Färgbas, Volym)

**instore.jotun.com (referanse):**
- Frontend: Next.js + Sanity
- Datamodell: Kategori-dokument → Farge-array (med hex, flerspråklige navn, inspirasjonsbilder, matching_colors)
- Multi-market routing: `/[market]/`
- Favoritter: FavoritesProvider (lokal/innloggingsbasert)

**Jotun Colour Picker API (kjent):**
- Endepunkt: `https://jotuncolourpicker-api.jotun.com/v1/colours`
- Backend: Bluestone PIM
- Identifikator: `colourCode` (Standardnummer)
- Data: hexCode, matchingColours, produktfamilje-kompatibilitet
- Whitelisting kreves for produksjon

**Jernia (historisk referanse):**
- Hybris Farge-API: `/paint/colors`, `/paint/colors/<code>`
- Algolia: `prod_jernia_paint_color_index`
- Kulørdata: delvis Sanity, delvis SAP

**Implikasjon:** mg-color kan bygges med Sanity som kulør-CMS (allerede i bruk), Algolia for søk (allerede i bruk), og Next.js for frontend (allerede i bruk). Den manglende brikken er selve orkestrerings-API-et som normaliserer data fra Jotun + andre leverandører.

---

## 7. Datamodell (konseptuell)

### Kulør (Color)
- `id` – Unik identifikator i mg-color
- `name` – Visningsnavn (f.eks. "Coffee")
- `ncs` – NCS-kode (f.eks. "2314-Y58R")
- `hex` – Hex-kode for digital visning
- `rgb` – RGB-verdier
- `description` – Beskrivende tekst
- `brand` – Leverandør (Jotun, Caparol, Beckers...)
- `brandColorId` – Leverandørens egen ID (f.eks. "JOTUN 2149")
- `images` – Fargeprøve, miljøbilder, moodboards
- `tags` – Kategorier (varm, kald, nordisk, moderne...)
- `interior` / `exterior` – Bruksområde
- `url` – Kanonisk kulør-URL for deep linking og annonsering

### Fargekart (Collection)
- `id` – Unik identifikator
- `name` – Navn (f.eks. "Lady Soulful Spaces 2026")
- `brand` – Leverandør
- `year` – Lanseringsår
- `themes` – Undertemaer (f.eks. "Passage of Time", "Joyful Living")
- `colors` – Referanser til kulører
- `active` – Om fargekartet er gjeldende (lanseringer erstatter hverandre)

### Produkt (Product Family)
- `id` – Unik i mg-color
- `mgitemId` – Mapping til MGITEM
- `productFamilyId` – Jotuns Product Family ID (nøkkel for API-kobling)
- `name` – Produktnavn (f.eks. "Lady Supreme Finish")
- `brand` – Leverandør
- `type` – Veggmaling, takmaling, trevirke, etc.
- `category` – Produktkategorihierarki (f.eks. "Maling > Innendørs > Veggmaling")
- `application` – Interior / exterior / begge
- `compatibleColors` – Hvilke kulører kan brytes i dette produktet
- `variants` – SKU-er (se Variant)

### Variant (SKU)
- `id` – Unik i mg-color
- `ean` – EAN/GTIN-kode (for POS, checkout og feed-integrasjon)
- `mpn` – Manufacturer Part Number
- `volume` – Volum (f.eks. 0.68L, 2.7L, 9L)
- `base` – Bas for bryting (A, B, C, etc.)
- `unitPrice` – Pris per enhet (f.eks. kr/liter) – for jämförpriser
- `price` – Ordinarie pris
- `salePrice` – Eventuelt kampanjpris
- `availability` – Lagerstatus (in_stock, out_of_stock, preorder)
- `url` – Produktside-URL for denne varianten

### Oppløsning (Resolution)
- Input: kulør + produktfamilie
- Output: riktig bas, tilgjengelige volumer, varianter (med EAN, pris, lagerstatus)

### Feed-integrasjon

mg-color må kunne berike kjedenes produktfeeder (Google Shopping, Meta) med kulørdata. Mapping mot standard feed-attributter:

| mg-color | Feed-attributt | Merknad |
|----------|---------------|---------|
| Color.name | `color` | Fritekstnavn på kulør |
| Color.hex | (custom) | Brukes i visuell annonsering |
| Variant.ean | `gtin` | Obligatorisk i feed |
| Variant.price | `price` | Fra MGITEM |
| Variant.salePrice | `sale_price` | Kampanjperioder |
| Variant.unitPrice | `unit_pricing_measure` | Påkrevd for maling (kr/L) |
| ProductFamily.id | `item_group_id` | Grupperer varianter |
| Color.url | `ads_redirect` | Deep link til kulørside |
| ProductFamily.category | `product_type` | Egen kategorisering |

---

## 8. Krav

### Must-have (MVP)

| # | Krav | Begrunnelse |
|---|------|-------------|
| M1 | Sentralt API som eksponerer kulører fra Jotun | Erstatning for manuell Excel-import |
| M2 | Støtte for fargekart/collections med temaer | Reflekterer hvordan leverandører organiserer kulører |
| M3 | Kompatibilitetsoppslag: kulør → produkter, produkt → kulører | Kjernelogikk for både PDP og reverse journey |
| M4 | SKU-/bas-oppløsning | Riktig variant i handlekurv |
| M5 | NCS-oppslag (kode → kulør → produkter) | Mest etterspurte funksjon fra kjeder |
| M6 | Filtrering på nyanse, rom, stemning | Grunnleggende navigering |
| M7 | Kulør-URL med deep linking | Muliggjør annonsering og deling |
| M8 | Frontend-agnostisk API (JSON, REST) | Hver kjede bygger sin egen UX |
| M9 | Product Family ID-mapping mot MGITEM | Uten dette fungerer ingenting |
| M10 | Jotun iFrame på PDP som fallback | Oppfyller avtalekravet – men som supplement, ikke primær |

### Should-have (v1.1)

| # | Krav | Begrunnelse |
|---|------|-------------|
| S1 | Støtte for flere leverandører (Caparol, Beckers) | Multi-brand er hele poenget |
| S2 | Miljøbilder og inspirasjonsfoto per kulør | Kritisk for journey C |
| S3 | Kulør-relasjoner (komplementære, analoge) | Hjelper kunden velge paletter |
| S4 | Malekalkulator (areal → mengde) | Allerede nevnt av Magnus Sjögren som kommende |
| S5 | Exterior-kulører i full bredde | Jotun har begynt med interiør |
| S6 | Referansekomponent (React) for PDP picker | Akselerator for kjedene, ikke obligatorisk |

### Nice-to-have (fremtidig)

| # | Krav | Begrunnelse |
|---|------|-------------|
| N1 | AI-fargerådgivning | Visjon fra Magnus Bergman |
| N2 | Kulørvisualisering på egne rombilder | Emerging tech, men nær |
| N3 | Moodboard-generator | AI-drevet |
| N4 | Integrasjon mot butikkens blandemaskin | "Cloud blandemaskin" |

---

## 9. Suksesskriterier

**Adopsjon:** Minst 2 kjeder bruker mg-color API i produksjon innen 6 mnd etter lansering.

**Datakvalitet:** 100% av Jotun-kulører med korrekt kompabilitet og bas-mapping fra dag 1.

**Konvertering:** Høyere andel kunder fullfører kulørvalg → handlekurv sammenlignet med manuell/nåværende løsning.

**Effektivitet:** Ny fargekartlansering krever null manuell jobb hos kjedene (automatisk oppdatering via API).

**Merkevare:** Hver kjede kan implementere kulørvalg i egen visuell profil uten å vise leverandørens branding i kjøpsreisen.

---

## 10. Avhengigheter og risikoer

| Risiko | Sannsynlighet | Konsekvens | Mitigering |
|--------|--------------|------------|------------|
| Jotun krever iFrame for API-tilgang | Høy | Begrenser UX på PDP | Implementer iFrame som "minimum compliance" på PDP + bygg egne opplevelser med API utenom PDP |
| Product Family ID mangler i MGITEM/Finfo | Medium | Blokker for hele løsningen | Sandra sjekker. Kan mappes manuelt som fallback |
| Andre leverandører har ikke API | Høy | Kun Jotun i MVP | Bygg importverktøy for CSV/XML. Kontakt Caparol/Beckers |
| mg-color-prosjektet mangler dedikert team | Medium | Forsinkes eller dør | Sikre at Petter får ressurser, TRY kan bistå |
| Avtalen tolkes strengere enn teksten | Lav | Jotun kan stenge API-tilgang | Avklare skriftlig med Jotun hva som er «bruken av programvaran» |

---

## 11. Konkurranseanalyse

| Løsning | Styrke | Svakhet |
|---------|--------|---------|
| **Jotun Color Picker (iFrame)** | Enkel implementering, sikrer riktig data | Kun Jotun, ikke tilpassbar, lineær journey |
| **instore.jotun.com** | God UX, kulør-først-tilnærming | Kun Jotun, ikke integrerbar i tredjeparts e-handel |
| **Fargerike/inRiver** | Eksisterende system | Utdatert, skal erstattes |
| **Egenutviklet (Happy Homes i dag)** | Tilpasset, JSON-basert | Manuelt vedlikehold, ikke skalerbar |
| **mg-color (denne PRD-en)** | Multi-brand, API-first, kjedetilpasset | Må bygges, krever investering |

---

## 12. Åpne spørsmål

1. **Hvem eier mg-color-prosjektet operativt?** Mikael Österlund er PO, Petter Sandholt er nevnt. Stine Stenhaug driver det fra TRY-siden. Kristian er nylig involvert. Teamsammensetning er uklar.
2. **Er dette i scope for Colorama fase 2?** Stine mener det bør være det. Trenger formell beslutning.
3. **Skal mg-color-API-et hostes av Mestergruppen eller TRY?** Drift, SLA, kostnadsmodell.
4. **Hva er Caparols og Beckers' digitale modenhet?** Har de API-er, eller kun Excel/PDF?
5. **Hvordan håndteres det at Jotun kan endre API uten varsel (5.7)?** Versjonering, caching, fallback.
6. **Er 1 500 SEK/mnd per kjede eller per API-nøkkel?** Avtalen sier "per API-lösning" – uklart for multi-site.
7. **Skal mg-color også dekke proff-segmentet?** Malere har andre behov enn forbrukere.
8. **Kan instore.jotun.com-arkitekturen gjenbrukes?** Sanity-modellen for fargekolleksjoner, matching, og favoritter er direkte relevant. Kan vi utvide den til multi-brand?
9. **Skal Jotun-konto (collections/favoritter) integreres?** John antar at Jotun ønsker dobbel-innlogging for at brukerne skal få tilgang til sine Jotun-collections. Alternativet er en MG-konto som aggregerer på tvers.
10. **Hva skjer med Fargerikes inRiver-data?** De er identifisert som største konsument av Farge-PIM. Eline Fjeld bør involveres tidlig.

---

## Appendiks

### A. Kildereferanser
- [Møtereferat 10. mars 2026](./referat-2026-03-10-jotun-color-picker-intro.md) – Intro-møte med Jotun
- [Møtereferat 23. mars 2026](./referat-2026-03-23-jotun-color-picker-teknisk.md) – Teknisk gjennomgang med Magnus Sjögren
- [Slack-kontekst](./slack-kontekst-fargeblander.md) – DM John Kolvik / Magnus Bergman
- Tilläggsavtal E-handel Jotun Sverige AB (desember 2025) – PDF i Kilder/
- Screenshots fra xl-byg.dk – Jotun Color Picker i produksjon
- Slack `#mg-färgfackhandel-external` – Tråd fra 26. feb 2026 om D-Congress / Jotun Color Picker / Farge-PIM
- Slack `#jotun-dig-internal` – Henrik Sørhaug, API-dokumentasjon Bluestone PIM (mai 2024)
- DM John Kolvik / Stine Stenhaug – Historikk JCCI/JCCE, Fargerike-kontekst
- DM John Kolvik / Mathias Novas – Hybris Farge-API for Jernia
- [instore.jotun.com/no/](https://instore.jotun.com/no/) – TRY-bygget fargeopplevelse for Jotun
- Jotun product feed attributes (Kilder/product_feed_attributes_with_description.xlsx) – Google Shopping feed-spesifikasjon, brukt for feed-integrasjon i datamodellen

### B. Deltakere og roller
| Person | Organisasjon | Rolle i kontekst |
|--------|-------------|------------------|
| Mikael Österlund | Mestergruppen | Product Owner, digitale kanaler |
| Sandra Wigfors | Mestergruppen SE | E-Commerce Manager, HP/Colorama |
| Ylva Widegren | Mestergruppen SE | Marknadschef, HP/Colorama |
| Petter Sandholt | Mestergruppen NO | Nevnt som prosjektansvarlig / kontaktpunkt Fargerike |
| Kristian (etternavn ukjent) | Mestergruppen | Nylig involvert i Farge-PIM |
| Eline Fjeld | Fargerike | Viktig stakeholder (største konsument av Farge-PIM) |
| Stine Stenhaug | TRY | Prosjektleder MG / driver Farge-PIM fra TRY-siden |
| Magnus Bergman | TRY Göteborg | Tech Lead, Colorama |
| John Kolvik | TRY Oslo | CXO, historikk med Jotun/Jernia farge-API |
| Henrik Sørhaug | TRY | Dokumentert Jotun Colour Picker API (Bluestone PIM) |
| Thea Bakken Vallgren | TRY | Prosjektleder Colorama/Bolist |
| Magnus Sjögren | Jotun | Regional Digital Experience, ECA |
| Olivia Larsson | Jotun Sverige | Marknadschef |
| Henric Larsson | Jotun Sverige | Säljchef Retail |
| Per Sandström | Jotun Sverige | CAM / Key Account |
| Julia Karlsson Buchel | Jotun Sverige | Digital Content Manager |

### C. Slack-kanaler
| Kanal | Formål |
|-------|--------|
| `#mg-färgfackhandel-external` | Hovedkanal for Colorama/HP/Fargerike – Farge-PIM og Jotun-diskusjoner |
| `#mg_sverige_intern` | TRY internkanal for MG Sverige-prosjekter |
| `#jotun-dig-internal` | TRY internkanal for Jotun-prosjekter (API-dokumentasjon) |
| `#mg_overflate` | Overflate/maling-relatert for MG |

### D. Kjente API-endepunkter
| System | Endepunkt | Status |
|--------|-----------|--------|
| Jotun Colour Picker API | `https://jotuncolourpicker-api.jotun.com/v1/colours` | Kjent, nøkler kan fås fra Magnus Sjögren |
| Colorama Algolia | `6CR8FG3D99` (app-ID) / `prod_products` | I produksjon |
| Colorama Sanity | Prosjekt `vqwfk8xt` | I produksjon |
| Jernia Farge-API (historisk) | Hybris `/paint/colors` | Usikker status etter Jernia-prosjektet |
| Jernia Algolia (historisk) | `1482JF2WTF` / `prod_jernia_paint_color_index` | Referanse |
