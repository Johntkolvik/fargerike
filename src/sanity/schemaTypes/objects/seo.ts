import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta-tittel",
      type: "string",
      validation: (rule) => rule.max(60).warning("Bør være under 60 tegn"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta-beskrivelse",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160).warning("Bør være under 160 tegn"),
    }),
    defineField({
      name: "ogImage",
      title: "OG-bilde",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
