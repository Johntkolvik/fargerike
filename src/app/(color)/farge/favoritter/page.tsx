import type { Metadata } from "next";
import Favorites from "@/components/color/Favorites";

export const metadata: Metadata = {
  title: "Mine favoritter – Fargerike",
};

export default function FavoritterPage() {
  return <Favorites />;
}
