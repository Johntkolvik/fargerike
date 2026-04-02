# Fargerike – Kjerneflyter PDP

> End-to-end flytspesifikasjon for PDP-familien.
> Definerer hva som skjer i hvert steg, hvordan flatene henger sammen, og hvilke krav som aktiveres.
> Bygger på: `pdp-farge.md` | `pdp-produkt.md` | `pdp-tjeneste.md` | `fargevelger.md`
> Se også: `innhold-og-inspirasjon.md` | `store-locator.md` | `sok-autocomplete-serp.md`

**Sist oppdatert:** 2026-03-25
**Status:** Første utkast
**Formål:** Gå fra «hva trenger vi» (FRS) til «hvordan fungerer det» (flyt) – slik at designer kan lage wireframes og utvikler kan bygge.

---

## Tre bruksmønster, tre flyter

Basert på GAP-analyse (Klint vs. Fargerike) og kundescenarioet «male barnerom og vaskerom» identifiserer vi tre distinkte flyter som dekker de viktigste kundeinngangene. De deler komponenter, men har ulik rekkefølge og ulike kritiske øyeblikk.

| Flyt | Inngang | Primær persona | Konverteringsmål |
|---|---|---|---|
| **A – Farge først** | Inspirasjon, søk på fargenavn, kampanje | Lydhør Amatør (usikker, drømmer først) | Farge → riktige produkter → kurv |
| **B – Produkt først** | Google-søk på produktnavn, PLP-klikk, fagperson | Diskuterende Dyktig (vet mer, handler målrettet) | Produkt → farge → kurv |
| **C – Prosjekt** | «Jeg skal male et rom» – entry via guide/artikkel | Lydhør Amatør / Trendy Spendy | Prosjektpakke (farge + produkter + utstyr) → kurv |

---

## Flyt A: Farge først

**Typisk scenario:** Kunden googler «varm grå maling stue», ser en inspirasjonssak, klikker på en farge, og vil ende opp med riktige produkter i handlekurven.

### Entry points

| Kilde | Lander på | Forutsetning |
|---|---|---|
| Google / organisk søk | Farge-PDP | Indekserbar kulørside med SEO (AEO) |
| Inspirasjonssak | Farge-PDP | Kulør-lenker i artikkelinnhold |
| Fargekampanje (SoMe, nyhetsbrev) | Farge-PDP | Deep link til kulør-URL |
| NCS-kode-søk | Farge-PDP | NCS-oppslag via mg-color → Algolia |
| Fargekart-browsing | Farge-PDP | Navigasjon i fargekart (PLP-lignende) |

### Steg-for-steg

