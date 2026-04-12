"use client";

import SearchOverlay from "./SearchOverlay";
import { useNav } from "./NavProvider";

/** Bridges NavProvider state to SearchOverlay props (same pattern as MobileNav/CartNav) */
export function SearchNav() {
  const { searchOpen, toggleSearch } = useNav();
  return <SearchOverlay open={searchOpen} onClose={toggleSearch} />;
}
