"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

/**
 * Small, subtle toggle button for switching between standard and editorial hero layout.
 * POC/internal feature — not prominent in the UI.
 */
export function HeroVariantToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isEditorial = searchParams.get("variant") === "editorial";

  const toggle = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (isEditorial) {
      params.delete("variant");
    } else {
      params.set("variant", "editorial");
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [isEditorial, pathname, router, searchParams]);

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed top-20 right-4 z-50 flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white/90 px-3 py-1.5 text-[11px] font-medium text-zinc-500 shadow-sm backdrop-blur-sm transition-all hover:border-zinc-300 hover:text-zinc-700 hover:shadow-md"
      title={isEditorial ? "Bytt til standard layout" : "Bytt til editorial layout"}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isEditorial ? (
          // Grid icon for standard
          <>
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </>
        ) : (
          // Layout icon for editorial
          <>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </>
        )}
      </svg>
      {isEditorial ? "Standard" : "Editorial"}
    </button>
  );
}
