# Informasjonsarkitektur — Fargerike.no

**Dato:** 12. april 2026
**Status:** UTKAST — venter p&aring; komplett GSC-s&oslash;keordanalyse
**Basert p&aring;:** GA4-benchmark, sitemap-klassifisering, s&oslash;keordanalyse (kun eksterior), konkurrentanalyse (Colorama, Fl&uuml;gger, Jotun, Byggmax), audit av n&aring;v&aelig;rende fargerike.no

> **FORBEHOLD:** S&oslash;keordanalysen dekker kun eksterior-kategorier (terrassebeis, maling ute, fasade, etc.).
> Tapet, Gulv, Interi&oslash;rmaling, Solskjerming, Verkty&oslash;y/tilbehor og Vask har ingen eller minimal dekning.
> Beslutninger om disse kategoriene m&aring; revideres n&aring;r komplett GSC-data foreligger.

---

## 1. Diagnose: Hva er galt i dag

### Hovednavigasjon (10 items — for mange)

```
Farger | Gulv | Tapet | Interiormaling | Utemaling | Malingsverkt&oslash;y |
Verkt&oslash;y &amp; tilbeh&oslash;r | Vask &amp; rengj&oslash;ring | Sparkel &amp; lim | Solskjerming
```

**Problemer:**
- **10 top-level items** — best practice er 5-7
- **Maling splittet i to** (Interior + Ute) — kunden tenker "maling", ikke to kategorier
- **Lavtrafikk-kategorier p&aring; toppniv&aring;:** Sparkel &amp; lim, Vask &amp; rengj&oslash;ring tar plass fra kjernekategorier
- **Inspirasjon gjemt** i sekund&aelig;r-bar — f&aring;r lavere prioritet enn Batterier og Skadedyr i mega-menyen
- **"F&aring; hjelp"-blokk** med 4 identiske lenker gjentatt i ALLE 10 mega-menyer
- **Datert innhold** i mega-menyer (&Aring;rets Fargekart 2024 fortsatt synlig)

### Trafikk vs. navigasjonsstruktur

