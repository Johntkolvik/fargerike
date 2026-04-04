"use client";

import { InstantSearch } from "react-instantsearch";
import { getSearchClient } from "@/lib/algolia/client";
import { ALGOLIA_INDEX_PRODUCTS } from "@/lib/algolia/indices";

export function AlgoliaProvider({ children }: { children: React.ReactNode }) {
  return (
    <InstantSearch
      searchClient={getSearchClient()}
      indexName={ALGOLIA_INDEX_PRODUCTS}
    >
      {children}
    </InstantSearch>
  );
}
