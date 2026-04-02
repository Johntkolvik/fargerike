# CXO Playbook – Oppgavedrevet

> Generaliserbar prosess for digital kundeopplevelse. Bruk som sjekkliste på nye kunder.
> Utledet fra CXO-Maaldokument v2.0 + lærdommer fra REMA og Bjørklund.
> Første anvendelse: Fargerike.

---

## Slik bruker du dette dokumentet

Playbooken har 4 blokker. Hver blokk har konkrete oppgaver med definert input, output og eier. Oppgaver merket 🤖 kan automatiseres med Claude/MCP. Oppgaver merket 👥 krever mennesker i rommet.

---

## Blokk 1: Kartlegg nåsituasjonen (Fase 0)

Mål: Bygg et komplett, databasert bilde av kundens digitale tilstedeværelse – *før* du møter kunden.

### Oppgave 1.1: Sitemap-crawl og sidetype-klassifisering 🤖

**Input:** Kundens sitemap-URL (f.eks. `content.xml`)
**Verktøy:** Content audit-skill / WebFetch + manuell klassifisering
**Output:** Sidetype-register (tabell)

Crawl sitemap → grupper alle URL-er etter mønster → klassifiser hver gruppe som sidetype → tell antall sider per type.

Sidetype-registeret ser slik ut (full analyse: `04-kilder/2026-03-25_sitemap-klassifisering.md`):

| Sidetype | URL-mønster | Antall | Merknader |
|---|---|---|---|
| PLP – Tapet | `/tapet/**` | 3 431 | Individuelle produktsider |
| Farge-PDP / Fargeoversikt | `/farger/**` | 3 239 | Farge som enhet, 2 nivåer (kategori + kulør) |
| PLP – Tilbehør/verktøy | `/vaske-rengjoring/**`, `/sparkel**`, `/verktoy**` | 1 738 | Fire undergrupper |
| PLP – Gulv | `/gulv/**` | 695 | Vinyl, parkett, teppe, laminat |
| PDP – Maling | `/maling/*/*/**` | 270 | Ute/inne + underkategorier |
| Annet (standalone) | Diverse | 246 | Kampanjesider, landingssider |
| Inspirasjon (alle) | `/inspirasjon/**` | 438 | 8 undertyper: rom, farger, bolig, hjemme-hos, årets farge, fargekart, månedens stil, annet |
| Tips & råd | `/tips-rad/**` | 103 | How-to-guider |
| Butikkprofil | `/fargehandel/*` | 86 | Én per fysisk butikk |
| Tjenester | `/tjenester*/**` | 42 | Butikktjenester + overordnede |
| Magasin | `/magasin/**` | 28 | Digitale kataloger, trender |
| Kundeservice | `/kundeservice/**` | 15 | |
| PLP – Maling | `/maling/**` (hub) | 14 | Kategorisider |
| Funksjonssider | `/sok`, `/handlekurv`, etc. | 6 | |
| Diverse | Kundeklubb, kampanje, merker, etc. | ~20 | |
| **Totalt** | | **10 371** | |

### Oppgave 1.1b: As-is PRD per sidetype 🤖

**Input:** Sitemap-register (fra 1.1) + tilgang til kundens nåværende nettside
**Verktøy:** Claude in Chrome (underagenter per sidetype)
**Output:** As-is PRD per sidetype – én markdown-fil per type

Besøk 2–3 representative sider per sidetype og dokumenter:

1. **Innhold:** Hva vises? Overskrifter, brødtekst, bilder, video, produktdata, priser, CTA-er
2. **Funksjonalitet:** Hva kan bruker gjøre? Filtrering, sortering, søk, legg i kurv, booking, fargevelger, kalkulator
3. **Datakilder:** Hvor kommer dataene fra? CMS, PIM, API, statisk, tredjepartsskript
4. **Navigasjon:** Breadcrumb, relatert innhold, krysskoblinger, footer-lenker
5. **SEO:** Meta title/description, strukturerte data, canonical, hreflang
6. **Mobil:** Responsivt? Hva endres? Hva skjules?
7. **Ytelse:** Lastetid (subjektivt), tunge elementer, tredjepartsskript
8. **Mangler:** Hva burde vært der men ikke er? (basert på benchmark/best practice)

