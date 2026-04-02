import { defineType, defineField } from "sanity";

// FRS: store-locator.md
export const store = defineType({
  name: "store",
  title: "Butikk",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Butikknavn",
      type: "string",
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
      name: "address",
      title: "Adresse",
      type: "object",
      fields: [
        { name: "street", type: "string", title: "Gateadresse" },
        { name: "postalCode", type: "string", title: "Postnummer" },
        { name: "city", type: "string", title: "Sted" },
      ],
    }),
    defineField({
      name: "coordinates",
      title: "Koordinater",
      type: "geopoint",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "E-post",
      type: "string",
    }),
    defineField({
      name: "pinmetoId",
      title: "Pinmeto-ID",
      type: "string",
      description: "For synkronisering med Pinmeto",
    }),
    defineField({
      name: "openingHours",
      title: "Åpningstider",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              type: "string",
              title: "Dag",
              options: {
                list: [
                  "Mandag",
                  "Tirsdag",
                  "Onsdag",
                  "Torsdag",
                  "Fredag",
                  "Lørdag",
                  "Søndag",
                ],
              },
            },
            { name: "open", type: "string", title: "Åpner" },
            { name: "close", type: "string", title: "Stenger" },
          ],
          preview: {
            select: { title: "day", open: "open", close: "close" },
            prepare({ title, open, close }) {
              return { title: `${title}: ${open}–${close}` };
            },
          },
        },
      ],
    }),
    defineField({
      name: "services",
      title: "Tjenester",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "localContent",
      title: "Lokalt innhold",
      type: "portableText",
    }),
    defineField({
      name: "images",
      title: "Bilder",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "name",
      city: "address.city",
    },
    prepare({ title, city }) {
      return { title, subtitle: city };
    },
  },
});
