/**
 * MgColorEmbed — mg-color fargevelger, redesignet for Fargerike.
 *
 * Kilde: mg-color-prototype. Denne filen er en tilpasset kopi.
 * Se /Users/john/Projects/mg-color-prototype/src/components/MgColorDrawer.tsx
 */

"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { colors as _localColors, collections as _localCollections } from "@/lib/color/colorData";

// ── Types ──────────────────────────────────────────────

type ColorOption = { name: string; colorCode: string; hexValue: string; ncsCode?: string; slug: string };
type DrawerView = "home" | "browse" | "detail";
type ColorLabel = "nyhet" | "populær" | "trygt_valg";

interface MgColor {
  id: string; name: string; ncs: string; hex: string | null;
  luminance: number | null; description: string; descriptionEN: string;
  application: string; matchingColors: string[]; tags: string[];
  brand: string; colorCode: string; colorFamily?: string;
}

interface MgCollection {
  id: string; name: string; brand: string; applicationArea: string;
  description: string; year: number | null; type: string; colorIds: string[];
}

type ColorFamily = { id: string; name: string; hueRange: [number, number] };

type Props = {
  colors?: ColorOption[]; selectedColor?: ColorOption | null;
  onSelect: (color: ColorOption) => void; productName?: string;
  isOpen?: boolean; onOpenChange?: (open: boolean) => void; brand?: string;
};

// ── Data loading (from local JSON) ────────────────────

let _cachedData: { colors: MgColor[]; collections: MgCollection[] } | null = null;

function loadMgData(): Promise<{ colors: MgColor[]; collections: MgCollection[] }> {
  if (!_cachedData) {
    const colors: MgColor[] = _localColors.map((c) => ({
      id: c.id,
      name: c.name,
      ncs: c.ncs,
      hex: c.hex,
      luminance: c.luminance,
      description: c.description,
      descriptionEN: c.descriptionEN,
      application: c.application,
      matchingColors: c.matchingColors,
      tags: c.tags,
      brand: "Jotun",
      colorCode: c.id,
      colorFamily: undefined,
    }));

    const collections: MgCollection[] = _localCollections.map((col) => ({
      id: col.id,
      name: col.name,
      brand: col.brand,
      applicationArea: col.applicationArea,
      description: col.description,
      year: col.year,
      type: col.type,
      colorIds: col.colorIds,
    }));

    _cachedData = { colors, collections };
  }
  return Promise.resolve(_cachedData);
}

// ── Constants ──────────────────────────────────────────

const COLOR_FAMILIES: ColorFamily[] = [
  { id: "alle", name: "Alle", hueRange: [0, 360] },
  { id: "rod", name: "Rød & rosa", hueRange: [340, 30] },
  { id: "orange", name: "Oransje", hueRange: [20, 50] },
  { id: "gul", name: "Gul", hueRange: [40, 75] },
  { id: "gronn", name: "Grønn", hueRange: [75, 170] },
  { id: "blaa", name: "Blå", hueRange: [170, 260] },
  { id: "lilla", name: "Lilla", hueRange: [260, 340] },
  { id: "noytral", name: "Nøytral", hueRange: [-1, -1] },
  { id: "hvit", name: "Hvit", hueRange: [-2, -2] },
];

const COLOR_LABELS: Record<string, ColorLabel[]> = {
  "20217": ["nyhet"], "20208": ["nyhet"], "20167": ["nyhet"], "20046": ["nyhet"],
  "2782": ["populær", "trygt_valg"], "1376": ["populær"], "1017": ["trygt_valg"],
  "9918": ["populær", "trygt_valg"], "1001": ["populær"], "8054": ["populær"],
};

// Populære farger — blanding av merker
const POPULAR_IDS = [
  "JOTUN 2782",  // Deco Pink (Jotun)
  "FR1062",      // Vanilje (Fargerike)
  "JOTUN 1624",  // Skylight (Jotun)
  "FR1421",      // Lett Greige (Fargerike)
  "JOTUN 9918",  // Klassisk Hvit (Jotun)
  "FR2060",      // Fromasj (Fargerike)
  "JOTUN 1001",  // Eggehvit (Jotun)
  "FR1128",      // Røkelse (Fargerike)
];