**Automatiseringsoppsett:**
- Parse sitemap-XML → grupper URL-er per sidetype
- Per sidetype: start en underagent som besøker 2-3 URL-er via Claude in Chrome
- Agenten leser sidens innhold (get_page_text + read_page), tar screenshot, og produserer en strukturert markdown-rapport
- Resultatet samles i `02-krav/as-is/` med én fil per sidetype

**For Fargerike:**
- Sitemap: `04-kilder/sitemap_fargerike.xml` (hentet fra fargerike.no/sitemaps/fargerike/no/content.xml)
- ~15 sidetyper → ~15 agenter → ~30-45 sidebesøk
- Allerede gjort for PDP (gap-analyse), men denne oppgaven dekker alle sidetyper

### Oppgave 1.2: Søkeordanalyse 🤖

**Input:** Kundens domene + bransje
**Verktøy:** Semrush MCP / Riff / manuell
**Output:** Søkeordsdataset med volum, intensjon, posisjon

For Fargerike: Eksisterende analyse på `mesh.riff.works/fargerike/` (passord: søkeordsanalyse2026).

Datasettet skal inneholde per søkeord:
- Søkeord, søkevolum, CPC, konkurranse
- Intensjon (informasjonell / kommersiell / transaksjonell / navigasjonell)
- Nåværende posisjon (hvis ranket)
- Landingsside (hvis ranket)
- SERP-features (featured snippet, PAA, local pack etc.)

### Oppgave 1.3: Trafikkanalyse 🤖

**Input:** GA4-tilgang / GSC-tilgang
**Verktøy:** GA4 MCP / GSC MCP
**Output:** Trafikkrapport per sidetype

Vis per sidetype:
- Sesjoner, brukere, bounce rate, tid på side
- Konverteringsrate (om tilgjengelig)
- Organisk vs. betalt vs. direkte
- Topp-sider per type (de 10 mest besøkte)
- Sesongmønstre (12 mnd)

**Benchmark-rammeverk (for case-bygging):**
Samle «før»-tall som baseline for å dokumentere effekten av ny plattform. Disse tallene skal samles inn minst én gang før lansering og deretter sammenlignes 3, 6 og 12 måneder etter:

| KPI | Før-tall | Kilde | Hvorfor |
|---|---|---|---|
| Aktive brukere (28d) | 143K | GA4 | Topplinje trafikkindikator |
| Nye vs. returnerende | 127K nye / 16K returnerende | GA4 | Måle om ny plattform øker lojalitet |
| Gjennomsnittlig engasjementstid | 1m 41s | GA4 | Måle om innhold engasjerer bedre |
| Kjøperrate | 0,1% | GA4 | Konverteringseffekt |
| Organisk andel | 69% | GA4 | Måle SEO-effekt av ny IA og innhold |
| Topp-sider per sidetype | Se benchmark-fil | GA4 | Forstå trafikk-distribusjon |
| Engasjement per sidetype | Varierer (26s-2m43s) | GA4 | Identifisere sidetyper som trenger mest forbedring |
| Sesongmønstre | Mangler (12 mnd) | GA4/GSC | Nødvendig for å sammenligne epler med epler |

**Datagap som må lukkes før lansering:**
- [ ] Device-split (desktop/mobil/tablet)
- [ ] Bounce rate per sidetype
- [ ] Event-tracking-definisjon (key events er underrapportert – 0,1% kjøperrate virker lavt)
- [ ] Exit-sider (hvor mister vi folk?)
- [ ] Søkeord fra GSC (clicks, impressions, CTR per sidetype)
- [ ] 12 mnd sesongdata for sammenligning
- [ ] Konverteringstrakt: produktside → kurv → checkout → bekreftelse

For Fargerike: Benchmark-data samlet 2026-03-25, se `04-kilder/2026-03-25_ga4-benchmark.md`.

