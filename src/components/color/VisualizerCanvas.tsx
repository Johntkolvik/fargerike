"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import type { MaskRegion, VisualizerConfig } from "@/lib/color/types";
import { floodFill } from "@/lib/visualizer/floodFill";
import { applyMultipleColorsToMasks } from "@/lib/visualizer/colorBlend";

interface Props {
  image: HTMLImageElement;
  activeHex: string;
  masks: MaskRegion[];
  config: VisualizerConfig;
  onAddMask: (mask: Uint8Array, clickPoint: { x: number; y: number }, hex: string) => void;
  onRemoveMask: (id: string) => void;
  onChangeMaskColor: (id: string, hex: string) => void;
  onOpenColorPicker: (maskId: string) => void;
}

export default function VisualizerCanvas({
  image,
  activeHex,
  masks,
  config,
  onAddMask,
  onRemoveMask,
  onChangeMaskColor,
  onOpenColorPicker,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const highlightCanvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const [selectedDot, setSelectedDot] = useState<string | null>(null);
  const hasShownPopoverRef = useRef(false);

  const imgWidth = image.naturalWidth || image.width;
  const imgHeight = image.naturalHeight || image.height;

  // Draw the original image on the base canvas
  useEffect(() => {
    const canvas = baseCanvasRef.current;
    if (!canvas) return;
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(image, 0, 0, imgWidth, imgHeight);
  }, [image, imgWidth, imgHeight]);

  // Draw color overlay
  useEffect(() => {
    const overlayCanvas = overlayCanvasRef.current;
    const baseCanvas = baseCanvasRef.current;
    if (!overlayCanvas || !baseCanvas) return;
    overlayCanvas.width = imgWidth;
    overlayCanvas.height = imgHeight;
    const overlayCtx = overlayCanvas.getContext("2d");
    if (!overlayCtx) return;
    overlayCtx.clearRect(0, 0, imgWidth, imgHeight);
    if (masks.length === 0) return;

    const baseCtx = baseCanvas.getContext("2d");
    if (!baseCtx) return;
    const originalData = baseCtx.getImageData(0, 0, imgWidth, imgHeight);
    const maskEntries = masks.map((m) => ({ mask: m.mask, hex: m.hex }));
    const coloredData = applyMultipleColorsToMasks(originalData, maskEntries, config.opacity, config.blendMode);

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      overlayCtx.putImageData(coloredData, 0, 0);
    });
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [masks, config, imgWidth, imgHeight]);

  // Draw highlight for selected mask
  useEffect(() => {
    const canvas = highlightCanvasRef.current;
    if (!canvas) return;
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, imgWidth, imgHeight);

    if (!selectedDot) return;
    const mask = masks.find((m) => m.id === selectedDot);
    if (!mask) return;

    const imgData = ctx.createImageData(imgWidth, imgHeight);
    const data = imgData.data;
    for (let i = 0; i < mask.mask.length; i++) {
      if (mask.mask[i] > 0) {
        const px = i * 4;
        data[px] = 255;
        data[px + 1] = 255;
        data[px + 2] = 255;
        data[px + 3] = Math.round(mask.mask[i] * 0.35);
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }, [selectedDot, masks, imgWidth, imgHeight]);

  // Auto-show popover on first mask added
  useEffect(() => {
    if (masks.length === 1 && !hasShownPopoverRef.current) {
      hasShownPopoverRef.current = true;
      const t = setTimeout(() => setSelectedDot(masks[0].id), 300);
      return () => clearTimeout(t);
    }
  }, [masks]);

  // Handle click on canvas
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      setSelectedDot(null);
      const baseCanvas = baseCanvasRef.current;
      if (!baseCanvas) return;
      const rect = baseCanvas.getBoundingClientRect();
      const scaleX = imgWidth / rect.width;
      const scaleY = imgHeight / rect.height;
      const x = Math.round((e.clientX - rect.left) * scaleX);
      const y = Math.round((e.clientY - rect.top) * scaleY);
      const clampedX = Math.max(0, Math.min(imgWidth - 1, x));
      const clampedY = Math.max(0, Math.min(imgHeight - 1, y));
      const ctx = baseCanvas.getContext("2d");
      if (!ctx) return;
      const imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
      const newMask = floodFill(imageData, clampedX, clampedY, config.tolerance);
      onAddMask(newMask, { x: clampedX, y: clampedY }, activeHex);
    },
    [imgWidth, imgHeight, config.tolerance, onAddMask, activeHex],
  );

  const handleDotClick = useCallback((e: React.MouseEvent, maskId: string) => {
    e.stopPropagation();
    setSelectedDot((prev) => prev === maskId ? null : maskId);
  }, []);

  const handleRemove = useCallback((e: React.MouseEvent, maskId: string) => {
    e.stopPropagation();
    setSelectedDot(null);
    onRemoveMask(maskId);
  }, [onRemoveMask]);

  const handlePickColor = useCallback((e: React.MouseEvent, maskId: string) => {
    e.stopPropagation();
    setSelectedDot(null);
    onOpenColorPicker(maskId);
  }, [onOpenColorPicker]);

  // Close popover on escape
  useEffect(() => {
    if (!selectedDot) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedDot(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedDot]);

  // Close popover when masks change
  useEffect(() => {
    if (selectedDot && !masks.find((m) => m.id === selectedDot)) {
      setSelectedDot(null);
    }
  }, [masks, selectedDot]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible rounded-2xl bg-warm-200"
      style={{ aspectRatio: `${imgWidth} / ${imgHeight}` }}
      onClick={() => setSelectedDot(null)}
    >
      {/* Base image canvas */}
      <canvas ref={baseCanvasRef} className="absolute inset-0 h-full w-full rounded-2xl" style={{ imageRendering: "auto" }} />

      {/* Color overlay canvas */}
      <canvas ref={overlayCanvasRef} onClick={handleCanvasClick} className="absolute inset-0 h-full w-full cursor-crosshair rounded-2xl" style={{ imageRendering: "auto" }} />

      {/* Highlight canvas for selected mask */}
      <canvas
        ref={highlightCanvasRef}
        className={`absolute inset-0 h-full w-full pointer-events-none rounded-2xl transition-opacity duration-200 ${selectedDot ? "opacity-100" : "opacity-0"}`}
        style={{ imageRendering: "auto", animation: selectedDot ? "vis-highlight-pulse 1.5s ease-in-out infinite" : undefined }}
      />

      {/* Interactive dots */}
      {masks.map((m) => {
        const dotX = (m.clickPoint.x / imgWidth) * 100;
        const dotY = (m.clickPoint.y / imgHeight) * 100;
        const isSelected = selectedDot === m.id;
        const popoverAbove = dotY > 25;

        return (
          <div key={m.id} className="absolute z-10" style={{ left: `${dotX}%`, top: `${dotY}%` }}>
            {/* Dot button */}
            <button
              onClick={(e) => handleDotClick(e, m.id)}
              className={`relative flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-lg transition-all ${
                isSelected
                  ? "border-white scale-[1.6] ring-2 ring-white/40 z-20"
                  : "border-white/80 hover:scale-125"
              }`}
              style={{ backgroundColor: m.hex }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            </button>

            {/* Popover */}
            {isSelected && (
              <div
                className={`absolute left-1/2 z-30 -translate-x-1/2 ${popoverAbove ? "bottom-6 mb-1" : "top-6 mt-1"}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col gap-1.5 rounded-xl border border-white/15 bg-warm-900/90 p-2 shadow-2xl backdrop-blur-lg" style={{ minWidth: "150px" }}>
                  <button
                    onClick={(e) => handlePickColor(e, m.id)}
                    className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-[12px] font-medium text-white transition-colors hover:bg-white/20"
                  >
                    <span className="h-4 w-4 rounded-full border border-white/30" style={{ backgroundColor: m.hex }} />
                    Endre farge
                  </button>

                  <button
                    onClick={(e) => handleRemove(e, m.id)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium text-red-300 transition-colors hover:bg-red-500/15"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Fjern område
                  </button>
                </div>

                <div className={`absolute left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 border-white/15 bg-warm-900/90 ${
                  popoverAbove ? "bottom-0 -mb-1 border-b border-r" : "top-0 -mt-1 border-t border-l"
                }`} />
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes vis-highlight-pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
