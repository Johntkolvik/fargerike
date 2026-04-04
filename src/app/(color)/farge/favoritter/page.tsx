import type { Metadata } from "next";
import Favorites from "@/components/color/Favorites";

export const metadata: Metadata = {
  title: "Mine favoritter – Fargerike",
  description: "Dine lagrede kulører. Sammenlign farger og finn den perfekte til ditt prosjekt.",
  robots: "noindex",
};

export default function FavoritterPage() {
  return <Favorites />;
}
