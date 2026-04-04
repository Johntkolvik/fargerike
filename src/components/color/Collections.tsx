"use client";

import { useState, useMemo } from "react";
import { colors as allColors, collections } from "@/lib/color/colorData";
import { sortByHue } from "@/lib/color/colorUtils";
import ColorGrid from "./ColorGrid";

export default function Collections() {
  const [activeId, setActiveId] = useState<string>(collections[0]?.id ?? "");
  const [areaFilter, setAreaFilter] = useState<"all" | "Interior" | "Exterior">("all");

  const filteredCollections = useMemo(() => {
    if (areaFilter === "all") return collections;
    return collections.filter((c) => c.applicationArea === areaFilter);
  }, [areaFilter]);

  const activeCollection = collections.find((c) => c.id === activeId) ?? filteredCollections[0];

  const colors = useMemo(() => {
    if (!activeCollection) return [];
    const idSet = new Set(activeCollection.colorIds);
    return sortByHue(allColors.filter((c) => idSet.has(c.id)));
  }, [activeCollection]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
          Fargekart.
        </h1>
        <p className="mt-3 max-w-lg text-lg text-warm-500">
          Utforsk kuraterte fargesamlinger og trendkolleksjoner.
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        {(["all", "Interior", "Exterior"] as const).map((f) => (
          <button
            key={f}
            onClick={() => {
              setAreaFilter(f);
              const first = f === "all" ? collections[0] : collections.find((c) => c.applicationArea === f);
              if (first) setActiveId(first.id);
            }}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              areaFilter === f
                ? "border-warm-900 bg-warm-900 text-warm-50"
                : "border-warm-300 bg-white text-warm-600 hover:border-warm-500"
            }`}
          >
            {f === "all" ? "Alle" : f === "Interior" ? "Interiør" : "Eksteriør"}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {filteredCollections.map((col) => {
          const isActive = activeCollection?.id === col.id;
          const previewColors = allColors
            .filter((c) => col.colorIds.includes(c.id))
            .slice(0, 6);

          return (
            <button
              key={col.id}
              onClick={() => setActiveId(col.id)}
              className={`rounded-2xl border p-5 text-left transition-all ${
                isActive
                  ? "border-warm-900 bg-white shadow-sm"
                  : "border-warm-200 bg-white hover:border-warm-400"
              }`}
            >
              <div className="flex gap-0.5 rounded-lg overflow-hidden h-8 mb-3">
                {previewColors.map((c) => (
                  <div
                    key={c.id}
                    className="flex-1"
                    style={{ backgroundColor: c.hex ?? "#ddd" }}
                  />
                ))}
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-warm-900">{col.name}</div>
                  <div className="text-xs text-warm-400 mt-0.5">
                    {col.colorIds.length} kulører
                    {col.year && ` · ${col.year}`}
                  </div>
                </div>
                {col.type === "trend" && (
                  <span className="shrink-0 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                    Trend
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-warm-500 leading-relaxed line-clamp-2">
                {col.description}
              </p>
            </button>
          );
        })}
      </div>

      {activeCollection && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-warm-900">{activeCollection.name}</h2>
              <p className="mt-1 text-sm text-warm-500">{activeCollection.description}</p>
            </div>
            <span className="text-sm text-warm-400">{colors.length} kulører</span>
          </div>
          <ColorGrid colors={colors} linkTo={(c) => `/farge/${c.id}`} />
        </div>
      )}
    </div>
  );
}
