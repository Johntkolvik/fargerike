"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getSearchClient } from "@/lib/algolia/client";
import {
  ALGOLIA_INDEX_COLORS,
  ALGOLIA_INDEX_PRODUCTS,
  ALGOLIA_INDEX_ARTICLES,
} from "@/lib/algolia/indices";

// ---------------------------------------------------------------------------
// Types for Algolia hit shapes (matching sync script records)
// ---------------------------------------------------------------------------

interface ColorHit {
  objectID: string;
  name: string;
  ncs: string;
  hex: string;
  application?: string;
  tags?: string[];
}

interface ProductHit {
  objectID: string;
  name: string;
  slug: string;
  badge?: string | null;
  priceFrom?: number | null;
  applicationArea?: string;
  finishName?: string;
}

interface ArticleHit {
  objectID: string;
  title: string;
  slug: string;
  articleType?: string;
  excerpt?: string;
}

type SearchResults = {
  colors: ColorHit[];
  products: ProductHit[];
  articles: ArticleHit[];
};

const EMPTY_RESULTS: SearchResults = {
  colors: [],
  products: [],
  articles: [],
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>(EMPTY_RESULTS);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ---- Focus input when overlay opens ----
  useEffect(() => {
    if (open) {
      // Small delay so animation doesn't conflict with autofocus
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    } else {
      // Reset state when closed
      setQuery("");
      setResults(EMPTY_RESULTS);
    }
  }, [open]);

  // ---- Body scroll lock ----
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  // ---- Debounced multi-index search ----
  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults(EMPTY_RESULTS);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const client = getSearchClient();
      const response = await client.search({
        requests: [
          { indexName: ALGOLIA_INDEX_COLORS, query: q, hitsPerPage: 6 },
          { indexName: ALGOLIA_INDEX_PRODUCTS, query: q, hitsPerPage: 4 },
          { indexName: ALGOLIA_INDEX_ARTICLES, query: q, hitsPerPage: 4 },
        ],
      });

      const [colorsResult, productsResult, articlesResult] = response.results;

      setResults({
        colors: "hits" in colorsResult ? (colorsResult.hits as ColorHit[]) : [],
        products: "hits" in productsResult ? (productsResult.hits as ProductHit[]) : [],
        articles: "hits" in articlesResult ? (articlesResult.hits as ArticleHit[]) : [],
      });
    } catch (err) {
      console.error("Search failed:", err);
      setResults(EMPTY_RESULTS);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => doSearch(value), 300);
    },
    [doSearch],
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const hasResults =
    results.colors.length > 0 ||
    results.products.length > 0 ||
    results.articles.length > 0;
  const hasQuery = query.trim().length > 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Search panel */}
          <motion.div
            key="search-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 top-0 z-50 mx-auto mt-20 max-w-2xl px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Søk"
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* Search input */}
              <div className="relative border-b border-warm-100 px-5 py-4">
                <div className="flex items-center gap-3">
                  <SearchIcon className="h-5 w-5 shrink-0 text-warm-400" />
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Søk etter farger, produkter eller guider..."
                    autoComplete="off"
                    data-1p-ignore="true"
                    data-lpignore="true"
                    data-form-type="other"
                    className="flex-1 bg-transparent text-lg text-warm-900 placeholder:text-warm-400 focus:outline-none"
                  />
                  {loading && (
                    <div className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-warm-200 border-t-warm-600" />
                  )}
                  <button
                    onClick={onClose}
                    aria-label="Lukk søk"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-warm-400 transition-colors hover:bg-warm-100 hover:text-warm-700"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/* Keyboard shortcut hint */}
                <div className="mt-1.5 flex items-center gap-2 text-xs text-warm-400">
                  <kbd className="rounded border border-warm-200 bg-warm-50 px-1.5 py-0.5 font-mono text-[10px] text-warm-500">
                    ESC
                  </kbd>
                  <span>for å lukke</span>
                </div>
              </div>

              {/* Results area */}
              <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
                {/* Empty state */}
                {!hasQuery && (
                  <div className="px-5 py-10 text-center text-warm-500">
                    <SearchIcon className="mx-auto mb-3 h-8 w-8 text-warm-300" />
                    <p className="text-sm">
                      Søk etter farger, produkter eller guider...
                    </p>
                  </div>
                )}

                {/* No results */}
                {hasQuery && !hasResults && !loading && (
                  <div className="px-5 py-10 text-center text-warm-500">
                    <p className="text-sm">
                      Ingen treff for &laquo;{query}&raquo;. Prøv et annet
                      søkeord.
                    </p>
                  </div>
                )}

                {/* Colors */}
                {results.colors.length > 0 && (
                  <ResultSection title="Farger">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {results.colors.map((color) => (
                        <Link
                          key={color.objectID}
                          href={`/farge/${color.objectID}`}
                          onClick={onClose}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-warm-50"
                        >
                          <span
                            className="h-8 w-8 shrink-0 rounded-lg border border-warm-200 shadow-sm"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-warm-900">
                              {color.name}
                            </p>
                            {color.ncs && (
                              <p className="truncate text-xs text-warm-500">
                                {color.ncs}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </ResultSection>
                )}

                {/* Products */}
                {results.products.length > 0 && (
                  <ResultSection title="Produkter">
                    <div className="space-y-1">
                      {results.products.map((product) => (
                        <Link
                          key={product.objectID}
                          href={`/produkt/${product.slug}`}
                          onClick={onClose}
                          className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-warm-50"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="truncate text-sm font-medium text-warm-900">
                                {product.name}
                              </p>
                              {product.badge && (
                                <span className="shrink-0 rounded-full bg-warm-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warm-700">
                                  {product.badge}
                                </span>
                              )}
                            </div>
                            {product.finishName && (
                              <p className="text-xs text-warm-500">
                                {product.finishName}
                              </p>
                            )}
                          </div>
                          {product.priceFrom != null && (
                            <span className="shrink-0 pl-3 text-sm font-semibold text-warm-900">
                              fra kr {product.priceFrom},-
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </ResultSection>
                )}

                {/* Articles */}
                {results.articles.length > 0 && (
                  <ResultSection title="Guider">
                    <div className="space-y-1">
                      {results.articles.map((article) => (
                        <Link
                          key={article.objectID}
                          href={`/artikkel/${article.slug}`}
                          onClick={onClose}
                          className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-warm-50"
                        >
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-medium text-warm-900">
                              {article.title}
                            </p>
                            {article.articleType && (
                              <span className="shrink-0 rounded-full bg-warm-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warm-700">
                                {articleTypeLabel(article.articleType)}
                              </span>
                            )}
                          </div>
                          {article.excerpt && (
                            <p className="mt-0.5 line-clamp-1 text-xs text-warm-500">
                              {article.excerpt}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </ResultSection>
                )}
              </div>

              {/* Footer with Algolia attribution */}
              {hasQuery && hasResults && (
                <div className="border-t border-warm-100 px-5 py-2.5 text-right">
                  <span className="text-[10px] text-warm-400">
                    Søk drevet av Algolia
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function ResultSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-warm-100 px-5 py-4 last:border-b-0">
      <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-warm-500">
        {title}
      </h3>
      {children}
    </div>
  );
}

function articleTypeLabel(type: string): string {
  const map: Record<string, string> = {
    guide: "Guide",
    inspiration: "Inspirasjon",
    tips: "Tips",
    howto: "Slik gjør du",
    article: "Artikkel",
  };
  return map[type] || type;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
