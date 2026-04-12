"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { ProductHeroClient } from "./ProductHeroClient";
import { ProductV2Hero } from "@/components/pdp-v2/ProductV2Hero";
import type { AttributeMap } from "./SpecGrid";

type ColorOption = {
  name: string;
  colorCode: string;
  hexValue: string;
  ncsCode?: string;
  slug: string;
};

type Article = {
  title: string;
  slug: { current: string };
  articleType: string;
  excerpt: string;
  coverImage?: string;
};

type Props = {
  product: any;
  availableColors: ColorOption[];
  articles: Article[];
  productAttributes: AttributeMap;
};

function HeroSwitcherInner({ product, availableColors, articles, productAttributes }: Props) {
  const searchParams = useSearchParams();
  const isEditorial = searchParams.get("variant") === "editorial";

  if (isEditorial) {
    return (
      <ProductV2Hero
        product={product}
        colors={availableColors}
        articles={articles}
        productAttributes={productAttributes}
      />
    );
  }

  return (
    <section className="border-b border-zinc-100">
      <Container>
        <ProductHeroClient
          product={product}
          availableColors={availableColors}
          initialColor={null}
        />
      </Container>
    </section>
  );
}

/**
 * Switches between the standard ProductHeroClient and the editorial ProductV2Hero
 * based on the ?variant=editorial search param.
 * Wrapped in Suspense because useSearchParams requires it.
 */
export function ProductHeroSwitcher(props: Props) {
  return (
    <Suspense
      fallback={
        <section className="border-b border-zinc-100">
          <Container>
            <div className="min-h-[400px]" />
          </Container>
        </section>
      }
    >
      <HeroSwitcherInner {...props} />
    </Suspense>
  );
}
