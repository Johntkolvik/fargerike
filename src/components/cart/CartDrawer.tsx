"use client";

/**
 * CartDrawer — Handlekurv som skuff fra h&oslash;yre.
 *
 * Grupperer malingsprodukter etter serie + farge.
 * Viser "Blandes i butikk" for fargeblandet maling.
 * Viser lagerstatus per st&oslash;rrelse.
 */

import { useState, useEffect, useCallback } from "react";

type StockStatus = "in_stock" | "few_left" | "backorder" | "out_of_stock";

export type CartItem = {
  id: string;
  productName: string;
  colorName?: string;
  colorHex?: string;
  volume: string;
  price: number;
  quantity: number;
  stock?: StockStatus;
  deliveryDays?: number;
  isMixed?: boolean; // true = blandes i butikk
};

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

type CartGroup = {
  key: string;
  productName: string;
  colorName?: string;
  colorHex?: string;
  isMixed: boolean;
  items: CartItem[];
  subtotal: number;
};

const STOCK_LABELS: Record<StockStatus, { label: string; color: string }> = {
  in_stock: { label: "P\u00e5 lager", color: "text-emerald-600" },
  few_left: { label: "F\u00e5 igjen", color: "text-amber-600" },
  backorder: { label: "Bestillingsvare", color: "text-zinc-500" },
  out_of_stock: { label: "Utsolgt", color: "text-red-500" },
};

function groupItems(items: CartItem[]): CartGroup[] {
  const map = new Map<string, CartGroup>();
  for (const item of items) {
    const key = `${item.productName}::${item.colorName || "no-color"}`;
    if (!map.has(key)) {
      map.set(key, {
        key,
        productName: item.productName,
        colorName: item.colorName,
        colorHex: item.colorHex,
        isMixed: !!item.isMixed,
        items: [],
        subtotal: 0,
      });
    }
    const group = map.get(key)!;
    group.items.push(item);
    group.subtotal += item.price * item.quantity;
  }
  return [...map.values()];
}

export function CartDrawer({ isOpen, onOpenChange, items, onUpdateQuantity, onRemove }: Props) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsAnimating(true);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, closeDrawer]);

  const closeDrawer = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => onOpenChange(false), 250);
  }, [onOpenChange]);

  const groups = groupItems(items);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Handlekurv">
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${isAnimating ? "bg-black/40" : "bg-black/0"}`}
        onClick={closeDrawer}
      />
      <div className={`relative w-full max-w-[420px] bg-white flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        isAnimating ? "translate-x-0" : "translate-x-full"
      }`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-zinc-100">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Handlekurv</h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">{totalItems} {totalItems === 1 ? "vare" : "varer"}</p>
          </div>
          <button onClick={closeDrawer} className="rounded-full p-2 -mr-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors" aria-label="Lukk">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {/* Groups */}
        <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {groups.length === 0 ? (
            <div className="py-20 text-center px-6">
              <p className="text-sm text-zinc-400">Handlekurven er tom</p>
              <button onClick={closeDrawer} className="mt-3 text-xs font-medium text-zinc-600 underline underline-offset-2">
                Fortsett &aring; handle
              </button>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100">
              {groups.map((group) => (
                <div key={group.key} className="px-6 py-5">
                  {/* Group header: color swatch + product name */}
                  <div className="flex items-center gap-3 mb-4">
                    {group.colorHex && (
                      <span className="h-10 w-10 rounded-xl shrink-0 ring-1 ring-black/5" style={{ backgroundColor: group.colorHex }} />
                    )}
                    <div className="min-w-0 flex-1">
                      {group.colorName && (
                        <p className="text-sm font-semibold text-zinc-900">{group.colorName}</p>
                      )}
                      <p className="text-[12px] text-zinc-500">{group.productName}</p>
                    </div>
                  </div>

                  {/* Mixed indicator */}
                  {group.isMixed && (
                    <div className="flex items-center gap-2 rounded-lg bg-zinc-50 border border-zinc-200/60 px-3 py-2 mb-3">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400 shrink-0">
                        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                      </svg>
                      <p className="text-[10px] text-zinc-500">Blandes i butikk med din farge</p>
                    </div>
                  )}

                  {/* Volume lines */}
                  <div className="space-y-2">
                    {group.items.map((item) => {
                      const stock = item.stock || "in_stock";
                      const stockCfg = STOCK_LABELS[stock];
                      return (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2">
                              <span className="text-[13px] font-medium">{item.volume}</span>
                              <span className="text-[12px] text-zinc-400">{item.price.toLocaleString("nb-NO")} kr</span>
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className={`text-[10px] font-medium ${stockCfg.color}`}>{stockCfg.label}</span>
                              {item.deliveryDays != null && stock === "backorder" && (
                                <span className="text-[10px] text-zinc-400">&middot; {item.deliveryDays} dager</span>
                              )}
                            </div>
                          </div>

                          {/* Quantity */}
                          <div className="flex items-center gap-0.5 rounded-lg border border-zinc-200/60">
                            <button
                              onClick={() => item.quantity <= 1 ? onRemove(item.id) : onUpdateQuantity(item.id, item.quantity - 1)}
                              className="flex h-7 w-7 items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors text-xs"
                            >
                              {item.quantity <= 1 ? (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-2 14H7L5 6" /><path d="M10 11v6M14 11v6" /></svg>
                              ) : "\u2212"}
                            </button>
                            <span className="min-w-[1.5rem] text-center text-[12px] font-semibold tabular-nums">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="flex h-7 w-7 items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors text-xs"
                            >+</button>
                          </div>

                          {/* Line total */}
                          <span className="text-[13px] font-semibold tabular-nums w-16 text-right">
                            {(item.price * item.quantity).toLocaleString("nb-NO")} kr
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Group subtotal */}
                  {group.items.length > 1 && (
                    <div className="mt-3 pt-2 border-t border-zinc-100 flex justify-end">
                      <span className="text-[11px] text-zinc-400">Delsum: <span className="font-semibold text-zinc-700">{group.subtotal.toLocaleString("nb-NO")} kr</span></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {groups.length > 0 && (
          <div className="border-t border-zinc-100 px-6 py-5 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-zinc-500">Totalt</span>
              <span className="text-xl font-bold tracking-tight">{total.toLocaleString("nb-NO")} kr</span>
            </div>
            <button className="w-full rounded-2xl bg-zinc-900 py-4 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors active:scale-[0.98]">
              G&aring; til kassen
            </button>
            <button onClick={closeDrawer} className="w-full text-center text-[12px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
              Fortsett &aring; handle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
