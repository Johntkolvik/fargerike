# As-is PRD: Inspirasjon & Tips

**Status:** Analysert 2026-03-25
**Analyserte sider:** 5 (inspirasjon-hub, årets-farge, fargekart-hub, tips-hub, tips-artikkel)

---

## Sammendrag

Fargerike.no har et innholdsekosystem for inspirasjon og tips delt i to hubs:
- **Inspirasjon** – trendinnhold, designideer, årets farger, kategorisert etter rom, boligtype og stilart
- **Tips & Råd** – how-to-artikler med steg-for-steg instruksjoner, produktanbefaling, teknisk info

Begge hubs er katalogorienterte, viser lister over innholdstyper, men har begrenset innholdshub-funksjonalitet (filtrering, søk, relatert innhold).

---

## 1. Inspirasjon-hub

**URL:** `/inspirasjon/`
**Title:** Inspirasjon - Rom - Farger - Bolig - Hjemme hos | Fargerike

### Navigasjonsstruktur

Siden er bygget som en **kategorisert katalogsamling**. Innholdstyper organisert i 6 hovedgrupper:

1. **FARGER** (produktfokusert)
   - Interiørmaling
   - Trend
   - Eksteriør
   - Fargelære
   - Kombinasjoner
   - Interiør

2. **FARGEKART** (design-assets)
   - Interiørmaling
   - Utemaling
   - Eksteriør
   - Lady
   - Interiør

3. **ÅRETS FARGE** (årlig tema)
   - År 2021, 2020, 2022, 2023, 2024, 2025

4. **ROM** (rom-type)
   - Barnerom
   - Soverom
   - Uterom
   - Stue
   - Kjøkken
   - Bad

5. **BOLIG** (produktkategori)
   - Gulv
   - Interiørmaling
   - Tapet
   - Solskjerming
   - Teppe
   - Trend

6. **HJEMME HOS** (stilart)
   - Nordisk
   - Elektrisk
   - Retro
   - Klassisk
   - Moderne

7. **MÅNEDENS STIL** (sesongkurering)

### Innhold & Funksjonalitet

- **Nei til fulltekstsøk** – ingen søkefunksjonalitet på hub-nivå
- **Nei til dynamisk filtrering** – kun statiske linksamlinger
- **Nei til innholdsvisning** – hub viser kun lenker, ikke innholdssmågbilder/-beskrivelser
- **Nei til relatert innhold** – ingen "mer som dette"-funksjonalitet
- **Nei til paginering** – ingen synlig artikkelliste eller infinite scroll
- **Ren strukturering** – ren link-katalog uten visuell innholdspreview

---

## 2. Inspirasjon-artikkel: Årets Farge

**URL:** `/inspirasjon/arets-farge/2026-havperle`
**Title:** Årets Farge 2026 | Fargerike

### Template-elementer

Artikkelen er strukturert som en **fargepresentasjon**:

1. **Fargenavn & kode**
   - Tittel: "Havperle"
   - Produktkode: "FR2606"

2. **Visuelt element**
   - Fargekort/swatch-bilde (inferent fra side-design)

3. **Beskrivelse**
   - Emosjonell pitch: "En ny, frisk og elegant farge. Den er kjølig og passer perfekt til den skandinaviske stilen - nesten bedårende vakker."
   - Kontekst: "Sammen med lyse tresorter og hvite, ublekede tekstiler gir den interiøret en egen letthet."

4. **Inspirasjon & kombinasjonsforslag**
   - "Velg Havperle for et vakkert og balansert hjem."
   - "Kombiner den med sandtoner eller klassiske hvite detaljer – eller tilfør grønne innslag for et friskt og levende uttrykk."
   - "En sommerlig farge for hele året – perfekt i alle rom."

5. **CTA**
   - "Kjøp maling" – direkte link til produktsideen

### Mangler

- Ingen bildegalleri (mood boards, roomvo-integrering)
- Ingen fargekombinasjonsvisualisering
- Ingen relatert inspirasjon (andre årets farger, lignende paletter)
- Ingen butikkinformasjon (hvor finnes fargen)
- Ingen delingsfunksjoner (sosiale medier)
- Ingen kommentarer/tilbakemeldinger fra brukere

