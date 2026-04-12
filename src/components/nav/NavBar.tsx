"use client";

import { useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav/config";
import { useNav } from "./NavProvider";
import { useActiveNav } from "./useActiveNav";

export function NavBar() {
  const pathname = usePathname();
  const activeIndex = useActiveNav(pathname);
  const { activeMegaMenu, openMega, closeMega } = useNav();
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnterNav = useCallback(() => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
  }, []);

  const handleMouseLeaveNav = useCallback(() => {
    leaveTimeout.current = setTimeout(() => {
      closeMega();
    }, 150);
  }, [closeMega]);

  const handleMouseEnterItem = useCallback(
    (index: number) => {
      if (leaveTimeout.current) {
        clearTimeout(leaveTimeout.current);
        leaveTimeout.current = null;
      }
      openMega(index);
    },
    [openMega]
  );

  return (
    <nav
      className="hidden lg:flex items-center gap-1"
      onMouseEnter={handleMouseEnterNav}
      onMouseLeave={handleMouseLeaveNav}
    >
      {NAV_ITEMS.map((item, i) => {
        const isActive = activeIndex === i;
        const isMegaOpen = activeMegaMenu === i;

        return (
          <button
            key={item.label}
            type="button"
            onMouseEnter={() => handleMouseEnterItem(i)}
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
            {/* Active indicator bar */}
            {isActive && (
              <span className="absolute inset-x-3 -bottom-[1px] h-0.5 bg-warm-900" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
