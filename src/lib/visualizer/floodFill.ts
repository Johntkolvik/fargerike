/**
 * floodFill.ts — Edge-aware scanline flood-fill with edge blur
 *
 * Pure functions, no DOM dependencies.
 * Operates on ImageData pixel arrays and returns Uint8Array masks.
 *
 * Ported from mg-color-prototype.
 */

function colorDistance(
  data: Uint8ClampedArray,
  indexA: number,
  indexB: number
): number {
  const rA = data[indexA];
  const rB = data[indexB];
  const dr = rA - rB;
  const dg = data[indexA + 1] - data[indexB + 1];
  const db = data[indexA + 2] - data[indexB + 2];
  const rMean = (rA + rB) / 2;
  const wR = 2 + rMean / 256;
  const wG = 4.0;
  const wB = 2 + (255 - rMean) / 256;
  return Math.sqrt(wR * dr * dr + wG * dg * dg + wB * db * db);
}

const MAX_RGB_DISTANCE = Math.sqrt(2.5 * 255 * 255 + 4 * 255 * 255 + 2.5 * 255 * 255);

function computeLuminance(data: Uint8ClampedArray, width: number, height: number): Float32Array {
  const lum = new Float32Array(width * height);
  for (let i = 0; i < lum.length; i++) {
    const px = i * 4;
    lum[i] = 0.299 * data[px] + 0.587 * data[px + 1] + 0.114 * data[px + 2];
  }
  return lum;
}

function computeEdgeMap(lum: Float32Array, width: number, height: number): Uint8Array {
  const edges = new Uint8Array(width * height);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const tl = lum[(y - 1) * width + (x - 1)];
      const tc = lum[(y - 1) * width + x];
      const tr = lum[(y - 1) * width + (x + 1)];
      const ml = lum[y * width + (x - 1)];
      const mr = lum[y * width + (x + 1)];
      const bl = lum[(y + 1) * width + (x - 1)];
      const bc = lum[(y + 1) * width + x];
      const br = lum[(y + 1) * width + (x + 1)];

      const gx = -tl - 2 * ml - bl + tr + 2 * mr + br;
      const gy = -tl - 2 * tc - tr + bl + 2 * bc + br;

      const magnitude = Math.sqrt(gx * gx + gy * gy);
      edges[y * width + x] = Math.min(255, Math.round(magnitude));
    }
  }

  for (let x = 0; x < width; x++) {
    edges[x] = 255;
    edges[(height - 1) * width + x] = 255;
  }
  for (let y = 0; y < height; y++) {
    edges[y * width] = 255;
    edges[y * width + (width - 1)] = 255;
  }

  return edges;
}

/**
 * Edge-aware scanline flood-fill.
 *
 * Selects a contiguous region starting from (startX, startY) using two checks:
 * 1. Color must be within tolerance of the seed pixel
 * 2. Must not cross strong edges (Sobel gradient barriers)
 */
export function floodFill(
  imageData: ImageData,
  startX: number,
  startY: number,
  tolerance: number
): Uint8Array {
  const { width, height, data } = imageData;
  const totalPixels = width * height;

  const sx = Math.max(0, Math.min(Math.floor(startX), width - 1));
  const sy = Math.max(0, Math.min(Math.floor(startY), height - 1));
  const clampedTolerance = Math.max(0, Math.min(tolerance, 100));

  const threshold = (clampedTolerance / 100) * MAX_RGB_DISTANCE;

  const lum = computeLuminance(data, width, height);
  const edgeMap = computeEdgeMap(lum, width, height);

  const edgeThreshold = 12 + clampedTolerance * 0.3;

  const refIndex = (sy * width + sx) * 4;
  const visited = new Uint8Array(totalPixels);

  function canFill(pos: number): boolean {
    if (visited[pos]) return false;
    if (edgeMap[pos] > edgeThreshold) return false;
    const pixelIndex = pos * 4;
    return colorDistance(data, refIndex, pixelIndex) <= threshold;
  }

  const stack: number[] = [sx, sy];

  while (stack.length > 0) {
    const y = stack.pop()!;
    let x = stack.pop()!;

    let leftX = x;
    while (leftX > 0 && canFill(y * width + (leftX - 1))) {
      leftX--;
    }

    let above = false;
    let below = false;
    let currentX = leftX;

    while (currentX < width) {
      const pixelPos = y * width + currentX;

      if (!canFill(pixelPos) && !visited[pixelPos]) break;
      if (visited[pixelPos]) {
        currentX++;
        if (y > 0) above = visited[(y - 1) * width + currentX - 1] === 1;
        if (y < height - 1) below = visited[(y + 1) * width + currentX - 1] === 1;
        continue;
      }

      visited[pixelPos] = 1;

      if (y > 0) {
        const abovePos = (y - 1) * width + currentX;
        if (!visited[abovePos]) {
          const matches = canFill(abovePos);
          if (matches && !above) {
            stack.push(currentX, y - 1);
          }
          above = matches;
        } else {
          above = true;
        }
      }

      if (y < height - 1) {
        const belowPos = (y + 1) * width + currentX;
        if (!visited[belowPos]) {
          const matches = canFill(belowPos);
          if (matches && !below) {
            stack.push(currentX, y + 1);
          }
          below = matches;
        } else {
          below = true;
        }
      }

      currentX++;
    }
  }

  const rawMask = new Uint8Array(totalPixels);
  for (let i = 0; i < totalPixels; i++) {
    rawMask[i] = visited[i] ? 255 : 0;
  }

  return boxBlurMask(rawMask, width, height, 2);
}

function boxBlurMask(
  mask: Uint8Array,
  width: number,
  height: number,
  radius: number
): Uint8Array {
  const size = width * height;
  const temp = new Uint8Array(size);
  const output = new Uint8Array(size);
  const kernelSize = radius * 2 + 1;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * width;
    let sum = 0;
    for (let kx = -radius; kx <= radius; kx++) {
      sum += mask[rowOffset + Math.max(0, Math.min(kx, width - 1))];
    }
    temp[rowOffset] = Math.round(sum / kernelSize);
    for (let x = 1; x < width; x++) {
      sum += mask[rowOffset + Math.min(x + radius, width - 1)] - mask[rowOffset + Math.max(x - radius - 1, 0)];
      temp[rowOffset + x] = Math.round(sum / kernelSize);
    }
  }

  for (let x = 0; x < width; x++) {
    let sum = 0;
    for (let ky = -radius; ky <= radius; ky++) {
      sum += temp[Math.max(0, Math.min(ky, height - 1)) * width + x];
    }
    output[x] = Math.round(sum / kernelSize);
    for (let y = 1; y < height; y++) {
      sum += temp[Math.min(y + radius, height - 1) * width + x] - temp[Math.max(y - radius - 1, 0) * width + x];
      output[y * width + x] = Math.round(sum / kernelSize);
    }
  }

  return output;
}

/**
 * Combines multiple masks using max blending (union).
 */
export function combineMasks(
  masks: Uint8Array[],
  width: number,
  height: number
): Uint8Array {
  const totalPixels = width * height;
  const result = new Uint8Array(totalPixels);
  if (masks.length === 0) return result;

  for (const mask of masks) {
    if (mask.length !== totalPixels) {
      throw new Error(`Mask size ${mask.length} does not match ${width}x${height} (${totalPixels})`);
    }
  }

  if (masks.length === 1) {
    result.set(masks[0]);
    return result;
  }

  for (let i = 0; i < totalPixels; i++) {
    let max = 0;
    for (const mask of masks) {
      if (mask[i] > max) max = mask[i];
    }
    result[i] = max;
  }

  return result;
}
