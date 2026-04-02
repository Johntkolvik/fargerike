import { defineType, defineField } from "sanity";

/**
 * ProductFamily — En malingsserie (f.eks. Lady Wonderwall, Sens, Butinox Futura).
 *
 * Dette er den sentrale entiteten i "blandemaskinen i skyen" (PRD-blandemaskin.md).
 * En produktfamilie definerer:
 * - Hvilke fargemerker som kan blandes i serien (supportedColorBrands)
 * - Hvilke baser som er tilgjengelige (bases)
 * - Alle kjøpbare varianter (SKU-er) per base og volum
 *
 * Oppløsningsflyten: Farge + ProductFamily → Base → Variant (SKU) → GTIN + Pris
 */
export const productFamily = defineType({
  name: "productFamily",
  title: "Produktfamilie",
  type: "document",
  groups: [
    { name: "identity", title: "Identitet", default: true },
    { name: "compatibility", title: "Kompatibilitet" },
    { name: "variants", title: "Varianter & baser" },
    { name: "specs", title: "Spesifikasjoner" },
  ],
  fields: [
    // --- Identitet ---
    defineField({
      name: "familyCode",
      title: "Familiekode",
      type: "string",
      description: "Leverandørens Product Family ID (f.eks. «606» for Lady Wonderwall)",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Navn",
      type: "string",
      description: "F.eks. «Lady Wonderwall»",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Kort beskrivelse",
      type: "string",
      description: "F.eks. «Vaskbar, tåler juling»",
      group: "identity",
    }),
    defineField({
      name: "brand",
      title: "Leverandør",
      type: "string",
      options: {
        list: [
          { title: "Jotun", value: "jotun" },
          { title: "Scanox / Butinox", value: "scanox" },
          { title: "Beckers", value: "beckers" },
          { title: "Caparol", value: "caparol" },
        ],
      },
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "applicationArea",
      title: "Bruksområde",
      type: "string",
      options: {
        list: [
          { title: "Innendørs", value: "interior" },
          { title: "Utendørs", value: "exterior" },
        ],
      },
      group: "identity",
    }),
    defineField({
      name: "section",
      title: "Seksjon",
      type: "string",
      description: "Brukskontekst (f.eks. «stue-gang-kjokken», «treverk»)",
      group: "identity",
    }),
    defineField({
      name: "finishName",
      title: "Overflateglans",
      type: "string",
      description: "F.eks. «Helmatt», «Silkematt», «Halvblank»",
      group: "identity",
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "text",
      rows: 3,
      group: "identity",
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Valgfri badge (f.eks. «Mest populær», «NAAF-anbefalt»)",
      group: "identity",
    }),
    defineField({
      name: "image",
      title: "Produktbilde",
      type: "image",
      options: { hotspot: true },
      group: "identity",
    }),

    // --- Kompatibilitet (kjernen i blandemaskinen) ---
    defineField({
      name: "supportedColorBrands",
      title: "Støttede fargemerker",
      type: "array",
      of: [{ type: "string" }],
      description:
        'Hvilke fargemerker kan blandes i denne serien. «ncs» = alle NCS-farger. ' +
        'F.eks. Jotun Lady Wonderwall støtter ["jotun", "ncs"], ' +
        'mens Butinox Futura støtter ["scanox", "ncs"].',
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
      group: "compatibility",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "supportedCollections",
      title: "Støttede fargekart",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Fargekart-ID-er denne familien støtter (f.eks. Lady Minerals har kun 21 kuraterte kulører). " +
        "Tomt = alle farger fra støttede merker er kompatible.",
      group: "compatibility",
    }),

    // --- Baser ---
    defineField({
      name: "bases",
      title: "Tilgjengelige baser",
      type: "array",
      description:
        "Basene som brukes for blanding. Rekkefølgen bestemmer prioritet. " +
        "luminanceMin/Max brukes for automatisk base-oppløsning når leverandør-API ikke er tilgjengelig.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "code",
              type: "string",
              title: "Basekode",
              description: "F.eks. «hvit», «a», «b», «c»",
              validation: (rule: any) => rule.required(),
            },
            {
              name: "name",
              type: "string",
              title: "Basenavn",
              description: "F.eks. «Hvit-base»",
            },
            {
              name: "luminanceMin",
              type: "number",
              title: "Luminance min",
              description: "Minimumslysstyrke for farger i denne basen (0-100)",
            },
            {
              name: "luminanceMax",
              type: "number",
              title: "Luminance max",
              description: "Maksimumslysstyrke (0-100)",
            },
          ],
          preview: {
            select: { title: "name", subtitle: "code" },
          },
        },
      ],
      group: "variants",
    }),

    // --- Varianter (SKU-er) ---
    defineField({
      name: "variants",
      title: "Varianter (SKU-er)",
      type: "array",
      description:
        "Alle kjøpbare kombinasjoner av base + volum. Hver variant er en unik SKU.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "productCode",
              type: "string",
              title: "Produktkode",
              description: "Leverandørens produktkode (f.eks. «26RMAACSA»)",
              validation: (rule: any) => rule.required(),
            },
            {
              name: "base",
              type: "string",
              title: "Base",
              description: "Basekode (f.eks. «hvit», «a», «c»)",
              validation: (rule: any) => rule.required(),
            },
            {
              name: "volume",
              type: "string",
              title: "Volum",
              description: "F.eks. «0.68L», «2.7L», «9L»",
              validation: (rule: any) => rule.required(),
            },
            {
              name: "gtin",
              type: "string",
              title: "GTIN / EAN",
            },
            {
              name: "price",
              type: "number",
              title: "Pris (NOK)",
            },
          ],
          preview: {
            select: { base: "base", volume: "volume", code: "productCode", price: "price" },
            prepare({ base, volume, code, price }: any) {
              return {
                title: `${base?.toUpperCase()}-BASE ${volume}`,
                subtitle: `${code}${price ? ` — ${price} NOK` : ""}`,
              };
            },
          },
        },
      ],
      group: "variants",
    }),

    // --- Spesifikasjoner ---
    defineField({
      name: "washClass",
      title: "Vaskeklasse",
      type: "string",
      group: "specs",
    }),
    defineField({
      name: "voc",
      title: "VOC-innhold",
      type: "string",
      group: "specs",
    }),
    defineField({
      name: "coverage",
      title: "Dekning (m²/L)",
      type: "string",
      group: "specs",
    }),
    defineField({
      name: "dryTime",
      title: "Tørketid",
      type: "string",
      group: "specs",
    }),
    defineField({
      name: "glossOptions",
      title: "Glansgrader",
      type: "array",
      of: [{ type: "string" }],
      description: "Om familien tilbyr flere glansgrader (f.eks. Lady Supreme Finish)",
      group: "specs",
    }),

    // --- Referanse til produktside ---
    defineField({
      name: "product",
      title: "Produktside",
      type: "reference",
      to: [{ type: "product" }],
      description: "Kobling til produktsiden i Sanity (for PDP-lenker)",
      group: "identity",
    }),
  ],
  preview: {
    select: { title: "name", brand: "brand", finish: "finishName", code: "familyCode" },
    prepare({ title, brand, finish, code }: any) {
      return {
        title: `${title} (${code})`,
        subtitle: `${brand?.toUpperCase()} · ${finish || ""}`,
      };
    },
  },
});
