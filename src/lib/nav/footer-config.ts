import type { FooterConfig } from "./types";

export const FOOTER_CONFIG: FooterConfig = {
  sections: [
    {
      heading: "Kundeservice",
      links: [
        { label: "Kontakt oss", href: "/kundeservice" },
        { label: "Frakt & levering", href: "/kundeservice/frakt" },
        { label: "Retur & reklamasjon", href: "/kundeservice/retur" },
        { label: "Ofte stilte spørsmål", href: "/kundeservice/faq" },
      ],
    },
    {
      heading: "Produkter",
      links: [
        { label: "Maling", href: "/maling" },
        { label: "Tapet", href: "/tapet" },
        { label: "Gulv", href: "/gulv" },
        { label: "Farger", href: "/farge" },
        { label: "Solskjerming", href: "/tilbehor/solskjerming" },
      ],
    },
    {
      heading: "Inspirasjon & Tips",
      links: [
        { label: "Inspirasjon", href: "/inspirasjon" },
        { label: "Tips & råd", href: "/tips" },
        { label: "Årets farge", href: "/farge/arets-farge" },
        { label: "Trender", href: "/inspirasjon/trender" },
      ],
    },
    {
      heading: "Om Fargerike",
      links: [
        { label: "Om oss", href: "/om-fargerike" },
        { label: "Finn butikk", href: "/butikker" },
        { label: "Karriere", href: "/karriere" },
        { label: "Presse", href: "/presse" },
      ],
    },
  ],
  socialLinks: [
    { platform: "facebook", url: "https://facebook.com/fargerike" },
    { platform: "instagram", url: "https://instagram.com/fargerike" },
    { platform: "pinterest", url: "https://pinterest.com/fargerike" },
  ],
  newsletter: {
    heading: "Få inspirasjon rett i innboksen",
    description: "Tips, trender og eksklusive tilbud fra Fargerike.",
  },
};