| Seksjon | GA4-visninger | Nav-plass | Mismatch |
|---------|--------------|-----------|----------|
| Fargesider | 49 543 (#1) | 1 av 10 | OK |
| Tapet | 26 871 (#3) | 1 av 10 | OK |
| Gulv | 14 339 (#4) | 1 av 10 | OK |
| Inspirasjon | 4 914 | Sekund&aelig;r-bar | **Underprioriert** |
| Malingsverkt&oslash;y | Lav | 1 av 10 | **Overprioriert** |
| Sparkel &amp; lim | Minimal | 1 av 10 | **Overprioriert** |
| Vask &amp; rengj&oslash;ring | Minimal | 1 av 10 | **Overprioriert** |

### S&oslash;kedata — hva brukerne vil ha

- **60% transaksjonell:** terrassebeis, maling ute, grunning, beis olje
- **25% informasjonell:** terrasserengj&oslash;ring, husvask, vedlikehold
- **15% navigasjonell:** merkenavn (Drygolin, Trebitt, Baron)
- **Utend&oslash;rs dominerer** s&oslash;k — innend&oslash;rs maling drives av inspirasjon, ikke s&oslash;k
- **Content gaps:** Solskjerming (16K/mnd, 30% dekning), Epoxymaling (0% dekning)

### Konkurrentm&oslash;nstre

| M&oslash;nster | Brukes av | Relevans for Fargerike |
|--------|-----------|----------------------|
| Farge p&aring; toppniv&aring; | Fl&uuml;gger, Jotun | **Ja** — fargesider er #1 trafikk |
| Inne/Ute som produktsplitt | Fl&uuml;gger, Jotun | **Ja** — erstatter to separate maling-items |
| Inspirasjon p&aring; toppniv&aring; | Alle konkurrenter | **Ja** — m&aring; opp fra sekund&aelig;r-bar |
| Butikkfinner i utility | Alle konkurrenter | **Ja** — allerede der |
| Maks 6-7 items | Alle konkurrenter | **Ja** — ned fra 10 |

---

## 2. Anbefalt IA — Mappestruktur

```
/
├── /farger/                        ← UTFORSK farger (reise B: farge → produkt)
│   ├── /farger/utforsk/            ← Fargevelger, browse, filter
│   ├── /farger/fargekart/          ← Jotun JCCI, JCCE, trendkolleksjoner
│   ├── /farger/ncs/                ← NCS-kodesøk
│   ├── /farger/{id}/               ← Fargedetalj (hex, NCS, matchende, produkter)
│   └── /farger/arets-farge/        ← Kampanjeside
│
├── /maling/                        ← KJERNEPRODUKT (reise A: produkt → farge)
│   ├── /maling/inne/               ← Vegg, tak, gulv, grunning
│   ├── /maling/ute/                ← Tre, fasade, mur, b&aring;t, metall
│   ├── /maling/beis/               ← Beis &amp; olje (inne + ute)
│   └── /maling/{slug}/             ← Produkt-PDP (Lady Wonderwall, Sens, etc.)
│
├── /tapet/                         ← KATEGORI #2
│   ├── /tapet/vinyl/
│   ├── /tapet/fiber/
│   ├── /tapet/overmalbar/
│   └── /tapet/{slug}/              ← Produkt-PDP
│
├── /gulv/                          ← KATEGORI #3
│   ├── /gulv/vinyl/
│   ├── /gulv/laminat/
│   ├── /gulv/parkett/
│   ├── /gulv/teppe/
│   └── /gulv/{slug}/
│
├── /tilbehor/                      ← SAMLET kategori (erstatter 3 nav-items)
│   ├── /tilbehor/verktoy/          ← Pensler, ruller, malingssprøyte
│   ├── /tilbehor/sparkel-lim/
│   ├── /tilbehor/rengjoring/
│   └── /tilbehor/solskjerming/     ← Gardiner, persienner, etc.
│
├── /inspirasjon/                   ← INNHOLD (opp til toppnivå)
│   ├── /inspirasjon/rom/           ← Stue, soverom, bad, kjøkken, barnerom
│   ├── /inspirasjon/prosjekt/      ← Male terrasse, oppussing bad, etc.
│   ├── /inspirasjon/trender/       ← Sesongtrender, fargetrender
│   └── /inspirasjon/{slug}/        ← Artikkel-PDP
│
├── /tips/                          ← GUIDER &amp; HJELP
│   ├── /tips/male-inne/
│   ├── /tips/male-ute/
│   ├── /tips/tapetsere/
│   ├── /tips/gulvlegging/
│   └── /tips/{slug}/               ← Guide-artikkel
│
├── /tjenester/                     ← DIFFERENSIATOR
│   ├── /tjenester/fargekonsultasjon/
│   ├── /tjenester/hjemmebesok/
│   └── /tjenester/maleservice/
│
├── /butikker/                      ← BUTIKKFINNER (utility)
│   └── /butikker/{slug}/           ← Butikkprofil
│
├── /sok/                           ← SØK
├── /handlekurv/                    ← COMMERCE
├── /min-side/                      ← KONTO
└── /om-fargerike/                  ← OM OSS
```

---

## 3. Anbefalt hovednavigasjon

### Primær nav (6 items)

```
┌──────────────────────────────────────────────────────────────────┐
│  Farger    Maling    Tapet & Gulv    Inspirasjon    Tips    Tjenester │
└──────────────────────────────────────────────────────────────────┘
```

### Utility bar (høyre)

```
Søk  |  Finn butikk  |  Min side  |  Handlekurv
```

### Mega-meny per item

**Farger**
```
Utforsk                    Fargekart               Verkt&oslash;y
─────────                  ──────────              ────────
Alle farger                Jotun Interior          NCS-s&oslash;k
Popul&aelig;re farger            Jotun Eksterior         Fargekalkulator
&Aring;rets farge 2026           Trendkolleksjoner
                           Nuances 2025
```

**Maling**
```
Innend&oslash;rs                 Utend&oslash;rs               Merker
─────────                  ──────────              ────────
Vegg &amp; tak                 Tre &amp; fasade            Jotun Lady
Gulvmaling                 Grunning &amp; impregnering Jotun Drygolin
Grunning                   Murmaling               Butinox
V&aring;trom                     B&aring;tpleie                Beckers
Beis &amp; olje                Metall &amp; rust
                           Terrassebeis
```

**Tapet &amp; Gulv**
```
Tapet                      Gulv
─────                      ─────
Vinyltapet                 Vinyl &amp; klikkvinyl
Fibertapet                 Laminat
Overmalbar tapet           Parkett
Veggbekledning             Teppe
```

**Inspirasjon**
```
Etter rom                  Prosjekter              Trender
─────────                  ──────────              ────────
Stue                       Male terrasse           &Aring;rets farge
Soverom                    Oppussing bad           Nuances 2025
Kj&oslash;kken                    Barneromsprosjekt       Sesong: v&aring;r
Bad                        Fasadeoppgradering
Barnerom
```

**Tips**
```
Male inne                  Male ute                Overflater
──────────                 ──────────              ──────────
Forberedelse               Terrassevedlikehold     Tapetsering
Velge maling               Fasademaling            Gulvlegging
Fargevalg                  Beis &amp; olje             Sparkling &amp; grunning
Maleteknikk                Rengj&oslash;ring
```

**Tjenester**
```
Fargekonsultasjon          Hjemmebes&oslash;k             Praktisk
──────────────             ──────────               ──────────
Book time (gratis)         Vi kommer hjem til deg   Frakt &amp; levering
Digitalt fargevalg         Fargeforandringstjeneste Kundeservice
```

---

## 4. Hva forsvinner — og hvor det g&aring;r

| Fjernet fra toppniv&aring; | Ny plassering | Begrunnelse |
|------------------------|---------------|-------------|
| Interiormaling | /maling/inne/ | Sl&aring;tt sammen med Utemaling under &eacute;n "Maling" |
| Utemaling | /maling/ute/ | Samme |
| Malingsverkt&oslash;y | /tilbehor/verktoy/ | Lav trafikk, ikke kjernekategori |
| Verkt&oslash;y &amp; tilbeh&oslash;r | /tilbehor/ | Samlet med sparkel, rengj&oslash;ring |
| Vask &amp; rengj&oslash;ring | /tilbehor/rengjoring/ | Minimal trafikk |
| Sparkel &amp; lim | /tilbehor/sparkel-lim/ | Minimal trafikk |
| Solskjerming | /tilbehor/solskjerming/ | Nicheprodukt, men 16K s&oslash;k/mnd — behold god PLP |

### Inspirasjon — konsolidering

| N&aring; (8 subtyper) | Etter (3 subtyper) |
|---------------------|-------------------|
| Rom-inspirasjon | /inspirasjon/rom/ |
| Fargeinspurasjon | → /farger/ (flytt til fargevelger) |
| Bolig | /inspirasjon/prosjekt/ |
| Hjemme hos | /inspirasjon/trender/ |
| &Aring;rets farge | /farger/arets-farge/ |
| Fargekart | /farger/fargekart/ |
| M&aring;nedens stil | /inspirasjon/trender/ |
| Hub | Fjernes (duplikat) |

---

## 5. N&oslash;kkelprinsipp

> **Farger er reisen, Maling er m&aring;let.**
>
> Kunden starter med en farge (inspirasjon, NCS-kode, &aring;rets trender) og ender med maling i handlekurven.
> Navigasjonen reflekterer dette: Farger er utforskning, Maling er kj&oslash;p.
> Inspirasjon og Tips st&oslash;tter begge reiser.

### Navigasjonshierarki — visuelt

```
          UTFORSK                    HANDLE                    HJELP
     ┌──────────────┐        ┌────────────────┐        ┌──────────────┐
     │   Farger     │        │    Maling      │        │  Inspirasjon │
     │              │───────▶│   Tapet &amp; Gulv  │◀───────│    Tips      │
     │              │        │   Tilbeh&oslash;r*    │        │   Tjenester  │
     └──────────────┘        └────────────────┘        └──────────────┘
                                     │
                              ┌──────┴──────┐
                              │ Handlekurv  │
                              └─────────────┘

     * Tilbeh&oslash;r er ikke i hovednav — tilgjengelig via s&oslash;k, footer, og kontekstuelt p&aring; PDP
```

---

## 6. Implementeringsr&aring;d

1. **Tilbeh&oslash;r beh&oslash;ver ikke eget nav-item.** Vis det kontekstuelt p&aring; PDP-er ("Anbefalt utstyr") og i footer. Har for lav trafikk til &aring; fortjene toppniv&aring;.
2. **Solskjerming b&oslash;r f&aring; egen god PLP** (16K s&oslash;k/mnd) men som underside av /tilbehor/, ikke toppniv&aring;.
3. **Footer b&oslash;r utvides** — gjenta alle hovedkategorier, legg til nyhetsbrev, sosiale medier, kundeklubb.
4. **Breadcrumbs p&aring; alle sider** — mangler helt i dag.
5. **S&oslash;k b&oslash;r v&aelig;re prominent** — 69% av trafikken er organisk s&oslash;k, s&aring; intern s&oslash;kefunksjon m&aring; v&aelig;re f&oslash;rsteklasses.
