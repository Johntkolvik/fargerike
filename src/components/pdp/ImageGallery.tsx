"use client";

import { useState, useCallback, useEffect, useRef } from "react";

type GalleryImage = {
  url: string;
  alt: string;
  imageType?: string;
};

export function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [animPhase, setAnimPhase] = useState<"idle" | "expanding" | "open" | "closing">("idle");
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const mainImageRef = useRef<HTMLButtonElement>(null);

  const current = images[activeIndex] ?? images[0];

  const goTo = useCallback(
    (dir: "prev" | "next") => {
      setActiveIndex((i) =>
        dir === "next"
          ? (i + 1) % images.length
          : (i - 1 + images.length) % images.length,
      );
    },
    [images.length],
  );

  const openLightbox = () => {
    if (mainImageRef.current) {
      setOriginRect(mainImageRef.current.getBoundingClientRect());
    }
    setLightboxOpen(true);
    setAnimPhase("expanding");
    // After expand animation, settle into final state
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimPhase("open");
      });
    });
  };

  const closeLightbox = () => {
    setAnimPhase("closing");
    setTimeout(() => {
      setLightboxOpen(false);
      setAnimPhase("idle");
    }, 300);
  };

  // keyboard nav
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goTo("next");
      if (e.key === "ArrowLeft") goTo("prev");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, goTo]);

  // Lock body scroll
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  if (!images.length) return null;

  // Compute the initial transform to make the lightbox image appear at the gallery position
  const getInitialTransform = () => {
    if (!originRect) return {};
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scaleX = originRect.width / vw;
    const scaleY = originRect.height / vh;
    const scale = Math.max(scaleX, scaleY);
    const translateX = originRect.left + originRect.width / 2 - vw / 2;
    const translateY = originRect.top + originRect.height / 2 - vh / 2;
    return {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
    };
  };

  return (
    <>
      {/* Main image */}
      <div className="space-y-3">
        <button
          ref={mainImageRef}
          type="button"
          onClick={openLightbox}
          className="group relative flex w-full items-center justify-center rounded-2xl bg-zinc-50 p-6 cursor-zoom-in"
          aria-label="Forstørr bilde"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.url}
            alt={current.alt}
            className="max-h-[400px] object-contain transition-transform group-hover:scale-105"
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-white/80 p-2 text-zinc-500 opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </span>
          {current.imageType && (
            <span className="absolute top-3 left-3 rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-zinc-600 backdrop-blur">
              {current.imageType === "packshot" ? "Produkt" : current.imageType === "environment" ? "Miljøbilde" : current.imageType === "detail" ? "Detalj" : current.imageType}
            </span>
          )}
        </button>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`flex-shrink-0 rounded-lg border-2 p-1.5 transition-colors ${
                  i === activeIndex
                    ? "border-zinc-900"
                    : "border-transparent hover:border-zinc-300"
                }`}
                aria-label={`Vis bilde ${i + 1}: ${img.alt}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.alt}
                  className="h-16 w-16 rounded object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox with expand animation */}
      {lightboxOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-300 ${
            animPhase === "closing" ? "bg-black/0" : animPhase === "expanding" ? "bg-black/0" : "bg-black/90"
          }`}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Bildevisning"
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            className={`absolute top-4 right-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-opacity duration-300 ${
              animPhase === "open" ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Lukk"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goTo("prev"); }}
                className={`absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-opacity duration-300 ${
                  animPhase === "open" ? "opacity-100" : "opacity-0"
                }`}
                aria-label="Forrige bilde"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goTo("next"); }}
                className={`absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-opacity duration-300 ${
                  animPhase === "open" ? "opacity-100" : "opacity-0"
                }`}
                aria-label="Neste bilde"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          {/* Image – animates from gallery position to fullscreen */}
          <div
            className="transition-transform duration-300"
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              ...(animPhase === "expanding" ? getInitialTransform() : {}),
              ...(animPhase === "closing" ? getInitialTransform() : {}),
              ...(animPhase === "open" ? { transform: "translate(0, 0) scale(1)" } : {}),
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.url}
              alt={current.alt}
              className={`max-h-[85vh] max-w-[90vw] object-contain transition-[border-radius] duration-100 delay-200 ${
                animPhase === "open" ? "rounded-none" : "rounded-2xl"
              }`}
            />
          </div>

          {/* Counter */}
          <p className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70 transition-opacity duration-300 ${
            animPhase === "open" ? "opacity-100" : "opacity-0"
          }`}>
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
