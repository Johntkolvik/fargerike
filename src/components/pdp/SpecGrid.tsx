"use client";

import { useState, useEffect, useCallback } from "react";

type Spec = { label: string; value: string; code: string };

type ScaleItem = { label: string; value: number; description: string; isBest: boolean };

export type AttributeData = {
  name: string;
  shortDescription: string;
  whyItMatters: string;
  regulatoryContext?: string;
  unit?: string;
  scale?: ScaleItem[];
};

/** Map of attribute code → attribute data, pre-fetched on the server. */
export type AttributeMap = Record<string, AttributeData>;

/* ── Scale gauge visualization ─────────────────────── */

function ScaleGauge({ scale, activeIndex }: { scale: ScaleItem[]; activeIndex: number }) {
  const total = scale.length;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 150);
    return () => clearTimeout(t);
  }, []);

  const fillPercent = ((activeIndex + 0.5) / total) * 100;

  return (
    <div className="pt-2 pb-4">
      {/* Track */}
      <div className="relative h-1.5 rounded-full bg-zinc-100 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all ease-out"
          style={{
            width: animate ? `${fillPercent}%` : "0%",
            transitionDuration: "1s",
            background: activeIndex === 0
              ? "linear-gradient(90deg, #10b981, #34d399)"
              : activeIndex <= 1
              ? "linear-gradient(90deg, #10b981, #a3e635)"
              : "linear-gradient(90deg, #10b981, #fbbf24, #f59e0b)",
          }}
        />
      </div>

      {/* Labels */}
      <div className="relative mt-4 flex">
        {scale.map((s, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          return (
            <div
              key={s.label}
              className="flex flex-col items-center"
              style={{ width: `${100 / total}%` }}
            >
              {/* Dot / indicator */}
              {isActive ? (
                <div
                  className="flex items-center justify-center h-5 w-5 rounded-full bg-zinc-900 transition-all duration-700"
                  style={{ opacity: animate ? 1 : 0, transform: animate ? "scale(1)" : "scale(0.3)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </div>
              ) : (
                <div className={`h-2 w-2 rounded-full transition-all duration-500 ${isPast ? "bg-emerald-300" : "bg-zinc-200"}`}
                  style={{ transitionDelay: `${i * 80}ms` }} />
              )}
              {/* Label */}
              <p className={`mt-2 text-center leading-tight transition-all duration-300 ${
                isActive
                  ? "text-[11px] font-semibold text-zinc-900"
                  : "text-[10px] text-zinc-400"
              }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {s.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main SpecGrid component ───────────────────────── */

export function SpecGrid({ specs, productName = "dette produktet", attributes = {} }: { specs: Spec[]; productName?: string; attributes?: AttributeMap }) {
  const [activeSpec, setActiveSpec] = useState<Spec | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Look up attribute data synchronously from the pre-fetched map
  const attrData = activeSpec ? (attributes[activeSpec.code] ?? null) : null;

  const openDrawer = useCallback((spec: Spec) => {
    setActiveSpec(spec);
    setIsAnimating(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => { setActiveSpec(null); }, 250);
  }, []);

  useEffect(() => {
    if (!activeSpec) return;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer(); };
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
  }, [activeSpec, closeDrawer]); // closeDrawer is stable via useCallback

  // Find where the product value sits on the scale
  const activeScaleIndex = (() => {
    if (!attrData?.scale || !activeSpec) return 0;
    const specNum = parseFloat(activeSpec.value.replace(/[^0-9.,]/g, "") || "0");
    let closest = 0;
    let closestDist = Infinity;
    attrData.scale.forEach((s, i) => {
      const dist = Math.abs(s.value - specNum);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    return closest;
  })();

  return (
    <>
      {/* Spec cards — Apple-style interactive tiles */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {specs.map((s) => (
          <button
            key={s.label}
            onClick={() => openDrawer(s)}
            className="group relative text-left rounded-2xl bg-zinc-50/80 border border-zinc-200/60 p-5 min-h-[120px] flex flex-col justify-between transition-colors hover:border-zinc-300"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">{s.label}</p>
            <p className="text-xl font-semibold tracking-tight text-zinc-900 mt-2">{s.value}</p>
            <div className="absolute bottom-4 right-4 h-6 w-6 rounded-full bg-zinc-200/80 group-hover:bg-zinc-900 flex items-center justify-center transition-colors duration-200">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-zinc-400 group-hover:text-white transition-colors duration-200">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Drawer */}
      {activeSpec && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${isAnimating ? "bg-black/40" : "bg-black/0"}`}
            onClick={closeDrawer}
          />

          {/* Drawer panel */}
          <div className={`relative w-full max-w-[420px] bg-white flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isAnimating ? "translate-x-0" : "translate-x-full"
          }`}>

            {/* Header */}
            <div className="flex items-start justify-between px-7 pt-7 pb-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">{activeSpec.label}</p>
                <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-zinc-900">
                  {attrData?.name || activeSpec.label}
                </h3>
              </div>
              <button
                onClick={closeDrawer}
                className="rounded-full p-2 -mr-2 -mt-1 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                aria-label="Lukk"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-7 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {attrData ? (
                <div className="space-y-8">
                  {/* Big value */}
                  <div className="rounded-2xl bg-zinc-50 border border-zinc-200/60 p-6">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-light tracking-tighter text-zinc-900">{activeSpec.value}</span>
                      {attrData.unit && (
                        <span className="text-sm text-zinc-400">{attrData.unit}</span>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-zinc-400">{productName}</p>
                  </div>

                  {/* Scale gauge */}
                  {attrData.scale && attrData.scale.length > 0 && (
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">
                        Hvor ligger dette produktet?
                      </p>
                      <ScaleGauge scale={attrData.scale} activeIndex={activeScaleIndex} />

                      {/* Active level description */}
                      <div className="mt-4 rounded-xl bg-zinc-50 border border-zinc-200/60 px-4 py-3">
                        <p className="text-[13px] font-semibold text-zinc-900">
                          {attrData.scale[activeScaleIndex]?.label}
                          {attrData.scale[activeScaleIndex]?.isBest && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">
                              Beste niv&aring;
                            </span>
                          )}
                        </p>
                        <p className="mt-1 text-[12px] text-zinc-500 leading-relaxed">
                          {attrData.scale[activeScaleIndex]?.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* What it means */}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-2">Hva betyr dette?</p>
                    <p className="text-[15px] leading-[1.7] text-zinc-600">{attrData.shortDescription}</p>
                  </div>

                  {/* Why it matters */}
                  {attrData.whyItMatters && (
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-2">Hvorfor det betyr noe</p>
                      <p className="text-[14px] leading-[1.7] text-zinc-600">{attrData.whyItMatters}</p>
                    </div>
                  )}

                  {/* Regulatory */}
                  {attrData.regulatoryContext && (
                    <div className="rounded-xl bg-zinc-50 border border-zinc-200/60 px-5 py-4">
                      <div className="flex items-start gap-2.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400 shrink-0 mt-0.5">
                          <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                        </svg>
                        <p className="text-[12px] text-zinc-500 leading-relaxed">{attrData.regulatoryContext}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <p className="text-sm text-zinc-400">Ingen detaljert informasjon tilgjengelig.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
