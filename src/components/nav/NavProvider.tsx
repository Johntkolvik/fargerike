"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

interface NavContextType {
  activeMegaMenu: number | null;
  mobileOpen: boolean;
  openMega: (index: number) => void;
  closeMega: () => void;
  toggleMobile: () => void;
}

const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [activeMegaMenu, setActiveMegaMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const openMega = useCallback((index: number) => {
    setActiveMegaMenu(index);
  }, []);

  const closeMega = useCallback(() => {
    setActiveMegaMenu(null);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  // Auto-close on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Escape key closes everything
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveMegaMenu(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <NavContext.Provider
      value={{ activeMegaMenu, mobileOpen, openMega, closeMega, toggleMobile }}
    >
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
}
