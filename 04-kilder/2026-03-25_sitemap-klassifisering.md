# Sitemap-klassifisering Fargerike

**Kilde:** `https://www.fargerike.no/sitemaps/fargerike/no/content.xml`
**Dato:** 2026-03-25
**Totalt URL-er:** 10 371
**Unike sidetyper:** ~40 (gruppert i 12 makro-typer for As-is PRD)

---

## Makro-grupper

| Makro-type | Antall | Andel | As-is PRD nødvendig? |
|---|---|---|---|
| PLP-er (tapet, gulv, maling, tilbehør) | 5 878 | 56.7% | Ja – én PRD for PLP-template |
| PDP-er (maling, farge) | 3 509 | 33.8% | Ja – PDP maling + Farge-PDP (allerede påbegynt) |
| Inspirasjon (8 undertyper) | 438 | 4.2% | Ja – én PRD, men noter variasjon |
| Tips & råd | 103 | 1.0% | Ja |
| Butikkfinner/profil | 87 | 0.8% | Ja |
| Tjenester | 42 | 0.4% | Ja |
| Magasin | 28 | 0.3% | Vurder – utdatert innhold? |
| Kundeservice | 15 | 0.1% | Kort |
| Annet (standalone-sider) | 246 | 2.4% | Kartlegg, men ingen dedikert PRD |
| Funksjonssider (søk, kurv, etc.) | 6 | <0.1% | Ja – egne PRD-er |
| Kampanje | 3 | <0.1% | Kort |
| Diverse (kundeklubb, merker, miljø, guide) | 16 | <0.1% | Kartlegg |

---

## Detaljert sidetype-register

| Sidetype | Antall | URL-mønster | Eksempler |
|---|---|---|---|
| **PLP – Tapet** | 3 431 | `/tapet/**` | `/tapet/vinyltapet`, `/tapet/fibertapet` |
| **Farge-PDP / Fargeoversikt** | 3 239 | `/farger/**` | `/farger/beige`, `/farger/bla`, `/farger/beige/soothing-beige` |
| **PLP – Tilbehør/verktøy** | 1 738 | `/vaske-rengjoring/**`, `/sparkel-stop/**`, `/verktoy**`, `/malingsverktoy/**` | `/vaske-rengjoring`, `/sparkel-stop` |
| **PLP – Gulv** | 695 | `/gulv/**` | `/gulv/vinyl`, `/gulv/parkett`, `/gulv/teppe` |
| **PDP – Maling** | 270 | `/maling/*/*/**` (depth≥4) | `/maling/ute/tre-og-fasade-/baron-brilliant` |
| **Annet (standalone)** | 246 | Diverse | `/fargekombinasjoner`, `/lavprisprodukter`, `/arets-farge-2021` |
| **Inspirasjon – Farger/teori** | 107 | `/inspirasjon/farger/**` | `/inspirasjon/farger/varme-rom`, `/inspirasjon/farger/gratoner` |
| **Tips & råd – Artikkel** | 98 | `/tips-rad/*/*` | `/tips-rad/male-ute/beise-terrassen` |
| **Butikkprofil** | 86 | `/fargehandel/*` | `/fargehandel/oslo-majorstuen`, `/fargehandel/tromso` |
| **Inspirasjon – Årets farge** | 70 | `/inspirasjon/arets-farge/**` | `/inspirasjon/arets-farge/2026-havperle` |
| **Inspirasjon – Fargekart** | 62 | `/inspirasjon/fargekart/**` | `/inspirasjon/fargekart/arets-farge-2026` |
| **Inspirasjon – Bolig/produkt** | 62 | `/inspirasjon/bolig/**` | `/inspirasjon/bolig/parkett`, `/inspirasjon/bolig/vinyl` |
| **Inspirasjon – Hjemme hos** | 54 | `/inspirasjon/hjemme-hos/**` | `/inspirasjon/hjemme-hos/fattighuset` |
| **Inspirasjon – Rom** | 49 | `/inspirasjon/rom/**` | `/inspirasjon/rom/farger-soverom` |
| **Tjenester – Butikktjeneste** | 35 | `/tjenester-butikker/*` | `/tjenester-butikker/gulvsliper`, `/tjenester-butikker/fargeskanner` |
| **Magasin – Artikkel** | 27 | `/magasin/*` | `/magasin/gulvkatalog`, `/magasin/hyttemagasin` |
| **Inspirasjon – Månedens stil** | 26 | `/inspirasjon/manedens-stil/**` | `/inspirasjon/manedens-stil/mars-2026` |
| **Kundeservice** | 15 | `/kundeservice/**` | `/kundeservice/ofte-stilte-sporsmal` |
| **PLP – Maling** | 14 | `/maling/**` (depth≤3) | `/maling/ute`, `/maling/inne`, `/maling/ute/beis` |
| **Inspirasjon – Hub/annet** | 8 | `/inspirasjon`, `/inspirasjon/rom`, etc. | Hub-sider |
| **Malingguide (interaktiv)** | 6 | `/maling-produktguide/**` | `/maling-produktguide/farge`, `/maling-produktguide/glansgrad` |
| **Tjenester – Overordnet** | 5 | `/tjenester/**` | `/tjenester/interiorkonsulent`, `/tjenester/fagekspert` |
| **Miljøvennlige produkter** | 5 | `/miljovennlig-produkter/**` | `/miljovennlig-produkter/maling` |
| **Tips & råd – Kategorihub** | 4 | `/tips-rad/*` | `/tips-rad/male-inne`, `/tips-rad/male-ute` |
| **Kampanje** | 3 | `/kampanje/**` | `/kampanje/manedens-gulv` |
| **Feilside** | 2 | `/404`, `/500` | |
| **Kundeklubb** | 2 | `/kundeklubb`, `/medlemsvilkar` | |
| **Forside** | 1 | `/` | |
| **Butikkfinner – Hub** | 1 | `/fargehandel` | |
| **Søk** | 1 | `/sok` | |
| **Handlekurv** | 1 | `/handlekurv` | |
| **Bekreftelse** | 1 | `/bekreftelse` | |
| **Solskjerming** | 1 | `/solskjerming` | |
| **Merkeoversikt** | 1 | `/merker` | |

