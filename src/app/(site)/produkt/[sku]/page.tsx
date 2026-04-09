import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/pdp/Breadcrumb";
import { ProductHeroClient } from "@/components/pdp/ProductHeroClient";
import { RatingStars } from "@/components/pdp/RatingStars";
import { SEED_PRODUCTS, SEED_ARTICLES, SEED_COLORS } from "@/lib/seed/data";
import { getProductBySlug } from "@/lib/productData";
import { buildBreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerReveal, StaggerItem } from "@/components/motion/StaggerReveal";
import { SpecGrid } from "@/components/pdp/SpecGrid";
import { client } from "@/lib/sanity/client";
import { PRODUCT_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { getAllProductAttributes } from "@/lib/sanity/productAttributes";

type Props = { params: Promise<{ sku: string }> };

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fargerike.no";

/**
 * Henter produkt fra Sanity, faller tilbake til seed-data.
 * Normaliserer til felles format for PDP-rendering.
 */
async function getProduct(slug: string): Promise<any | null> {
  const seed = slug === "lady-pure-color" ? SEED_PRODUCTS.ladyPureColor : null;

  // Try Sanity first
  try {
    const sanityProduct = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
    if (sanityProduct) {
      return {
        ...seed,
        ...sanityProduct,
        images: seed?.images || sanityProduct.images,
        rating: seed?.rating,
        recommendedEquipment: seed?.recommendedEquipment || sanityProduct.recommendedEquipment,
        notSuitableFor: seed?.notSuitableFor,
        _source: "sanity",
      };
    }
  } catch {
    // Fallback silently
  }

  // Try families.json data
  const familyProduct = getProductBySlug(slug);
  if (familyProduct) {
    return {
      ...seed,
      sku: familyProduct.sku,
      displayName: familyProduct.displayName,
      brand: familyProduct.brand,
      productLine: familyProduct.productLine,
      subtitle: familyProduct.subtitle,
      longDescription: familyProduct.longDescription,
      highlights: familyProduct.highlights,
      variants: familyProduct.variants,
      slug: { current: familyProduct.slug },
      _colorOptions: familyProduct.colorOptions,
      _specs: familyProduct.specs,
      _finishName: familyProduct.finishName,
      _applicationArea: familyProduct.applicationArea,
      _source: "families",
    };
  }

  if (seed) return { ...seed, _source: "seed" };
  return null;
}

export const revalidate = 3600;

// SEO-1: Canonical + SEO-2: Open Graph + SEO-6: Robots
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sku } = await params;
  const product = await getProduct(sku);
  if (!product) return { title: `Produkt ${sku} | Fargerike` };

  const title = `${product.displayName} – ${product.brand} | Fargerike`;
  const description = `${product.subtitle}. ${product.highlights?.[0]}. Fra ${product.variants?.[0]?.price} kr.`;
  const url = `${BASE_URL}/produkt/${sku}`;
  const imageUrl = product.images?.[0]?.url;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: "index, follow",
    openGraph: {
      title: `${product.displayName} – ${product.brand}`,
      description,
      url,
      type: "website",
      images: imageUrl ? [{ url: imageUrl, alt: product.displayName }] : undefined,
      siteName: "Fargerike",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.displayName} – ${product.brand}`,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { sku } = await params;
  const [product, productAttributes] = await Promise.all([
    getProduct(sku),
    getAllProductAttributes(),
  ]);

  if (!product) {
    notFound();
  }

  const articles = [SEED_ARTICLES.howToPaintWall, SEED_ARTICLES.paintSafeForKids, SEED_ARTICLES.choosingColorBedroom];

  const EQUIPMENT_LABELS: Record<string, string> = {
    "Påføring": "Påføring",
    "Pensler": "Pensler",
    "Forberedelse": "Forberedelse",
    "Maskering": "Maskering",
    "Beskyttelse": "Beskyttelse",
    application: "Påføring",
    brushes: "Pensler",
    preparation: "Forberedelse",
    masking: "Maskering",
    protection: "Beskyttelse",
  };

  const equipmentByCategory: Record<string, any[]> = {};
  for (const e of product.recommendedEquipment ?? []) {
    (equipmentByCategory[e.category] ??= []).push(e);
  }

  const breadcrumbItems = [
    { label: "Forside", href: "/" },
    { label: "Maling", href: "/kategori/maling" },
    { label: "Innendørs veggmaling", href: "/kategori/veggmaling" },
    { label: product.displayName },
  ];

  return (
    <>
      {/* SEO-4 + SEO-5: Product JSON-LD med image, gtin, mpn, category */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.displayName,
          brand: { "@type": "Brand", name: product.brand },
          description: product.longDescription || product.subtitle,
          sku: product.sku,
          image: product.images?.[0]?.url,
          gtin13: product.gtin13,
          mpn: product.mpn,
          category: product.googleCategory,
          ...(product.rating && {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating.score,
              reviewCount: product.rating.count,
            },
          }),
          offers: product.variants?.map((v) => ({
            "@type": "Offer",
            price: v.price,
            priceCurrency: "NOK",
            name: v.volume,
            availability: "https://schema.org/InStock",
          })),
        }}
      />

      {/* SEO-3: BreadcrumbList JSON-LD */}
      <JsonLd
        data={buildBreadcrumbJsonLd(
          breadcrumbItems
            .filter((b) => b.href)
            .map((b) => ({ name: b.label, url: `${BASE_URL}${b.href}` })),
        )}
      />

      {/* Breadcrumb */}
      <section className="border-b border-zinc-100">
        <Container>
          <Breadcrumb items={breadcrumbItems} />
        </Container>
      </section>

      {/* Hero */}
      <section className="border-b border-zinc-100">
        <Container>
          <ProductHeroClient
            product={product}
            availableColors={product._colorOptions || []}
            initialColor={null}
          />
        </Container>
      </section>

      {/* AEO-1: Produktbeskrivelse i prosa */}
      {product.longDescription && (
        <section className="py-12">
          <Container>
            <ScrollReveal>
              <div className="mx-auto max-w-3xl">
                <p className="text-lg leading-relaxed text-zinc-700">
                  {product.longDescription}
                </p>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      )}

      {/* ═══ Feature Blocks — redaksjonelle product highlights ═══ */}

      {/* Feature: Supermatt (hero) */}
      <section className="py-20 overflow-hidden">
        <Container>
          <ScrollReveal>
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Supermatt finish</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
                Fargen slik den <br className="hidden lg:block" />egentlig er.
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-zinc-500 max-w-md">
                Lady Pure Color eliminerer lysrefleksjoner fullstendig. Resultatet er en dyp, fl&oslash;yelsmyk overflate der fargen vises i sin reneste form &mdash; uten kompromiss.
              </p>
              <div className="mt-6 flex items-center gap-6">
                <div>
                  <p className="text-2xl font-bold tracking-tight">01</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Glansgrad</p>
                </div>
                <div className="h-8 w-px bg-zinc-200" />
                <div>
                  <p className="text-2xl font-bold tracking-tight">0 %</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Refleksjon</p>
                </div>
                <div className="h-8 w-px bg-zinc-200" />
                <div>
                  <p className="text-2xl font-bold tracking-tight">100 %</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Farge</p>
                </div>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors active:scale-[0.98]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                Bestill fargep&oslash;ve
              </button>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden" style={{ backgroundColor: "#ab8073" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/50 text-[11px] font-medium uppercase tracking-widest">2856 Warm Blush</p>
                  <p className="text-white text-lg font-semibold mt-1">Supermatt &mdash; null refleksjon</p>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Feature: Cards (3 fordeler) */}
      <section className="py-20 border-t border-zinc-100">
        <Container>
          <ScrollReveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 text-center">Derfor velger kundene Lady Pure Color</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-center">Bygget for hverdagen.</h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "&#x1f6e1;&#xfe0f;",
                heading: "Dekker med 2 str\u00f8k",
                body: "Garantert dekning med to str\u00f8k, selv over m\u00f8rkere farger. Spar tid og maling.",
                stat: "2",
                statLabel: "str\u00f8k",
              },
              {
                icon: "&#x1f32c;&#xfe0f;",
                heading: "Ingen lukt",
                body: "VOC under 1 g/L \u2014 langt under EU-grensen p\u00e5 30 g/L. Trygt for barnerom fra dag \u00e9n.",
                stat: "<1",
                statLabel: "g/L VOC",
              },
              {
                icon: "&#x2728;",
                heading: "Enkel vedlikehold",
                body: "T\u00e5ler forsiktig vask med fuktig klut. Hverdagsflekker fjernes uten \u00e5 skade den matte overflaten.",
                stat: "3",
                statLabel: "vaskeklasse",
              },
            ].map((card, i) => (
              <StaggerItem key={i}>
              <div className="rounded-2xl bg-zinc-50/80 border border-zinc-200/60 p-6 h-full flex flex-col">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-2xl" dangerouslySetInnerHTML={{ __html: card.icon }} />
                  <div className="text-right">
                    <span className="text-2xl font-bold tracking-tight">{card.stat}</span>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider">{card.statLabel}</p>
                  </div>
                </div>
                <h3 className="text-[15px] font-semibold text-zinc-900">{card.heading}</h3>
                <p className="mt-2 text-[13px] text-zinc-500 leading-relaxed flex-1">{card.body}</p>
              </div>
              </StaggerItem>
            ))}
          </div>
        </Container>
      </section>

      {/* Feature: Split (Svanemerket) */}
      <section className="py-20 border-t border-zinc-100">
        <Container>
          <ScrollReveal>
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 aspect-[4/3] rounded-3xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-3">&#x1f3f7;&#xfe0f;</div>
                <p className="text-xs text-zinc-400 font-medium">Sertifiseringsbilde</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">Svanemerket</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Klimabevisst <br className="hidden lg:block" />uten kompromiss.
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-zinc-500 max-w-md">
                Svanemerket stiller Nordens strengeste krav til milj&oslash;p&aring;virkning. Lady Pure Color oppfyller alle &mdash; med dokumentert klimaavtrykk via EPD (1.81 kg CO&#8322;-eq/kg).
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Svanemerket", "ISO 14001", "EPD-dokumentert"].map(cert => (
                  <span key={cert} className="rounded-full bg-emerald-50 border border-emerald-200/60 px-3 py-1.5 text-[11px] font-medium text-emerald-700">{cert}</span>
                ))}
              </div>
            </div>
          </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Populære farger */}
      <section className="bg-zinc-50 py-12">
        <Container>
          <h2 className="text-xl font-bold">Popul&aelig;re farger i {product.displayName}</h2>
          <p className="mt-1 text-sm text-zinc-600">
            {product.displayName} finnes i alle Lady-kul&oslash;rer. Her er noen av de mest popul&aelig;re:
          </p>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
            {(product._colorOptions || []).slice(0, 8).map((c: any) => (
              <Link key={c.colorCode} href={`/farge/${c.colorCode}`} className="group flex-shrink-0 text-center">
                <div
                  className="h-16 w-16 rounded-full shadow-sm transition-transform group-hover:scale-110"
                  style={{ backgroundColor: c.hexValue }}
                />
                <p className="mt-2 text-xs font-medium">{c.name}</p>
                <p className="text-[10px] text-zinc-400">{c.ncsCode}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ Teknisk ═══ */}
      <section className="py-20 border-t border-zinc-100">
        <Container>
          <ScrollReveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Spesifikasjoner</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Teknisk</h2>
            <p className="mt-2 text-[15px] text-zinc-500">Trykk p&aring; en verdi for &aring; l&aelig;re mer.</p>
          </ScrollReveal>

          <SpecGrid productName={product.displayName} attributes={productAttributes} specs={[
            { label: "Dekning", value: "8\u201310 m\u00b2/L", code: "coverage" },
            { label: "Str\u00f8k", value: "2", code: "coats" },
            { label: "T\u00f8rketid", value: "2 t", code: "dryingTime" },
            { label: "Glans", value: "Helmatt", code: "gloss" },
            { label: "VOC", value: "<1 g/L", code: "voc" },
            { label: "Sertifisert", value: "Svanemerket", code: "certification" },
          ]} />

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            {/* Alle detaljer */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">Alle detaljer</p>
              <div className="rounded-2xl bg-zinc-50/80 border border-zinc-200/60 overflow-hidden">
                {[
                  { label: "Bindemiddel", value: product.binderType },
                  { label: "P\u00e5f\u00f8ringsmetoder", value: product.applicationMethods?.join(", ") },
                  { label: "Rengj\u00f8ring", value: product.cleanup },
                  ...(product.technicalSpecs || []).map(s => ({ label: s.label, value: s.value })),
                ].map((row, i) => (
                  <div key={i} className={`flex justify-between items-baseline px-5 py-3.5 ${i > 0 ? "border-t border-zinc-200/40" : ""}`}>
                    <dt className="text-[13px] text-zinc-500">{row.label}</dt>
                    <dd className="text-[13px] font-medium text-zinc-900 text-right">{row.value}</dd>
                  </div>
                ))}
              </div>
            </div>

            {/* Overflater */}
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-3">Egnet for</p>
                <div className="flex flex-wrap gap-2">
                  {product.surfaceTypes?.map((s, i) => (
                    <Link key={i} href={`/kategori/veggmaling?overflate=${encodeURIComponent(s.toLowerCase())}`}
                      className="rounded-full bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 text-[12px] font-medium text-emerald-700 hover:bg-emerald-100 transition-colors">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="inline -mt-0.5 mr-1"><polyline points="20 6 9 17 4 12" /></svg>{s}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-3">Ikke egnet for</p>
                <div className="flex flex-wrap gap-2">
                  {product.notSuitableFor?.map((item, i) => (
                    <span key={i} className="rounded-full bg-zinc-100 border border-zinc-200/60 px-3.5 py-1.5 text-[12px] font-medium text-zinc-500">
                      {item.text}
                      {item.linkedProduct && (
                        <Link href={`/produkt/${item.linkedProduct.slug}`} className="ml-1 text-zinc-900 underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-900 transition-colors">
                          &rarr; {item.linkedProduct.name}
                        </Link>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sertifiseringer — Apple-style statement cards */}
          {product.certifications && (
            <div className="mt-16">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-5">Milj&oslash; og sertifiseringer</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { eyebrow: "Milj\u00f8merke", icon: "\ud83e\udda2", color: "text-emerald-500", heading: "Svanemerket.", body: "Nordens strengeste krav til milj\u00f8 og helse. Dokumentert lav p\u00e5virkning gjennom hele livsl\u00f8pet.", url: product.certifications[0]?.url },
                  { eyebrow: "Klimaavtrykk", icon: "\ud83c\udf0d", color: "text-sky-500", heading: "1.81 kg CO\u2082-eq.", body: "Per kg maling. Dokumentert via EPD \u2014 milj\u00f8deklarasjon som kartlegger produktets fotavtrykk.", url: product.certifications[2]?.url },
                  { eyebrow: "Inneklima", icon: "\ud83c\udf3f", color: "text-teal-500", heading: "<1 g/L VOC.", body: "Langt under EU-grensen p\u00e5 30 g/L. Trygt for barnerom og soverom fra dag \u00e9n.", url: "#" },
                ].map((card, i) => (
                  <StaggerItem key={i}>
                  <a href={card.url} target="_blank" rel="noopener noreferrer"
                    className="group relative flex flex-col rounded-2xl bg-zinc-50/80 border border-zinc-200/60 p-6 min-h-[260px] transition-colors hover:border-zinc-300">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">{card.eyebrow}</p>
                    <p className={`mt-3 text-xl font-semibold tracking-tight ${card.color}`}>{card.heading}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-zinc-500 flex-1">{card.body}</p>
                    <div className="mt-4 self-end h-7 w-7 rounded-full bg-zinc-200/80 group-hover:bg-zinc-900 flex items-center justify-center transition-colors duration-200">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-zinc-400 group-hover:text-white transition-colors duration-200">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </a>
                  </StaggerItem>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Anbefalt utstyr – horisontal scroll per kategori */}
      <section className="bg-zinc-50 py-16">
        <Container>
          <ScrollReveal>
          <h2 className="text-2xl font-bold">Anbefalt utstyr</h2>
          <p className="mt-2 text-zinc-600">
            Alt du trenger for &aring; male med {product.displayName}. Tilgjengelig i din n&aelig;rmeste Fargerike-butikk.
          </p>
          </ScrollReveal>

          <div className="mt-8 space-y-8">
            {Object.entries(equipmentByCategory).map(([category, items]) => (
              <div key={category}>
                <h3 className="mb-3 text-sm font-semibold text-zinc-500 uppercase">
                  {EQUIPMENT_LABELS[category] || category}
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
                  {items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 snap-start w-[200px] rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md"
                    >
                      {/* Image with tag overlay + blend-mode darken */}
                      <div className="relative mb-3 aspect-square w-full rounded-lg bg-zinc-100 overflow-hidden">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className="h-full w-full object-contain p-3 mix-blend-darken"
                            loading="lazy"
                          />
                        )}
                        {item.tag && (
                          <span className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            item.tag === "must-have" ? "bg-zinc-900 text-white" :
                            item.tag === "popular" ? "bg-amber-100 text-amber-800" :
                            item.tag === "new" ? "bg-blue-100 text-blue-800" :
                            "bg-zinc-100 text-zinc-600"
                          }`}>
                            {item.tag === "must-have" ? "Must have" :
                             item.tag === "popular" ? "Popul\u00e6r" :
                             item.tag === "new" ? "Nyhet" : item.tag}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <p className="text-sm font-medium leading-tight line-clamp-2">{item.productName}</p>
                      <p className="mt-1 text-xs text-zinc-500 line-clamp-1">{item.description}</p>

                      {/* Price + add to cart */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-baseline gap-1.5">
                          {item.campaignPrice ? (
                            <>
                              <span className="text-sm font-bold text-red-600">{item.campaignPrice} kr</span>
                              <span className="text-xs text-zinc-400 line-through">{item.price} kr</span>
                            </>
                          ) : (
                            <span className="text-sm font-semibold">{item.price} kr</span>
                          )}
                        </div>
                        <button className="h-7 w-7 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-zinc-700 transition-colors active:scale-90" aria-label="Legg i handlekurv">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Relaterte guider – UX-4: med bilder */}
      <section className="py-16">
        <Container>
          <ScrollReveal>
            <h2 className="text-2xl font-bold">Guider og tips</h2>
            <p className="mt-2 text-zinc-600">
              L&aelig;r teknikken som gir profesjonelt resultat &ndash; fra forberedelse til siste str&oslash;k.
            </p>
          </ScrollReveal>
          <StaggerReveal className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <StaggerItem key={article.slug.current}>
              <Link
                href={`/artikkel/${article.slug.current}`}
                className="group block overflow-hidden rounded-xl border border-zinc-200 transition-shadow hover:shadow-md"
              >
                {"coverImage" in article && article.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="aspect-[16/9] w-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-5">
                  <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                    {article.articleType === "howto" ? "Guide" : "Inspirasjon"}
                  </p>
                  <h3 className="mt-2 font-semibold group-hover:underline">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      {/* ═══ Anmeldelser ═══ */}
      <section id="anmeldelser" className="border-t border-zinc-100 py-20">
        <Container>
          <ScrollReveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Kundene forteller</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Anmeldelser</h2>
          </ScrollReveal>

          {/* AI Summary */}
          <div className="mt-8 rounded-2xl bg-zinc-50/80 border border-zinc-200/60 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-5 w-5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M12 3v18M3 12h18" /></svg>
              </div>
              <span className="text-xs font-semibold text-zinc-700">AI-oppsummering</span>
              <span className="text-[10px] text-zinc-400 ml-auto">Basert p&aring; {product.rating?.count} anmeldelser</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 mb-2">Det kundene liker</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-[13px] text-zinc-600 leading-relaxed">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>
                    Supermatt overflate som gj&oslash;r fargen rik og dyp &mdash; ingen refleksjoner
                  </li>
                  <li className="flex items-start gap-2 text-[13px] text-zinc-600 leading-relaxed">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>
                    Dekker godt med 2 str&oslash;k, ingen lukt, t&oslash;rker raskt
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 mb-2">Verdt &aring; vite</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-[13px] text-zinc-600 leading-relaxed">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                    Krever v&aring;tt-i-v&aring;tt-teknikk p&aring; store flater for jevnt resultat
                  </li>
                  <li className="flex items-start gap-2 text-[13px] text-zinc-600 leading-relaxed">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                    Ikke egnet for treverk eller kj&oslash;kkenfronter &mdash; bruk Lady Supreme Finish
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px]">
            {/* Reviews column */}
            <div>
              {[
                { name: "Vidar Aamodt", initials: "VA", date: "12. mars 2026", score: 5, verified: true, text: "Ble lei av hvite d\u00f8rer, malte d\u00f8rkarmer i Sand og d\u00f8rblad i Evening Stone \u2013 gir tyngde. Veldig forn\u00f8yd med malingen, n\u00e5 er det bare veggene igjen. \ud83d\ude0a", reply: "Takk for bildet! Det ble kjempefint. Det er utrolig hva litt maling kan gj\u00f8re n\u00e5r man begynner \u00e5 bli lei \ud83d\ude0a", color: "#b5a08a" },
                { name: "Monica Finnanger", initials: "MF", date: "27. mars 2025", score: 5, verified: true, text: "Brukte denne p\u00e5 soverommet i fargen Warm Blush. S\u00e5 utrolig lekkert! Supermatt overflate som virkelig gj\u00f8r fargen justice. Dekket perfekt med 2 str\u00f8k.", color: "#ab8073" },
                { name: "Erik Solberg", initials: "ES", date: "14. feb 2026", score: 4, verified: true, text: "Flott maling med veldig fint mattresultat. Trekker ett stjerne fordi den er litt vanskelig \u00e5 jobbe med p\u00e5 store flater \u2013 m\u00e5 jobbe v\u00e5tt i v\u00e5tt for jevnt resultat.", reply: "Hei Erik! Godt tips: bruk en st\u00f8rre rull (25 cm) og jobb i litt st\u00f8rre felt. Da f\u00e5r du bedre flyt.", color: "#8a7e6f" },
                { name: "Silje Kristiansen", initials: "SK", date: "3. jan 2026", score: 5, verified: true, text: "Tredje gang jeg bruker Lady Pure Color. Fargen Timeless p\u00e5 stuen denne gangen. Like imponert hver gang. Ingen lukt, t\u00f8rker raskt, og det matte uttrykket er helt nydelig." },
              ].map((review, i) => (
                <StaggerItem key={i}>
                <div className={`py-7 ${i > 0 ? "border-t border-zinc-200/60" : ""}`}>
                  <div className="flex items-start gap-3.5">
                    {/* Avatar with color accent */}
                    <div className="relative shrink-0">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 flex items-center justify-center text-[13px] font-semibold text-zinc-600">
                        {review.initials}
                      </div>
                      {review.color && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#fafaf8]" style={{ backgroundColor: review.color }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-zinc-900">{review.name}</span>
                        {review.verified && (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                            Verifisert
                          </span>
                        )}
                        <span className="text-[11px] text-zinc-400">{review.date}</span>
                      </div>
                      <div className="mt-1 flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= review.score ? "#d4a017" : "#e4e4e7"} stroke="none">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <p className="mt-2.5 text-[15px] leading-relaxed text-zinc-700">{review.text}</p>
                    </div>
                  </div>
                  {review.reply && (
                    <div className="mt-4 ml-[3.375rem] relative pl-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-zinc-200 before:rounded-full">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-zinc-900">Fargerike</span>
                        <span className="h-1 w-1 rounded-full bg-zinc-300" />
                        <span className="text-[10px] text-zinc-400">svar</span>
                      </div>
                      <p className="text-[14px] leading-relaxed text-zinc-500">{review.reply}</p>
                    </div>
                  )}
                </div>
                </StaggerItem>
              ))}
              <div className="pt-4 border-t border-zinc-200/60">
                <button className="w-full rounded-2xl border border-zinc-200/70 bg-zinc-50 py-3.5 text-sm font-medium text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 transition-all active:scale-[0.99]">
                  Vis alle {product.rating?.count} anmeldelser
                </button>
              </div>
            </div>

            {/* Sticky rating card */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl bg-zinc-50 p-6 border border-zinc-200/70">
                <div className="flex items-baseline gap-3">
                  <span className="text-[56px] font-light tracking-tighter leading-none text-zinc-900">{product.rating?.score}</span>
                  <div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= Math.round(product.rating?.score ?? 0) ? "#d4a017" : "#e4e4e7"} stroke="none">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-0.5 text-[11px] text-zinc-400">{product.rating?.count} anmeldelser</p>
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  {[
                    { stars: 5, count: 178 },
                    { stars: 4, count: 98 },
                    { stars: 3, count: 22 },
                    { stars: 2, count: 8 },
                    { stars: 1, count: 6 },
                  ].map(r => (
                    <div key={r.stars} className="flex items-center gap-2.5">
                      <span className="w-2 text-[11px] text-zinc-400 text-right tabular-nums">{r.stars}</span>
                      <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(r.count / 312) * 100}%`, backgroundColor: r.stars >= 4 ? "#d4a017" : r.stars === 3 ? "#e4b84d" : "#d4d4d8" }} />
                      </div>
                      <span className="w-6 text-[11px] text-zinc-400 text-right tabular-nums">{r.count}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-center gap-1.5">
                  <span className="text-[10px] text-zinc-400">Verifisert av</span>
                  <span className="text-[10px] font-bold text-zinc-500 tracking-wide">LIPSCORE</span>
                </div>
              </div>

              <button className="mt-3 w-full rounded-2xl bg-zinc-900 py-3.5 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors active:scale-[0.99]">
                Skriv en anmeldelse
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ Sp&oslash;rsm&aring;l &amp; svar ═══ */}
      <section className="border-t border-zinc-100 py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
            <div>
              <ScrollReveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">F&aring; hjelp</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">Sp&oslash;rsm&aring;l og svar</h2>
              </ScrollReveal>

              {/* Ask input */}
              <div className="mt-8 rounded-2xl bg-zinc-50/80 border border-zinc-200/60 p-5">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Still et sp&oslash;rsm&aring;l om produktet..."
                    className="flex-1 rounded-xl border border-zinc-200/70 bg-white px-4 py-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-shadow"
                  />
                  <button className="shrink-0 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors active:scale-[0.97]">
                    Send
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shrink-0 animate-pulse" />
                  <p className="text-[11px] text-zinc-400">
                    AI svarer umiddelbart &middot; Fargerike-r&aring;dgiver følger opp ved behov
                  </p>
                </div>
              </div>

              {/* Q&A threads — expandable like FAQ */}
              <div className="mt-6 space-y-3">
                {[
                  {
                    name: "Marte K.", initials: "MK", date: "8. jul 2024",
                    question: "Skal male kj\u00f8kkenfronter i tre, er dette malingen \u00e5 velge?",
                    answer: "Lady Pure Color er designet for vegger og tak \u2013 ikke kj\u00f8kkenfronter. For trefronter anbefaler vi Lady Supreme Finish som t\u00e5ler langt mer slitasje og er tilgjengelig i alle Lady-kul\u00f8rer.",
                    answeredBy: "Fargerike", isAI: false, replies: 1,
                  },
                  {
                    name: "Thomas L.", initials: "TL", date: "22. jan 2026",
                    question: "Kan jeg male rett p\u00e5 nysparklet vegg uten grunning?",
                    answer: "Nye, sparklede overflater b\u00f8r grunnes f\u00f8rst for jevn absorpsjon. Uten grunning risikerer du ujevn farge og d\u00e5rligere heft. Vi anbefaler Jotun Grunning Vegg f\u00f8r Lady Pure Color.",
                    answeredBy: "AI-assistent", isAI: true,
                    source: "Teknisk datablad + FAQ", replies: 1,
                  },
                  {
                    name: "Lise M.", initials: "LM", date: "15. mar 2026",
                    question: "Hva er forskjellen p\u00e5 Lady Pure Color og Lady Wonderwall?",
                    answer: "Pure Color er supermatt (glansgrad 01) \u2013 dypere farger, null refleksjon. Wonderwall er matt (05) og t\u00e5ler mer vask (klasse 2 vs 3). Velg Pure Color for soverom, Wonderwall for stue og gang.",
                    answeredBy: "AI-assistent", isAI: true,
                    source: "Produktspesifikasjoner", replies: 1,
                  },
                ].map((qa, i) => (
                  <StaggerItem key={i}>
                  <details className="group rounded-2xl bg-zinc-50/80 border border-zinc-200/60 transition-all duration-200 hover:border-zinc-300 open:bg-zinc-50 open:border-zinc-300">
                    <summary className="flex cursor-pointer items-center gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
                      <span className="shrink-0 flex items-center justify-center h-7 w-7 rounded-xl bg-zinc-200/70 group-open:bg-zinc-900 transition-colors duration-300">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-zinc-400 group-open:text-white transition-all duration-300 group-open:rotate-45">
                          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-zinc-800 truncate">{qa.question}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-zinc-400">{qa.name} &middot; {qa.date}</span>
                          <span className="text-[10px] text-zinc-400">&middot; {qa.replies} svar</span>
                        </div>
                      </div>
                    </summary>
                    <div className="px-5 pb-5 pl-[3.75rem]">
                      <div className="rounded-xl bg-white border border-zinc-200/60 px-4 py-3.5">
                        <div className="flex items-center gap-2 mb-2">
                          {qa.isAI ? (
                            <>
                              <div className="h-4 w-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M12 3v18M3 12h18" /></svg>
                              </div>
                              <span className="text-[11px] font-semibold text-zinc-600">AI-assistent</span>
                            </>
                          ) : (
                            <>
                              <div className="h-4 w-4 rounded-full bg-zinc-900 flex items-center justify-center text-[7px] font-bold text-white">F</div>
                              <span className="text-[11px] font-semibold text-zinc-600">Fargerike</span>
                            </>
                          )}
                        </div>
                        <p className="text-[13px] leading-relaxed text-zinc-600">{qa.answer}</p>
                        {qa.isAI && qa.source && (
                          <p className="mt-2.5 text-[10px] text-zinc-400 flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                            {qa.source}
                          </p>
                        )}
                      </div>
                    </div>
                  </details>
                  </StaggerItem>
                ))}
              </div>
            </div>

            {/* Contact sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <div className="rounded-2xl bg-zinc-50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-600">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">Snakk med oss</p>
                    <p className="text-[11px] text-zinc-400">Vi svarer innen 2 timer</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <a href="tel:+4769696969" className="flex items-center gap-3 rounded-xl bg-white border border-zinc-200/70 px-4 py-3 text-sm font-medium text-zinc-700 hover:border-zinc-300 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    69 69 69 69
                  </a>
                  <a href="mailto:hjelp@fargerike.no" className="flex items-center gap-3 rounded-xl bg-white border border-zinc-200/70 px-4 py-3 text-sm font-medium text-zinc-700 hover:border-zinc-300 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                    hjelp@fargerike.no
                  </a>
                </div>
                <p className="mt-3 text-[10px] text-zinc-400 text-center">Man\u2013fre 08\u201318 &middot; L\u00f8r 10\u201315</p>
              </div>

              <button className="w-full rounded-2xl bg-zinc-900 px-5 py-3.5 flex items-center justify-center gap-2.5 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors active:scale-[0.98]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Start chat
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="border-t border-zinc-100 py-20">
        <Container>
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Alt du lurer p&aring;</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Ofte stilte sp&oslash;rsm&aring;l</h2>
              <p className="mt-3 text-[15px] text-zinc-500 leading-relaxed">
                F&aring;r du ikke svar her? <button className="font-medium text-zinc-900 underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-900 transition-colors">Sp&oslash;r oss direkte</button> &mdash; vi svarer innen 2 timer.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 max-w-2xl space-y-3">
            {product.faq?.map((item, i) => (
              <StaggerItem key={i}>
              <details className="group rounded-2xl bg-zinc-50/80 border border-zinc-200/60 transition-all duration-200 hover:border-zinc-300 open:bg-zinc-50 open:border-zinc-300">
                <summary className="flex cursor-pointer items-center gap-4 px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <span className="shrink-0 flex items-center justify-center h-8 w-8 rounded-xl bg-zinc-100 group-open:bg-zinc-900 transition-colors duration-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-zinc-400 group-open:text-white transition-all duration-300 group-open:rotate-45">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                  <span className="text-[15px] font-medium text-zinc-800 group-open:text-zinc-900 transition-colors">{item.question}</span>
                </summary>
                <div className="px-6 pb-6 pl-[4.5rem]">
                  <p className="text-[14px] text-zinc-500 leading-[1.7]">{item.answer}</p>
                </div>
              </details>
              </StaggerItem>
            ))}
          </div>

          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: product.faq?.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }}
          />
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 py-16 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Klar for &aring; male?</h2>
            <p className="mt-3 text-zinc-300">
              Finn {product.displayName} og anbefalt utstyr i din n&aelig;rmeste Fargerike-butikk.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/butikker" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100">
                Finn butikk
              </Link>
              <Link href="/tjeneste/fargekonsultasjon" className="rounded-full border border-zinc-600 px-6 py-3 text-sm font-semibold text-white hover:border-zinc-400">
                Book konsultasjon
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
