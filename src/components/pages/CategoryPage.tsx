import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/pdp/Breadcrumb";

type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  articleType?: string;
  imageUrl?: string;
};

type Subcategory = {
  _id: string;
  title: string;
  slug: string;
  imageUrl?: string;
};

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type CategoryPageProps = {
  title: string;
  description?: string;
  imageUrl?: string;
  breadcrumbs: BreadcrumbItem[];
  articles?: Article[];
  subcategories?: Subcategory[];
  subcategoryBaseHref?: string;
};

export function CategoryPage({
  title,
  description,
  imageUrl,
  breadcrumbs,
  articles,
  subcategories,
  subcategoryBaseHref,
}: CategoryPageProps) {
  const hasContent =
    (articles && articles.length > 0) ||
    (subcategories && subcategories.length > 0);

  return (
    <>
      {/* Hero / Header */}
      <section className="border-b border-zinc-200 bg-zinc-50">
        <Container>
          <div className="py-10">
            <Breadcrumb items={breadcrumbs} />
            <div className="flex items-start gap-8">
              <div className="flex-1">
                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                  {title}
                </h1>
                {description && (
                  <p className="mt-3 max-w-2xl text-lg text-zinc-600 leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
              {imageUrl && (
                <div className="hidden md:block relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Subcategories */}
      {subcategories && subcategories.length > 0 && (
        <section className="py-10">
          <Container>
            <h2 className="text-xl font-bold">Underkategorier</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {subcategories.map((sub) => (
                <Link
                  key={sub._id}
                  href={
                    subcategoryBaseHref
                      ? `${subcategoryBaseHref}/${sub.slug}`
                      : `/${sub.slug}`
                  }
                  className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:shadow-md"
                >
                  {sub.imageUrl && (
                    <div className="relative mb-3 aspect-[16/9] w-full overflow-hidden rounded-lg bg-zinc-100">
                      <Image
                        src={sub.imageUrl}
                        alt={sub.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold group-hover:underline">
                    {sub.title}
                  </h3>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Articles */}
      {articles && articles.length > 0 && (
        <section className="border-t border-zinc-200 bg-white py-10">
          <Container>
            <h2 className="text-xl font-bold">Artikler og guider</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article._id}
                  href={`/artikkel/${article.slug}`}
                  className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:shadow-md"
                >
                  {article.imageUrl && (
                    <div className="relative mb-3 aspect-[16/9] w-full overflow-hidden rounded-lg bg-zinc-100">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {article.articleType && (
                    <p className="text-xs font-medium uppercase text-zinc-500">
                      {article.articleType === "howto"
                        ? "Guide"
                        : article.articleType === "inspirasjon"
                          ? "Inspirasjon"
                          : article.articleType}
                    </p>
                  )}
                  <h3 className="mt-1 font-semibold group-hover:underline">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
                      {article.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Empty state */}
      {!hasContent && (
        <section className="py-16">
          <Container>
            <div className="rounded-xl border-2 border-dashed border-zinc-300 py-16 text-center">
              <p className="text-lg text-zinc-500">
                Vi jobber med aa fylle denne siden med innhold.
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                Kom tilbake snart for artikler, guider og produkter innen{" "}
                {title.toLowerCase()}.
              </p>
              <Link
                href="/"
                className="mt-4 inline-block text-sm font-medium underline"
              >
                Tilbake til forsiden
              </Link>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
