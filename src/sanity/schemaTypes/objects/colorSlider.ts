import { defineType, defineField } from "sanity";

/**
 * colorSlider — Horizontal slider of color swatches.
 *
 * Used in article body to showcase color palettes.
 * Links each swatch to /farge/{slug}.
 */
export const colorSlider = defineType({
  name: "colorSlider",
  title: "Fargekarusell",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      description: "F.eks. «Farger som passer til dette rommet»",
    }),
    defineField({
      name: "colors",
      title: "Farger",
      type: "array",
      of: [{ type: "reference", to: [{ type: "color" }] }],
      validation: (rule) => rule.required().min(2).max(20),
      description: "Velg 2-20 farger",
    }),
    defineField({
      name: "collection",
      title: "Fargekart",
      type: "reference",
      to: [{ type: "colorCollection" }],
      description: "Valgfri kobling til et fargekart",
    }),
  ],
  preview: {
    select: { title: "title", collectionName: "collection.name" },
    prepare({ title, collectionName }: any) {
      return {
        title: title || "Fargekarusell",
        subtitle: collectionName || "",
      };
    },
  },
});