---

## 3. Fargekart-hub

**URL:** `/inspirasjon/fargekart`
**Title:** Våre fargekart | Fargerike

### Struktur

Siden er en **katalog-oversikt over PDF-fargekart**, organisert etter filterkriterier:

1. **År**
   - 2026

2. **Produkt-linje/merke**
   - Beis
   - Gulv
   - Interiørmaling
   - Lady
   - Tapet
   - Utemaling

3. **Tematisk**
   - Årets Farge

### Innhold

- **Minst 128 fargekart-artikler** (mange `<article>`-elementer i strukturen)
- Hver artikkel er trolig en PDF-lenke eller en miniteaser
- Layout: grid 3-4 kolonner

### Funksjonalitet

- **Filternavigasjon** (breadcrumb-stil kategorier øverst)
- **Linker til kategoribaserte undersider** (f.eks. `/fargekart/lady/`)
- **Ingen fulltekstsøk** på hub
- **Ingen sortering** (alfabetisk, populæritet)

---

## 4. Tips & Råd-hub

**URL:** `/tips-rad/`
**Title:** Ekspertenes Tips & Råd | Fargerike

### Navigasjonsstruktur

Siden er organisert som en **kategori-katalog**:

1. **EMNEGRUPPE 1**
   - Male inne
   - Male ute
   - Legge gulv
   - Tapetsere

2. **EMNEGRUPPE 2**
   - Gulv
   - Interiørmaling
   - Tapet

3. **CTA**
   - Book interiørkonsulent (prominent bilde/link)

### Innhold & Funksjonalitet

- **Minimalentissh katalogstruktur** – kun lenker til underkategorier
- **Keine Innhaltsauschau** – ingen artikkelminaturer
- **Keine Suchfunktion** – kun navigasjonslenksamling
- Samme struktur som inspirasjon-hub: ren link-katalog

---

## 5. Tips & Råd-artikkel: Beise Terrassen

**URL:** `/tips-rad/male-ute/beise-terrassen/`
**Title:** Beise terrassen, plattingen - Gjør det selv | Fargerike

### Template-elementer

Artikkelen er en strukturert **how-to/instruksjon** med følgende deler:

1. **Overskrift & Intro**
   - "Slik beiser du terrassen" (visuell h1)
   - Konteksttekst: "Det er ekstra hyggeleg å tilbringe våren og sommeren på en vakker og nybeiset terrasse. Vi viser deg hvordan du beiser terrassegulvet raskt og enkelt."

2. **Emnetag**
   - "Terrasse" (lenker til relatert innhold)

3. **Video-seksjon**
   - YouTube-innebygning: "Beise terrassen - Gjør det selv"
   - Produsent: Baron/Fargerike

4. **Produktfokusert tekst**
   - Navn: "Baron Terrassebeis"
   - Beskrivelse av produkt (egenskaper, fordeler, bruksomrader)
   - Formulering: "vanntynnet, halvmatt terrassebeis utviklet for behandling..."
   - Funksjonelle detaljer (UV-motstand, vannresistens, soppbeskyttelse)

5. **Step-by-step instruksjoner**
   - Seksjonsbetegnelse: "Slik bruker du Baron Terrassebeis"
   - Nummerert prosess:
     1. Underlagpreparasjon (vask, slip, fjerning av løse deler)
     2. Tidspunkt og betingelser (unngå sollys, rør spannet)
     3. Påføring (pensel, rull, pad; ett bord av gangen)
     4. Lagering (vått-i-vått teknikk eller enkeltstrøk)
     5. Etterbehandling (stryke vekk overskytende beis)

6. **Teknisk informasjon**
   - Bruksområde
   - Påføringstemperatur (minimum +5 °C)
   - Verktøy (pensel, rull, pad)
   - Tørketid (ca. 4 timer overflatetørr)
   - Forbruk (7–9 m² per liter)
   - Rengjøring (vann)

