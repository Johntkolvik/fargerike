"use client";

import { useState, useRef, useCallback } from "react";
import { resizeImage } from "@/lib/visualizer/geminiVisualizer";

interface Props {
  onImageReady: (image: HTMLImageElement, base64: string) => void;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_DIMENSION = 2000;

export default function PhotoUploader({ onImageReady }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    async (file: File) => {
      setError(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Ugyldig filtype. Bruk JPG, PNG eller WebP.");
        return;
      }

      if (file.size > MAX_SIZE_BYTES) {
        setError("Filen er for stor. Maks 10 MB.");
        return;
      }

      setIsLoading(true);

      try {
        const { base64, width, height } = await resizeImage(file, MAX_DIMENSION);

        const img = new Image();
        img.width = width;
        img.height = height;

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Kunne ikke laste bildet."));
          img.src = `data:image/jpeg;base64,${base64}`;
        });

        onImageReady(img, base64);
      } catch {
        setError("Noe gikk galt under behandling av bildet. Prøv igjen.");
      } finally {
        setIsLoading(false);
      }
    },
    [onImageReady],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
      if (inputRef.current) inputRef.current.value = "";
    },
    [processFile],
  );

  return (
    <div className="flex w-full max-w-lg flex-col items-center">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        disabled={isLoading}
        className={`group relative flex w-full flex-col items-center gap-4 rounded-2xl border-2 border-dashed px-8 py-16 text-center transition-all ${
          isDragging
            ? "border-warm-900 bg-warm-100 scale-[1.02]"
            : "border-warm-300 bg-white hover:border-warm-500 hover:bg-warm-50"
        } ${isLoading ? "pointer-events-none opacity-60" : ""}`}
      >
        {isLoading ? (
          <>
            <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-warm-200 border-t-warm-900" />
            <div className="text-sm font-medium text-warm-600">
              Behandler bildet&hellip;
            </div>
          </>
        ) : (
          <>
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${
                isDragging
                  ? "bg-warm-900 text-warm-50"
                  : "bg-warm-100 text-warm-500 group-hover:bg-warm-200 group-hover:text-warm-700"
              }`}
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21zm2.25-9a3 3 0 110-6 3 3 0 010 6z"
                />
              </svg>
            </div>

            <div>
              <div className="text-base font-semibold text-warm-900">
                {isDragging ? "Slipp bildet her" : "Slipp bildet ditt her"}
              </div>
              <div className="mt-1 text-sm text-warm-500">
                eller{" "}
                <span className="font-medium text-warm-700 underline underline-offset-2">
                  velg fil
                </span>
              </div>
            </div>

            <div className="text-xs text-warm-400">
              JPG, PNG eller WebP &middot; maks 10 MB
            </div>
          </>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