```
STEG 1 → KULØRSIDE (Farge-PDP)
─────────────────────────────────
Kunden ser:
  • Fargeprøve (hex/swatch) + kulørnavn + kode
  • Stemningsbeskrivelse («En varm, dyp tone som gir rommet ro»)
  • Miljøbilder (mål: 3+ per kulør)
  • Relaterte kulører (NCS-naboer, komplementære)
  • «Bestill fargeprøve» (lav terskel, 39-49 kr)

Kunden gjør:
  → Scroller ned til «Kompatible produkter»
  → ELLER klikker «Bestill fargeprøve» (mikro-konvertering)
  → ELLER navigerer til relatert kulør (forblir i Flyt A)

Krav aktivert: US-F01, US-F02, US-F03, US-F04, US-F05
FRS-ref: pdp-farge.md → Kulørinformasjon, Inspirasjon, Navigasjon

         │
         ▼

STEG 2 → PRODUKTVALG (på Farge-PDP)
─────────────────────────────────────
Kunden ser:
  • Kompatible produkter gruppert per overflate:
    «Veggmaling» → Lady Supreme Finish, Lady Wonderwall
    «Takmaling» → Lady Tak
    «Tre og panel» → Lady Supreme Finish
  • Per produkt: kort beskrivelse, pris, tilgjengelige volumer
  • Forklaring av forskjellene («Supreme Finish: matt, slitesterk.
    Wonderwall: superenkel å påføre.»)
  • «Hva trenger jeg?» – kontekstuell hjelp-lenke

Kunden gjør:
  → Velger produkt (f.eks. Lady Supreme Finish for vegg)
  → Velger volum (2.7L / 9L)
  → ELLER klikker produktnavn for full Produkt-PDP (Flyt A→B overgang)

!! KRITISK DESIGNVALG: Skjer dette på Farge-PDP (inline) eller
   navigerer kunden til Produkt-PDP?

   ANBEFALING: Inline på Farge-PDP for Fase 2+ (handlekurv).
   I Fase 1 (uten commerce): lenke til Produkt-PDP.

Krav aktivert: US-P01, US-P02, US-K01
FRS-ref: pdp-farge.md → Kompatible produkter, pdp-produkt.md → Kjøpsflyt

         │
         ▼

STEG 3 → MENGDE OG UTSTYR
───────────────────────────
Kunden ser:
  • Mengdekalkulator: «Hvor stort er rommet?» → m² → anbefalte liter
  • Anbefalt utstyr: rull, pensel, malertape, dekkplast
  • «Legg til utstyrspakke» (krysskjøp)
  • Lagerstatus i valgt butikk

Kunden gjør:
  → Legger inn m² eller velger romstørrelse (S/M/L)
  → Får anbefalt mengde
  → Legger til utstyr (valgfritt)

Krav aktivert: US-P03, US-P04, US-K02
FRS-ref: pdp-produkt.md → Kalkulator, Innhold og kryssalg

         │
         ▼

STEG 4 → TRYGGHET OG BESLUTNING
─────────────────────────────────
Kunden ser:
  • FAQ-blokk tilpasset kategori (barnerom? grunning? tørketid?)
  • Brukeranmeldelser med bilder
  • «Usikker? Snakk med oss» → chat / telefon / book konsulent
  • Fremgangsmåte-snarvei → lenke til guide

Kunden gjør:
  → Leser FAQ / brukeranmeldelser
  → ELLER booker konsulent (→ Tjeneste-PDP / Flyt A→Service)
  → ELLER føler seg trygg og går til handlekurv

Krav aktivert: US-T01, US-T02, US-T03, US-T04, US-P05, US-P06
FRS-ref: pdp-produkt.md → Innhold og kryssalg, pdp-tjeneste.md

         │
         ▼

STEG 5 → HANDLEKURV
─────────────────────
Kunden har:
  • Farge: JOTUN 2149 Coffee
  • Produkt: Lady Supreme Finish 2.7L (riktig bas automatisk valgt)
  • Mengde: 2 × 2.7L (basert på kalkulator)
  • Utstyr: Malerulle 25cm, pensel 50mm, malertape (valgfritt)

Kunden velger:
  → Hent i butikk (viser nærmeste med alt på lager)
  → ELLER hjemlevering

Krav aktivert: US-K01, US-K02, US-K03
FRS-ref: pdp-produkt.md → Kjøpsflyt, store-locator.md
```

### Mulige avbrudd og recovery

| Avbrudd | Recovery |
|---|---|
| Kunden er usikker på fargen | → «Bestill fargeprøve» (steg 1) |
| Kunden forstår ikke produktforskjellene | → Kontekstuell forklaring (steg 2) + link til guide |
| Kunden vet ikke mengde | → Kalkulator (steg 3) |
| Kunden er nervøs for å gjøre feil | → FAQ + «snakk med oss» (steg 4) |
| Produktet ikke på lager lokalt | → Vis alternativ butikk eller hjemlevering (steg 5) |
| Kunden vil tenke seg om | → «Lagre prosjekt» / ønskeliste (fremtidig) |

---

## Flyt B: Produkt først

**Typisk scenario:** Kunden googler «Lady Supreme Finish», vet omtrent hva de trenger, men trenger å velge farge og mengde.

### Entry points

| Kilde | Lander på | Forutsetning |
|---|---|---|
| Google / produktnavn-søk | Produkt-PDP | God SEO på produktnavn |
| PLP-kategori (veggmaling) | Produkt-PDP | PLP med filtrering |
| Produktanbefaling fra artikkel | Produkt-PDP | Toveis innholdskobling |
| Butikkansatt-anbefaling (QR/link) | Produkt-PDP | Butikk-til-digital bridge |

### Steg-for-steg

