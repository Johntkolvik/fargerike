# Møtereferat: Fargerike – Meet and Greet

**Dato:** 11. mars 2026, kl. 12:00–12:55
**Sted:** TRY, Gang H (+ Teams)
**Deltakere:** John Kolvik (TRY DIG), Eline Fjeld (Fargerike), Stine Stenhaug (TRY, organisator – ikke til stede i samtalen)
**Type:** Introduksjonsmøte – kartlegging av Elines rolle, arbeidsflyt og utfordringer

---

## Bakgrunn og formål

TRY har inngått en avtale om digital rådgivning og produksjon med Fargerike for 2026 (mars–desember, 370 timer). Avtalen dekker fire bolker: sammenstilling av backlog og prioriteringer, audit og konverteringsanbefaling, løpende drift med bi-weekly møter, og en prosjektpott for større tiltak. Kontaktpersoner på kundesiden er Marita Berg og Marte Faafeng (Fargerike), med Sigvart Vetle Olsen (Mestergruppen) som overordnet. Stine Stenhaug er ansvarlig fra TRY.

Dette møtet var Johns første ordentlige samtale med Eline Fjeld, som er den personen hos Fargerike som sitter tettest på det digitale produktet til daglig. Formålet var å få Fargerike «under huden» – forstå hvordan Eline jobber, hva hun sitter med av utfordringer, og hva som faktisk fungerer og ikke fungerer i dag. Dette er grunnlaget for auditen og prioriteringene videre: vi trenger å vite hva som er verdt å ta med videre til en eventuell ny plattform, og hva som er ren teknisk gjeld.

Møtet ble også brukt til å avklare samarbeidsform – hvordan backlog og oppgaver skal flyte mellom Eline, John og Epinova-utvikleren som har 25 timer i måneden.

---

## Elines rolle og ansvar

Eline er digitalansvarlig for Fargerike og jobber med produktdata (PIM), innhold og nettbutikk. Hovedoppgaver:

- Beriker produktdata fra MG Logistik/NOB med bedre tekster, bilder og teknisk info
- Lager og vedlikeholder innhold på fargerike.no (inspirasjon, how-to-artikler)
- Gjennomfører kampanjer digitalt (brief fra kategoriansvarlige, setter opp i nettbutikken)
- Styrer aktuelle varer og sesongfavoritter manuelt på siden
- Administrerer Hello Retail (produktanbefalinger)
- Samarbeider med Stine Ekstrøm (TRY, SEO) og kategoriansvarlige internt

Eline er i praksis alene om denne rollen – det finnes ingen tilsvarende rolle i Colorama eller Malproff. *(Stemmer dette, @Stine Stenhaug?)*

---

## Hovedutfordringer

### Bildekvalitet og data fra NOB

- Bilder fra NOB/leverandører er ofte dårlige (lav oppløsning, feil farger, feil fargerom – sRGB vs. RGB-problematikk)
- Eline bytter ut bilder manuelt, men de overskrives av automatiske synkroniseringer fra NOB
- PIM-systemet komprimerer bilder ytterligere

### Produktnavn og datamodell

- Varenavn styres av MG Logistik og er fulle av spesifikasjoner (f.eks. «Gjortan Gatekost 1841 med gjenger 30cm»)
- Fargerike har ikke et eget displaynavn-felt – det som vises til kunden er logistikknavnet
- Behov for varenavn per kjede i datamodellen

### Manuelt arbeid uten system

- Aktuelle varer legges inn manuelt basert på lister fra kategoriansvarlige
- Kampanjeproduktene kunne vært flagget i PIM med tidsperiode og flyte automatisk ut
- Ingen kobling mellom artikler (how-to) og produkter (toveis relasjon mangler)

### Templater og frontend

- Ulike produktkategorier har forskjellige templates som ikke passer innholdet (tapet vises smalt, bilder kuttes)
- Mobilopplevelsen er svak – produktanbefalinger forsvinner, bilder er dårlige
- Tomme felt vises selv når det ikke finnes data (f.eks. «Instruksjoner»)

### Farge-PIM

- Fargevelger-opplevelsen er i praksis uforandret i to år
- Data er nå tilgjengelig via API, men frontend-opplevelsen henger etter
- Utfordring med multi-brand fargevelger (Jotun, egne merkevarer) og ulike baser
- Mulighet for NCS-basert fargesøk som treffer på tvers av leverandører

### Tracking og måling

- Ukjent om det finnes heatmaps eller konverteringsdata på PDP-nivå
- Vanskelig å styre produktopplevelsen uten riktig tracking
- Nyhetsbrev via Mailchimp har ~80 000 mottakere, ~40 % åpningsrate (inkl. bots), men konvertering er lav

### MG Item-prosjektet

- Eline har vært lite involvert i sentraliseringsprosjektet (MG Item)
- Mangel på sammenheng og forståelse for hva som er planlagt

---

## Johns observasjoner og retning

- Fargerike presterer svakt digitalt – mange små forbedringer vil koste mye enkeltvis. Bedre å planlegge en ny plattform (Sanity) som tar med det som funker.
- Viktig å dokumentere hva som fungerer i dag som krav til ny løsning, slik at vi ikke skaper nye problemer.
- Retail media-tankegang: aktuelle varer / leverandørbetalt synlighet bør systematiseres gjennom PIM og flyte automatisk til alle flater (nett, butikk, søk).
- Sentralisert datamodell (MG Item → MG Price → Farge-PIM) bør støtte ulike visningsnavn, bilder og innhold per kjede.
- Hello Retail / søk (Algolia) er kritisk for konvertering – bør evalueres grundig.
- CRM (Mailchimp) er begrensende – listebasert, vanskelig å sette opp triggerbaserte serier.

---

## Neste steg

| Hva | Hvem |
|---|---|
| Eline sender prioriteringsliste over tekniske ting fra Stine Ekstrøm | Eline |
| Epinova-utvikler (25t/mnd) bruker tid på tekniske forbedringer fra listen | John/Eline |
| John gjør egen audit av fargerike.no (tracking, konvertering, frontend) | John |
| Eline dokumenterer hva som fungerer bra i dag (til kravspec for ny plattform) | Eline |
| John tar eget møte med Colorama-teamet for gap-analyse | John |
| Eline involveres i proof of concept for ny fargevelger | John |
| Avklare Elines rolle i MG Item-prosjektet | John/Eline |
