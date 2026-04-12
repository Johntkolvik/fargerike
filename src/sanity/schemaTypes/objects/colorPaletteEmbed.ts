import { defineType, defineField } from "sanity";

export const colorPaletteEmbed = defineType({
  name: "colorPaletteEmbed",
  title: "Fargepalett",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
    defineField({
      name: "colors",
      title: "Farger",
      type: "array",
      of: [{ type: "reference", to: [{ type: "color" }] }],
      validation: (rule) => rule.min(2).max(12),
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Swatches", value: "swatches" },
          { title: "Kort", value: "cards" },
          { title: "Stripe", value: "strip" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }: any) {
      return { title: title || "Fargepalett" };
    },
  },
});
