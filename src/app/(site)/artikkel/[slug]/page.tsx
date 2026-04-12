import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/pdp/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { client } from "@/lib/sanity/client";
import { ARTICLE_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { SEED_ARTICLES, SEED_PRODUCTS, SEED_COLORS } from "@/lib/seed/data";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

/* ---------- Seed fallback map ---------- */
const SEED_ARTICLE_MAP: Record<string, (typeof SEED_ARTICLES)[keyof typeof SEED_ARTICLES]> = {
  "slik-maler-du-vegg": SEED_ARTICLES.howToPaintWall,
  "velge-farge-soverom": SEED_ARTICLES.choosingColorBedroom,
  "maling-barnerom-trygt": SEED_ARTICLES.paintSafeForKids,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug });
    if (article) {
      return {
        title: `${article.title} | Fargerike`,
        description: article.excerpt,
        openGraph: article.mainImage?.asset?.url
          ? { images: [{ url: article.mainImage.asset.url }] }
          : undefined,
      };
    }
  } catch (error) {
    console.error("Failed to fetch article metadata:", error);
  }

  const seed = SEED_ARTICLE_MAP[slug];
  if (seed) {
    return {
      title: `${seed.title} | Fargerike`,
      description: seed.excerpt,
      openGraph: seed.coverImage
        ? { images: [{ url: seed.coverImage }] }
        : undefined,
    };
  }
  return { title: `${slug} | Fargerike` };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  /* ---------- Try Sanity first ---------- */
  let article: Record<string, unknown> | null = null;
  try {
    article = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug });
  } catch (error) {
    console.error("Failed to fetch article:", error);
  }

  /* ---------- Sanity article found ---------- */
  if (article) {
    const title = article.title as string;
    const excerpt = article.excerpt as string | undefined;
    const articleType = article.articleType as string | undefined;
    const readingTime = article.readingTime as string | undefined;
    const body = article.body as Array<Record<string, unknown>> | undefined;
    const mainImage = article.mainImage as { asset?: { _ref?: string; url?: string }; alt?: string } | undefined;
    const imageUrl = mainImage?.asset?.url || null;
    const publishedAt = article.publishedAt as string | undefined;
    const _updatedAt = article._updatedAt as string | undefined;
    const author = article.author as { name?: string } | undefined;
    const relatedProducts = article.relatedProducts as Array<{
      _id: string; name: string; familyCode: string; brand: string;
      applicationArea?: string; badge?: string; shortName?: string;
      description?: string; variants?: Array<{ price?: number }>;
    }> | null;
    const relatedColors = article.relatedColors as Array<{
      _id: string; name: string; slug: { current: string }; hexValue: string; ncsCode?: string;
    }> | null;

    const isHowTo = articleType === "howto";
    const breadcrumbLabel = isHowTo ? "Guider" : "Inspirasjon";

    const breadcrumbItems = [
      { label: "Hjem", href: "/" },
      { label: breadcrumbLabel },
      { label: title },
    ];

    return (
      <>
        {/* BreadcrumbList JSON-LD */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.label,
              ...(item.href ? { item: `https://fargerike.no${item.href}` } : {}),
            })),
          }}
        />

        {/* Article / HowTo JSON-LD */}
        {isHowTo ? (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: title,
              description: excerpt,
              ...(imageUrl ? { image: imageUrl } : {}),
            }}
          />
        ) : (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Article",
              headline: title,
              description: excerpt,
              ...(author?.name ? { author: { "@type": "Person", name: author.name } } : { author: { "@type": "Organization", name: "Fargerike" } }),
              ...(publishedAt ? { datePublished: publishedAt } : {}),
              ...(_updatedAt ? { dateModified: _updatedAt } : {}),
              ...(imageUrl ? { image: imageUrl } : {}),
              publisher: {
                "@type": "Organization",
                name: "Fargerike",
                url: "https://fargerike.no",
              },
            }}
          />
        )}

        <article>
          {/* Main image */}
          {imageUrl && (
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-zinc-100">
              <Image
                src={imageUrl}
                alt={mainImage?.alt || title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Header */}
          <section className={`border-b border-zinc-200 ${!imageUrl ? "bg-zinc-50" : ""}`}>
            <Container>
              <div className="mx-auto max-w-3xl py-12">
                <Breadcrumb items={breadcrumbItems} />
                <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
                  {isHowTo ? "Steg-for-steg guide" : "Inspirasjon"}
                  {readingTime ? ` · ${readingTime}` : ""}
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
                  {title}
                </h1>
                {excerpt && (
                  <p className="mt-4 text-lg text-zinc-600 leading-relaxed">
                    {excerpt}
                  </p>
                )}
              </div>
            </Container>
          </section>

          {/* Body content */}
          {body && body.length > 0 && (
            <section className="py-12">
              <Container>
                <div className="mx-auto max-w-3xl prose-zinc">
                  <PortableTextRenderer value={body as Parameters<typeof PortableTextRenderer>[0]["value"]} />
                </div>
              </Container>
            </section>
          )}

          {/* Related products & colors */}
          {((relatedProducts && relatedProducts.length > 0) || (relatedColors && relatedColors.length > 0)) && (
            <section className="border-t border-zinc-200 bg-zinc-50 py-12">
              <Container>
                <div className="mx-auto max-w-3xl">
                  <h2 className="text-xl font-bold">Relevante produkter</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {relatedProducts?.map((product) => {
                      const lowestPrice = product.variants
                        ?.map((v) => v.price)
                        .filter((p): p is number => p != null)
                        .sort((a, b) => a - b)[0];
                      return (
                        <div
                          key={product._id}
                          className="rounded-xl border border-zinc-200 bg-white p-5"
                        >
                          <p className="text-xs text-zinc-500 uppercase">{product.brand}</p>
                          <h3 className="mt-1 font-semibold">
                            {product.name}
                          </h3>
                          {product.badge && (
                            <span className="mt-1 inline-block rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700">
                              {product.badge}
                            </span>
                          )}
                          {product.shortName && (
                            <p className="mt-1 text-sm text-zinc-500">{product.shortName}</p>
                          )}
                          {lowestPrice != null && (
                            <p className="mt-2 text-sm font-semibold">Fra {lowestPrice} kr</p>
                          )}
                        </div>
                      );
                    })}
                    {relatedColors?.map((color) => (
                      <Link
                        key={color._id}
                        href={`/farge/${color.slug.current}`}
                        className="group rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="h-10 w-10 flex-shrink-0 rounded-lg"
                            style={{ backgroundColor: color.hexValue }}
                          />
                          <div>
                            <h3 className="mt-0.5 font-semibold group-hover:underline">
                              {color.name}
                            </h3>
                            {color.ncsCode && (
                              <p className="mt-1 text-sm text-zinc-500">
                                NCS {color.ncsCode}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </Container>
            </section>
          )}
        </article>
      </>
    );
  }

  /* ---------- Fallback: seed data ---------- */
  const seedArticle = SEED_ARTICLE_MAP[slug];
  if (!seedArticle) {
    notFound();
  }

  const isHowTo = "steps" in seedArticle && seedArticle.steps;
  const seedBreadcrumbLabel = seedArticle.articleType === "howto" ? "Guider" : "Inspirasjon";
  const seedBreadcrumbItems = [
    { label: "Hjem", href: "/" },
    { label: seedBreadcrumbLabel },
    { label: seedArticle.title },
  ];

  return (
    <>
      {/* BreadcrumbList JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: seedBreadcrumbItems.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: `https://fargerike.no${item.href}` } : {}),
          })),
        }}
      />

      {/* Article / HowTo JSON-LD */}
      {isHowTo ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: seedArticle.title,
            description: seedArticle.excerpt,
            step: (seedArticle as typeof SEED_ARTICLES.howToPaintWall).steps?.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.description,
            })),
          }}
        />
      ) : (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: seedArticle.title,
            description: seedArticle.excerpt,
            author: { "@type": "Organization", name: "Fargerike" },
            publisher: {
              "@type": "Organization",
              name: "Fargerike",
              url: "https://fargerike.no",
            },
          }}
        />
      )}

      <article>
        {/* Header */}
        <section className="border-b border-zinc-200 bg-zinc-50">
          <Container>
            <div className="mx-auto max-w-3xl py-12">
              <Breadcrumb items={seedBreadcrumbItems} />
              <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
                {seedArticle.articleType === "howto" ? "Steg-for-steg guide" : "Inspirasjon"}
                {"readingTime" in seedArticle && ` · ${(seedArticle as typeof SEED_ARTICLES.howToPaintWall).readingTime}`}
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
                {seedArticle.title}
              </h1>
              <p className="mt-4 text-lg text-zinc-600 leading-relaxed">
                {seedArticle.excerpt}
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
                  {(seedArticle as typeof SEED_ARTICLES.howToPaintWall).steps?.map((step, i) => (
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
                  {seedArticle.excerpt} Komplett artikkelinnhold fra Sanity vises her når det er publisert.
                </p>
              )}
            </div>
          </Container>
        </section>

        {/* Relaterte produkter + farger (seed) */}
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
