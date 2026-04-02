import { defineType, defineField } from "sanity";

// FRS: pdp-produkt.md (US-P01–P06), kjerneflyter-pdp.md Flyt B
export const product = defineType({
  name: "product",
  title: "Produkt",
  type: "document",
  groups: [
    { name: "info", title: "Produktinfo", default: true },
    { name: "technical", title: "Teknisk" },
    { name: "variants", title: "Varianter" },
    { name: "content", title: "Innhold" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // --- Produktinfo ---
    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
      group: "info",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayName",
      title: "Visningsnavn",
      type: "string",
      description: "Kundevennlig produktnavn",
      group: "info",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Undertekst",
      type: "string",
      description: "Kort posisjonering, f.eks. «Supermatt veggmaling for tørre rom»",
      group: "info",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "displayName" },
      group: "info",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "productCategory" }],
      group: "info",
    }),
    defineField({
      name: "brand",
      title: "Merke",
      type: "string",
      group: "info",
    }),
    defineField({
      name: "productLine",
      title: "Produktlinje",
      type: "string",
      description: "F.eks. «Lady», «Sens», «Drygolin»",
      group: "info",
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "portableText",
      group: "info",
    }),
    defineField({
      name: "highlights",
      title: "Høydepunkter",
      description: "3-5 USP-er som vises øverst på PDP",
      type: "array",
      of: [{ type: "string" }],
      group: "info",
    }),
    defineField({
      name: "images",
      title: "Bilder",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alternativ tekst" },
            {
              name: "imageType",
              type: "string",
              title: "Bildetype",
              options: {
                list: [
                  { title: "Packshot", value: "packshot" },
                  { title: "Miljøbilde", value: "environment" },
                  { title: "Detaljbilde", value: "detail" },
                  { title: "Bruksbilde", value: "inuse" },
                ],
              },
            },
          ],
        },
      ],
      group: "info",
    }),

    // --- Tekniske spesifikasjoner ---
    defineField({
      name: "surfaceTypes",
      title: "Egnede overflater",
      type: "array",
      of: [{ type: "string" }],
      group: "technical",
    }),
    defineField({
      name: "notSuitableFor",
      title: "Ikke egnet for",
      type: "array",
      of: [{ type: "string" }],
      group: "technical",
    }),
    defineField({
      name: "coverage",
      title: "Dekning",
      type: "string",
      description: "F.eks. «8–10 m²/liter»",
      group: "technical",
    }),
    defineField({
      name: "coats",
      title: "Antall strøk",
      type: "number",
      group: "technical",
    }),
    defineField({
      name: "dryingTimeDust",
      title: "Støvtørr",
      type: "string",
      description: "F.eks. «1 time»",
      group: "technical",
    }),
    defineField({
      name: "dryingTimeRecoat",
      title: "Overmålbar",
      type: "string",
      description: "F.eks. «2 timer»",
      group: "technical",
    }),
    defineField({
      name: "gloss",
      title: "Glansgrad",
      type: "string",
      description: "F.eks. «01 – Helmatt»",
      group: "technical",
    }),
    defineField({
      name: "binderType",
      title: "Bindemiddel",
      type: "string",
      group: "technical",
    }),
    defineField({
      name: "vocContent",
      title: "VOC-innhold",
      type: "string",
      description: "F.eks. «Maks 1 g/L»",
      group: "technical",
    }),
    defineField({
      name: "applicationMethods",
      title: "Påføringsmetoder",
      type: "array",
      of: [{ type: "string" }],
      group: "technical",
    }),
    defineField({
      name: "cleanup",
      title: "Rengjøring av verktøy",
      type: "string",
      group: "technical",
    }),
    defineField({
      name: "certifications",
      title: "Sertifiseringer",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Sertifisering" },
            { name: "description", type: "string", title: "Beskrivelse" },
          ],
          preview: { select: { title: "name" } },
        },
      ],
      group: "technical",
    }),
    defineField({
      name: "technicalSpecs",
      title: "Øvrige tekniske data",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Egenskap" },
            { name: "value", type: "string", title: "Verdi" },
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
      group: "technical",
    }),

    // --- Varianter (volum/pris) ---
    defineField({
      name: "variants",
      title: "Varianter",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "volume", type: "string", title: "Volum", description: "F.eks. «0.68 L», «2.7 L», «9 L»" },
            { name: "price", type: "number", title: "Pris (NOK)" },
            { name: "ean", type: "string", title: "EAN" },
          ],
          preview: {
            select: { volume: "volume", price: "price" },
            prepare({ volume, price }: { volume?: string; price?: number }) {
              return { title: volume, subtitle: price ? `${price} kr` : "" };
            },
          },
        },
      ],
      group: "variants",
    }),
    defineField({
      name: "bases",
      title: "Tilgjengelige baser",
      description: "F.eks. Hvit, A, B, C",
      type: "array",
      of: [{ type: "string" }],
      group: "variants",
    }),

    // --- Innhold (FAQ, utstyr, guider) ---
    defineField({
      name: "faq",
      title: "FAQ",
      description: "Ofte stilte spørsmål om produktet",
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
    defineField({
      name: "recommendedEquipment",
      title: "Anbefalt utstyr",
      description: "Gruppert etter type (Påføring, Forberedelse, Maskering, Beskyttelse)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "category",
              type: "string",
              title: "Kategori",
              options: {
                list: [
                  { title: "Påføring", value: "application" },
                  { title: "Pensler", value: "brushes" },
                  { title: "Forberedelse", value: "preparation" },
                  { title: "Maskering", value: "masking" },
                  { title: "Beskyttelse", value: "protection" },
                ],
              },
            },
            { name: "productName", type: "string", title: "Produktnavn" },
            { name: "description", type: "string", title: "Bruksområde" },
          ],
          preview: {
            select: { title: "productName", subtitle: "category" },
          },
        },
      ],
      group: "content",
    }),
    defineField({
      name: "relatedArticles",
      title: "Relaterte artikler",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
      group: "content",
    }),

    // --- Redaksjonelle feature blocks ---
    defineField({
      name: "featureBlocks",
      title: "Feature Blocks",
      description: "Redaksjonelle innholdsseksjoner som uthever produktets funksjoner. Vises under produktbeskrivelsen på PDP.",
      type: "array",
      of: [{ type: "featureBlock" }],
      group: "content",
    }),

    // --- Produktfamilie (blandemaskinen) ---
    defineField({
      name: "productFamily",
      title: "Produktfamilie",
      type: "reference",
      to: [{ type: "productFamily" }],
      description: "Kobling til produktfamilien (for farge-kompatibilitet og base-oppløsning)",
      group: "info",
    }),

    // --- Attributtverdier med forklaring ---
    defineField({
      name: "attributeValues",
      title: "Produktegenskaper",
      description: "Tekniske egenskaper koblet til forklaringsmodell. Brukes i info-modaler på PDP.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "attribute",
              type: "reference",
              title: "Attributt",
              to: [{ type: "productAttribute" }],
              description: "Referanse til attributt-definisjonen (med forklaring og skala)",
            },
            {
              name: "value",
              type: "string",
              title: "Verdi",
              description: "Produktets verdi for denne attributten (f.eks. «Maks 1 g/L»)",
            },
            {
              name: "numericValue",
              type: "number",
              title: "Numerisk verdi",
              description: "For plassering på skala (f.eks. 1 for VOC 1 g/L)",
            },
            {
              name: "displayLabel",
              type: "string",
              title: "Visningslabel",
              description: "Kort label for PDP (f.eks. «VOC Maks 1 g/L»). Om tom, brukes attributtens navn + verdi.",
            },
          ],
          preview: {
            select: { attrName: "attribute.name", value: "value", label: "displayLabel" },
            prepare({ attrName, value, label }: any) {
              return { title: label || `${attrName}: ${value}`, subtitle: attrName };
            },
          },
        },
      ],
      group: "technical",
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
    select: {
      title: "displayName",
      subtitle: "brand",
      media: "images.0",
    },
  },
});
