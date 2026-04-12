"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, UTILITY_ITEMS } from "@/lib/nav/config";
import MobileAccordion from "./MobileAccordion";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen slide-from-LEFT mobile navigation drawer.
 * Right side is reserved for CartDrawer.
 *
 * Accepts open/onClose props so it can be driven by NavProvider or any parent.
 */
export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  // --- Body scroll lock ---
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  // --- Close on Escape ---
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  // Utility items to show at the bottom (store + account, not search/cart)
  const bottomUtility = UTILITY_ITEMS.filter(
    (u) => u.icon === "store" || u.icon === "account",
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel — slides from left */}
          <motion.aside
            key="mobile-drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-[380px] flex-col bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigasjonsmeny"
          >
            {/* --- Header: close button --- */}
            <div className="flex items-center justify-between border-b border-warm-100 px-5 py-4">
              <span className="text-sm font-semibold text-warm-900">Meny</span>
              <button
                onClick={onClose}
                aria-label="Lukk meny"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-50 text-warm-600 transition-colors hover:bg-warm-100"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* --- Search placeholder --- */}
            <div className="border-b border-warm-100 px-5 py-3">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <input
                  type="search"
                  placeholder="Sok etter farger, produkter..."
                  aria-label="Sok etter farger og produkter"
                  autoComplete="off"
                  data-1p-ignore="true"
                  data-lpignore="true"
                  data-form-type="other"
                  className="w-full rounded-lg border border-warm-200 bg-warm-50 py-2.5 pl-10 pr-4 text-sm text-warm-700 placeholder:text-warm-400 focus:border-warm-400 focus:outline-none focus:ring-1 focus:ring-warm-400"
                  readOnly
                />
              </div>
            </div>

            {/* --- Scrollable nav items --- */}
            <nav className="flex-1 overflow-y-auto overscroll-contain">
              {NAV_ITEMS.map((item) => (
                <MobileAccordion
                  key={item.label}
                  item={item}
                  onLinkClick={onClose}
                />
              ))}
            </nav>

            {/* --- Bottom utility links --- */}
            <div className="border-t border-warm-100 px-5 py-4">
              <ul className="space-y-1">
                {bottomUtility.map((util) => (
                  <li key={util.label}>
                    <Link
                      href={util.href}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium text-warm-700 transition-colors active:bg-warm-50"
                    >
                      <UtilityIcon icon={util.icon} />
                      {util.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Small icon helper (keeps the main component clean)
// ---------------------------------------------------------------------------
function UtilityIcon({ icon }: { icon: string }) {
  const cls = "h-5 w-5 text-warm-500";

  switch (icon) {
    case "store":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      );
    case "account":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      );
    default:
      return null;
  }
}
