"use client";

import { useEffect, useCallback, useMemo } from "react";
import { useCart, type CartItem } from "@/context/CartContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Group structure: family -> color -> volume rows */
interface ColorGroup {
  colorId: string;
  colorName: string;
  colorHex: string;
  items: CartItem[];
}

interface FamilyGroup {
  familyName: string;
  colors: ColorGroup[];
}

function groupItems(items: CartItem[]): FamilyGroup[] {
  const familyMap = new Map<string, Map<string, CartItem[]>>();

  for (const item of items) {
    if (!familyMap.has(item.familyName)) {
      familyMap.set(item.familyName, new Map());
    }
    const colorMap = familyMap.get(item.familyName)!;
    const colorKey = `${item.colorId}-${item.colorHex}`;
    if (!colorMap.has(colorKey)) {
      colorMap.set(colorKey, []);
    }
    colorMap.get(colorKey)!.push(item);
  }

  const groups: FamilyGroup[] = [];
  for (const [familyName, colorMap] of familyMap) {
    const colors: ColorGroup[] = [];
    for (const [, colorItems] of colorMap) {
      const first = colorItems[0];
      colors.push({
        colorId: first.colorId,
        colorName: first.colorName,
        colorHex: first.colorHex,
        items: colorItems,
      });
    }
    groups.push({ familyName, colors });
  }

  return groups;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQuantity, clear, totalItems, totalPrice } = useCart();

  const groups = useMemo(() => groupItems(items), [items]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Handlekurv"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-warm-50 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-warm-200 px-6 py-4">
          <h2 className="text-lg font-bold text-warm-900">
            Handlekurv
            {totalItems > 0 && (
              <span className="ml-2 text-sm font-normal text-warm-400">
                ({totalItems} {totalItems === 1 ? "produkt" : "produkter"})
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="Lukk handlekurv"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-100 text-warm-600 hover:bg-warm-200 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <svg className="h-12 w-12 text-warm-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <div className="text-sm font-medium text-warm-900">Handlekurven er tom</div>
              <div className="mt-1 text-xs text-warm-400">Legg til maling fra en kulørside</div>
            </div>
          ) : (
            <div className="space-y-6">
              {groups.map((family) => (
                <div key={family.familyName}>
                  {/* Family heading */}
                  <h3 className="text-xs font-bold uppercase tracking-wider text-warm-500 mb-3">
                    {family.familyName}
                  </h3>

                  <div className="space-y-3">
                    {family.colors.map((color) => (
                      <div
                        key={`${family.familyName}-${color.colorId}`}
                        className="rounded-xl border border-warm-200 bg-white p-4"
                      >
                        {/* Color header row */}
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="h-10 w-10 shrink-0 rounded-lg ring-1 ring-warm-200"
                            style={{ backgroundColor: color.colorHex }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-warm-900 truncate">
                              {color.colorName}
                            </div>
                          </div>
                        </div>

                        {/* Volume rows */}
                        <div className="space-y-2 border-t border-warm-100 pt-3">
                          {color.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-2">
                              {/* Volume label */}
                              <span className="text-xs text-warm-500 w-14 shrink-0">
                                {item.fillLevel} L
                              </span>

                              {/* Quantity controls */}
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  aria-label={`Reduser antall ${item.colorName} ${item.fillLevel}L`}
                                  className="flex h-7 w-7 items-center justify-center rounded-md border border-warm-200 text-xs text-warm-600 hover:bg-warm-100 transition-colors"
                                >
                                  -
                                </button>
                                <span
                                  className="w-6 text-center text-xs font-semibold text-warm-900"
                                  aria-live="polite"
                                  aria-label={`Antall: ${item.quantity}`}
                                >
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  aria-label={`Ok antall ${item.colorName} ${item.fillLevel}L`}
                                  className="flex h-7 w-7 items-center justify-center rounded-md border border-warm-200 text-xs text-warm-600 hover:bg-warm-100 transition-colors"
                                >
                                  +
                                </button>
                              </div>

                              <div className="flex-1" />

                              {/* Line total */}
                              <span className="text-sm font-semibold text-warm-900 tabular-nums">
                                {(item.quantity * item.priceNOK).toLocaleString("nb-NO")},-
                              </span>

                              {/* Remove */}
                              <button
                                onClick={() => removeItem(item.id)}
                                className="shrink-0 ml-1 text-warm-300 hover:text-red-500 transition-colors"
                                title="Fjern"
                                aria-label={`Fjern ${item.colorName} ${item.fillLevel}L fra handlekurv`}
                              >
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-warm-200 px-6 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-warm-500">Totalt</span>
              <span className="text-2xl font-bold text-warm-900">
                {totalPrice.toLocaleString("nb-NO")},-
              </span>
            </div>
            <button aria-label="Ga til kassen" className="w-full rounded-xl bg-warm-900 py-4 text-sm font-semibold text-warm-50 transition-colors hover:bg-warm-800">
              Ga til kassen
            </button>
            <button
              onClick={clear}
              className="w-full text-center text-xs text-warm-400 hover:text-warm-600 transition-colors"
            >
              Tom handlekurv
            </button>
          </div>
        )}
      </div>
    </>
  );
}
