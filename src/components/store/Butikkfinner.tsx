"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Map, {
  Marker,
  NavigationControl,
  type MapRef,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface StoreListItem {
  _id: string;
  name: string;
  slug: { current: string };
  address?: { street?: string; postalCode?: string; city?: string };
  coordinates?: { lat: number; lng: number };
  county?: string;
  phone?: string;
  email?: string;
  openingHours?: { day: string; open: string; close: string }[];
}

type GeoState = "idle" | "locating" | "error";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const WEEKDAY_KEYS = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
  "Søndag",
];

function getTodayDayName(): string {
  const day = new Date().getDay();
  const idx = day === 0 ? 6 : day - 1;
  return WEEKDAY_KEYS[idx];
}

function getTodayHours(
  hours: { day: string; open: string; close: string }[] | undefined
): string {
  if (!hours || hours.length === 0) return "Ukjent";
  const today = getTodayDayName();
  const entry = hours.find((h) => h.day === today);
  if (!entry) return "Ukjent";
  if (entry.open === "Stengt" || entry.close === "Stengt") return "Stengt";
  return `${entry.open}\u2013${entry.close}`;
}

function isStoreOpen(
  hours: { day: string; open: string; close: string }[] | undefined
): boolean {
  const todayHours = getTodayHours(hours);
  return todayHours !== "Stengt" && todayHours !== "Ukjent";
}

function distanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function Butikkfinner({ stores }: { stores: StoreListItem[] }) {
  // Derive unique counties, sorted alphabetically (Norwegian)
  const counties = [
    ...new Set(stores.map((s) => s.county).filter(Boolean)),
  ].sort((a, b) => (a as string).localeCompare(b as string, "nb")) as string[];

  const [query, setQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState<StoreListItem | null>(
    null
  );
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [geoState, setGeoState] = useState<GeoState>("idle");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 15.0,
    latitude: 65.5,
    zoom: 4.5,
  });
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapRef>(null);
  const todayLabel = getTodayDayName();

  const flyTo = useCallback((lng: number, lat: number, zoom = 14) => {
    mapRef.current?.flyTo({ center: [lng, lat], zoom, duration: 1200 });
  }, []);

  // Filter stores by search query + county
  const filtered = stores.filter((s) => {
    const q = query.toLowerCase();
    const matchesQuery =
      query === "" ||
      s.name.toLowerCase().includes(q) ||
      (s.address?.city?.toLowerCase().includes(q) ?? false) ||
      (s.address?.postalCode?.includes(query) ?? false) ||
      (s.address?.street?.toLowerCase().includes(q) ?? false) ||
      (s.county?.toLowerCase().includes(q) ?? false);

    const matchesCounty = !selectedCounty || s.county === selectedCounty;
    return matchesQuery && matchesCounty;
  });

  // Sort by distance if geolocation is available
  const sorted = userLocation
    ? [...filtered].sort((a, b) => {
        const aDist = a.coordinates
          ? distanceKm(
              userLocation.lat,
              userLocation.lng,
              a.coordinates.lat,
              a.coordinates.lng
            )
          : Infinity;
        const bDist = b.coordinates
          ? distanceKm(
              userLocation.lat,
              userLocation.lng,
              b.coordinates.lat,
              b.coordinates.lng
            )
          : Infinity;
        return aDist - bDist;
      })
    : filtered;

  // Show county list when: no search, no county selected, no store selected, no geolocation
  const showCountyList =
    query === "" &&
    !selectedCounty &&
    !selectedStore &&
    geoState === "idle" &&
    !userLocation;

  // Nearby stores (when a store is selected)
  const nearbyStores = selectedStore
    ? stores
        .filter((s) => s._id !== selectedStore._id && s.coordinates)
        .map((s) => ({
          ...s,
          dist: selectedStore.coordinates
            ? distanceKm(
                selectedStore.coordinates.lat,
                selectedStore.coordinates.lng,
                s.coordinates!.lat,
                s.coordinates!.lng
              )
            : Infinity,
        }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 4)
    : [];

  const getDistance = useCallback(
    (store: StoreListItem): number | null => {
      if (!userLocation || !store.coordinates) return null;
      return distanceKm(
        userLocation.lat,
        userLocation.lng,
        store.coordinates.lat,
        store.coordinates.lng
      );
    },
    [userLocation]
  );

  // Autocomplete: top 5 matching stores
  const acStores =
    query.length >= 1
      ? stores
          .filter((s) => {
            const q = query.toLowerCase();
            return (
              s.name.toLowerCase().includes(q) ||
              (s.address?.city?.toLowerCase().includes(q) ?? false) ||
              (s.address?.street?.toLowerCase().includes(q) ?? false)
            );
          })
          .slice(0, 5)
      : [];

  const showDropdown = isSearchFocused && query.length >= 1 && acStores.length > 0;

  const handleFindNearest = () => {
    if (!navigator.geolocation) {
      setGeoState("error");
      return;
    }
    setGeoState("locating");
    setSelectedStore(null);
    setSelectedCounty(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        flyTo(longitude, latitude, 11);
        const nearest = stores
          .filter((s) => s.coordinates)
          .map((s) => ({
            ...s,
            dist: distanceKm(
              latitude,
              longitude,
              s.coordinates!.lat,
              s.coordinates!.lng
            ),
          }))
          .sort((a, b) => a.dist - b.dist)[0];
        setGeoState("idle");
        if (nearest) setSelectedStore(nearest);
      },
      () => setGeoState("error"),
      { timeout: 10000 }
    );
  };

  const handleBack = () => {
    setSelectedStore(null);
    setSelectedCounty(null);
    setUserLocation(null);
    setGeoState("idle");
    mapRef.current?.flyTo({
      center: [15.0, 65.5],
      zoom: 4.5,
      duration: 1200,
    });
  };

  // Fly to selected store
  useEffect(() => {
    if (selectedStore?.coordinates) {
      flyTo(selectedStore.coordinates.lng, selectedStore.coordinates.lat, 14);
    }
  }, [selectedStore, flyTo]);

  // Scroll list to top on view change
  useEffect(() => {
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [query, selectedCounty, selectedStore]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="butikkfinner-root grid h-[calc(100vh-72px)] grid-cols-1 md:grid-cols-[440px_1fr]">
      {/* -- Left panel -- */}
      <div className="flex flex-col overflow-hidden border-r border-warm-200 bg-white">
        {/* Panel header */}
        <div className="shrink-0 border-b border-warm-200 px-6 pb-4 pt-6">
          {/* Back link or title */}
          {selectedStore ? (
            <button
              onClick={handleBack}
              className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-warm-700 hover:text-warm-900 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M9 3L5 7l4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Tilbake til finn butikk
            </button>
          ) : (
            <h1 className="mb-4 text-2xl font-bold tracking-tight text-warm-900 lg:text-3xl">
              Finn butikk
            </h1>
          )}

          {/* Search with autocomplete */}
          <div ref={searchContainerRef} className="relative mb-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <svg
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-400"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle
                    cx="6.5"
                    cy="6.5"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M10.5 10.5L14 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Sted, postnummer, eller butikknavn"
                  value={query}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedCounty(null);
                    setSelectedStore(null);
                    setIsSearchFocused(true);
                  }}
                  aria-label="Sok etter butikk"
                  aria-expanded={showDropdown}
                  aria-haspopup="listbox"
                  className="w-full rounded-lg border border-warm-200 bg-white py-3 pl-10 pr-9 text-sm text-warm-900 placeholder:text-warm-400 outline-none transition-colors focus:border-warm-400 focus:ring-2 focus:ring-warm-200"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setIsSearchFocused(true);
                    }}
                    aria-label="Tom sok"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-400 hover:text-warm-600 transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M4 4l8 8M12 4l-8 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <button
                onClick={() => setIsSearchFocused(false)}
                className="shrink-0 rounded-lg bg-warm-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-warm-800"
              >
                Sok
              </button>
            </div>

            {/* Autocomplete dropdown */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.12 }}
                  role="listbox"
                  className="absolute left-0 right-0 top-[calc(100%+4px)] z-[200] overflow-hidden rounded-lg border border-warm-200 bg-white shadow-lg"
                >
                  <div className="flex items-center justify-between px-4 pb-1 pt-2.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-warm-500">
                      Butikker
                    </span>
                    <button
                      onClick={() => {
                        handleFindNearest();
                        setIsSearchFocused(false);
                      }}
                      className="text-sm font-semibold text-warm-700 hover:text-warm-900"
                    >
                      Finn min naermeste butikk
                    </button>
                  </div>
                  {acStores.map((store) => (
                    <button
                      key={store._id}
                      role="option"
                      onClick={() => {
                        setSelectedStore(store);
                        setIsSearchFocused(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-warm-50"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-warm-400">
                        <svg
                          width="12"
                          height="14"
                          viewBox="0 0 12 14"
                          fill="none"
                        >
                          <path
                            d="M6 0C3.239 0 1 2.239 1 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.761-2.239-5-5-5z"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            fill="none"
                            className="text-warm-500"
                          />
                          <circle
                            cx="6"
                            cy="5"
                            r="1.5"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            className="text-warm-500"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-warm-900">
                          {store.name}
                        </p>
                        <p className="text-xs text-warm-500">
                          {store.address?.street}, {store.address?.city}
                        </p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Geolocation button */}
          <button
            onClick={handleFindNearest}
            disabled={geoState === "locating"}
            className="flex items-center gap-2 rounded-lg border border-warm-200 bg-warm-50 px-4 py-2.5 text-sm font-medium text-warm-700 transition-colors hover:bg-warm-100 hover:border-warm-300 disabled:opacity-60 disabled:cursor-wait"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="8"
                cy="8"
                r="3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 1v2M8 13v2M1 8h2M13 8h2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {geoState === "locating"
              ? "Finner posisjon..."
              : userLocation
                ? "Sortert etter avstand"
                : "Bruk min posisjon"}
          </button>
        </div>

        {/* Scrollable list / detail area */}
        <div ref={listRef} className="flex-1 overflow-y-auto">
          {/* -- Geolocation: loading -- */}
          {geoState === "locating" && (
            <div className="p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-8 w-8 shrink-0 animate-spin rounded-full border-[2.5px] border-warm-200 border-t-warm-700" />
                <div>
                  <p className="text-sm font-semibold text-warm-900">
                    Finner butikker i naerheten...
                  </p>
                  <p className="mt-0.5 text-xs text-warm-500">
                    Gi nettleseren tillatelse til a bruke din posisjon
                  </p>
                </div>
              </div>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border-b border-warm-200 py-4"
                >
                  <div className="mb-2 h-3.5 w-36 rounded bg-warm-100" />
                  <div className="h-3.5 w-64 rounded bg-warm-100" />
                </div>
              ))}
            </div>
          )}

          {/* -- Geolocation: error -- */}
          {geoState === "error" && (
            <div className="px-6 py-8 text-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                className="mx-auto mb-4 text-red-600"
              >
                <path
                  d="M20 4C12.268 4 6 10.268 6 18c0 10.5 14 24 14 24s14-13.5 14-24c0-7.732-6.268-14-14-14z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="20"
                  cy="18"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <p className="mb-3 text-sm font-semibold text-red-600">
                Vi kunne ikke finne din posisjon.
              </p>
              <p className="mb-6 text-sm text-warm-600">
                Sjekk at du har gitt tillatelse til stedstjenester i
                nettleseren.
              </p>
              <button
                onClick={handleBack}
                className="rounded-lg bg-warm-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-warm-800"
              >
                Vis alle butikker
              </button>
            </div>
          )}

          {/* -- Store detail view -- */}
          {selectedStore && geoState === "idle" && (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStore._id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
              >
                {/* Store name + status */}
                <div className="border-b border-warm-200 px-6 py-5">
                  <h2 className="text-xl font-bold text-warm-900">
                    {selectedStore.name}
                  </h2>
                  {selectedStore.openingHours && (
                    <p
                      className={`mt-1 text-sm font-semibold ${
                        isStoreOpen(selectedStore.openingHours)
                          ? "text-green-700"
                          : "text-warm-400"
                      }`}
                    >
                      {isStoreOpen(selectedStore.openingHours)
                        ? `Apent \u2013 ${getTodayHours(selectedStore.openingHours)}`
                        : `Stengt \u2013 ${getTodayHours(selectedStore.openingHours)}`}
                    </p>
                  )}
                </div>

                {/* Opening hours */}
                {selectedStore.openingHours &&
                  selectedStore.openingHours.length > 0 && (
                    <div className="border-b border-warm-200 px-6 py-5">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-warm-400">
                        Apningstider
                      </p>
                      <table className="w-full text-sm">
                        <tbody>
                          {WEEKDAY_KEYS.map((dayName) => {
                            const entry = selectedStore.openingHours?.find(
                              (h) => h.day === dayName
                            );
                            const isToday = dayName === todayLabel;
                            const isClosed =
                              !entry ||
                              entry.open === "Stengt" ||
                              entry.close === "Stengt";
                            return (
                              <tr
                                key={dayName}
                                className={
                                  isToday
                                    ? "font-semibold text-warm-900"
                                    : "text-warm-600"
                                }
                              >
                                <td className="py-0.5 w-1/2">{dayName}</td>
                                <td className="py-0.5 text-right">
                                  {isClosed ? (
                                    <span className="text-warm-400">
                                      Stengt
                                    </span>
                                  ) : (
                                    `${entry!.open}\u2013${entry!.close}`
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                {/* Address + Contact */}
                <div className="grid grid-cols-2 gap-4 border-b border-warm-200 px-6 py-5">
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-warm-400">
                      Adresse
                    </p>
                    {selectedStore.address && (
                      <p className="mb-1 text-sm text-warm-800">
                        {selectedStore.address.street}
                        <br />
                        {selectedStore.address.postalCode}{" "}
                        {selectedStore.address.city}
                      </p>
                    )}
                    {selectedStore.coordinates && (
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedStore.coordinates.lat},${selectedStore.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-warm-700 hover:text-warm-900 transition-colors"
                      >
                        Se veibeskrivelse &rarr;
                      </a>
                    )}
                  </div>
                  <div>
                    {selectedStore.phone && (
                      <div className="mb-3">
                        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-warm-400">
                          Telefon
                        </p>
                        <a
                          href={`tel:${selectedStore.phone.replace(/\s/g, "")}`}
                          className="text-sm font-medium text-warm-800 hover:underline"
                        >
                          {selectedStore.phone}
                        </a>
                      </div>
                    )}
                    {selectedStore.email && (
                      <div>
                        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-warm-400">
                          E-post
                        </p>
                        <a
                          href={`mailto:${selectedStore.email}`}
                          className="text-sm text-warm-800 hover:underline break-all"
                        >
                          {selectedStore.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Link to full store profile */}
                <div className="border-b border-warm-200 px-6 py-4">
                  <Link
                    href={`/butikker/${selectedStore.slug.current}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-warm-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-warm-800"
                  >
                    Se butikkprofil
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M5 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Nearby stores */}
                {nearbyStores.length > 0 && (
                  <div className="px-6 pt-5 pb-2">
                    <p className="mb-2 text-sm font-bold text-warm-900">
                      Butikker i naerheten:
                    </p>
                    {nearbyStores.map((store) => (
                      <div
                        key={store._id}
                        className="flex items-center justify-between gap-3 border-b border-warm-200 py-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-warm-800">
                            {store.name}
                          </p>
                          <p className="text-xs text-warm-500">
                            {store.address?.street}, {store.address?.city}{" "}
                            &ndash; {store.dist.toFixed(1).replace(".", ",")} km
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedStore(store)}
                          className="shrink-0 rounded-full border border-warm-200 px-3 py-1 text-xs font-medium text-warm-600 transition-colors hover:border-warm-400 hover:text-warm-900"
                        >
                          Vis
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* -- County list (initial state) -- */}
          {showCountyList && (
            <div>
              <div className="px-6 py-3">
                <p className="text-sm text-warm-500">
                  Velg fylke eller{" "}
                  <button
                    onClick={handleFindNearest}
                    className="font-semibold text-warm-700 hover:text-warm-900"
                  >
                    finn naermeste butikk
                  </button>
                </p>
              </div>
              {counties.map((county) => (
                <button
                  key={county}
                  onClick={() => setSelectedCounty(county)}
                  className="butikkfinner-county-row flex w-full items-center justify-between border-b border-warm-100 px-6 py-3.5 text-left transition-colors hover:bg-warm-50"
                >
                  <span className="text-sm text-warm-800">{county}</span>
                  <span className="text-xs text-warm-400">
                    {stores.filter((s) => s.county === county).length} butikker
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* -- Store list (search or county active, no store selected) -- */}
          {!showCountyList && !selectedStore && geoState === "idle" && (
            <div>
              {selectedCounty && (
                <div className="border-b border-warm-200 px-6 py-3">
                  <button
                    onClick={() => setSelectedCounty(null)}
                    className="flex items-center gap-1 text-sm font-semibold text-warm-700 hover:text-warm-900"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M9 3L5 7l4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Alle fylker
                  </button>
                </div>
              )}

              <div className="border-b border-warm-200 px-6 py-3">
                <p className="text-xs text-warm-500">
                  {sorted.length} butikker
                  {query
                    ? ` for \u00AB${query}\u00BB`
                    : selectedCounty
                      ? ` i ${selectedCounty}`
                      : ""}
                </p>
              </div>

              <AnimatePresence mode="popLayout">
                {sorted.map((store, i) => {
                  const dist = getDistance(store);
                  const open = isStoreOpen(store.openingHours);
                  return (
                    <motion.div
                      key={store._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        delay: Math.min(i * 0.02, 0.2),
                        duration: 0.2,
                      }}
                      className="border-b border-warm-100"
                    >
                      <div
                        onClick={() => setSelectedStore(store)}
                        className="butikkfinner-store-row flex cursor-pointer items-center justify-between gap-3 px-6 py-3.5 transition-colors hover:bg-warm-50"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="mb-0.5 flex items-center gap-2">
                            <span className="truncate text-sm font-semibold text-warm-900">
                              {store.name}
                            </span>
                            <span
                              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                open
                                  ? "bg-green-50 text-green-700"
                                  : "bg-warm-100 text-warm-400"
                              }`}
                            >
                              {open ? "Apent" : "Stengt"}
                            </span>
                          </div>
                          <p className="truncate text-xs text-warm-500">
                            {[
                              store.address?.street,
                              store.address?.postalCode,
                              store.address?.city,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          {dist !== null && (
                            <span className="rounded-full bg-warm-100 px-2.5 py-1 text-xs font-medium text-warm-700">
                              {formatDistance(dist)}
                            </span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStore(store);
                            }}
                            className="rounded-full border border-warm-200 px-3 py-1 text-xs font-medium text-warm-600 transition-colors hover:border-warm-400 hover:text-warm-900"
                          >
                            Vis
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {sorted.length === 0 && (
                <div className="px-6 py-12 text-center text-warm-500">
                  <p className="text-sm">
                    Ingen butikker matcher soket ditt.
                  </p>
                  <button
                    onClick={() => {
                      setQuery("");
                      setSelectedCounty(null);
                    }}
                    className="mt-2 text-sm font-semibold text-warm-700 underline hover:no-underline"
                  >
                    Vis alle butikker
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* -- Map area -- */}
      <div className="relative hidden overflow-hidden md:block">
        <Map
          ref={mapRef}
          {...viewState}
          onMove={(e) => setViewState(e.viewState)}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/light-v11"
          style={{ width: "100%", height: "100%" }}
          reuseMaps
        >
          <NavigationControl position="bottom-right" />

          {/* Store markers */}
          {filtered
            .filter((s) => s.coordinates)
            .slice(0, 300)
            .map((store) => {
              const isSelected = selectedStore?._id === store._id;
              return (
                <Marker
                  key={store._id}
                  longitude={store.coordinates!.lng}
                  latitude={store.coordinates!.lat}
                  anchor="center"
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setSelectedStore(store);
                  }}
                >
                  <div
                    title={store.name}
                    className={`flex items-center justify-center rounded-full border-2 transition-all cursor-pointer select-none ${
                      isSelected
                        ? "h-9 w-9 border-warm-900 bg-warm-900 text-white shadow-lg"
                        : "h-7 w-7 border-warm-700 bg-white text-warm-700 shadow-md hover:border-warm-900 hover:text-warm-900"
                    }`}
                  >
                    <svg
                      width="12"
                      height="14"
                      viewBox="0 0 12 14"
                      fill="none"
                      className="shrink-0"
                    >
                      <path
                        d="M6 0C3.239 0 1 2.239 1 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.761-2.239-5-5-5z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </Marker>
              );
            })}

          {/* User location dot */}
          {userLocation && (
            <Marker
              longitude={userLocation.lng}
              latitude={userLocation.lat}
              anchor="center"
            >
              <div className="h-4 w-4 rounded-full border-[3px] border-white bg-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.3)]" />
            </Marker>
          )}
        </Map>

        {/* Map overlay: find nearest button */}
        <div className="absolute right-4 top-4 z-10 flex items-center gap-3 rounded-lg bg-white px-4 py-2.5 shadow-md">
          <button
            onClick={handleFindNearest}
            disabled={geoState === "locating"}
            className="flex items-center gap-1.5 rounded-full bg-warm-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-warm-800 disabled:opacity-70 disabled:cursor-wait"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle
                cx="6"
                cy="6"
                r="2.5"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M6 1v1.5M6 9.5V11M1 6h1.5M9.5 6H11"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Finn naermeste butikk
          </button>
        </div>
      </div>

      {/* -- Mobile: map link fallback -- */}
      <div className="md:hidden border-t border-warm-200 bg-warm-50 p-4 text-center">
        <a
          href={
            selectedStore?.coordinates
              ? `https://www.google.com/maps/dir/?api=1&destination=${selectedStore.coordinates.lat},${selectedStore.coordinates.lng}`
              : "https://www.google.com/maps/search/Fargerike+Norway"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-warm-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-warm-800"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1C5.239 1 3 3.239 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.761-2.239-5-5-5z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <circle
              cx="8"
              cy="6"
              r="1.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          Vis pa kart
        </a>
      </div>

      <style>{`
        @keyframes butikk-spin {
          to {
            transform: rotate(360deg);
          }
        }
        @media (max-width: 767px) {
          .butikkfinner-root {
            grid-template-columns: 1fr !important;
            height: auto !important;
            min-height: calc(100vh - 72px);
          }
        }
      `}</style>
    </div>
  );
}
