import type { Metadata } from "next";
import colorsData from "../../../../../data/colors.json";
import type { Color } from "@/lib/color/types";
import ColorDetail from "@/components/color/ColorDetail";

const colors = colorsData as Color[];

function findColor(id: string) {
  return colors.find((c) => c.id === id) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const color = findColor(id);
  if (!color) {
    return { title: "Kulør ikke funnet" };
  }
  return {
    title: `${color.name} (${color.ncs || color.id}) – Fargerike`,
    description: color.description || `Utforsk ${color.name} – NCS ${color.ncs}. Se miljøbilder, kompatible produkter og bestill fargeprøve.`,
    openGraph: {
      title: `${color.name} – Fargerike`,
      description: color.description || `Utforsk ${color.name} fra Jotun`,
    },
  };
}

export default async function ColorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ColorDetail id={id} />;
}
