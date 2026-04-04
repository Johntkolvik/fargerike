import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SEED_PRODUCT_LIST } from "@/lib/seed/data";

const CATEGORY_NAMES: Record<string, string> = {
  veggmaling: "Veggmaling",
  "tre-og-panel": "Tre & panel",
  gulv: "Gulv",
  tapet: "Tapet",
  solskjerming: "Solskjerming",
  farger: "Farger",
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = CATEGORY_NAMES[slug] ?? slug;
  return {
    title: `${name} | Fargerike`,
    description: `Se alle produkter innen ${name.toLowerCase()} hos Fargerike. Stort utvalg, fagkunnskap og 89 butikker.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categoryName = CATEGORY_NAMES[slug] ?? slug;

  // For demo: filtrer produkter på kategori, ellers vis alle
  const products =
    slug === "veggmaling"
      ? SEED_PRODUCT_LIST.filter((p) => p.category === "Veggmaling")
      : SEED_PRODUCT_LIST;

  return (
    <>
      {/* Kategori-header */}
      <section className="border-b border-zinc-200 bg-zinc-50">
        <Container>
          <div className="py-10">
            <nav className="mb-4 flex items-center gap-2 text-sm text-zinc-500">
              <Link href="/" className="hover:underline">Hjem</Link>
              <span>/</span>
              <span className="text-zinc-900">{categoryName}</span>
            </nav>
            <h1 className="text-3xl font-bold">{categoryName}</h1>
            <p className="mt-2 text-zinc-600">
              {products.length} produkter
            </p>
          </div>
        </Container>
      </section>

      {/* Filter + produktliste */}
      <section className="py-10">
        <Container>
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
            {/* Sidebar filter */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-zinc-500 uppercase">Merke</h3>
                  <ul className="space-y-2">
                    {["Jotun", "Caparol", "Beckers"].map((brand) => (
                      <li key={brand}>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" className="rounded border-zinc-300" />
                          {brand}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-zinc-500 uppercase">Glansgrad</h3>
                  <ul className="space-y-2">
                    {["Helmatt", "Matt", "Silkematt", "Halvblank"].map((gloss) => (
                      <li key={gloss}>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" className="rounded border-zinc-300" />
                          {gloss}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-zinc-500 uppercase">Egenskap</h3>
                  <ul className="space-y-2">
                    {["Svanemerket", "Luktfri", "Våtromsegnet", "Nybegynnervennlig"].map((prop) => (
                      <li key={prop}>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" className="rounded border-zinc-300" />
                          {prop}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Produktgrid */}
            <div>
              {/* Sortering */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-zinc-500">
                  Viser {products.length} produkter
                </p>
                <select className="rounded-lg border border-zinc-300 px-3 py-2 text-sm">
                  <option>Mest populære</option>
                  <option>Pris: lav til høy</option>
                  <option>Pris: høy til lav</option>
                  <option>Nyeste</option>
                </select>
              </div>

              {products.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-zinc-300 py-16 text-center">
                  <p className="text-zinc-500">Ingen produkter i denne kategorien ennå.</p>
                  <Link href="/" className="mt-3 inline-block text-sm font-medium underline">Tilbake til forsiden</Link>
                </div>
              ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/produkt/${product.slug}`}
                    className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:shadow-md"
                  >
                    <div className="flex aspect-square items-center justify-center rounded-lg bg-zinc-50 p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.imageUrl}
                        alt={product.displayName}
                        className="max-h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-zinc-500">
                        {product.brand} {product.productLine}
                      </p>
                      <h3 className="mt-1 font-semibold group-hover:underline">
                        {product.displayName}
                      </h3>
                      <p className="mt-0.5 text-sm text-zinc-500">
                        {product.subtitle}
                      </p>
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
                      <p className="mt-3 text-lg font-semibold">
                        Fra {product.priceFrom} kr
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
