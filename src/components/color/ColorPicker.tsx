"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Color, Family } from "@/lib/color/types";
import { colors as allColors, families } from "@/lib/color/colorData";
import { getContrastColor, getAllImages, sortByHue } from "@/lib/color/colorUtils";
import ColorGrid from "./ColorGrid";

export default function ColorPicker() {
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(families[0] ?? null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedVolume, setSelectedVolume] = useState<string | null>(null);

  const compatibleColors = useMemo(() => {
    if (!selectedFamily) return sortByHue(allColors);
    const area = selectedFamily.applicationArea.toLowerCase();
    return sortByHue(
      allColors.filter((c) => c.application === area || c.application === "both")
    );
  }, [selectedFamily]);

  const images = selectedColor ? getAllImages(selectedColor) : [];

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
          Velg din kulør.
        </h1>
        <p className="mt-3 max-w-lg text-lg text-warm-500">
          Velg produkt og finn fargen som passer.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {families.map((f) => (
          <button
            key={f.familyCode}
            onClick={() => {
              setSelectedFamily(f);
              setSelectedColor(null);
              setSelectedVolume(null);
            }}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
              selectedFamily?.familyCode === f.familyCode
                ? "border-warm-900 bg-warm-900 text-warm-50"
                : "border-warm-300 bg-white text-warm-600 hover:border-warm-500"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <div>
          <p className="mb-4 text-sm text-warm-400">
            {compatibleColors.length} kulører i {selectedFamily?.name ?? "alle produkter"}
          </p>
          <ColorGrid
            colors={compatibleColors}
            onSelect={(c) => {
              setSelectedColor(c);
              setSelectedVolume(
                selectedFamily?.products[0]?.fillLevel ?? null
              );
            }}
            compact
          />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start space-y-5">
          {selectedColor ? (
            <>
              <div
                className="rounded-2xl p-8 min-h-[200px] flex flex-col justify-end"
                style={{ backgroundColor: selectedColor.hex ?? "#ddd" }}
              >
                <div style={{ color: getContrastColor(selectedColor.hex) }}>
                  <div className="text-3xl font-bold">{selectedColor.name}</div>
                  <div className="mt-1 font-mono text-sm opacity-60">
                    {selectedColor.ncs} &middot; {selectedColor.hex}
                  </div>
                  {selectedColor.description && (
                    <p className="mt-3 text-sm opacity-60">{selectedColor.description}</p>
                  )}
                </div>
              </div>

              {images.length > 0 && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={images[0].src}
                  alt={selectedColor.name}
                  className="w-full rounded-2xl object-cover h-56"
                  loading="lazy"
                />
              )}

              {selectedFamily && selectedFamily.products.length > 0 && (
                <div className="rounded-2xl border border-warm-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-warm-900">{selectedFamily.name}</div>
                      <div className="text-xs text-warm-400">{selectedFamily.finishName}</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-[11px] uppercase tracking-wider text-warm-400 font-medium mb-2">Størrelse</div>
                    <div className="flex gap-2">
                      {selectedFamily.products.map((p) => (
                        <button
                          key={p.productCode}
                          onClick={() => setSelectedVolume(p.fillLevel)}
                          className={`flex-1 rounded-full border py-2.5 text-sm font-medium transition-colors ${
                            selectedVolume === p.fillLevel
                              ? "border-warm-900 bg-warm-900 text-warm-50"
                              : "border-warm-300 text-warm-600 hover:border-warm-500"
                          }`}
                        >
                          {p.fillLevel}L
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="mt-4 w-full rounded-full bg-warm-900 py-3 text-sm font-medium text-warm-50 transition-colors hover:bg-warm-800">
                    Legg i handlekurv
                  </button>
                </div>
              )}

              <div className="flex gap-3">
                <button className="flex-1 rounded-full border border-warm-900 py-2.5 text-sm font-medium text-warm-900 transition-colors hover:bg-warm-900 hover:text-warm-50">
                  Bestill fargeprøve
                </button>
                <Link
                  href={`/farge/${selectedColor.id}`}
                  className="flex-1 rounded-full border border-warm-300 py-2.5 text-center text-sm font-medium text-warm-600 transition-colors hover:border-warm-500 hover:text-warm-900"
                >
                  Se detaljer
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-warm-300 bg-white py-20 text-center">
              <div className="text-sm font-medium text-warm-900">Velg en kulør</div>
              <div className="mt-1 text-xs text-warm-400">
                Klikk på en farge i rutenettet for å se detaljer
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
