import { defineType, defineField } from "sanity";

// FRS: plp.md
export const productCategory = defineType({
  name: "productCategory",
  title: "Produktkategori",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Kategorinavn",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Overordnet kategori",
      type: "reference",
      to: [{ type: "productCategory" }],
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Bilde",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      parent: "parent.title",
      media: "image",
    },
    prepare({ title, parent, media }) {
      return {
        title,
        subtitle: parent ? `Under: ${parent}` : "Toppnivå",
        media,
      };
    },
  },
});
