"use client";

import MobileDrawer from "./MobileDrawer";
import { useNav } from "./NavProvider";

/** Bridges NavProvider state to MobileDrawer props */
export function MobileNav() {
  const { mobileOpen, toggleMobile } = useNav();
  return <MobileDrawer open={mobileOpen} onClose={toggleMobile} />;
}