7. **Produktboks**
   - Produktnavn, priser, volumer
   - "3 liter 499,-", "10 liter 1 499,-"
   - Lagerstatus: "På nettlager - Gratis levering til butikk"
   - CTA: "Tilgjengelig for klikk og hent fra 499,-"

8. **Breadcrumb-navigasjon**
   - "Male ute" (parent category)

### Visuell struktur

- Heroisk overlay-bilde (terrasse-scenen fra video)
- Seriffonter for h1 (klassisk designval)
- Tonet bakgrunn (beige/naturlig)
- Video embedded (YouTube iframe)

### Funksjonalitet

- **Produktintegrasjon** (pris, lager, "kjøp nå")
- **CTA til relatert produkt** ("Baron Easypad" nevnt som tool)
- **Kategoribreadcrumb** (Male ute)
- **Emnetag** (Terrasse)
- **Ingen relatert innhold-seksjon** (andre beise-artikler, lignende tips)
- **Ingen delingsknapper** (sosiale medier)
- **Ingen innkommende lenker fra produkt-sidene**

---

## Felles Template-elementer (Inspirasjon & Tips)

### Navigasjon
- **Breadcrumb** – kategori-nivå (Male ute → Beise terrassen)
- **Globalt meny** – Inspirasjon, Tips & Råd, Merker, Kundeservice
- **Sokeikon** – topp-nivå søk (glo alt, ikke innhold-spesifikt)

### Innholdskonstruksjon
- **Monoarkikturelle artikler** – isolerte, ikke del av flutesekvens
- **Fokusert CTA** – "Kjøp maling", "Kjøp produkt", "Book konsulent"
- **Seriff-typografi** – klassisk/elegant stil
- **Beige/krem bakgrunn** – merkegull/varmt tema

### Manglande funksjonalitet
- **Ingen innholdshub-dynamikk** – filtrering, søk, sortering begrenset
- **Ingen relatert innhold-seksjon** – "du kanskje også interessert i..."
- **Ingen sosial proof** – anmeldelser, kommentarer, synlighetsbevis
- **Nei til tagger** – no visible keywords, topics, metadata
- **Tidak ada in-content linking** – lenker til andre relevante artikler/produkter
- **Ingen bruker-interaksjon** – deling, lagring, liker, bookmarks

---

## Krysskoblinger til Produkter/Farger

### Inspirasjon → Handel
- **Årets Farge-artikkel**: "Kjøp maling"-knapp → produkt-PDP
- **Fargekart**: PDF-lenker (trolig nedlastbar eller link-format, ikke direkte e-handel)

### Tips → Handel
- **Tips-artikkel**: Integrert produktboks med pris og "Kjøp"/"Klikk og hent"-CTA
- **Produkt-navn i tekst**: "Baron Terrassebeis" nevnt, men ikke hyperlinket
- **Relaterte produkter**: "Jordan Easypad" nevnt, ikke lenket

### Handelomvendt inngang?
- **Produkter → Inspirasjon**: Ikkje dokumentert på analyserte sider
- **Merker → Tips/Inspirasjon**: Ikkje dokumentert
- **Potensielt gap**: Ingen breadcrumb-stil integrering fra PDP til relevante inspirasjon/tips

---

## SEO

### Meta-tags observert
- **Title tags**: Eksempel: "Årets Farge 2026 | Fargerike" (produktnavn + merkenavn)
- **Title tags**: "Beise terrassen, plattingen - Gjør det selv | Fargerike" (action-verb + brand)
- **URL-struktur**:
  - Inspirasjon: `/inspirasjon/{kategori}/{artikkel-slug}/`
  - Tips: `/tips-rad/{underkategori}/{artikkel-slug}/`

### Schema/Structured data
- Ikkje eksplisitt observert i tekst-extract
- Trolig: `Article`, `Product`, `BreadcrumbList` (standard for e-handel)

### Søkemotorkandidater
- "Fargekart Lady" (PDF-nedlastinger)
- "Beise terrassen" (how-to queries)
- "Årets farge 2026" (trend-søk)
- "Interiørinspirering" (discovery)

