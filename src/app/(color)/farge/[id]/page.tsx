import type { Metadata } from "next";
import ColorDetail from "@/components/color/ColorDetail";

export const metadata: Metadata = {
  title: "Kulør – Fargerike",
};

export default async function ColorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ColorDetail id={id} />;
}
