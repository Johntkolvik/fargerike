import type { Color } from "./types";

export function getContrastColor(hex: string | null): string {
  if (!hex) return "#000";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140 ? "#1a1715" : "#faf8f5";
}

export function parseNCS(ncs: string): { blackness: number; chromaticness: number; hue: string } | null {
  const m = ncs.match(/S?\s*(\d{2})(\d{2})-([A-Z0-9]+)/i);
  if (!m) return null;
  return {
    blackness: parseInt(m[1]),
    chromaticness: parseInt(m[2]),
    hue: m[3].toUpperCase(),
  };
}

export function ncsDistance(a: string, b: string): number {
  const pa = parseNCS(a);
  const pb = parseNCS(b);
  if (!pa || !pb) return Infinity;

  const blackDiff = Math.abs(pa.blackness - pb.blackness);
  const chromDiff = Math.abs(pa.chromaticness - pb.chromaticness);

  const hueA = ncsHueAngle(pa.hue);
  const hueB = ncsHueAngle(pb.hue);
  let hueDiff = Math.abs(hueA - hueB);
  if (hueDiff > 180) hueDiff = 360 - hueDiff;

  return blackDiff * 2 + chromDiff * 2 + hueDiff * 0.5;
}

function ncsHueAngle(hue: string): number {
  if (hue === "N") return 0;
  const bases: Record<string, number> = { Y: 0, R: 90, B: 180, G: 270 };

  const m = hue.match(/([YRBG])(\d+)([YRBG])/);
  if (m) {
    const from = bases[m[1]] ?? 0;
    const pct = parseInt(m[2]);
    const to = bases[m[3]] ?? 0;
    let diff = to - from;
    if (diff < 0) diff += 360;
    if (diff > 180) diff -= 360;
    return (from + (diff * pct) / 100 + 360) % 360;
  }

  return bases[hue.charAt(0)] ?? 0;
}

export function searchColors(colors: Color[], query: string): Color[] {
  const q = query.toLowerCase().trim();
  if (!q) return colors;
  return colors.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.nameSE.toLowerCase().includes(q) ||
      c.nameDK.toLowerCase().includes(q) ||
      c.ncs.toLowerCase().replace(/\s/g, "").includes(q.replace(/\s/g, "")) ||
      c.id.includes(q) ||
      (c.hex && c.hex.toLowerCase().includes(q))
  );
}

export function getAllImages(color: Color): { src: string; label: string }[] {
  const imgs: { src: string; label: string }[] = [];
  for (const f of color.imagesInterior) {
    imgs.push({ src: `/images/jcci/${f}`, label: "Interior" });
  }
  for (const f of color.imagesExterior) {
    imgs.push({ src: `/images/jcce/${f}`, label: "Exterior" });
  }
  return imgs;
}

export function sortByHue(colors: Color[]): Color[] {
  return [...colors].sort((a, b) => {
    const hueA = hexToHue(a.hex);
    const hueB = hexToHue(b.hex);
    if (Math.abs(hueA - hueB) < 5) {
      return (b.luminance ?? 50) - (a.luminance ?? 50);
    }
    return hueA - hueB;
  });
}

function hexToHue(hex: string | null): number {
  if (!hex) return 0;
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  if (d === 0) return 0;
  let h = 0;
  if (max === r) h = ((g - b) / d + 6) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return h * 60;
}
