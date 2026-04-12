"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav/config";
import { useNav } from "./NavProvider";
import { useActiveNav } from "./useActiveNav";

export function NavBar() {
  const pathname = usePathname();
  const activeIndex = useActiveNav(pathname);
  const { activeMegaMenu, openMega, scheduleClose, cancelClose } = useNav();

  return (
    <nav
      className="hidden lg:flex items-center gap-1"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      {NAV_ITEMS.map((item, i) => {
        const isActive = activeIndex === i;
        const isMegaOpen = activeMegaMenu === i;

        return (
          <button
            key={item.label}
            type="button"
            onMouseEnter={() => openMega(i)}
            className={[
              "relative px-3 py-2 text-sm transition-colors",
              isActive
                ? "font-semibold text-warm-900"
                : "text-warm-600 hover:text-warm-900",
              isMegaOpen && !isActive ? "text-warm-900" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-expanded={isMegaOpen}
            aria-haspopup="true"
          >
            {item.label}
            {isActive && (
              <span className="absolute inset-x-3 -bottom-[1px] h-0.5 bg-warm-900" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
