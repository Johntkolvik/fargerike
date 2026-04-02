# Butikk & Tjenester – As-Is State (2026-03-25)

## Dokumentasjon av dagens tilstand på fargerike.no

Denne dokumentasjonen viser den nåværende implementasjonen av butikkfinner, butikkprofiler, og tjenestesider på Fargerike. Analysert av UX-analytiker via Chrome.

---

## 1. Analyserte sider

### 1.1 Butikkfinner-hub
- **URL:** https://www.fargerike.no/fargehandel/
- **Ikon:** Tjenester butikk
- **Funksjon:** Listevisning av butikker med grunnleggende informasjon

### 1.2 Butikkprofil (eksempel: Oslo Majorstuen)
- **URL:** https://www.fargerike.no/[butikk-slug]/
- **Mønster:** Individuell side per butikk
- **Funksjon:** Detaljert butikkinformasjon, booking-funksjonalitet

### 1.3 Butikkprofil (eksempel: Tromsø)
- **URL:** https://www.fargerike.no/[butikk-slug]/
- **Mønster:** Identisk struktur som andre butikkprofiler
- **Funksjon:** Lokale kontaktdetaljer og tjenestebooking

### 1.4 Tjeneste-hub
- **URL:** https://www.fargerike.no/tjenester/
- **Ikon:** Tjenester butikk
- **Funksjon:** Oversikt over tjenestekategorier

### 1.5 Butikktjeneste-side (eksempel: Gulvsliper)
- **URL:** https://www.fargerike.no/tjenester-butikker/gulvsliper/
- **Ikon:** Tjenester butikk
- **Funksjon:** Detaljert informasjon om spesifikk tjeneste

---

## 2. Butikkfinner-hub (/fargehandel/)

### 2.1 Sidestruktur

**Navigasjon:**
- Breadcrumb: Fargerike > Fargehandel
- Backlink: "← Fargehandel" (navigerer tilbake)

**Header:**
- Tittel: "Fargehandler"
- Ingress: Introduksjonstekst om Fargerike sin rolle som fargekjede med lokale butikker

### 2.2 Innholdelement

**Butikkliste:**
Tabellformat med følgende kolonner:
- Butikknavn (som lenke til butikkprofil)
- Adresse
- Telefonnummer
- Åpningstider

**Listede butikker (eksempler fra observasjon):**
- Oslo Kiellands Plass
- Alta
- Askøy
- Arendal
- (+ flere som ikke dokumentert i detalj)

### 2.3 Innholdstyper

**Butikkinformasjon per rad:**
- Navn (lenke)
- Gate/adresse
- Postnummer og by (kombinert)
- Telefon (klikbar, tel:-link)
- Åpningstider (tekstformat, eks. "Mandag-fredag: 09:00 - 18:00")

### 2.4 Interaksjon

- Navn er klikbare lenker til individuell butikkprofil
- Telefonnummer åpner tel:-link i mobil
- Ingen synlig søk, filter eller geolokalisering observert

---

## 3. Butikkprofil (/butikk-slug/)

### 3.1 Eksempel: Oslo Majorstuen

**URL-mønster:** https://www.fargerike.no/oslo-majorstuen/

**Navigasjon:**
- Breadcrumb: Fargerike > Fargehandel > [Butikknavn]

### 3.2 Innholdsmodell – Kontaktinformasjon

**Header:**
- Butikknavn: "Oslo Majorstuen"

**Kontaktdetaljer:**
- Telefon: 95 40 60 10
- E-post: majorstuen@fargerike.no
- Adresse: Sørkedalsveien 10, 0369 Oslo

**Åpningstider:**
Dagvis format:
- Mandag - fredag: 09:00 - 18:00
- Lørdag: 10:00 - 16:00
- Søndag: Stengt

### 3.3 Funksjonalitet

**CTA-knapp:**
- "Book interiørkonsulent" (oransje knapp)
- Tekstbeskrivelse: "Trenger du hjelp til fargevalg? Vi tilbyr gratis interiørkonsultasjon"

