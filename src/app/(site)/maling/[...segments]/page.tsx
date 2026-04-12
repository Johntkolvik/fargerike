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
  return getCategoryMetadata("maling", segments);
}

export default async function MalingCatchAllPage({ params }: Props) {
  const { segments } = await params;
  const data = await getCategoryPageData("maling", segments);
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
