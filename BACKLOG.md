# Backlog — Fargerike

**Sist oppdatert:** 13. april 2026

---

## P0 — Kritisk (blokkerer demo/visning)

### Butikkfinner
- [ ] **Kartvisning (Mapbox)** — Port react-map-gl fra REMA-prototypen. Split-screen: liste + kart.
- [ ] **Sorter/grupper etter fylke** — flat liste er ubrukelig med 86 butikker. Kollapserbare fylke-seksjoner.
- [ ] **Geokod butikkadresser** — koordinater er by-niv&aring;. Bruk adresser til presise GPS via geokoding-API.

### Farge-konsolidering
- [x] ~~Sl&aring; sammen /farge, /farge/velger, /farge/fargekart, /farge/ncs til &eacute;n side~~

### Mobilmeny
- [x] ~~Mobilmeny z-index fikset (MobileNav utenfor header)~~
- [ ] **Test mobilmeny p&aring; alle ruter** — verifiser at den fungerer konsistent

### Forsiden
- [ ] **Forside-hero mangler bilde p&aring; Vercel** — sjekk at Sanity CDN-bilder lastes i produksjon (CORS/domain-config)
- [ ] **Kategori-kort mangler bilder** — categoryEntries i homePage har image-felt men ingen bilder lastet opp

---

### mg-color synk
- [ ] **Hent PhotoVisualizer fra mg-color-prototype** — AI fargevisualisering (Gemini) med rom-bilde upload, flood-fill markering, realistisk resultat. Finnes i mg-color men ikke i Fargerike.
- [ ] **Synk-strategi mellom mg-color og Fargerike** — delte data/komponenter (colors.json, ColorGrid, resolve.ts) kopieres manuelt i dag. Vurder npm-pakke eller monorepo.
- [ ] **Skriv tilbake farge-konsolidering til mg-color** — TASKS-FROM-FARGERIKE.md opprettet i mg-color-prototype

---

## P1 — H&oslash;y prioritet (n&oslash;dvendig for realistisk prototype)

### Nye content blocks
- [ ] **Produkt-slider block** — horisontal scrollbar med produktfamilie-kort (bilde, navn, pris-fra, CTA). For bruk i artikler og p&aring; forsiden.
- [ ] **Farge-slider block** — horisontal rad med fargeswatches fra en collection eller manuelt valgt. For bruk i artikler og inspirasjon.
- [ ] **Artikkel-slider block** — relaterte artikler som horisontal scroll. For bruk p&aring; PDP, fargedetalj, og andre artikler.
- [ ] **Hero-bilde block** — fullbredde bilde med valgfri overlay-tekst. For artikler og inspirasjon.

### Sanity-innhold
- [ ] **Opprett productFamily-dokumenter i Sanity** — Lady Wonderwall, Sens, Lady Pure Color, Lady Balance, Drygolin etc. fra families.json
- [ ] **Koble artikler til productFamily** via relatedProducts (n&aring; peker de bare til productCategory)
- [ ] **Legg til inline productCard-blokker** i artikkel-body (f.eks. "Bruk Drygolin Nordic Extreme" med produktkort)
- [ ] **Opprett productCategory-bilder** — kategorier mangler bilder for forsiden og navigasjon
- [ ] **Berik resterende 9 artikler** med bilder og referanser (kun 5 av 14 er beriket)

### Navigasjon
- [ ] **Mega-meny: lenker fungerer ikke** — alle lenker i mega-menyen er placeholder-URLer (/maling/inne, /inspirasjon/rom/stue etc.) som gir 404
- [ ] **Deploy Sanity-skjema via CLI** — krever Node 20 (Node 22 krasjer). Sett opp .node-version eller fix i CI.
- [ ] **Footer nyhetsbrev-skjema** — input uten handler, trenger integrasjon (Mailchimp/Brevo/etc.)

---

## P2 — Medium prioritet (kvalitet og konsistens)

### SEO
- [ ] **Manglende OpenGraph-bilder** p&aring; artikler, kategorier, butikksider, tjenester, farge-sider (9 sider mangler)
- [ ] **Breadcrumbs p&aring; alle sider** — mangler helt i dag if&oslash;lge nav-audit
- [ ] **JSON-LD p&aring; artikler** — HowTo-schema for guider, Article-schema for inspirasjon
- [ ] **Sitemap fra Sanity** — n&aring;v&aelig;rende sitemap.ts har TODO for dynamiske slugs

### Tilgjengelighet
- [ ] **111 av 116 knapper mangler aria-label** — filterknapper, action buttons, CartDrawer, ViewToggle
- [ ] **Escape-key p&aring; SpecDrawer og CartDrawer** — mangler, inkonsistent med MgColorEmbed
- [ ] **Focus trap i drawere** — ingen drawer har focus trap
- [ ] **S&oslash;kefelt mangler password manager prevention** — data-1p-ignore, data-lpignore

