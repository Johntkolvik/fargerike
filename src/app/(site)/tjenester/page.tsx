import type { Metadata } from "next";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { getHubMetadata, getHubPageData } from "@/lib/nav/category-page-utils";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return getHubMetadata("tjenester");
}

export default async function TjenesterHubPage() {
  const data = await getHubPageData("tjenester");
  return (
    <CategoryPage
      title={data.title}
      description={data.description}
      imageUrl={data.imageUrl}
      breadcrumbs={data.breadcrumbs}
      articles={data.articles}
      subcategories={data.subcategories}
      subcategoryBaseHref={data.subcategoryBaseHref}
    />
  );
}
