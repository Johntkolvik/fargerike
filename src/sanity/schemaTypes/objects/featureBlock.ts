import { defineType, defineField } from "sanity";

/**
 * FeatureBlock — Redaksjonell content block for å utheve produktfunksjoner.
 *
 * Brukes på PDP for å presentere features visuelt — rik tekst + bilde.
 * Fleksibel nok for maling, elektronikk, solskjerming, gulv etc.
 *
 * Layouts:
 * - "hero"       → Full-width med stor overskrift, ingress og bakgrunnsbilde
 * - "split"      → Tekst venstre, bilde høyre (eller omvendt)
 * - "cards"      → 2-3 kort i rad med ikon/bilde + tittel + tekst
 * - "highlight"  → Sentrert med uthevet stat/tall og tekst
 */
export const featureBlock = defineType({
  name: "featureBlock",
  title: "Feature Block",
  type: "object",
  fields: [
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Hero (full-width)", value: "hero" },
          { title: "Split (tekst + bilde)", value: "split" },
          { title: "Kort (2-3 i rad)", value: "cards" },
          { title: "Highlight (tall/stat)", value: "highlight" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Liten label over overskriften (f.eks. «Supermatt finish»)",
    }),
    defineField({
      name: "heading",
      title: "Overskrift",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Brødtekst",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Bilde",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alternativ tekst" },
      ],
    }),
    defineField({
      name: "imagePosition",
      title: "Bildeposisjon (for split)",
      type: "string",
      options: { list: [{ title: "Høyre", value: "right" }, { title: "Venstre", value: "left" }] },
      hidden: ({ parent }) => parent?.layout !== "split",
    }),
    defineField({
      name: "backgroundColor",
      title: "Bakgrunnsfarge",
      type: "string",
      description: "Hex-verdi eller Tailwind-klasse (f.eks. «#fafaf8» eller «zinc-50»)",
    }),
    defineField({
      name: "stat",
      title: "Tall/stat (for highlight)",
      type: "string",
      description: "F.eks. «2 strøk», «< 1 g/L», «8-10 m²/L»",
      hidden: ({ parent }) => parent?.layout !== "highlight",
    }),
    defineField({
      name: "cta",
      title: "Call to action",
      type: "object",
      fields: [
        { name: "label", type: "string", title: "Knappetekst", description: "F.eks. «Bestill fargeprøve», «Les mer»" },
        { name: "href", type: "string", title: "Lenke", description: "URL eller # for intern handling" },
        { name: "style", type: "string", title: "Stil", options: { list: [{ title: "Primær (mørk)", value: "primary" }, { title: "Sekundær (outline)", value: "secondary" }] } },
      ],
    }),
    defineField({
      name: "cards",
      title: "Kort (for cards-layout)",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "icon", type: "string", title: "Ikon/emoji" },
          { name: "heading", type: "string", title: "Overskrift" },
          { name: "body", type: "text", title: "Tekst", rows: 2 },
          { name: "image", type: "image", title: "Bilde", options: { hotspot: true } },
        ],
        preview: { select: { title: "heading", subtitle: "body" } },
      }],
      hidden: ({ parent }) => parent?.layout !== "cards",
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "layout", eyebrow: "eyebrow" },
    prepare({ title, subtitle, eyebrow }: any) {
      const layoutNames: Record<string, string> = { hero: "Hero", split: "Split", cards: "Kort", highlight: "Highlight" };
      return { title: title || "Feature Block", subtitle: `${layoutNames[subtitle] || subtitle}${eyebrow ? ` · ${eyebrow}` : ""}` };
    },
  },
});
