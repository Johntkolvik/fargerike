"use client";

import Image from "next/image";
import Link from "next/link";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";

/* ------------------------------------------------------------------ */
/*  Helper: parse YouTube/Vimeo URL into embeddable URL               */
/* ------------------------------------------------------------------ */
function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);

    // YouTube: youtube.com/watch?v=ID or youtu.be/ID
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtube-nocookie.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube-nocookie.com/embed/${id}`;
    }

    // Vimeo: vimeo.com/ID
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
    }

    return null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Helper: calloutBox styling per type                               */
/* ------------------------------------------------------------------ */
const calloutConfig: Record<
  string,
  { icon: string; borderColor: string; label: string }
> = {
  proTip: { icon: "\u{1F4A1}", borderColor: "border-warm-400", label: "Profftips" },
  warning: { icon: "\u26A0\uFE0F", borderColor: "border-red-400", label: "Advarsel" },
  info: { icon: "\u2139\uFE0F", borderColor: "border-blue-400", label: "Info" },
  important: { icon: "\u2757", borderColor: "border-amber-400", label: "Viktig" },
};

/* ------------------------------------------------------------------ */
/*  Helper: ctaBlock styling per variant                              */
/* ------------------------------------------------------------------ */
const ctaVariantStyles: Record<string, { wrapper: string; button: string }> = {
  bookConsultation: {
    wrapper: "bg-warm-900 text-white",
    button: "bg-white text-warm-900 hover:bg-warm-100",
  },
  findStore: {
    wrapper: "bg-warm-50 text-warm-900",
    button: "bg-warm-900 text-white hover:bg-warm-800",
  },
  orderSample: {
    wrapper: "bg-warm-100 text-warm-900",
    button: "bg-warm-900 text-white hover:bg-warm-800",
  },
  contact: {
    wrapper: "bg-warm-50 text-warm-900 border border-warm-200",
    button: "bg-warm-900 text-white hover:bg-warm-800",
  },
  custom: {
    wrapper: "bg-warm-50 text-warm-900",
    button: "bg-warm-900 text-white hover:bg-warm-800",
  },
};

/* ------------------------------------------------------------------ */
/*  Components                                                        */
/* ------------------------------------------------------------------ */
const components: PortableTextComponents = {
  types: {
    /* ---- Existing: image ---- */
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ""}
            width={800}
            height={450}
            className="w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-warm-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    /* ---- 1. productCard ---- */
    productCard: ({ value }) => {
      const product = value?.product;
      if (!product) return null;

      const slug = product.slug?.current;
      const image = product.images?.[0];
      const price = product.variants?.[0]?.price;

      return (
        <div className="my-6 rounded-xl border border-warm-200 bg-white p-5 flex gap-4">
          {image?.asset?._ref && (
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-warm-50">
              <Image
                src={urlFor(image).width(160).height(160).url()}
                alt={image.alt || product.displayName || ""}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="flex flex-col justify-center min-w-0">
            {product.brand && (
              <p className="text-xs font-medium text-warm-400">{product.brand}</p>
            )}
            {slug ? (
              <Link
                href={`/produkt/${slug}`}
                className="text-sm font-semibold text-warm-900 hover:underline truncate"
              >
                {product.displayName || "Produkt"}
              </Link>
            ) : (
              <p className="text-sm font-semibold text-warm-900 truncate">
                {product.displayName || "Produkt"}
              </p>
            )}
            {value.note && (
              <p className="text-xs text-warm-500 mt-0.5">{value.note}</p>
            )}
            {price != null && (
              <p className="text-sm font-semibold text-warm-900 mt-1">
                Fra {price} kr
              </p>
            )}
          </div>
        </div>
      );
    },

    /* ---- 2. colorPaletteEmbed ---- */
    colorPaletteEmbed: ({ value }) => {
      const colors = value?.colors;
      if (!colors?.length) return null;

      return (
        <div className="my-8">
          {value.title && (
            <h3 className="mb-3 text-lg font-semibold text-warm-900">
              {value.title}
            </h3>
          )}
          {value.description && (
            <p className="mb-4 text-sm text-warm-500">{value.description}</p>
          )}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {colors.map(
              (
                color: {
                  _id?: string;
                  slug?: { current?: string };
                  hexValue?: string;
                  name?: string;
                },
                i: number,
              ) => {
                const slug = color.slug?.current;
                const inner = (
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className="h-16 w-16 rounded-lg border border-warm-200 flex-shrink-0"
                      style={{
                        backgroundColor: color.hexValue || "#ccc",
                      }}
                    />
                    <span className="text-xs text-warm-600 text-center max-w-[4.5rem] truncate">
                      {color.name || "Farge"}
                    </span>
                  </div>
                );

                return slug ? (
                  <Link
                    key={color._id || i}
                    href={`/farge/${slug}`}
                    className="flex-shrink-0 hover:opacity-80 transition-opacity"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={color._id || i} className="flex-shrink-0">
                    {inner}
                  </div>
                );
              },
            )}
          </div>
        </div>
      );
    },

    /* ---- 3. stepByStep ---- */
    stepByStep: ({ value }) => {
      const steps = value?.steps;
      if (!steps?.length) return null;

      return (
        <div className="my-8">
          {value.title && (
            <h3 className="mb-2 text-lg font-semibold text-warm-900">
              {value.title}
            </h3>
          )}
          {(value.totalDuration || value.difficulty) && (
            <p className="mb-4 text-sm text-warm-500">
              {value.difficulty && (
                <span className="capitalize">{value.difficulty}</span>
              )}
              {value.difficulty && value.totalDuration && " · "}
              {value.totalDuration && (
                <span>Total tid: {value.totalDuration}</span>
              )}
            </p>
          )}
          <ol className="relative space-y-6">
            {/* Connecting line */}
            <div className="absolute top-4 left-4 bottom-4 w-px bg-warm-200" />

            {steps.map(
              (
                step: {
                  _key?: string;
                  title: string;
                  body: string;
                  image?: { asset?: { _ref?: string }; alt?: string };
                  tip?: string;
                  duration?: string;
                },
                i: number,
              ) => (
                <li key={step._key || i} className="relative flex gap-4">
                  <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-warm-900 text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h4 className="text-base font-semibold text-warm-900">
                        {step.title}
                      </h4>
                      {step.duration && (
                        <span className="text-xs text-warm-400 flex-shrink-0">
                          {step.duration}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-warm-600 leading-relaxed">
                      {step.body}
                    </p>
                    {step.image?.asset?._ref && (
                      <div className="mt-3 overflow-hidden rounded-lg">
                        <Image
                          src={urlFor(step.image).width(600).url()}
                          alt={step.image.alt || step.title}
                          width={600}
                          height={400}
                          className="w-full rounded-lg"
                        />
                      </div>
                    )}
                    {step.tip && (
                      <div className="mt-3 flex gap-2 rounded-lg bg-warm-50 border-l-4 border-warm-400 px-3 py-2.5">
                        <span className="text-sm flex-shrink-0">{"\u{1F4A1}"}</span>
                        <p className="text-xs text-warm-600">{step.tip}</p>
                      </div>
                    )}
                  </div>
                </li>
              ),
            )}
          </ol>
        </div>
      );
    },

    /* ---- 4. beforeAfter ---- */
    beforeAfter: ({ value }) => {
      const beforeImg = value?.beforeImage;
      const afterImg = value?.afterImage;
      if (!beforeImg?.asset?._ref || !afterImg?.asset?._ref) return null;

      const beforeLabel = value.beforeLabel || "F\u00F8r";
      const afterLabel = value.afterLabel || "Etter";

      return (
        <figure className="my-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src={urlFor(beforeImg).width(600).url()}
                alt={beforeImg.alt || beforeLabel}
                width={600}
                height={400}
                className="w-full object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-warm-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {beforeLabel}
              </span>
            </div>
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src={urlFor(afterImg).width(600).url()}
                alt={afterImg.alt || afterLabel}
                width={600}
                height={400}
                className="w-full object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-warm-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {afterLabel}
              </span>
            </div>
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-warm-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    /* ---- 5. videoEmbed ---- */
    videoEmbed: ({ value }) => {
      const url = value?.url;
      if (!url) return null;

      const embedUrl = toEmbedUrl(url);
      if (!embedUrl) return null;

      return (
        <figure className="my-8">
          <div className="aspect-video overflow-hidden rounded-xl">
            <iframe
              src={embedUrl}
              title={value.title || "Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="h-full w-full"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-warm-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    /* ---- 6. ctaBlock ---- */
    ctaBlock: ({ value }) => {
      const variant = value?.variant || "custom";
      const styles = ctaVariantStyles[variant] || ctaVariantStyles.custom;

      return (
        <div
          className={`my-8 rounded-xl py-8 px-6 text-center ${styles.wrapper}`}
        >
          {value.heading && (
            <h3 className="text-xl font-semibold">{value.heading}</h3>
          )}
          {value.body && (
            <p className="mt-2 text-sm opacity-80 leading-relaxed max-w-lg mx-auto">
              {value.body}
            </p>
          )}
          {value.ctaLabel && value.ctaUrl && (
            <Link
              href={value.ctaUrl}
              className={`mt-5 inline-block rounded-full px-6 py-3 text-sm font-semibold transition-colors ${styles.button}`}
            >
              {value.ctaLabel}
            </Link>
          )}
        </div>
      );
    },

    /* ---- 7. calloutBox ---- */
    calloutBox: ({ value }) => {
      const type = value?.type || "info";
      const config = calloutConfig[type] || calloutConfig.info;

      return (
        <div
          className={`my-6 border-l-4 ${config.borderColor} rounded-xl bg-warm-50 p-5`}
        >
          <div className="flex items-start gap-3">
            <span className="text-lg flex-shrink-0 leading-none mt-0.5">
              {config.icon}
            </span>
            <div className="min-w-0">
              {value.title ? (
                <h4 className="text-sm font-semibold text-warm-900">
                  {value.title}
                </h4>
              ) : (
                <h4 className="text-sm font-semibold text-warm-900">
                  {config.label}
                </h4>
              )}
              <p className="mt-1 text-sm text-warm-600 leading-relaxed">
                {value.body}
              </p>
            </div>
          </div>
        </div>
      );
    },

    /* ---- 8. comparisonTable ---- */
    comparisonTable: ({ value }) => {
      const products = value?.products;
      const attributes = value?.attributes;
      if (!products?.length) return null;

      return (
        <div className="my-8">
          {value.title && (
            <h3 className="mb-4 text-lg font-semibold text-warm-900">
              {value.title}
            </h3>
          )}
          <div className="overflow-x-auto rounded-xl border border-warm-200">
            <table className="w-full text-sm">
              {/* Header: product names */}
              <thead>
                <tr className="border-b border-warm-200 bg-warm-50">
                  <th className="px-4 py-3 text-left font-medium text-warm-500">
                    Egenskap
                  </th>
                  {products.map(
                    (
                      p: {
                        _id?: string;
                        displayName?: string;
                        slug?: { current?: string };
                        brand?: string;
                      },
                      i: number,
                    ) => (
                      <th
                        key={p._id || i}
                        className="px-4 py-3 text-left font-semibold text-warm-900"
                      >
                        {p.slug?.current ? (
                          <Link
                            href={`/produkt/${p.slug.current}`}
                            className="hover:underline"
                          >
                            {p.displayName || "Produkt"}
                          </Link>
                        ) : (
                          p.displayName || "Produkt"
                        )}
                        {p.brand && (
                          <span className="block text-xs font-normal text-warm-400">
                            {p.brand}
                          </span>
                        )}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {attributes?.map((attr: string, ai: number) => (
                  <tr
                    key={ai}
                    className={
                      ai % 2 === 0
                        ? "bg-white"
                        : "bg-warm-50/50"
                    }
                  >
                    <td className="px-4 py-3 font-medium text-warm-700 border-r border-warm-100">
                      {attr}
                    </td>
                    {products.map(
                      (
                        p: {
                          _id?: string;
                          technicalSpecs?: { label?: string; value?: string }[];
                        },
                        pi: number,
                      ) => {
                        const spec = p.technicalSpecs?.find(
                          (s: { label?: string }) =>
                            s.label?.toLowerCase() === attr.toLowerCase(),
                        );
                        return (
                          <td
                            key={p._id || pi}
                            className="px-4 py-3 text-warm-600"
                          >
                            {spec?.value || "\u2014"}
                          </td>
                        );
                      },
                    )}
                  </tr>
                ))}
                {/* Price row */}
                {value.showPrice !== false && (
                  <tr className="border-t border-warm-200 bg-warm-50">
                    <td className="px-4 py-3 font-semibold text-warm-900 border-r border-warm-100">
                      Pris
                    </td>
                    {products.map(
                      (
                        p: {
                          _id?: string;
                          variants?: { price?: number; volume?: string }[];
                        },
                        pi: number,
                      ) => {
                        const variant = p.variants?.[0];
                        return (
                          <td
                            key={p._id || pi}
                            className="px-4 py-3 font-semibold text-warm-900"
                          >
                            {variant?.price
                              ? `Fra ${variant.price} kr`
                              : "\u2014"}
                          </td>
                        );
                      },
                    )}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    },

    /* ---- 9. materialsList ---- */
    materialsList: ({ value }) => {
      const items = value?.items;
      if (!items?.length) return null;

      return (
        <div className="my-8">
          {value.title && (
            <h3 className="mb-3 text-lg font-semibold text-warm-900">
              {value.title}
            </h3>
          )}
          <ul className="space-y-2">
            {items.map(
              (
                item: {
                  _key?: string;
                  name: string;
                  product?: { slug?: { current?: string } };
                  quantity?: string;
                  note?: string;
                  essential?: boolean;
                },
                i: number,
              ) => {
                const isEssential = item.essential !== false;
                const productSlug = item.product?.slug?.current;

                return (
                  <li
                    key={item._key || i}
                    className="flex items-start gap-3 rounded-lg bg-warm-50 px-4 py-3"
                  >
                    {/* Checkbox icon */}
                    <span className="mt-0.5 flex-shrink-0">
                      {isEssential ? (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-warm-900"
                        >
                          <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-warm-400"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                        </svg>
                      )}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        {productSlug ? (
                          <Link
                            href={`/produkt/${productSlug}`}
                            className="text-sm font-semibold text-warm-900 hover:underline"
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <span
                            className={`text-sm font-semibold ${
                              isEssential
                                ? "text-warm-900"
                                : "text-warm-500"
                            }`}
                          >
                            {item.name}
                          </span>
                        )}
                        {item.quantity && (
                          <span className="text-xs text-warm-400">
                            {item.quantity}
                          </span>
                        )}
                        {!isEssential && (
                          <span className="text-xs text-warm-400 italic">
                            Valgfritt
                          </span>
                        )}
                      </div>
                      {item.note && (
                        <p className="mt-0.5 text-xs text-warm-500">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </li>
                );
              },
            )}
          </ul>
        </div>
      );
    },

    /* ---- 10. productSlider ---- */
    productSlider: ({ value }) => {
      const products = value?.products;
      if (!products?.length) return null;

      const isCompact = value.displayMode === "compact";

      return (
        <div className="my-8">
          {value.title && (
            <h3 className="mb-3 text-lg font-semibold text-warm-900">
              {value.title}
            </h3>
          )}
          <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 snap-x snap-mandatory">
            {products.map(
              (
                product: {
                  _id?: string;
                  name?: string;
                  shortName?: string;
                  badge?: string;
                  brand?: string;
                  description?: string;
                  variants?: { price?: number }[];
                  image?: { asset?: { _ref?: string } };
                },
                i: number,
              ) => {
                const lowestPrice = product.variants
                  ?.map((v) => v.price)
                  .filter((p): p is number => p != null)
                  .sort((a, b) => a - b)[0];

                if (isCompact) {
                  return (
                    <div
                      key={product._id || i}
                      className="flex-shrink-0 snap-start rounded-lg border border-warm-200 bg-white px-4 py-3 min-w-[160px] max-w-[200px]"
                    >
                      <p className="text-sm font-semibold text-warm-900 truncate">
                        {product.name || "Produkt"}
                      </p>
                      {lowestPrice != null && (
                        <p className="text-xs text-warm-500 mt-0.5">
                          Fra {lowestPrice} kr
                        </p>
                      )}
                    </div>
                  );
                }

                return (
                  <div
                    key={product._id || i}
                    className="flex-shrink-0 snap-start rounded-xl border border-warm-200 bg-white p-5 min-w-[220px] max-w-[260px]"
                  >
                    {product.badge && (
                      <span className="inline-block rounded-full bg-warm-100 px-2.5 py-0.5 text-xs font-medium text-warm-700 mb-2">
                        {product.badge}
                      </span>
                    )}
                    <p className="text-sm font-semibold text-warm-900">
                      {product.name || "Produkt"}
                    </p>
                    {product.shortName && (
                      <p className="text-xs text-warm-500 mt-0.5">
                        {product.shortName}
                      </p>
                    )}
                    {product.brand && (
                      <p className="text-xs text-warm-400 mt-1 uppercase">
                        {product.brand}
                      </p>
                    )}
                    {lowestPrice != null && (
                      <p className="text-sm font-semibold text-warm-900 mt-2">
                        Fra {lowestPrice} kr
                      </p>
                    )}
                  </div>
                );
              },
            )}
          </div>
        </div>
      );
    },

    /* ---- 11. colorSlider ---- */
    colorSlider: ({ value }) => {
      const colors = value?.colors;
      if (!colors?.length) return null;

      return (
        <div className="my-8">
          {value.title && (
            <h3 className="mb-3 text-lg font-semibold text-warm-900">
              {value.title}
            </h3>
          )}
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1 snap-x snap-mandatory">
            {colors.map(
              (
                color: {
                  _id?: string;
                  slug?: { current?: string };
                  hexValue?: string;
                  name?: string;
                  colorCode?: string;
                },
                i: number,
              ) => {
                const slug = color.slug?.current;
                const inner = (
                  <div className="flex flex-col items-center gap-1.5 snap-start">
                    <div
                      className="h-16 w-16 rounded-lg border border-warm-200 flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: color.hexValue || "#ccc" }}
                    />
                    <span className="text-xs text-warm-600 text-center max-w-[4.5rem] truncate">
                      {color.name || "Farge"}
                    </span>
                    {color.colorCode && (
                      <span className="text-[10px] text-warm-400">
                        {color.colorCode}
                      </span>
                    )}
                  </div>
                );

                return slug ? (
                  <Link
                    key={color._id || i}
                    href={`/farge/${slug}`}
                    className="flex-shrink-0 hover:opacity-80 transition-opacity"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={color._id || i} className="flex-shrink-0">
                    {inner}
                  </div>
                );
              },
            )}
          </div>
          {value.collection?.name && (
            <p className="mt-1 text-xs text-warm-400">
              Fra fargekartet {value.collection.name}
            </p>
          )}
        </div>
      );
    },

    /* ---- 12. articleSlider ---- */
    articleSlider: ({ value }) => {
      const articles = value?.articles;
      if (!articles?.length) return null;

      return (
        <div className="my-8">
          {value.title && (
            <h3 className="mb-3 text-lg font-semibold text-warm-900">
              {value.title}
            </h3>
          )}
          <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 snap-x snap-mandatory">
            {articles.map(
              (
                article: {
                  _id?: string;
                  title?: string;
                  slug?: { current?: string };
                  excerpt?: string;
                  articleType?: string;
                  mainImage?: { asset?: { _ref?: string; url?: string }; alt?: string };
                },
                i: number,
              ) => {
                const slug = article.slug?.current;
                const imageUrl = article.mainImage?.asset?.url;

                const card = (
                  <div className="flex-shrink-0 snap-start rounded-xl border border-warm-200 bg-white overflow-hidden min-w-[240px] max-w-[280px]">
                    {imageUrl && (
                      <div className="relative h-36 w-full bg-warm-50">
                        <Image
                          src={imageUrl}
                          alt={article.mainImage?.alt || article.title || ""}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      {article.articleType && (
                        <p className="text-xs font-medium text-warm-400 uppercase mb-1">
                          {article.articleType === "howto" ? "Guide" : article.articleType}
                        </p>
                      )}
                      <h4 className="text-sm font-semibold text-warm-900 line-clamp-2">
                        {article.title || "Artikkel"}
                      </h4>
                      {article.excerpt && (
                        <p className="mt-1 text-xs text-warm-500 line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                );

                return slug ? (
                  <Link
                    key={article._id || i}
                    href={`/artikkel/${slug}`}
                    className="flex-shrink-0 hover:shadow-md transition-shadow rounded-xl"
                  >
                    {card}
                  </Link>
                ) : (
                  <div key={article._id || i} className="flex-shrink-0">
                    {card}
                  </div>
                );
              },
            )}
          </div>
        </div>
      );
    },
  },

  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {children}
      </a>
    ),
    internalLink: ({ children }) => (
      // TODO: resolve internal links to correct URLs
      <span className="underline">{children}</span>
    ),
  },

  block: {
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 text-2xl font-semibold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-xl font-semibold">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
};

export function PortableTextRenderer({
  value,
}: {
  value: PortableTextBlock[];
}) {
  return <PortableText value={value} components={components} />;
}