### Oppgave 1.4: Business Model Canvas 👥

**Input:** Workshop med kunden (allerede gjennomført for Fargerike)
**Output:** Dokumentert BMC med segment, verdiforslag, kanaler, inntektsstrømmer

For Fargerike: BMC fra workshop jan 2026. Nøkkelinnsikter:
- 89 butikker, medlemseid, ~1 mrd total omsetning, ~40 MNOK digitalt
- Segmenter: Lydhør Amatør (18%), Trendy Spendy (17%), Diskuterende Dyktig (14%)
- Digitalt skal drive trafikk til butikk, ikke erstatte den

### Oppgave 1.5: Syntetiser til nåsituasjonsrapport 🤖 + 👥

**Input:** Output fra 1.1–1.4
**Output:** Nåsituasjonsrapport (briefingdokument til kundemøte)

Rapporten skal svare på:
1. Hva har kunden i dag? (sidetyper, antall, struktur)
2. Hva driver trafikk? (topp-søkeord, topp-sider, kanaler)
3. Hva konverterer? (per kategori, per sidetype)
4. Hva mangler? (gap mellom innhold og søkeintensjon)
5. Hva er utdatert? (sider som ikke trekker trafikk, duplikater, kannibalisering)

---

## Blokk 2: Forstå gapet (Fase 1–2)

Mål: Valider kartleggingen med kunden, forstå smertepunkter og ambisjoner, visualiser gapet mellom nå og fremtid.

### Oppgave 2.1: Kundemøte – validering 👥

**Input:** Nåsituasjonsrapport
**Deltakere:** CXO Lead + prosjektleder + kunde
**Output:** Validert nåsituasjon + dokumenterte smertepunkter + ambisjoner

Agenda:
1. «Dette er det dere har i dag – stemmer det?» (15 min)
2. Hva fungerer dårlig? For hvem? (20 min)
3. Hva er ambisjonene? Hva betyr «bedre» for dere? (15 min)
4. Integrasjoner, systemer, interne avhengigheter (10 min)

### Oppgave 2.2: Gap-analyse per sidetype 🤖 + 👥

**Input:** Sitemap-register + søkeordanalyse + kundens ambisjoner
**Output:** Gap-matrise per sidetype

For hver sidetype, vurder:

| Dimensjon | Nå | Mål | Gap |
|---|---|---|---|
| Innhold og kvalitet | | | |
| SEO / AEO | | | |
| Funksjonalitet | | | |
| Dataflyt og integrasjoner | | | |
| Mobil-opplevelse | | | |
| Konvertering | | | |

For Fargerike har vi allerede gjort dette på PDP-nivå (se `04-kilder/2026-03-25_gap-analyse-klint-vs-fargerike-pdp.md`). Tilsvarende bør gjøres for:
- [ ] PLP (produktlistesider)
- [ ] Inspirasjon/artikler
- [ ] Butikkprofiler
- [ ] Søk
- [ ] Forside og navigasjon

### Oppgave 2.3: Benchmark 🤖

**Input:** Konkurrenter og best practice-referanser
**Output:** Benchmark per sidetype (2-3 referanser per type)

For Fargerike:
| Sidetype | Benchmark | Hva de gjør bra |
|---|---|---|
| Farge-PDP | Klint.com | Farge som inngang, tabs for overflate, FAQ, UGC |
| Produkt-PDP | Flügger.no, Jotun.no | Produktinfo, fargevelger |
| Inspirasjon | Jotun.no/inspirasjon | Rombasert, fargepaletter |
| Butikkprofil | Byggmax.no | Åpningstider, kart, tjenester |
| Søk | Byggmax.no | Faceted search, autocomplete |

### Oppgave 2.4: Innholdsstrategi – klustere og historieområder 👥

**Input:** Søkeordanalyse + sitemap-register + BMC
**Verktøy:** Workshop med kunden (ELLER informert antagelse basert på data)
**Output:** 4–10 innholdsklustere med tilhørende søkeord og sidetyper

Denne oppgaven kan gjøres på to måter:

