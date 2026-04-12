import { defineType, defineField } from "sanity";

/**
 * productSlider — Horizontal slider of product family cards.
 *
 * Used in article body to showcase related product families.
 * Supports "cards" (detailed) or "compact" display mode.
 */
export const productSlider = defineType({
  name: "productSlider",
  title: "Produktkarusell",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      description: "F.eks. «Anbefalte produkter for dette prosjektet»",
    }),
    defineField({
      name: "products",
      title: "Produktfamilier",
      type: "array",
      of: [{ type: "reference", to: [{ type: "productFamily" }] }],
      validation: (rule) => rule.required().min(2).max(10),
      description: "Velg 2-10 produktfamilier",
    }),
    defineField({
      name: "displayMode",
      title: "Visningsmodus",
      type: "string",
      options: {
        list: [
          { title: "Kort (detaljert)", value: "cards" },
          { title: "Kompakt", value: "compact" },
        ],
      },
      initialValue: "cards",
    }),
  ],
  preview: {
    select: { title: "title", mode: "displayMode" },
    prepare({ title, mode }: any) {
      return {
        title: title || "Produktkarusell",
        subtitle: mode === "compact" ? "Kompakt" : "Kort",
      };
    },
  },
});
