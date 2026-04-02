"use client";

import { useState } from "react";

type Props = {
  min?: number;
  max?: number;
  initial?: number;
  onChange?: (qty: number) => void;
};

export function QuantitySelector({ min = 1, max = 20, initial = 1, onChange }: Props) {
  const [qty, setQty] = useState(initial);

  const update = (next: number) => {
    const clamped = Math.max(min, Math.min(max, next));
    setQty(clamped);
    onChange?.(clamped);
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-700">Antall</p>
      <div className="inline-flex items-center rounded-lg border border-zinc-300">
        <button
          type="button"
          onClick={() => update(qty - 1)}
          disabled={qty <= min}
          className="px-3.5 py-2.5 text-lg font-medium text-zinc-600 hover:bg-zinc-50 disabled:text-zinc-300 disabled:cursor-not-allowed rounded-l-lg"
          aria-label="Reduser antall"
        >
          −
        </button>
        <span className="min-w-[3rem] text-center text-sm font-semibold tabular-nums">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => update(qty + 1)}
          disabled={qty >= max}
          className="px-3.5 py-2.5 text-lg font-medium text-zinc-600 hover:bg-zinc-50 disabled:text-zinc-300 disabled:cursor-not-allowed rounded-r-lg"
          aria-label="Øk antall"
        >
          +
        </button>
      </div>
    </div>
  );
}
