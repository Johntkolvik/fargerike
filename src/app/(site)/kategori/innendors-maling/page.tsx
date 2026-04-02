import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal, StaggerItem } from "@/components/motion/StaggerReveal";

export const metadata: Metadata = {
  title: "Innendørs maling | Fargerike",
  description: "Finn riktig maling for ditt prosjekt. Vegg, tak, tre og panel, gulv eller våtrom — vi hjelper deg hele veien.",
};

/* ── Surface groups (ICP strategy) ───────────────── */

const SURFACE_GROUPS = [
  {
    slug: "vegg",
    title: "Veggmaling",
    subtitle: "Stue, soverom, gang og kjøkken",
    description: "Den viktigste overflaten i hjemmet. Velg mellom supermatt for soverom eller vaskbar for gang og kjøkken.",
    color: "#E8D5C4",
    products: [
      { name: "Lady Pure Color", tagline: "Supermatt – fargen på sitt vakreste", gloss: "01 Helmatt", slug: "lady-pure-color", badge: "Mest populær", washClass: 3, price: 299 },
      { name: "Lady Wonderwall", tagline: "Vaskbar og slitesterk", gloss: "05 Matt", slug: "lady-wonderwall", washClass: 1, price: 279 },
      { name: "Sens", tagline: "Allergivennlig, NAAF-anbefalt", gloss: "07 Silkematt", slug: "sens", badge: "NAAF", washClass: 2, price: 269 },
      { name: "Lady Balance", tagline: "God dekning til en god pris", gloss: "05 Matt", slug: "lady-balance", washClass: 2, price: 229 },
    ],
    tip: "Usikker? Lady Wonderwall er trygt valg for de fleste rom. Vil du ha det vakreste matte uttrykket? Gå for Lady Pure Color.",
  },
  {
    slug: "tak",
    title: "Takmaling",
    subtitle: "Tak i alle rom",
    description: "Taket får sjelden oppmerksomheten det fortjener. Riktig takmaling gir rommet høyde og lys.",
    color: "#F5F3EE",
    products: [
      { name: "Sens Tak", tagline: "Helmatt, refleksjonsfri", gloss: "02 Helmatt", slug: "sens-tak", badge: "Anbefalt", washClass: 4, price: 199 },
      { name: "Lady Tak", tagline: "Lett å jobbe med", gloss: "03 Matt", slug: "lady-tak", washClass: 4, price: 219 },
    ],
    tip: "Takmaling trenger ikke høy vaskeklasse — fokuser på at den er matt og sprut-fri.",
  },
  {
    slug: "tre-og-panel",
    title: "Tre & panel",
    subtitle: "Lister, dører, vinduskarmer, panel og møbler",
    description: "Alt treverk innendørs trenger maling som tåler slitasje. Halvblank eller silkematt — avhengig av hvor synlig overflaten er.",
    color: "#D4CCC0",
    products: [
      { name: "Lady Supreme Finish", tagline: "Premium – for alt treverk", gloss: "15 Halvblank", slug: "lady-supreme-finish", badge: "Anbefalt", washClass: 1, price: 329 },
      { name: "Lady Supreme Finish Matt", tagline: "Silkematt for panel og lister", gloss: "07 Silkematt", slug: "lady-supreme-finish-matt", washClass: 1, price: 329 },
      { name: "Fenomastic Trim", tagline: "Budsjettvennlig for treverk", gloss: "15 Halvblank", slug: "fenomastic-trim", washClass: 1, price: 199 },
    ],
    tip: "Lady Supreme Finish i halvblank er standarden for dører og karmer. Vil du ha et mer moderne uttrykk? Prøv silkematt-varianten på panel.",
  },
  {
    slug: "gulv",
    title: "Gulvmaling",
    subtitle: "Betong, tre og laminat",
    description: "Gulvmaling må tåle daglig slitasje. Vi har løsninger for både betonggulv i kjeller og tregulv på hytta.",
    color: "#C8B89C",
    products: [
      { name: "Jotun Gulvmaling", tagline: "For betong og tregulv", gloss: "15 Halvblank", slug: "jotun-gulvmaling", washClass: 1, price: 399 },
    ],
    tip: "Gulvmaling krever god forbehandling. Vask og slip før du maler — dette er viktigere enn selve malingen.",
  },
  {
    slug: "vatrom",
    title: "Våtrom",
    subtitle: "Bad, vaskerom og kjøkken bak benk",
    description: "Våtromsområder trenger maling som tåler fukt og kondens uten å miste farge eller blemme.",
    color: "#B8C8D0",
    products: [
      { name: "Lady Aqua", tagline: "Våtromsmaling – halvblank", gloss: "15 Halvblank", slug: "lady-aqua", badge: "Våtrom", washClass: 1, price: 349 },
      { name: "Sens Våtrom", tagline: "Allergivennlig våtromsmaling", gloss: "15 Halvblank", slug: "sens-vatrom", badge: "NAAF", washClass: 1, price: 329 },
    ],
    tip: "Våtromsmalinger har spesiell fuktbestandighet. Ikke bruk vanlig veggmaling på bad — det vil blemme.",
  },
];

/* ── Wash class visualization ────────────────────── */

