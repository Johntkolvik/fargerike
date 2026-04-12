import { defineType, defineField } from "sanity";

export const calloutBox = defineType({
  name: "calloutBox",
  title: "Infoboks",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Profftips", value: "proTip" },
          { title: "Advarsel", value: "warning" },
          { title: "Viktig", value: "important" },
          { title: "Info", value: "info" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Innhold",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
    },
    prepare({ title, type }: any) {
      const typeNames: Record<string, string> = {
        proTip: "Profftips",
        warning: "Advarsel",
        important: "Viktig",
        info: "Info",
      };
      const icons: Record<string, string> = {
        proTip: "💡",
        warning: "⚠️",
        important: "❗",
        info: "ℹ️",
      };
      return {
        title: `${icons[type] || ""} ${title || typeNames[type] || "Infoboks"}`,
      };
    },
  },
});
