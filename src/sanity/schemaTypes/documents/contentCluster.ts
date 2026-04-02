import { defineType, defineField } from "sanity";

// FRS: innhold-og-inspirasjon.md – Innholdsklynger
export const contentCluster = defineType({
  name: "contentCluster",
  title: "Innholdsklynge",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
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
      name: "description",
      title: "Beskrivelse",
      type: "text",
    }),
    defineField({
      name: "pillarContent",
      title: "Pilar-innhold",
      type: "portableText",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
