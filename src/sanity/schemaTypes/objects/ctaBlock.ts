import { defineType, defineField } from "sanity";

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Bestill konsultasjon", value: "bookConsultation" },
          { title: "Finn butikk", value: "findStore" },
          { title: "Bestill fargeprove", value: "orderSample" },
          { title: "Kontakt oss", value: "contact" },
          { title: "Egendefinert", value: "custom" },
        ],
      },
    }),
    defineField({
      name: "heading",
      title: "Overskrift",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Brodtekst",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaLabel",
      title: "Knappetekst",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaUrl",
      title: "Lenke",
      type: "url",
      validation: (rule) =>
        rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "variant",
    },
    prepare({ title, subtitle }: any) {
      const variantNames: Record<string, string> = {
        bookConsultation: "Bestill konsultasjon",
        findStore: "Finn butikk",
        orderSample: "Bestill fargeprove",
        contact: "Kontakt oss",
        custom: "Egendefinert",
      };
      return {
        title: title || "Call to Action",
        subtitle: variantNames[subtitle] || subtitle,
      };
    },
  },
});
