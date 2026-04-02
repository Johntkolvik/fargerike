"use client";

import { useState } from "react";

interface Props {
  images: { src: string; label: string }[];
}

export default function ImageGallery({ images }: Props) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) return null;

  const canPrev = selected > 0;
  const canNext = selected < images.length - 1;

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-warm-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[selected].src}
          alt={images[selected].label}
          className="w-full object-cover"
          style={{ minHeight: "360px", maxHeight: "560px" }}
          loading="lazy"
        />
        {images.length > 1 && (
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => canPrev && setSelected(selected - 1)}
              disabled={!canPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-warm-300 bg-white/80 backdrop-blur-sm text-warm-700 transition-colors hover:bg-white disabled:opacity-30"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => canNext && setSelected(selected + 1)}
              disabled={!canNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-warm-300 bg-white/80 backdrop-blur-sm text-warm-700 transition-colors hover:bg-white disabled:opacity-30"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`shrink-0 overflow-hidden rounded-xl transition-all ${
                i === selected
                  ? "ring-2 ring-warm-900 ring-offset-2 ring-offset-warm-50"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.label}
                className="h-20 w-28 object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
