import type { VolumeOption, StockStatus } from "./types";
import type { Product } from "@/lib/color/types";

/**
 * Convert a Family's products array (from colors.json) to VolumeOption[].
 * Used by ColorDetail and ColorPicker.
 */
export function familyProductsToVolumeOptions(products: Product[]): VolumeOption[] {
  return products.map((p) => {
    const liters = parseFloat(p.fillLevel);
    const displayVolume =
      liters < 1
        ? `${p.fillLevel} L`
        : `${parseFloat(liters.toFixed(1))} L`;

    return {
      fillLevel: p.fillLevel,
      displayVolume,
      price: p.priceNOK,
      productCode: p.productCode,
      stock: "in_stock" as StockStatus,
    };
  });
}

/**
 * Convert PDP variant objects (from Sanity/product data) to VolumeOption[].
 * Used by ProductHeroClient and ProductV2Hero.
 */
export function pdpVariantsToVolumeOptions(
  variants: { volume: string; price: number; isPopular?: boolean; stock?: StockStatus; deliveryDays?: number }[],
): VolumeOption[] {
  return variants.map((v, i) => {
    const liters = parseFloat(v.volume);
    return {
      fillLevel: v.volume,
      displayVolume: v.volume.includes("L") ? v.volume : `${v.volume}`,
      price: v.price,
      productCode: `variant-${i}`,
      stock: v.stock ?? "in_stock",
      deliveryDays: v.deliveryDays,
    };
  });
}
