"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useColors } from "@/hooks/useColors";
import { ncsDistance, sortByHue } from "@/lib/color/colorUtils";
import { colors as allColors } from "@/lib/color/colorData";
import type { ApplicationFilter, TempFilter, LightFilter, Collection } from "@/lib/color/types";
import ColorGrid, { type ViewMode } from "./ColorGrid";
import ViewToggle from "./ViewToggle";

/* ------------------------------------------------------------------ */
/*  NCS detection & fuzzy matching (extracted from NCSSearch)          */
/* ------------------------------------------------------------------ */

const NCS_PATTERN = /\d{4}-/;
const NCS_PREFIX = /^S?\s*\d{2,}/i;

function looksLikeNCS(q: string): boolean {
  return NCS_PATTERN.test(q) || NCS_PREFIX.test(q);
}

function ncsSearch(query: string) {
  return allColors
    .filter((c) => c.ncs)
    .map((c) => ({
      color: c,
      distance: ncsDistance(query, c.ncs),
      exactMatch:
        c.ncs.toUpperCase().replace(/\s/g, "") ===
        query.toUpperCase().replace(/\s/g, ""),
    }))
    .filter((s) => s.distance < Infinity)
    .sort((a, b) => {
      if (a.exactMatch !== b.exactMatch) return a.exactMatch ? -1 : 1;
      return a.distance - b.distance;
    })
    .slice(0, 8);
}

/* ------------------------------------------------------------------ */
/*  Chip (reuse the same style as FilterBar)                          */
/* ------------------------------------------------------------------ */

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-warm-900 bg-warm-900 text-warm-50"
          : "border-warm-300 bg-white text-warm-600 hover:border-warm-500 hover:text-warm-900"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  NCS result list                                                    */
/* ------------------------------------------------------------------ */

