"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Color } from "@/lib/color/types";
import { useVisualizerState } from "@/hooks/useVisualizerState";
import { generateVisualization, type ColorRegion } from "@/lib/visualizer/geminiVisualizer";
import { applyMultipleColorsToMasks, applyGuideOverlay } from "@/lib/visualizer/colorBlend";
import { playCompletionChime } from "@/lib/visualizer/celebrationSound";
import PhotoUploader from "./PhotoUploader";
import VisualizerCanvas from "./VisualizerCanvas";
import SegmentToolbar from "./SegmentToolbar";

interface Props {
  color: Color;
  matchingColors?: { hex: string; name: string }[];
  isOpen: boolean;
  onClose: () => void;
}

export default function PhotoVisualizer({ color, matchingColors, isOpen, onClose }: Props) {
  const state = useVisualizerState();
  const [activeHex, setActiveHex] = useState(color.hex ?? "#cccccc");
  const [compareMode, setCompareMode] = useState<"side" | "toggle">("side");
  const [showOriginal, setShowOriginal] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const sparkleTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const mainHex = color.hex ?? "#cccccc";

  const colorOptions = [
    { hex: mainHex, name: color.name },
    ...(matchingColors ?? []).filter((c) => c.hex !== mainHex),
  ];

  // Reset active hex when color changes
  useEffect(() => {
    setActiveHex(color.hex ?? "#cccccc");
  }, [color.hex]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleImageReady = useCallback((img: HTMLImageElement, base64: string) => {
    state.setImage(img, base64);
  }, [state]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Generate canvas preview and return the data URL
  const generateCanvasPreview = useCallback((): string | null => {
    if (!state.image || state.masks.length === 0) return null;

    const imgW = state.image.naturalWidth || state.image.width;
    const imgH = state.image.naturalHeight || state.image.height;

    const canvas = document.createElement("canvas");
    canvas.width = imgW;
    canvas.height = imgH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(state.image, 0, 0, imgW, imgH);
    const originalData = ctx.getImageData(0, 0, imgW, imgH);

    const maskEntries = state.masks.map((m) => ({ mask: m.mask, hex: m.hex }));
    const coloredData = applyMultipleColorsToMasks(
      originalData,
      maskEntries,
      state.config.opacity,
      state.config.blendMode,
    );

    ctx.putImageData(coloredData, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.85);
  }, [state]);

  // Show canvas preview in result step
  const generatePreview = useCallback(() => {
    const preview = generateCanvasPreview();
    if (!preview) return;
    state.setResult({ canvasPreview: preview, timestamp: Date.now() });
    state.setStep("result");
  }, [generateCanvasPreview, state]);

  // Generate a high-contrast guide image for the AI
  const generateAIGuide = useCallback((): string | null => {
    if (!state.image || state.masks.length === 0) return null;

    const imgW = state.image.naturalWidth || state.image.width;
    const imgH = state.image.naturalHeight || state.image.height;

    const canvas = document.createElement("canvas");
    canvas.width = imgW;
    canvas.height = imgH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(state.image, 0, 0, imgW, imgH);
    const originalData = ctx.getImageData(0, 0, imgW, imgH);

    const maskEntries = state.masks.map((m) => ({ mask: m.mask, hex: m.hex }));
    const guideData = applyGuideOverlay(originalData, maskEntries);

    ctx.putImageData(guideData, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.85);
  }, [state]);

  // Build region descriptions from masks for the AI prompt
  const buildRegions = useCallback((): ColorRegion[] => {
    const byHex = new Map<string, { hex: string; name: string }>();
    for (const m of state.masks) {
      if (!byHex.has(m.hex)) {
        const match = colorOptions.find((c) => c.hex === m.hex);
        byHex.set(m.hex, { hex: m.hex, name: match?.name ?? m.hex });
      }
    }
    return Array.from(byHex.values()).map((c) => ({
      colorName: c.name,
      hex: c.hex,
      region: "walls",
    }));
  }, [state.masks, colorOptions]);

  // Generate AI visualization
  const generateAI = useCallback(async () => {
    if (!state.imageBase64) return;

    const guideImage = generateAIGuide();

    const preview = generateCanvasPreview();
    if (preview) {
      state.setResult({ canvasPreview: preview, timestamp: Date.now() });
    }

    state.setIsGenerating(true);
    state.setError(null);

    try {
      const regions = buildRegions();
      const result = await generateVisualization({
        imageBase64: state.imageBase64,
        guideImageBase64: guideImage ?? undefined,
        color: {
          name: color.name,
          hex: mainHex,
          ncs: color.ncs,
          description: color.description,
        },
        regions,
      });

      if (result.error) {
        state.setError(result.error);
      } else if (result.imageBase64) {
        state.setResult({
          canvasPreview: state.result?.canvasPreview ?? "",
          aiGenerated: `data:image/png;base64,${result.imageBase64}`,
          timestamp: Date.now(),
        });
        state.setStep("result");

        playCompletionChime();
        setShowSparkles(true);
        if (sparkleTimerRef.current) clearTimeout(sparkleTimerRef.current);
        sparkleTimerRef.current = setTimeout(() => setShowSparkles(false), 2500);
      }
    } catch {
      state.setError("AI-generering feilet. Prøv igjen.");
    } finally {
      state.setIsGenerating(false);
    }
  }, [state, color, mainHex, buildRegions, generateCanvasPreview, generateAIGuide]);

  // Handle color change for a mask (simplified — no drawer in this version)
  const handleOpenColorPicker = useCallback((_maskId: string) => {
    // In the Fargerike version, we keep it simple: no nested color drawer.
    // The user paints with the active color. Future: add MgColorEmbed integration.
  }, []);

  // Download
  const downloadResult = useCallback(() => {
    if (!state.result) return;
    const src = state.result.aiGenerated || state.result.canvasPreview;
    if (!src) return;
    const link = document.createElement("a");
    link.download = `${color.name.replace(/\s+/g, "-").toLowerCase()}-visualisering.png`;
    link.href = src;
    link.click();
  }, [state.result, color.name]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ animation: "vis-fadeIn 200ms ease-out" }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-warm-900/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 flex h-full flex-col overflow-hidden" style={{ animation: "vis-scaleIn 200ms ease-out" }}>

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-warm-900/60 px-5 py-3 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 shrink-0 rounded-lg border-2 border-white/20 shadow-sm"
              style={{ backgroundColor: mainHex }}
            />
            <div>
              <h2 className="text-sm font-semibold text-white sm:text-base">{color.name}</h2>
              <div className="flex gap-3 text-xs text-white/50">
                <span className="font-mono">{color.ncs}</span>
                {color.hex && <span className="font-mono">{color.hex}</span>}
              </div>
            </div>
          </div>

          {/* Step indicator */}
          <div className="hidden items-center gap-2 sm:flex">
            {(["upload", "edit", "result"] as const).map((s, i) => {
              const labels = ["Last opp", "Rediger", "Resultat"];
              const isCurrent = state.step === s;
              const isPast =
                (s === "upload" && state.step !== "upload") ||
                (s === "edit" && state.step === "result");

              return (
                <div key={s} className="flex items-center gap-2">
                  {i > 0 && <div className={`h-px w-6 transition-colors ${isPast ? "bg-white/40" : "bg-white/10"}`} />}
                  <button
                    onClick={() => {
                      if (isPast || isCurrent) state.setStep(s);
                    }}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      isCurrent
                        ? "bg-white/20 text-white"
                        : isPast
                          ? "text-white/50 hover:text-white/70 cursor-pointer"
                          : "text-white/20 cursor-default"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                        isCurrent
                          ? "bg-white text-warm-900"
                          : isPast
                            ? "bg-white/30 text-white"
                            : "bg-white/10 text-white/30"
                      }`}
                    >
                      {isPast ? (
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (i + 1)}
                    </span>
                    {labels[i]}
                  </button>
                </div>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">

          {/* UPLOAD */}
          {state.step === "upload" && (
            <div className="flex min-h-full items-center justify-center p-8">
              <div className="flex flex-col items-center gap-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white sm:text-2xl">Visualiser fargen i ditt rom</h3>
                  <p className="mt-2 text-sm text-white/50">
                    Last opp et bilde av rommet ditt, og se hvordan{" "}
                    <span className="font-medium text-white/80">{color.name}</span> vil se ut.
                  </p>
                </div>
                <PhotoUploader onImageReady={handleImageReady} />
              </div>
            </div>
          )}

          {/* EDIT */}
          {state.step === "edit" && state.image && (
            <div className="flex h-full flex-col">
              <p className="shrink-0 py-2 text-center text-sm text-white/60">
                {state.masks.length === 0 ? (
                  <>
                    Klikk på overflaten du vil male med
                    <span className="ml-1.5 inline-flex items-center gap-1 font-medium text-white">
                      <span className="inline-block h-2.5 w-2.5 rounded-sm border border-white/30" style={{ backgroundColor: activeHex }} />
                      {colorOptions.find((c) => c.hex === activeHex)?.name ?? color.name}
                    </span>
                  </>
                ) : (
                  <>
                    Marker flere områder, eller trykk
                    <span className="ml-1 inline-flex items-center gap-1 font-semibold text-white">
                      Generer
                    </span>
                    {" "}for et realistisk resultat
                  </>
                )}
              </p>

              <div className="flex min-h-0 flex-1 items-center justify-center px-4">
                <div className="relative w-full max-w-4xl">
                  <VisualizerCanvas
                    image={state.image}
                    activeHex={activeHex}
                    masks={state.masks}
                    config={state.config}
                    onAddMask={state.addMask}
                    onRemoveMask={state.removeMask}
                    onChangeMaskColor={state.changeMaskColor}
                    onOpenColorPicker={handleOpenColorPicker}
                  />

                  {state.masks.length > 0 && (
                    <div className="absolute top-3 left-3 rounded-lg bg-black/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/60 backdrop-blur-sm">
                      Utkast
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom bar */}
              <div className="shrink-0 border-t border-white/10 bg-warm-900/60 px-4 py-3 backdrop-blur-md">
                <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
                  <SegmentToolbar
                    config={state.config}
                    onConfigChange={state.setConfig}
                    maskCount={state.masks.length}
                    onUndo={state.undoLastMask}
                    onClear={state.clearMasks}
                    activeHex={activeHex}
                    activeColorName={colorOptions.find((c) => c.hex === activeHex)?.name ?? color.name}
                    onOpenColorPicker={() => {}}
                  />

                  <button
                    onClick={generateAI}
                    disabled={state.masks.length === 0 || state.isGenerating}
                    className={`relative flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                      state.masks.length > 0 && !state.isGenerating
                        ? "bg-gradient-to-r from-amber-400 to-orange-400 text-warm-900 hover:from-amber-300 hover:to-orange-300 shadow-lg shadow-amber-500/20"
                        : "bg-white/15 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    {state.isGenerating ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-warm-900/30 border-t-warm-900" />
                        <span className="hidden sm:inline">Genererer&hellip;</span>
                        <span className="sm:hidden">AI&hellip;</span>
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                        </svg>
                        <span className="hidden sm:inline">Generer realistisk</span>
                        <span className="sm:hidden">Generer</span>
                      </>
                    )}
                    {state.masks.length > 0 && !state.isGenerating && (
                      <span className="absolute inset-0 rounded-xl border-2 border-amber-400/60" style={{ animation: "vis-btn-pulse 2s ease-in-out infinite" }} />
                    )}
                  </button>
                </div>

                {state.error && (
                  <div className="mx-auto mt-2 max-w-4xl rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                    {state.error}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* RESULT */}
          {state.step === "result" && state.result && (
            <div className="relative flex min-h-full flex-col gap-6 p-4 sm:p-6">
              {/* Sparkle celebration overlay */}
              {showSparkles && (
                <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: `${5 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 0.6}s`,
                        animationDuration: `${1.2 + Math.random() * 1}s`,
                      }}
                    >
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{
                          animation: `vis-sparkle-pop ${1.2 + Math.random() * 1}s ease-out forwards`,
                          animationDelay: `${Math.random() * 0.6}s`,
                          opacity: 0,
                          color: ["#FFD700", "#FFF4CC", "#FFFBE6", "#FFE066", "#FFC107"][i % 5],
                        }}
                      >
                        <path d="M12 2l2.09 6.26L20.18 9.27l-4.64 4.53L16.54 20 12 16.77 7.46 20l1-6.2L3.82 9.27l6.09-1.01L12 2z" fill="currentColor" />
                      </svg>
                    </div>
                  ))}
                </div>
              )}

              {/* Compare toggle */}
              <div className="mx-auto flex items-center gap-2 rounded-xl bg-white/10 p-1">
                <button
                  onClick={() => setCompareMode("side")}
                  className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
                    compareMode === "side" ? "bg-white text-warm-900" : "text-white/60 hover:text-white"
                  }`}
                >
                  Side om side
                </button>
                <button
                  onClick={() => setCompareMode("toggle")}
                  className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
                    compareMode === "toggle" ? "bg-white text-warm-900" : "text-white/60 hover:text-white"
                  }`}
                >
                  Veksle
                </button>
              </div>

              {/* Comparison */}
              <div className="mx-auto w-full max-w-5xl">
                {compareMode === "side" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <div className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-white/40">Original</div>
                      <div className="overflow-hidden rounded-2xl bg-warm-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={state.image?.src} alt="Original" className="w-full" />
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-white/40">
                        {state.result.aiGenerated ? "AI-generert" : "Forhåndsvisning (skisse)"}
                      </div>
                      <div className="overflow-hidden rounded-2xl bg-warm-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={state.result.aiGenerated || state.result.canvasPreview} alt="Resultat" className="w-full" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-white/40">
                      {showOriginal ? "Original" : state.result.aiGenerated ? "AI-generert" : "Forhåndsvisning"}
                    </div>
                    <div
                      className="relative cursor-pointer overflow-hidden rounded-2xl bg-warm-200"
                      onMouseDown={() => setShowOriginal(true)}
                      onMouseUp={() => setShowOriginal(false)}
                      onMouseLeave={() => setShowOriginal(false)}
                      onTouchStart={() => setShowOriginal(true)}
                      onTouchEnd={() => setShowOriginal(false)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={showOriginal ? state.image?.src : (state.result.aiGenerated || state.result.canvasPreview)}
                        alt={showOriginal ? "Original" : "Resultat"}
                        className="w-full transition-opacity duration-200"
                      />
                    </div>
                    <p className="mt-2 text-center text-xs text-white/40">Hold nede for å se originalen</p>
                  </div>
                )}
              </div>

              {/* Result actions */}
              <div className="mx-auto flex flex-wrap items-center justify-center gap-3 pb-6">
                {!state.result.aiGenerated && !state.isGenerating && (
                  <button
                    onClick={generateAI}
                    className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-warm-900 transition-colors hover:bg-warm-100 shadow-lg"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                    </svg>
                    Generer realistisk bilde
                  </button>
                )}

                {state.isGenerating && (
                  <div className="flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-medium text-white">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Genererer realistisk bilde&hellip;
                  </div>
                )}

                <button
                  onClick={downloadResult}
                  className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors ${
                    state.result.aiGenerated
                      ? "bg-white text-warm-900 hover:bg-warm-100"
                      : "border border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Last ned
                </button>

                <button
                  onClick={() => state.setStep("edit")}
                  className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Fortsett redigering
                </button>

                <button
                  onClick={state.reset}
                  className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Nytt bilde
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes vis-fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes vis-scaleIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes vis-btn-pulse {
          0%, 100% { opacity: 0; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        @keyframes vis-sparkle-pop {
          0% { opacity: 0; transform: scale(0) rotate(0deg) translateY(0); }
          15% { opacity: 1; transform: scale(1.2) rotate(30deg) translateY(-10px); }
          40% { opacity: 0.9; transform: scale(1) rotate(60deg) translateY(-30px); }
          100% { opacity: 0; transform: scale(0.3) rotate(180deg) translateY(-80px); }
        }
      `}</style>
    </div>
  );
}