```
STEG 1 → PRODUKTSIDE (Produkt-PDP)
────────────────────────────────────
Kunden ser:
  • Produktbilde(r) – produkt, miljø, detalj
  • Kundevennlig produktnavn + kort beskrivelse
  • Bruksområde-chips: «Vegg» «Tak» «Tre & panel»
  • Pris (fra) + volumvalg
  • Lagerstatus i valgt butikk
  • Produktanmeldelser (score + antall)

Kunden gjør:
  → Åpner fargevelger (→ steg 2)
  → ELLER scroller til spesifikasjoner og FAQ

Krav aktivert: US-P02
FRS-ref: pdp-produkt.md → Informasjonsarkitektur, Bilder

         │
         ▼

STEG 2 → FARGEVELGER (på Produkt-PDP)
───────────────────────────────────────
Kunden ser:
  • Color picker i Fargerikes profil (ikke Jotun iFrame)
  • Fargekart-filter (f.eks. «Lady Soulful Spaces 2026»)
  • Søk på fargenavn eller NCS-kode
  • Populære farger for dette produktet
  • Forhåndsvisning av valgt farge (swatch)

Kunden gjør:
  → Velger en farge
  → Bas og SKU oppdateres automatisk i bakgrunnen
  → ELLER klikker «Se mer om denne fargen» → Farge-PDP (Flyt B→A overgang)

!! OVERGANG: Kunden kan hoppe til Farge-PDP for å se miljøbilder,
   inspirasjon og relaterte farger. Tilbake-knapp / breadcrumb må
   bevare konteksten (produkt + valgt farge).

Krav aktivert: US-F01, US-F02, US-F03
FRS-ref: fargevelger.md → Journey A, pdp-produkt.md → Farge-spesifikt

         │
         ▼

STEG 3 → MENGDE OG UTSTYR (samme som Flyt A, steg 3)
──────────────────────────────────────────────────────
[identisk med Flyt A steg 3]

         │
         ▼

STEG 4 → TRYGGHET OG BESLUTNING (samme som Flyt A, steg 4)
────────────────────────────────────────────────────────────
[identisk med Flyt A steg 4]

         │
         ▼

STEG 5 → HANDLEKURV (samme som Flyt A, steg 5)
────────────────────────────────────────────────
[identisk med Flyt A steg 5]
```

### Nøkkelforskjell fra Flyt A

Steg 1 og 2 er byttet om. Kunden starter med produktet, legger til farge. Den kritiske overgangen er **fargevelger → farge-PDP** og tilbake igjen uten å miste kontekst. Dette krever:

- State management: valgt produkt og farge må holdes på tvers av sidevisninger
- URL-strategi: `?produkt=lady-supreme-finish&farge=jotun-2149` eller session/cookie
- Tilbake-navigasjon: «Tilbake til Lady Supreme Finish med Coffee valgt»

---

## Flyt C: Prosjekt

**Typisk scenario:** Kunden tenker «jeg skal male barnerommet» – ikke «jeg trenger Lady Supreme Finish» eller «jeg vil ha Coffee». De trenger hjelp med hele prosjektet.

### Entry points

| Kilde | Lander på | Forutsetning |
|---|---|---|
| Google: «male barnerom tips» | Guide/artikkel | SEO-optimalisert innholdsside |
| Fargerike.no: «Prosjekter» | Prosjektoversikt (ny flate) | Ny seksjon i IA |
| SoMe-kampanje: «Mal som en proff» | Prosjektguide | Landingsside |
| Butikk-QR: «Skann for maletips» | Prosjektguide | Bridge fysisk→digital |

### Steg-for-steg

