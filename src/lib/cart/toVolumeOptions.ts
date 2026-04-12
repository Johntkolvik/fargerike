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

    // Demo: 2.7L gets a 30% campaign discount
    const isCampaign = p.fillLevel === "2.70";
    const campaignPrice = isCampaign ? Math.round(p.priceNOK * 0.7) : undefined;

    return {
      fillLevel: p.fillLevel,
      displayVolume,
      price: p.priceNOK,
      campaignPrice,
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
  variants: { volume: string; price: number; isPopular?: boolean; stock?: StockStatus; deliveryDays?: number; campaignPrice?: number }[],
): VolumeOption[] {
  return variants.map((v, i) => {
    // Demo: 2.7L gets a 30% campaign discount
    const is27L = v.volume === "2.7 L" || v.volume === "2.70";
    const campaignPrice = v.campaignPrice ?? (is27L ? Math.round(v.price * 0.7) : undefined);

    return {
      fillLevel: v.volume,
      displayVolume: v.volume.includes("L") ? v.volume : `${v.volume}`,
      price: v.price,
      campaignPrice,
      productCode: `variant-${i}`,
      stock: v.stock ?? "in_stock",
      deliveryDays: v.deliveryDays,
    };
  });
}