function WashClassDots({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" title={`Vaskeklasse ${value}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`h-1.5 w-3 rounded-full ${
            i <= value ? "bg-zinc-900" : "bg-zinc-200"
          }`}
        />
      ))}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────── */

export default function InteriorPaintCategoryPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-12 pb-8">
        <Container>
          <ScrollReveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">{"Innendørs"}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight lg:text-5xl">
              {"Finn riktig maling"}<br className="hidden sm:block" /> {"for ditt prosjekt."}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500 leading-relaxed">
              {"Hvert rom og hver overflate har sin ideelle maling. Vi hjelper deg velge riktig — enten du skal male vegger i stuen, lister i gangen, eller taket på badet."}
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Quick navigation — prominent surface cards */}
      <section className="pb-16">
        <Container>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {SURFACE_GROUPS.map((g) => (
              <a
                key={g.slug}
                href={`#${g.slug}`}
                className="group relative rounded-2xl border border-zinc-200/60 bg-zinc-50/80 p-5 min-h-[120px] flex flex-col justify-between transition-colors hover:border-zinc-300 hover:bg-white"
              >
                <div className="flex gap-0.5 h-1.5 w-10 rounded-full overflow-hidden">
                  <div className="flex-1 rounded-full" style={{ backgroundColor: g.color }} />
                  <div className="flex-1 rounded-full" style={{ backgroundColor: g.color, opacity: 0.4 }} />
                </div>
                <div className="mt-auto pt-4">
                  <p className="text-[14px] font-semibold text-zinc-900">{g.title}</p>
                  <p className="mt-0.5 text-[11px] text-zinc-400 leading-snug">{g.subtitle}</p>
                </div>
                <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-zinc-200/60 group-hover:bg-zinc-900 flex items-center justify-center transition-colors">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-zinc-400 group-hover:text-white transition-colors rotate-90">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Surface group sections */}
      {SURFACE_GROUPS.map((group, gi) => (
        <section
          key={group.slug}
          id={group.slug}
          className={`py-16 ${gi % 2 === 0 ? "" : "bg-zinc-50/50"}`}
        >
          <Container>
            <ScrollReveal>
              <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16 items-start">
                {/* Left: Section info */}
                <div className="lg:sticky lg:top-24">
                  {/* Color accent bar */}
                  <div className="flex gap-0.5 h-1.5 w-16 rounded-full overflow-hidden mb-4">
                    <div className="flex-1 rounded-full" style={{ backgroundColor: group.color }} />
                    <div className="flex-1 rounded-full" style={{ backgroundColor: group.color, opacity: 0.5 }} />
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight">{group.title}</h2>
                  <p className="mt-1 text-sm text-zinc-400">{group.subtitle}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-500">{group.description}</p>

                  {/* Expert tip */}
                  {group.tip && (
                    <div className="mt-5 rounded-2xl bg-white border border-zinc-200/60 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">&#x1F4A1;</span>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">Tips fra eksperten</p>
                      </div>
                      <p className="text-[13px] leading-relaxed text-zinc-600">{group.tip}</p>
                    </div>
                  )}
                </div>

                {/* Right: Product cards */}
                <StaggerReveal className="space-y-3">
                  {group.products.map((product) => (
                    <StaggerItem key={product.slug}>
                      <Link
                        href={`/produkt/${product.slug}`}
                        className="group flex items-stretch rounded-2xl bg-white border border-zinc-200/60 overflow-hidden transition-all hover:border-zinc-300 hover:shadow-sm"
                      >
                        {/* Product image */}
                        <div className="w-24 sm:w-28 shrink-0 bg-zinc-50 flex items-center justify-center p-3">
                          <img
                            src="https://cdn-pim.jotun.com/images/ProductImages/126075/296x388/126075.png"
                            alt={product.name}
                            className="h-full w-full object-contain mix-blend-darken"
                            loading="lazy"
                          />
                        </div>

                        <div className="flex-1 p-5 flex items-center gap-5">
                          {/* Product info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-[15px] font-semibold text-zinc-900 group-hover:underline underline-offset-2">{product.name}</h3>
                              {product.badge && (
                                <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                                  product.badge === "Mest populær" ? "bg-amber-50 border border-amber-200/60 text-amber-700" :
                                  product.badge === "NAAF" ? "bg-emerald-50 border border-emerald-200/60 text-emerald-700" :
                                  product.badge === "Våtrom" ? "bg-sky-50 border border-sky-200/60 text-sky-700" :
                                  "bg-zinc-100 text-zinc-600"
                                }`}>
                                  {product.badge}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-[13px] text-zinc-500">{product.tagline}</p>

                            {/* Specs row */}
                            <div className="mt-3 flex items-center gap-4 text-[11px] text-zinc-400">
                              <span>{product.gloss}</span>
                              <span className="h-3 w-px bg-zinc-200" />
                              <div className="flex items-center gap-1.5">
                                <span>Vask</span>
                                <WashClassDots value={product.washClass} />
                              </div>
                            </div>
                          </div>

                          {/* Price + arrow */}
                          <div className="shrink-0 text-right flex flex-col items-end gap-2">
                            <div>
                              <p className="text-sm font-semibold">fra {product.price} kr</p>
                              <p className="text-[10px] text-zinc-400">0.68 L</p>
                            </div>
                            <div className="h-7 w-7 rounded-full bg-zinc-100 group-hover:bg-zinc-900 flex items-center justify-center transition-colors">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-zinc-400 group-hover:text-white transition-colors">
                                <polyline points="9 18 15 12 9 6" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      ))}

      {/* Comparison helper */}
      <section className="py-20 border-t border-zinc-100">
        <Container>
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Trenger du hjelp?</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Ikke sikker på hva du trenger?</h2>
              <p className="mt-3 text-[15px] text-zinc-500 leading-relaxed">
                Våre fargerådgivere hjelper deg velge riktig maling for ditt prosjekt — gratis og uforpliktende.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="tel:+4769696969" className="flex items-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  Ring oss
                </a>
                <a href="/tjeneste/fargekonsultasjon" className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-700 hover:border-zinc-300 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  Bestill fargekonsultasjon
                </a>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
