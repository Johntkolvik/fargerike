"use client";

import { useEffect, useRef } from "react";
import type { VolumeOption } from "@/lib/cart/types";
import { getStockLabel } from "@/lib/cart/stockStatus";
import { useVolumeSelection, type VolumeSelectionItem } from "@/hooks/useVolumeSelection";

export interface VolumeSelectorProps {
  options: VolumeOption[];
  /** "full" for PDP, "compact" for color detail/picker sidebars */
  variant?: "full" | "compact";
  /** Called when user clicks "add to cart" */
  onAdd?: (items: VolumeSelectionItem[]) => void;
  /** Optional onChange to sync parent state */
  onChange?: (items: VolumeSelectionItem[], totalPrice: number, totalLiters: number) => void;
  /** Color name to display in the blanding info (full variant only) */
  colorName?: string;
  /** Coverage string like "8–10 m²/L" */
  coverage?: string;
}

export function VolumeSelector({
  options,
  variant = "full",
  onAdd,
  onChange,
  colorName,
  coverage,
}: VolumeSelectorProps) {
  const {
    getQuantity,
    adjustQuantity,
    totalLiters,
    totalPrice,
    summary,
    canAdd,
    items,
    totalItems,
  } = useVolumeSelection(options);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    onChangeRef.current?.(items, totalPrice, totalLiters);
  }, [items, totalPrice, totalLiters]);

  const isCompact = variant === "compact";

  return (
    <div>
      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-warm-400">
        Velg st&oslash;rrelse og antall
      </p>

      <div className="space-y-2">
        {options.map((opt) => {
          const qty = getQuantity(opt.fillLevel);
          const isDisabled = opt.stock === "out_of_stock";
          const isActive = qty > 0;
          const stockLabel = getStockLabel(opt.stock, opt.stockCount, opt.deliveryDays);
          const perLiter = Math.round(opt.price / parseFloat(opt.fillLevel));

          return (
            <div
              key={opt.productCode}
              className={`flex items-center justify-between rounded-xl border px-4 ${
                isCompact ? "py-3" : "py-3.5"
              } transition-all ${
                isDisabled
                  ? "border-warm-100 bg-warm-50 opacity-60"
                  : isActive
                    ? "border-warm-900 bg-white shadow-sm"
                    : "border-warm-200 bg-white hover:border-warm-400"
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-warm-900 ${isCompact ? "text-sm" : "text-sm"}`}>
                    {opt.displayVolume}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-xs text-warm-400">
                    {opt.price.toLocaleString("nb-NO")},-
                    {!isCompact && (
                      <span className="ml-1 text-warm-300">
                        ({perLiter} kr/L)
                      </span>
                    )}
                  </span>
                </div>
                {stockLabel.show && (
                  <div className={`mt-1 text-[11px] font-medium ${stockLabel.color}`}>
                    {stockLabel.text}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => adjustQuantity(opt.fillLevel, -1)}
                  disabled={qty <= 0}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-warm-300 text-sm text-warm-600 transition-colors hover:bg-warm-100 disabled:opacity-25 disabled:cursor-not-allowed"
                  aria-label={`Reduser ${opt.displayVolume}`}
                >
                  &minus;
                </button>
                <span className="w-7 text-center text-sm font-semibold tabular-nums text-warm-900">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => adjustQuantity(opt.fillLevel, 1)}
                  disabled={isDisabled || qty >= 20}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-warm-300 text-sm text-warm-600 transition-colors hover:bg-warm-100 disabled:opacity-25 disabled:cursor-not-allowed"
                  aria-label={`&Oslash;k ${opt.displayVolume}`}
                >
                  +
                </button>
                {qty > 0 && !isCompact && (
                  <div className="w-20 text-right text-sm font-semibold text-warm-900">
                    {(qty * opt.price).toLocaleString("nb-NO")},-
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Blanding-info (full variant only) */}
      {!isCompact && colorName && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-warm-200 bg-warm-50 px-3.5 py-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-warm-400">
            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
          </svg>
          <p className="text-[11px] leading-relaxed text-warm-500">
            <span className="font-medium text-warm-700">{colorName}</span> blandes i butikk med din maling. Hentes p&aring; din n&aelig;rmeste Fargerike-butikk.
          </p>
        </div>
      )}

      {/* Summary */}
      {canAdd && (
        <div className="mt-4 border-t border-warm-200 pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-warm-500">
              {totalItems} spann &middot; {summary}
            </span>
            <span className="text-2xl font-bold text-warm-900">
              {totalPrice.toLocaleString("nb-NO")},-
            </span>
          </div>
          {coverage && (
            <p className="mb-3 text-xs text-warm-400">
              Dekning: {coverage}.{" "}
              {totalLiters > 0 && (
                <span>
                  {totalLiters.toFixed(1).replace(".0", "")} L = ca.{" "}
                  {Math.round(totalLiters * 8)}&ndash;{Math.round(totalLiters * 10)} m&sup2;
                </span>
              )}
            </p>
          )}
          {onAdd && (
            <button
              type="button"
              onClick={() => onAdd(items)}
              className="w-full rounded-xl bg-warm-900 py-4 text-sm font-semibold text-warm-50 transition-colors hover:bg-warm-800"
            >
              Legg i handlekurv
            </button>
          )}
        </div>
      )}

      {!canAdd && (
        <div className="mt-4 border-t border-warm-200 pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-warm-500">Ingen valgt</span>
            <span className="text-2xl font-bold text-warm-300">0,-</span>
          </div>
          {onAdd && (
            <button
              type="button"
              disabled
              className="w-full rounded-xl bg-warm-200 py-4 text-sm font-semibold text-warm-400 cursor-not-allowed"
            >
              Legg i handlekurv
            </button>
          )}
        </div>
      )}
    </div>
  );
}
