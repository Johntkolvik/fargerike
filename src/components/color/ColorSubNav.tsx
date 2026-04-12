"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";

const links = [
  { href: "/farge", label: "Farger" },
  { href: "/farge/favoritter", label: "Favoritter" },
];

/**
 * Horizontal pill-tab sub-navigation for the color section (/farge/*).
 *
 * Designed to sit directly below SiteHeader (64px / h-16), so it uses
 * `sticky top-16 z-30`. On mobile the tabs scroll horizontally;
 * on desktop they are centered inside a max-w-7xl container.
 *
 * Requires FavoritesProvider to be mounted above this component
 * (typically in the (color)/farge/layout.tsx).
 */
export default function ColorSubNav() {
  const pathname = usePathname();
  const { count } = useFavorites();

  return (
    <nav
      aria-label="Fargenavigasjon"
      className="sticky top-16 z-30 border-b border-warm-200 bg-warm-50/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile: horizontal scroll, no wrapping */}
        {/* Desktop: centered row */}
        <div className="flex items-center gap-1 overflow-x-auto py-3 sm:justify-center sm:overflow-x-visible">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
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
            );
          })}
        </div>
      </div>
    </nav>
  );
}
