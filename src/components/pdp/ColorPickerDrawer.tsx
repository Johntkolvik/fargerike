/**
 * MIDLERTIDIG FARGEVELGER — SKAL ERSTATTES AV mg-color
 *
 * Denne komponenten er en placeholder for fargevelgeren.
 * Den endelige løsningen er mg-color — en isolert mikro-applikasjon
 * som lever i sitt eget prosjekt (mg-color-prototype) og embeddes
 * som en headless drawer-modal.
 *
 * VIKTIG: IKKE utvid denne komponenten med ny funksjonalitet.
 * All videreutvikling av fargevelgeren skjer i mg-color-prototype.
 * Denne filen vil bli erstattet med en tynn wrapper som mounter
 * mg-color-komponenten når den er klar.
 *
 * Prosjekt: /Users/john/Projects/mg-color-prototype
 * PRD: /Users/john/Library/CloudStorage/Dropbox/Claude Cowork/Fargeblander/PRD-mg-color.md
 *
 * Integrasjonspunkt: ProductHeroClient.tsx linje 105-112
 * Forventet API: <MgColorDrawer brand="fargerike" productFamilyId="..." onSelect={...} />
 */

"use client";

import { useState, useEffect, useRef } from "react";

type ColorOption = {
  name: string;
  colorCode: string;
  hexValue: string;
  ncsCode?: string;
  slug: string;
};

type Props = {
  colors: ColorOption[];
  selectedColor?: ColorOption | null;
  onSelect: (color: ColorOption) => void;
  productName: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ColorPickerDrawer({ colors, selectedColor, onSelect, productName, isOpen, onOpenChange }: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const filtered = colors.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.colorCode.includes(q) ||
      (c.ncsCode?.toLowerCase().includes(q) ?? false) ||
      c.hexValue.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* Trigger button – hidden when controlled externally */}
      {isOpen === undefined && <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
      >
        {selectedColor && (
          <span
            className="inline-block h-5 w-5 rounded-full border border-white/30"
            style={{ backgroundColor: selectedColor.hexValue }}
          />
        )}
        {selectedColor ? `Farge: ${selectedColor.name}` : "Velg farge"}
      </button>}

      {/* Backdrop + drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Velg farge">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />

          {/* Drawer panel */}
          <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold">Velg farge</h2>
                <p className="text-sm text-zinc-500">
                  {productName} finnes i alle Lady-kulører
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-zinc-100"
                aria-label="Lukk fargevelger"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Search */}
            <div className="border-b border-zinc-200 px-6 py-3">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Søk fargenavn, NCS, kode eller hex..."
                  className="w-full rounded-lg border border-zinc-300 py-2.5 pl-10 pr-4 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                />
              </div>
            </div>

            {/* Selected color preview */}
            {selectedColor && (
              <div className="border-b border-zinc-200 bg-zinc-50 px-6 py-3">
                <p className="text-xs font-medium text-zinc-500 uppercase mb-2">Valgt farge</p>
                <div className="flex items-center gap-3">
                  <span
                    className="h-10 w-10 rounded-full shadow-sm border border-zinc-200"
                    style={{ backgroundColor: selectedColor.hexValue }}
                  />
                  <div>
                    <p className="text-sm font-semibold">{selectedColor.name}</p>
                    <p className="text-xs text-zinc-500">
                      {selectedColor.colorCode} {selectedColor.ncsCode ? `· ${selectedColor.ncsCode}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Color grid */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <p className="text-xs text-zinc-500 mb-3">
                {filtered.length} farger {search ? "funnet" : "tilgjengelig"}
              </p>
              <div className="grid grid-cols-4 gap-3">
                {filtered.map((color) => {
                  const isSelected = selectedColor?.colorCode === color.colorCode;
                  return (
                    <button
                      key={color.colorCode}
                      type="button"
                      onClick={() => {
                        onSelect(color);
                      }}
                      className={`group flex flex-col items-center gap-1.5 rounded-lg p-2 transition-colors ${
                        isSelected ? "bg-zinc-100 ring-2 ring-zinc-900" : "hover:bg-zinc-50"
                      }`}
                      aria-label={`${color.name} (${color.colorCode})`}
                    >
                      <span
                        className={`h-12 w-12 rounded-full shadow-sm transition-transform group-hover:scale-110 ${
                          isSelected ? "ring-2 ring-zinc-900 ring-offset-2" : ""
                        }`}
                        style={{ backgroundColor: color.hexValue }}
                      />
                      <span className="text-[11px] font-medium leading-tight text-center line-clamp-1">
                        {color.name}
                      </span>
                      <span className="text-[10px] text-zinc-400">{color.colorCode}</span>
                    </button>
                  );
                })}
              </div>
              {filtered.length === 0 && (
                <p className="py-8 text-center text-sm text-zinc-500">
                  Ingen farger matcher "{search}"
                </p>
              )}
            </div>

            {/* Footer CTA */}
            {selectedColor && (
              <div className="border-t border-zinc-200 bg-white px-6 py-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-full bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
                >
                  Bekreft: {selectedColor.name}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
