"use client";

import { useState } from "react";
import { ImageGallery } from "./ImageGallery";
import { MgColorEmbed } from "./MgColorEmbed";
import { VolumePicker, type VariantQuantity } from "./VolumePicker";
import { AddToCartButton } from "./AddToCartButton";
import { RatingStars } from "./RatingStars";
import { StickyBuyBar } from "./StickyBuyBar";
import Link from "next/link";

type GalleryImage = { url: string; alt: string; imageType?: string };
type Variant = { volume: string; price: number };
type ColorOption = { name: string; colorCode: string; hexValue: string; ncsCode?: string; slug: string };

type Props = {
  product: {
    displayName: string;
    subtitle: string;
    brand: string;
    productLine: string;
    highlights?: string[];
    images: GalleryImage[];
    variants?: Variant[];
    coverage?: string;
    rating?: { score: number; count: number };
  };
  availableColors: ColorOption[];
  initialColor?: ColorOption | null;
};

export function ProductHeroClient({ product, availableColors, initialColor }: Props) {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(initialColor ?? null);
  const [colorDrawerOpen, setColorDrawerOpen] = useState(false);
  const [selections, setSelections] = useState<VariantQuantity[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const hasColor = !!selectedColor;
  const hasItems = selections.length > 0;

  return (
    <div className="grid gap-8 py-12 lg:grid-cols-2 lg:py-16" id="product-hero">
      {/* Gallery */}
      <ImageGallery images={product.images} />

      {/* Product info */}
      <div className="flex flex-col justify-center">
        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
          {product.brand} {product.productLine}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight lg:text-4xl">
          {product.displayName}
        </h1>
        <p className="mt-2 text-lg text-zinc-600">{product.subtitle}</p>

        {/* Rating */}
        {product.rating && (
          <div className="mt-3">
            <a href="#anmeldelser" className="inline-block hover:opacity-80">
              <RatingStars score={product.rating.score} count={product.rating.count} />
            </a>
          </div>
        )}

        {/* Highlights */}
        {product.highlights && (
          <ul className="mt-6 space-y-2">
            {product.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 text-green-600">✓</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Color picker — mg-color drawer trigges herfra */}
        <div className="mt-8">
          <p className="mb-3 text-sm font-medium text-zinc-700 uppercase tracking-wider text-xs">Farge</p>
          <button
            type="button"
            onClick={() => setColorDrawerOpen(true)}
            className="w-full text-left transition-all group"
          >
            {selectedColor ? (
              <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 hover:border-zinc-300 hover:shadow-sm transition-all">
                <span
                  className="h-10 w-10 rounded-lg shrink-0 shadow-sm ring-1 ring-black/5"
                  style={{ backgroundColor: selectedColor.hexValue }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900">{selectedColor.name}</p>
                  <p className="text-xs text-zinc-400">{selectedColor.colorCode}</p>
                </div>
                <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-600 transition-colors">Endre</span>
              </div>
            ) : (
              <div className="relative rounded-xl border border-zinc-200 bg-white p-4 hover:border-zinc-300 hover:shadow-sm transition-all overflow-hidden">
                {/* Color gradient strip at top */}
                <div className="absolute top-0 left-0 right-0 h-1.5 flex">
                  {["#ab8073","#c7c2af","#96938b","#f2f1e8","#8a7e6f","#d4bfb2","#E8D5C4","#4a6670","#2d3b35","#B8C8A8"].map((hex, i) => (
                    <div key={i} className="flex-1" style={{ backgroundColor: hex }} />
                  ))}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">Velg farge</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Utforsk alle farger og fargekart</p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-zinc-900 pl-3 pr-2.5 py-1.5 text-[11px] font-medium text-white group-hover:bg-zinc-800 transition-colors">
                    Velg
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </div>
                </div>
              </div>
            )}
          </button>
          <MgColorEmbed
            onSelect={setSelectedColor}
            isOpen={colorDrawerOpen}
            onOpenChange={setColorDrawerOpen}
            brand="fargerike"
          />
        </div>

        {/* Volume picker – each variant gets its own counter */}
        {product.variants && (
          <div className="mt-6">
            <VolumePicker
              variants={product.variants}
              coverage={product.coverage}
              colorName={selectedColor?.name}
              onChange={(sels, total) => {
                setSelections(sels);
                setTotalPrice(total);
              }}
            />
          </div>
        )}

        {/* CTAs */}
        <div className="mt-6 space-y-3">
          <AddToCartButton
            productName={product.displayName}
            disabled={!hasColor || !hasItems}
            missingSelection={!hasColor ? "farge" : !hasItems ? "størrelse" : undefined}
          />
          <Link
            href="/butikker"
            className="flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Sjekk lagerstatus i butikk
          </Link>
        </div>
      </div>

      <StickyBuyBar
        productName={product.displayName}
        price={totalPrice}
        selectedColor={selectedColor?.name}
        disabled={!hasColor || !hasItems}
        onAddToCart={() => {
          // TODO: Integrate with Omnium cart API
        }}
      />
    </div>
  );
}
