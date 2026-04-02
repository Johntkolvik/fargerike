"use client";

import { useState, useEffect } from "react";

type Props = {
  productName: string;
  price: number;
  selectedColor?: string | null;
  onAddToCart?: () => void;
  disabled?: boolean;
};

export function StickyBuyBar({ productName, price, selectedColor, onAddToCart, disabled }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    const heroEl = document.getElementById("product-hero");
    if (heroEl) observer.observe(heroEl);

    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur-sm shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold truncate">{productName}</p>
          <p className="text-xs text-zinc-500">
            {selectedColor ? `Farge: ${selectedColor} · ` : ""}{price.toLocaleString("nb-NO")} kr
          </p>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <button
            type="button"
            disabled={disabled}
            onClick={onAddToCart}
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {disabled ? "Velg farge først" : "Legg i handlekurv"}
          </button>
        </div>
      </div>
    </div>
  );
}
