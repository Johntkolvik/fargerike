# Daglig oppdatering – 2. april 2026 (Skjærtorsdag)

## Status

Påskeuke – de fleste er på ferie. Ingen Fargerike/MG-møter i dag (alle daglige synker og standups er avlyst). Ingen nye e-poster eller Slack-meldinger å svare opp siden forrige sjekk (31. mars).

## E-post

Ingen nye e-poster om Fargerike/Mestergruppen siden 26. mars. De uleste fra forrige sjekk er fortsatt:

| E-post | Fra | Dato | Status | Handling |
|---|---|---|---|---|
| Re: BC FFH (oppsummering) | Stine Stenhaug | 26.03 | Ulest | Lest nå – inneholder full oppsummering av BC FFH-møtet. Allerede dekket i TASKS.md. |
| Digital Kick-off FargePIM | Stine Stenhaug | 26.03 | Ulest | Lest nå – Teams-møte 9. april, agenda kommer. Deltakere: Petter, Birger, John, Eline, Sandra, Magnus B. |
| Prisestimat Luc | Eline Fjeld | 23.03 | **Ulest – krever svar** | 9 oppgaver, ~70-80t. Svar etter påske. |
| Ny datafeed (Google Ads) | Eline Fjeld | 25.03 | Lest | Eline ber om at forespørsler går via John fremover. Oscar vil ha XML. Svar etter påske. |

## Kalender 1.–2. april

- **1. april:** Martins AI-hjørne (08:45, ikke Fargerike-relatert). Standups x Snowbee avlyst.
- **2. april:** Daglig synk x Bjørklund avlyst. Placeholder TBD avlyst. Ingen Fargerike-møter.

Ingen transcripts å hente.

## Slack-kanaler

| Kanal | Siste aktivitet | Noe å svare? |
|---|---|---|
| #mg_alle | 1. april (automatisk delingspåminnelse) | Nei – kun bot-melding |
| #mg_overflate_ecom | 20. mars | Nei |
| #mg_produktleder | 13. mars | Nei |
| #mg-färgfackhandel-external | 16. mars | Nei |

## Utkast til svar (klar til sending 7. april)

### 1. Svar til Eline – Prisestimat Luc

> Hei Eline,
>
> Takk for oversikten fra Luc. Her er min vurdering:
>
> **Anbefaler å prioritere nå:**
> - Oppgave 3 (SSR/fallback for crawlers) – 6t – SEO-kritisk, crawlere må lese innhold
> - Oppgave 6 (Schema markup) – 5t – viktig for rich snippets i Google
> - Oppgave 7 (Robots.txt redigerbar) – 2t – grunnleggende SEO-kontroll
> - Oppgave 4 (ukjent, 1t) + Oppgave 9 (1t) – små og enkle
>
> **Kan vente / vurderes:**
> - Oppgave 1 (Paginering, 20-30t) – stor investering. Verdt å diskutere om vi heller løser dette i ny plattform. Alternativ 1B (tydelig knapp i stedet for infinite scroll, 10t) er mer fornuftig kortsiktig.
> - Oppgave 5 (Sitemap, 20-30t) – dyrt. Sjekk først om gammel komponent kan fikses via Optimizely support.
> - Oppgave 2 (support-ärende, 2t) – la Luc prøve Optimizely support først.
> - Oppgave 8 (seksjonsside, 2t) – lav prioritet.
>
> Samlet anbefaling: Start med oppgave 3, 6, 7, 4 og 9 (~15t). Hold igjen på paginering og sitemap til vi har avklart scope for ny plattform.
>
> Hva tenker du?

### 2. Svar til Eline – Datafeed

> Hei Eline,
>
> Absolutt – slike forespørsler kan gjerne gå via meg fremover. Jeg koordinerer med Oscar og Luc slik at vi får XML-feeden på plass.
>
> Kort spørsmål: bruker dere fortsatt DataFeedWatch, eller er det lagt ned? Oscar nevnte det i Slack i fjor.

### 3. Supplere Stines Algolia-post i #mg_alle

> Bra oppsummert, Stine! Legger til litt kontekst fra produktsiden:
>
> For Fargerike spesifikt betyr Algolia at vi kan:
> - Gi kunder søkeresultater som forstår «maling til bad» = våtromsmaling (synonym-håndtering)
> - Personalisere produktrekkefølge basert på brukeratferd (Algolia Recommend)
> - Bygge autocomplete som viser farger, produkter og inspirasjon i sanntid
> - Erstatte HelloRetail-søket med en løsning som gir oss full kontroll over ranking og merchandising
>
> Vi ser for oss at Fargerike blir en av de første kjedene som får full nytte av den nye Algolia-avtalen. Mer info kommer etter påske!

## Prioriterte oppgaver 7. april (første arbeidsdag)

1. **Send svar til Eline** – Prisestimat + Datafeed
2. **Sjekk Algolia Service Order** – Ble den signert før påske?
3. **Publiser Algolia-supplement i #mg_alle**
4. **Book innføringsmøte med Petter Sandholt** – trengs før workshop 17. april
5. **Forbered FargePIM Digital Kick-off 9. april** – les opp på Jotun-avklaring, mg-color spec
