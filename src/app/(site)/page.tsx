import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { client } from "@/lib/sanity/client";
import { HOMEPAGE_QUERY } from "@/lib/sanity/queries";
import { SEED_ARTICLES, SEED_COLORS } from "@/lib/seed/data";
import { getAllProducts } from "@/lib/productData";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Fargerike – Norges fargehandel | Maling, farger og inspirasjon",
  description: "Finn din farge blant 600+ kulører, bestill fargeprøver, og få ekspertrådgivning i 89 butikker over hele Norge.",
  openGraph: {
    title: "Fargerike – Norges fargehandel",
    description: "Maling, farger og inspirasjon. Utforsk kulører, produkter og guider.",
  },
};

/* ---------- Fallback seed data ---------- */
const SEED_CATEGORIES = [
  { title: "Veggmaling", description: "Innvendig vegg og tak", link: "/kategori/veggmaling" },
  { title: "Tre & panel", description: "Listverk, dører, møbler", link: "/kategori/tre-og-panel" },
  { title: "Gulv", description: "Parkett, vinyl, beis", link: "/kategori/gulv" },
  { title: "Tapet", description: "Mønster, tekstil, vinyl", link: "/kategori/tapet" },
  { title: "Solskjerming", description: "Persienner, plissé, rullegardiner", link: "/kategori/solskjerming" },
  { title: "Farger", description: "Utforsk kulører fra alle leverandører", link: "/farge" },
];

const SEED_GUIDES = [
  SEED_ARTICLES.howToPaintWall,
  SEED_ARTICLES.choosingColorBedroom,
  SEED_ARTICLES.paintSafeForKids,
];

/* ---------- Types ---------- */
interface HeroData {
  heading: string;
  tagline: string;
  imageUrl: string | null;
  primaryCta: { label: string; href: string } | null;
  secondaryCta: { label: string; href: string } | null;
  backgroundColor: string | null;
}

interface CategoryEntry {
  title: string;
  description: string;
  imageUrl: string | null;
  link: string;
}

interface ArticleCard {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  articleType: string;
  imageUrl: string | null;
  readingTime?: string | null;
  room?: string | string[] | null;
}

