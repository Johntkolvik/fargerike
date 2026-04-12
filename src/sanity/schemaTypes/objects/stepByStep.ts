import { defineType, defineField, defineArrayMember } from "sanity";

export const stepByStep = defineType({
  name: "stepByStep",
  title: "Steg-for-steg",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
    defineField({
      name: "steps",
      title: "Steg",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Tittel",
              validation: (rule) => rule.required(),
            },
            {
              name: "body",
              type: "text",
              title: "Beskrivelse",
              validation: (rule) => rule.required(),
            },
            {
              name: "image",
              type: "image",
              title: "Bilde",
              options: { hotspot: true },
            },
            {
              name: "tip",
              type: "string",
              title: "Tips",
            },
            {
              name: "duration",
              type: "string",
              title: "Varighet",
              description: "F.eks. «10 min», «1 time»",
            },
          ],
          preview: {
            select: { title: "title", subtitle: "duration" },
          },
        }),
      ],
    }),
    defineField({
      name: "totalDuration",
      title: "Total varighet",
      type: "string",
      description: "F.eks. «2-3 timer»",
    }),
    defineField({
      name: "difficulty",
      title: "Vanskelighetsgrad",
      type: "string",
      options: {
        list: [
          { title: "Nybegynner", value: "nybegynner" },
          { title: "Middels", value: "middels" },
          { title: "Erfaren", value: "erfaren" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      difficulty: "difficulty",
    },
    prepare({ title, difficulty }: any) {
      return {
        title: title || "Steg-for-steg",
        subtitle: difficulty || undefined,
      };
    },
  },
});
