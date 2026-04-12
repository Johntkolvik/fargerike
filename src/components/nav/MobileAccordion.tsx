"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { NavItem } from "@/lib/nav/types";

interface MobileAccordionProps {
  item: NavItem;
  onLinkClick: () => void;
}

export default function MobileAccordion({
  item,
  onLinkClick,
}: MobileAccordionProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = pathname.startsWith(item.href);

  return (
    <div className="border-b border-warm-100">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between px-5 py-4 text-left text-base font-medium transition-colors ${
          isActive ? "text-warm-900" : "text-warm-700"
        }`}
        aria-expanded={open}
      >
        <span>{item.label}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="h-5 w-5 shrink-0 text-warm-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4">
              {item.columns.map((column) => (
                <div key={column.heading}>
                  <h4 className="mb-2 mt-4 text-xs font-semibold uppercase text-warm-400">
                    {column.heading}
                  </h4>
                  <ul className="space-y-0.5">
                    {column.links.map((link) => {
                      const linkActive = pathname === link.href;
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={onLinkClick}
                            className={`flex items-center gap-2 rounded-lg py-2 text-base transition-colors ${
                              linkActive
                                ? "font-medium text-warm-900"
                                : "text-warm-700 active:bg-warm-50"
                            }`}
                          >
                            {link.label}
                            {link.badge && (
                              <span className="rounded-full bg-warm-900 px-2 py-0.5 text-[10px] font-semibold uppercase text-warm-50">
                                {link.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
