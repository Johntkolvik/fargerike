import { defineType, defineField } from "sanity";

export const productCard = defineType({
  name: "productCard",
  title: "Produktkort",
  type: "object",
  fields: [
    defineField({
      name: "product",
      title: "Produkt",
      type: "reference",
      to: [{ type: "product" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayMode",
      title: "Visningsmodus",
      type: "string",
      options: {
        list: [
          { title: "Kompakt", value: "compact" },
          { title: "Detaljert", value: "detailed" },
        ],
      },
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA-tekst",
      type: "string",
      initialValue: "Se produkt",
    }),
    defineField({
      name: "note",
      title: "Notat",
      type: "string",
      description: "Valgfri merknad, f.eks. «Anbefalt av maleren»",
    }),
  ],
  preview: {
    select: {
      title: "product.title",
      subtitle: "displayMode",
    },
    prepare({ title, subtitle }: any) {
      return {
        title: title || "Produktkort",
        subtitle: subtitle === "detailed" ? "Detaljert" : "Kompakt",
      };
    },
  },
});
