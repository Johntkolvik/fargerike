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
// Types
// ---------------------------------------------------------------------------

interface ColorHit {
  objectID: string;
  name: string;
  ncs: string;
  hex: string;
}

interface ProductHit {
  objectID: string;
  name: string;
  slug: string;
  badge?: string | null;
  priceFrom?: number | null;
  finishName?: string;
}

interface ArticleHit {
  objectID: string;
  title: string;
  slug: string;
  articleType?: string;
  excerpt?: string;
  imageUrl?: string;
}

type SearchResults = {
  colors: ColorHit[];
  products: ProductHit[];
  articles: ArticleHit[];
};

const EMPTY: SearchResults = { colors: [], products: [], articles: [] };

// ---------------------------------------------------------------------------
// Default content shown before the user types
// ---------------------------------------------------------------------------

const CAMPAIGNS = [
  { label: "Terrassebeis fra 399,-", href: "/maling/ute/terrassebeis", color: "#E8D5C4" },
  { label: "Spar 40% p\u00e5 terrasserens", href: "/maling/ute", color: "#D4CBC0" },
  { label: "Gratis fargekonsultasjon", href: "/tjenester/fargekonsultasjon", color: "#c7c2af" },
];

const RECOMMENDED_PRODUCTS = [
  { name: "Lady Wonderwall", badge: "Mest popul\u00e6r", slug: "lady-wonderwall" },
  { name: "Sens", badge: null, slug: "sens" },
  { name: "Drygolin Nordic Extreme", badge: "Utend\u00f8rs", slug: "drygolin-nordic-extreme" },
  { name: "Lady Pure Color", badge: "Supermatt", slug: "lady-pure-color" },
];