**A) Workshop (anbefalt):** 2-timers økt med redaksjonelt team + markedsansvarlig.
1. Hvilke historieområder skal Fargerike eie? (30 min brainstorm)
2. Hvilke omdømmevinkler skal innholdet støtte? (15 min)
3. Gjennomgang av eksisterende innhold og trafikk (30 min)
4. Definer 4–10 klustere (30 min)
5. Prioriter: hva først? (15 min)

**B) Data-informert antagelse (kan gjøres nå):** Basert på sitemap + søkeordanalyse + BMC, kan vi lage et førsteutkast til klustere som kunden beriker. Forutsetter at vi har søkeordanalysedataene tilgjengelig.

Kluster-antagelse for Fargerike (basert på sitemap + søkeordanalyse fra Riff + BMC):

> Søkeordanalysen viser 2 870 søkeord, 191k søk/mnd, 39 kategorier.
> Utendørs dominerer volumet. Innendørs maling er nesten fraværende i søkedataene – trolig fordi folk søker på fargenavn/inspirasjon, ikke «innendørs maling».
> Full analyse: `04-kilder/2026-03-25_sokeordanalyse-sammendrag.md`

| # | Kluster | Søkekategorier (Riff) | Søkevolum | Dekning | Innholdstyper | Målgruppe | Prioritet |
|---|---|---|---|---|---|---|---|
| 1 | **Terrasse og utegulv** | Terrassebeis (29k), Terrasse (7k), Gulv utendørs (1k), Terrasserengjøring (15k), Treolje (11k) | **63k** | 50-68% | PDP, guider, sesonginnhold | Alle | 🔴 Høy – størst volum, sesongdrevet, under press fra Obs Bygg/Monter |
| 2 | **Maling hus utendørs** | Maling hus (14k), Maling ute (9k), Fasade (1k), Beise hus (0.5k), Beise hytte (0.5k) | **25k** | 52-81% | PDP, prosjektguider, fargevalg ute | Lydhør Amatør, Diskuterende Dyktig | 🔴 Høy – sterk posisjon, forsvare |
| 3 | **Beis og trebeskyttelse** | Beis (8k), Beis olje (9k), Beis tjære (3k), Beis farger (1k), Dekkbeis (1k), Trebeskyttelse (1k) | **23k** | 34-92% | PDP, sammenligningsguider | Diskuterende Dyktig | 🟡 Medium – spredt dekning, konsolideringsmulighet |
| 4 | **Overflatebehandling og grunning** | Grunning (9k), Maling mur (8k), Rust og metall (9k), Impregnering (8k), Mur og betong (0.5k) | **35k** | 53-77% | PDP, how-to-guider | Diskuterende Dyktig | 🟡 Medium – faginnhold som differensierer |
| 5 | **Solskjerming** | Solskjerming (16k) | **16k** | 30% | PDP, kategori, inspirasjon | Trendy Spendy | 🔴 Høy – stort gap, kun 30% dekning, stor mulighet |
| 6 | **Fargeinspriasjon og -valg** | Maling husfarger (2k), Beis farger (1k) + organisk fargenavn-søk (ikke i data) | **3k+** | 92-98% | Farge-PDP, inspirasjon, fargekart, årets farge | Trendy Spendy, Lydhør Amatør | 🟡 Medium – lav volum i søk men kritisk for konvertering og differensiering |
| 7 | **Husvask og rengjøring** | Husvask og rengjøring (7k), Terrasserengjøring (15k) | **22k** | 50-61% | Guider, PDP | Alle | 🟡 Medium – sesongdrevet, overlapper med kluster 1 |
| 8 | **Båt** | Båt (4k), Båt maling (1k), Båt vask (1k) | **6k** | 2-79% | PDP, guider | Nisje | 🟢 Lav – liten relevans for kjernevirksomhet |

