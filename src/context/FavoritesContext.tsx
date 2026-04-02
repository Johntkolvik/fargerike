"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface FavoritesContextType {
  favorites: string[];
  toggle: (colorId: string) => void;
  isFavorite: (colorId: string) => boolean;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = "mg-color-favorites";

function loadFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function toggle(colorId: string) {
    setFavorites((prev) =>
      prev.includes(colorId)
        ? prev.filter((id) => id !== colorId)
        : [...prev, colorId]
    );
  }

  function isFavorite(colorId: string) {
    return favorites.includes(colorId);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite, count: favorites.length }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