function NCSResults({ query }: { query: string }) {
  const results = useMemo(() => ncsSearch(query), [query]);

  if (results.length === 0) {
    return (
      <div className="max-w-xl rounded-2xl border border-warm-200 bg-white p-8 text-center">
        <p className="text-warm-500">
          Ingen NCS-treff for &ldquo;{query}&rdquo;. Pr&oslash;v f.eks. S1510-Y70R.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-3">
      {results.map(({ color, distance, exactMatch }) => (
        <Link
          key={color.id}
          href={`/farge/${color.id}`}
          className="flex items-center gap-5 rounded-2xl border border-warm-200 bg-white p-4 transition-all hover:shadow-md hover:border-warm-300"
        >
          <div
            className="h-20 w-20 shrink-0 rounded-xl"
            style={{ backgroundColor: color.hex ?? "#ddd" }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-warm-900">{color.name}</span>
              {exactMatch && (
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  Eksakt treff
                </span>
              )}
            </div>
            <div className="mt-1 font-mono text-sm text-warm-500">
              NCS {color.ncs}
            </div>
            <div className="mt-1 flex gap-4 text-xs text-warm-400">
              <span>{color.hex}</span>
              <span>ID: {color.id}</span>
              <span>
                {color.application === "interior"
                  ? "Interi\u00f8r"
                  : color.application === "exterior"
                  ? "Eksteri\u00f8r"
                  : "Int. & Eks."}
              </span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-[11px] uppercase tracking-wider text-warm-400">Avstand</div>
            <div className="font-mono text-sm text-warm-600">
              {distance.toFixed(1)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Collection card                                                    */
/* ------------------------------------------------------------------ */

function CollectionCard({
  collection,
  isActive,
  onClick,
}: {
  collection: Collection;
  isActive: boolean;
  onClick: () => void;
}) {
  const previewColors = allColors
    .filter((c) => collection.colorIds.includes(c.id))
    .slice(0, 6);

  return (
    <button
      onClick={onClick}
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
          <div className="font-semibold text-warm-900">{collection.name}</div>
          <div className="text-xs text-warm-400 mt-0.5">
            {collection.colorIds.length} kul&oslash;rer
            {collection.year && ` \u00b7 ${collection.year}`}
          </div>
        </div>
        {collection.type === "trend" && (
          <span className="shrink-0 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-medium text-amber-700">
            Trend
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-warm-500 leading-relaxed line-clamp-2">
        {collection.description}
      </p>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main: ColorBrowser                                                 */
/* ------------------------------------------------------------------ */

export default function ColorBrowser() {
  const {
    colors,
    allColors: totalColors,
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
  const [areaFilter, setAreaFilter] = useState<"all" | "Interior" | "Exterior">("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(() => sortByHue(colors), [colors]);

  // Detect NCS mode from search input
  const trimmedQuery = query.trim();
  const isNCSMode = trimmedQuery.length >= 2 && looksLikeNCS(trimmedQuery);

  // Filter collections by applicationArea
  const filteredCollections = useMemo(() => {
    if (areaFilter === "all") return collections;
    return collections.filter((c) => c.applicationArea === areaFilter);
  }, [areaFilter, collections]);

  // Active collection for heading display
  const activeCollection = collectionFilter !== "all"
    ? collections.find((c) => c.id === collectionFilter)
    : null;

  function selectCollection(id: string) {
    setCollectionFilter(id);
    // Scroll down to the grid after a short delay for state to update
    requestAnimationFrame(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
          Utforsk kul&oslash;rer.
        </h1>
        <p className="mt-3 max-w-lg text-lg text-warm-500">
          Finn din farge blant Jotuns interi&oslash;r- og eksteri&oslash;rpaletter.
          S&oslash;k med navn, NCS-kode eller hex.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative max-w-2xl mb-8">
        <svg
          className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="S1510-Y70R, Muted Coral, #d4b5a0..."
          className="w-full rounded-2xl border border-warm-300 bg-white py-4 pl-13 pr-5 text-lg text-warm-900 placeholder-warm-400 outline-none focus:border-warm-500 focus:ring-1 focus:ring-warm-500"
        />
        {isNCSMode && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-warm-100 px-3 py-1 text-xs font-medium text-warm-600">
            NCS-modus
          </span>
        )}
      </div>

      {/* NCS fuzzy results (shown when NCS-like query) */}
      {isNCSMode && (
        <div className="mb-12">
          <NCSResults query={trimmedQuery} />
        </div>
      )}

      {/* Collections section (hidden during search) */}
      {!trimmedQuery && (
        <>
          {/* Application area filter for collections */}
          <div className="flex gap-2 mb-6">
            {(["all", "Interior", "Exterior"] as const).map((f) => (
              <Chip
                key={f}
                active={areaFilter === f}
                onClick={() => setAreaFilter(f)}
              >
                {f === "all" ? "Alle" : f === "Interior" ? "Interi\u00f8r" : "Eksteri\u00f8r"}
              </Chip>
            ))}
          </div>

          {/* Collection cards grid */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            {/* "Alle kuloerer" special card */}
            <button
              onClick={() => selectCollection("all")}
              className={`rounded-2xl border p-5 text-left transition-all ${
                collectionFilter === "all"
                  ? "border-warm-900 bg-white shadow-sm"
                  : "border-warm-200 bg-white hover:border-warm-400"
              }`}
            >
              <div className="flex gap-0.5 rounded-lg overflow-hidden h-8 mb-3 bg-gradient-to-r from-amber-200 via-rose-200 to-blue-200" />
              <div>
                <div className="font-semibold text-warm-900">Alle kul&oslash;rer</div>
                <div className="text-xs text-warm-400 mt-0.5">
                  {totalColors.length} kul&oslash;rer
                </div>
              </div>
              <p className="mt-2 text-xs text-warm-500 leading-relaxed line-clamp-2">
                Vis alle tilgjengelige kul&oslash;rer p&aring; tvers av samlinger.
              </p>
            </button>

            {filteredCollections.map((col) => (
              <CollectionCard
                key={col.id}
                collection={col}
                isActive={collectionFilter === col.id}
                onClick={() => selectCollection(col.id)}
              />
            ))}
          </div>
        </>
      )}

      {/* Color grid section */}
      <div ref={gridRef} className="scroll-mt-32">
        {/* Grid heading */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-warm-900">
              {activeCollection ? activeCollection.name : "Alle kul\u00f8rer"}
            </h2>
            {activeCollection?.description && (
              <p className="mt-1 text-sm text-warm-500">{activeCollection.description}</p>
            )}
          </div>
          <span className="text-sm text-warm-400">{sorted.length} kul&oslash;rer</span>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {(["all", "interior", "exterior"] as ApplicationFilter[]).map((f) => (
            <Chip key={f} active={appFilter === f} onClick={() => setAppFilter(f)}>
              {f === "all" ? "Alle" : f === "interior" ? "Interi\u00f8r" : "Eksteri\u00f8r"}
            </Chip>
          ))}
          <div className="h-6 w-px bg-warm-200 self-center mx-1" />
          {(["all", "varm", "kald", "n\u00f8ytral"] as TempFilter[]).map((f) => (
            <Chip key={f} active={tempFilter === f} onClick={() => setTempFilter(f)}>
              {f === "all" ? "Alle toner" : f.charAt(0).toUpperCase() + f.slice(1)}
            </Chip>
          ))}
          <div className="h-6 w-px bg-warm-200 self-center mx-1" />
          {(["all", "lys", "m\u00f8rk"] as LightFilter[]).map((f) => (
            <Chip key={f} active={lightFilter === f} onClick={() => setLightFilter(f)}>
              {f === "all" ? "Alle nyanser" : f.charAt(0).toUpperCase() + f.slice(1)}
            </Chip>
          ))}
          <div className="ml-auto">
            <ViewToggle mode={viewMode} onChange={setViewMode} />
          </div>
        </div>

        <ColorGrid colors={sorted} linkTo={(c) => `/farge/${c.id}`} viewMode={viewMode} />
      </div>
    </div>
  );
}