```
STEG 1 → PROSJEKTINNGANG (livesøk, ikke wizard)
──────────────────────────────────────────────────
Kunden ser:
  • Søkefelt med prompt: «Hva skal du gjøre?»
  • Autocomplete med kontekstualiserte forslag:
    → «Male barnerom» / «Male stue» / «Male utendørs»
    → «Legge tapet» / «Bytte gulv» / «Male møbler»
  • Eventuelt faste eller generative oppfølgingsspørsmål
    basert på valg (rom-størrelse, overflater, erfaring)
  • Konteksttilpasset info:
    Barnerom → «Tips: Bruk Svanemerket maling med lavt VOC-nivå»

NB: Ikke en lineær wizard. Fargerike har forsøkt dette – dårlig
opplevelse. Livesøk med smarte forslag er mer naturlig.

Kunden gjør:
  → Skriver «male barnerom» eller velger fra forslag
  → Får kontekstualisert flyt videre

Entry: Både toppmeny OG CTA/lenker i artikler og kampanjer.

FRS-ref: NY KOMPONENT – ikke dekket i eksisterende FRS

         │
         ▼

STEG 2 → FARGEINSPRIASJON (tilpasset prosjekt)
────────────────────────────────────────────────
Kunden ser:
  • Kuraterte fargepaletter for barnerom
  • «Mest populære farger til barnerom»
  • Inspirasjon: bilder fra ekte barnerom
  • «Usikker? Book en gratis fargekonsultasjon»

Kunden gjør:
  → Velger en primærfarge for vegger
  → Får foreslått komplementær for tak og listverk
  → ELLER booker konsultasjon (→ Tjeneste-PDP)

Krav aktivert: US-F01, US-F02, US-F04
FRS-ref: pdp-farge.md → Inspirasjon, innhold-og-inspirasjon.md

         │
         ▼

STEG 3 → PRODUKTSAMMENSETNING (automatisk)
────────────────────────────────────────────
Systemet beregner:
  • Vegg: Lady Wonderwall, Coffee, 2 × 2.7L (basert på 12 m²)
  • Tak: Lady Tak, Hvit, 1 × 2.7L
  • Listverk: Lady Supreme Finish, Hvit, 1 × 0.68L

Kunden ser:
  • Komplett prosjektoppsummering med totalsum
  • «Endre farge» / «Endre mengde» per linje
  • Anbefalt utstyr: malerulle, pensel, tape, dekkplast
  • «Legg til utstyrspakke» (+399 kr)
  • Totalbeløp inkl. alt

Kunden gjør:
  → Justerer mengde om nødvendig
  → Legger til/fjerner utstyr
  → Klikker «Legg alt i handlekurv»

Krav aktivert: US-P01, US-P03, US-P04, US-K01
FRS-ref: pdp-produkt.md → Kalkulator, Kjøpsflyt

         │
         ▼

STEG 4 → FREMGANGSMÅTE OG TRYGGHET
─────────────────────────────────────
Kunden ser:
  • Steg-for-steg-guide tilpasset prosjektet:
    1. Forberedelser (masker, tape, vask vegg)
    2. Grunn (trengs det? automatisk vurdert)
    3. Mal tak først
    4. Mal vegg (2 strøk, tørketid mellom)
    5. Mal listverk sist
  • FAQ: «Kan jeg male mens barnet sover?», «Hvor lang tørketid?»
  • Video: «Slik maler du et rom på 4 timer»

Kunden gjør:
  → Leser/skimmer → føler seg trygg
  → «Last ned sjekkliste» (PDF) – ta med i butikk

Krav aktivert: US-P05, US-P06, US-T01, US-T02
FRS-ref: innhold-og-inspirasjon.md, pdp-produkt.md

         │
         ▼

STEG 5 → HANDLEKURV (prosjektpakke)
──────────────────────────────────────
Handlekurven inneholder hele prosjektet som én logisk enhet:
  • «Barnerom-prosjekt» (kan folde ut til enkeltprodukter)
  • Totalsum: X kr
  • Lagerstatus: «Alt på lager i Fargerike Skøyen»
  • Hent i butikk / hjemlevering

Krav aktivert: US-K01, US-K02, US-K03
FRS-ref: store-locator.md → Click & Collect
```

### Hva er nytt i Flyt C

Flyt C introduserer komponenter som ikke finnes i dagens FRS:

| Komponent | Beskrivelse | Fase |
|---|---|---|
| **Prosjektinngang** | Livesøk med autocomplete og kontekstualiserte forslag (ikke wizard) | Fase 2 |
| **Prosjektkalkulator** | Multi-produkt mengdeberegning basert på prosjekttype og romstørrelse | Fase 2 |
| **Prosjektpakke i kurv** | Handlekurv som grupperer produkter per prosjekt | Fase 2–3 |
| **Fremgangsmåtemodul** | Dynamisk steg-for-steg basert på valgte produkter og rom | Fase 1 (som innhold) → Fase 2 (integrert) |

---

## Overganger mellom flyter

En kunde starter i én flyt, men kan når som helst hoppe til en annen. Disse overgangene er kritiske å designe.

```
              ┌──────────────┐
              │   Farge-PDP  │
              │   (Flyt A)   │
              └──────┬───────┘
                     │
          «Se produkt»  «Se mer om fargen»
                     │         ▲
                     ▼         │
              ┌──────────────┐
              │ Produkt-PDP  │
              │   (Flyt B)   │
              └──────┬───────┘
                     │
          «Book konsulent»
                     │
                     ▼
              ┌──────────────┐
              │ Tjeneste-PDP │
              │  (booking)   │
              └──────────────┘

              ┌──────────────┐
              │  Prosjekt    │──→ bruker Farge-PDP + Produkt-PDP
              │  (Flyt C)    │    som underliggende komponenter
              └──────────────┘
```

