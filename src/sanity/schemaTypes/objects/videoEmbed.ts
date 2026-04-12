import { defineType, defineField } from "sanity";

export const videoEmbed = defineType({
  name: "videoEmbed",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "Video-URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
    defineField({
      name: "posterImage",
      title: "Forsidebilde",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "caption",
      title: "Bildetekst",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "url",
    },
    prepare({ title, subtitle }: any) {
      return {
        title: title || "Video",
        subtitle,
      };
    },
  },
});
