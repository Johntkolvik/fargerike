import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEED_PRODUCTS, SEED_ARTICLES, SEED_COLORS } from "@/lib/seed/data";
import { getProductBySlug } from "@/lib/productData";
import { ProductV2Hero } from "@/components/pdp-v2/ProductV2Hero";

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

  const articles = [SEED_ARTICLES.howToPaintWall, SEED_ARTICLES.choosingColorBedroom, SEED_ARTICLES.paintSafeForKids];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.displayName,
          brand: { "@type": "Brand", name: product.brand },
          description: product.longDescription || product.subtitle,
          sku: product.sku,
          image: product.images?.[0]?.url,
        }}
      />

      <ProductV2Hero product={product} colors={ALL_COLORS} articles={articles} />
    </>
  );
}