### Krav til overganger

| Overgang | Fra → Til | Kontekst som må bevares | Teknisk krav |
|---|---|---|---|
| Farge → Produkt | Farge-PDP → Produkt-PDP | Valgt kulør, eventuelt mengdeestimat | URL-param eller session state |
| Produkt → Farge | Produkt-PDP → Farge-PDP | Valgt produkt, volum | URL-param eller session state |
| Farge → Tilbake til produkt | Farge-PDP → Produkt-PDP | Kulør + produkt + volum | Breadcrumb med state |
| PDP → Tjeneste | Begge → Tjeneste-PDP | Kontekst (rom, farge, produkt) | Query params for pre-fill |
| Artikkel → PDP | Guide → Farge eller Produkt | Prosjektkontekst fra artikkelen | Deep link med kontekst |

### State management

**Anbefaling:** Bruk en lett «prosjekt»-state i klienten (React context / cookie) som holder:

```
{
  project: {
    room: "barnerom",           // fra prosjektvelger eller artikkel
    surfaces: ["vegg", "tak"]   // valgte overflater
  },
  selections: [
    {
      surface: "vegg",
      color: { id: "jotun-2149", name: "Coffee", ncs: "2314-Y58R" },
      product: { sku: "lady-supreme-finish-2.7l", name: "Lady Supreme Finish" },
      quantity: 2,
      equipment: ["rull-25cm", "pensel-50mm"]
    }
  ],
  store: { id: "skoyen", name: "Fargerike Skøyen" }
}
```

Dette gir:
- Kontekstbevaring ved navigasjon mellom flater
- Pre-fill av kalkulator og produktvalg
- Grunnlag for «Mitt prosjekt» (Fase 3)
- Handlekurv med prosjektgruppering

---

## Mobilhensyn

Med estimert 60%+ mobiltrafikk (basert på 69% organisk) må flytene fungere mobil-først.

### Konsekvenser per steg

| Steg | Desktop | Mobil | Implikasjon |
|---|---|---|---|
| Farge-PDP kulørinformasjon | Full bredde med sidebar | Stacked, swipeable bilder | Bildegalleriet trenger touch-optimalisering |
| Kompatible produkter | Tabeller med pris/volum | Collapsible produktkort | Ikke tabell – bruk kort med expand |
| Fargevelger | Grid med mange swatches | Fullskjerm-modal med zoomed swatches | Fargevelger må være egen mobil-opplevelse |
| Mengdekalkulator | Inline | Bottom sheet / modal | Ikke dyttet ned under folden |
| FAQ | Accordion | Accordion (fungerer) | OK som er |
| Handlekurv-oppsummering | Sidebar sticky | Bottom bar med «Se handlekurv» | Persistent mini-kurv på mobil |

### Tommelfingerregel

Hver flyt skal fullføres med maks **3 tap-to-scroll-steg** på mobil. Hvis kunden må scrolle mer enn 3 ganger for å gå fra entry til handlekurv, er informasjonsarkitekturen for dyp.

---

## Faseinndeling

Ikke alt kan bygges samtidig. Her er hva som er minimum per fase:

### Fase 1 – Redaksjonell (Q3-Q4 2026)

**Flyt A (begrenset):** Farge-PDP med kulørinformasjon, miljøbilder, og lenker til Produkt-PDP (uten inline handlekurv). Kompatible produkter vises som lenkeliste.

**Flyt B (begrenset):** Produkt-PDP med Jotun iFrame som fargevelger-fallback. Lenke til Farge-PDP for «se mer om fargen».

**Flyt C:** Ikke tilgjengelig. Dekkes delvis av redaksjonelle guider med produktlenker.

**Overganger:** Kun via lenker med URL-parametre. Ingen persistent state.

### Fase 2 – Commerce (Q1-Q2 2027)

**Flyt A (fullverdig):** Inline produktvalg, mengdekalkulator, utstyr, og handlekurv direkte fra Farge-PDP.

**Flyt B (fullverdig):** Egen fargevelger (mg-color API), bas/SKU-oppløsning, handlekurv.

**Flyt C (MVP):** Prosjektvelger → fargeinsprasjon → produktsammensetning → kurv. Uten dynamisk fremgangsmåte.

