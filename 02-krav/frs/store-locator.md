# Fargerike – FRS: Store Locator / Butikkvelger

> Levende dokument. Oppdateres med innsikt fra audit, møter og research.

**Sist oppdatert:** 2026-03-25
**Status:** Skjelett – fylles med krav etter hvert
**Fase:** 1 (grunnstruktur) → 3 (lokal butikkprofil)

---

## Kontekst

Butikkopplevelsen er Fargerikes viktigste differensiator. 89 medlemseide butikker står for det meste av omsetningen. Digitalt skal drive trafikk til butikk – store locator er broen mellom digital og fysisk. I dag håndterer Pinmeto åpningstider, adresser og kontaktinfo.

PRD-prinsipp: «Butikken først. Alle digitale flater skal støtte butikkopplevelsen – ikke konkurrere med den.»

---

## Krav

### Finn butikk

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Geolokasjon | Finn nærmeste butikk basert på brukerens posisjon | Må ha | ❓ |
| Søk på sted | Søk på postnummer, by, adresse | Må ha | ❓ |
| Kartvisning | Interaktivt kart med butikkmarkører | Må ha | ❓ |
| Listevisning | Butikker sortert på avstand med nøkkelinfo | Må ha | ❓ |
| Åpningstider | Korrekte åpningstider inkl. avvik (helligdager etc.) | Må ha | ❓ Pinmeto-integrasjon |

### Butikkside (lokal profil)

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Kontaktinformasjon | Adresse, telefon, e-post, kart | Må ha | ❓ |
| Åpningstider | Ordinære + avvik | Må ha | ❓ |
| Tjenester | Hvilke tjenester butikken tilbyr (fargekonsultasjon, blanderi, utleie) | Bør ha | ❓ |
| Lokalt innhold | Butikken kan ha egne bilder, tekst, kampanjer (ambassadørmodell Fase 3) | Kan ha | ❓ |
| Ansatte/eksperter | Vis interiørkonsulenter og rådgivere | Kan ha (Fase 3) | ❓ |
| Booking av konsulent | Book time med interiørkonsulent (Fase 1: enkel, Fase 3: betalt) | Bør ha | ❓ |

### Butikkvelger (global)

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Persistent butikkvalg | Bruker velger «min butikk» – huskes på tvers av besøk | Må ha | ❓ |
| Påvirker hele opplevelsen | Valgt butikk styrer lagerstatus, klikk-og-hent, lokal info | Må ha | ❓ |
| Header-integrasjon | Tilgjengelig fra global header/navigation | Bør ha | ❓ |

### Lagerstatus

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Lokal lagerstatus per produkt | Vis om produktet er på lager i valgt butikk | Må ha | ❓ Lindback API |
| Lagerstatus i PLP/PDP | Integrert i produktkort og produktside | Må ha | ❓ |
| Nærliggende butikker | Vis tilgjengelighet i andre butikker i nærheten | Kan ha | ❓ |

### Klikk-og-hent

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Bestill og hent | Reserver vare og hent i butikk | Må ha (Fase 2) | ❓ |
| Forhåndsbetaling | Betal ved bestilling, ikke i butikk | Bør ha (Fase 2) | ❓ Lindback-avklaring |
| Hentebekreftelse | Varsling når varen er klar for henting | Bør ha (Fase 2) | ❓ |
| SMS-varsling | Via Link Mobility (eksisterende avtale) | Bør ha (Fase 2) | ❓ |

### SEO

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Lokale landingssider | Én indekserbar side per butikk for lokal SEO | Må ha | ❓ |
| Strukturert data | LocalBusiness JSON-LD per butikk | Må ha | ❓ |
| Google Business Profile | Synkronisering via Pinmeto | Bør ha | ❓ Avklare Pinmeto-rolle |

### Tracking

| Krav | Beskrivelse | Prioritet | Status |
|---|---|---|---|
| Butikkvalg-event | Spore når bruker velger/bytter butikk | Må ha | ❓ |
| Veibeskrivelse-klikk | Spore «vis veibeskrivelse» | Bør ha | ❓ |
| Booking-konvertering | Spore bookinger per butikk | Bør ha | ❓ |

---

## Integrasjoner

| System | Funksjon | Status |
|---|---|---|
| Pinmeto | Åpningstider, adresser, Google-synk | Eksisterende avtale |
| Lindback | Lagerstatus, klikk-og-hent | ❓ API-avklaring |
| Link Mobility | SMS-varsling | Eksisterende avtale |
| Google Maps | Kartvisning | Standard |

---

## Åpne spørsmål

1. Skal Pinmeto beholdes eller erstattes med Sanity-basert butikkadmin?
2. Har alle 89 butikker lik digital modenhet? Bør vi rulle ut trinnvis?
3. Hva er Lindback API-kapabilitetene for lagerstatus?
4. Skal konsulentbooking være per butikk eller sentralt?

---

## Endringslogg

| Dato | Endring | Kilde |
|---|---|---|
| 2026-03-25 | Skjelett opprettet | John |
