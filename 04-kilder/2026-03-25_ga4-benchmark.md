# GA4 Benchmark – Fargerike.no
**Periode:** 25. februar – 24. mars 2026 (28 dager)
**Dokumentert:** 25. mars 2026
**Formål:** Baseline for case-bygging (før/etter ny nettside-lansering)

---

## 1. Benchmark-kontekst

Dette dokumentet inneholder baseline-data fra current fargerike.no (eksisterende løsning) samlet over 28 dager i februar-mars 2026. Dataene skal brukes som referansepunkt når vi måler resultat etter lansering av ny nettside (Q3 2026).

Benchmark skal gjøre det mulig å dokumentere:
- Trafikk-gevinster (organisk søk, søkeadferd)
- Engasjements-forbedringer (tid på side, event-tracking)
- Konverteringsgevinster (hvis nytt system implementerer e-commerce)
- Brukervei-endringer (sesjonsmønster, kanalfordeling)

---

## 2. Overordnede KPI-er

| Metrikk | Verdi | Notater |
|---------|-------|---------|
| **Aktive brukere (28d)** | 143 000 | Alle brukere som hadde aktivitet |
| **Nye brukere** | 127 000 | 88,8 % av totalt (høyFirst Visit-andel) |
| **Gjennomsnittlig engasjementstid** | 1m 41s | Per bruker/sesjon |
| **Kjøperrate** | 0,1 % | Konvertering til kjøp (baseline) |
| **Totale sesjoner** | ~220 K | Beregnet fra kanaldata |

**Observasjon:** Høy andel nye brukere tyder på at mye av trafikken er fra søkemotorer (ikke gjentatt besøk). Dette er ventet for en informasjonsportal som Fargerike.

---

## 3. Kanalfordeling (sesjoner)

| Kanal | Sesjoner | Andel | Notater |
|-------|----------|-------|---------|
| **Organic Search** | 152 000 | 69 % | SEO-drevet – dominerende kanal |
| **Paid Search** | 28 000 | 13 % | Google Ads |
| **Direct** | 19 000 | 9 % | Direkte URL/bookmark |
| **Cross-network** | 9 800 | 4,5 % | Display, retargeting |
| **Paid Social** | 5 500 | 2,5 % | Facebook, Instagram etc. |
| **Referral** | 3 200 | 1,5 % | Baklenker fra andre sider |
| **Unassigned** | 11 000 | 5 % | (ikke klassifisert) |
| **TOTALT** | ~228 500 | 100 % | |

**Observasjon:** Organisk søk er kjernestyrken – 69 % av all trafikk. Paid Search og Direct er tilleggskanalert. Paid Social er svak; dette kan være forbedringspotensial.

---

## 4. Trafikkdata per sidetype

Data sortert etter sidetype og ranket på views. Gruppe som følger markeres med [Produktside], [Fargeside] osv.

### [Forside]
| Side | Views | Brukere | Engasjementstid | Events |
|------|-------|---------|-----------------|--------|
| / | 33 974 | 17 457 | 26s | 6 |

**Analyse:** Forside får stor trafikk (høy bounce-andel eller shallow engagement forventet). 26s engasjement er kort – tyder på at besøkende enten finner det de vil eller forlater.

---

### [Fargeside] – Oversikt og kategorier
| Side | Views | Brukere | Engasjementstid | Events |
|------|-------|---------|-----------------|--------|
| /farger/ | 10 711 | 3 218 | 1m 30s | — |
| /inspirasjon/fargekart/ | 5 498 | 3 243 | 20s | — |

**Analyse:** /farger/-oversikten har god trafikk og moderate engasjementstider. Fargekart-siden har høy brukervolum men veldig kort tid (20s) – mulig UX-problem eller at siden brukes som "springbrett".

---

### [Fargeside] – Spesifikke farger
| Side | Views | Brukere | Engasjementstid | Events |
|------|-------|---------|-----------------|--------|
| /farger/gronn/ | 10 345 | 2 699 | 1m 59s | — |
| /farger/beige/ | 9 862 | 3 418 | 1m 31s | — |
| /farger/brun/ | 7 609 | 2 278 | 1m 39s | — |
| /farger/rosa/ | 6 819 | 2 089 | 1m 28s | — |
| /farger/gul/ | 4 998 | 1 426 | 1m 48s | — |
| **SUBTOTAL FARGESIDE** | **49 543** | **13 510** | **~1m 45s avg** | — |

