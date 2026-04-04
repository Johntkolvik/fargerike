"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FavoritesProvider, useFavorites } from "@/context/FavoritesContext";
import { CartProvider, useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

function ColorNav() {
  const pathname = usePathname();
  const { count } = useFavorites();
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const links = [
    { href: "/farge", label: "Utforsk" },
    { href: "/farge/velger", label: "Velger" },
    { href: "/farge/fargekart", label: "Fargekart" },
    { href: "/farge/ncs", label: "NCS" },
    { href: "/farge/favoritter", label: "Favoritter" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-warm-200 bg-warm-50/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-5 py-3 sm:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-bold text-warm-900 tracking-tight">
              Fargerike
            </Link>
            <div className="hidden sm:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-warm-900 text-warm-50"
                      : "text-warm-500 hover:text-warm-900"
                  }`}
                >
                  {link.label}
                  {link.href === "/farge/favoritter" && count > 0 && (
                    <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white border border-warm-200 text-warm-600 transition-colors hover:border-warm-400"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-warm-900 text-[10px] font-bold text-warm-50">
                {totalItems}
              </span>
            )}
          </button>
        </div>
        {/* Mobile nav */}
        <div className="sm:hidden flex gap-1 overflow-x-auto px-5 pb-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-warm-900 text-warm-50"
                  : "text-warm-500 hover:text-warm-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default function ColorLayout({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <CartProvider>
        <div className="min-h-screen bg-warm-50 text-warm-700">
          <a href="#color-main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold">
            Hopp til hovedinnhold
          </a>
          <ColorNav />
          <main id="color-main">{children}</main>
        </div>
      </CartProvider>
    </FavoritesProvider>
  );
}