const POPULAR_ARTICLES = [
  { title: "Slik beiser du terrassen", slug: "beise-terrassen", type: "Guide" },
  { title: "Velg riktig innend\u00f8rsmaling", slug: "velg-innendorsmaling", type: "Guide" },
  { title: "V\u00e5rens farger 2026", slug: "varens-farger-2026", type: "Inspirasjon" },
  { title: "Nordisk stue", slug: "nordisk-stue", type: "Inspirasjon" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>(EMPTY);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    } else {
      setQuery("");
      setResults(EMPTY);
    }
  }, [open]);

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

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults(EMPTY);
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
      const [c, p, a] = response.results;
      setResults({
        colors: "hits" in c ? (c.hits as ColorHit[]) : [],
        products: "hits" in p ? (p.hits as ProductHit[]) : [],
        articles: "hits" in a ? (a.hits as ArticleHit[]) : [],
      });
    } catch {
      setResults(EMPTY);
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

  useEffect(() => {
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, []);

  const hasResults = results.colors.length > 0 || results.products.length > 0 || results.articles.length > 0;
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

          {/* Drawer panel — slides down from top */}
          <motion.div
            key="search-drawer"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 top-0 z-50 max-h-[85vh] overflow-hidden bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="S&oslash;k"
          >
            {/* Search input */}
            <div className="border-b border-warm-100 px-6 py-5 sm:px-8">
              <div className="mx-auto flex max-w-4xl items-center gap-3">
                <SearchIcon className="h-5 w-5 shrink-0 text-warm-400" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="S&oslash;k etter farger, produkter eller guider..."
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
                  aria-label="Lukk s&oslash;k"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-warm-400 transition-colors hover:bg-warm-100 hover:text-warm-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mx-auto mt-1.5 flex max-w-4xl items-center gap-2 text-xs text-warm-300">
                <kbd className="rounded border border-warm-200 bg-warm-50 px-1.5 py-0.5 font-mono text-[10px] text-warm-400">ESC</kbd>
                <span>for &aring; lukke</span>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="mx-auto max-w-4xl overflow-y-auto overscroll-contain px-6 pb-6 sm:px-8" style={{ maxHeight: "calc(85vh - 100px)" }}>

              {/* ═══ DEFAULT STATE: shown before user types ═══ */}
              {!hasQuery && (
                <div className="py-6">
                  {/* Campaigns */}
                  <Section title="Kampanjer">
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {CAMPAIGNS.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={onClose}
                          className="flex shrink-0 items-center gap-3 rounded-xl border border-warm-200 px-4 py-3 transition-colors hover:border-warm-300 hover:shadow-sm"
                        >
                          <span className="h-8 w-8 shrink-0 rounded-lg" style={{ backgroundColor: c.color }} />
                          <span className="whitespace-nowrap text-sm font-medium text-warm-900">{c.label}</span>
                        </Link>
                      ))}
                    </div>
                  </Section>

                  {/* Recommended products */}
                  <Section title="Anbefalte produkter">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {RECOMMENDED_PRODUCTS.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/produkt/${p.slug}`}
                          onClick={onClose}
                          className="group rounded-xl border border-warm-200 px-4 py-3 transition-all hover:border-warm-300 hover:shadow-sm"
                        >
                          <p className="text-sm font-semibold text-warm-900 group-hover:underline">{p.name}</p>
                          {p.badge && (
                            <span className="mt-1 inline-block rounded-full bg-warm-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-warm-600">
                              {p.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </Section>

                  {/* Popular articles */}
                  <Section title="Popul&aelig;re guider">
                    <div className="space-y-1">
                      {POPULAR_ARTICLES.map((a) => (
                        <Link
                          key={a.slug}
                          href={`/artikkel/${a.slug}`}
                          onClick={onClose}
                          className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-warm-50"
                        >
                          <span className="text-sm font-medium text-warm-900">{a.title}</span>
                          <span className="shrink-0 rounded-full bg-warm-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-warm-600">
                            {a.type}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </Section>
                </div>
              )}

              {/* ═══ SEARCH RESULTS ═══ */}
              {hasQuery && (
                <div className="py-4">
                  {/* No results */}
                  {!hasResults && !loading && (
                    <div className="py-10 text-center text-warm-500">
                      <p className="text-sm">Ingen treff for &laquo;{query}&raquo;. Pr&oslash;v et annet s&oslash;keord.</p>
                    </div>
                  )}

                  {/* Colors */}
                  {results.colors.length > 0 && (
                    <Section title="Farger">
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
                              <p className="truncate text-sm font-medium text-warm-900">{color.name}</p>
                              {color.ncs && <p className="truncate text-xs text-warm-500">{color.ncs}</p>}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </Section>
                  )}

                  {/* Products */}
                  {results.products.length > 0 && (
                    <Section title="Produkter">
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
                                <p className="truncate text-sm font-medium text-warm-900">{product.name}</p>
                                {product.badge && (
                                  <span className="shrink-0 rounded-full bg-warm-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warm-700">
                                    {product.badge}
                                  </span>
                                )}
                              </div>
                              {product.finishName && <p className="text-xs text-warm-500">{product.finishName}</p>}
                            </div>
                            {product.priceFrom != null && (
                              <span className="shrink-0 pl-3 text-sm font-semibold text-warm-900">
                                fra {product.priceFrom},-
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </Section>
                  )}

                  {/* Articles */}
                  {results.articles.length > 0 && (
                    <Section title="Guider">
                      <div className="space-y-1">
                        {results.articles.map((article) => (
                          <Link
                            key={article.objectID}
                            href={`/artikkel/${article.slug}`}
                            onClick={onClose}
                            className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-warm-50"
                          >
                            <div className="flex items-center gap-2">
                              <p className="truncate text-sm font-medium text-warm-900">{article.title}</p>
                              {article.articleType && (
                                <span className="shrink-0 rounded-full bg-warm-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warm-700">
                                  {typeLabel(article.articleType)}
                                </span>
                              )}
                            </div>
                            {article.excerpt && (
                              <p className="mt-0.5 line-clamp-1 text-xs text-warm-500">{article.excerpt}</p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </Section>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {hasQuery && hasResults && (
              <div className="border-t border-warm-100 px-6 py-2.5 text-right sm:px-8">
                <span className="text-[10px] text-warm-400">S&oslash;k drevet av Algolia</span>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-warm-400">{title}</h3>
      {children}
    </div>
  );
}

function typeLabel(type: string): string {
  const map: Record<string, string> = { howto: "Guide", inspirasjon: "Inspirasjon", kampanje: "Kampanje" };
  return map[type] || type;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}
