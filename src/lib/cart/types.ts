export type StockStatus = "in_stock" | "few_left" | "out_of_stock" | "backorder";

export interface VolumeOption {
  fillLevel: string;      // "0.68" | "2.70" | "9.00"
  displayVolume: string;  // "0.68 L" | "2.7 L" | "9 L"
  price: number;
  campaignPrice?: number; // Discounted price — shows original struck through
  productCode: string;
  stock: StockStatus;
  stockCount?: number;    // For "few_left" — show "Kun X igjen"
  deliveryDays?: number;  // For "backorder"
}
