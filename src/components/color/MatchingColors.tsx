"use client";

import Link from "next/link";
import type { Color } from "@/lib/color/types";

interface Props {
  colors: Color[];
  label?: string;
}

export default function MatchingColors({ colors, label = "Harmonerende kulører" }: Props) {
  if (colors.length === 0) return null;

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold text-warm-900">{label}</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {colors.map((c) => (
          <Link
            key={c.id}
            href={`/farge/${c.id}`}
            className="group block"
          >
            <div
              className="aspect-[4/3] rounded-xl transition-all group-hover:shadow-lg group-hover:scale-[1.02]"
              style={{ backgroundColor: c.hex ?? "#ddd" }}
            />
            <div className="mt-2">
              <div className="text-sm font-semibold text-warm-900">{c.name}</div>
              <div className="text-xs text-warm-400 font-mono">{c.ncs || c.id}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