**Viktig observasjon:** Innendørs maling (stue, soverom, barnerom, bad) er nesten fraværende i søkedataene. Det betyr at kluster 6 (Fargeinspriasjon) ikke fanger det typiske innendørs-søket. Folk søker trolig på fargenavn («Tidløs», «JOTUN 1024»), inspirasjonstermer («male stue», «barneromsfarge»), eller starter på Pinterest/Instagram. **Innendørs er inspirasjonsdrevet, ikke søkedrevet.** Det styrker caset for sterke Farge-PDP-er, inspirasjon-hub og innholdsklynger som fanger intensjonen før den blir et produktsøk.

**Strategisk anbefaling:** Kluster 1 (Terrasse) og 5 (Solskjerming) har størst kommersiell oppsid på kort sikt. Kluster 6 (Fargeinspriasjon) har størst strategisk verdi for differensiering og konvertering – men den fanges ikke av tradisjonell søkeordanalyse alene.

Hvert kluster skal kobles til:
- Relevante søkeord (fra søkeordanalysen i Riff)
- Relevante sidetyper (fra sitemap-registeret)
- Relevante produktkategorier (for Algolia Recommend)
- KPI (trafikk, konvertering, posisjon)
- Sesongkalender (fra Riff sesongdata)

---

## Blokk 3: Definer hva som skal bygges (Fase 3)

Mål: Gå fra «hva vi vet» til «hva vi skal lage». Produser scope per sidetype med akseptansekriterier.

### Oppgave 3.1: Definer sidetype-settet 👥

**Input:** Sitemap-register + gap-analyse + kundens prioriteringer
**Output:** Endelig liste over sidetyper som skal bygges

Beslutt:
1. Hvilke sidetyper beholder vi (1:1 migrering)?
2. Hvilke sidetyper konsoliderer vi?
3. Hvilke sidetyper er nye?
4. Hvilke sidetyper dropper vi?

For Fargerike (antagelse):

| Sidetype | Handling | Begrunnelse |
|---|---|---|
| Forside | Redesign | Ny IA, nye innganger |
| Farge-PDP | **Ny** | Finnes ikke i dag som reell PDP |
| Produkt-PDP (maling) | Redesign | Kritisk gap fra GAP-analyse |
| Produkt-PDP (gulv) | Redesign | Annen template enn maling |
| Produkt-PDP (tapet) | Redesign | Annen template enn maling |
| Produkt-PDP (utstyr) | Redesign | Enklere template |
| PLP | Redesign | Faceted search via Algolia |
| Søk (SERP) | Redesign | Algolia erstatter Hello Retail |
| Inspirasjon – hub | Konsolider | ~300 sider → kluster-basert IA |
| Inspirasjon – artikkel | Konsolider | Standardisert template |
| Tips & råd – artikkel | Konsolider med inspirasjon | Samme innholdstype, ulik intensjon |
| Butikkprofil | Redesign | Pinmeto-data + tjenester + booking |
| Tjenesteside | Redesign | Koble til booking |
| Kundeservice | Migrere | Lav prioritet, funksjonelt OK |
| Magasin | Vurder fjerning | Utdaterte kataloger, lav trafikk |
| Kampanjeside | Redesign | CMS-drevet, fleksibel |
| Feilsider (404/500) | Redesign | Branding + recovery |
| Handlekurv/checkout | Fase 2 | Avhenger av Omnium |

### Oppgave 3.2: Scope per sidetype (funksjonstabell) 🤖 + 👥

**Input:** Gap-analyse + benchmark + designsystem-komponenter
**Output:** Funksjonstabell per sidetype (Bjørklund-malen)

Hver sidetype får en tabell med kolonnene:

| Topic | Funksjon | Behov | Akseptkriterier | Prioritet | Fase | Dataflyt | Design |
|---|---|---|---|---|---|---|---|

**Regler:**
- Hver funksjon skal være byggbar, testbar og shippbar som enhet
- Akseptansekriterier skal være testbare (ikke «god UX»)
- Dataflyt skal navngi kildesystem (Sanity, Algolia, mg-color, Omnium, Lindback, Pinmeto)
- Design skal referere til navngitt komponent
- Must have / Nice to have – kun to nivåer
- Fasefordeling: eksplisitt (1.0, 1.1, 2.0 etc.)

