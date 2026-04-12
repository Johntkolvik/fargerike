import { defineType, defineField } from "sanity";

/**
 * articleSlider — Horizontal slider of article cards.
 *
 * Used in article body to cross-link related content.
 * Supports manual selection or autoMode (show latest articles).
 */
export const articleSlider = defineType({
  name: "articleSlider",
  title: "Artikkelkarusell",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      description: "F.eks. «Relaterte guider»",
    }),
    defineField({
      name: "articles",
      title: "Artikler",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { autoMode?: boolean } | undefined;
          if (parent?.autoMode) return true;
          if (!value || value.length < 2) return "Velg minst 2 artikler (eller slaa paa automatisk modus)";
          return true;
        }),
      description: "Velg 2-6 artikler manuelt, eller slaa paa automatisk modus",
      hidden: ({ parent }) => parent?.autoMode === true,
    }),
    defineField({
      name: "autoMode",
      title: "Automatisk modus",
      type: "boolean",
      description: "Vis siste publiserte artikler automatisk i stedet for manuelt utvalg",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", auto: "autoMode" },
    prepare({ title, auto }: any) {
      return {
        title: title || "Artikkelkarusell",
        subtitle: auto ? "Automatisk (siste artikler)" : "Manuelt utvalg",
      };
    },
  },
});
