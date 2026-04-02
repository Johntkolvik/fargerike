"use client";

import { useState } from "react";

type Props = {
  productName: string;
  disabled?: boolean;
  missingSelection?: string;
};

export function AddToCartButton({ productName, disabled, missingSelection }: Props) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`w-full rounded-full py-3.5 text-sm font-semibold transition-all ${
          added
            ? "bg-green-600 text-white"
            : disabled
              ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
              : "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98]"
        }`}
      >
        {added ? (
          <span className="flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Lagt til
          </span>
        ) : disabled && missingSelection ? (
          `Velg ${missingSelection} først`
        ) : (
          `Legg i handlekurv`
        )}
      </button>
      {!disabled && (
        <p className="mt-2 text-center text-xs text-zinc-500">
          Hentes i butikk · Fri frakt til butikk
        </p>
      )}
    </div>
  );
}
