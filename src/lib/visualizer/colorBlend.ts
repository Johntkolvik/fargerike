/**
 * colorBlend.ts — Canvas color blending for paint visualization
 *
 * Pure functions for applying paint colors to masked image regions.
 * Supports overlay, multiply, and soft-light blend modes.
 * Preserves original shadows and highlights through blending math.
 *
 * Ported from mg-color-prototype.
 */

/**
 * Parses a hex color string into RGB components.
 *
 * Supports both 3-digit (#RGB) and 6-digit (#RRGGBB) formats,
 * with or without the leading hash.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace(/^#/, "");

  if (cleaned.length === 3) {
    const r = parseInt(cleaned[0] + cleaned[0], 16);
    const g = parseInt(cleaned[1] + cleaned[1], 16);
    const b = parseInt(cleaned[2] + cleaned[2], 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      throw new Error(`Invalid hex color: ${hex}`);
    }
    return { r, g, b };
  }

  if (cleaned.length === 6) {
    const r = parseInt(cleaned.slice(0, 2), 16);
    const g = parseInt(cleaned.slice(2, 4), 16);
    const b = parseInt(cleaned.slice(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      throw new Error(`Invalid hex color: ${hex}`);
    }
    return { r, g, b };
  }

  throw new Error(`Invalid hex color: ${hex}`);
}

function blendOverlay(base: number, blend: number): number {
  if (base < 0.5) {
    return 2 * base * blend;
  }
  return 1 - 2 * (1 - base) * (1 - blend);
}

function blendMultiply(base: number, blend: number): number {
  return base * blend;
}

function blendSoftLight(base: number, blend: number): number {
  if (blend <= 0.5) {
    return base - (1 - 2 * blend) * base * (1 - base);
  }
  const d = base <= 0.25
    ? ((16 * base - 12) * base + 4) * base
    : Math.sqrt(base);
  return base + (2 * blend - 1) * (d - base);
}

function getBlendFunction(
  mode: "overlay" | "multiply" | "soft-light"
): (base: number, blend: number) => number {
  switch (mode) {
    case "overlay": return blendOverlay;
    case "multiply": return blendMultiply;
    case "soft-light": return blendSoftLight;
  }
}

/**
 * Applies a paint color to masked regions of an image.
 */
export function applyColorToMask(
  original: ImageData,
  mask: Uint8Array,
  hex: string,
  opacity: number,
  blendMode: "overlay" | "multiply" | "soft-light"
): ImageData {
  const { width, height, data } = original;
  const totalPixels = width * height;

  if (mask.length !== totalPixels) {
    throw new Error(
      `Mask size ${mask.length} does not match image dimensions ${width}x${height} (${totalPixels})`
    );
  }

  const clampedOpacity = Math.max(0, Math.min(opacity, 1));
  const color = hexToRgb(hex);
  const blendFn = getBlendFunction(blendMode);

  const colorR = color.r / 255;
  const colorG = color.g / 255;
  const colorB = color.b / 255;

  const outputData = new Uint8ClampedArray(data.length);
  outputData.set(data);

  for (let i = 0; i < totalPixels; i++) {
    const maskValue = mask[i];
    if (maskValue === 0) continue;

    const pixelIndex = i * 4;

    const baseR = data[pixelIndex] / 255;
    const baseG = data[pixelIndex + 1] / 255;
    const baseB = data[pixelIndex + 2] / 255;

    const blendedR = blendFn(baseR, colorR);
    const blendedG = blendFn(baseG, colorG);
    const blendedB = blendFn(baseB, colorB);

    const alpha = (maskValue / 255) * clampedOpacity;

    outputData[pixelIndex] = Math.round((baseR + (blendedR - baseR) * alpha) * 255);
    outputData[pixelIndex + 1] = Math.round((baseG + (blendedG - baseG) * alpha) * 255);
    outputData[pixelIndex + 2] = Math.round((baseB + (blendedB - baseB) * alpha) * 255);
  }

  return new ImageData(outputData, width, height);
}

/**
 * Creates a high-contrast guide image for AI consumption.
 */
export function applyGuideOverlay(
  original: ImageData,
  masks: { mask: Uint8Array; hex: string }[]
): ImageData {
  const { width, height, data } = original;
  const outputData = new Uint8ClampedArray(data.length);
  outputData.set(data);

  for (const { mask, hex } of masks) {
    const c = hexToRgb(hex);
    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === 0) continue;
      const alpha = (mask[i] / 255) * 0.75;
      const px = i * 4;
      outputData[px] = Math.round(data[px] * (1 - alpha) + c.r * alpha);
      outputData[px + 1] = Math.round(data[px + 1] * (1 - alpha) + c.g * alpha);
      outputData[px + 2] = Math.round(data[px + 2] * (1 - alpha) + c.b * alpha);
    }
  }

  return new ImageData(outputData, width, height);
}

/**
 * Applies multiple masks with different colors to an image.
 */
export function applyMultipleColorsToMasks(
  original: ImageData,
  masks: { mask: Uint8Array; hex: string }[],
  opacity: number,
  blendMode: "overlay" | "multiply" | "soft-light"
): ImageData {
  if (masks.length === 0) {
    const copy = new Uint8ClampedArray(original.data);
    return new ImageData(copy, original.width, original.height);
  }

  let result = applyColorToMask(original, masks[0].mask, masks[0].hex, opacity, blendMode);

  for (let i = 1; i < masks.length; i++) {
    result = applyColorToMask(result, masks[i].mask, masks[i].hex, opacity, blendMode);
  }

  return result;
}
