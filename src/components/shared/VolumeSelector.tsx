"use client";

import { useEffect, useRef } from "react";
import type { VolumeOption } from "@/lib/cart/types";
import { getStockLabel } from "@/lib/cart/stockStatus";
import { useVolumeSelection, type VolumeSelectionItem } from "@/hooks/useVolumeSelection";

export interface VolumeSelectorProps {
  options: VolumeOption[];
  variant?: "full" | "compact";
  onAdd?: (items: VolumeSelectionItem[]) => void;
  onChange?: (items: VolumeSelectionItem[], totalPrice: number, totalLiters: number) => void;
  colorName?: string;
  coverage?: string;
}

function CampaignBadge({ percent }: { percent: number }) {
  return (
    <span className="inline-flex items-center rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-bold tracking-tight text-red-600 ring-1 ring-inset ring-red-100">
      &minus;{percent}%
    </span>
  );
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

  // Calculate original total (without campaigns) to show savings
  const totalWithoutCampaign = items.reduce(
    (sum, i) => sum + i.option.price * i.quantity, 0,
  );
  const totalSaved = totalWithoutCampaign - totalPrice;

  return (
    <div className="select-none">
      {/* ── Volume rows ── */}
      <div className={isCompact ? "space-y-1.5" : "space-y-2"}>
        {options.map((opt) => {
          const qty = getQuantity(opt.fillLevel);
          const isDisabled = opt.stock === "out_of_stock";
          const stockLabel = getStockLabel(opt.stock, opt.stockCount, opt.deliveryDays);
          const hasCampaign = opt.campaignPrice != null && opt.campaignPrice < opt.price;
          const effectivePrice = hasCampaign ? opt.campaignPrice! : opt.price;
          const discountPercent = hasCampaign
            ? Math.round((1 - opt.campaignPrice! / opt.price) * 100)
            : 0;

          return (
            <div
              key={opt.productCode}
              className={`
                grid items-center rounded-xl border transition-colors duration-150
                ${isCompact
                  ? "grid-cols-[1fr_auto] gap-x-3 px-3.5 py-3"
                  : "grid-cols-[1fr_5.5rem_auto] gap-x-2 pl-4 pr-3 py-3"
                }
                ${isDisabled
                  ? "border-warm-100 bg-warm-50/60"
                  : hasCampaign
                    ? qty > 0
                      ? "border-red-200 bg-red-50/30"
                      : "border-red-100/80 bg-red-50/20"
                    : qty > 0
                      ? "border-warm-300 bg-white"
                      : "border-warm-200/70 bg-white"
                }
              `}
            >
              {/* ── Left: volume + price + campaign + stock ── */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold tabular-nums ${isDisabled ? "text-warm-300" : "text-warm-900"} ${isCompact ? "text-[14px]" : "text-[15px]"}`}>
                    {opt.displayVolume}
                  </span>
                  {hasCampaign && <CampaignBadge percent={discountPercent} />}
                </div>
                <div className="mt-0.5 flex items-baseline gap-1.5">
                  {hasCampaign ? (
                    <>
                      <span className="text-xs font-semibold tabular-nums text-red-600">
                        {effectivePrice.toLocaleString("nb-NO")},-
                      </span>
                      <span className="text-[11px] tabular-nums text-warm-300 line-through">
                        {opt.price.toLocaleString("nb-NO")},-
                      </span>
                    </>
                  ) : (
                    <span className={`text-xs tabular-nums ${isDisabled ? "text-warm-200" : "text-warm-400"}`}>
                      {opt.price.toLocaleString("nb-NO")},-
                    </span>
                  )}
                </div>
                {stockLabel.show && (
                  <p className={`mt-0.5 text-[11px] font-medium leading-tight ${stockLabel.color}`}>
                    {stockLabel.text}
                  </p>
                )}
              </div>

              {/* ── Center: row subtotal (full variant only) ── */}
              {!isCompact && (
                <div className="text-right">
                  <span className={`text-sm font-semibold tabular-nums ${
                    qty > 0
                      ? hasCampaign ? "text-red-600" : "text-warm-900"
                      : "text-transparent"
                  }`}>
                    {qty > 0 ? `${(qty * effectivePrice).toLocaleString("nb-NO")},-` : "0"}
                  </span>
                </div>
              )}

              {/* ── Right: stepper ── */}
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => adjustQuantity(opt.fillLevel, -1)}
                  disabled={qty <= 0 || isDisabled}
                  aria-label={`Reduser ${opt.displayVolume}`}
                  className={`
                    flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-medium transition-colors
                    ${qty > 0
                      ? "bg-warm-100 text-warm-700 hover:bg-warm-200 active:bg-warm-300"
                      : "bg-transparent text-warm-200 cursor-default"
                    }
                  `}
                >
                  −
                </button>
                <span className={`w-7 shrink-0 text-center text-sm font-semibold tabular-nums ${
                  isDisabled ? "text-warm-200" : qty > 0 ? "text-warm-900" : "text-warm-300"
                }`}>
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => adjustQuantity(opt.fillLevel, 1)}
                  disabled={isDisabled || qty >= 20}
                  aria-label={`Øk ${opt.displayVolume}`}
                  className={`
                    flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-medium transition-colors
                    ${isDisabled
                      ? "bg-transparent text-warm-200 cursor-not-allowed"
                      : "bg-warm-100 text-warm-700 hover:bg-warm-200 active:bg-warm-300"
                    }
                  `}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Blanding note ── */}
      {!isCompact && colorName && (
        <div className="mt-3 flex items-start gap-2.5 rounded-lg bg-warm-50 px-3.5 py-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 shrink-0 text-warm-400">
            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
          </svg>
          <p className="text-[11px] leading-relaxed text-warm-500">
            <span className="font-medium text-warm-700">{colorName}</span> blandes i butikk.
            Hentes p&aring; din n&aelig;rmeste Fargerike-butikk.
          </p>
        </div>
      )}

      {/* ── Footer: summary + CTA ── */}
      <div className={`border-t border-warm-200/60 ${isCompact ? "mt-3 pt-3" : "mt-4 pt-4"}`}>
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            {canAdd ? (
              <>
                <p className="text-[11px] font-medium text-warm-400">
                  {totalItems} {totalItems === 1 ? "spann" : "spann"} &middot; {summary}
                </p>
                {coverage && totalLiters > 0 && (
                  <p className="mt-0.5 text-[11px] text-warm-300">
                    Rekker ca. {Math.round(totalLiters * 8)}&ndash;{Math.round(totalLiters * 10)} m&sup2;
                  </p>
                )}
                {totalSaved > 0 && (
                  <p className="mt-0.5 text-[11px] font-medium text-red-500">
                    Du sparer {totalSaved.toLocaleString("nb-NO")},-
                  </p>
                )}
              </>
            ) : (
              <p className="text-[11px] text-warm-300">Velg antall for &aring; legge i handlekurv</p>
            )}
          </div>
          <p className={`shrink-0 text-right tabular-nums ${isCompact ? "text-xl" : "text-2xl"} font-bold ${
            canAdd ? "text-warm-900" : "text-warm-200"
          }`}>
            {canAdd ? `${totalPrice.toLocaleString("nb-NO")},-` : "0,-"}
          </p>
        </div>

        {onAdd && (
          <button
            type="button"
            disabled={!canAdd}
            onClick={() => canAdd && onAdd(items)}
            className={`
              mt-3 w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-150
              ${canAdd
                ? "bg-warm-900 text-warm-50 hover:bg-warm-800 active:scale-[0.99]"
                : "bg-warm-100 text-warm-300 cursor-not-allowed"
              }
            `}
          >
            Legg i handlekurv
          </button>
        )}
      </div>
    </div>
  );
}