**Sosiale medier:**
- Facebook-lenke
- Instagram-lenke

### 3.4 Medieelement

- Butikkfoto: Interiørbilde som viser fargeprøver/fargekart på veggen

### 3.5 Eksempel: Tromsø

**URL-mønster:** https://www.fargerike.no/tromso/

**Kontaktdetaljer:**
- Telefon: +47 77686615
- E-post: tromso@fargerike.no
- Adresse: Storgata 142, 9008 Tromsø

**Åpningstider:**
- Mandag - fredag: 09:00 - 18:00
- Lørdag: 10:00 - 15:00
- Søndag: Stengt

**CTA:** "Book interiørkonsulent" (identisk som andre profiler)

**Sosiale medier:** Facebook og Instagram-lenker

---

## 4. Tjeneste-hub (/tjenester/)

### 4.1 Sidestruktur

**Header:**
- Ikon: Tjenester butikk
- Tittel: "Tjenester"
- Ingress: "Våre fagfolk hjelper deg"

**Navigasjon:**
- Breadcrumb: Fargerike > Tjenester

### 4.2 Tjenestekategorier

Listet opp som clickable kort/kategorier:

1. **Fagekspert**
   - Beskrivelse: Ekspertråd fra fagfolk

2. **Interiørkonsulent**
   - Beskrivelse: Gratis konsultasjon for fargevalg

3. **Hjemmebesøk**
   - Beskrivelse: Vi besøker deg hjemme for fargekonsultasjon

4. **Produktvelger**
   - Beskrivelse: Personlig produktanbefaling

5. **Kundeklubb**
   - Beskrivelse: Medlemskap med fordeler

6. **Gavekort**
   - Beskrivelse: Kjøp gavekort

7. **Hjemlevering**
   - Beskrivelse: Leveringsmuligheter

### 4.3 Innholdsmodell

Hver tjeneste vises som:
- Titel
- Kort beskrivelse
- Link til detaljside (implisitt gjennom kort-klikk)

---

## 5. Butikktjeneste-side (/tjenester-butikker/[tjeneste]/)

### 5.1 Eksempel: Gulvsliper

**URL:** https://www.fargerike.no/tjenester-butikker/gulvsliper/

**Navigasjon:**
- Breadcrumb: Fargerike > Tjenester butikk > Gulvsliper
- Backlink: "← Tjenester butikk"

### 5.2 Innholdsmodell

**Header:**
- Ikon: Tjenester butikk
- Tittel: "Gulvsliper"
- Ingress: "Vi har gulvsliper til utleie"

**Brødtekst:**
- "Flere typer gulv kan fornyes ved å slipes ned. Hos Fargerike kan du leie gulvsliper, og fornye det du allerede har."

**Detaljbeskrivelse:**
- "Verken riper, hakk og nedslitt gulv er er pent eller lett å rengjøre. Men du trenger ikke bytte ut gulvet av den grunn. Lei en gulvsliper av oss, slip ned og forny med lakk og gulvet blir nytt og lekkert."

**CTA:**
- "Ta kontakt med oss i butikken" (blå understreket lenke)

### 5.3 Struktur

- Lineær, tekstfokusert layout
- Ingen bildeelement på denne siden
- Ingen filtrer eller dynamisk innholdslisting
- Direkte "kontakt butikk"-instruks, ikke online-booking

---

## 6. Datamodell – Felttype dokumentasjon

### 6.1 Butikkprofil-felt

| Felt | Type | Eksempel | Obligatorisk |
|---|---|---|---|
| Navn | String | "Oslo Majorstuen" | Ja |
| Slug | String | "oslo-majorstuen" | Ja |
| Adresse | String | "Sørkedalsveien 10, 0369 Oslo" | Ja |
| Telefon | String | "95 40 60 10" | Ja |
| E-post | String | "majorstuen@fargerike.no" | Ja |
| Åpningstider | Object[] | `[{dag: "Mandag-fredag", åpen: "09:00", lukket: "18:00"}]` | Ja |
| Butikkfoto | Image | (interiørbilde) | Nei |
| Instagram-URL | String/URL | Link til Instagram-profil | Nei |
| Facebook-URL | String/URL | Link til Facebook-side | Nei |

