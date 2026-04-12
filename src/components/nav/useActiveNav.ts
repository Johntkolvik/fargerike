import { NAV_ITEMS } from "@/lib/nav/config";

/**
 * Returns the index of the NavItem that matches the current pathname, or null.
 *
 * Nav items (7): Farger, Maling, Tapet & Gulv, Solskjerming, Inspirasjon, Tips, Tjenester
 */
export function useActiveNav(pathname: string): number | null {
  if (pathname === "/") return null;

  const prefixMap: [string, number][] = [
    ["/farge", 0],
    ["/maling", 1],
    ["/tapet", 2],
    ["/gulv", 2],
    ["/solskjerming", 3],
    ["/inspirasjon", 4],
    ["/tips", 5],
    ["/tjenester", 6],
    ["/kundeservice", 6],
  ];

  for (const [prefix, index] of prefixMap) {
    if (pathname === prefix || pathname.startsWith(prefix + "/")) {
      return index;
    }
  }

  // Fallback: check each NavItem's href
  for (let i = 0; i < NAV_ITEMS.length; i++) {
    const { href } = NAV_ITEMS[i];
    if (pathname === href || pathname.startsWith(href + "/")) {
      return i;
    }
  }

  return null;
}
