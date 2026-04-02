import { defineType, defineField } from "sanity";

export const campaignHero = defineType({
  name: "campaignHero",
  title: "Kampanjehero",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Overskrift",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Undertekst",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Bilde",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA-tekst",
      type: "string",
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA-lenke",
      type: "url",
      validation: (rule) =>
        rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "startDate",
      title: "Startdato",
      type: "datetime",
    }),
    defineField({
      name: "endDate",
      title: "Sluttdato",
      type: "datetime",
    }),
  ],
});
