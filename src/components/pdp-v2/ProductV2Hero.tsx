"use client";

/*
 * Design Direction: "Grounded Editorial"
 * The color IS the room. The packshot lives in the room.
 * The purchase panel is an architectural surface — anchored right, not floating.
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { MgColorEmbed } from "@/components/pdp/MgColorEmbed";
import { SpecGrid, type AttributeMap } from "@/components/pdp/SpecGrid";
import { RatingStars } from "@/components/pdp/RatingStars";
import { VolumeSelector } from "@/components/shared/VolumeSelector";
import { pdpVariantsToVolumeOptions } from "@/lib/cart/toVolumeOptions";
import type { VolumeSelectionItem } from "@/hooks/useVolumeSelection";
import { useCart } from "@/context/CartContext";

type ColorOption = { name: string; colorCode: string; hexValue: string; ncsCode?: string; slug: string };
type Variant = { volume: string; price: number; isPopular?: boolean };
type Article = { title: string; slug: { current: string }; articleType: string; excerpt: string; coverImage?: string };
type Equipment = { category: string; productName: string; description?: string; price?: number; tag?: string; campaignPrice?: number; slug?: string; imageUrl?: string };

type Props = {
  product: {
    displayName: string;
    subtitle: string;
    brand: string;
    productLine: string;
    highlights?: string[];
    images: { url: string; alt: string; imageType?: string }[];
    variants?: Variant[];
    coverage?: string;
    faq?: { question: string; answer: string }[];
    certifications?: { name: string; description: string; url?: string; iconType?: string }[];
    longDescription?: string;
    rating?: { score: number; count: number };
    surfaceTypes?: string[];
    notSuitableFor?: { text: string; linkedProduct?: { name: string; slug: string } }[];
    recommendedEquipment?: Equipment[];
  };
  colors: ColorOption[];
  articles: Article[];
  productAttributes?: AttributeMap;
};

function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

const serif = { fontFamily: "'Playfair Display', 'Georgia', serif" };

const EQUIP_LABELS: Record<string, string> = {
  "Påføring": "Påføring", "Pensler": "Pensler", "Forberedelse": "Forberedelse",
  "Maskering": "Maskering", "Beskyttelse": "Beskyttelse",
  application: "Påføring", brushes: "Pensler", preparation: "Forberedelse",
  masking: "Maskering", protection: "Beskyttelse",
};

export function ProductV2Hero({ product, colors, articles, productAttributes = {} }: Props) {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [colorDrawerOpen, setColorDrawerOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { addItem } = useCart();

  const volumeOptions = product.variants
    ? pdpVariantsToVolumeOptions(product.variants)
    : [];

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.97]);

  const bgColor = selectedColor?.hexValue ?? "#f5f0eb";
  const light = isLight(bgColor);
  const textOnBg = light ? "text-warm-900" : "text-white";
  const textMuted = light ? "text-warm-500" : "text-white/60";

  function handleAddToCart(items: VolumeSelectionItem[]) {
    if (!selectedColor) return;
    items.forEach((item) => {
      addItem({
        colorId: selectedColor.colorCode,
        colorName: selectedColor.name,
        colorHex: selectedColor.hexValue,
        familyName: product.displayName,
        finishName: product.productLine,
        fillLevel: item.option.fillLevel,
        priceNOK: item.option.campaignPrice ?? item.option.price,
        quantity: item.quantity,
      });
    });
  }

  const packshot = product.images?.find((img) => img.imageType === "packshot");
  const allImages = product.images ?? [];

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [animPhase, setAnimPhase] = useState<"idle" | "expanding" | "open" | "closing">("idle");
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const packshotRef = useRef<HTMLButtonElement>(null);

  const openLightbox = useCallback(() => {
    const idx = allImages.findIndex((img) => img.imageType === "packshot");
    setLightboxIndex(idx >= 0 ? idx : 0);
    if (packshotRef.current) setOriginRect(packshotRef.current.getBoundingClientRect());
    setLightboxOpen(true);
    setAnimPhase("expanding");
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimPhase("open")));
  }, [allImages]);

  const closeLightbox = useCallback(() => {
    setAnimPhase("closing");
    setTimeout(() => { setLightboxOpen(false); setAnimPhase("idle"); }, 300);
  }, []);

  const goLightbox = useCallback((dir: "prev" | "next") => {
    setLightboxIndex((i) => dir === "next" ? (i + 1) % allImages.length : (i - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goLightbox("next");
      if (e.key === "ArrowLeft") goLightbox("prev");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, closeLightbox, goLightbox]);

  useEffect(() => {
    if (lightboxOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  const getLightboxInitialTransform = () => {
    if (!originRect) return {};
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = Math.max(originRect.width / vw, originRect.height / vh);
    const translateX = originRect.left + originRect.width / 2 - vw / 2;
    const translateY = originRect.top + originRect.height / 2 - vh / 2;
    return { transform: `translate(${translateX}px, ${translateY}px) scale(${scale})` };
  };

  const equipmentByCategory: Record<string, any[]> = {};
  for (const e of product.recommendedEquipment ?? []) {
    (equipmentByCategory[e.category] ??= []).push(e);
  }

  return (
    <>
      {/* ─── HERO ─── */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden"
        style={{ opacity: shouldReduceMotion ? 1 : heroOpacity, scale: shouldReduceMotion ? 1 : heroScale }}
      >
        {/* Color background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={bgColor}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ backgroundColor: bgColor }}
          />
        </AnimatePresence>

        {/* Plaster texture */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute" width="0" height="0">
            <filter id="plaster-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feBlend in="SourceGraphic" mode="soft-light" />
            </filter>
          </svg>
          <div className="absolute inset-0 opacity-[0.08]" style={{ filter: "url(#plaster-noise)" }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,transparent_30%,rgba(0,0,0,0.08)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/[0.05]" />
        </div>

        {/* ── Two-column layout ── */}
        <div className="relative z-10 grid lg:min-h-screen lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_460px]">

          {/* ── LEFT: Product identity (text only — clean, no packshot) ── */}
          <div className="flex flex-col justify-center px-6 pt-28 pb-10 sm:px-12 lg:px-16 xl:px-24 lg:py-32">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className={`text-sm font-medium tracking-[0.2em] uppercase ${textMuted}`}
            >
              {product.brand} {product.productLine}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`mt-4 text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl ${textOnBg}`}
              style={serif}
            >
              {product.displayName}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className={`mt-5 max-w-md text-base lg:text-lg leading-relaxed ${textMuted}`}
            >
              {product.subtitle}
            </motion.p>

            <AnimatePresence mode="wait">
              {selectedColor && (
                <motion.div
                  key={selectedColor.colorCode}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className={`mt-8 ${textOnBg}`}
                >
                  <p className={`text-xs font-medium tracking-[0.15em] uppercase ${textMuted}`}>Valgt farge</p>
                  <p className="mt-1.5 text-2xl font-light" style={serif}>{selectedColor.name}</p>
                  <p className={`mt-1 text-sm ${textMuted}`}>
                    {selectedColor.colorCode} &middot; NCS {selectedColor.ncsCode}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {product.rating && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-6">
                <RatingStars score={product.rating.score} count={product.rating.count} />
              </motion.div>
            )}
          </div>

          {/* ── RIGHT: Purchase card — floating, contained ── */}
          <div className="flex items-center py-8 lg:py-20 px-6 sm:px-8 lg:px-0 lg:pr-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full overflow-hidden rounded-2xl border ${light ? "border-black/10" : "border-white/20"} bg-white/95 shadow-xl backdrop-blur-xl`}
          >
            {/* Packshot — prominent, inside the panel */}
            {packshot && (
              <button
                ref={packshotRef}
                type="button"
                onClick={openLightbox}
                className="group relative mb-6 flex items-center justify-center rounded-2xl bg-warm-50/60 px-8 py-6 cursor-zoom-in"
                aria-label="Forst&oslash;rr bilde"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={packshot.url} alt={packshot.alt} className="max-h-[180px] lg:max-h-[200px] object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute bottom-3 right-3 rounded-full bg-white/80 p-1.5 text-warm-500 opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                </span>
              </button>
            )}

            <div className="px-7 pb-7 pt-2">
            {/* Color selector */}
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-warm-400">Farge</p>

            <button
              type="button"
              onClick={() => setColorDrawerOpen(true)}
              className="mt-3 w-full text-left group"
            >
              {selectedColor ? (
                <div className="flex items-center gap-3 rounded-xl border border-warm-200 bg-white px-4 py-3 hover:border-warm-300 transition-all">
                  <span className="h-10 w-10 rounded-lg shrink-0 shadow-sm ring-1 ring-black/5" style={{ backgroundColor: selectedColor.hexValue }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-warm-900">{selectedColor.name}</p>
                    <p className="text-xs text-warm-400">{selectedColor.colorCode}</p>
                  </div>
                  <span className="text-xs font-medium text-warm-400 group-hover:text-warm-600 transition-colors">Endre</span>
                </div>
              ) : (
                <div className="relative rounded-xl border border-warm-200 bg-white p-4 hover:border-warm-300 transition-all overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 flex">
                    {["#ab8073","#c7c2af","#96938b","#f2f1e8","#8a7e6f","#d4bfb2","#E8D5C4","#4a6670","#2d3b35","#B8C8A8"].map((hex, i) => (
                      <div key={i} className="flex-1" style={{ backgroundColor: hex }} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-sm font-semibold text-warm-900">Velg farge</p>
                      <p className="text-xs text-warm-400 mt-0.5">Utforsk farger og fargekart</p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-warm-900 pl-3 pr-2.5 py-1.5 text-[11px] font-medium text-white group-hover:bg-warm-800 transition-colors">
                      Velg
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </div>
                  </div>
                </div>
              )}
            </button>

            {/* Volume selector */}
            <div className="mt-8">
              <VolumeSelector
                options={volumeOptions}
                variant="full"
                colorName={selectedColor?.name}
                coverage={product.coverage}
                onAdd={selectedColor ? handleAddToCart : undefined}
                onChange={() => {}}
              />
              {!selectedColor && (
                <button
                  type="button"
                  disabled
                  className="mt-3 w-full rounded-xl bg-warm-200 py-3.5 text-sm font-semibold text-warm-400 cursor-not-allowed"
                >
                  Velg farge f&oslash;r du legger i handlekurv
                </button>
              )}
            </div>

            {/* Trust line */}
            <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-warm-400">
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                Hentes i butikk
              </span>
              <span className="h-3 w-px bg-warm-200" />
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                Fri frakt til butikk
              </span>
            </div>
            </div>
          </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={light ? "#666" : "#fff"} strokeWidth="1.5" opacity="0.4">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.section>

      {/* mg-color fargevelger */}
      <MgColorEmbed
        onSelect={setSelectedColor}
        isOpen={colorDrawerOpen}
        onOpenChange={setColorDrawerOpen}
        brand="fargerike"
      />

      {/* ─── CONTENT SECTIONS ─── */}
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Highlights */}
        {product.highlights && (
          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="py-20">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {product.highlights.map((h, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border-l-2 border-warm-200 pl-6">
                  <p className="text-base leading-relaxed text-warm-600">{h}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Populære farger */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pb-20">
          <h2 className="text-3xl font-light tracking-tight" style={serif}>Popul&aelig;re farger</h2>
          <p className="mt-2 text-sm text-warm-500">Tilgjengelig i alle Lady-kul&oslash;rer. Klikk for &aring; utforske.</p>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
            {colors.map((c) => (
              <Link key={c.slug} href={`/farge/${c.slug}`} className="group flex-shrink-0 text-center">
                <div className="h-14 w-14 rounded-full shadow-sm transition-transform group-hover:scale-110" style={{ backgroundColor: c.hexValue }} />
                <p className="mt-2 text-xs font-medium">{c.name}</p>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Tekniske spesifikasjoner */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pb-20">
          <h2 className="text-3xl font-light tracking-tight" style={serif}>Teknisk</h2>
          <SpecGrid attributes={productAttributes} specs={[
            { label: "Dekning", value: product.coverage ?? "8\u201310 m\u00b2/L", code: "coverage" },
            { label: "Str\u00f8k", value: "2", code: "coats" },
            { label: "T\u00f8rketid", value: "2 t", code: "dryingTime" },
            { label: "Glans", value: "Helmatt", code: "gloss" },
            { label: "VOC", value: "<1 g/L", code: "voc" },
            { label: "Sertifisert", value: "Svanemerket", code: "certification" },
          ]} />

          {product.surfaceTypes && (
            <div className="mt-8 flex flex-wrap gap-6">
              <div>
                <p className="mb-2 text-xs font-medium text-warm-400 uppercase">Egnet for</p>
                <div className="flex flex-wrap gap-2">
                  {product.surfaceTypes.map((s, i) => (
                    <span key={i} className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">{s}</span>
                  ))}
                </div>
              </div>
              {product.notSuitableFor && (
                <div>
                  <p className="mb-2 text-xs font-medium text-warm-400 uppercase">Ikke egnet for</p>
                  <div className="flex flex-wrap gap-2">
                    {product.notSuitableFor.map((item, i) => (
                      <span key={i} className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                        {item.text}
                        {item.linkedProduct && (
                          <> (bruk <Link href={`/produkt/${item.linkedProduct.slug}`} className="underline">{item.linkedProduct.name}</Link>)</>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.section>

        {/* Sertifiseringer */}
        {product.certifications && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pb-20">
            <h2 className="text-3xl font-light tracking-tight" style={serif}>Sertifiseringer</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {product.certifications.map((cert, i) => (
                <a key={i} href={cert.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-warm-200 p-5 hover:border-warm-400 transition-colors">
                  <p className="font-semibold group-hover:underline">{cert.name}</p>
                  <p className="mt-1 text-sm text-warm-600">{cert.description}</p>
                  <span className="mt-2 inline-block text-xs text-warm-400">Les mer &rarr;</span>
                </a>
              ))}
            </div>
          </motion.section>
        )}

        {/* Anbefalt utstyr */}
        {product.recommendedEquipment && product.recommendedEquipment.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pb-20">
            <h2 className="text-3xl font-light tracking-tight" style={serif}>Anbefalt utstyr</h2>
            <p className="mt-2 text-sm text-warm-500">Alt du trenger for &aring; male med {product.displayName}.</p>
            <div className="mt-8 space-y-8">
              {Object.entries(equipmentByCategory).map(([category, eqItems]) => (
                <div key={category}>
                  <h3 className="mb-3 text-xs font-semibold text-warm-400 uppercase">{EQUIP_LABELS[category] || category}</h3>
                  <div className="flex gap-3 overflow-x-auto pb-3 -mx-6 px-6 snap-x">
                    {eqItems?.map((item, i) => {
                      const cardCls = "flex-shrink-0 snap-start w-[180px] rounded-xl border border-warm-200 bg-white overflow-hidden hover:shadow-md transition-shadow block";
                      const cardContent = (
                        <>
                          <div className="relative aspect-square bg-warm-50 flex items-center justify-center p-3">
                            {item.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={item.imageUrl} alt={item.productName} className="max-h-full max-w-full object-contain" loading="lazy" />
                            ) : (
                              <div className="h-full w-full rounded-lg bg-warm-100" />
                            )}
                            {item.tag && (
                              <span className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                                item.tag === "must-have" ? "bg-warm-900 text-white" :
                                item.tag === "popular" ? "bg-amber-100 text-amber-800" :
                                "bg-blue-100 text-blue-800"
                              }`}>
                                {item.tag === "must-have" ? "Must have" : item.tag === "popular" ? "Popul\u00e6r" : "Nyhet"}
                              </span>
                            )}
                          </div>
                          <div className="p-3">
                            <p className="text-xs font-medium leading-tight line-clamp-2">{item.productName}</p>
                            {item.campaignPrice ? (
                              <p className="mt-1"><span className="text-xs font-bold text-red-600">{item.campaignPrice} kr</span> <span className="text-[10px] text-warm-400 line-through">{item.price} kr</span></p>
                            ) : item.price ? (
                              <p className="mt-1 text-xs font-semibold">{item.price} kr</p>
                            ) : null}
                          </div>
                        </>
                      );
                      return item.slug ? (
                        <Link key={i} href={`/produkt/${item.slug}`} className={cardCls}>{cardContent}</Link>
                      ) : (
                        <div key={i} className={cardCls}>{cardContent}</div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Anmeldelser */}
        {product.rating && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pb-20">
            <div className="flex items-baseline justify-between">
              <h2 className="text-3xl font-light tracking-tight" style={serif}>Anmeldelser</h2>
              <RatingStars score={product.rating.score} count={product.rating.count} size="md" />
            </div>
            <div className="mt-6 rounded-xl border border-dashed border-warm-300 bg-warm-50 p-8 text-center">
              <p className="text-sm text-warm-500">Lipscore-widget (integreres i Fase 1)</p>
            </div>
          </motion.section>
        )}

        {/* FAQ */}
        {product.faq && product.faq.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pb-20">
            <h2 className="text-3xl font-light tracking-tight" style={serif}>Sp&oslash;rsm&aring;l &amp; svar</h2>
            <div className="mt-8 divide-y divide-warm-100">
              {product.faq.map((item, i) => (
                <details key={i} className="group" open={i < 3}>
                  <summary className="flex cursor-pointer items-center justify-between py-5 text-base font-medium">
                    {item.question}
                    <span className="ml-4 text-warm-300 transition-transform group-open:rotate-45 text-xl">+</span>
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed text-warm-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </motion.section>
        )}

        {/* Guider */}
        {articles.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pb-20">
            <h2 className="text-3xl font-light tracking-tight" style={serif}>Guider</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {articles.map((a) => (
                <Link key={a.slug.current} href={`/artikkel/${a.slug.current}`} className="group block">
                  {a.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.coverImage} alt={a.title} className="aspect-[4/3] w-full rounded-xl object-cover transition-transform group-hover:scale-[1.02]" loading="lazy" />
                  )}
                  <p className="mt-3 text-xs tracking-wide text-warm-400 uppercase">{a.articleType === "howto" ? "Guide" : "Inspirasjon"}</p>
                  <h3 className="mt-1 font-medium group-hover:underline">{a.title}</h3>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* CTA */}
      <section className="border-t border-warm-100 bg-warm-50 py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-4xl font-light tracking-tight" style={serif}>Klar for &aring; male?</h2>
          <p className="mt-4 text-warm-500">Finn {product.displayName} i din n&aelig;rmeste butikk, eller book en gratis konsultasjon.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/butikker" className="rounded-full bg-warm-900 px-8 py-3.5 text-sm font-semibold text-white hover:bg-warm-800 transition-colors">Finn butikk</Link>
            <Link href="/tjeneste/fargekonsultasjon" className="rounded-full border border-warm-300 px-8 py-3.5 text-sm font-semibold text-warm-900 hover:border-warm-500 transition-colors">Book konsultasjon</Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-300 ${
            animPhase === "open" ? "bg-black/90" : "bg-black/0"
          }`}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Bildevisning"
        >
          <button type="button" onClick={closeLightbox} className={`absolute top-4 right-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-opacity duration-300 ${animPhase === "open" ? "opacity-100" : "opacity-0"}`} aria-label="Lukk">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          {allImages.length > 1 && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); goLightbox("prev"); }} className={`absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-opacity duration-300 ${animPhase === "open" ? "opacity-100" : "opacity-0"}`} aria-label="Forrige bilde">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); goLightbox("next"); }} className={`absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-opacity duration-300 ${animPhase === "open" ? "opacity-100" : "opacity-0"}`} aria-label="Neste bilde">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </>
          )}
          <div className="transition-transform duration-300" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", ...(animPhase === "expanding" || animPhase === "closing" ? getLightboxInitialTransform() : {}), ...(animPhase === "open" ? { transform: "translate(0, 0) scale(1)" } : {}) }} onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={allImages[lightboxIndex]?.url} alt={allImages[lightboxIndex]?.alt} className={`max-h-[85vh] max-w-[90vw] object-contain transition-[border-radius] duration-100 delay-200 ${animPhase === "open" ? "rounded-none" : "rounded-2xl"}`} />
          </div>
          {allImages.length > 1 && (
            <p className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70 transition-opacity duration-300 ${animPhase === "open" ? "opacity-100" : "opacity-0"}`}>
              {lightboxIndex + 1} / {allImages.length}
            </p>
          )}
        </div>
      )}
    </>
  );
}
