import { defineType, defineField } from "sanity";

export const comparisonTable = defineType({
  name: "comparisonTable",
  title: "Sammenligningstabell",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
    defineField({
      name: "products",
      title: "Produkter",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (rule) => rule.min(2).max(5),
    }),
    defineField({
      name: "attributes",
      title: "Egenskaper",
      type: "array",
      of: [{ type: "string" }],
      description: "Egenskaper som skal sammenlignes, f.eks. «Dekkevne», «Torketid»",
    }),
    defineField({
      name: "showPrice",
      title: "Vis pris",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }: any) {
      return { title: title || "Sammenligningstabell" };
    },
  },
});
