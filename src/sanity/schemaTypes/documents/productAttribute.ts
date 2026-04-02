import { defineType, defineField } from "sanity";

/**
 * ProductAttribute — Produktegenskaper med forklaring og skala.
 *
 * Eksempel: VOC-innhold
 * - name: "VOC-innhold"
 * - code: "voc"
 * - unit: "g/L"
 * - description: "Volatile Organic Compounds — mengden flyktige organiske forbindelser..."
 * - scale: [{ label: "Klasse A+", max: 1 }, { label: "Klasse A", max: 30 }, ...]
 *
 * Brukes på produktsider for å vise info-modaler ("Hva betyr dette?")
 * og sammenligne produkter på tvers av attributter.
 */
export const productAttribute = defineType({
  name: "productAttribute",
  title: "Produktattributt",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Navn",
      type: "string",
      description: "F.eks. «VOC-innhold», «Vaskeklasse», «Glansgrad»",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "code",
      title: "Kode",
      type: "string",
      description: "Maskinlesbar ID (f.eks. «voc», «washClass», «gloss»). Brukes i kode.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "unit",
      title: "Enhet",
      type: "string",
      description: "F.eks. «g/L», «%», «klasse»",
    }),
    defineField({
      name: "icon",
      title: "Ikontype",
      type: "string",
      description: "For visuell fremstilling i UI",
      options: {
        list: [
          { title: "Kjemi / VOC", value: "chemistry" },
          { title: "Vask", value: "wash" },
          { title: "Glans", value: "gloss" },
          { title: "Dekning", value: "coverage" },
          { title: "Tørketid", value: "drying" },
          { title: "Sertifisering", value: "certification" },
          { title: "Temperatur", value: "temperature" },
          { title: "Generell", value: "general" },
        ],
      },
    }),
    defineField({
      name: "shortDescription",
      title: "Kort forklaring",
      type: "text",
      rows: 2,
      description: "Vises i tooltip/modal — 1-2 setninger",
    }),
    defineField({
      name: "longDescription",
      title: "Detaljert forklaring",
      type: "portableText",
      description: "Full forklaring med kontekst. Vises i modal.",
    }),
    defineField({
      name: "whyItMatters",
      title: "Hvorfor det betyr noe",
      type: "text",
      rows: 3,
      description: "Kundevendt forklaring: «Lavt VOC betyr at malingen er trygg for barnerom...»",
    }),
    defineField({
      name: "scale",
      title: "Skala",
      type: "array",
      description: "Verdiskalaen for denne attributten. Brukes til å vise hvor et produkt ligger.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              type: "string",
              title: "Label",
              description: "F.eks. «Klasse A+», «Helmatt», «Best i test»",
            },
            {
              name: "value",
              type: "number",
              title: "Numerisk verdi",
              description: "For plassering på skala (lavere = bedre for VOC, høyere = bedre for dekning)",
            },
            {
              name: "description",
              type: "string",
              title: "Beskrivelse",
              description: "F.eks. «Under 1 g/L — løsemiddelfri»",
            },
            {
              name: "isBest",
              type: "boolean",
              title: "Beste nivå?",
              description: "Marker dette som det beste nivået på skalaen",
            },
          ],
          preview: {
            select: { title: "label", subtitle: "description" },
          },
        },
      ],
    }),
    defineField({
      name: "regulatoryContext",
      title: "Regulatorisk kontekst",
      type: "text",
      rows: 2,
      description: "F.eks. «EU-grensen for VOC i veggmaling er 30 g/L (direktiv 2004/42/EC)»",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "code" },
    prepare({ title, subtitle }: any) {
      return { title, subtitle: `Kode: ${subtitle}` };
    },
  },
});
