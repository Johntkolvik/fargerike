import { defineType, defineField } from "sanity";

export const beforeAfter = defineType({
  name: "beforeAfter",
  title: "For/etter-sammenligning",
  type: "object",
  fields: [
    defineField({
      name: "beforeImage",
      title: "For-bilde",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alternativ tekst" },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "afterImage",
      title: "Etter-bilde",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alternativ tekst" },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "beforeLabel",
      title: "For-etikett",
      type: "string",
      initialValue: "For",
    }),
    defineField({
      name: "afterLabel",
      title: "Etter-etikett",
      type: "string",
      initialValue: "Etter",
    }),
    defineField({
      name: "caption",
      title: "Bildetekst",
      type: "string",
    }),
  ],
  preview: {
    select: {
      media: "afterImage",
      caption: "caption",
    },
    prepare({ media, caption }: any) {
      return {
        title: caption || "For/etter-sammenligning",
        media,
      };
    },
  },
});
