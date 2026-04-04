"use client";

import { useMemo, useState } from "react";
import type {
  ApplicationFilter,
  TempFilter,
  LightFilter,
} from "@/lib/color/types";
import { colors, collections, families } from "@/lib/color/colorData";
import { searchColors } from "@/lib/color/colorUtils";

export function useColors() {
  const [query, setQuery] = useState("");
  const [appFilter, setAppFilter] = useState<ApplicationFilter>("all");
  const [tempFilter, setTempFilter] = useState<TempFilter>("all");
  const [lightFilter, setLightFilter] = useState<LightFilter>("all");
  const [collectionFilter, setCollectionFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    let result = colors;

    if (collectionFilter !== "all") {
      const col = collections.find((c) => c.id === collectionFilter);
      if (col) {
        const idSet = new Set(col.colorIds);
        result = result.filter((c) => idSet.has(c.id));
      }
    }
    if (appFilter !== "all") {
      result = result.filter(
        (c) => c.application === appFilter || c.application === "both"
      );
    }
    if (tempFilter !== "all") {
      result = result.filter((c) => c.tags.includes(tempFilter));
    }
    if (lightFilter !== "all") {
      result = result.filter((c) => c.tags.includes(lightFilter));
    }
    if (query) {
      result = searchColors(result, query);
    }

    return result;
  }, [query, appFilter, tempFilter, lightFilter, collectionFilter]);

  return {
    colors: filtered,
    allColors: colors,
    collections,
    families,
    query,
    setQuery,
    appFilter,
    setAppFilter,
    tempFilter,
    setTempFilter,
    lightFilter,
    setLightFilter,
    collectionFilter,
    setCollectionFilter,
  };
}

export function useColor(id: string | undefined) {
  return useMemo(() => {
    if (!id) return null;
    return colors.find((c) => c.id === id) ?? null;
  }, [id]);
}

export function useColorsByIds(ids: string[]) {
  return useMemo(() => {
    return ids.map((id) => colors.find((c) => c.id === id)).filter(Boolean) as Color[];
  }, [ids]);
}

export function useFamilies(application?: string) {
  return useMemo(() => {
    if (!application || application === "both") return families;
    return families.filter(
      (f) => f.applicationArea.toLowerCase() === application.toLowerCase()
    );
  }, [application]);
}

export function useCollectionsForColor(colorId: string) {
  return useMemo(() => {
    return collections.filter((c) => c.colorIds.includes(colorId));
  }, [colorId]);
}