**Analyse:** Fargeside-kategorier er sterke. Grønn og beige dominerer. Engasjementstid varierer 1m 28s–1m 59s (moderat–bra). Dette indikerer at brukere bruker tid på å utforske fargesamlinger. Beige-kategorien viser særlig høy brukerandel.

---

### [Fargeside] – Individuelle fargeprodukter
| Side | Views | Brukere | Engasjementstid | Events |
|------|-------|---------|-----------------|--------|
| /farger/beige/soothing-beige/ | 6 091 | 3 643 | 30s | 63 |
| /farger/beige/marrakesh/ | 4 553 | 2 713 | 28s | — |

**Analyse:** Individuelle farger får mindre views enn kategorier, men "soothing-beige" skiller seg ut med **63 events** – det høyeste i hele datasettet. Dette tyder på at denne siden har interaksjon/tracking som fungerer. De andre individuelle fargene mangler event-data; mulig tracking-problem.

---

### [Inspirasjonssider]
| Side | Views | Brukere | Engasjementstid | Events |
|------|-------|---------|-----------------|--------|
| /inspirasjon/arets-farge/2026-havperle/ | 4 914 | 3 304 | 46s | — |

**Analyse:** Årets farge ("havperle") har høy brukerandel men kort engasjementstid (46s). Forventet for kort redaksjonelt innhold.

---

### [Produktsider] – Tapet
| Side | Views | Brukere | Engasjementstid | Events |
|------|-------|---------|-----------------|--------|
| /tapet/ | 13 055 | 1 944 | 2m 22s | — |
| /tapet/vinyltapet/ | 8 293 | 1 095 | 2m 43s | — |
| /tapet/fibertapet/ | 5 523 | 805 | 2m 10s | — |
| **SUBTOTAL TAPET** | **26 871** | **3 844** | **~2m 25s avg** | — |

**Analyse:** Tapet-sektionen har høyeste gjennomsnittlig engasjementstid (2m 25s). Færre brukere per view enn fargeside, men som utkommer på høy engasjement. Taper er trolig mer "research-heavy" enn impulsivt fargekjøp.

---

### [Produktsider] – Gulv
| Side | Views | Brukere | Engasjementstid | Events |
|------|-------|---------|-----------------|--------|
| /gulv/vinyl/ | 9 209 | 2 525 | 1m 31s | — |
| /gulv/teppe/ | 5 130 | 1 641 | 1m 14s | — |
| **SUBTOTAL GULV** | **14 339** | **4 166** | **~1m 23s avg** | — |

**Analyse:** Gulv-sektionen har moderat engasjementstid. Vinyl får mer trafikk enn teppe.

---

### [Sammendrag sidetype]

| Sidetype | Totale views | Totale brukere | Avg. engasjementstid |
|----------|--------------|----------------|----------------------|
| Forside | 33 974 | 17 457 | 26s |
| Fargeside (alle) | 49 543 | 13 510 | 1m 45s |
| Tapet | 26 871 | 3 844 | 2m 25s |
| Gulv | 14 339 | 4 166 | 1m 23s |
| Inspirasjon | 4 914 | 3 304 | 46s |
| **TOTALT (top15)** | **129 641** | **42 281** | — |

*Merknad: Top 15 sider representerer ~57 % av all trafikk (estimert fra 220K sesjoner).*

---

## 5. Nøkkelobservasjoner

### Trafikk-mønstre
- **SEO-dominans (69 %):** Organic Search er langt den viktigste trafikk-kilden. Nytt design må prioritere teknisk SEO og keyword-synlighet.
- **Høy First Visit-andel (88,8 % nye brukere):** Indikerer at sitatet fungerer som informasjonsressurs, ikke lojalitets-driver. Repeat visits er lave.
- **Short tail på forsiden:** Forside får 33K views men bare 17K unike brukere – mange bounce eller går direkte til kategorier.

### Engasjement-mønstre
- **Produktsider > Fargeside:** Tapet og gulv har høyere engasjementstid enn fargeside (2m 25s vs 1m 45s), tyder på at kompleksere produktkategorier holder bruker lenger.
- **Event-tracking-gap:** Bare "soothing-beige" har 63 events registrert. Alle andre sider mangler eller har sparsom event-data. Dette tyder på dårlig implementering av GA4-event tracking.
- **Inspirasjon = lav engasjement:** Redaksjonelt innhold (fargekart, årets farge) får besøk men kort tid (20–46s).

### Konventeringsmønster
- **0,1 % kjøperrate:** Baseline er veldig lav. Ny løsning bør fokusere på CTA, produktinformasjon og checkout-flyt for å øke denne.
- **Ingen direkte kjøpsmulighet på dagens site?** Lav konvertering kan indikere at Fargerike.no er informasjonsside som sender brukere til Jotun-butikk eller fysiske forhandlere.