**Overganger:** State management via React context. Kontekstbevaring ved navigasjon.

### Fase 3 – Differensiering (Q3 2027+)

**Flyt C (fullverdig):** Prosjektpakke i kurv, dynamisk fremgangsmåte, «Mitt prosjekt» (lagre og dele).

**Alle flyter:** AI-assistert fargeanbefaling, romvisualisering, personaliserte FAQ.

---

## Hvilke user stories dekker hver flyt?

| User story | Flyt A | Flyt B | Flyt C | Steg |
|---|---|---|---|---|
| US-F01 Se fargen i rom | ✅ | via overgang | ✅ | A1, C2 |
| US-F02 Stemningsbeskrivelse | ✅ | via overgang | ✅ | A1, C2 |
| US-F03 Lignende farger | ✅ | via overgang | – | A1 |
| US-F04 Bilder fra ekte hjem | ✅ | via overgang | ✅ | A1, C2 |
| US-F05 Fargeprøve | ✅ | ✅ | ✅ | A1, B2 |
| US-P01 Kompatible produkter per farge | ✅ | ✅ | ✅ | A2, B2, C3 |
| US-P02 Forstå produktforskjeller | ✅ | ✅ | ✅ | A2, B1 |
| US-P03 Mengdeberegning | ✅ | ✅ | ✅ | A3, B3, C3 |
| US-P04 Anbefalt utstyr | ✅ | ✅ | ✅ | A3, B3, C3 |
| US-P05 Fremgangsmåte | ✅ | ✅ | ✅ | A4, B4, C4 |
| US-P06 Tørketider, grunning | ✅ | ✅ | ✅ | A4, B4, C4 |
| US-T01 Trygt for barnerom | ✅ | ✅ | ✅ | A4, B4, C4 |
| US-T02 Søl og rengjøring | ✅ | ✅ | ✅ | A4, B4, C4 |
| US-T03 Spørre ekspert | ✅ | ✅ | ✅ | A4, B4, C2 |
| US-T04 Anmeldelser med bilder | ✅ | ✅ | – | A4, B4 |
| US-K01 Alt i kurv i én flyt | ✅ | ✅ | ✅✅ | A5, B5, C5 |
| US-K02 Lagerstatus i min butikk | ✅ | ✅ | ✅ | A5, B5, C5 |
| US-K03 Levering hjem eller butikk | ✅ | ✅ | ✅ | A5, B5, C5 |

**Observasjon:** Flyt C dekker flest user stories i én sammenhengende opplevelse. Den er også den mest komplekse å bygge (Fase 2+).

---

## Designbeslutninger (avklart 2026-03-25)

Basert på gjennomgang av Jotun JCCI (instore.jotun.com/no), mg-color prototype (localhost:5173/picker) og Johns input.

### 1. Produktvalg på Farge-PDP: skuff med pedagogisk forklaring

**Beslutning:** Farge-PDP viser kompatible produkter med en **primær anbefaling** (f.eks. «Veggmaling: Lady Wonderwall») og en **skuff/drawer** som viser alternativer med pedagogisk forklaring av forskjellene. Ikke bare en liste – kunden skal forstå *hvorfor* de ville valgt Supreme Finish fremfor Wonderwall.

**Begrunnelse:** PLP→PDP betyr at produktvalget allerede er tatt. Men på Farge-PDP har kunden *ikke* valgt produkt ennå – de trenger hjelp. En skuff gir plass til forklaringer uten å overvelde. mg-color prototypen viser dette med produkt-tabs (Lady Wonderwall, Lady Balance, Sens osv.) der kulører filtreres per produkt. For Fargerikes Farge-PDP er logikken omvendt: kulør er valgt, produktene er alternativer.

### 2. Fargevelger: referanseimplementasjon fra mg-color prototype

**Beslutning:** Fargevelgeren på Produkt-PDP følger mg-color prototypens modell: produkt er allerede valgt (via PLP/PDP-kontekst), fargevelger viser kompatible kulører i grid, med detalj-sidebar, volum-valg og legg-i-kurv. Jotun JCCI brukes som referanse for den visuelle fargeopplevelsen (store swatches, rad-basert filtrering).

**Referanser:**
- mg-color prototype: `localhost:5173/picker` – produkt-tabs → kulør-grid → sidebar → handlekurv
- Jotun JCCI: `instore.jotun.com/no` – visuell fargepresentasjon, rad-gruppering, interiør/eksteriør-toggle

