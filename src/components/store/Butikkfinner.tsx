"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface StoreListItem {
  _id: string;
  name: string;
  slug: { current: string };
  address?: { street?: string; postalCode?: string; city?: string };
  coordinates?: { lat: number; lng: number };
  phone?: string;
  openingHours?: { day: string; open: string; close: string }[];
}

type GeoState = "idle" | "locating" | "granted" | "error";

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
  const day = new Date().getDay(); // 0 = Sunday
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
  return `${entry.open}–${entry.close}`;
}

/** Haversine distance in km */
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
  const [query, setQuery] = useState("");
  const [geoState, setGeoState] = useState<GeoState>("idle");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Filter stores by search query
  const filtered = stores.filter((s) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      (s.address?.city?.toLowerCase().includes(q) ?? false) ||
      (s.address?.postalCode?.includes(query) ?? false) ||
      (s.address?.street?.toLowerCase().includes(q) ?? false)
    );
  });

  // Sort by distance if geolocation is available, otherwise alphabetically
  const sorted = userLocation
    ? [...filtered].sort((a, b) => {
        const aDist =
          a.coordinates
            ? distanceKm(
                userLocation.lat,
                userLocation.lng,
                a.coordinates.lat,
                a.coordinates.lng
              )
            : Infinity;
        const bDist =
          b.coordinates
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

  const handleFindNearest = () => {
    if (!navigator.geolocation) {
      setGeoState("error");
      return;
    }
    setGeoState("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setGeoState("granted");
      },
      () => {
        setGeoState("error");
      },
      { timeout: 10000 }
    );
  };

  const todayLabel = getTodayDayName();

  return (
    <div className="space-y-6">
      {/* Search and geolocation controls */}
      <div className="space-y-3">
        {/* Search input */}
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-400"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <circle
              cx="7.5"
              cy="7.5"
              r="5.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M12 12L16 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Søk etter butikk, by eller postnummer"
            aria-label="Søk etter butikk"
            className="w-full rounded-xl border border-warm-200 bg-white py-3 pl-11 pr-10 text-sm text-warm-900 placeholder:text-warm-400 outline-none transition-colors focus:border-warm-400 focus:ring-2 focus:ring-warm-200"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Tøm søk"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-warm-400 hover:text-warm-600 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
            : geoState === "granted"
              ? "Sortert etter avstand"
              : "Bruk min posisjon"}
        </button>

        {geoState === "error" && (
          <p className="text-sm text-red-600">
            Kunne ikke finne posisjonen din. Sjekk at du har gitt tillatelse til
            stedstjenester.
          </p>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-warm-500">
        {sorted.length === stores.length
          ? `${stores.length} butikker`
          : `${sorted.length} av ${stores.length} butikker`}
      </p>

      {/* Store list */}
      <div className="space-y-3">
        {sorted.length === 0 ? (
          <div className="rounded-xl border border-warm-200 bg-warm-50 p-8 text-center">
            <p className="text-warm-600">
              Ingen butikker matcher &laquo;{query}&raquo;
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-2 text-sm font-medium text-warm-900 underline hover:no-underline"
            >
              Vis alle butikker
            </button>
          </div>
        ) : (
          sorted.map((store) => {
            const dist = getDistance(store);
            const todayHours = getTodayHours(store.openingHours);
            const isOpen =
              todayHours !== "Stengt" && todayHours !== "Ukjent";

            return (
              <Link
                key={store._id}
                href={`/butikker/${store.slug.current}`}
                className="group block rounded-xl border border-warm-200 bg-white p-5 transition-all hover:border-warm-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    {/* Store name */}
                    <h3 className="text-base font-semibold text-warm-900 group-hover:underline">
                      {store.name}
                    </h3>

                    {/* Address */}
                    {store.address && (
                      <p className="mt-1 text-sm text-warm-500">
                        {[store.address.street, store.address.postalCode, store.address.city]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}

                    {/* Phone + hours */}
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                      {store.phone && (
                        <span className="text-warm-500">
                          Tlf: {store.phone}
                        </span>
                      )}
                      <span
                        className={
                          isOpen
                            ? "font-medium text-green-700"
                            : "text-warm-400"
                        }
                      >
                        {todayLabel}: {todayHours}
                      </span>
                    </div>
                  </div>

                  {/* Distance badge */}
                  {dist !== null && (
                    <span className="flex-shrink-0 rounded-full bg-warm-100 px-3 py-1 text-xs font-medium text-warm-700">
                      {formatDistance(dist)}
                    </span>
                  )}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
