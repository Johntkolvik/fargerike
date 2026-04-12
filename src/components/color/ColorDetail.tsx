"use client";

import { useState } from "react";
import Link from "next/link";
import { useColor, useColorsByIds, useFamilies } from "@/hooks/useColors";
import { getContrastColor, getAllImages } from "@/lib/color/colorUtils";
import { getBucketImage } from "@/lib/color/bucketImages";
import { useCart } from "@/context/CartContext";
import { VolumeSelector } from "@/components/shared/VolumeSelector";
import { familyProductsToVolumeOptions } from "@/lib/cart/toVolumeOptions";
import type { VolumeSelectionItem } from "@/hooks/useVolumeSelection";
import ImageGallery from "./ImageGallery";
import MatchingColors from "./MatchingColors";
import PaintCalculator from "./PaintCalculator";
import SpecsGrid from "./SpecsGrid";
import FavoriteButton from "./FavoriteButton";
import PhotoVisualizer from "./PhotoVisualizer";

export default function ColorDetail({ id }: { id: string }) {
  const color = useColor(id);
  const matching = useColorsByIds(color?.matchingColors ?? []);
  const staffColors = useColorsByIds(color?.staffColors ?? []);
  const murColors = useColorsByIds(color?.murColors ?? []);
  const terrasseColors = useColorsByIds(color?.terrasseColors ?? []);
  const families = useFamilies(color?.application);
  const images = color ? getAllImages(color) : [];
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [visualizerOpen, setVisualizerOpen] = useState(false);
  const { addItem } = useCart();

  if (!color) {
    return (
      <div className="py-20 text-center">
        <p className="text-warm-400">Kulør ikke funnet.</p>
        <Link href="/farge" className="mt-4 inline-block text-sm text-warm-900 underline">
          Tilbake til utforsker
        </Link>
      </div>
    );
  }

  const contrast = getContrastColor(color.hex);
  const activeFamily = families.find((f) => f.familyCode === selectedFamily) ?? families[0];

  const sectionLabels: Record<string, string> = {
    "stue-gang-kjokken": "Stue, gang og kjøkken",
    "soverom-barnerom": "Soverom og barnerom",
    "lister-panel-mobler": "Lister, panel og møbler",
    "spesial": "Spesialoverflater",
    "treverk": "Utvendig treverk",
    "mur-fasade": "Mur og fasade",
  };

  const familySections = Object.entries(
    families.reduce<Record<string, typeof families>>((acc, f) => {
      const key = f.section || "annet";
      (acc[key] ??= []).push(f);
      return acc;
    }, {})
  ).map(([key, items]) => ({
    label: sectionLabels[key] ?? key,
    items,
  }));

  const volumeOptions = activeFamily
    ? familyProductsToVolumeOptions(activeFamily.products)
    : [];

  function handleAddToCart(items: VolumeSelectionItem[]) {
    if (!activeFamily) return;
    items.forEach((item) => {
      addItem({
        colorId: color.id,
        colorName: color.name,
        colorHex: color.hex ?? "#ddd",
        familyName: activeFamily.name,
        finishName: activeFamily.finishName,
        fillLevel: item.option.fillLevel,
        priceNOK: item.option.price,
        quantity: item.quantity,
      });
    });
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-5 pt-1 sm:px-8 flex items-center justify-end">
        <FavoriteButton colorId={color.id} />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <div
              className="relative rounded-2xl p-8 sm:p-10 min-h-[340px] flex flex-col justify-end"
              style={{ backgroundColor: color.hex ?? "#ddd" }}
            >
              <div style={{ color: contrast }}>
                <div className="text-[11px] uppercase tracking-[0.2em] opacity-40 font-medium mb-2">
                  {color.application === "interior"
                    ? "Interiør"
                    : color.application === "exterior"
                    ? "Eksteriør"
                    : "Interiør & Eksteriør"}
                </div>
                <h1 className="text-4xl font-bold sm:text-5xl tracking-tight">{color.name}</h1>
                <div className="mt-4 flex gap-x-6 text-sm">
                  <div>
                    <span className="opacity-40 text-[11px] uppercase tracking-wider">NCS </span>
                    <span className="font-mono">{color.ncs || "-"}</span>
                  </div>
                  <div>
                    <span className="opacity-40 text-[11px] uppercase tracking-wider">HEX </span>
                    <span className="font-mono">{color.hex || "-"}</span>
                  </div>
                </div>
                {color.description && (
                  <p className="mt-3 max-w-md text-sm opacity-60">{color.description}</p>
                )}
              </div>
            </div>

            {/* Visualizer button */}
            <button
              onClick={() => setVisualizerOpen(true)}
              className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-warm-200 bg-white py-3.5 text-sm font-semibold text-warm-900 transition-all hover:border-warm-400 hover:bg-warm-50 hover:shadow-sm"
            >
              <svg className="h-5 w-5 text-warm-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
              Prøv fargen i ditt rom
            </button>

            {images.length > 0 && (
              <div className="mt-6">
                <ImageGallery images={images} />
              </div>
            )}

            {activeFamily && <SpecsGrid family={activeFamily} />}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <div className="space-y-5">
              {familySections.map(({ label, items }) => (
                <div key={label}>
                  <div className="text-[11px] uppercase tracking-wider text-warm-400 font-medium mb-2">{label}</div>
                  <div className="space-y-2">
                    {items.map((f) => (
                      <button
                        key={f.familyCode}
                        onClick={() => {
                          setSelectedFamily(f.familyCode);
                        }}
                        className={`w-full rounded-xl border p-3 text-left transition-all ${
                          (activeFamily?.familyCode === f.familyCode)
                            ? "border-warm-900 bg-white shadow-sm"
                            : "border-warm-200 bg-white hover:border-warm-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={getBucketImage(f.familyCode)}
                            alt={f.name}
                            className="h-11 w-11 object-contain shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="font-semibold text-warm-900">{f.shortName}</div>
                              {f.badge && (
                                <span className="shrink-0 rounded-full border border-warm-200 bg-warm-50 px-2 py-0.5 text-[10px] font-medium text-warm-600">
                                  {f.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-warm-400">{f.name} &middot; {f.finishName}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {activeFamily && activeFamily.products.length > 0 && (
              <div className="rounded-xl border border-warm-200 bg-white p-5">
                <VolumeSelector
                  key={activeFamily.familyCode}
                  options={volumeOptions}
                  variant="full"
                  onAdd={handleAddToCart}
                />
                <div className="mt-3 flex items-center justify-center gap-4 text-xs text-warm-400">
                  <span>2-3 dagers levering</span>
                  <span>&middot;</span>
                  <span>Svanemerket</span>
                </div>
              </div>
            )}

            {activeFamily && (
              <PaintCalculator
                coverage={activeFamily.specs.coverage}
                products={activeFamily.products}
                onSelectVolume={() => {}}
                colorName={color.name}
              />
            )}

            <button className="w-full rounded-xl border-2 border-dashed border-warm-300 bg-white py-4 text-center transition-colors hover:border-warm-500 hover:bg-warm-50">
              <div className="text-sm font-semibold text-warm-900">Bestill fargeprøve</div>
              <div className="mt-0.5 text-xs text-warm-400">Se kuløren hjemme hos deg</div>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        {matching.length > 0 && (
          <section className="mb-16">
            <MatchingColors colors={matching} />
          </section>
        )}
        {(color.application === "exterior" || color.application === "both") && (
          <div className="space-y-12">
            {staffColors.length > 0 && (
              <MatchingColors colors={staffColors} label="Staffasjefarger" />
            )}
            {murColors.length > 0 && (
              <MatchingColors colors={murColors} label="Murfarger" />
            )}
            {terrasseColors.length > 0 && (
              <MatchingColors colors={terrasseColors} label="Terrassefarger" />
            )}
          </div>
        )}
      </div>

      <PhotoVisualizer
        color={color}
        matchingColors={matching.filter((c) => c.hex).map((c) => ({ hex: c.hex!, name: c.name }))}
        isOpen={visualizerOpen}
        onClose={() => setVisualizerOpen(false)}
      />
    </div>
  );
}
