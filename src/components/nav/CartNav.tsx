"use client";

import CartDrawer from "@/components/color/CartDrawer";
import { useNav } from "./NavProvider";

/** Bridges NavProvider state to CartDrawer props (same pattern as MobileNav) */
export function CartNav() {
  const { cartOpen, toggleCart } = useNav();
  return <CartDrawer open={cartOpen} onClose={toggleCart} />;
}
