# Fargerike – Lisenskostnader og leverandøroversikt

> Kilde: Slack-dokument «Fargerike - Wikipedia» + Google Sheets «Fargerike - Lisenser og oversikt» (per okt 2025)
> Original Excel: `2025-10-13_fargerike-lisenser-og-oversikt.xlsx`

---

## Kjente årlige lisenskostnader

| Leverandør | Tjeneste | Årskostnad (NOK) |
|---|---|---|
| Optimizely (Episerver) | CMS + hosting | 450 000 |
| Hello Retail | Kategorisider | 135 862 |
| Hello Retail | Søk | 135 000 |
| Hello Retail | Email | 44 343 |
| Lipscore AS | Produktanmeldelser | 76 667 |
| **Sum kjente lisenser** | | **841 872** |

## Tilleggskostnader (beløp ukjent)

| Leverandør | Tjeneste | Fakturering | Eier |
|---|---|---|---|
| Epinova | Support, vedlikehold, utvikling (avd. 125 + 159) | Ujevn frekvens | TRY |
| Link Mobility | SMS (kundeklubb, klikk-og-hent, login) | Månedlig | TRY |
| Sharefox | Bookingløsning IK (lisens + service) | Månedlig, 3-års avtale ut 2026 | TRY |
| Pinmeto | Åpningstider, adresser, karttjenester | Årlig | TRY |
| Leap Tools (Roomvo) | Romvisualiseringsverktøy | Månedlig (fast + variabel) | TRY |
| Seebrite Retail (LOS) | Lisenser + fakturerbar tid | Månedlig | Kjedekontor |
| NCS Colour AS | Fargesystem-lisens på nettside | Årlig | TRY (?) |
| Mailchimp | Nyhetsbrev, ~100 000 kontakter | ~$1 100/mnd (~månedlig) | TRY |
| Intercom.io | Kundeservice-chat | ~$516/mnd | Kjedekontor |
| QR code generator | QR-koder | €450/år | TRY (?) |
| Folks AS | Kundeklubb / Mailchimp-mal | Kun ved behov | TRY |

## Andre kostnader (ikke lisenser)

| Leverandør | Tjeneste | Kommentar |
|---|---|---|
| Postnord | Frakt fra nettbutikk | Variabel, faktureres ca. 2g/mnd. MG Logistikk eier avtalen. |
| MG Logistikk/Malorama | Varelager for nettbutikk | Fakt på varer som selges. Kjedekontor godkjenner. |
| Helthjem | Frakt vareprøver (lameller, prøvebokser) | Fortløpende |
| Akershus reklameteam | Lameller, gulvprøver, tapetprøver | Pakking, sending, lagerplass |
| Jotun | Markedsstøtte (RIS) | Kreditnota etter kampanjer |

---

## Estimert total lisenskostnad

**Kjent:** 841 872 NOK/år (Optimizely + Hello Retail + Lipscore)

**Estimat inkl. ukjente:** Sannsynlig i størrelsesorden 1,2–1,5 MNOK/år når Mailchimp (~140 000), Intercom (~65 000), Sharefox, Pinmeto, Leap Tools, NCS og Epinova-vedlikehold inkluderes. Epinova utviklingstimer (avd. 159) kommer i tillegg.

## Relevans for TCO-sammenligning

Disse tallene svarer delvis på PRD-spørsmålet «Hva koster dagens plattform egentlig?». For en fullstendig TCO trenger vi i tillegg:

1. **Epinova-timer siste 12 mnd** – både vedlikehold (avd. 125) og utvikling (avd. 159)
2. **Eksakt kostnad** for Sharefox, Pinmeto, Leap Tools, NCS, Seebrite
3. **Interne timer** brukt på manuelt arbeid (Eline, kategoriansvarlige) som kunne vært automatisert
4. **Hva faller bort** ved migrering: Hello Retail (erstattes av Algolia), Optimizely (erstattes av Sanity + Next.js), Lipscore (vurderes), Epinova (reduseres)