---

## Nøkkelobservasjoner

1. **Tapet dominerer sitemapen** (3 431 sider). Dette er sannsynligvis individuelle produktsider – tapet har tydeligvis en annen produktdatastruktur enn maling.

2. **Fargeoversikten er enorm** (3 239 sider). Hver farge har egen URL under `/farger/`. Dette er allerede en form for Farge-PDP – men spørsmålet er om de fungerer som ordentlige landingssider.

3. **Maling har relativt få PDP-er** (270) sammenlignet med tapet. Det kan bety at produktkatalogen er grundigere for tapet, eller at maling-PDPer har en annen URL-struktur.

4. **Inspirasjon er spredt over 8 undertyper** – rom, farger, bolig, hjemme-hos, årets farge, fargekart, månedens stil. Konsolideringsmulighet.

5. **«Annet» er overraskende stort** (246 sider). Her ligger standalone kampanjesider, landingssider, og annet som ikke passer i noen kategori. Bør kartlegges manuelt.

6. **Tilbehør/verktøy** (1 738 sider) inkluderer vaske/rengjøring, sparkel, verktøy, malingsverktøy – dette er PLP-er men med potensielt egne PDP-templates.

---

## Anbefalt As-is PRD-prioritering

1. **PLP** (tapet, gulv, maling, tilbehør) – én template, men fire varianter
2. **Farge-PDP** – allerede i GAP-analyse, men nå med 3 239 sider som kontekst
3. **PDP Maling** – allerede i PRD
4. **Inspirasjon** – konsolider 8 undertyper til 2-3 templates
5. **Tips & råd** – én artikkeltemplate
6. **Butikkprofil** – 86 butikker
7. **Tjenester** – to varianter (butikktjeneste vs. overordnet)
8. **Forside** – unik
9. **Søk** – unik
10. **Kundeservice** – lav prioritet, funksjonelt OK
