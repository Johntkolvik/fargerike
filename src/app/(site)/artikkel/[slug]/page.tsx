import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEED_ARTICLES, SEED_PRODUCTS, SEED_COLORS } from "@/lib/seed/data";

type Props = { params: Promise<{ slug: string }> };

const ARTICLE_MAP: Record<string, (typeof SEED_ARTICLES)[keyof typeof SEED_ARTICLES]> = {
  "slik-maler-du-vegg": SEED_ARTICLES.howToPaintWall,
  "velge-farge-soverom": SEED_ARTICLES.choosingColorBedroom,
  "maling-barnerom-trygt": SEED_ARTICLES.paintSafeForKids,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLE_MAP[slug];
  if (!article) return { title: `${slug} | Fargerike` };
  return {
    title: `${article.title} | Fargerike`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLE_MAP[slug];

  if (!article) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold">Artikkel ikke funnet</h1>
          <Link href="/" className="mt-4 inline-block text-sm underline">Tilbake til forsiden</Link>
        </div>
      </Container>
    );
  }

  const isHowTo = "steps" in article && article.steps;

  return (
    <>
      {isHowTo && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: article.title,
            description: article.excerpt,
            step: (article as typeof SEED_ARTICLES.howToPaintWall).steps?.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.description,
            })),
          }}
        />
      )}

      <article>
        {/* Header */}
        <section className="border-b border-zinc-200 bg-zinc-50">
          <Container>
            <div className="mx-auto max-w-3xl py-12">
              <nav className="mb-4 flex items-center gap-2 text-sm text-zinc-500">
                <Link href="/" className="hover:underline">Hjem</Link>
                <span>/</span>
                <span>
                  {article.articleType === "howto" ? "Guider" : "Inspirasjon"}
                </span>
              </nav>
              <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
                {article.articleType === "howto" ? "Steg-for-steg guide" : "Inspirasjon"}
                {"readingTime" in article && ` · ${(article as typeof SEED_ARTICLES.howToPaintWall).readingTime}`}
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
                {article.title}
              </h1>
              <p className="mt-4 text-lg text-zinc-600 leading-relaxed">
                {article.excerpt}
              </p>
            </div>
          </Container>
        </section>

        {/* Innhold */}
        <section className="py-12">
          <Container>
            <div className="mx-auto max-w-3xl">
              {isHowTo ? (
                <ol className="space-y-8">
                  {(article as typeof SEED_ARTICLES.howToPaintWall).steps?.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
                        {i + 1}
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">{step.title}</h2>
                        <p className="mt-2 text-zinc-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-zinc-600 leading-relaxed">
                  {article.excerpt} Komplett artikkelinnhold fra Sanity vises her når det er publisert.
                </p>
              )}
            </div>
          </Container>
        </section>

        {/* Relaterte produkter + farger */}
        <section className="border-t border-zinc-200 bg-zinc-50 py-12">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-xl font-bold">Relevante produkter</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/produkt/lady-pure-color"
                  className="group rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <p className="text-xs text-zinc-500">Jotun Lady</p>
                  <h3 className="mt-1 font-semibold group-hover:underline">
                    {SEED_PRODUCTS.ladyPureColor.displayName}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {SEED_PRODUCTS.ladyPureColor.subtitle}
                  </p>
                  <p className="mt-2 text-sm font-semibold">Fra 299 kr</p>
                </Link>
                <Link
                  href="/farge/jotun-2856-warm-blush"
                  className="group rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="h-10 w-10 flex-shrink-0 rounded-lg"
                      style={{ backgroundColor: SEED_COLORS.warmBlush.hexValue }}
                    />
                    <div>
                      <p className="text-xs text-zinc-500">Jotun {SEED_COLORS.warmBlush.colorCode}</p>
                      <h3 className="mt-0.5 font-semibold group-hover:underline">
                        {SEED_COLORS.warmBlush.name}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        NCS {SEED_COLORS.warmBlush.ncsCode}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </article>
    </>
  );
}
