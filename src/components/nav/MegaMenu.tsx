"use client";

import { useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/nav/config";
import { useNav } from "./NavProvider";
import { MegaMenuColumn } from "./MegaMenuColumn";

export function MegaMenu() {
  const { activeMegaMenu, closeMega } = useNav();
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    leaveTimeout.current = setTimeout(() => {
      closeMega();
    }, 150);
  }, [closeMega]);

  const columns =
    activeMegaMenu !== null ? NAV_ITEMS[activeMegaMenu]?.columns : null;

  return (
    <AnimatePresence>
      {activeMegaMenu !== null && columns && (
        <motion.div
          key={activeMegaMenu}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, exit: { duration: 0.15 } }}
          className="absolute inset-x-0 top-full z-40 border-b border-warm-200 bg-white shadow-sm"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div
              className="grid gap-8"
              style={{
                gridTemplateColumns: `repeat(${Math.min(columns.length, 4)}, minmax(0, 1fr))`,
              }}
            >
              {columns.map((col) => (
                <MegaMenuColumn key={col.heading} column={col} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
