# Fargerike – FRS: Tjeneste-PDP

> Levende dokument. Oppdateres med innsikt fra audit, møter og research.
> Del av PDP-familien: `pdp-produkt.md` | `pdp-farge.md` | `pdp-tjeneste.md`

**Sist oppdatert:** 2026-03-25
**Status:** Tidlig skjelett – tjenester er primært Fase 3
**Fase:** 1 (enkel booking) → 3 (betalt tjeneste, håndverkerformidling)

---

## Kontekst

Fargerikes største differensiator er personlig service – men det finnes i dag ingen digital representasjon av tjenestene. Konsulentbookinger digitalt er ~0. PRD-en definerer tre tjenestemål: gratis interiørkonsultasjon (Fase 1), betalt standardisert konsultasjon til 1 499 kr (Fase 3), og håndverkerformidling (Fase 3).

Tjeneste-PDP er fundamentalt annerledes enn produkt- og farge-PDP: konverteringsmålet er **booking**, ikke handlekurv. Informasjonsbehovet handler om trygghet, forventningsavklaring og sosial bevisføring – ikke tekniske spesifikasjoner.

### Potensielle tjenester

| Tjeneste | Fase | Konverteringsmål | Betalingsmodell |
|---|---|---|---|
| Interiørkonsultasjon | 1 (enkel) → 3 (betalt) | Booking | Gratis → 1 499 kr |
| Fargekonsulent i butikk | 1 | Butikkbesøk/booking | Gratis |
| Fargeprøvebestilling | 1–2 | Bestilling | Gratis / lav kost |
| Håndverkerformidling | 3 | Kontaktforespørsel | TBD |
| Utleieverktøy | 2–3 | Reservasjon | Per dag/time |
| Prosjektplanlegging | 3 | «Mitt prosjekt»-registrering | Gratis |

---

## Krav

### Tjenestebeskrivelse

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Tydelig verdiforslag | Hva får kunden, hva inkluderer tjenesten | Må ha | ❓ |
| Forventningsavklaring | Varighet, forberedelse, hva skjer etterpå | Må ha | ❓ |
| Pris (når relevant) | Tydelig prising, ingen overraskelser | Må ha | ❓ |
| Bilder/video | Vis hva tjenesten innebærer visuelt | Bør ha | ❓ |
| FAQ | Vanlige spørsmål om tjenesten | Bør ha | ❓ |

### Tillit og sosial bevisføring

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Kundehistorier | Eksempler/referanser fra tidligere kunder | Bør ha | ❓ |
| Konsulentprofiler | Vis hvem kunden møter (bilde, erfaring) | Kan ha (Fase 3) | ❓ |
| Anmeldelser | Vurderinger av tjenesten | Kan ha | ❓ |

### Booking og konvertering

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Bookingflyt | Velg butikk → velg tid → bekreftelse | Må ha | ❓ |
| Butikkvelger | Vis tilgjengelige butikker med tjenesten | Må ha | ❓ |
| Kalenderintegrasjon | Tilgjengelige tider fra butikken | Bør ha | ❓ |
| Bekreftelse og påminnelse | E-post/SMS etter booking og før time | Bør ha | ❓ |
| Betaling (Fase 3) | Online betaling ved booking av betalt konsultasjon | Kan ha | ❓ |
| Kontaktskjema (fallback) | For tjenester uten bookingsystem | Må ha | ❓ |

### Lokal tilpasning

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Butikkspesifikk tilgjengelighet | Ikke alle butikker tilbyr alle tjenester | Må ha | ❓ |
| Lokal konsulentinfo | Vis konsulenter per butikk | Kan ha (Fase 3) | ❓ |
| Varierende kapasitet | Håndtere at 89 butikker har ulik digital modenhet | Må ha | ❓ |

### SEO

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Indekserbare tjenestesider | En side per tjeneste, SSR | Må ha | ❓ |
| Lokal SEO | Tjeneste + butikk-kombinasjoner for lokal synlighet | Bør ha | ❓ |
| Strukturert data | Service JSON-LD | Bør ha | ❓ |
| AEO-optimalisert | Svar på «hva koster fargekonsulent», «book interiørdesigner» | Bør ha | ❓ |

### Tracking

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Booking-konvertering | Spore fullførte bookinger per tjeneste per butikk | Må ha | ❓ |
| Tjeneste → produktkjøp | Spore om bookinger leder til kjøp | Bør ha | ❓ |
| Drop-off i bookingflyt | Forstå hvor folk avbryter | Bør ha | ❓ |

---

## Integrasjoner

| System | Funksjon | Status |
|---|---|---|
| Sharefox | Bookingløsning IK (avtale ut 2026) | Eksisterende – vurdere erstatning |
| Link Mobility | SMS-bekreftelser og påminnelser | Eksisterende avtale |
| Calendly/lignende | Enkel booking Fase 1 | Vurderes |
| Omnium | Betaling for betalt tjeneste (Fase 3) | Fremtidig |

---

## Åpne spørsmål

1. **Sharefox løper ut 2026** – hva erstatter det? Bygge egen bookingflyt, eller nytt verktøy?
2. **Hvilke butikker tilbyr hvilke tjenester?** Trenger kartlegging av kapasitet.
3. **Hva er riktig pris for konsultasjon?** PRD sier 1 499 kr – er det validert?
4. **Håndverkerformidling** – eier Fargerike nettverket, eller bygges det per butikk?
5. **Hva er MVP?** Trolig en enkel Calendly-lignende bookingside for interiørkonsultasjon, uten betaling.
6. **Konverteringssporing:** Hvordan måler vi om en booking fører til produktkjøp i butikk?

---

## Endringslogg

| Dato | Endring | Kilde |
|---|---|---|
| 2026-03-25 | Opprettet som ny flatetype i PDP-familien | John |
