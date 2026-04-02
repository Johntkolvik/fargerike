import type { Metadata } from "next";
import ColorPicker from "@/components/color/ColorPicker";

export const metadata: Metadata = {
  title: "Fargevelger – Fargerike",
  description: "Velg produkt og finn fargen som passer.",
};

export default function VelgerPage() {
  return <ColorPicker />;
}
