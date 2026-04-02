# Fargerike – Produktvisjon og PRD

## Del 1: Produktvisjon

### Visjon

Fargerike.no skal gå fra å være en utstillingsvindu med 0,1 % konvertering til å bli den digitale forlengelsen av det personlige kundemøtet – der kundene får hjelp til å gjennomføre hele overflateprosjektet, ikke bare kjøpe produkter.

### Strategisk kontekst

Fargerike er en del av Mestergruppen (MG), som standardiserer teknologiplattformen på tvers av alle konsepter – fra Colorama og Systemhus til Byggevarer og Overflatebehandling. Den nye MG-arkitekturen er headless (Next.js, Sanity CMS, Algolia, Centra/Omnium), og flere konsepter er allerede i gang med migrering.

Fargerike står i en særstilling:

- **Gammel plattform:** Episerver (frontend fra 2017), inRiver PIM, Hello Retail – ikke Algolia. API-er fra 2016. Krever spesialiserte EPI-utviklere for selv enkle endringer.
- **Lav digital omsetning:** ~40 MNOK digitalt av ~1 mrd total. 0,1 % konvertering. Unormalt høy bounce rate.
- **Butikkdrevet modell:** 89 medlemseide butikker står for det meste av omsetningen. Digitalt skal drive trafikk til butikk, ikke erstatte den.
- **Unikt verdiforslag:** Personlig service, hjelp gjennom hele prosjektet, lokal tilgjengelighet. Ingen nettaktør kan kopiere dette.

### Hvorfor bygge nytt – ikke brannslukke

Det finnes et reelt alternativ: bruke 6 måneder og hundretusener på CRO-tiltak og feilretting på dagens EPI-plattform. Vi anbefaler mot dette, av tre grunner:

1. **Utviklerkostnad og tilgjengelighet.** EPI-spesialister er dyre og vanskelige å få tak i. Hver endring koster uforholdsmessig mye sammenlignet med en moderne stack.
2. **Teknisk gjeld stopper eksperimentering.** Du kan ikke A/B-teste, personalisere eller iterere raskt på en monolittisk plattform fra 2017. Pengene forsvinner i vedlikehold, ikke verdiskaping.
3. **MG-synergi.** Ved å bygge på MG-plattformen får Fargerike tilgang til et felles designsystem, delte komponenter, Algolia-søk, og et utviklerteam som allerede kjenner stacken. Kostnad per feature faller dramatisk.

Alternativkostnaden ved å vente er høyere enn investeringen i å migrere – fordi hver krone brukt på EPI er tapt verdi den dagen plattformen uansett byttes.

### Produktprinsipper

1. **Butikken først.** Alle digitale flater skal støtte butikkopplevelsen – ikke konkurrere med den. Klikk-og-hent, lokal lagerstatus og booking av konsulenter er viktigere enn ren netthandel.
2. **Fra produkt til prosjekt.** Fargerike selger farger, ikke maling. Den digitale opplevelsen skal hjelpe kunden fra inspirasjon til ferdig resultat – inkludert kalkulatorer, guider og kobling til håndverkere.
3. **Data driver beslutninger.** Vi vet for lite om hvilke kategorier som konverterer digitalt. Plattformen må gi innsikt i konvertering per kategori, segment og kanal fra dag én.
4. **Felles grunnmur, lokal tilpasning.** Bygget på MG-plattformen, men med rom for Fargerikes unike posisjon som faghandel med personlig service.

---

## Del 2: PRD (Product Requirements Document)

### Produktnavn

Fargerike.no 2.0

### Produkteier

Digital/CX-team, Fargerike + TRY

### Målgrupper (fra BMC)

| Segment | Andel | Digital relevans |
|---|---|---|
| Lydhør Amatør | 18 % | Høy. Trenger trygghet og håndholding – digitale guider, chat, booking av konsulent. Betaler +22 % over snitt. |
| Trendy Spendy | 17 % | Høy. Inspirasjonsdrevet. Betaler +32 % per besøk. Krever visuelt sterke flater og personalisering. |
| Diskuterende Dyktig | 14 % | Middels. Vil diskutere med eksperter. Digital rolle: forberede og informere før butikkbesøk. |
| B2B (boligutbyggere, systemhus) | Udefinert | Fremtidig. B2B-portal med innlogging og M3-integrasjon planlegges separat. |