For Fargerike: PDP-PRD (`2026-03-25_pdp-prd-fase1.md`) er allerede skrevet for Farge-PDP og Produkt-PDP. Tilsvarende må lages for de øvrige sidetypene.

### Oppgave 3.3: Dataflyt-diagram 🤖

**Input:** Scope-tabeller + systemlandskap
**Output:** Mermaid-diagram over alle integrasjoner

For Fargerike: Dokumentert i PRD (arkitektur-diagrammet). Må utvides med spesifikke API-kall per sidetype.

### Oppgave 3.4: SEO-migreringsplan 🤖

**Input:** Nåværende URL-struktur + ny URL-struktur
**Output:** Redirect-matrise (gammel URL → ny URL → type → begrunnelse)

**Kritisk for Fargerike:** 69% organisk trafikk. Feil her koster penger.

Redirect-matrisen skal inneholde:
- Alle nåværende URL-er (fra sitemap)
- Ny URL per side (basert på ny IA)
- Type redirect (301 permanent / 410 fjernet)
- Begrunnelse (1:1, konsolidert, fjernet, ny)

### Oppgave 3.5: Event-tracking-spec 🤖

**Input:** Scope-tabeller
**Output:** GA4-eventliste per sidetype med parametere og verifiseringskrav

Events er funksjoner i scopet, ikke noe som «legges til etterpå». Hver event har:
- Event-navn (GA4-konvensjon)
- Parametere med datatype
- Trigger (når sendes den)
- Verifiseringsmetode (DebugView / dataLayer-inspeksjon)

### Oppgave 3.6: Designbriefer 🤖 + 👥

**Input:** Scope-tabell + dataflyt + benchmark + designsystem
**Output:** Én designbrief per sidetype

Designbriefen er et subset av scope + kontekst:
1. Brukerflyt (hvor kommer brukeren fra, hvor går de)
2. Funksjonstabell (filtrert til denne sidetypen)
3. Datakrav oppsummert
4. Referanser og benchmark
5. Mobilhensyn
6. Åpne spørsmål

---

## Blokk 4: Bygg, mål, iterer (Fase 4–6)

### Oppgave 4.1: Prioriter og fasesett roadmap 👥

**Input:** Alle scope-tabeller + avhengigheter + kundens budsjett
**Output:** Roadmap med milepæler

For Fargerike:

| Fase | Tidsrom | Innhold |
|---|---|---|
| 0 | Q1-Q2 2026 | Kartlegging, PoC, tech-valg (pågår) |
| 1 | Q3-Q4 2026 | PDP-er, inspirasjon, butikkprofiler, søk, Sanity, Algolia |
| 2 | Q1-Q2 2027 | Commerce, handlekurv, klikk-og-hent, kampanjemotor |
| 3 | Q3 2027+ | Prosjektverktøy, kundeklubb, B2B, personalisering |

### Oppgave 4.2: Bygg per sidetype 🤖 + 👥

Implementer scope-tabellen per sidetype. Bruk akseptansekriteriene som testgrunnlag. Oppdater FRS med ✅ når kravet er implementert.

### Oppgave 4.3: SEO-migrering og overvåking 🤖

- Deploy redirect-matrise
- Overvåk GSC 90 dager etter lansering
- Sjekk: indeksering, posisjon, trafikk per sidetype
- Rapporter avvik

### Oppgave 4.4: Måling og dashboards 🤖

- GA4-events verifisert i DebugView
- Dashboard per brukerflyt (ikke bare per side)
- Månedlig rapport: konvertering per kategori, segment, kanal

---

## Sjekkliste: Status for Fargerike

