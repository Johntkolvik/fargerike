# As-is PRD: Forside, Søk & Kundeservice

**Dokumentasjonsdato:** 2026-03-25
**Status:** Analyse av nåværende tilstand (as-is)
**Opprettelse:** UX-analyse av www.fargerike.no

---

## 1. Forsiden (/)

### 1.1 Header & Navigasjon

**Header-struktur:**
- **Top banner:** "Book interiørkonsulent - raskt og enkelt" (tjenestebooking CTA)
- **Logo:** Fargerike-logo, sentrert
- **Top-right nav:**
  - Kundeklubb-lenke (gammel UI, oransje knapp)
  - Inspirasjon-lenke
  - Tips & Råd-lenke
  - Søk-bar (med ikon, placeholder "Søk her")
  - Handlevogn (med itemteller, viser 21)
  - Min side-link

**Hovedmeny (8 kategorier):**
1. FARGER (mega-menu med fargefilter)
2. GULV
3. TAPET
4. INTERIØRMALING
5. UTEMALING
6. MALINGSVERKTØY
7. VERKTØY & TILBEHØR
8. VASK & RENGJØRING
9. SE MER (accordion)

**Farge-megameny:** 15+ fargenavn listet (Beige, Blå, Hvit, Grå, Brun, Sort, Turkis, Rosa, Lilla, Gul, Oransje, Rød, Grønn, + "Årets farge 2026")

### 1.2 Hero-seksjonen

**Headline:** "Velkommen til gulvdager"
**Subheading:** Ingen subtekst
**Hero-bilde:** Stueinteriør med hvite/beige farger, tekstiler, planter
**Primary CTA:**
- Knapp: "Se alle gulv til kampanjepris" (beige/gyllen farge)

**Campaign-teaser (4 bokser under hero):**
1. "LAST OPP ET BILDE, OG SE FORANDRINGEN" → Roomvo-tool
2. "-20% PÅ ALLE VEGG-TIL-VEGG TEPPER"
3. "LAMINATGULV FRA KUN 179.- PR. M2"
4. "BOOK INTERIØRKONSULENT"

### 1.3 Innholdseksjoner (under hero)

Basert på JS-analyse, forsiden inneholder:
- Produktkategorier-seksjoner
- Produkter (paints, tools)
  - Eksempler: "Jordan Malepute Rolling Pad Perfect" (119 kr), "Yachting Vinyl Primer" (fra 249 kr)
- Farger-showcase
  - Eksempel: "Soothing beige" (JOTUN 12075)
- Inspirasjonsseksjoner
  - "Holdbart med laminatgulv"
  - "Legge klikkvinyl eller korkgulv"
  - "Mars - Eklektisk nos[...]"

### 1.4 Globalt footer

**Kolonner i footer:**
1. **Produktkategorier:** Gulv, Tapet, Farger, Malingsverktøy, Interiørmaling, Eksteriørmaling
2. **Inspirasjon:** Rom, Farger, Fargekart, Hjemme hos, Årets Farge
3. **Tips & Råd:** Male ute, Male inne, Tapetsere, Legge gulv
4. **Få hjelp:** Chat med oss, Finn din butikk, Kundeservice, Bestill hjemmbesøk
5. **KUNDESERVICE:** Frakt og levering, Retur og reklamasjon, Presserom
6. **OM FARGERIKE.NO:** Personvern, Kjøpsbetingelser, Endre Cookie-innstillinger

**Alle footer-lenker:** 20+ lenker, organisert i 6 kolonner

### 1.5 Eksisterende sekundære CTAer

- Søk (header)
- Handlevogn (header, viser count)
- "Se film"-lenker (på produktkort)
- "Kjøp"-knapp (på produkter)
- "Vis mer"-knapper (for mer innhold)

---

## 2. Søk (/sok/)

### 2.1 Søkeside-layout

**Heading:** "Søk i farger, maling, gulv og utstyr | Fargerike" (page title)

**Søkefeltet:**
- Input: `<input type="search" placeholder="Søk her">`
- Ikon: Søkelupe
- Plassering: Header (samme som forside)
- Atferd: **Smart redirect** – når jeg søkte "maling", ble jeg tatt til produktside (ikke resultatside), som indikerer intelligente resultatredireksjoneringer

### 2.2 Søkeside innholdsstruktur (empty state / default view)

**Fire kolonner:**

**Kolonne 1: Produktkategorier**
- Gulv
- Tapet
- Farger
- Malingsverktøy
- Interiørmaling
- Eksteriørmaling

**Kolonne 2: Inspirasjon**
- Rom
- Farger
- Fargekart
- Hjemme hos
- Årets Farge

**Kolonne 3: Tips & Råd**
- Male ute
- Male inne
- Tapetsere
- Legge gulv