### 3. Prosjektinngang: livesøk, ikke wizard

**Beslutning:** Prosjektinngangen (Flyt C steg 1) skal **ikke** være en lineær wizard. Fargerike har forsøkt wizard-tilnærming – dårlig opplevelse. I stedet: en **livesøk-opplevelse** basert på faste eller generative spørsmål. Tenk mer som et søkefelt med konteksttilpassede forslag: «Hva skal du gjøre?» → autocomplete med «Male barnerom», «Male stue», «Male utendørs» osv.

**Entry points:** Både toppmeny *og* CTA/lenker i innhold. Ikke enten-eller.

**Oppdatering til Flyt C:** Steg 1 «Prosjektvelger» er ikke en wizard – det er en intelligent søkebasert entry med kontekstuell veiledning.

### 4. «Lagre prosjekt» = login-strategi / ønskeliste

**Beslutning:** Prosjekt-state persisteres som en **ønskeliste**. «Lagre prosjekt» trigger innlogging/kontooppretting. Dette er en bevisst login-strategi – gi kundene en grunn til å opprette konto.

**Konsekvens for state management:** Prosjekt-state lever i React context for anonyme brukere (sesjonbasert), men kopieres til brukerprofil ved innlogging. Erstatter «Mitt prosjekt» (Fase 3) med ønskeliste som MVP.

**Oppdatering til state-modellen:**
```
{
  project: { ... },
  selections: [ ... ],
  store: { ... },
  savedAsWishlist: false,      // true etter innlogging
  userId: null                  // satt etter autentisering
}
```

### 5. Produkt↔Innhold: Algolia Recommend, ikke dumme tags

**Beslutning:** Relatert innhold (artikler, guider, FAQ) på PDP styres av **Algolia Recommend** – ikke manuell tagging. Motoren skal vise innhold basert på faktisk klikk- og konverteringsdata, med intensjonsmatch (f.eks. «våtrom» for baderomsmaling).

**Konsekvens:** Krever content clusters som strategisk leveranse. Redaksjonelt innhold må struktureres i Sanity med metadata som muliggjør intelligent matching:
- Romtype (barnerom, bad, stue, utendørs)
- Intensjon (forberedelse, inspirasjon, vedlikehold, problemløsning)
- Produktkategori (maling, tapet, gulv)
- Overflate (vegg, tak, tre, metall)

**Ikke bare tags, men content clusters** som jobber med anbefalingsmotoren over tid.

### 6. Utstyranbefalinger: Algolia Recommend + avtaler/boosting, seksjonert

**Beslutning:** Utstyranbefalinger er **regelbaserte via søk/anbefalingsmotor** (Algolia Recommend), ikke manuelt kuratert. Noen produkttyper (pensel, rull, tape) skal alltid være relatert til malingstype, men *hvilke* spesifikke produkter som vises styres av anbefalingsmotor + avtaler/boosting (retail media).

**Seksjonering med forklarende titler:**
- **Påføring** – «Det du trenger for å få malingen på veggen» (rull, pensel, sprøyte)
- **Beskyttelse** – «Beskytt det du ikke skal male» (malertape, dekkplast, gulvpapp)
- **Klargjøring** – «Forbered overflaten» (sparkel, sandpapir, vaskemiddel)
- **Festemiddel** – «Sørg for at malingen fester seg» (grunning, primer)

Hver anbefaling skal ha en **«Bytt»** eller **«Se alternativer»**-knapp for å vise andre produkter i samme kategori.

**Begrunnelse:** Manuell kurasjon er operativt uholdbart med Fargerikes sortimentbredde. Algolia Recommend + content clusters + avtale-boosting gir en skalerbar modell der anbefalingene blir bedre over tid.

---

### 7. Fargevelger på mobil: grid, instant search og collections

**Beslutning:** Fargevelger (mobil og desktop) skal ha følgende oppbygning:

**Grid:** 3–4 kolonner i bredden, aldri mindre enn 3. Hver swatch viser bilde (ikke bare hex) – bildet er enklere å tolke enn en fargekode. Alle swatches har liten label med fargenavn.

**Instant search:** Søkefelt som støtter fargenavn, hex, NCS-kode, stemning og kategori. Filtrering på merkevare og collections.

