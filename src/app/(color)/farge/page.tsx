import type { Metadata } from "next";
import ColorBrowser from "@/components/color/ColorBrowser";

export const metadata: Metadata = {
  title: "Utforsk kulører – Fargerike",
  description:
    "Finn din farge blant Jotuns interiør- og eksteriørpaletter. Søk med navn, NCS-kode eller hex.",
};

export default function FargeExplorePage() {
  return <ColorBrowser />;
}