### Mål og suksesskriterier

| Mål | Baseline (i dag) | Mål (12 mnd etter lansering) |
|---|---|---|
| Konverteringsrate (nett) | 0,1 % | 0,8 % |
| Bounce rate | Unormalt høy (est. 65-70 %) | < 45 % |
| Klikk-og-hent-ordrer/mnd | Lav (mangler tall) | +200 % |
| Konsulentbookinger digitalt | ~0 | 50/mnd |
| Tid til produksjonssetting av endringer | Uker (EPI) | Timer (headless) |
| Digital omsetning | ~40 MNOK | 60 MNOK |

### Arkitektur – Målbilde

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│         Next.js (MG designsystem)                │
└──────────────┬──────────────────┬───────────────┘
               │                  │
    ┌──────────▼──────┐  ┌───────▼────────┐
    │   Sanity CMS     │  │   Algolia       │
    │   (innhold,      │  │   (søk, oppdag, │
    │    guider,       │  │    anbefalinger) │
    │    inspirasjon)  │  │                  │
    └──────────┬──────┘  └───────┬────────┘
               │                  │
    ┌──────────▼──────────────────▼────────┐
    │           Commerce / Order            │
    │     Omnium + Lindback POS (butikk)    │
    │     Klarna / Vipps (betaling)         │
    └──────────┬──────────────────┬────────┘
               │                  │
    ┌──────────▼──────┐  ┌───────▼────────┐
    │   PIM             │  │  Logistikk     │
    │   MG Item →       │  │  Bring/Posten  │
    │   (erstatter      │  │                │
    │    inRiver)       │  │                │
    └─────────────────┘  └────────────────┘
