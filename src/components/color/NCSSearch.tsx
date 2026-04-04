"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { colors as allColors } from "@/lib/color/colorData";
import { ncsDistance, searchColors } from "@/lib/color/colorUtils";

export default function NCSSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim();
    if (!q || q.length < 2) return [];

    const looksLikeNCS = /\d{4}-/.test(q) || /^S?\s*\d{2,}/i.test(q);

    if (looksLikeNCS) {
      const scored = allColors
        .filter((c) => c.ncs)
        .map((c) => ({
          color: c,
          distance: ncsDistance(q, c.ncs),
          exactMatch:
            c.ncs.toUpperCase().replace(/\s/g, "") ===
            q.toUpperCase().replace(/\s/g, ""),
        }))
        .filter((s) => s.distance < Infinity)
        .sort((a, b) => {
          if (a.exactMatch !== b.exactMatch) return a.exactMatch ? -1 : 1;
          return a.distance - b.distance;
        });

      if (scored.length > 0) {
        return scored.slice(0, 8).map((s) => ({ ...s, type: "ncs" as const }));
      }
    }

    const textResults = searchColors(allColors, q).slice(0, 8);
    return textResults.map((c) => ({
      color: c,
      distance: 0,
      exactMatch: false,
      type: "text" as const,
    }));
  }, [query]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
          NCS-oppslag.
        </h1>
        <p className="mt-3 max-w-lg text-lg text-warm-500">
          Skriv inn en NCS-kode, et kulørnavn eller ID for å finne din farge.
        </p>
      </div>

      <div className="relative max-w-xl mb-10">
        <svg className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="S1510-Y70R, 1024, Muted Coral..."
          className="w-full rounded-2xl border border-warm-300 bg-white py-4 pl-13 pr-5 font-mono text-lg text-warm-900 placeholder-warm-400 outline-none focus:border-warm-500 focus:ring-1 focus:ring-warm-500"
        />
      </div>

      {results.length > 0 && (
        <div className="max-w-3xl space-y-3">
          {results.map(({ color, distance, exactMatch, type }) => (
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
                      ? "Interiør"
                      : color.application === "exterior"
                      ? "Eksteriør"
                      : "Int. & Eks."}
                  </span>
                </div>
              </div>
              {type === "ncs" && (
                <div className="shrink-0 text-right">
                  <div className="text-[11px] uppercase tracking-wider text-warm-400">Avstand</div>
                  <div className="font-mono text-sm text-warm-600">
                    {distance.toFixed(1)}
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {query.trim().length >= 2 && results.length === 0 && (
        <div className="max-w-xl rounded-2xl border border-warm-200 bg-white p-8 text-center">
          <p className="text-warm-500">
            Ingen treff for &ldquo;{query}&rdquo;. Prøv en NCS-kode (f.eks. S1510-Y70R) eller et kulørnavn.
          </p>
        </div>
      )}
    </div>
  );
}