**Kolonne 4: Få hjelp**
- Chat med oss
- Finn din butikk
- Kundeservice
- Bestill hjemmbesøk

### 2.3 Søkefunksjonalitet

**Observasjoner:**
- Søk ser ut til å være **client-side eller intelligent routing** (ikke tradisjonell SERP)
- Søk på "maling" redirectet til `/maling/ute/tre-og-fasade-/drygolin-nordic-extreme/` (spesifikt produkt eller kategori)
- Indikerer **kategori-intelligens** eller **Algolia Recommend** integrasjon
- Ingen synlig **autocomplete-dropdown** dokumentert (men finnes antakelig)
- Ingen **filter/facets** synlig på standardsøkesiden

---

## 3. Kundeservice (/kundeservice/)

### 3.1 Kundeservice-hub layout

**Heading:** "Hva kan vi hjelpe deg med?"

**9 Topic Cards (grid layout, 3x3):**

**Rad 1:**
1. **Frakt og levering** (lightgray boks, klikk for detaljer)
2. **Retur og reklamasjon** (lightgray boks)
3. **Kontakt oss** (lightgray boks)

**Rad 2:**
4. **Miljø og bærekraft** (lightgray boks)
5. **Kjøpsbetingelser og vilkår** (lightgray boks)
6. **Personvern** (lightgray boks)

**Rad 3:**
7. **Informasjonskapsler** (lightgray boks)
8. **Om Fargerike** (lightgray boks)
9. **Presserom** (lightgray boks)

**Rad 4 (extra):**
10. **Medlemsvilkår** (lightgray boks)

### 3.2 Kundeservice-struktur

**Observasjoner:**
- Hub-modell (akkordionlister eller linksamlinger)
- Alle 10 topics har sin egen underside
- Fokus på: frakt, retur, miljø, juridisk info, personvern
- **Manglende:** Live chat widget synlig på denne siden (nå i "Få hjelp" footer)
- **Manglende:** FAQ-søk eller direkte spørsmål-svar interface

---

## 4. Navigasjon (Global)

### 4.1 Header-navigasjon

| Element | Type | Status |
|---------|------|--------|
| Logo | Klikk til forside | Aktiv |
| Søk | Search input | Aktiv (smart redirect) |
| Handlevogn | Icon + counter | Aktiv |
| Kundeklubb | CTA-knapp (oransje) | Aktiv |
| Inspirasjon | Lenke | Aktiv |
| Tips & Råd | Lenke | Aktiv |
| Min side | Link | Aktiv |
| Hovedmeny (8 kategorier) | Mega-menu | Aktiv |

### 4.2 Footer-navigasjon

