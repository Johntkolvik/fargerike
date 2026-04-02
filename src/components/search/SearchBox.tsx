"use client";

import { useSearchBox } from "react-instantsearch";

export function SearchBox() {
  const { query, refine } = useSearchBox();

  return (
    <input
      type="search"
      value={query}
      onChange={(e) => refine(e.target.value)}
      placeholder="Søk etter produkter, farger, guider..."
      className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm"
    />
  );
}
