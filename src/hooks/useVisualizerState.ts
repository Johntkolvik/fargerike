import { useState, useCallback } from "react";
import type { VisualizerStep, MaskRegion, VisualizerConfig, VisualizerResult } from "@/lib/color/types";

const DEFAULT_CONFIG: VisualizerConfig = {
  tolerance: 22,
  blendMode: "overlay",
  opacity: 0.65,
};

export interface UseVisualizerStateReturn {
  step: VisualizerStep;
  image: HTMLImageElement | null;
  imageBase64: string;
  masks: MaskRegion[];
  config: VisualizerConfig;
  result: VisualizerResult | null;
  isGenerating: boolean;
  error: string | null;
  setImage: (img: HTMLImageElement, base64: string) => void;
  addMask: (mask: Uint8Array, clickPoint: { x: number; y: number }, hex: string) => void;
  removeMask: (id: string) => void;
  changeMaskColor: (id: string, hex: string) => void;
  clearMasks: () => void;
  undoLastMask: () => void;
  setConfig: (config: Partial<VisualizerConfig>) => void;
  setStep: (step: VisualizerStep) => void;
  setResult: (result: VisualizerResult) => void;
  setIsGenerating: (v: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

let maskIdCounter = 0;

export function useVisualizerState(): UseVisualizerStateReturn {
  const [step, setStep] = useState<VisualizerStep>("upload");
  const [image, setImageState] = useState<HTMLImageElement | null>(null);
  const [imageBase64, setImageBase64] = useState("");
  const [masks, setMasks] = useState<MaskRegion[]>([]);
  const [config, setConfigState] = useState<VisualizerConfig>(DEFAULT_CONFIG);
  const [result, setResult] = useState<VisualizerResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setImage = useCallback((img: HTMLImageElement, base64: string) => {
    setImageState(img);
    setImageBase64(base64);
    setStep("edit");
    setMasks([]);
    setResult(null);
    setError(null);
  }, []);

  const addMask = useCallback(
    (mask: Uint8Array, clickPoint: { x: number; y: number }, hex: string) => {
      const id = `mask-${++maskIdCounter}`;
      setMasks((prev) => [...prev, { id, mask, clickPoint, hex }]);
    },
    [],
  );

  const removeMask = useCallback((id: string) => {
    setMasks((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const changeMaskColor = useCallback((id: string, hex: string) => {
    setMasks((prev) => prev.map((m) => m.id === id ? { ...m, hex } : m));
  }, []);

  const clearMasks = useCallback(() => {
    setMasks([]);
  }, []);

  const undoLastMask = useCallback(() => {
    setMasks((prev) => prev.slice(0, -1));
  }, []);

  const setConfig = useCallback((partial: Partial<VisualizerConfig>) => {
    setConfigState((prev) => ({ ...prev, ...partial }));
  }, []);

  const reset = useCallback(() => {
    setStep("upload");
    setImageState(null);
    setImageBase64("");
    setMasks([]);
    setConfigState(DEFAULT_CONFIG);
    setResult(null);
    setIsGenerating(false);
    setError(null);
  }, []);

  return {
    step,
    image,
    imageBase64,
    masks,
    config,
    result,
    isGenerating,
    error,
    setImage,
    addMask,
    removeMask,
    changeMaskColor,
    clearMasks,
    undoLastMask,
    setConfig,
    setStep,
    setResult,
    setIsGenerating,
    setError,
    reset,
  };
}
