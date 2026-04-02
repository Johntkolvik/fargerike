# Daglig oppdatering – 29. mars 2026 (søndag / påskeferie)

Automatisk sjekk av e-post, Slack og møtetranscripts.

---

## E-post (siste 3 dager)

### 1. BC FFH – Oppsummering etter møte (Stine → Sandra, Kristian, cc Magnus H.)
**Dato:** 26. mars | **Status:** Ulest – du er ikke på TO/CC, men innholdet er svært relevant

Stine oppsummerer beslutninger fra møtet 25. mars om business case for felles e-handelsplattform (Bolist/Colorama/Happy Homes):

**Beslutninger:**
- Felles plattform: samme backend, checkout og logistikk – kun frontend unik per kjede
- Leveringsmodeller: last mile, pick-up-in-store, dropship
- MG Logistikk AB som selgende part
- Västerås håndterer fargeblanding nå, Jönköping utredes etter påske
- Start parallelt – avventer ikke perfekt logistikk

**FargePIM:** Norsk Jotun-avtale krever IKKE iframe/colour picker. MG står fritt til egen løsning. Digital Kick-off 9. april kl. 09:00.

**Aksjoner uke 15 (7.–11. april):**
- Magnus H. & Sandra: HH-omsetning farge vs dropship, volymprognoser 1–3 år, bruttomargin per kategori
- Sandra: Kontakt Marita (Fargerike NO) + avklare Jotun PIM-avtale med Jonas Nilsson
- Kristian: Logistikk-case Jönköping, møte med Clint Home, e-handelsflyt-dokument
- Stine: Bolist-dokumentasjon, checkout-estimat, color picker-forberedelse, gjenbrukbar arkitektur

**Tidsplan:**
- Uke 15: Hovedleveranseuke
- Uke 16: Plenum for endelig godkjenning av business case
- Etter sommer 2026: Colorama kobler på checkout + color picker starter

**Ambisjon:** 100 MSEK i årlig omsetning på farge på nett innen år 3.

**Budsjett Colorama:** 200K SEK for full netthandel + designjusteringer. OPEX: Sanity + Algolia (~80K).

> ℹ️ Allerede logget i TASKS.md. Ingen respons nødvendig fra deg – dette er Stine→Sandra/Kristian.

---

### 2. Digital Kick-off – FargePIM 🎨 (Stine)
**Dato:** 26. mars | **Status:** Ulest

Teams-møteinnkalling. Agenda kommer. Du er på deltakerlisten sammen med Petter Sandholt, Birger Bjønnes, Eline Fjeld, Sandra Wigfors og Magnus Bergman.

**Dato:** 9. april kl. 09:00 (Teams)

> ✅ Allerede i TASKS.md. Sett i kalenderen.

---

### 3. Re: Offerten från Algolia (Christoffer Fagerström → Birger, Petter, John, Stine)
**Dato:** 26. mars | **Status:** Lest

Christoffer purrer på Algolia Service Order. Nøkkelpunkter fra opprinnelig tilbud:
- Alle MG-selskaper inkludert (også Proffnett 2.0)
- 3-årsavtal med låste priser (~99K EUR/år)
- 75K pooled search units, overskudd overføres mellom år
- Kan utvide med 75K units + 1K records til samme enhetspris
- Opptil 20 apper/sajter, anbefalt ~10
- **Offert gyldig til 2. april. Kontraktstart 15. april.**
- 37,66% rabatt + volymrabatt forutsatt signering før påske

Christoffer spør om det er ytterligere spørsmål.

> ⚠️ **Handling nødvendig?** Birger/Petter eier beslutningen, men du bør vurdere om du har innspill til teknisk scope. Frist 2. april er onsdag i påskeuken.

#### Utkast til svar (hvis du ønsker å følge opp):
```
Hei Christoffer,

Takk for oppfølgingen. Jeg har nettopp kommet inn som produktleder for Fargerike-prosjektet og har gjennomgått tilbudet.

Fra min side ser opplegget solid ut – pooled units og fleksibiliteten til å skalere er viktig gitt at vi ruller ut på tvers av flere kjeder med ulik tidslinje. Birger og Petter – har dere det dere trenger for å lande dette?

Mvh,
John
```

---

### 4. Trale – Kid/Hemtex pitch (notifikasjon, 27. mars)
Trale-notifikasjon om Kid/Hemtex-pitch. Nevner Mestergruppen i kontekst av "styringssystem basert på mestergruppen". Ikke direkte Fargerike-relatert, men viser at MG-referanser brukes i pitch-materiale.

> ℹ️ Ingen handling nødvendig.

---

## Slack

### #mg_alle (C09C5E20JCQ)

