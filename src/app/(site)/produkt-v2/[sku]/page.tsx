import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEED_PRODUCTS, SEED_ARTICLES } from "@/lib/seed/data";
import { getProductBySlug } from "@/lib/productData";
import { ProductV2Hero } from "@/components/pdp-v2/ProductV2Hero";
import { getAllProductAttributes } from "@/lib/sanity/productAttributes";

type Props = { params: Promise<{ sku: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sku } = await params;
  const p = sku === "lady-pure-color" ? SEED_PRODUCTS.ladyPureColor : null;
  const familyP = getProductBySlug(sku);
  const name = p?.displayName || familyP?.displayName || sku;
  const desc = p?.longDescription || p?.subtitle || familyP?.longDescription || "";
  return {
    title: `${name} | Jotun | Fargerike`,
    description: desc,
  };
}

export default async function ProductV2Page({ params }: Props) {
  const { sku } = await params;
  const product = sku === "lady-pure-color" ? SEED_PRODUCTS.ladyPureColor : null;
  const familyProduct = getProductBySlug(sku);

  if (!product && !familyProduct) {
    notFound();
  }

  const [articles, productAttributes] = await Promise.all([
    Promise.resolve([SEED_ARTICLES.howToPaintWall, SEED_ARTICLES.choosingColorBedroom, SEED_ARTICLES.paintSafeForKids]),
    getAllProductAttributes(),
  ]);

  const displayProduct = product || familyProduct;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: displayProduct!.displayName,
          brand: { "@type": "Brand", name: displayProduct!.brand || "Jotun" },
          description: displayProduct!.longDescription || displayProduct!.subtitle,
          sku: displayProduct!.sku,
          image: product?.images?.[0]?.url,
        }}
      />

      <ProductV2Hero product={displayProduct as any} colors={displayProduct?._colorOptions || familyProduct?.colorOptions || []} articles={articles} productAttributes={productAttributes} />
    </>
  );
}
