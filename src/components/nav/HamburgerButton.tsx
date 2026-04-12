"use client";

import { useNav } from "./NavProvider";

export function HamburgerButton() {
  const { mobileOpen, toggleMobile } = useNav();

  return (
    <button
      type="button"
      className="flex items-center justify-center w-10 h-10 rounded-lg text-warm-600 transition-colors hover:text-warm-900 hover:bg-warm-100 lg:hidden"
      onClick={toggleMobile}
      aria-label={mobileOpen ? "Lukk meny" : "Apne meny"}
      aria-expanded={mobileOpen}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        {mobileOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
}