**Stine ba deg supplere Algolia-posten (25. mars)**
Stine postet om Algolia-avtalen og tagget deg: "Du får gjerne supplere litt ❤️". Hun delte også et Algolia Elevate Playbook (PDF).

> ⚠️ **Handling nødvendig.** Du bør svare i tråden. Her er et utkast:

#### Utkast til Slack-svar:
```
Hei! Takk for god oppsummering, Stine 🙌

Kort supplement fra min side:

Algolia gir oss tre ting som er spesielt relevante for Fargerike:
1. **Instant search med facets** – viktig når vi har 10K+ produkter og kunder søker på alt fra NCS-koder til "maling til våtrom"
2. **Algolia Recommend** – lar oss vise relaterte produkter og utstyr kontekstuelt på PDP, uten å hardkode relasjoner
3. **AI-personalisering** – kan tilpasse søkeresultater basert på brukeratferd, noe som blir viktig når vi ruller ut på tvers av kjeder med ulikt sortiment

For Fargerike spesifikt planlegger vi å bruke Algolia som søkemotor på ny nettside (erstatter dagens løsning), med autocomplete, kategorifiltrering og semantisk søk.

Playbooken dekker det meste – spør gjerne om dere vil vite mer om teknisk arkitektur eller hva dette betyr for enkeltkjeder.
```

**Ukesoppdatering AI-initiativer uke 13 (Mathias Hov, 27. mars)**
Relevant FYI: Svipp lanseres 9. april, BoligStudio venter MG-godkjenning, Skranken tilgjengelig 7. april, Skranken AI-prosjekt scopes (Claude + Monday/Busy + Stack.ai). Ingen direkte Fargerike-handling.

**Nina: God påskeferie (27. mars)**
Alle melder seg av. 23 hjerter.

---

### #mg_overflate_ecom (C09PWS3TSM8)

**Innføring i MG-riggen (Stine → Petter, 19. mars)**
Stine spør om Petter kan gi deg en innføring i MG-riggen. Planen er å ha as-is/plattformen klar til 17. april, pluss en fremtidsvisjon. Petter svarte "jepp, absolutt!".

> ⚠️ **Handling nødvendig etter påske.** Book møte med Petter Sandholt for innføring i MG-riggen. Nødvendig grunnlag for workshop 17. april.

#### Utkast til Slack-melding (etter påske):
```
Hei @Petter! Takk for at du vil gi meg en innføring i MG-riggen 🙌 Kan vi sette opp en time i uke 15 (7.–11. april)? Tenker det er nyttig å forstå hele stacken (Omnium, Sanity, PIM, integrasjoner) før vi skal presentere 17. april.
```

---

### #mg_produktleder (C09CE69D1J9)
Ingen nye meldinger med handling for deg. Du joinet kanalen 13. mars.

### #mg-färgfackhandel-external (C09ANQ7ANKW)
Ingen nye meldinger siste uke. Siste aktivitet: duplikatproperties på Colorama (Magnus Bergman, 16. mars) – allerede håndtert i tråd.

---

## Møtetranscripts

**To møter fra 19. mars er fortsatt under prosessering:**
1. *Oppstartsmøte: Markedsføring + Nettbutikk Fargerike* – deltakere: John, Stine, Matias, Helene Grastveit
2. *Oppstartsmøte: SEO + Nettbutikk Fargerike* – deltakere: John, Stine, Stine Ekström, Helene Grastveit

Summaries er ikke klare ennå. Sjekkes igjen etter påske.

**Allerede dokumenterte møter:**
- Meet and Greet Eline Fjeld (11. mars)
- Jotun Colour Picker (23. mars)

---

## Oppsummering: Hva bør gjøres etter påske

| Prioritet | Oppgave | Frist |
|---|---|---|
| 🔴 | Supplere Stines Algolia-post i #mg_alle | Første arbeidsdag (7. april) |
| 🔴 | Book innføringsmøte med Petter Sandholt (MG-riggen) | Uke 15 |
| 🟡 | FargePIM Digital Kick-off | 9. april 09:00 |
| 🟡 | Forbered as-is / fremtidsvisjon for workshop 17. april | Innen 17. april |
| 🟡 | Sjekk om Algolia-avtalen ble signert (frist 2. april) | 7. april |
| 🟡 | Hent transcripts fra 19. mars-møtene når klare | Uke 15 |
| 🟢 | Svar Eline – prisestimat Luc (SEO-oppgaver) | Uke 15 |
| 🟢 | Svar Eline – datafeed Google Ads | Uke 15 |
| 🟢 | Svar Jotun (Magnus Sjögren) – domener | Etter intern MG-avklaring |
