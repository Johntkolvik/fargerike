import { families } from "@/lib/color/colorData";
import { colors } from "@/lib/color/colorData";
import type { Family } from "@/lib/color/types";

export interface ProductPageData {
  slug: string;
  sku: string;
  displayName: string;
  brand: string;
  productLine: string;
  subtitle: string;
  longDescription: string;
  highlights: string[];
  familyCode: string;
  applicationArea: string;
  finishName: string;
  badge: string | null;
  specs: Family["specs"];
  variants: { volume: string; price: number; ean: string }[];
  colorOptions: { name: string; colorCode: string; hexValue: string; ncsCode: string; slug: string }[];
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getProductLine(name: string): string {
  if (name.startsWith("Lady")) return "Lady";
  if (name.startsWith("Drygolin")) return "Drygolin";
  if (name.startsWith("Jotashield")) return "Jotashield";
  if (name === "Sens") return "SENS";
  return "Jotun";
}

function getHighlights(family: Family): string[] {
  const h: string[] = [];
  if (family.badge) h.push(family.badge);
  h.push(family.shortName);
  if (family.specs.washClass !== "—") h.push(`Vaskbarhet: ${family.specs.washClass}`);
  if (family.specs.voc !== "—") h.push(`VOC ${family.specs.voc}`);
  h.push(`Dekkevne: ${family.specs.coverage}`);
  return h.slice(0, 5);
}

function getCompatibleColors(family: Family) {
  const area = family.applicationArea.toLowerCase();
  return colors
    .filter((c) => c.application === area || c.application === "both")
    .map((c) => ({
      name: c.name,
      colorCode: c.id,
      hexValue: c.hex || "#ddd",
      ncsCode: c.ncs || "",
      slug: c.id,
    }));
}

const productCache = new Map<string, ProductPageData>();

export function getAllProducts(): ProductPageData[] {
  if (productCache.size > 0) return Array.from(productCache.values());

  for (const family of families) {
    const slug = slugify(family.name);
    const product: ProductPageData = {
      slug,
      sku: family.familyCode,
      displayName: family.name,
      brand: "Jotun",
      productLine: getProductLine(family.name),
      subtitle: family.shortName,
      longDescription: family.description,
      highlights: getHighlights(family),
      familyCode: family.familyCode,
      applicationArea: family.applicationArea,
      finishName: family.finishName,
      badge: family.badge,
      specs: family.specs,
      variants: family.products.map((p) => ({
        volume: `${p.fillLevel} L`,
        price: p.priceNOK,
        ean: p.productCode,
      })),
      colorOptions: getCompatibleColors(family),
    };
    productCache.set(slug, product);
  }

  return Array.from(productCache.values());
}

export function getProductBySlug(slug: string): ProductPageData | null {
  getAllProducts();
  return productCache.get(slug) ?? null;
}