**Default state:** «Populære farger» – 6 stk. som startvisning. Lav kognitiv last, kunden trenger ikke forholde seg til 2000+ kulører umiddelbart.

**Collections-innganger:** Under grid vises innganger til fargekart/collections fra forskjellige brands, f.eks. «Lady Soulful Spaces 2025» fra Jotun. Disse er kuraterte innganger med merkevare-kontekst.

**«Vis alle NCS»:** Egen inngang med NCS-koder som primærlabel i stedet for fargenavn. F.eks. «S1002-Y» i stedet for «1024 Tidløs». Viktig for fagfolk, interiørarkitekter og kunder med NCS-kode fra konsulent.

### 8. Produkt↔Innhold: lokal overstyring i tillegg til Algolia Recommend

**Beslutning:** Sanity-innhold indekseres av Algolia (som primærkilde for anbefalinger), men det må finnes en mekanisme for **lokal overstyring** per produkt. Overstyring kan skje i:
- **Algolia** (pinning/boosting av spesifikke resultater)
- **Sanity** (redaksjonelt felt: «Vis denne artikkelen på disse produktene»)
- **MG Item / PIM** (produktnivå-metadata)

Alle tre er potensielle steder. Anbefaling: start med Sanity-basert overstyring (lavest friksjon for redaktør), bruk Algolia Recommend som fallback for produkter uten manuell kobling.

### 9. Content clusters: workshop → 4–10 klustere

**Beslutning:** Krever workshop for å definere:
1. **Historieområder** Fargerike skal eie (f.eks. «Maleprosjekter», «Fargeinspriasjon», «Vedlikehold», «Bærekraft»)
2. **Omdømmevinkler** – hva Fargerike skal forbindes med
3. **Nåværende innhold og trafikk** – audit av eksisterende artikler, trafikk, konvertering
4. **4–10 tydelige klustere** som innhold skal levere på

Hvert kluster skal ha relasjon til produkter slik at Algolia Recommend kan bruke kluster-tilhørighet som signal.

**TODO:** Planlegg workshop med Eline + redaksjonelt team. Innholdsaudit (trafikk + konvertering) bør gjøres i forkant som input.

### 10. Retail media / boosting: Algolia-tilgang for teamet

**Beslutning:** De som er ansvarlige for sortiment/kampanjer hos Fargerike trenger **direkte tilgang til Algolia** for å styre boosting og synlighet. Manuell kurasjon av anbefalinger er ikke skalerbart, men strategisk boosting (kampanjeprodukter, sesong, avtaler) er nødvendig.

**Fase 1:** Gi teamet tilgang til Algolia-dashboardet for å sette opp boosting-regler.
**Fase 2+:** Vurder å bygge et enklere verktøy/grensesnitt som integrerer kampanje- og avtaleinformasjon med Algolia-boosting.

**Åpent:** Hvordan fungerer kampanjer og produktsynlighet i butikk i dag? Trenger innsikt i dette for å designe en digital modell som matcher – eller forbedrer – den fysiske prosessen. Mulig tema for neste møte med Eline/butikkansvarlig.

---

## Gjenstående åpne spørsmål

1. **Fremgangsmåte: statisk eller dynamisk?** I Fase 1 sannsynligvis Sanity-artikler koblet via Algolia Recommend. Fase 2+ potensielt dynamisk basert på prosjektkontekst. Avklares i content cluster-workshop.

2. **Kampanjeprosess i dag:** Hvordan blir en kampanje til hos Fargerike? Hva styrer synlighet til produkter i butikk? Trenger denne innsikten for å designe digital boosting/retail media-modell.

3. **Overstyring: Algolia vs. Sanity vs. PIM:** Hvor bør lokal overstyring av anbefalinger primært leve? Anbefaling er Sanity (redaktørvennlig), men avhenger av workflow og roller.

---

## Endringslogg

| Dato | Endring | Kilde |
|---|---|---|
| 2026-03-25 | Opprettet med tre kjerneflyter, overganger, mobil, faseinndeling | John |
| 2026-03-25 | 6 designbeslutninger avklart: skuff for produktvalg, livesøk (ikke wizard), ønskeliste som login-strategi, Algolia Recommend for innhold+utstyr, seksjonerte utstyranbefalinger | John |
| 2026-03-25 | 4 ytterligere beslutninger: mobil fargevelger-spec (grid/search/collections/NCS), lokal overstyring av anbefalinger, content cluster-workshop, Algolia-tilgang for boosting | John |
