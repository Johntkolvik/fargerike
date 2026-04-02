import type { Metadata } from "next";
import NCSSearch from "@/components/color/NCSSearch";

export const metadata: Metadata = {
  title: "NCS-oppslag – Fargerike",
  description: "Søk etter farger med NCS-kode.",
};

export default function NCSPage() {
  return <NCSSearch />;
}