### 6.2 Tjeneste-felt

| Felt | Type | Eksempel | Obligatorisk |
|---|---|---|---|
| Navn | String | "Interiørkonsulent" | Ja |
| Slug | String | "interiorkonsulent" | Ja |
| Kort beskrivelse | String | "Gratis konsultasjon for fargevalg" | Ja |
| Lang beskrivelse | Text/RichText | Full beskrivelse på tjenesteside | Ja |
| Ikon | Image | "Tjenester butikk"-ikon | Ja |

### 6.3 Datakilde

**Butikkdata:**
- Kilde: Sannsynlig Pinmeto eller Lindback (nevnt i tech stack)
- Integrasjon: Ikke tydelig fra frontend
- Oppdateringshyppighet: Ukjent

**Tjenesteinformasjon:**
- Kilde: Sannsynlig Sanity CMS
- Struktur: Manuelt redigert innhold

---

## 7. Funksjonalitet – Observert adferd

### 7.1 Butikkfinner (/fargehandel/)

**Søk og filtrering:**
- ❌ Ingen søkefunksjonalitet observert
- ❌ Ingen geografisk filtrering (by, fylke)
- ❌ Ingen avstandssortering
- ❌ Ingen geolokalisering ("Finn nærmeste butikk")
- ✅ Statisk liste over alle butikker

**Visningsformat:**
- ✅ Tabellformat (eller liste)
- ✅ Navn klikbare (lenker til profil)
- ✅ Telefon klikbar (tel:-link)

**Navigasjon:**
- ✅ Breadcrumb (Fargerike > Fargehandel)
- ✅ Backlink

### 7.2 Butikkprofil (/butikk-slug/)

**Innholdsvisning:**
- ✅ Kontaktdetaljer (navn, adresse, tlf, e-post)
- ✅ Åpningstider (dagvis format)
- ✅ Butikkfoto
- ✅ Sosiale medilenker

**Booking/Kontakt:**
- ✅ CTA-knapp "Book interiørkonsulent"
- ❌ Ingen online booking-form synlig
- ❌ Ingen chatbot eller live-chat
- ❌ Ingen tjenester-listing (hvilke tjenester butikken tilbyr)
- ❌ Ingen ansattlisting (terapeuter, konsulenter)

**Kart:**
- ❌ Ingen interaktivt kart observert

### 7.3 Tjeneste-hub (/tjenester/)

**Innholdsvisning:**
- ✅ Tjenestekategorier listet
- ✅ Kort beskrivelse per tjeneste
- ✅ Lenker til detaljsider

**Filtrering:**
- ❌ Ingen filtrering etter butikk
- ❌ Ingen søk

### 7.4 Butikktjeneste-side (/tjenester-butikker/[tjeneste]/)

**Innholdsvisning:**
- ✅ Tjenestebeskrivelse (kort + lang)
- ✅ Ikon

**Handling:**
- ⚠️ "Ta kontakt med oss i butikken" (vag CTA, ingen online-booking)
- ❌ Ingen liste over butikker som tilbyr tjenesten
- ❌ Ingen booking-funksjonalitet
- ❌ Ingen pris-informasjon

---

## 8. Mangler og muligheter

### 8.1 Butikkfinner (vs. FRS spec + best practice)

**Kritiske mangler:**
1. **Geolokalisering** – Ingen "Finn nærmeste butikk" basert på brukerens lokasjon
2. **Søk og filtrering** – Ingen mulighet til å søke etter butikk på navn eller by
3. **Interaktivt kart** – Ingen kartnavn med pinpoints
4. **Avstandssortering** – Ikke mulig å sortere på avstand fra bruker
5. **Tjeneste-filter** – Ingen filtrering etter hvilke tjenester butikken tilbyr

