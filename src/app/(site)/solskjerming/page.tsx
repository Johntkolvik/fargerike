import type { Metadata } from "next";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { getHubMetadata, getHubPageData } from "@/lib/nav/category-page-utils";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return getHubMetadata("solskjerming");
}

export default async function SolskjermingHubPage() {
  const data = await getHubPageData("solskjerming");
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
