import colorsData from "../../../data/colors.json";
import collectionsData from "../../../data/collections.json";
import familiesData from "../../../data/families.json";
import type { Color, Collection, Family } from "./types";

export const colors = colorsData as Color[];
export const collections = collectionsData as Collection[];
export const families = familiesData as Family[];
