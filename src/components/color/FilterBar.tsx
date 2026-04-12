"use client";

import type { ApplicationFilter, TempFilter, LightFilter, Collection } from "@/lib/color/types";

interface Props {
  query: string;
  onQueryChange: (q: string) => void;
  appFilter: ApplicationFilter;
  onAppFilterChange: (f: ApplicationFilter) => void;
  tempFilter: TempFilter;
  onTempFilterChange: (f: TempFilter) => void;
  lightFilter: LightFilter;
  onLightFilterChange: (f: LightFilter) => void;
  collectionFilter: string;
  onCollectionFilterChange: (f: string) => void;
  collections: Collection[];
  count: number;
}

function Chip({
  active,
  onClick,
  children,
  ariaLabel,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={active}
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

export default function FilterBar({
  query,
  onQueryChange,
  appFilter,
  onAppFilterChange,
  tempFilter,
  onTempFilterChange,
  lightFilter,
  onLightFilterChange,
  collectionFilter,
  onCollectionFilterChange,
  collections,
  count,
}: Props) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Navn eller NCS-kode..."
            aria-label="Sok etter farger med navn eller NCS-kode"
            autoComplete="off"
            data-1p-ignore="true"
            data-lpignore="true"
            data-form-type="other"
            className="w-full rounded-full border border-warm-300 bg-white py-3 pl-11 pr-4 text-sm text-warm-900 placeholder-warm-400 outline-none focus:border-warm-500 focus:ring-1 focus:ring-warm-500"
          />
        </div>
        <span className="text-sm text-warm-400 whitespace-nowrap">
          {count} kulører
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <select
          value={collectionFilter}
          onChange={(e) => onCollectionFilterChange(e.target.value)}
          aria-label="Velg fargekart"
          className="rounded-full border border-warm-300 bg-white px-4 py-1.5 text-sm font-medium text-warm-600 outline-none focus:border-warm-500"
        >
          <option value="all">Alle fargekart</option>
          {collections.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.colorIds.length})
            </option>
          ))}
        </select>

        <div className="h-6 w-px bg-warm-200 self-center mx-1" />

        {(["all", "interior", "exterior"] as ApplicationFilter[]).map((f) => (
          <Chip key={f} active={appFilter === f} onClick={() => onAppFilterChange(f)} ariaLabel={`Filtrer på ${f === "all" ? "alle bruksområder" : f === "interior" ? "interiør" : "eksteriør"}`}>
            {f === "all" ? "Alle" : f === "interior" ? "Interiør" : "Eksteriør"}
          </Chip>
        ))}
        <div className="h-6 w-px bg-warm-200 self-center mx-1" />
        {(["all", "varm", "kald", "nøytral"] as TempFilter[]).map((f) => (
          <Chip key={f} active={tempFilter === f} onClick={() => onTempFilterChange(f)} ariaLabel={`Filtrer på ${f === "all" ? "alle fargetoner" : f + "e toner"}`}>
            {f === "all" ? "Alle toner" : f.charAt(0).toUpperCase() + f.slice(1)}
          </Chip>
        ))}
        <div className="h-6 w-px bg-warm-200 self-center mx-1" />
        {(["all", "lys", "mørk"] as LightFilter[]).map((f) => (
          <Chip key={f} active={lightFilter === f} onClick={() => onLightFilterChange(f)} ariaLabel={`Filtrer på ${f === "all" ? "alle nyanser" : f + "e nyanser"}`}>
            {f === "all" ? "Alle nyanser" : f.charAt(0).toUpperCase() + f.slice(1)}
          </Chip>
        ))}
      </div>
    </div>
  );
}
