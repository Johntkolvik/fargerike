"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

interface NavContextType {
  activeMegaMenu: number | null;
  mobileOpen: boolean;
  cartOpen: boolean;
  searchOpen: boolean;
  openMega: (index: number) => void;
  closeMega: () => void;
  /** Schedule close with delay — cancelled if openMega or cancelClose is called */
  scheduleClose: () => void;
  /** Cancel a pending scheduled close */
  cancelClose: () => void;
  toggleMobile: () => void;
  toggleCart: () => void;
  toggleSearch: () => void;
}

const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [activeMegaMenu, setActiveMegaMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  }, []);

  const openMega = useCallback((index: number) => {
    cancelClose();
    setActiveMegaMenu(index);
  }, [cancelClose]);

  const closeMega = useCallback(() => {
    cancelClose();
    setActiveMegaMenu(null);
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimeout.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  }, [cancelClose]);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => {
      if (!prev) {
        setCartOpen(false);
        setSearchOpen(false);
      }
      return !prev;
    });
  }, []);

  const toggleCart = useCallback(() => {
    setCartOpen((prev) => {
      if (!prev) {
        setMobileOpen(false);
        setSearchOpen(false);
      }
      return !prev;
    });
  }, []);

  const toggleSearch = useCallback(() => {
    setSearchOpen((prev) => {
      if (!prev) {
        setMobileOpen(false);
        setCartOpen(false);
        setActiveMegaMenu(null);
      }
      return !prev;
    });
  }, []);

  // Auto-close on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setMobileOpen(false);
    setCartOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Escape key closes everything + Cmd/Ctrl+K opens search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveMegaMenu(null);
        setMobileOpen(false);
        setCartOpen(false);
        setSearchOpen(false);
      }
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSearch();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleSearch]);

  return (
    <NavContext.Provider
      value={{ activeMegaMenu, mobileOpen, cartOpen, searchOpen, openMega, closeMega, scheduleClose, cancelClose, toggleMobile, toggleCart, toggleSearch }}
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
