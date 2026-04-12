import { NAV_ITEMS } from "@/lib/nav/config";

/**
 * Returns the index of the NavItem that matches the current pathname, or null.
 *
 * Special cases:
 * - "/" returns null (no nav item highlighted on homepage)
 * - "/farge/*" matches "Farger" (index 0)
 * - "/maling/*" matches "Maling" (index 1)
 * - "/tapet/*" or "/gulv/*" matches "Tapet & Gulv" (index 2)
 * - "/inspirasjon/*" matches "Inspirasjon" (index 3)
 * - "/tips/*" matches "Tips" (index 4)
 * - "/tjenester/*" or "/kundeservice/*" matches "Tjenester" (index 5)
 */
export function useActiveNav(pathname: string): number | null {
  if (pathname === "/") return null;

  // Map of path prefixes to nav item indices.
  // Some items cover multiple prefixes (e.g. "Tapet & Gulv" covers both /tapet and /gulv).
  const prefixMap: [string, number][] = [
    ["/farge", 0],
    ["/maling", 1],
    ["/tapet", 2],
    ["/gulv", 2],
    ["/inspirasjon", 3],
    ["/tips", 4],
    ["/tjenester", 5],
    ["/kundeservice", 5],
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
