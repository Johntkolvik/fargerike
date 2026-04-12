import { defineType, defineField, defineArrayMember } from "sanity";

export const materialsList = defineType({
  name: "materialsList",
  title: "Utstyrsliste",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      initialValue: "Det trenger du",
    }),
    defineField({
      name: "items",
      title: "Utstyr",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Navn",
              validation: (rule) => rule.required(),
            },
            {
              name: "product",
              type: "reference",
              title: "Produkt",
              to: [{ type: "productFamily" }, { type: "productCategory" }, { type: "product" }],
              description: "Koble til produktfamilie, kategori, eller spesifikt produkt",
            },
            {
              name: "quantity",
              type: "string",
              title: "Mengde",
              description: "F.eks. «2 stk», «1 rull»",
            },
            {
              name: "note",
              type: "string",
              title: "Notat",
            },
            {
              name: "essential",
              type: "boolean",
              title: "Nodvendig",
              initialValue: true,
            },
          ],
          preview: {
            select: { title: "name", subtitle: "quantity" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }: any) {
      return { title: title || "Utstyrsliste" };
    },
  },
});
