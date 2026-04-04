@AGENTS.md

# Fargerike – Prosjektinstruksjoner for Claude Code

## Hva dette prosjektet er

Ny nettside for Fargerike (fargerike.no) på headless stack: Next.js, Sanity CMS, Algolia, Omnium.
Prosjektet har et strukturert kravdokumentasjonssystem som er kilden til sannhet for hva som skal bygges.

## Spec-driven development

**Før du skriver kode, les alltid relevant spec først.**

### Dokumenthierarki

```
02-krav/prd/          ← HVA og HVORFOR (produktvisjon, arkitektur, faser)
02-krav/frs/          ← HVORDAN det skal fungere (krav, user stories, designbeslutninger)
02-krav/frs/kjerneflyter-pdp.md  ← END-TO-END FLYTER (steg-for-steg, overganger, state)
```

### Når du bygger en komponent

1. Les relevant FRS-fil(er) under `02-krav/frs/`
2. Les `kjerneflyter-pdp.md` for å forstå hvilken flyt komponenten inngår i
3. Implementer basert på kravene
4. Oppdater status-feltet i FRS fra ❓ til ✅ når kravet er implementert
5. Hvis implementasjonen avviker fra spec (teknisk umulig, bedre løsning funnet), oppdater FRS med begrunnelse i endringsloggen

### Mappestruktur – krav → kode

| FRS-fil | Hva den dekker |
|---|---|
| `pdp-farge.md` | Farge-PDP / kulørside |
| `pdp-produkt.md` | Produkt-PDP (maling, tapet, gulv, utstyr) |
| `pdp-tjeneste.md` | Tjeneste-PDP (booking, konsultasjon) |
| `fargevelger.md` | Fargevelger-komponent (mg-color integrasjon) |
| `plp.md` | Produktlistesider |
| `sok-autocomplete-serp.md` | Søk, autocomplete, resultatside |
| `store-locator.md` | Butikkfinner, butikkprofil, click-and-collect |
| `forside-og-navigasjon.md` | Forside og navigasjon |
| `innhold-og-inspirasjon.md` | Artikler, guider, inspirasjon |
| `kjerneflyter-pdp.md` | Kjerneflyter A/B/C og designbeslutninger |

### Viktige designbeslutninger (les `kjerneflyter-pdp.md` for detaljer)

- Tre PDP-typer: Produkt, Farge, Tjeneste – ulike konverteringsmål
- Fargevelger: grid 3-4 kolonner, bildbaserte swatches, instant search (navn/NCS/hex/stemning)
- Prosjektinngang: livesøk med autocomplete, IKKE wizard
- Utstyranbefalinger: Algolia Recommend, seksjonert (Påføring, Beskyttelse, Klargjøring, Festemiddel)
- Produkt↔Innhold: Algolia Recommend + Sanity-overstyring, content clusters
- «Lagre prosjekt» = ønskeliste → login-strategi
- State management: React context med prosjekt/valg/butikk-objekt

### Krav-IDer

User stories bruker prefix: US-F (farge), US-P (produkt), US-T (trygghet), US-K (kjøp).
mg-color krav bruker prefix: M (must), S (should), N (nice-to-have).
Referer alltid til krav-ID når du implementerer, slik vi bevarer sporbarhet.

## QA etter hver edit

**Kjør alltid QA før commit/deploy.** Vi har brukt for mye tid på å fikse build-feil i produksjon.

Etter kodeendringer, gjør følgende:
1. `npx next build` – verifiser at bygget går igjennom uten feil
2. Sjekk for vanlige Next.js-feller: manglende `"use client"`, `useSearchParams` uten `<Suspense>`, env-variabler som mangler fallback
3. Hvis nye sider/ruter: verifiser at det ikke er konflikter med eksisterende ruter (f.eks. to dynamiske `[slug]`-ruter på samme nivå)
4. Hvis env-avhengig kode: sørg for fallback-verdier så bygget ikke krasjer uten env vars (Vercel-bygg har ikke alltid alle env tilgjengelig)

Ikke push kode som ikke bygger lokalt.

## Teknisk stack

- **Frontend:** Next.js (App Router)
- **CMS:** Sanity
- **Søk:** Algolia (InstantSearch + Recommend)
- **Commerce:** Omnium
- **Farge-API:** mg-color (MG-internt, wrapper rundt Jotun API + NCS)
- **Butikkdata:** Pinmeto, Lindback
- **Anmeldelser:** Lipscore (vurderes)

## Faser

- Fase 0 (Q1-Q2 2026): Fundament, tech-valg, PoC
- Fase 1 (Q3-Q4 2026): Redaksjonell plattform, Farge-PDP, Sanity-innhold
- Fase 2 (Q1-Q2 2027): Commerce, handlekurv, mg-color fullverdig
- Fase 3 (Q3 2027+): Differensiering, prosjektverktøy, AI