---

## 6. Hva vi mangler (datahuller)

### Tracking-mangler
- ❌ Event-data for 99 % av siden (bare soothing-beige er instrueret)
- ❌ Click-tracking (klikk på produktkort, fargevelger osv.)
- ❌ Search-queries (hva søker brukere etter?)
- ❌ Exit-pages (hvor forlater brukere?)
- ❌ Device-split (mobil vs desktop trafikk)
- ❌ Bounce-rate per side

### Forretningsdata-mangler
- ❌ Konverteringskanal (hvis brukere kjøper andre steder, hvor?)
- ❌ Form-completions (if any)
- ❌ Butikk-finner-bruk (Click and Collect data?)
- ❌ Anmeldelser/rating-data

### UX-data-mangler
- ❌ Scroll-depth (hvor dyp lesing på lange sider?)
- ❌ Video-views (hvis relevant)
- ❌ Session-recordings (why users leave)

**Anbefaling før relansering:** Implementer GA4-event tagging på alle kritiske bruker-interaksjoner (fargevelger-klikk, søk, produktviser, kurv-handler osv.) fra dag 1.

---

## 7. Målrammeverk for etter-lansering

Når ny nettside lanseres (planlagt Q3 2026), skal disse KPI-ene måles mot benchmark. Her er realistiske målsettinger:

### Trafikk-mål (6 mnd etter lansering)
| Metrikk | Baseline | Målsetting | Begrunnelse |
|---------|----------|-----------|-------------|
| Aktive brukere | 143 K | +15–25 % (165–179 K) | Bedre SEO + increased brand awareness |
| Nye brukere | 127 K | +20–30 % (152–165 K) | Ny design skal dra organisk søk |
| Organic Search-andel | 69 % | 70–75 % | Fokus på SEO skal øke andelen |
| Paid Search ROAS | — | Etablere baseline | Ny konverteringsfunnel skal forbedre ROI |

### Engasjement-mål
| Metrikk | Baseline | Målsetting | Begrunnelse |
|---------|----------|-----------|-------------|
| Gjennomsnittlig engasjementstid | 1m 41s | +20–30 % (2m 0s–2m 10s) | Bedre UX og innhold skal holde bruker lengre |
| Bounce rate (forside) | ~48 % (est.) | -10 pp. (38 %) | Bedre call-to-action skal guide dypere |
| Event-track coverage | ~2 % | 100 % | Full implementering av GA4-events |

### Konvertering-mål
| Metrikk | Baseline | Målsetting | Begrunnelse |
|---------|----------|-----------|-------------|
| Kjøperrate | 0,1 % | +100–200 % (0,2–0,3 %) | Ny commerce-funksjonalitet |
| "Save project" / Wishlist | 0 | Etablere baseline | Nytt feature for prosjektlagring |
| Butikk-lookup | — | Etablere baseline | Click and Collect skal dra lokale besøk |

### Kanal-mål
| Metrikk | Baseline | Målsetting | Begrunnelse |
|---------|----------|-----------|-------------|
| Direct-trafikk-andel | 9 % | +2 pp. (11 %) | Brand awareness fra lansering |
| Paid Social-andel | 2,5 % | +3 pp. (5,5 %) | Økt social-spend planlagt |
| Referral-andel | 1,5 % | +1,5 pp. (3 %) | Innhold skal dra mer backlinks |

---

## 8. Suksess-kriterier for case-bygging

Når vi skal bygge case-studie (8–12 mnd etter lansering), skal vi dokumentere:

1. **Trafikk-gevinst:** X % økning i organisk søk, nye brukere
2. **Engasjements-forbedring:** Lengre sessioner, lower bounce rate
3. **Konvertering:** Konkrete e-commerce-tall hvis implementert
4. **SEO-gevinst:** Bedre ranking for core keywords (farger, produkter, inspirasjon)
5. **Brukervei-endringer:** Prosjektfunksjonalitet (lagring, sharing)
6. **Teknisk impact:** Page speed, Core Web Vitals, mobile experience

**Case-format:** Before/after tall + brukerhistorier + teknisk djupdykk.

---

## Vedlegg: Rådata-kilder

- GA4-datasett: `fargerike.no` property
- Periode: 25.02.2026–24.03.2026
- Datavarehus: Google Analytics 4
- Dokumentert av: Development team
- Neste oppdatering: Etter relansering (Q3 2026)
