"use client";

import { useMemo, useState } from "react";
import { useColors } from "@/hooks/useColors";
import { sortByHue } from "@/lib/color/colorUtils";
import ColorGrid, { type ViewMode } from "./ColorGrid";
import FilterBar from "./FilterBar";
import ViewToggle from "./ViewToggle";

export default function ColorExplorer() {
  const {
    colors,
    collections,
    query,
    setQuery,
    appFilter,
    setAppFilter,
    tempFilter,
    setTempFilter,
    lightFilter,
    setLightFilter,
    collectionFilter,
    setCollectionFilter,
  } = useColors();

  const [viewMode, setViewMode] = useState<ViewMode>("swatch");
  const sorted = useMemo(() => sortByHue(colors), [colors]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
          Utforsk kulører.
        </h1>
        <p className="mt-3 max-w-lg text-lg text-warm-500">
          Finn din farge blant Jotuns interiør- og eksteriørpaletter.
        </p>
      </div>
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        appFilter={appFilter}
        onAppFilterChange={setAppFilter}
        tempFilter={tempFilter}
        onTempFilterChange={setTempFilter}
        lightFilter={lightFilter}
        onLightFilterChange={setLightFilter}
        collectionFilter={collectionFilter}
        onCollectionFilterChange={setCollectionFilter}
        collections={collections}
        count={sorted.length}
      />
      <div className="flex items-center justify-end mb-4">
        <ViewToggle mode={viewMode} onChange={setViewMode} />
      </div>
      <ColorGrid colors={sorted} linkTo={(c) => `/farge/${c.id}`} viewMode={viewMode} />
    </div>
  );
}