**Forslag:**
- Implementer Algolia-basert søk på butikknavn/adresse
- Legg til Google Maps eller Mapbox-integrering
- Legg til geolokalisering med "Finn nærmeste butikk"-CTA
- Vis tjenestegruppering (hvilke tjenester hver butikk tilbyr)

### 8.2 Butikkprofil

**Kritiske mangler:**
1. **Ansattlisting** – Ingen oversikt over terapeuter/konsulenter på stedet
2. **Tjeneste-tilgjengelighet** – Ikke tydelig hvilke tjenester butikken tilbyr
3. **Åpningstider-detalj** – Ingen merknad om spesielle lukkedager, ferieperioder
4. **Kart-integrasjon** – Ingen embedded kart
5. **Booking-funksjonalitet** – "Book interiørkonsulent"-knappen leder ikke til online-booking
6. **Lagerinfo** – Ingen info om produktkategorier på lager
7. **Bilder** – Kun ett butikkfoto

**Forslag:**
- Legg til ansatt-kort med navn, spesialisering, bilde
- Integrer online-booking-system for interiørkonsulent
- Legg til Google Maps embedded
- Vis hvilke tjenester butikken tilbyr (badge-styling)
- Legg til galeri med flere butikkbilder

### 8.3 Tjeneste-hub

**Mangler:**
1. **Knyttingr til butikk** – Ikke klart hvilke butikker tilbyr hver tjeneste
2. **Pris-informasjon** – Ingen prisdetaljer
3. **Booking-integrasjon** – Ingen link til online-booking
4. **Tilgjengelighetsinfo** – Ingen info om om tjenesten er tilgjengelig i alle butikker

**Forslag:**
- Link til "finn butikk som tilbyr denne tjenesten"
- Legg til pris eller "kontakt for pris"
- Integrer med booking-system

### 8.4 Butikktjeneste-side

**Kritiske mangler:**
1. **Butikk-mapping** – Ingen liste over butikker som tilbyr tjenesten
2. **Booking-funksjonalitet** – Bare "ta kontakt", ikke online booking
3. **Pris/tilgjengelighet** – Ingen prisinfo eller booking-tilgjengelighet
4. **Medieinnhold** – Tjenesten "Gulvsliper" mangler illustrativt bilde

**Forslag:**
- Legg til "Booknå" eller "Finn butikk som tilbyr denne tjenesten"-knapp
- Integrer online-booking-system
- Vis pris eller "kontakt for prising"
- Legg til illustrativt bilde/video av tjenesten

---

## 9. Datakilde-analyse

### 9.1 Butikkdata (Pinmeto/Lindback)

**Antatte felt synlig i frontend:**
- Butikknavn
- Adresse (gateadresse, postnummer, by)
- Telefon
- Åpningstider (dagvis struktur)
- Lokasjonkoordinater (implisitt, ikke synlig)

**Ikke synlig på frontend:**
- Lager-inventar
- Ansatt-oversikt
- Tilbud/kampanjer
- Sosiale medier-handles (Instagram, Facebook – mulig hardkodet eller Sanity)

### 9.2 Tjenesteinformasjon (Sanity CMS)

**Antatte felt:**
- Tjeneste-navn
- Slug
- Kort beskrivelse
- Lang beskrivelse/brødtekst
- Ikon
- Butikkknyttinger (ikke synlig i UI, men sannsynlig strukturert)

---

## 10. Navigasjon og informasjonsarkitektur

### 10.1 Sitekart (observert struktur)

```
Fargerike.no
├── Fargehandel (/fargehandel/)
│   ├── [Butikknavn] (/oslo-majorstuen/)
│   ├── [Butikknavn] (/tromso/)
│   └── [...]
├── Tjenester (/tjenester/)
│   └── [Tjeneste] (/tjenester-butikker/gulvsliper/)
│       ├── Gulvsliper
│       └── [...]
└── [Andre sider]
```

