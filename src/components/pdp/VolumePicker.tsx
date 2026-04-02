"use client";

import { useState, useEffect, useRef } from "react";

type StockStatus = "in_stock" | "few_left" | "backorder" | "out_of_stock";

type Variant = {
  volume: string;
  price: number;
  isPopular?: boolean;
  stock?: StockStatus;
  deliveryDays?: number;
};

export type VariantQuantity = {
  variant: Variant;
  quantity: number;
};

type Props = {
  variants: Variant[];
  coverage?: string;
  colorName?: string;
  onChange?: (selections: VariantQuantity[], totalPrice: number, totalLiters: number) => void;
};

const STOCK_CONFIG: Record<StockStatus, { label: string; color: string; icon: string }> = {
  in_stock: { label: "P\u00e5 lager", color: "text-emerald-600", icon: "\u2713" },
  few_left: { label: "F\u00e5 igjen", color: "text-amber-600", icon: "!" },
  backorder: { label: "Bestillingsvare", color: "text-zinc-500", icon: "\u2192" },
  out_of_stock: { label: "Utsolgt", color: "text-red-500", icon: "\u2715" },
};

export function VolumePicker({ variants, coverage, colorName, onChange }: Props) {
  const [quantities, setQuantities] = useState<number[]>(
    () => variants.map(() => 0),
  );
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const totalPrice = variants.reduce((sum, v, i) => sum + v.price * quantities[i], 0);
  const totalLiters = variants.reduce((sum, v, i) => sum + parseFloat(v.volume) * quantities[i], 0);
  const totalItems = quantities.reduce((sum, q) => sum + q, 0);

  useEffect(() => {
    const selections = variants
      .map((v, i) => ({ variant: v, quantity: quantities[i] }))
      .filter((s) => s.quantity > 0);
    onChangeRef.current?.(selections, totalPrice, totalLiters);
  }, [quantities, variants, totalPrice, totalLiters]);

  const update = (index: number, delta: number) => {
    const stock = variants[index].stock || "in_stock";
    if (stock === "out_of_stock" && delta > 0) return;
    setQuantities((prev) => {
      const next = [...prev];
      next[index] = Math.max(0, Math.min(20, next[index] + delta));
      return next;
    });
  };

  return (
    <div>
      <p className="mb-3 text-xs font-medium text-zinc-700 uppercase tracking-wider">Velg st&oslash;rrelse</p>

      <div className="space-y-2">
        {variants.map((v, i) => {
          const stock = v.stock || "in_stock";
          const stockCfg = STOCK_CONFIG[stock];
          const isDisabled = stock === "out_of_stock";
          const isActive = quantities[i] > 0;

          return (
            <div
              key={i}
              className={`flex items-center justify-between rounded-xl border px-4 py-3.5 transition-all ${
                isDisabled
                  ? "border-zinc-100 bg-zinc-50 opacity-60"
                  : isActive
                  ? "border-zinc-900 bg-zinc-50"
                  : "border-zinc-200/70 bg-zinc-50/50 hover:border-zinc-300"
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{v.volume}</span>
                  {v.isPopular && (
                    <span className="rounded-full bg-amber-50 border border-amber-200/60 px-2 py-0.5 text-[9px] font-semibold text-amber-700">
                      Popul&aelig;r
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm text-zinc-500">
                    {v.price.toLocaleString("nb-NO")} kr
                    <span className="ml-1 text-xs text-zinc-400">
                      ({Math.round(v.price / parseFloat(v.volume))} kr/L)
                    </span>
                  </span>
                </div>
                {/* Stock status */}
                <div className={`flex items-center gap-1 mt-1 text-[11px] font-medium ${stockCfg.color}`}>
                  <span className="text-[10px]">{stockCfg.icon}</span>
                  {stockCfg.label}
                  {v.deliveryDays && stock === "backorder" && (
                    <span className="text-zinc-400 font-normal ml-0.5">&middot; {v.deliveryDays} dager</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => update(i, -1)}
                  disabled={quantities[i] <= 0}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-200 disabled:text-zinc-300 disabled:cursor-not-allowed transition-colors"
                  aria-label={`Reduser ${v.volume}`}
                >
                  &minus;
                </button>
                <span className="min-w-[2rem] text-center text-sm font-semibold tabular-nums">
                  {quantities[i]}
                </span>
                <button
                  type="button"
                  onClick={() => update(i, 1)}
                  disabled={isDisabled || quantities[i] >= 20}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-200 disabled:text-zinc-300 disabled:cursor-not-allowed transition-colors"
                  aria-label={`&Oslash;k ${v.volume}`}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Blanding-info */}
      {colorName && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-zinc-50 border border-zinc-200/60 px-3.5 py-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400 shrink-0">
            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
          </svg>
          <p className="text-[11px] text-zinc-500 leading-relaxed">
            <span className="font-medium text-zinc-700">{colorName}</span> blandes i butikk med din maling. Hentes p&aring; din n&aelig;rmeste Fargerike-butikk.
          </p>
        </div>
      )}

      {/* Summary */}
      {totalItems > 0 && (
        <div className="mt-4 space-y-1">
          {coverage && (
            <p className="text-xs text-zinc-500">
              Dekning: {coverage}.{" "}
              {totalLiters > 0 && (
                <span>
                  {totalLiters.toFixed(1).replace(".0", "")} L = ca.{" "}
                  {Math.round(totalLiters * 8)}&ndash;{Math.round(totalLiters * 10)} m&sup2;
                </span>
              )}
            </p>
          )}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">
              {totalPrice.toLocaleString("nb-NO")} kr
            </span>
            {totalItems > 1 && (
              <span className="text-sm text-zinc-500">
                ({quantities
                  .map((q, i) => (q > 0 ? `${q} \u00d7 ${variants[i].volume}` : null))
                  .filter(Boolean)
                  .join(" + ")})
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
