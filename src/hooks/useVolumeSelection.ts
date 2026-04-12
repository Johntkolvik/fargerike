import { useState, useMemo, useCallback } from "react";
import type { VolumeOption } from "@/lib/cart/types";

const MAX_QUANTITY = 20;

export interface VolumeSelectionItem {
  option: VolumeOption;
  quantity: number;
}

export interface VolumeSelectionResult {
  /** Current quantity per fillLevel */
  quantities: Map<string, number>;
  /** Get quantity for a specific fillLevel */
  getQuantity: (fillLevel: string) => number;
  /** Adjust quantity by delta (+1 / -1). Blocked on out_of_stock increment. */
  adjustQuantity: (fillLevel: string, delta: number) => void;
  /** Total liters across all selected volumes */
  totalLiters: number;
  /** Total price across all selected volumes */
  totalPrice: number;
  /** Human-readable summary, e.g. "2 x 2.7 L + 1 x 9 L = 14.4 L" */
  summary: string;
  /** Whether there are any items selected */
  canAdd: boolean;
  /** Items with quantity > 0 */
  items: VolumeSelectionItem[];
  /** Total number of units */
  totalItems: number;
}

export function useVolumeSelection(options: VolumeOption[]): VolumeSelectionResult {
  const [quantities, setQuantities] = useState<Map<string, number>>(() => new Map());

  const adjustQuantity = useCallback(
    (fillLevel: string, delta: number) => {
      const option = options.find((o) => o.fillLevel === fillLevel);
      if (!option) return;
      // Block increment on out_of_stock
      if (option.stock === "out_of_stock" && delta > 0) return;

      setQuantities((prev) => {
        const next = new Map(prev);
        const current = next.get(fillLevel) ?? 0;
        const updated = Math.max(0, Math.min(MAX_QUANTITY, current + delta));
        if (updated === 0) {
          next.delete(fillLevel);
        } else {
          next.set(fillLevel, updated);
        }
        return next;
      });
    },
    [options],
  );

  const getQuantity = useCallback(
    (fillLevel: string) => quantities.get(fillLevel) ?? 0,
    [quantities],
  );

  const items = useMemo(
    () =>
      options
        .map((option) => ({
          option,
          quantity: quantities.get(option.fillLevel) ?? 0,
        }))
        .filter((item) => item.quantity > 0),
    [options, quantities],
  );

  const totalLiters = useMemo(
    () => items.reduce((sum, i) => sum + parseFloat(i.option.fillLevel) * i.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + (i.option.campaignPrice ?? i.option.price) * i.quantity, 0),
    [items],
  );

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const summary = useMemo(() => {
    if (items.length === 0) return "";
    const parts = items.map(
      (i) => `${i.quantity} \u00d7 ${i.option.displayVolume}`,
    );
    const litersStr = totalLiters % 1 === 0
      ? totalLiters.toFixed(0)
      : totalLiters.toFixed(1);
    return `${parts.join(" + ")} = ${litersStr} L`;
  }, [items, totalLiters]);

  const canAdd = items.length > 0;

  return {
    quantities,
    getQuantity,
    adjustQuantity,
    totalLiters,
    totalPrice,
    summary,
    canAdd,
    items,
    totalItems,
  };
}
