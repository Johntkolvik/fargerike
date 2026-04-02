import { defineType, defineField } from "sanity";

// FRS: pdp-farge.md – Krav M1-M7, kjerneflyter-pdp.md Flyt A
export const color = defineType({
  name: "color",
  title: "Farge",
  type: "document",
  groups: [
    { name: "info", title: "Kulørinformasjon", default: true },
    { name: "visual", title: "Visuelt" },
    { name: "products", title: "Produkter" },
    { name: "content", title: "Innhold" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // --- Kulørinformasjon (M1) ---
    defineField({
      name: "name",
      title: "Fargenavn",
      type: "string",
      group: "info",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "colorCode",
      title: "Leverandørkode",
      type: "string",
      description: "F.eks. «2856»",
      group: "info",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Kanonisk URL (M7), f.eks. jotun-2856-warm-blush",
      options: { source: "name" },
      group: "info",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hexValue",
      title: "Hex-verdi",
      type: "string",
      description: "F.eks. #ab8073",
      group: "info",
    }),
    defineField({
      name: "ncsCode",
      title: "NCS-kode",
      type: "string",
      description: "F.eks. S 3923-Y74R (M5)",
      group: "info",
    }),
    defineField({
      name: "brand",
      title: "Leverandør",
      type: "string",
      options: {
        list: [
          { title: "Jotun", value: "jotun" },
          { title: "NCS (universell)", value: "ncs" },
          { title: "Fargerike", value: "fargerike" },
          { title: "Scanox / Butinox", value: "scanox" },
          { title: "Beckers", value: "beckers" },
          { title: "Caparol", value: "caparol" },
        ],
      },
      group: "info",
    }),
    defineField({
      name: "colorChart",
      title: "Fargekart",
      type: "string",
      description: "F.eks. «Lady Soulful Spaces 2026» (M2)",
      group: "info",
    }),
    defineField({
      name: "colorFamily",
      title: "Fargefamilie",
      type: "string",
      description: "Overordnet hue for filtrering",
      options: {
        list: [
          { title: "Hvit", value: "white" },
          { title: "Grå", value: "grey" },
          { title: "Beige", value: "beige" },
          { title: "Brun", value: "brown" },
          { title: "Gul", value: "yellow" },
          { title: "Oransje", value: "orange" },
          { title: "Rød", value: "red" },
          { title: "Rosa", value: "pink" },
          { title: "Lilla", value: "purple" },
          { title: "Blå", value: "blue" },
          { title: "Grønn", value: "green" },
          { title: "Sort", value: "black" },
        ],
      },
      group: "info",
    }),
    defineField({
      name: "usage",
      title: "Bruksområde",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Innendørs", value: "interior" },
          { title: "Utendørs", value: "exterior" },
        ],
      },
      group: "info",
    }),
    defineField({
      name: "description",
      title: "Stemningsbeskrivelse",
      type: "text",
      rows: 4,
      description: "Poetisk tekst som beskriver fargens karakter og stemning",
      group: "info",
    }),

    // --- Blandemaskin: kompatibilitet og base (PRD-blandemaskin.md) ---
    defineField({
      name: "compatibleFamilyCodes",
      title: "Kompatible produktfamilier",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Familiekoder denne fargen kan blandes i (fra leverandør-API). " +
        "F.eks. [«606», «429», «680»] for en Jotun-farge. " +
        "Tomt = bruk brand-regelen (alle familier som støtter fargens brand).",
      group: "products",
    }),
    defineField({
      name: "luminance",
      title: "Luminance",
      type: "number",
      description: "Lysstyrke 0-100. Brukes til automatisk base-oppløsning.",
      group: "info",
    }),

    // --- Visuelt ---
    defineField({
      name: "environmentImages",
      title: "Miljøbilder",
      description: "Rombilder med fargen i bruk. Mål: 3+ per kulør.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alternativ tekst" },
            { name: "caption", type: "string", title: "Bildetekst" },
            {
              name: "room",
              type: "string",
              title: "Rom",
              options: {
                list: [
                  { title: "Stue", value: "living" },
                  { title: "Soverom", value: "bedroom" },
                  { title: "Kjøkken", value: "kitchen" },
                  { title: "Bad", value: "bathroom" },
                  { title: "Barnerom", value: "kids" },
                  { title: "Entré", value: "hallway" },
                  { title: "Kontor", value: "office" },
                ],
              },
            },
          ],
        },
      ],
      group: "visual",
    }),
    defineField({
      name: "colorComparisons",
      title: "Fargesammenligninger",
      description: "«Litt mørkere enn X, lysere enn Y» – bygger tillit",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "comparisonText", type: "string", title: "Sammenligningstekst" },
            { name: "comparedColor", type: "reference", title: "Sammenlignet farge", to: [{ type: "color" }] },
          ],
          preview: { select: { title: "comparisonText" } },
        },
      ],
      group: "visual",
    }),

    // --- Kompatible produkter (M3) ---
    defineField({
      name: "compatibleProducts",
      title: "Kompatible produkter",
      description: "Produkter kuløren kan brytes i, gruppert per overflate",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "surfaceType",
              type: "string",
              title: "Overflatetype",
              options: {
                list: [
                  { title: "Veggmaling", value: "wall" },
                  { title: "Takmaling", value: "ceiling" },
                  { title: "Tre & panel", value: "wood" },
                  { title: "Våtrom", value: "wetroom" },
                  { title: "Metall", value: "metal" },
                  { title: "Fasade", value: "facade" },
                ],
              },
            },
            { name: "product", type: "reference", title: "Produkt", to: [{ type: "product" }] },
            { name: "shortDescription", type: "string", title: "Kort forklaring", description: "F.eks. «Supermatt, ekstremt slitesterk»" },
          ],
          preview: {
            select: { title: "product.displayName", subtitle: "surfaceType" },
          },
        },
      ],
      group: "products",
    }),

    // --- Relaterte farger og innhold ---
    defineField({
      name: "relatedColors",
      title: "Relaterte farger",
      description: "Lignende kulører for sammenligning (S3)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "color" }] }],
      group: "content",
    }),
    defineField({
      name: "complementaryColors",
      title: "Komplementærfarger",
      description: "Farger som passer godt sammen",
      type: "array",
      of: [{ type: "reference", to: [{ type: "color" }] }],
      group: "content",
    }),
    defineField({
      name: "relatedArticles",
      title: "Relaterte artikler",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
      group: "content",
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      description: "Spørsmål spesifikke for denne kuløren",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Spørsmål" },
            { name: "answer", type: "text", title: "Svar", rows: 4 },
          ],
          preview: { select: { title: "question" } },
        },
      ],
      group: "content",
    }),

    // --- SEO ---
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "ncsCode", code: "colorCode" },
    prepare({ title, subtitle, code }: { title?: string; subtitle?: string; code?: string }) {
      return {
        title: code ? `${title} (${code})` : title,
        subtitle: subtitle || "",
      };
    },
  },
});
