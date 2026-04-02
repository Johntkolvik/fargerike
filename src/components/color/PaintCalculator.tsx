"use client";

import { useState, useEffect } from "react";

interface Props {
  coverage: string;
  products: { fillLevel: string; priceNOK: number; productCode: string }[];
  onSelectVolume: (fillLevel: string) => void;
  colorName: string;
}

function parseCoverage(s: string): number {
  const nums = s.match(/(\d+)/g);
  if (!nums) return 9;
  if (nums.length >= 2) return (parseInt(nums[0]) + parseInt(nums[1])) / 2;
  return parseInt(nums[0]);
}

export default function PaintCalculator({ coverage, products, colorName }: Props) {
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState(20);
  const [coats, setCoats] = useState(2);

  const coveragePerLiter = parseCoverage(coverage);
  const litersNeeded = (area * coats) / coveragePerLiter;

  function autoRecommend(): Record<string, number> {
    const sorted = [...products].sort(
      (a, b) => parseFloat(b.fillLevel) - parseFloat(a.fillLevel)
    );
    let remaining = litersNeeded;
    const picks: Record<string, number> = {};
    for (const p of products) picks[p.fillLevel] = 0;

    for (const p of sorted) {
      const vol = parseFloat(p.fillLevel);
      if (vol <= 0) continue;
      const count = Math.floor(remaining / vol);
      if (count > 0) {
        picks[p.fillLevel] = count;
        remaining -= count * vol;
      }
    }
    if (remaining > 0.1 && sorted.length > 0) {
      const smallest = sorted[sorted.length - 1];
      picks[smallest.fillLevel] = (picks[smallest.fillLevel] || 0) + 1;
    }
    return picks;
  }

  const [quantities, setQuantities] = useState<Record<string, number>>(() => autoRecommend());

  useEffect(() => {
    setQuantities(autoRecommend());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area, coats]);

  const totalLiters = products.reduce(
    (sum, p) => sum + (quantities[p.fillLevel] || 0) * parseFloat(p.fillLevel),
    0
  );
  const totalPrice = products.reduce(
    (sum, p) => sum + (quantities[p.fillLevel] || 0) * p.priceNOK,
    0
  );
  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

  function adjustQty(fillLevel: string, delta: number) {
    setQuantities((prev) => ({
      ...prev,
      [fillLevel]: Math.max(0, (prev[fillLevel] || 0) + delta),
    }));
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border border-warm-200 bg-white px-4 py-3 text-left transition-colors hover:border-warm-400"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warm-100 text-warm-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008H15.75v-.008zm0 2.25h.008v.008H15.75V13.5zM15.75 18v.008h.008V18h-.008z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-warm-900">Malingskalkulator</div>
              <div className="text-xs text-warm-400">Hvor mye trenger du?</div>
            </div>
          </div>
          <svg className="h-5 w-5 text-warm-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-warm-200 bg-white p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-warm-900">Malingskalkulator</div>
        <button onClick={() => setOpen(false)} className="text-warm-400 hover:text-warm-600">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-warm-500">Veggflate</label>
          <span className="text-sm font-semibold text-warm-900">{area} m²</span>
        </div>
        <input
          type="range"
          min={5}
          max={100}
          step={1}
          value={area}
          onChange={(e) => setArea(Number(e.target.value))}
          className="w-full accent-warm-900"
        />
        <div className="flex justify-between text-[10px] text-warm-400 mt-1">
          <span>5 m²</span>
          <span>Lite rom ~15</span>
          <span>Stort rom ~40</span>
          <span>100 m²</span>
        </div>
      </div>

      <div>
        <label className="text-xs text-warm-500 mb-2 block">Antall strøk</label>
        <div className="flex gap-2">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => setCoats(n)}
              className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${
                coats === n
                  ? "border-warm-900 bg-warm-900 text-warm-50"
                  : "border-warm-300 text-warm-600 hover:border-warm-500"
              }`}
            >
              {n} strøk
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-warm-50 px-4 py-3">
        <div className="text-xs text-warm-500">
          Du trenger ca. <span className="font-semibold text-warm-800">{litersNeeded.toFixed(1)} liter</span> {colorName}
        </div>
        <div className="text-[11px] text-warm-400">
          ({area} m² &times; {coats} strøk &divide; {coveragePerLiter} m²/L dekkevne)
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wider text-warm-400 font-medium mb-3">
          Velg antall spann
        </div>
        <div className="space-y-2">
          {products.map((p) => {
            const qty = quantities[p.fillLevel] || 0;
            return (
              <div
                key={p.productCode}
                className="flex items-center justify-between rounded-lg border border-warm-200 px-3 py-2"
              >
                <div>
                  <div className="text-sm font-medium text-warm-900">{p.fillLevel}L</div>
                  <div className="text-xs text-warm-400">{p.priceNOK},- per stk</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => adjustQty(p.fillLevel, -1)}
                    disabled={qty === 0}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-warm-300 text-warm-600 transition-colors hover:bg-warm-100 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-warm-900">{qty}</span>
                  <button
                    onClick={() => adjustQty(p.fillLevel, 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-warm-300 text-warm-600 transition-colors hover:bg-warm-100"
                  >
                    +
                  </button>
                  {qty > 0 && (
                    <span className="ml-1 text-sm font-semibold text-warm-900 w-16 text-right">
                      {(qty * p.priceNOK).toLocaleString("nb-NO")},-
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {totalItems > 0 && (
        <div className="border-t border-warm-200 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-warm-500">
                {totalItems} spann &middot; {totalLiters.toFixed(1)}L totalt
              </div>
              {totalLiters >= litersNeeded ? (
                <div className="text-xs text-green-600 mt-0.5">Dekker behovet ditt</div>
              ) : (
                <div className="text-xs text-amber-600 mt-0.5">
                  Mangler {(litersNeeded - totalLiters).toFixed(1)}L
                </div>
              )}
            </div>
            <div className="text-2xl font-bold text-warm-900">
              {totalPrice.toLocaleString("nb-NO")},-
            </div>
          </div>
          <button className="w-full rounded-xl bg-warm-900 py-3.5 text-sm font-semibold text-warm-50 transition-colors hover:bg-warm-800">
            Legg alt i handlekurv
          </button>
        </div>
      )}
    </div>
  );
}
