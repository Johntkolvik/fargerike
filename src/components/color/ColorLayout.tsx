"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FavoritesProvider, useFavorites } from "@/context/FavoritesContext";
import { CartProvider } from "@/context/CartContext";

/**
 * @deprecated Use SiteHeader + ColorSubNav instead (see src/app/(color)/farge/layout.tsx).
 * CartDrawer is now rendered site-wide via CartNav in SiteHeader.
 */
function ColorNav() {
  const pathname = usePathname();
  const { count } = useFavorites();

  const links = [
    { href: "/farge", label: "Utforsk" },
    { href: "/farge/velger", label: "Velger" },
    { href: "/farge/fargekart", label: "Fargekart" },
    { href: "/farge/ncs", label: "NCS" },
    { href: "/farge/favoritter", label: "Favoritter" },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-warm-200 bg-warm-50/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-5 py-3 sm:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fargerike_logo.svg" alt="Fargerike" className="h-6" />
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
