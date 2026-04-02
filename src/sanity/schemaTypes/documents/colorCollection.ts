import { defineType, defineField } from "sanity";

/**
 * ColorCollection — Et fargekart / fargesamling.
 *
 * Eksempler: "Nuances 2025", "Soulful Spaces 2026", "Drygolin fargekart",
 * "Fargerike Beige", "NCS Standard".
 *
 * Skiller seg fra ProductFamily:
 * - ProductFamily = et malings-produkt (Lady Wonderwall 606)
 * - ColorCollection = en kuratert samling farger (Nuances 2025)
 *
 * En farge kan tilhøre flere collections. En collection kan inneholde
 * farger fra flere merker (men gjør det sjelden i praksis).
 */
export const colorCollection = defineType({
  name: "colorCollection",
  title: "Fargekart",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Navn",
      type: "string",
      description: "F.eks. «Nuances 2025», «Drygolin fargekart»",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Merkevare",
      type: "string",
      options: {
        list: [
          { title: "Jotun", value: "jotun" },
          { title: "Fargerike", value: "fargerike" },
          { title: "Scanox / Butinox", value: "scanox" },
          { title: "NCS", value: "ncs" },
          { title: "Beckers", value: "beckers" },
          { title: "Caparol", value: "caparol" },
        ],
      },
    }),
    defineField({
      name: "collectionType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Fargekart (standard)", value: "palette" },
          { title: "Trendkolleksjon", value: "trend" },
          { title: "Spesial", value: "specialty" },
        ],
      },
    }),
    defineField({
      name: "applicationArea",
      title: "Bruksområde",
      type: "string",
      options: {
        list: [
          { title: "Innendørs", value: "interior" },
          { title: "Utendørs", value: "exterior" },
          { title: "Begge", value: "both" },
        ],
      },
    }),
    defineField({
      name: "year",
      title: "År",
      type: "number",
      description: "Lanseringsår (for trendkolleksjoner)",
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "colors",
      title: "Farger",
      type: "array",
      of: [{ type: "reference", to: [{ type: "color" }] }],
      description: "Fargene i dette fargekartet, i ønsket rekkefølge",
    }),
    defineField({
      name: "colorCodes",
      title: "Fargekoder (for import)",
      type: "array",
      of: [{ type: "string" }],
      description: "Leverandør-fargekoder for bulk-kobling. Brukes når color-referanser ikke er satt.",
    }),
    defineField({
      name: "coverImage",
      title: "Coverbilde",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", brand: "brand", type: "collectionType", year: "year" },
    prepare({ title, brand, type, year }: any) {
      const sub = [brand?.toUpperCase(), type === "trend" && year ? `Trend ${year}` : type].filter(Boolean).join(" · ");
      return { title, subtitle: sub };
    },
  },
});
