"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

export function UtilityBar() {
  const { totalItems } = useCart();

  return (
    <div className="flex items-center gap-1">
      {/* Search */}
      <button
        type="button"
        className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg text-warm-600 transition-colors hover:text-warm-900 hover:bg-warm-100"
        aria-label="Sok"
      >
        <SearchIcon />
      </button>

      {/* Store finder */}
      <Link
        href="/butikker"
        className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg text-warm-600 transition-colors hover:text-warm-900 hover:bg-warm-100"
        aria-label="Finn butikk"
      >
        <MapPinIcon />
      </Link>

      {/* Account */}
      <Link
        href="/login"
        className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg text-warm-600 transition-colors hover:text-warm-900 hover:bg-warm-100"
        aria-label="Min side"
      >
        <UserIcon />
      </Link>

      {/* Cart — always visible */}
      <button
        type="button"
        className="relative flex items-center justify-center w-10 h-10 rounded-lg text-warm-600 transition-colors hover:text-warm-900 hover:bg-warm-100"
        aria-label={`Handlekurv${totalItems > 0 ? `, ${totalItems} varer` : ""}`}
      >
        <CartIcon />
        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-warm-900 px-1 text-[10px] font-bold leading-none text-white">
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
}