| Oppgave | Status | Leveranse | Plassering |
|---|---|---|---|
| 1.1 Sitemap-crawl | ✅ Gjort | **10 371 URL-er**, ~40 sidetyper | Denne filen + 04-kilder/sitemap-klassifisering.md |
| 1.1b As-is PRD per sidetype | ✅ Gjort | 6 filer: PLP, Farge-PDP, PDP Maling, Inspirasjon+Tips, Butikk+Tjenester, Forside+Søk+Kundeservice | 02-krav/as-is/ |
| 1.2 Søkeordanalyse | ✅ Gjort | 2 870 søkeord, 191k søk/mnd, 39 kat. | mesh.riff.works/fargerike/ + 04-kilder/sokeordanalyse-sammendrag.md |
| 1.3 Trafikkanalyse + benchmark | ✅ Gjort (28d) | 143K aktive, 69% organisk, 0.1% kjøper + målrammeverk | 04-kilder/2026-03-25_ga4-benchmark.md |
| 1.4 BMC | ✅ Gjort | BMC-workshop jan 2026 | Confluence |
| 1.5 Nåsituasjonsrapport | ❌ Ikke startet | | |
| 2.1 Kundemøte validering | 🟡 Delvis | Eline-møte 11.03 | Transkript i 03-transcripts/ |
| 2.2 Gap-analyse per sidetype | 🟡 Kun PDP | Klint vs Fargerike | 04-kilder/gap-analyse |
| 2.3 Benchmark | 🟡 Kun PDP | Klint | gap-analyse |
| 2.4 Innholdsklustere | 🟡 Førsteutkast | 8 klustere basert på søkeord + sitemap + BMC | Denne filen – krever workshop for validering |
| 3.1 Sidetype-sett | 🟡 Utkast | Se tabell over | Denne filen |
| 3.2 Scope per sidetype | 🟡 PDP har PRD | PDP-PRD Fase 1 | 02-krav/prd/ |
| 3.3 Dataflyt-diagram | 🟡 Overordnet | Arkitekturdiagram i PRD | 02-krav/prd/ |
| 3.4 SEO-migreringsplan | ❌ Ikke startet | | |
| 3.5 Event-tracking | ❌ Ikke startet | | |
| 3.6 Designbriefer | ❌ Ikke startet | | |

---

## Hva som kan gjøres nå vs. krever workshop

### Kan gjøres nå (med Claude + eksisterende data)

1. **Gap-analyse for resterende sidetyper** – besøk 2-3 sider per type på fargerike.no, sammenlign med benchmark
2. **Innholdskluster-utkast** – basert på sitemap + søkeordanalyse + BMC, lag informerte antagelser
3. **Scope-tabeller for PLP, søk, inspirasjon** – samme struktur som PDP-PRD
4. **SEO-migreringsplan (draft)** – basert på nåværende og foreslått URL-struktur
5. **Event-tracking-spec** – basert på scope-tabeller

### Krever workshop / kundevalidering

1. **Innholdsklustere – endelig versjon** – historieområder, omdømmevinkler, prioritering
2. **Sidetype-konsolidering** – hvilke inspirasjonsartikler beholdes/slås sammen/fjernes
3. **Tjeneste-definisjon** – hvilke tjenester er aktive, hvem eier bookingflyt
4. **Kampanjeprosess** – hvordan fungerer kampanjer i dag, hvem styrer synlighet
5. **Butikkdata-kvalitet** – er Pinmeto-dataene oppdaterte, hva mangler

---

## Endringslogg

| Dato | Endring | Kilde |
|---|---|---|
| 2026-03-25 | Opprettet som oppgavedrevet versjon av CXO-Maaldokument v2.0 | John + Claude |
| 2026-03-25 | Lagt til oppgave 1.1b: As-is PRD per sidetype med Claude in Chrome-agenter | John + Claude |
| 2026-03-25 | Oppdatert 1.3 med GA4-data (143K aktive brukere, 28d) | Claude |
| 2026-03-25 | Korrigert sitemap-tall: 10 371 URL-er (ikke 1 097) | Claude |
| 2026-03-25 | As-is PRD ferdig: 6 filer dekker alle makro-sidetyper | Claude in Chrome-agenter |
| 2026-03-25 | GA4 benchmark-dokument lagret med målrammeverk for case-bygging | Claude |
| 2026-03-25 | Oppgave 1.3 utvidet med benchmark-rammeverk og datagap-sjekkliste | Claude |
