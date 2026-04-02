import { defineType, defineField } from "sanity";

// FRS: pdp-tjeneste.md
export const service = defineType({
  name: "service",
  title: "Tjeneste",
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
      name: "serviceType",
      title: "Tjenestetype",
      type: "string",
      options: {
        list: [
          { title: "Fargekonsultasjon", value: "fargekonsultasjon" },
          { title: "Interiørkonsulent", value: "interiorkonsulent" },
          { title: "Fargeprøve", value: "fargeprove" },
          { title: "Håndverkerformidling", value: "handverker" },
          { title: "Utleie", value: "utleie" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "portableText",
    }),
    defineField({
      name: "price",
      title: "Pris",
      type: "number",
      description: "Pris i NOK (valgfritt)",
    }),
    defineField({
      name: "duration",
      title: "Varighet",
      type: "string",
      description: "F.eks. '60 minutter'",
    }),
    defineField({
      name: "preparation",
      title: "Forberedelse",
      type: "text",
      description: "Hva bør kunden gjøre på forhånd?",
    }),
    defineField({
      name: "faq",
      title: "Ofte stilte spørsmål",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Spørsmål" },
            { name: "answer", type: "text", title: "Svar" },
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),
    defineField({
      name: "images",
      title: "Bilder",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "availableAtStores",
      title: "Tilgjengelig i butikker",
      type: "array",
      of: [{ type: "reference", to: [{ type: "store" }] }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "serviceType" },
  },
});
