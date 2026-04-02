import type { Metadata } from "next";
import Collections from "@/components/color/Collections";

export const metadata: Metadata = {
  title: "Fargekart – Fargerike",
  description: "Utforsk kuraterte fargesamlinger og trendkolleksjoner.",
};

export default function FargekartPage() {
  return <Collections />;
}
