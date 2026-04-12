/**
 * Human-readable labels for URL segments used in mega-menu landing pages.
 * Used for breadcrumbs, page titles, and metadata when Sanity has no content.
 *
 * Structure: sectionSlug -> segmentSlug -> label
 */

export const SECTION_META: Record<
  string,
  { title: string; description: string }
> = {
  maling: {
    title: "Maling",
    description:
      "Utforsk hele sortimentet av maling for inne og ute. Finn riktig produkt for ditt prosjekt.",
  },
  tapet: {
    title: "Tapet",
    description:
      "Oppdag tapet i alle stiler. Vinyl, fiber, overmalbar og veggbekledning.",
  },
  gulv: {
    title: "Gulv",
    description:
      "Finn det perfekte gulvet. Vinyl, laminat, parkett og teppe fra kjente merker.",
  },
  solskjerming: {
    title: "Solskjerming",
    description:
      "Gardiner og solskjerming for inne og ute. Gratis oppmaaling og montering.",
  },
  inspirasjon: {
    title: "Inspirasjon",
    description:
      "La deg inspirere. Utforsk rom, prosjekter og trender for ditt neste oppussingsprosjekt.",
  },
  tips: {
    title: "Tips og guider",
    description:
      "Praktiske tips og steg-for-steg guider for maling, tapetsering, gulvlegging og mer.",
  },
  tjenester: {
    title: "Tjenester",
    description:
      "Utforsk vare tjenester. Fargekonsultasjon, hjemmebesok og digitalt fargevalg.",
  },
  kundeservice: {
    title: "Kundeservice",
    description:
      "Vi hjelper deg. Finn svar paa vanlige sporsmal om frakt, levering og bestilling.",
  },
};

export const SEGMENT_LABELS: Record<string, string> = {
  // Maling
  inne: "Innendors",
  ute: "Utendors",
  gulv: "Gulvmaling",
  grunning: "Grunning",
  vatrom: "Vatrom",
  terrassebeis: "Terrassebeis",
  mur: "Murmaling",
  bat: "Batpleie",
  metall: "Metall og rust",
  beis: "Beis og olje",
  utstyr: "Maleutstyr",
  pensler: "Pensler",
  ruller: "Malerruller",
  tape: "Tape og maskering",

  // Tapet
  vinyl: "Vinyl",
  fiber: "Fibertapet",
  overmalbar: "Overmalbar tapet",
  veggbekledning: "Veggbekledning",

  // Gulv (vinyl reused above)
  laminat: "Laminat",
  parkett: "Parkett",
  teppe: "Teppe",

  // Solskjerming
  duette: "Duettegardiner",
  plisse: "Plissegardiner",
  lift: "Liftgardiner",
  rulle: "Rullegardiner",
  lamell: "Lamellgardiner",
  persienner: "Persienner",
  utvendig: "Utvendig solskjerming",
  screens: "Screens",
  oppmaaling: "Gratis oppmaaling",
  montering: "Montering",

  // Inspirasjon
  rom: "Etter rom",
  prosjekt: "Prosjekter",
  trender: "Trender",
  stue: "Stue",
  soverom: "Soverom",
  kjokken: "Kjokken",
  bad: "Bad",
  barnerom: "Barnerom",
  terrasse: "Terrasse",
  fasade: "Fasade",

  // Tips
  "male-inne": "Male inne",
  "male-ute": "Male ute",
  tapetsere: "Tapetsering",
  gulvlegging: "Gulvlegging",
  sparkling: "Sparkling og grunning",
  forberedelse: "Forberedelse",
  "velge-maling": "Velge riktig maling",
  fargevalg: "Fargevalg",
  teknikk: "Maleteknikk",
  rengjoring: "Rengjoring",

  // Tjenester
  fargekonsultasjon: "Fargekonsultasjon",
  "digitalt-fargevalg": "Digitalt fargevalg",
  hjemmebesok: "Hjemmebesok",
  fargeforandring: "Fargeforandringstjeneste",

  // Kundeservice
  frakt: "Frakt og levering",
};

/**
 * Get a human-readable title for a URL segment, falling back to
 * capitalizing the slug if not found in the label map.
 */
export function getSegmentLabel(segment: string): string {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  // Capitalize first letter, replace hyphens with spaces
  const cleaned = segment.replace(/-/g, " ");
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}
