import type { NavItem, UtilityItem } from "./types";

/**
 * Hovednavigasjon — 6 items basert på IA-anbefaling (02-krav/ia-anbefaling.md).
 *
 * Lenker er placeholder-URLer som oppdateres når komplett søkedata foreligger.
 * Strukturen (items, kolonner, labels) er det endelige rammeverket.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Farger",
    href: "/farge",
    columns: [
      {
        heading: "Utforsk",
        links: [
          { label: "Alle farger", href: "/farge" },
          { label: "Fargevelger", href: "/farge/velger" },
          { label: "Populære farger", href: "/farge?sort=popular" },
          { label: "Årets farge 2026", href: "/farge/arets-farge", badge: "Ny" },
        ],
      },
      {
        heading: "Fargekart",
        links: [
          { label: "Jotun Interiør", href: "/farge/fargekart" },
          { label: "Jotun Eksteriør", href: "/farge/fargekart?type=exterior" },
          { label: "Trendkolleksjoner", href: "/farge/fargekart?type=trend" },
          { label: "Nuances 2025", href: "/farge/fargekart?collection=nuances-2025" },
        ],
      },
      {
        heading: "Verktøy",
        links: [
          { label: "NCS-søk", href: "/farge/ncs" },
          { label: "Fargekalkulator", href: "/farge/velger" },
        ],
      },
    ],
  },
  {
    label: "Maling",
    href: "/maling",
    columns: [
      {
        heading: "Innendørs",
        links: [
          { label: "Vegg & tak", href: "/maling/inne" },
          { label: "Gulvmaling", href: "/maling/inne/gulv" },
          { label: "Grunning", href: "/maling/inne/grunning" },
          { label: "Våtrom", href: "/maling/inne/vatrom" },
          { label: "Beis & olje", href: "/maling/beis" },
        ],
      },
      {
        heading: "Utendørs",
        links: [
          { label: "Tre & fasade", href: "/maling/ute" },
          { label: "Terrassebeis", href: "/maling/ute/terrassebeis" },
          { label: "Grunning & impregnering", href: "/maling/ute/grunning" },
          { label: "Murmaling", href: "/maling/ute/mur" },
          { label: "Båtpleie", href: "/maling/ute/bat" },
          { label: "Metall & rust", href: "/maling/ute/metall" },
        ],
      },
      {
        heading: "Merker",
        links: [
          { label: "Jotun Lady", href: "/maling?brand=lady" },
          { label: "Jotun Drygolin", href: "/maling?brand=drygolin" },
          { label: "Butinox", href: "/maling?brand=butinox" },
          { label: "Beckers", href: "/maling?brand=beckers" },
        ],
      },
      {
        heading: "Utstyr",
        links: [
          { label: "Pensler", href: "/maling/utstyr/pensler" },
          { label: "Malerruller", href: "/maling/utstyr/ruller" },
          { label: "Tape & maskering", href: "/maling/utstyr/tape" },
          { label: "Alt maleutstyr", href: "/maling/utstyr" },
        ],
      },
    ],
  },
  {
    label: "Tapet & Gulv",
    href: "/tapet",
    columns: [
      {
        heading: "Tapet",
        links: [
          { label: "Vinyltapet", href: "/tapet/vinyl" },
          { label: "Fibertapet", href: "/tapet/fiber" },
          { label: "Overmalbar tapet", href: "/tapet/overmalbar" },
          { label: "Veggbekledning", href: "/tapet/veggbekledning" },
        ],
      },
      {
        heading: "Gulv",
        links: [
          { label: "Vinyl & klikkvinyl", href: "/gulv/vinyl" },
          { label: "Laminat", href: "/gulv/laminat" },
          { label: "Parkett", href: "/gulv/parkett" },
          { label: "Teppe", href: "/gulv/teppe" },
        ],
      },
    ],
  },
  {
    label: "Solskjerming",
    href: "/solskjerming",
    columns: [
      {
        heading: "Innvendig",
        links: [
          { label: "Duettegardiner", href: "/solskjerming/duette" },
          { label: "Plisségardiner", href: "/solskjerming/plisse" },
          { label: "Liftgardiner", href: "/solskjerming/lift" },
          { label: "Rullegardiner", href: "/solskjerming/rulle" },
          { label: "Lamellgardiner", href: "/solskjerming/lamell" },
          { label: "Persienner", href: "/solskjerming/persienner" },
        ],
      },
      {
        heading: "Utvendig",
        links: [
          { label: "Utvendig solskjerming", href: "/solskjerming/utvendig" },
          { label: "Screens", href: "/solskjerming/screens" },
        ],
      },
      {
        heading: "Tjenester",
        links: [
          { label: "Gratis oppmåling", href: "/solskjerming/oppmaaling" },
          { label: "Montering", href: "/solskjerming/montering" },
          { label: "Bestill hjemmebesøk", href: "/tjenester/hjemmebesok" },
        ],
      },
    ],
  },
  {
    label: "Inspirasjon",
    href: "/inspirasjon",
    columns: [
      {
        heading: "Etter rom",
        links: [
          { label: "Stue", href: "/inspirasjon/rom/stue" },
          { label: "Soverom", href: "/inspirasjon/rom/soverom" },
          { label: "Kjøkken", href: "/inspirasjon/rom/kjokken" },
          { label: "Bad", href: "/inspirasjon/rom/bad" },
          { label: "Barnerom", href: "/inspirasjon/rom/barnerom" },
        ],
      },
      {
        heading: "Prosjekter",
        links: [
          { label: "Male terrasse", href: "/inspirasjon/prosjekt/terrasse" },
          { label: "Oppussing bad", href: "/inspirasjon/prosjekt/bad" },
          { label: "Fasadeoppgradering", href: "/inspirasjon/prosjekt/fasade" },
          { label: "Barnerom", href: "/inspirasjon/prosjekt/barnerom" },
        ],
      },
      {
        heading: "Trender",
        links: [
          { label: "Årets farge", href: "/farge/arets-farge" },
          { label: "Nuances 2025", href: "/inspirasjon/trender/nuances-2025" },
          { label: "Sesong: vår", href: "/inspirasjon/trender/var" },
        ],
      },
    ],
  },
  {
    label: "Tips",
    href: "/tips",
    columns: [
      {
        heading: "Male inne",
        links: [
          { label: "Forberedelse", href: "/tips/male-inne/forberedelse" },
          { label: "Velge riktig maling", href: "/tips/male-inne/velge-maling" },
          { label: "Fargevalg", href: "/tips/male-inne/fargevalg" },
          { label: "Maleteknikk", href: "/tips/male-inne/teknikk" },
        ],
      },
      {
        heading: "Male ute",
        links: [
          { label: "Terrassevedlikehold", href: "/tips/male-ute/terrasse" },
          { label: "Fasademaling", href: "/tips/male-ute/fasade" },
          { label: "Beis & olje", href: "/tips/male-ute/beis" },
          { label: "Rengjøring", href: "/tips/male-ute/rengjoring" },
        ],
      },
      {
        heading: "Overflater",
        links: [
          { label: "Tapetsering", href: "/tips/tapetsere" },
          { label: "Gulvlegging", href: "/tips/gulvlegging" },
          { label: "Sparkling & grunning", href: "/tips/sparkling" },
        ],
      },
    ],
  },
  {
    label: "Tjenester",
    href: "/tjenester",
    columns: [
      {
        heading: "Fargekonsultasjon",
        links: [
          { label: "Book time (gratis)", href: "/tjenester/fargekonsultasjon" },
          { label: "Digitalt fargevalg", href: "/tjenester/digitalt-fargevalg" },
        ],
      },
      {
        heading: "Hjemmebesøk",
        links: [
          { label: "Vi kommer hjem til deg", href: "/tjenester/hjemmebesok" },
          { label: "Fargeforandringstjeneste", href: "/tjenester/fargeforandring" },
        ],
      },
      {
        heading: "Praktisk",
        links: [
          { label: "Frakt & levering", href: "/kundeservice/frakt" },
          { label: "Kundeservice", href: "/kundeservice" },
        ],
      },
    ],
  },
];

export const UTILITY_ITEMS: UtilityItem[] = [
  { label: "Søk", href: "/sok", icon: "search", action: "modal" },
  { label: "Finn butikk", href: "/butikker", icon: "store", action: "link" },
  { label: "Min side", href: "/login", icon: "account", action: "link" },
  { label: "Handlekurv", href: "#", icon: "cart", action: "drawer" },
];
