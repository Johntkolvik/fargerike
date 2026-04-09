import { client } from "./client";
import { ALL_PRODUCT_ATTRIBUTES_QUERY } from "./queries";
import type { AttributeMap } from "@/components/pdp/SpecGrid";

/**
 * Fetch all productAttribute documents from Sanity and return them
 * as a code-keyed map. Only ~5-6 documents exist, so fetching all
 * at once is efficient. This runs server-side only.
 */
export async function getAllProductAttributes(): Promise<AttributeMap> {
  try {
    const docs = await client.fetch(ALL_PRODUCT_ATTRIBUTES_QUERY);
    const map: AttributeMap = {};
    for (const doc of docs ?? []) {
      if (doc.code) {
        map[doc.code] = {
          name: doc.name,
          shortDescription: doc.shortDescription,
          whyItMatters: doc.whyItMatters,
          regulatoryContext: doc.regulatoryContext,
          unit: doc.unit,
          scale: doc.scale,
        };
      }
    }
    return map;
  } catch {
    return {};
  }
}
