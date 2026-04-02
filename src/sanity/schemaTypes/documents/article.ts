import { defineType, defineField } from "sanity";

// FRS: innhold-og-inspirasjon.md
export const article = defineType({
  name: "article",
  title: "Artikkel",
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
      name: "articleType",
      title: "Artikkeltype",
      type: "string",
      options: {
        list: [
          { title: "How-to / Guide", value: "howto" },
          { title: "Inspirasjon", value: "inspirasjon" },
          { title: "Kampanje", value: "kampanje" },
          { title: "FAQ", value: "faq" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Kort beskrivelse",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      title: "Hovedbilde",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Innhold",
      type: "portableText",
    }),
    defineField({
      name: "relatedProducts",
      title: "Relaterte produkter",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "relatedColors",
      title: "Relaterte farger",
      type: "array",
      of: [{ type: "reference", to: [{ type: "color" }] }],
    }),
    defineField({
      name: "contentCluster",
      title: "Innholdsklynge",
      type: "reference",
      to: [{ type: "contentCluster" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Publiseringsdato",
      type: "datetime",
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
      subtitle: "articleType",
      media: "mainImage",
    },
  },
  orderings: [
    {
      title: "Publiseringsdato",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
