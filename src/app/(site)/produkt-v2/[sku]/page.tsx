import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEED_PRODUCTS, SEED_ARTICLES, SEED_COLORS } from "@/lib/seed/data";
import { ProductV2Hero } from "@/components/pdp-v2/ProductV2Hero";

type Props = { params: Promise<{ sku: string }> };

const ALL_COLORS = [
  { name: "Warm Blush", colorCode: "2856", hexValue: "#ab8073", ncsCode: "S 3923-Y74R", slug: "jotun-2856-warm-blush" },
  ...SEED_COLORS.warmBlush.relatedColors,
  { name: "Timeless", colorCode: "1024", hexValue: "#f0ebe3", ncsCode: "S 0804-Y30R", slug: "jotun-1024-timeless" },
  { name: "Deco Blue", colorCode: "4477", hexValue: "#4a6670", ncsCode: "S 5020-B10G", slug: "jotun-4477-deco-blue" },
  { name: "Evening Green", colorCode: "8469", hexValue: "#2d3b35", ncsCode: "S 7010-G10Y", slug: "jotun-8469-evening-green" },
  { name: "Desert Pink", colorCode: "2782", hexValue: "#c8a696", ncsCode: "S 2015-Y60R", slug: "jotun-2782-desert-pink" },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sku } = await params;
  const p = sku === "lady-pure-color" ? SEED_PRODUCTS.ladyPureColor : null;
  if (!p) return { title: `${sku} | Fargerike` };
  return {
    title: `${p.displayName} | ${p.brand} | Fargerike`,
    description: p.longDescription || p.subtitle,
  };
}

export default async function ProductV2Page({ params }: Props) {
  const { sku } = await params;
  const product = sku === "lady-pure-color" ? SEED_PRODUCTS.ladyPureColor : null;

  if (!product) {
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
