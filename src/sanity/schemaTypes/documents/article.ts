import { defineType, defineField } from "sanity";

// FRS: innhold-og-inspirasjon.md
export const article = defineType({
  name: "article",
  title: "Artikkel",
  type: "document",
  groups: [
    { name: "content", title: "Innhold", default: true },
    { name: "metadata", title: "Metadata" },
    { name: "relations", title: "Relasjoner" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // --- Content group ---
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "articleType",
      title: "Artikkeltype",
      type: "string",
      group: "content",
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
      group: "content",
    }),
    defineField({
      name: "mainImage",
      title: "Hovedbilde",
      type: "image",
      options: { hotspot: true },
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Innhold",
      type: "articlePortableText",
      group: "content",
    }),
    // --- Metadata group ---
    defineField({
      name: "author",
      title: "Forfatter",
      type: "string",
      group: "metadata",
    }),
    defineField({
      name: "difficulty",
      title: "Vanskelighetsgrad",
      type: "string",
      group: "metadata",
      options: {
        list: [
          { title: "Nybegynner", value: "nybegynner" },
          { title: "Middels", value: "middels" },
          { title: "Erfaren", value: "erfaren" },
        ],
      },
      hidden: ({ parent }) => parent?.articleType !== "howto",
    }),
    defineField({
      name: "estimatedTime",
      title: "Estimert tid",
      type: "string",
      group: "metadata",
      description: "F.eks. «2-3 timer»",
      hidden: ({ parent }) => parent?.articleType !== "howto",
    }),
    defineField({
      name: "readingTime",
      title: "Lesetid",
      type: "string",
      group: "metadata",
      description: "F.eks. «5 min»",
    }),
    defineField({
      name: "room",
      title: "Rom",
      type: "array",
      group: "metadata",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Stue", value: "stue" },
          { title: "Soverom", value: "soverom" },
          { title: "Kjokken", value: "kjokken" },
          { title: "Bad", value: "bad" },
          { title: "Barnerom", value: "barnerom" },
          { title: "Entre", value: "entre" },
          { title: "Uterom", value: "uterom" },
          { title: "Terrasse", value: "terrasse" },
        ],
      },
    }),
    defineField({
      name: "season",
      title: "Sesong",
      type: "string",
      group: "metadata",
      options: {
        list: [
          { title: "Var", value: "var" },
          { title: "Sommer", value: "sommer" },
          { title: "Host", value: "host" },
          { title: "Vinter", value: "vinter" },
        ],
      },
    }),
    defineField({
      name: "style",
      title: "Stil",
      type: "string",
      group: "metadata",
      options: {
        list: [
          { title: "Nordisk", value: "nordisk" },
          { title: "Moderne", value: "moderne" },
          { title: "Klassisk", value: "klassisk" },
          { title: "Retro", value: "retro" },
          { title: "Minimalistisk", value: "minimalistisk" },
        ],
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Publiseringsdato",
      type: "datetime",
      group: "metadata",
    }),
    // --- Relations group ---
    defineField({
      name: "relatedProducts",
      title: "Relaterte produkter",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "relatedColors",
      title: "Relaterte farger",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "color" }] }],
    }),
    defineField({
      name: "relatedArticles",
      title: "Relaterte artikler",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    }),
    defineField({
      name: "contentCluster",
      title: "Innholdsklynge",
      type: "reference",
      group: "relations",
      to: [{ type: "contentCluster" }],
    }),
    // --- SEO group ---
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
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
