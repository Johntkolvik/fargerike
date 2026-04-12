import { defineType, defineArrayMember } from "sanity";

/**
 * Extended Portable Text for articles.
 *
 * Includes all base portableText block types (rich text + images)
 * plus 9 custom content blocks for richer editorial content.
 */
export const articlePortableText = defineType({
  name: "articlePortableText",
  title: "Artikkelinnhold",
  type: "array",
  of: [
    // --- Base blocks from portableText ---
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
    // --- Custom content blocks ---
    defineArrayMember({ type: "productCard" }),
    defineArrayMember({ type: "colorPaletteEmbed" }),
    defineArrayMember({ type: "stepByStep" }),
    defineArrayMember({ type: "beforeAfter" }),
    defineArrayMember({ type: "videoEmbed" }),
    defineArrayMember({ type: "ctaBlock" }),
    defineArrayMember({ type: "calloutBox" }),
    defineArrayMember({ type: "comparisonTable" }),
    defineArrayMember({ type: "materialsList" }),
    defineArrayMember({ type: "productSlider" }),
    defineArrayMember({ type: "colorSlider" }),
    defineArrayMember({ type: "articleSlider" }),
  ],
});
