"use client";

import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { useColorsByIds } from "@/hooks/useColors";
import ColorGrid from "./ColorGrid";

export default function Favorites() {
  const { favorites } = useFavorites();
  const colors = useColorsByIds(favorites);

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
          Mine favoritter.
        </h1>
        <p className="mt-3 max-w-lg text-lg text-warm-500">
          {favorites.length === 0
            ? "Du har ikke lagret noen kulører ennå."
            : `${favorites.length} lagrede kulører.`}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-warm-300 bg-white p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-warm-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <div className="text-sm font-medium text-warm-900">Ingen favoritter ennå</div>
          <p className="mt-1 text-xs text-warm-400">
            Trykk på hjertet på en kulør for å lagre den her.
          </p>
          <Link
            href="/farge"
            className="mt-4 inline-block rounded-full bg-warm-900 px-6 py-2.5 text-sm font-medium text-warm-50 transition-colors hover:bg-warm-800"
          >
            Utforsk kulører
          </Link>
        </div>
      ) : (
        <ColorGrid colors={colors} linkTo={(c) => `/farge/${c.id}`} />
      )}
    </div>
  );
}