- 6 kolonner
- 20+ lenker
- Organisert etter tema (kategorier, inspirasjon, hjelp, info)
- Alle footer-lenker peker til subdomains eller /kundeservice/* paths

### 4.3 Breadcrumb

- Synlig på produktsider (f.eks. "Maling / Utemaling / Tre & fasade")
- Mulig IKKE synlig på forsiden

---

## 5. Innhold & Marketing

### 5.1 Kampanjer (observert)

1. **Gulvdager** - Hero-kampanje
   - Fokus: Laminatgulv, 179 kr/m2
   - Tepper: -20% rabatt

2. **Årets Farge 2026** - Fargenavigation
   - "Soothing beige" (JOTUN 12075)

3. **Interiørkonsulent**
   - Book-CTA i header
   - Booking-sistem (Calendly/lignende?)

4. **Roomvo-integrasjon**
   - Bildeupload-tool (fargesimuler i stue)
   - "Start Roomvo" link i header

### 5.2 Content-seksjoner (observert)

- Farger (showcase)
- Malinger (produkt-grid)
- Gulv (produkt-grid + inspirasjon)
- Tapet (produkt-grid)
- Instruksjons-videoer ("Se film")
- Tips & Råd-artikler

---

## 6. SEO & Metadata

### 6.1 Observerte Meta Tags

- **Forside Title:** "Fargehandel - Maling - Gulv - Inspirasjon | Fargerike"
- **Søk Title:** "Søk i farger, maling, gulv og utstyr | Fargerike"
- **Kundeservice Title:** "Kundeservice - Hva kan vi hjelpe deg med? | Fargerike"

### 6.2 Struktur

- Keyword-rik titles (emojis IKKE brukt)
- Logisk URL-struktur (`/sok/`, `/kundeservice/`, `/maling/[...]/[produkt]/`)
- Breadcrumbs implementert (på produkt-sider minst)

---

## 7. Mangler & Muligheter

### 7.1 Søk-siden

**Mangler:**
- [ ] Ingen synlig **autocomplete-dropdown** ved søk-input (burde vise forslag mens man skriver)
- [ ] Ingen **filter/facets** på søkesiden (f.eks. pris, merke, farge, kategori)
- [ ] Ingen **SERP-layout** – søk redirecter direkte istedenfor å vise resultatside
- [ ] Ingen **trending searches** eller **populær søk**-seksjoner
- [ ] Ingen **"Did you mean"** for stavefeil
- [ ] Ingen **search analytics** synlig (f.eks. "100+ resultater for 'maling'")

**Muligheter:**
- Implementer Algolia InstantSearch med autocomplete
- Faceted search (pris, farge, NCS-verdi, stemning, merke)
- Søk-resultatside med grid-layout + sidebar filters
- Søkeanlyse dashboard for markedsføring

### 7.2 Forsiden

**Mangler:**
- [ ] Ingen **personalisering** (f.eks. "basert på dine tidligere søk")
- [ ] Ingen **prosjektverktøy**-inngang (planlegging, budsjett)
- [ ] Ingen **reviews/testimonials**-seksjoner
- [ ] Ingen **nylig besøkte produkter** (hvis ikke innlogget i "Min side")
- [ ] Ingen **"Las Fargerike"-kampanje** (brand storytelling)
- [ ] Ingen **call-to-action for Kundeservice Chat** på forsiden (må scrolle til footer)

**Muligheter:**
- Legg CTA for "Chat med oss" i header eller hero
- Personalisert produktboks: "Sist du kikket på..."
- Prosjektplanlegger (inngang: "Start prosjekt")
- Inspirasjonsseksjoner med content-linking (Sanity + Algolia Recommend)
- Before/after fargesimulatorer

### 7.3 Kundeservice

**Mangler:**
- [ ] Ingen **FAQ-søk** (leting gjennom FAQs)
- [ ] Ingen **live chat** synlig på /kundeservice/ siden selv (må gå til footer)
- [ ] Ingen **case-basert routing** ("Jeg har et problem med..." → spesifikk topic)
- [ ] Ingen **video-tutorials** på servicepage
- [ ] Ingen **ticket-system** for oppfølging

**Muligheter:**
- Implementer Zendesk/Help Scout **live chat** med proaktive triggers
- FAQ-søk på alle service-topics
- Video-tutorials for vanlige emner (f.eks. "Hvordan måle rommet ditt")
- Enkel ticketing etter chat (kunde får epost-oppfølging)

### 7.4 Globalt

**Mangler:**
- [ ] Ingen **mobile megamenu** synlig (bare desktop mega-menu)
- [ ] Ingen **notification banner** (kampanjer, status, urgency)
- [ ] Ingen **sticky footer** for "Still spørsmål" / chat-button
- [ ] Ingen **accessibility-statement** eller **a11y-features** dokumentert

**Muligheter:**
- Responsive mega-menu (hamburger menu for mobil)
- Sticky "Chat med oss"-knapp (lower right corner)
- Kampanjebanner (f.eks. "Gratis frakt over 500 kr")
- Trust badges (f.eks. "Sikker betaling", "Varsel fra Forbrukertilsynet")

---

## 8. Teknisk Observasjoner

### 8.1 Frontend

- **Framework:** Next.js (etter PRD)
- **Responsiv:** Ja (desktop view dokumentert, mobile ikke testet)
- **Performance:** Rask side-loading (innledende scroll var responsiv)
- **Interaktivitet:** Search redirect-funksjonalitet fungerer

### 8.2 Search & Discovery

- **Søk-løsning:** Likely Algolia (antatt fra PRD)
- **Autocomplete:** Antakelig tilstede (ikke observert i denne analyze)
- **Smart redirect:** Søk "maling" → kategori/produkt automatisk

### 8.3 CMS & Content

- **CMS:** Sanity (per PRD)
- **Content-struktur:** Kategorier, produkter, inspirasjon, tips
- **Content-linking:** Ansatt, men ikke testet i detalj

---

## 9. Konklusjon & Prioritet

### Høy prioritet (fase 1-2):
1. Søk-resultatside med autocomplete og filtrer (Algolia InstantSearch)
2. Kundeservice-chat implementering (live chat widget)
3. Prosjektplanlegger-inngang på forside
4. Responsiv mobile-meny

### Medium prioritet (fase 2-3):
1. Personalisering (sist besøkte, anbefalinger)
2. Content-clustering (Algolia Recommend)
3. FAQ-søk på kundeservice
4. Video-tutorials

### Fremtidig (fase 3+):
1. AI-drevet design-konsultasjon
2. Virtuell rom-planlegger
3. AR-fargesimulatorer
4. Automatisk projekt-budget-estimering

---

**Dokumentasjonsstatus:** ✅ Analyse fullført 2026-03-25
