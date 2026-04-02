import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SEED_PRODUCT_LIST, SEED_COLORS, SEED_ARTICLES } from "@/lib/seed/data";

const CATEGORIES = [
  { title: "Veggmaling", slug: "veggmaling", description: "Innvendig vegg og tak", count: 12 },
  { title: "Tre & panel", slug: "tre-og-panel", description: "Listverk, dører, møbler", count: 8 },
  { title: "Gulv", slug: "gulv", description: "Parkett, vinyl, beis", count: 15 },
  { title: "Tapet", slug: "tapet", description: "Mønster, tekstil, vinyl", count: 200 },
  { title: "Solskjerming", slug: "solskjerming", description: "Persienner, plissé, rullegardiner", count: 80 },
  { title: "Farger", slug: "farger", description: "Utforsk kulører fra alle leverandører", count: 2000 },
];

export default function Home() {
  const warmBlush = SEED_COLORS.warmBlush;

  return (
    <>
      {/* Hero – kampanje/inspirasjon */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: warmBlush.hexValue + "20" }}
      >
        <Container>
          <div className="grid gap-8 py-16 lg:grid-cols-2 lg:py-24">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
                Ny farge fra Jotun SENS
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-5xl">
                Warm Blush
              </h1>
              <p className="mt-4 text-lg text-zinc-600 leading-relaxed">
                {warmBlush.description?.slice(0, 120)}...
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/farge/jotun-2856-warm-blush"
                  className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Utforsk fargen
                </Link>
                <Link
                  href="/produkt/lady-pure-color"
                  className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-white"
                >
                  Se produkter
                </Link>
              </div>
            </div>

            {/* Fargeprøve */}
            <div className="flex items-center justify-center">
              <Link href="/farge/jotun-2856-warm-blush">
                <div
                  className="aspect-square w-full max-w-sm rounded-3xl shadow-2xl transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: warmBlush.hexValue }}
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Kategorier */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold">Utforsk sortimentet</h2>
          <p className="mt-2 text-zinc-600">
            Alt du trenger til maleprosjektet – fra inspirasjon til ferdig resultat.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}`}
                className="group rounded-xl border border-zinc-200 p-6 transition-all hover:border-zinc-400 hover:shadow-sm"
              >
                <h3 className="text-lg font-semibold group-hover:underline">
                  {cat.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-500">{cat.description}</p>
                <p className="mt-3 text-xs text-zinc-400">{cat.count}+ produkter</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Produkter – PLP-teaser */}
      <section className="bg-zinc-50 py-16">
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">Populære produkter</h2>
              <p className="mt-2 text-zinc-600">Mest solgte veggmalinger hos Fargerike</p>
            </div>
            <Link href="/kategori/veggmaling" className="text-sm font-medium underline">
              Se alle →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {SEED_PRODUCT_LIST.map((product) => (
              <Link
                key={product.slug}
                href={`/produkt/${product.slug}`}
                className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:shadow-md"
              >
                <div className="flex aspect-square items-center justify-center rounded-lg bg-zinc-100 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={product.displayName}
                    className="max-h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-xs text-zinc-500">{product.brand} {product.productLine}</p>
                  <h3 className="mt-1 text-sm font-semibold group-hover:underline">
                    {product.displayName}
                  </h3>
                  <p className="mt-0.5 text-xs text-zinc-500">{product.subtitle}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm font-semibold">
                    Fra {product.priceFrom} kr
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Farge-showcase */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold">Utforsk farger</h2>
          <p className="mt-2 text-zinc-600">
            Finn din farge – fra varme jordtoner til kjølige nordiske nyanser.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {[
              { ...warmBlush, slug: { current: warmBlush.slug.current } },
              ...warmBlush.relatedColors.map((c) => ({
                name: c.name,
                colorCode: c.colorCode,
                hexValue: c.hexValue,
                slug: { current: c.slug },
              })),
            ].map((c) => (
              <Link
                key={c.slug.current}
                href={`/farge/${c.slug.current}`}
                className="group text-center"
              >
                <div
                  className="aspect-square rounded-2xl shadow-sm transition-all group-hover:shadow-md group-hover:scale-105"
                  style={{ backgroundColor: c.hexValue }}
                />
                <p className="mt-3 text-sm font-medium">{c.name}</p>
                <p className="text-xs text-zinc-500">{c.colorCode}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Guider */}
      <section className="bg-zinc-50 py-16">
        <Container>
          <h2 className="text-2xl font-bold">Guider og inspirasjon</h2>
          <p className="mt-2 text-zinc-600">
            Alt du trenger å vite – fra fargevalg til siste strøk.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[SEED_ARTICLES.howToPaintWall, SEED_ARTICLES.choosingColorBedroom, SEED_ARTICLES.paintSafeForKids].map(
              (article) => (
                <Link
                  key={article.slug.current}
                  href={`/artikkel/${article.slug.current}`}
                  className="group rounded-xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                    {article.articleType === "howto" ? "Guide" : "Inspirasjon"}
                  </p>
                  <h3 className="mt-2 font-semibold group-hover:underline">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 line-clamp-2">
                    {article.excerpt}
                  </p>
                </Link>
              ),
            )}
          </div>
        </Container>
      </section>

      {/* Butikk-CTA */}
      <section className="bg-zinc-900 py-16 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl font-bold">89 butikker over hele Norge</h2>
            <p className="mt-3 text-zinc-300">
              Personlig rådgivning, fargekonsultasjon og hent i butikk.
              Fargerike er Norges største faghandel for maling og farger.
            </p>
            <Link
              href="/butikker"
              className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
            >
              Finn din butikk
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
