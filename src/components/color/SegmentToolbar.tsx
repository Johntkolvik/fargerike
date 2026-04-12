"use client";

import { useCallback, useState } from "react";
import type { VisualizerConfig } from "@/lib/color/types";

interface Props {
  config: VisualizerConfig;
  onConfigChange: (config: Partial<VisualizerConfig>) => void;
  maskCount: number;
  onUndo: () => void;
  onClear: () => void;
  activeHex: string;
  activeColorName: string;
  onOpenColorPicker: () => void;
}

export default function SegmentToolbar({
  config,
  onConfigChange,
  maskCount,
  onUndo,
  onClear,
  activeHex,
  activeColorName,
  onOpenColorPicker,
}: Props) {
  const [showSettings, setShowSettings] = useState(false);

  const handleToleranceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onConfigChange({ tolerance: Number(e.target.value) });
    },
    [onConfigChange],
  );

  const handleOpacityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onConfigChange({ opacity: Number(e.target.value) });
    },
    [onConfigChange],
  );

  return (
    <div className="flex items-center gap-1.5">
      {/* Active color picker */}
      <button
        onClick={onOpenColorPicker}
        className="flex h-9 items-center gap-1.5 rounded-xl bg-white/10 px-2.5 text-[11px] font-medium text-white transition-colors hover:bg-white/20"
        title="Velg penselfarge"
      >
        <span className="h-4 w-4 shrink-0 rounded-full border-2 border-white/40" style={{ backgroundColor: activeHex }} />
        <span className="hidden max-w-[70px] truncate sm:inline">{activeColorName}</span>
        <svg className="h-3 w-3 shrink-0 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Mask count */}
      {maskCount > 0 && (
        <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold text-white/80">
          {maskCount}
        </span>
      )}

      {/* Undo */}
      <button
        onClick={onUndo}
        disabled={maskCount === 0}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed"
        title="Angre"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
        </svg>
      </button>

      {/* Clear */}
      <button
        onClick={onClear}
        disabled={maskCount === 0}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed"
        title="Nullstill"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Settings popover */}
      <div className="relative">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`flex h-9 items-center gap-1 rounded-xl px-2 text-[11px] font-medium transition-colors ${
            showSettings ? "bg-white/15 text-white" : "text-white/50 hover:bg-white/10 hover:text-white"
          }`}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
        </button>

        {showSettings && (
          <div className="absolute bottom-full left-0 mb-2 flex items-center gap-4 rounded-xl border border-white/15 bg-warm-900/90 px-4 py-2.5 shadow-2xl backdrop-blur-lg whitespace-nowrap">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-medium uppercase tracking-wider text-white/40">Toleranse</label>
              <input type="range" min={0} max={100} value={config.tolerance} onChange={handleToleranceChange}
                className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-white/20 accent-white" />
              <span className="w-6 text-right text-[11px] font-mono text-white/60">{config.tolerance}</span>
            </div>
            <div className="h-4 w-px bg-white/15" />
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-medium uppercase tracking-wider text-white/40">Dekning</label>
              <input type="range" min={0} max={1} step={0.05} value={config.opacity} onChange={handleOpacityChange}
                className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-white/20 accent-white" />
              <span className="w-8 text-right text-[11px] font-mono text-white/60">{Math.round(config.opacity * 100)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
