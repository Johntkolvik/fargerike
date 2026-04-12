import { defineType, defineField, defineArrayMember } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Forside",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        {
          name: "heading",
          type: "string",
          title: "Overskrift",
        },
        {
          name: "tagline",
          type: "string",
          title: "Undertekst",
        },
        {
          name: "image",
          type: "image",
          title: "Bilde",
          options: { hotspot: true },
        },
        {
          name: "primaryCta",
          type: "object",
          title: "Primaer CTA",
          fields: [
            { name: "label", type: "string", title: "Knappetekst" },
            { name: "href", type: "string", title: "Lenke" },
          ],
        },
        {
          name: "secondaryCta",
          type: "object",
          title: "Sekundaer CTA",
          fields: [
            { name: "label", type: "string", title: "Knappetekst" },
            { name: "href", type: "string", title: "Lenke" },
          ],
        },
        {
          name: "backgroundColor",
          type: "string",
          title: "Bakgrunnsfarge",
          description: "Hex-verdi eller Tailwind-klasse",
        },
      ],
    }),
    defineField({
      name: "categoryEntries",
      title: "Kategori-innganger",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Tittel",
              validation: (rule) => rule.required(),
            },
            {
              name: "description",
              type: "string",
              title: "Beskrivelse",
            },
            {
              name: "image",
              type: "image",
              title: "Bilde",
              options: { hotspot: true },
            },
            {
              name: "link",
              type: "url",
              title: "Lenke",
              validation: (rule) =>
                rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
            },
          ],
          preview: {
            select: { title: "title", media: "image" },
          },
        }),
      ],
    }),
    defineField({
      name: "featuredProducts",
      title: "Fremhevede produkter",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "inspirationSection",
      title: "Inspirasjonsseksjon",
      type: "object",
      fields: [
        {
          name: "heading",
          type: "string",
          title: "Overskrift",
        },
        {
          name: "articles",
          type: "array",
          title: "Artikler",
          of: [{ type: "reference", to: [{ type: "article" }] }],
        },
      ],
    }),
    defineField({
      name: "contentBlocks",
      title: "Innholdsblokker",
      type: "array",
      of: [
        defineArrayMember({ type: "campaignHero" }),
        defineArrayMember({ type: "featureBlock" }),
        defineArrayMember({ type: "ctaBlock" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Forside" };
    },
  },
});