export default async function Home() {
  /* ---------- Fetch from Sanity ---------- */
  let hero: HeroData | null = null;
  let categories: CategoryEntry[] = [];
  let inspirationArticles: ArticleCard[] = [];
  let guides: ArticleCard[] = [];

  try {
    const data = await client.fetch(HOMEPAGE_QUERY);

    if (data?.homePage?.hero) {
      hero = data.homePage.hero;
    }

    if (data?.homePage?.categoryEntries?.length) {
      categories = data.homePage.categoryEntries;
    }

    if (data?.homePage?.inspirationSection?.articles?.length) {
      inspirationArticles = data.homePage.inspirationSection.articles;
    } else if (data?.latestInspiration?.length) {
      inspirationArticles = data.latestInspiration;
    }

    if (data?.latestGuides?.length) {
      guides = data.latestGuides;
    }
  } catch (error) {
    console.error("Failed to fetch homepage data from Sanity:", error);
  }

  /* ---------- Fallbacks ---------- */
  const warmBlush = SEED_COLORS.warmBlush;
  const useHero = hero ?? null;
  const useCategories = categories.length > 0 ? categories : SEED_CATEGORIES;
  const useGuides = guides.length > 0 ? guides : SEED_GUIDES.map((a) => ({
    _id: a._id,
    title: a.title,
    slug: a.slug.current,
    excerpt: a.excerpt,
    articleType: a.articleType,
    imageUrl: null,
    readingTime: "readingTime" in a ? (a as typeof SEED_ARTICLES.howToPaintWall).readingTime : null,
  }));

  return (
    <>
      {/* Hero – CMS-driven or fallback */}
      {useHero ? (
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: useHero.backgroundColor || "#E8D5C4" }}
        >
          <Container>
            <div className="grid gap-8 py-16 lg:grid-cols-2 lg:py-24">
              <div className="flex flex-col justify-center">
                {useHero.tagline && (
                  <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
                    {useHero.tagline}
                  </p>
                )}
                <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-5xl">
                  {useHero.heading}
                </h1>
                <div className="mt-8 flex flex-wrap gap-3">
                  {useHero.primaryCta && (
                    <Link
                      href={useHero.primaryCta.href}
                      className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                    >
                      {useHero.primaryCta.label}
                    </Link>
                  )}
                  {useHero.secondaryCta && (
                    <Link
                      href={useHero.secondaryCta.href}
                      className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-white"
                    >
                      {useHero.secondaryCta.label}
                    </Link>
                  )}
                </div>
              </div>

              {/* Hero image */}
              <div className="flex items-center justify-center">
                {useHero.imageUrl ? (
                  <Image
                    src={useHero.imageUrl}
                    alt={useHero.heading}
                    width={600}
                    height={600}
                    className="rounded-3xl shadow-2xl object-cover"
                    priority
                  />
                ) : (
                  <div
                    className="aspect-square w-full max-w-sm rounded-3xl shadow-2xl"
                    style={{ backgroundColor: useHero.backgroundColor || "#E8D5C4" }}
                  />
                )}
              </div>
            </div>
          </Container>
        </section>
      ) : (
        /* Fallback: original seed hero */
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
      )}

      {/* Kategorier */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold">Utforsk sortimentet</h2>
          <p className="mt-2 text-zinc-600">
            Alt du trenger til maleprosjektet – fra inspirasjon til ferdig resultat.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCategories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.link}
                className="group rounded-xl border border-zinc-200 p-6 transition-all hover:border-zinc-400 hover:shadow-sm overflow-hidden"
              >
                {cat.imageUrl && (
                  <div className="relative -mx-6 -mt-6 mb-4 aspect-[16/9] overflow-hidden">
                    <Image
                      src={cat.imageUrl}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold group-hover:underline">
                  {cat.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-500">{cat.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Produkter – alle malinger fra families.json */}
      <section className="bg-zinc-50 py-16">
        <Container>
          <h2 className="text-2xl font-bold">Malingsprodukter</h2>
          <p className="mt-2 text-zinc-600">Jotuns komplette sortiment for interiør og eksteriør</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {getAllProducts().map((product) => (
              <Link
                key={product.slug}
                href={`/produkt/${product.slug}`}
                className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:shadow-md"
              >
                <div className="flex aspect-square items-center justify-center rounded-lg bg-zinc-100 p-4">
                  <div className="text-center">
                    <p className="text-xs text-zinc-400 uppercase">{product.applicationArea}</p>
                    <p className="mt-1 text-lg font-bold text-zinc-700">{product.displayName}</p>
                    <p className="mt-1 text-xs text-zinc-500">{product.finishName}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-zinc-500">{product.brand} {product.productLine}</p>
                  <h3 className="mt-1 text-sm font-semibold group-hover:underline">
                    {product.displayName}
                  </h3>
                  <p className="mt-0.5 text-xs text-zinc-500">{product.subtitle}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.highlights.slice(0, 3).map((h, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm font-semibold">
                    Fra {product.variants[0]?.price} kr
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Inspirasjon fra Sanity */}
      {inspirationArticles.length > 0 && (
        <section className="py-16">
          <Container>
            <h2 className="text-2xl font-bold">Inspirasjon</h2>
            <p className="mt-2 text-zinc-600">
              Utforsk trender, stiler og fargekombinasjoner for hjemmet ditt.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {inspirationArticles.map((article) => (
                <Link
                  key={article._id}
                  href={`/artikkel/${article.slug}`}
                  className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md"
                >
                  {article.imageUrl ? (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-zinc-100" />
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
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Farge-showcase */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold">Utforsk farger</h2>
          <p className="mt-2 text-zinc-600">
            Finn din farge blant 600+ Jotun-kulører – fra varme jordtoner til kjølige nordiske nyanser.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/farge"
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Utforsk alle kulører
            </Link>
            <Link
              href="/farge/velger"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-white"
            >
              Fargevelger
            </Link>
            <Link
              href="/farge/fargekart"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-white"
            >
              Fargekart
            </Link>
            <Link
              href="/farge/ncs"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-white"
            >
              NCS-oppslag
            </Link>
          </div>
        </Container>
      </section>

      {/* Guider */}
      <section className="bg-zinc-50 py-16">
        <Container>
          <h2 className="text-2xl font-bold">Guider og tips</h2>
          <p className="mt-2 text-zinc-600">
            Alt du trenger å vite – fra fargevalg til siste strøk.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useGuides.map((article) => (
              <Link
                key={article._id}
                href={`/artikkel/${article.slug}`}
                className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md"
              >
                {article.imageUrl ? (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                    {article.articleType === "howto" ? "Guide" : "Inspirasjon"}
                    {article.readingTime ? ` · ${article.readingTime}` : ""}
                  </p>
                  <h3 className="mt-2 font-semibold group-hover:underline">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
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
