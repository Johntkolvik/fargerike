import { defineType, defineArrayMember } from "sanity";

export const portableText = defineType({
  name: "portableText",
  title: "Innhold",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      marks: {
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Ekstern lenke",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              },
            ],
          },
          {
            name: "internalLink",
            type: "object",
            title: "Intern lenke",
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Referanse",
                to: [
                  { type: "product" },
                  { type: "color" },
                  { type: "article" },
                  { type: "service" },
                  { type: "store" },
                  { type: "productCategory" },
                ],
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternativ tekst",
        },
        {
          name: "caption",
          type: "string",
          title: "Bildetekst",
        },
      ],
    }),
  ],
});