### 10.2 Breadcrumbs

**Butikkfinner:**
- Fargerike > Fargehandel

**Butikkprofil:**
- Fargerike > Fargehandel > Oslo Majorstuen

**Tjeneste-hub:**
- Fargerike > Tjenester

**Butikktjeneste:**
- Fargerike > Tjenester butikk > Gulvsliper

**Observasjon:** Inkonsistent bruk av "Tjenester" vs "Tjenester butikk" i breadcrumb-tekst.

---

## 11. Sammenfatning

### 11.1 Styrker i nåværende implementasjon

- ✅ Klar informasjonsarkitektur (Butikker vs Tjenester)
- ✅ Enkel tilgang til kontaktinformasjon
- ✅ Sosiale medilenker
- ✅ Responsive design (observert på screenshot)
- ✅ Klikbar telefon (tel:-link)

### 11.2 Kritiske huller (vs. FRS spec)

1. **Butikkfinner-funksjonalitet** – Mangler geolokalisering, søk, filtrering, kart
2. **Tjeneste-booking** – Ingen online-booking integrasjon
3. **Butikk-tjeneste-mapping** – Ikke klart hvilke butikker tilbyr hvilke tjenester
4. **Ansatt-profiler** – Ikke synlige
5. **Kart-integrasjon** – Mangler Google Maps/Mapbox

### 11.3 Estimert maturity

**Nåværende nivå:** MVP / Early stage
- Grunnleggende informasjonsvisning fungerer
- Booking og søk er ikke implementert
- Datakilde-integrasjon (Pinmeto/Lindback) er sannsynlig, men ikke optimalisert

**For å nå "production ready":**
- Implementer Algolia-søk (butikk + tjenester)
- Integrer online-booking-system
- Legg til geolokalisering og interaktivt kart
- Strukturer "butikk ↔ tjeneste"-relasjoner i Sanity
- Legg til ansatt-profiler
- Implementer click-and-collect-integrasjon med Omnium

---

## 12. Teknisk gjeld og rekommendasjoner

### 12.1 Front-end struktur

**Sannsynlig struktur (Next.js App Router):**
- `/app/fargehandel/page.tsx` – Butikkfinner-hub
- `/app/fargehandel/[slug]/page.tsx` – Butikkprofil
- `/app/tjenester/page.tsx` – Tjeneste-hub
- `/app/tjenester-butikker/[slug]/page.tsx` – Butikktjeneste-side

**Observerte komponenter:**
- BreadcrumbNav
- StoreCard / StoreTable
- ContactInfo
- OpeningHours
- SocialLinks
- CTA-buttons

### 12.2 Data-integrasjon

**Anbefalt flow:**
1. **Butikkdata:** Pinmeto/Lindback API → Sanity (sync daglig) → Frontend (ISR/revalidate)
2. **Tjenesteinformasjon:** Sanity CMS → Frontend (ISR)
3. **Søk:** Butikk + tjenester → Algolia index → Frontend (InstantSearch)
4. **Booking:** Online-booking-tjeneste (TBD) → Frontend (iframe eller modal)
5. **Kart:** Google Maps API → Frontend (Embed eller mapsjs-library)

### 12.3 Next phase (fra spec-perspektiv)

Fra `02-krav/frs/store-locator.md` og `02-krav/frs/kjerneflyter-pdp.md`:
- [ ] Implementer Algolia-basert butikkfinner med geolokalisering
- [ ] Legg til interaktivt kart (Google Maps)
- [ ] Integrer online-booking for interiørkonsulent
- [ ] Strukturer "butikk ↔ tjeneste"-relasjoner
- [ ] Implementer click-and-collect-flow fra produktside

---

**Dokumentert:** 2026-03-25
**Analysert av:** UX-analytiker via Claude in Chrome
**Versjon:** 1.0 (As-Is snapshot)
