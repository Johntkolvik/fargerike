import type { Metadata } from "next";
import ColorExplorer from "@/components/color/ColorExplorer";

export const metadata: Metadata = {
  title: "Utforsk kulører – Fargerike",
  description: "Finn din farge blant Jotuns interiør- og eksteriørpaletter.",
};

export default function FargeExplorePage() {
  return <ColorExplorer />;
}
