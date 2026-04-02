# Daglig oppdatering – 25. mars 2026

## E-poster som krever handling

### 1. Eline Fjeld – Ny datafeed til Google Ads (i dag)
**Status:** Eline videresender tråd der Oscar (TSM) ber Luc (Epinova) om ny XML-datafeed for Google Ads. Luc estimerer 4-10 timer.
**Viktig:** Eline sier hun bruker 4-10 Luc-timer denne måneden, og spør om slike forespørsler bør gå via deg fremover.

**Utkast til svar:**
> Hei Eline,
>
> Takk for heads up. Ja, slike forespørsler kan gjerne gå via meg fremover – da får jeg bedre oversikt over hva Luc jobber med og kan prioritere riktig.
>
> Ang. datafeeden: Oscar kan kjøre i gang med Luc. 4-10 timer høres rimelig ut for en XML-feed. Bare sørg for at feeden dekker alle sortimentskoder G og K (netthandelsprodukter).
>
> Mvh, John

---

### 2. Eline Fjeld – Prisestimat timer Luc (23. mars) ⚠️ ULEST
**Status:** Luc har gitt prisestimat på 9 oppgaver. Eline ber om tilbakemelding slik at Luc kan sette i gang.

**Oppsummering av estimatene:**
1. Paginering: 20-30 timer (alternativt 10t for enkel paging-knapp)
2. Support-ærende Optimizely: 2 timer
3. SSR/crawlbar produktside: 6 timer
4. Ukjent oppgave: 1 time
5. Sitemap-ombygging: 20-30 timer
6. Schema markup: 5 timer
7. Robots.txt: 2 timer
8. Seksjonsside-aktivering: 2 timer
9. Ukjent: 1 time

**Total: ~69-79 timer**

**Utkast til svar:**
> Hei Eline,
>
> Takk for oversikten fra Luc. Noen kommentarer:
>
> - **Paginering (1):** Gå for enkel paging-knapp (10t) i stedet for full ombygging. Vi bygger ny frontend uansett og trenger ikke investere 30t i gammel løsning.
> - **SSR/crawlbar (3):** Viktig for SEO. Prioriter dette.
> - **Sitemap (5):** 20-30t er mye. Kan vi få mer detaljer på hva som gjør dette så komplekst? Hvis det er den gamle komponenten som er problemet, bør vi vurdere om dette er verdt det gitt at ny løsning kommer.
> - **Schema (6) og robots.txt (7):** Greit, kjør på.
> - **Seksjonsside (8):** Ok.
>
> Mitt forslag: Prioriter punkt 2, 3, 6, 7, 8 (totalt ~16t). Paginering med enkel løsning (10t). Hold igjen på sitemap (5) til vi har mer info.
>
> Mvh, John

---

### 3. Algolia – Service Order utkast (24. mars)
**Status:** Christoffer Fagerström (Algolia) har sendt utkast til Service Order.
**Nøkkelvilkår:**
- 3-årsavtal, priser låst hele perioden
- 75 000 search units pooled (ubrukte føres videre)
- Mulighet å legge til 75K ekstra units til same pris
- Opptil 20 apper/sajter (anbefalt ~10)
- **Offert gyldig til 2. april** – kontraktstart 15. april
- Rabatt: 37,66% + volumrabatt (totalt ~99K EUR/år for hele gruppen)

**Handling:** Ingen direkte svar nødvendig fra deg nå – dette er til Birger/Petter hos MG for gjennomgang. Men vær oppmerksom på fristen 2. april.

---

### 4. Barbro Fagerbakk – Hello Retail Followup (24. mars) ✅ BESVART
**Status:** Hello Retail-CEO vil re-etablere dialog med MG. Barbro spurte om status. Stine har svart at TRY ikke er riktig kanal for dette – beslutninger om plattform og arkitektur sitter hos MGs egen IT/produkt-org.

**Handling:** Ingen handling nødvendig.

---

### 5. Jotun Colour Picker – Dokumentasjon (23. mars) ⚠️ ULEST
**Status:** Magnus Sjögren (Jotun) sender API- og widget-dokumentasjon etter møte. Ber om domener for prod og test for whitelisting + API-nøkler.

