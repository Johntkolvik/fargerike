import type { Metadata } from "next";
import { Breadcrumb } from "@/components/pdp/Breadcrumb";
import ColorBrowser from "@/components/color/ColorBrowser";

export const metadata: Metadata = {
  title: "Utforsk kulører – Fargerike",
  description:
    "Finn din farge blant Jotuns interiør- og eksteriørpaletter. Søk med navn, NCS-kode eller hex.",
};

export default function FargeExplorePage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-4 sm:px-8">
        <Breadcrumb items={[
          { label: "Hjem", href: "/" },
          { label: "Farger" },
        ]} />
      </div>
      <ColorBrowser />
    </>
  );
}
