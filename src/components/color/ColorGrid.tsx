"use client";

import Link from "next/link";
import Image from "next/image";
import type { Color } from "@/lib/color/types";
import { getContrastColor } from "@/lib/color/colorUtils";
import FavoriteButton from "./FavoriteButton";

export type ViewMode = "swatch" | "photo";

interface Props {
  colors: Color[];
  onSelect?: (color: Color) => void;
  linkTo?: (color: Color) => string;
  compact?: boolean;
  viewMode?: ViewMode;
}

export default function ColorGrid({ colors, onSelect, linkTo, compact, viewMode = "swatch" }: Props) {
  if (colors.length === 0) {
    return (
      <p className="py-16 text-center text-warm-400">
        Ingen kulører matcher filtrene dine.
      </p>
    );
  }

  const isPhoto = viewMode === "photo" && !compact;

  const visibleColors = isPhoto
    ? colors.filter((c) => c.imagesInterior.length > 0 || c.imagesExterior.length > 0)
    : colors;

  return (
    <div
      className={`grid ${
        compact
          ? "grid-cols-5 gap-1.5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-11"
          : isPhoto
          ? "grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      }`}
    >
      {visibleColors.map((c) => {
        const contrast = getContrastColor(c.hex);
        const firstImage = c.imagesInterior[0]
          ? `/images/jcci/${c.imagesInterior[0]}`
          : c.imagesExterior[0]
          ? `/images/jcce/${c.imagesExterior[0]}`
          : null;

        const content = isPhoto ? (
          <div className="group relative overflow-hidden rounded-2xl bg-warm-200 transition-all hover:shadow-lg">
            <Image
              src={firstImage!}
              alt={c.name}
              width={400}
              height={300}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end">
              <div
                className="h-14 w-14 shrink-0 sm:h-16 sm:w-16"
                style={{ backgroundColor: c.hex ?? "#ddd" }}
              />
              <div className="flex-1 bg-white/90 backdrop-blur-sm px-3 py-2">
                <div className="text-sm font-semibold text-warm-900 truncate">{c.name}</div>
                <div className="text-xs text-warm-500 font-mono">{c.ncs || c.hex}</div>
              </div>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <FavoriteButton colorId={c.id} size="sm" />
            </div>
          </div>
        ) : (
          <div
            className={`group relative overflow-hidden rounded-xl transition-all hover:shadow-lg hover:scale-[1.02] ${
              compact ? "aspect-square rounded-lg" : "aspect-[4/5]"
            }`}
            style={{ backgroundColor: c.hex ?? "#ddd" }}
          >
            {!compact && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <FavoriteButton colorId={c.id} size="sm" />
              </div>
            )}
            <div
              className={`absolute inset-x-0 bottom-0 p-3 ${compact ? "p-1.5" : "p-3"}`}
              style={{ color: contrast }}
            >
              {!compact && (
                <>
                  <div className="text-[11px] uppercase tracking-wider opacity-50 font-medium">
                    {c.ncs || c.id}
                  </div>
                  <div className="text-sm font-semibold leading-tight truncate">
                    {c.name}
                  </div>
                </>
              )}
              {compact && (
                <div className="text-[9px] font-medium leading-tight truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {c.name}
                </div>
              )}
            </div>
          </div>
        );

        if (linkTo) {
          return (
            <Link key={c.id} href={linkTo(c)} aria-label={`Se farge ${c.name}`} className="block">
              {content}
            </Link>
          );
        }
        if (onSelect) {
          return (
            <button key={c.id} onClick={() => onSelect(c)} aria-label={`Velg farge ${c.name}`} className="block w-full text-left cursor-pointer">
              {content}
            </button>
          );
        }
        return <div key={c.id}>{content}</div>;
      })}
    </div>
  );
}
