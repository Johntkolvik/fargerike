# UX-spec: Volumvelger og lagerstatus

> Dekker interaksjonsmonstre og norsk copy for volumvalg, mengdevalg og lagerstatus pa tvers av alle flater.
> Kobling: `pdp-produkt.md`, `pdp-farge.md`, `fargevelger.md`, `kjerneflyter-pdp.md`

**Sist oppdatert:** 2026-04-09
**Status:** Utkast (prototype)

---

## 1. Volumvelger

### Interaksjonsmonster

Hver SKU (volum) vises som en rad med +/- knapper. Brukeren kan velge flere volumer samtidig (f.eks. 2 x 2,7 L + 1 x 9 L). Minimum 0, maksimum 20 per volum.

- **Inaktiv rad:** `quantity = 0`, dempet visuelt, ingen rammemarkering
- **Aktiv rad:** `quantity >= 1`, markert ramme (`border-warm-900`), synlig subtotal pa raden
- **Deaktivert rad:** Utsolgt volum, `opacity-60`, +knapp disabled

### Sammendrag for handlekurv

Nar totalt antall > 0, vis oppsummering under volumradene:

```
{antall} spann · {totalLiter} L
```

Eksempel: `3 spann · 14,4 L`

Nar flere volumer er valgt, vis ogsa en detaljlinje:

```
2 x 2,7 L + 1 x 9 L
```

Estimert dekning vises om data finnes:

```
ca. 115–144 m²
```

---

## 2. Lagerstatus — 4 tilstander

| Tilstand | Betingelse | Visuelt | Copy | Interaksjon |
|---|---|---|---|---|
| Pa lager | `stock > 5` | Ingen ekstra indikator | *(ikke vis noe)* | Normal +/- |
| Fa igjen | `stock 1–5` | Amber-prikk, `text-amber-600` | `Kun {n} igjen` | Normal +/-, maks = restlager |
| Utsolgt | `stock = 0` | Rod-prikk, `text-red-500`, rad dimmet | `Utsolgt` | +knapp disabled, kan ikke oke |
| Bestillingsvare | Tilgjengelig, forsinket | Gra-prikk, `text-zinc-500` | `Bestillingsvare · {n} dager` | Normal +/-, vis leveringstid |

### Regler

- **Pa lager:** Ikke vis noe — ren flate, ingen stoy. At varen er pa lager er default-forventningen.
- **Fa igjen:** Terskel <= 5. Copy: `Kun 3 igjen`. Begrens maks-antall til restlager.
- **Utsolgt:** Hele raden far `opacity-60`. Brukeren kan *ikke* legge til, men raden forblir synlig sa de ser at volumet eksisterer.
- **Bestillingsvare:** Fungerer som pa-lager i interaksjon, men viser leveringstid. Copy: `Bestillingsvare · 5 dager`.

---

## 3. Tilbakemeldinger

### Lagt i handlekurv (toast)

```
✓ Lagt i handlekurven
  Lady Wonderwall · 2 x 2,7 L + 1 x 9 L
```

Toast vises i 4 sekunder, kan lukkes. Inkluderer lenke: `Se handlekurv`.

### Feil: utsolgt

Om en bruker pover et utsolgt volum (f.eks. mobil tap pa disabled-knapp):

```
Denne storrelsen er utsolgt. Velg en annen storrelse eller sjekk lagerstatus i butikk.
```

Vis som inline-melding under raden, ikke som modal.

### Advarsel: lavt lager

Vises direkte pa raden — ikke som separat toast. Copy pa raden er tilstrekkelig:

```
Kun 2 igjen
```

---

## 4. Konsistensregler

### Identisk pa alle 4 flater

| Element | Regel |
|---|---|
| Lagerstatus-copy | Samme ordlyd overalt: `Kun {n} igjen`, `Utsolgt`, `Bestillingsvare · {n} dager` |
| Farger/ikoner | Amber for fa-igjen, rod for utsolgt, gra for bestillingsvare |
| Datakilde | Samme API-kall / context-provider, aldri hardkodet |
| StockStatus-type | `"in_stock" \| "few_left" \| "backorder" \| "out_of_stock"` — felles TypeScript-enum |
| Priser | Alltid `{pris},- ` eller `{pris} kr` — velg en og bruk konsekvent |

### Kan variere mellom flater

| Element | Tillatt variasjon |
|---|---|
| Layout | PDP: full bredde. Fargevelger: kompakt kort. Fargedetalj: sidebar-panel |
| Detaljeringsniva | PDP viser literpris (`{kr}/L`), fargevelger kan droppe det |
| Mengdekalkulator | Kun pa PDP og fargedetalj, ikke i fargevelger-grid |
| Popularmerke | `Populaer`-badge vises pa PDP, valgfritt pa andre flater |

### Navnekonvensjoner (norsk copy)

- «Handlekurv» (ikke «handlevogn» eller «kurv»)
- «Spann» som telleenhet for bokser (ikke «stk» eller «enheter»)
- «Legg i handlekurv» pa primaerknapp
- Literverdier: `2,7 L` (komma, mellomrom for L)
- Priser: `1 249,-` (tusenskilletegn med mellomrom, komma-bindestrek)

---

## 5. Grensetilfeller

**Lager synker til 0 etter at bruker har lagt i kurv:**
Vis varsel i handlekurven: `Denne varen er ikke lenger pa lager. Fjern den eller sjekk tilgjengelighet i butikk.` Blokker «Ga til kassen» for utsolgte linjer.

**Lager endres mens bruker ser pa siden:**
Ikke poll i sanntid i prototype. Valider lager ved «Legg i handlekurv»-klikk. Om lageret har endret seg, vis toast: `Lagerstatus er oppdatert. {Volum} har kun {n} igjen.`

**Blandet lager (2,7 L pa lager, 9 L utsolgt):**
Hver rad har sin egen status. Brukeren kan legge til 2,7 L men ikke 9 L. Vis `Utsolgt` pa 9 L-raden. «Legg i handlekurv»-knappen er aktiv sa lenge minst ett volum har `quantity > 0`.

**Bruker har 5 i kurv, lager er 3:**
Ved validering: reduser til maks og vis melding: `Vi har kun 3 av denne pa lager. Antallet er justert.`