**Utkast til svar:**
> Hej Magnus,
>
> Tack för dokumentationen! Vi behöver avklara avtalsfrågan med Mestergruppen internt innan vi kan gå vidare med whitelisting och API-nycklar. Sandra Wigfors och Ylva Widegren driver den dialogen på MG-sidan.
>
> Jag återkommer med domänerna så snart vi har klartecken.
>
> Mvh, John

---

### 6. Monday.com – Oppgaver tildelt (19. mars) ⚠️ ULEST
Du er tildelt følgende oppgaver i Monday.com (Fargerike - drift 2026):
- Forberede workshop 17. april / As-is analyse
- Produktnavn og datamodell
- Tracking og måling (heatmap)
- Templater og frontend
- Manuelt arbeid uten system
- Tekniske SEO-tiltak hos Luc

---

## Slack – Viktige tråder

### #mg_alle – Du er annonsert som produktleder
Stine har lagt ut i dag at du er ny produktleder for Fargerike. Hun delte også info om Algolia-beslutningen og ba deg supplere.

**Utkast til Slack-svar i #mg_alle:**
> Hei alle! 👋 Hyggelig å bli en del av MG-teamet. Ser frem til å jobbe med dere.
>
> Ang. Algolia: Stine oppsummerte det bra. Fra min side kan jeg legge til at Algolia gir oss mye bedre kontroll over søkeresultater og merchandising enn dagens løsning. Vi kan styre hvilke produkter som vises først, bruke AI-basert re-ranking, og bygge personaliserte opplevelser – alt gjennom API. Det betyr at vi slipper å være avhengig av tredjepart for å optimalisere den viktigste inngangen til nettbutikken.

### #mg_overflate_ecom – Innføring i MG-riggen
Stine spør om noen kan gi deg en innføring i MG-riggen (Petter Sandholt ble nevnt). Plan om å presentere as-is + fremtidig løsning 17. april.

**Handling:** Følg opp med Stine/Petter for å få innføring. Deadline for as-is presentasjon er 17. april.

### #mg_sverige_intern – Prosessplan for e-handel
Stine deler prosessplan (konfidensielt):
- **Bolist** starter etter påske (pilot for full e-handel)
- **Colorama** etter sommeren
- **Fargerike Norge** også etter sommeren
- FargePIM-prosjekt: Magnus + John fra TRY
- Klaviyo som CRM (XL-BYGG starter)
- Check-out: Stian bistår på sentral komponent
- Min Side: Ikke besluttet enda

### DM med Magnus Bergman – Jotun-avtale
Viktig funn: Avtalen mellom Jotun og MG **sier ingenting** om krav til widget-implementering. Det som ble sagt muntlig i møter (at widgeten _må_ implementeres for API-tilgang) er en forretningsposisjon fra Jotun, ikke et kontraktsvilkår. Dette gir rom for forhandling.

mg-color prosjektet er besluttet og blir en erstatning for dagens system i inRiver. Petter blir trolig ansvarlig.

---

## Møtetranskripsjoner

### Jotun Colour Picker (23. mars)
Trale-oppsummering mottatt. Hovedpunkter:
- API vs widget: Magnus Bergman (TRY) betonet 100% API-basert løsning
- Varumärkesbekymring: Ylva (MG) løftet at Colorama/Happy Homes ikke kan påvirke widgetens utseende – potensiell dealbreaker
- Neste steg: Avtalsdiskusjon mellom Jotun og MG, deretter testmiljø

### Oppstartsmøte Markedsføring + Nettbutikk Fargerike (11. mars)
Trale-oppsummering mottatt. Hovedpunkter:
- John blir ansvarlig for konvertering på nettstedet
- Konkurrentanalyse/audit: deadline 22. april
- Arkitektur-møte 17. april
- Budget ~500K for produktlederkull
- Ukentlige "MG Tuesdays" etableres

---

## Oppsummert – topp 3 prioriteringer

1. **Svar Eline** på prisestimat fra Luc og datafeed-spørsmål
2. **Forbered workshop 17. april** – as-is analyse av Fargerike-plattformen
3. **Få innføring i MG-riggen** fra Petter/Stine
