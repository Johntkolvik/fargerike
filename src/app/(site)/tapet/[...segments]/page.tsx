import type { Metadata } from "next";
import { CategoryPage } from "@/components/pages/CategoryPage";
import {
  getCategoryMetadata,
  getCategoryPageData,
} from "@/lib/nav/category-page-utils";

export const revalidate = 3600;

type Props = { params: Promise<{ segments: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  return getCategoryMetadata("tapet", segments);
}

export default async function TapetCatchAllPage({ params }: Props) {
  const { segments } = await params;
  const data = await getCategoryPageData("tapet", segments);
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
