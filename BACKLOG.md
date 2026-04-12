# Backlog — Fargerike

**Sist oppdatert:** 12. april 2026

---

## P0 — Kritisk (blokkerer demo/visning)

### Farge-konsolidering
- [ ] **Sl&aring; sammen /farge, /farge/velger, /farge/fargekart, /farge/ncs til &eacute;n side**
  - Utforsk + Fargekart = &eacute;n browse-flate med collection-visning som filter-modus
  - NCS-s&oslash;k integrert i s&oslash;kefeltet (detekter NCS-kode-m&oslash;nster automatisk)
  - Produktfamilie-filter i sidebar (erstatter /farge/velger)
  - ColorSubNav pill-tabs oppdateres eller fjernes
  - Ruter: /farge (alt), /farge/{id} (detalj), /farge/favoritter (beholdes)

### Mobilmeny
- [ ] **Mobilmeny viser ingen navigasjonsitems p&aring; noen sider** — MobileAccordion-items rendres men er usynlige p&aring; enkelte sider. Debug z-index/stacking.
- [ ] **Test mobilmeny p&aring; alle ruter** — verifiser at den fungerer p&aring; /, /farge, /produkt, /artikkel

### Forsiden
- [ ] **Forside-hero mangler bilde p&aring; Vercel** — sjekk at Sanity CDN-bilder lastes i produksjon (CORS/domain-config)
- [ ] **Kategori-kort mangler bilder** — categoryEntries i homePage har image-felt men ingen bilder lastet opp

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

- [ ] **Deprecated middleware** — Next.js varsler: "middleware" convention deprecated, bruk "proxy"
- [ ] **To CartDrawer-implementasjoner** — src/components/cart/CartDrawer.tsx og src/components/color/CartDrawer.tsx med ulike interfaces
- [ ] **Sanity-skjema desynk** — deployet via MCP (forenklet) vs. lokale filer (komplett). M&aring; redeployes n&aring;r Node-kompatibilitet er l&oslash;st.
- [ ] **Ubrukte komponenter** — ColorPickerDrawer (erstattet av MgColorEmbed), QuantitySelector (erstattet av VolumeSelector), AddToCartButton (erstattet av VolumeSelector)
- [ ] **POPULAR_IDS i MgColorEmbed** — inneholder FR-IDer som kanskje ikke finnes i fargedatasettet
- [ ] **Object.groupBy cleanup** — erstattet med for-loop, men b&oslash;r vurdere polyfill n&aring;r Node 22 er standard p&aring; Vercel