// ── Helpers ────────────────────────────────────────────

function hexToHue(hex: string | null): number {
  if (!hex) return 0;
  const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  if (d === 0) return 0;
  let h = 0;
  if (max === r) h = ((g - b) / d + 6) % 6; else if (max === g) h = (b - r) / d + 2; else h = (r - g) / d + 4;
  return h * 60;
}
function hexSat(hex: string | null): number {
  if (!hex) return 0;
  const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b); return max === 0 ? 0 : (max - Math.min(r, g, b)) / max;
}
function matchesFamily(c: MgColor, f: ColorFamily): boolean {
  if (f.id === "alle") return true;
  if (f.id === "hvit") return (c.luminance ?? 50) > 80;
  if (f.id === "noytral") return hexSat(c.hex) < 0.12;
  const h = hexToHue(c.hex), [lo, hi] = f.hueRange;
  return lo > hi ? h >= lo || h <= hi : h >= lo && h <= hi;
}
function contrast(hex: string | null): string {
  if (!hex) return "#000";
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 >= 140 ? "#1a1715" : "#faf8f5";
}
function search(colors: MgColor[], q: string): MgColor[] {
  const t = q.toLowerCase().trim(); if (!t) return colors;
  const code = (c: MgColor) => (c.colorCode || "").toLowerCase();
  return colors.filter(c => c.name.toLowerCase().includes(t) || c.ncs?.toLowerCase().replace(/\s/g, "").includes(t.replace(/\s/g, "")) || code(c).includes(t) || c.hex?.toLowerCase().includes(t));
}
function sortHue(colors: MgColor[]): MgColor[] {
  return [...colors].sort((a, b) => { const hA = hexToHue(a.hex), hB = hexToHue(b.hex); return Math.abs(hA - hB) < 5 ? (b.luminance ?? 50) - (a.luminance ?? 50) : hA - hB; });
}