---

## Mangler og Muligheter

### Innholdsoppdagelse
- [ ] **Fulltekstsøk på hub-nivå** – "Søk etter inspirasjon", "Søk etter tips"
- [ ] **Dynamisk filtrering** – e.g., "Fargekart etter merke + år", "Tips etter rom + produkt-type"
- [ ] **Sortering** – Nyeste, populæreste (basert på view-count), mest relevant
- [ ] **Innholdsbilder/teasere** – miniaturer, beskrivelse-snippet på hub-lister

### Relatert innhold
- [ ] **"Du kanskje også interessert i"** – basert på rom, farge, produkt, stil
- [ ] **Innholdsklustring** – "Flere tips om terrasse", "Flere farger i blåfamilien"
- [ ] **Seksjonalisering på artikkel** – "Les også: [3 related articles]"

### Krysskoblinger
- [ ] **Tips ↔ Produkt-integrasjon** – "Kjøp Baron Terrassebeis" som lenke, ikke bare tekst
- [ ] **Inspirasjon → Produktlister** – "Ekte rom basert på denne fargen" med innkommende lenker fra PDP
- [ ] **Inspirasjon → Tips** – "Se tips for å implementere denne fargen"
- [ ] **Produktanbefalinger basert på rom/farge** – algoritme-driven "se også"

### Brukerengasjement
- [ ] **Deling på sosiale medier** – knapper for Pinterest, Instagram, Facebook
- [ ] **Lagre til ønskeliste** – "Lagre denne inspirasjonen"
- [ ] **Brukergenerert innhold** – "#Min Havperle terrasse" GC-kampanjer
- [ ] **Kommentarer** – "Hva synes du om denne fargen?"
- [ ] **Rating** – "Er denne tipsartikkelen nyttig?" (helpful/not helpful)

### Teknisk & UX
- [ ] **Responsive fargekart** – PDF-viewer med zoom, ikke bare nedlasting
- [ ] **Video-transkripsjoner** – tekst-alternativ til tips-videoer (a11y, SEO)
- [ ] **Destinasjon-linking** – "Se denne fargen på alle rom-typer"
- [ ] **Fargepalett-eksport** – "Eksporter denne kombinasjonen som CSV/JSON"

### Innholdsstruktur
- [ ] **Oppdateringsfrekvens** – "Sist oppdatert: 2026-03-15"
- [ ] **Forfatter/kreditt** – "Av [interørkonsulent]" (tillit)
- [ ] **Vanskelighetsgrad på tips** – "Anfanger", "Erfarent", "Profesjonell"
- [ ] **Estimert tid** – "5 min lesing", "2 timer gjennomføring"
- [ ] **Material-liste** – Downloadbar PDF/printer-friendly for tips

---

## Oppsummering av As-is Status

| Aspekt | Status | Kommentar |
|--------|--------|-----------|
| **Innholdsoppdagelse** | Begrenset | Kun statiske kategorier, ingen søk/filtrering |
| **Krysskoblinger** | Svak | Tips → Produkt OK, Inspirasjon → Handel OK, men omvendt svak |
| **Relatert innhold** | Nei | Ingen "mer som dette" eller clustering |
| **Brukerengasjement** | Nei | Ingen deling, lagring, rating |
| **Responsivitet** | Ja | Designet ser mobil-vennlig ut |
| **Video** | Ja | Innebygd YouTube (tips) |
| **Produkt-integrering** | Delvis | Pris og CTA på tips, men svakt merke |
| **SEO** | Standard | Meta-tags OK, structured data trolig OK |
| **Innholdsstruktur** | Konservativ | Ingen metadata (forfatter, tid, vanskelighetsgrad) |

Fargerike har **funksjonelt, statisk innholdsekosystem** som **fungerer for merkevarehistorie** (inspirasjon-driven), men **mangler innholdsoppdagelse** (søk, filtrering, clustering) som ville gjøre det til en **tru innholdshub**.
