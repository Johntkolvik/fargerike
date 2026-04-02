# Jotun Colour Picker – Møtereferat

**Dato:** 23. mars 2026, 13:00–14:00
**Deltakere:** Olivia Larsson (Jotun), Magnus Sjögren (Jotun), Julia Karlsson Buchel (Jotun), Ylva Widegren (Mestergruppen), Sandra Wigfors (Mestergruppen), Mikael Österlund (Mestergruppen), John Kolvik (TRY), Magnus Bergman (TRY)
**Kilde:** Trale AI-referat + e-post fra Magnus Sjögren

## Bakgrunn

Møtet handlet om Jotuns digitale fargevelger – en widget/API for e-handelsplattformer som viser kompatible farger for valgte produkter. Diskusjonen dreide seg om API-implementering, tekniske krav og forretningsoverveielser for Colorama og Happy Homes.

## Hovedpunkter

### API og Widget-funksjonalitet
- Magnus Sjögren (Jotun) forklarte forskjellen mellom det gamle XML-systemet og det nye API-baserte systemet
- Widgeten trigges når kunde velger et produkt og viser kompatible farger
- API-et returnerer data på skruvnivå med riktig base for produkter
- Systemet krever Product Family ID for å fungere korrekt

### Tekniske krav
- Magnus Bergman (TRY) la vekt på en 100% API-basert løsning som ikke begrenser fremtidig utvikling
- Testmiljø krever ingen whitelisting, men produksjon trenger det
- Dokumentasjon og API-nøkler sendes til alle parter
- Mulighet for å teste parallelt uten kostnader

### Varumärkes-bekymring (viktig!)
- Ylva Widegren (Mestergruppen) løftet kritiske spørsmål om merkevareuttrykning
- Colorama og Happy Homes kan IKKE påvirke widgetens utseende eller inkludere sin logo
- Dette ses som potensiell "dealbreaker" fra merkevare-perspektiv
- Beslutning rundt dette MÅ tas før teknisk implementering starter

### Referanser
- Excel Bygg (Danmark), Coop, Nysted (Norge) og andre har allerede implementeringer
- Produktfamilje-tilnærming anbefales som mest elegant løsning

## Neste steg

1. **Magnus Sjögren** sender API-dokumentasjon og spørsmålsbatteri (✅ gjort 23. mars)
2. **Avtalsdiskusjon** mellom Jotun (Per og Jonas) og Mestergruppen (Ylva, Sandra, Mikael)
3. **Testmiljø** settes opp med API-nøkler etter avtalssignering
4. **Sandra Wigfors** sjekker masterdata for Product Family IDs i Finfo
5. **Møte med IT-arkitekt** planlegges for detaljerte tekniske spørsmål
6. **John/TRY** må sende domener for prod og test til Magnus Sjögren for whitelisting

## Implikasjon for Fargerike-prosjektet

Denne widgeten/API-et er kjernen i det vi kaller **mg-color** i FRS-dokumentasjonen (`02-krav/frs/fargevelger.md`). Viktige avklaringer:

- Vi bør **ikke** låse oss til Jotuns widget – vi vil bruke API-et direkte for full kontroll over UX
- Product Family ID fra Finfo blir en kritisk datakilde
- Avtale-situasjonen mellom Jotun og MG er blokker for teknisk oppstart
- Merkevare-spørsmålet (widget vs. ren API) er en forretningsbeslutning, ikke en teknisk