/** Clean display name — no ALL CAPS, no slashes, title case */
function displayName(name: string): string {
  // "TIDLØS/TIDLÖS" → "Tidløs" | "DECO PINK" → "Deco Pink" | "Gentle yellow" → "Gentle Yellow"
  const base = name.split("/")[0].trim();
  return base.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

function toColorOption(c: MgColor): ColorOption {
  const brand = c.brand || "color";
  const code = c.colorCode || c.id;
  return { name: displayName(c.name), colorCode: code, hexValue: c.hex || "#ccc", ncsCode: c.ncs || undefined, slug: `${brand}-${code}-${c.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}` };
}

// ── Subcomponents ──────────────────────────────────────

function Badge({ label }: { label: ColorLabel }) {
  const s: Record<ColorLabel, { bg: string; text: string }> = {
    nyhet: { bg: "bg-sky-500/90", text: "text-white" },
    populær: { bg: "bg-amber-400/90", text: "text-amber-950" },
    trygt_valg: { bg: "bg-emerald-500/90", text: "text-white" },
  };
  const t: Record<ColorLabel, string> = { nyhet: "Nyhet", populær: "Populær", trygt_valg: "Trygt valg" };
  return (
    <span className={`absolute top-1.5 left-1.5 z-10 rounded-md px-1.5 py-0.5 text-[9px] font-semibold leading-none backdrop-blur-sm ${s[label].bg} ${s[label].text}`}>
      {t[label]}
    </span>
  );
}

function Swatch({ color, isActive, onClick, onDoubleClick, delay = 0 }: { color: MgColor; isActive: boolean; onClick: () => void; onDoubleClick: () => void; delay?: number }) {
  const colorCode = color.colorCode || "";
  const labels = COLOR_LABELS[colorCode] || [];
  const codeDisplay = color.ncs ? color.ncs.toUpperCase() : colorCode;
  return (
    <button
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={`group text-left transition-all duration-300 ease-out ${isActive ? "scale-[1.02]" : "hover:scale-[1.03] active:scale-[0.98]"}`}
      style={{ animationDelay: `${delay}ms` }}
      aria-label={`${displayName(color.name)} (${codeDisplay})`}
      aria-selected={isActive}
    >
      <div
        className={`relative aspect-square rounded-2xl overflow-hidden transition-shadow duration-300 ${isActive ? "ring-2 ring-zinc-900 ring-offset-2 ring-offset-zinc-50 shadow-md" : "group-hover:shadow-md"}`}
        style={{ backgroundColor: color.hex ?? "#ddd" }}
      >
        {labels[0] && <Badge label={labels[0]} />}
      </div>
      <div className="mt-1.5 px-0.5">
        <p className="text-[10px] text-zinc-400 uppercase tracking-wide truncate">{codeDisplay}</p>
        <p className="text-[12px] font-semibold text-zinc-900 leading-snug truncate">{displayName(color.name)}</p>
      </div>
    </button>
  );
}

// ── Main ───────────────────────────────────────────────

export function MgColorEmbed({ onSelect, isOpen = false, onOpenChange }: Props) {
  const [allColors, setAllColors] = useState<MgColor[]>([]);
  const [collections, setCollections] = useState<MgCollection[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<DrawerView>("home");
  const [query, setQuery] = useState("");
  const [activeFamily, setActiveFamily] = useState("alle");
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [previewColor, setPreviewColor] = useState<MgColor | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(60);
  const inputRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (isOpen && !loaded) loadMgData().then(({ colors, collections: c }) => { setAllColors(colors); setCollections(c); setLoaded(true); }); }, [isOpen, loaded]);
  useEffect(() => { if (isOpen) { document.body.style.overflow = "hidden"; setIsAnimating(true); } else { document.body.style.overflow = ""; } return () => { document.body.style.overflow = ""; }; }, [isOpen]);
  useEffect(() => { if (!isOpen) return; const h = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [isOpen]);
  useEffect(() => { if (isOpen) { setView("home"); setQuery(""); setPreviewColor(null); setActiveCollection(null); setActiveFamily("alle"); setActiveBrand(null); setShowFilterPanel(false); setVisibleCount(60); } }, [isOpen]);

  // Reset pagination when filters change
  useEffect(() => { setVisibleCount(60); }, [query, activeFamily, activeCollection, activeBrand]);

  const handleClose = useCallback(() => { setIsAnimating(false); setTimeout(() => onOpenChange?.(false), 250); }, [onOpenChange]);
  const handleConfirm = useCallback(() => { if (previewColor) onSelect(toColorOption(previewColor)); handleClose(); }, [previewColor, onSelect, handleClose]);

  const displayColors = useMemo(() => {
    let c = allColors;
    if (query.trim()) c = search(c, query);
    if (activeCollection) { const col = collections.find(x => x.id === activeCollection); if (col) { const s = new Set(col.colorIds); c = c.filter(x => s.has(x.colorCode || x.id)); } }
    if (activeBrand) c = c.filter(x => x.brand === activeBrand);
    if (activeFamily !== "alle") { const f = COLOR_FAMILIES.find(x => x.id === activeFamily); if (f) c = c.filter(x => matchesFamily(x, f)); }
    return sortHue(c);
  }, [allColors, query, activeFamily, activeCollection, activeBrand, collections]);

  const popularColors = useMemo(() => allColors.filter(c => POPULAR_IDS.includes(c.colorCode || c.id)), [allColors]);

  // Transition to browse when searching
  useEffect(() => { if (query.trim() && view === "home") setView("browse"); }, [query]);

  if (!isOpen) return null;

  const scrollHide = "overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

  // ── Detail View ──
  if (view === "detail" && previewColor) {
    const c = contrast(previewColor.hex);
    const matches = previewColor.matchingColors.map(id => allColors.find(x => x.id === id)).filter(Boolean) as MgColor[];
    return (
      <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
        <div className={`absolute inset-0 transition-opacity duration-300 ${isAnimating ? "bg-black/50" : "bg-black/0"}`} onClick={handleClose} />
        <div className={`relative w-full max-w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isAnimating ? "translate-x-0" : "translate-x-full"}`}>
          {/* Hero swatch */}
          <div className="relative" style={{ backgroundColor: previewColor.hex ?? "#ddd", minHeight: "240px" }}>
            <div className="absolute top-0 inset-x-0 flex justify-between items-start p-4">
              <button onClick={() => setView("browse")} className="rounded-full bg-white/20 backdrop-blur-md px-3.5 py-2 text-xs font-medium transition-colors hover:bg-white/40" style={{ color: c }}>
                <span className="mr-1">&#8249;</span> Tilbake
              </button>
              <button onClick={handleClose} className="rounded-full bg-white/20 backdrop-blur-md p-2.5 transition-colors hover:bg-white/40" aria-label="Lukk">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-6" style={{ color: c, background: `linear-gradient(to top, ${previewColor.hex}dd, transparent)` }}>
              <p className="text-[11px] font-mono tracking-widest opacity-50">{previewColor.ncs || previewColor.colorCode}</p>
              <h2 className="mt-1 text-3xl font-light tracking-tight">{displayName(previewColor.name)}</h2>
              <p className="mt-1 text-sm font-mono opacity-50">{previewColor.hex}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-6">
              <p className="text-[15px] leading-relaxed text-zinc-500">{previewColor.description || previewColor.descriptionEN || "En vakker farge fra Jotuns fargekolleksjon."}</p>
            </div>

            {matches.length > 0 && (
              <div className="px-6 pb-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">Passer godt med</p>
                <div className="flex gap-3">
                  {matches.map(mc => (
                    <button key={mc.id} onClick={() => setPreviewColor(mc)} className="group flex flex-col items-center gap-2 transition-transform hover:scale-105">
                      <span className="h-14 w-14 rounded-xl shadow-sm transition-shadow group-hover:shadow-md" style={{ backgroundColor: mc.hex ?? "#ddd" }} />
                      <span className="text-[10px] font-medium text-zinc-500 text-center leading-tight w-16 truncate">{displayName(mc.name)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-white border-t border-zinc-100">
            <button onClick={handleConfirm} className="w-full rounded-2xl bg-zinc-900 py-4 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.98]">
              Velg {displayName(previewColor.name)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Home / Browse View ──
  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Velg farge">
      <div className={`absolute inset-0 transition-opacity duration-300 ${isAnimating ? "bg-black/50" : "bg-black/0"}`} onClick={handleClose} />
      <div className={`relative w-full max-w-[420px] bg-zinc-50 shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isAnimating ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Velg farge</h2>
            {loaded && view === "browse" && (
              <p className="text-[11px] text-zinc-400 mt-0.5 tabular-nums">{displayColors.length} farger</p>
            )}
          </div>
          <button onClick={handleClose} className="rounded-full p-2 -mr-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors" aria-label="Lukk">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-6 pb-4">
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              ref={inputRef} type="text" value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Fargenavn, NCS-kode eller hex..."
              className="w-full rounded-xl border-0 bg-zinc-100 py-3 pl-11 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-shadow"
            />
            {query && (
              <button onClick={() => { setQuery(""); if (view === "browse" && !activeCollection) setView("home"); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            )}
          </div>
        </div>

        {/* Selected color mini-preview */}
        {previewColor && (
          <div className="mx-6 mb-3 rounded-xl bg-white border border-zinc-100 p-3 shadow-sm transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="h-11 w-11 rounded-xl shrink-0 shadow-inner" style={{ backgroundColor: previewColor.hex ?? "#ddd" }} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-zinc-900 truncate">{displayName(previewColor.name)}</p>
                <p className="text-[11px] text-zinc-400 font-mono">{previewColor.ncs || previewColor.colorCode} &middot; {previewColor.hex}</p>
              </div>
              <button onClick={() => setView("detail")} className="shrink-0 rounded-lg bg-zinc-100 px-3 py-1.5 text-[11px] font-medium text-zinc-600 hover:bg-zinc-200 transition-colors">
                Detaljer
              </button>
            </div>
          </div>
        )}

        {/* ── HOME VIEW: All colors CTA + featured collections + popular ── */}
        {view === "home" && loaded && (
          <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

            {/* "Alle farger" — subtle but prominent */}
            <div className="px-6 pb-4">
              <button
                onClick={() => setView("browse")}
                className="w-full text-left rounded-2xl bg-white border-2 border-zinc-200 p-4 transition-all hover:border-zinc-300 hover:shadow-md active:scale-[0.99] group"
              >
                <div className="flex gap-0.5 rounded-lg overflow-hidden h-7 mb-3">
                  {allColors.filter((_, i) => i % 120 === 0).slice(0, 14).map(c => (
                    <div key={c.id} className="flex-1 transition-transform group-hover:scale-y-110" style={{ backgroundColor: c.hex ?? "#ddd" }} />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">Alle farger</p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{allColors.length} farger fra alle merkevarer</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-300 group-hover:text-zinc-500 transition-colors shrink-0"><polyline points="9 18 15 12 9 6" /></svg>
                </div>
              </button>
            </div>

            {/* Fargekart — 3 featured from different brands + "vis alle" */}
            <div className="px-6 pb-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">Fargekart</p>
              <div className="space-y-2">
                {(() => {
                  // Pick up to 3 collections from different brands, prioritize trend collections
                  const sorted = [...collections].sort((a, b) => {
                    if (a.type === "trend" && b.type !== "trend") return -1;
                    if (b.type === "trend" && a.type !== "trend") return 1;
                    return b.colorIds.length - a.colorIds.length;
                  });
                  const seen = new Set<string>();
                  const featured: MgCollection[] = [];
                  for (const col of sorted) {
                    if (featured.length >= 3) break;
                    if (!seen.has(col.brand)) {
                      featured.push(col);
                      seen.add(col.brand);
                    }
                  }
                  return featured;
                })().map(col => {
                  const preview = allColors.filter(c => col.colorIds.includes(c.colorCode || c.id)).slice(0, 8);
                  return (
                    <button
                      key={col.id}
                      onClick={() => { setActiveCollection(col.id); setView("browse"); }}
                      className="w-full text-left rounded-2xl bg-white border border-zinc-100 p-4 transition-all hover:shadow-md hover:border-zinc-200 active:scale-[0.99] group"
                    >
                      <div className="flex gap-0.5 rounded-lg overflow-hidden h-6 mb-3">
                        {preview.map(c => <div key={c.id} className="flex-1 transition-transform group-hover:scale-y-110" style={{ backgroundColor: c.hex ?? "#ddd" }} />)}
                      </div>
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">{col.brand}</span>
                          <p className="text-sm font-semibold text-zinc-900 -mt-0.5">{col.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {col.type === "trend" && (
                            <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[9px] font-semibold text-amber-600">Trend</span>
                          )}
                          <span className="text-[11px] text-zinc-400 tabular-nums">{col.colorIds.length}</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-300"><polyline points="9 18 15 12 9 6" /></svg>
                        </div>
                      </div>
                    </button>
                  );
                })}
                {collections.length > 3 && (
                  <button
                    onClick={() => { setView("browse"); setShowFilterPanel(true); }}
                    className="w-full rounded-xl border border-dashed border-zinc-200 py-2.5 text-[12px] font-medium text-zinc-400 hover:border-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    Vis alle {collections.length} fargekart
                  </button>
                )}
              </div>
            </div>

            {/* Popular colors */}
            {popularColors.length > 0 && (
              <div className="px-6 pt-5 pb-8">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">Populære farger</p>
                <div className="grid grid-cols-3 gap-3">
                  {popularColors.slice(0, 6).map((c, i) => (
                    <Swatch key={c.id} color={c} isActive={previewColor?.id === c.id} delay={i * 30}
                      onClick={() => setPreviewColor(c)} onDoubleClick={() => { setPreviewColor(c); setView("detail"); }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── BROWSE VIEW: Filters + grid ── */}
        {view === "browse" && loaded && (
          <>
            {/* Filter bar: back/title + "Filter og sortering" button */}
            <div className="px-6 pb-2 flex items-center justify-between">
              {activeCollection ? (
                <div className="flex items-center gap-2">
                  <button onClick={() => { setActiveCollection(null); setActiveBrand(null); setView("home"); }} className="text-zinc-400 hover:text-zinc-900 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                  <p className="text-sm font-semibold text-zinc-900">{collections.find(c => c.id === activeCollection)?.name}</p>
                </div>
              ) : (
                <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">Alle farger</p>
              )}
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-all ${
                  showFilterPanel || activeBrand || activeCollection
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400"
                }`}
              >
                Filter
                {(activeBrand || activeCollection) && !showFilterPanel && (
                  <span className="flex items-center justify-center h-4 w-4 rounded-full bg-white text-zinc-900 text-[9px] font-bold">
                    {(activeBrand ? 1 : 0) + (activeCollection ? 1 : 0)}
                  </span>
                )}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" />
                  <circle cx="8" cy="8" r="2" fill="currentColor" /><circle cx="16" cy="16" r="2" fill="currentColor" />
                </svg>
              </button>
            </div>

            {/* Expandable filter panel */}
            {showFilterPanel && (
              <div className="mx-6 mb-3 rounded-xl bg-white border border-zinc-100 p-4 space-y-4 shadow-sm">
                {/* Brand filter */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Merkevare</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[{ id: null, name: "Alle" }, { id: "jotun", name: "Jotun" }, { id: "fargerike", name: "Fargerike" }, { id: "scanox", name: "Scanox" }, { id: "ncs", name: "NCS" }].map(b => (
                      <button key={b.id ?? "all"} onClick={() => setActiveBrand(b.id)}
                        className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-all ${activeBrand === b.id ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"}`}>
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Collection filter */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Fargekart</p>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => setActiveCollection(null)}
                      className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-all ${!activeCollection ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"}`}>
                      Alle
                    </button>
                    {collections.filter(c => !activeBrand || c.brand === activeBrand).map(col => (
                      <button key={col.id} onClick={() => setActiveCollection(activeCollection === col.id ? null : col.id)}
                        className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-all ${activeCollection === col.id ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"}`}>
                        {col.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear all */}
                {(activeBrand || activeCollection) && (
                  <button onClick={() => { setActiveBrand(null); setActiveCollection(null); setActiveFamily("alle"); }}
                    className="text-[11px] font-medium text-zinc-400 underline underline-offset-2 hover:text-zinc-900 transition-colors">
                    Nullstill alle filter
                  </button>
                )}
              </div>
            )}

            {/* Featured family chips (always visible) */}
            <div className={`px-6 pb-3 ${scrollHide}`}>
              <div className="flex gap-1.5">
                {COLOR_FAMILIES.map(fam => (
                  <button key={fam.id} onClick={() => setActiveFamily(fam.id)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium transition-all duration-200 ${activeFamily === fam.id ? "bg-zinc-900 text-white shadow-sm" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"}`}>
                    {fam.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color grid */}
            <div ref={gridRef} className="flex-1 overflow-y-auto px-6 pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {displayColors.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-sm text-zinc-400">Ingen farger matcher filteret</p>
                  <button onClick={() => { setQuery(""); setActiveFamily("alle"); setActiveCollection(null); }} className="mt-2 text-xs font-medium text-zinc-500 underline underline-offset-2 hover:text-zinc-900">
                    Nullstill filter
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    {displayColors.slice(0, visibleCount).map((color, i) => (
                      <Swatch key={color.id} color={color} isActive={previewColor?.id === color.id} delay={Math.min(i, 12) * 25}
                        onClick={() => setPreviewColor(color)} onDoubleClick={() => { setPreviewColor(color); setView("detail"); }} />
                    ))}
                  </div>
                  {displayColors.length > visibleCount && (
                    <button
                      onClick={() => setVisibleCount(v => v + 60)}
                      className="mt-4 w-full rounded-xl border border-zinc-200/60 bg-zinc-50/80 py-3 text-[12px] font-medium text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 transition-colors"
                    >
                      Vis flere ({displayColors.length - visibleCount} gjenstår)
                    </button>
                  )}
                </>
              )}
            </div>
          </>
        )}

        {/* Loading */}
        {!loaded && (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 rounded-full border-2 border-zinc-200 border-t-zinc-900 animate-spin" />
              <p className="text-xs text-zinc-400">Laster farger...</p>
            </div>
          </div>
        )}

        {/* Confirm footer */}
        {previewColor && (
          <div className="p-5 bg-white border-t border-zinc-100">
            <button onClick={handleConfirm} className="w-full rounded-2xl bg-zinc-900 py-4 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.98]">
              Velg {displayName(previewColor.name)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