### Designkvalitet
- [ ] **VolumeSelector kampanjepris** — kun p&aring; 2.7L som demo. Kampanjepriser b&oslash;r komme fra produktdata/Sanity, ikke hardkodet i toVolumeOptions.ts
- [ ] **Bucket-bilder** — kun 7 av ~15 produktfamilier har bucket-image mapping. Resten f&aring;r Lady-fallback.
- [ ] **Hardkodede norske strenger** — Header, Footer, ColorLayout, Collections, ColorExplorer, ViewToggle har UI-tekst som b&oslash;r fra CMS
- [ ] **raw &lt;img&gt; tags** — 5 steder bruker &lt;img&gt; i stedet for Next.js &lt;Image&gt; (Header, ColorLayout, ProductV2Hero)

---

## P3 — Lav prioritet (nice to have / fase 2)

### Commerce
- [ ] **Alle "Legg i handlekurv"-knapper er placeholder** p&aring; PDP v1 (AddToCartButton viser fake "Lagt til")
- [ ] **"G&aring; til kassen"** i CartDrawer — ingen checkout-rute
- [ ] **"Bestill fargep&oslash;ve"** — ingen commerce/booking-integrasjon
- [ ] **Lagerstatus fra API** — StockStatus er hardkodet som "in_stock". Trenger Omnium/MGITEM-integrasjon.
- [ ] **Prisdata fra Omnium** — priser er fra families.json, ikke real-time

### Innhold
- [ ] **Inspirasjonshub (/inspirasjon)** — rute eksisterer ikke enn&aring;. Trenger: hero + filter + masonry grid
- [ ] **Tips-hub (/tips)** — rute eksisterer ikke. Trenger: kategori-tiles + artikkel-liste
- [ ] **Q&A-seksjon p&aring; PDP** — input uten handler, hardkodede sp&oslash;rsm&aring;l
- [ ] **Anmeldelser p&aring; PDP** — hardkodede reviews, trenger Lipscore-integrasjon
- [ ] **"Start chat"-knapp** — ingen chat-integrasjon

### Produkt-v2
- [ ] **PDP v1 vs v2** — to parallelle produktsider. Velg &eacute;n og pensj&oacute;ner den andre.
- [ ] **Feature blocks fra Sanity** — featureBlock-schema definerer 4 layouts (hero/split/cards/highlight) men ingen rendrer dem p&aring; PDP
- [ ] **Hardkodede feature-seksjoner p&aring; PDP v1** — "Supermatt finish", "Bygget for hverdagen", "Svanemerket" er JSX, ikke fra CMS

### S&oslash;k
- [ ] **S&oslash;kbar er readOnly** — ingen s&oslash;kefunksjon implementert
- [ ] **Algolia-integrasjon** — TODO i sok/page.tsx. Trenger: AlgoliaProvider, SearchBox, SearchHits
- [ ] **Autocomplete** — FRS spesifiserer livs&oslash;k med autocomplete

### Butikk
- [ ] **Butikkliste viser placeholder** — "Butikkliste med 89 butikker vises her"
- [ ] **Butikkdetalj bruker hardkodet data** — trenger Sanity/Pinmeto-integrasjon
- [ ] **Butikkvelger p&aring; PDP** — "Sjekk lagerstatus i butikk" lenker til /butikker men ingen butikkvalg-kontekst

---

## Teknisk gjeld

- [x] **Deprecated middleware** — Migrert fra middleware.ts til proxy.ts (Next.js 16 convention). Funksjon omdøpt fra `middleware` til `proxy`.
- [x] **To CartDrawer-implementasjoner** — Slettet ubrukt prop-drevet cart/CartDrawer.tsx. Kanonisk versjon: color/CartDrawer.tsx (bruker CartContext, importert i ColorLayout).
- [ ] **Sanity-skjema desynk** — deployet via MCP (forenklet) vs. lokale filer (komplett). Må redeployes når Node-kompatibilitet er løst.
- [x] **Ubrukte komponenter** — Slettet ColorPickerDrawer, QuantitySelector, AddToCartButton. Ingen av dem var importert noe sted.
- [x] **POPULAR_IDS i MgColorEmbed** — Fikset: brukte prefixed IDer (JOTUN/FR) som ikke matchet colors.json. Nå bruker bare tall-IDer som faktisk finnes i datasettet.
- [ ] **Object.groupBy cleanup** — erstattet med for-loop, men b&oslash;r vurdere polyfill n&aring;r Node 22 er standard p&aring; Vercel

---

## &Aring;pne sp&oslash;rsm&aring;l (krever beslutning)

1. **Komplett GSC-s&oslash;keordanalyse** — venter p&aring; data for &aring; verifisere IA for Tapet, Gulv, Solskjerming, Interi&oslash;rmaling. P&aring;virker navigasjon og landingssider.
2. **Kampanjepriser** — 30% p&aring; 2.7L er hardkodet demo. Hvor skal kampanjedata komme fra? Sanity? Omnium? Begge?
3. **S&oslash;kedrawer default-innhold** — kampanjer og anbefalte produkter i &aring;pen-tilstand er hardkodet. B&oslash;r komme fra Sanity homepage-dokument.
4. **mg-color synk-strategi** — npm-pakke, monorepo, eller fortsatt manuell kopi? Trenger arkitekturbeslutning.
5. **PDP v1 vs v2** — toggle fungerer, men b&oslash;r vi velge &eacute;n som standard? Eller beholde toggle som permanent feature?
6. **Sanity-skjema deploy** — lokal CLI krasjer p&aring; Node 22. Trenger .node-version=20 eller CI-pipeline.
