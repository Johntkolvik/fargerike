import type { StockStatus } from "./types";

export interface StockLabel {
  text: string;
  color: string;
  show: boolean;
}

export function getStockLabel(
  status: StockStatus,
  stockCount?: number,
  deliveryDays?: number,
): StockLabel {
  switch (status) {
    case "in_stock":
      return { text: "", color: "", show: false };
    case "few_left":
      return {
        text: stockCount != null ? `Kun ${stockCount} igjen` : "Få igjen",
        color: "text-amber-600",
        show: true,
      };
    case "out_of_stock":
      return {
        text: "Ikke på lager",
        color: "text-red-500",
        show: true,
      };
    case "backorder":
      return {
        text:
          deliveryDays != null
            ? `Bestillingsvare \u2013 ${deliveryDays} dagers leveringstid`
            : "Bestillingsvare",
        color: "text-yellow-600",
        show: true,
      };
  }
}