```

### Nøkkelendringer vs. dagens plattform

| Komponent | I dag | Nytt |
|---|---|---|
| CMS | Episerver | Sanity (MG-standard) |
| Frontend | EPI-rendret (2017) | Next.js headless |
| PIM | inRiver | MG Item / MG Pris 2.0 |
| Søk & anbefalinger | Hello Retail | Algolia |
| Commerce | Episerver Commerce | Omnium + ny frontend |
| ERP (butikk) | Lindback | Lindback (beholdes) |
| Betaling | Klarna/Vipps | Beholdes |

---

## Faser

### Fase 0: Grunnlag (Q1-Q2 2026) — pågår

Allerede igangsatt via BMC-workshop. Ferdigstill datagrunnlaget.

| Leveranse | Status |
|---|---|
| Omsetning og konvertering per kategori | Planlagt feb 2026 |
| Kartlegging av butikkenes leveranseevne | Q1 2026 |
| Prototype digital kundereise | Q1 2026 |
| Kartlegging «Lokaltallet»-segmentet | Q1 2026 |
| Konkrete CRO-tiltak på dagens nettløsning | Q1-Q2 2026 |

### Fase 1: MVP – Redaksjonell plattform (Q3-Q4 2026, uten lansering)

Får opp arkitekturen og satt redaktører i spill. Migrer innhold og inspirasjon til ny plattform. Sikre at vi kommer i gang, mens øvrige diskusjoner og tiltak rundt produkt og dataflyt ikke blir en blocker.

**Scope:**

- Ny frontend (Next.js) med MG designsystem, tilpasset Fargerike visuell profil
- Sanity CMS for alt redaksjonelt innhold (guider, inspirasjon, kampanjesider, butikksider)
- Algolia søk med produktdata fra eksisterende PIM (midlertidig integrasjon mot inRiver)
- Butikkvelger og lokal lagerstatus
- SEO-migrering (301-redirects, meta, strukturert data) – Fargerike har 69 % organisk trafikk, dette er kritisk
- Fult fokus på AEO og innholdsklynger
- Analytics-oppsett (GA4 + ecommerce events) med konvertering per kategori og segment
- Ev. Booking av interiørkonsulent (enkel Calendly/lignende integrasjon)

**Ikke i scope Fase 1:**

- Ny commerce-motor
- B2B-portal
- Kundeklubb 2.0
- Migrering bort fra inRiver (venter på MG Item)

### Fase 2: Commerce og klikk-og-hent (Q1-Q2 2027)

Ny handelsflyt bygget på Omnium med moderne checkout.

**Scope:**

- Ny handlekurv og checkout (Kustom/Vipps)
- Klikk-og-hent 2.0 med forhåndsbetaling (avhenger av Lindback-avklaring)
- Hjemlevering via Bring
- Kampanjemotor (erstatter dagens Excel→Lindback→EPI-flyt)
- Personalisering og anbefalinger via Algolia Recommend
- Produktsider med kalkulatorer (Eks. malingsmengde, gulv med kapp o.l.)

### Fase 3: Differensiering (Q3 2027+)

Her bygges det som gjør Fargerike unik digitalt.

**Scope:**

- «Mitt prosjekt» – digital prosjektoppfølging der kunden samler inspirasjon, produkter, konsulentavtaler og håndverkerkontakt
- Kundeklubb 2.0 med integrasjon mot Lindback loyalty
- B2B-portal med innlogging og M3-integrasjon
- Lokal butikkprofil med eget innhold (ambassadørmodell)
- Konsultasjonstjeneste som betalt produkt (1 499 kr standardisert)
- Håndverkerformidling (enkel kobling mellom kunde og lokalt nettverk)

---

## Avhengigheter og risikoer

| Avhengighet | Eier | Risiko | Mitigering |
|---|---|---|---|
| MG Item / MG Pris 2.0 erstatter inRiver | Mestergruppen | Tidslinje usikker – kan forsinke Fase 2 | Midlertidig integrasjon mot inRiver i Fase 1 |
| Lindback støtter ikke forhåndsbetaling klikk-og-hent | Fargerike/MG | Blokkerer bedre klikk-og-hent-opplevelse | Avklar med Lindback i Fase 0, alternativ løsning via Omnium |
| 89 butikker med varierende kapasitet | Fargerike operasjon | Sentralt kommunisert verdiforslag skaper feil forventninger | Kartlegg leveranseevne i Fase 0, rull ut trinnvis |
| SEO-migrering | TRY | 69 % av trafikken er organisk – feil her koster dyrt | Dedikert SEO-plan med 301-redirects, overvåking 90 dager etter lansering |
| Budsjettering og investeringsbeslutning hos butikkeierne | Fargerike styre | Medlemseide butikker kan blokkere investering | Business case med ROI-modell, presentasjon på årskonferanse mars/april 2026 |
| Utviklertilgang for EPI i overgangsperiode | TRY/Fargerike | Trenger EPI-utviklere parallelt med bygging av nytt | Minimer endringer på EPI, frys features, kun kritisk vedlikehold |

---

## Hva vi ikke vet (og må avklare i Fase 0)

1. **Hvilke kategorier konverterer digitalt?** Maling, gulv, solskjerming og tapet har helt ulik digital adferd. Uten dette bygger vi i blinde.
2. **Hva koster dagens plattform egentlig?** Kjente lisenskostnader er ~842 kNOK/år (Optimizely 450k, Hello Retail 315k, Lipscore 77k). Estimert totalt 1,2–1,5 MNOK/år inkl. Mailchimp, Intercom, Sharefox, Pinmeto, Leap Tools, NCS m.fl. Mangler: Epinova-timer, eksakte beløp for flere leverandører, og interne timer. Se `04-kilder/2026-03-25_lisenskostnader-oppsummering.md`.
3. **Hva er realistisk klikk-og-hent-volum?** Dagens ordresystem ble bygget ad hoc i 2020. Skaleringsgrensen er ukjent.
4. **Hvordan håndteres kampanjepriser i ny arkitektur?** Dagens flyt (Excel → Lindback → EPI) er feilutsatt. Ny løsning må integrere med MG Pris 2.0.

---

## Anbefalt neste steg

Bruk årskonferansen i mars/april 2026 til å presentere denne visjonen med tre konkrete ting:

1. **TCO-sammenligning:** Hva koster det å drive EPI videre i 2 år vs. å migrere nå? Inkluder utviklerkost, lisenser og tapt verdi.
2. **Prototype:** En klikkbar prototype av den nye kundereisen – fra «jeg skal male stua» til bestilling og henting i butikk.
3. **Fase 1-estimat:** Konkret tilbud på redaksjonell plattform med tidsplan og milepæler.

Poenget er å gi butikkeierne noe håndfast å ta stilling til – ikke enda et strategidokument.
