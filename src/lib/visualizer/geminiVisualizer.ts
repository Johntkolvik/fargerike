/**
 * geminiVisualizer.ts — Gemini image generation for paint visualization
 *
 * Sends room photos to Gemini with a paint-color prompt and receives
 * AI-generated visualizations. All requests go through the Next.js API route
 * at /api/gemini (which adds the API key and forwards to Google).
 *
 * Ported from mg-color-prototype — adapted for Next.js (server-side proxy
 * replaces Vite dev-server proxy).
 */

const DEFAULT_API_ENDPOINT = "/api/gemini";

interface GeminiInlineData {
  mimeType: string;
  data: string;
}

interface GeminiPart {
  text?: string;
  inlineData?: GeminiInlineData;
}

interface GeminiCandidate {
  content: {
    parts: GeminiPart[];
  };
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
  error?: { message: string; code: number };
}

export interface ColorRegion {
  colorName: string;
  hex: string;
  region: string;
}

export async function generateVisualization(params: {
  imageBase64: string;
  guideImageBase64?: string;
  color: { name: string; hex: string; ncs: string; description: string };
  regions: ColorRegion[];
  apiEndpoint?: string;
}): Promise<{ imageBase64: string | null; text: string; error: string | null }> {
  const { imageBase64, guideImageBase64, color, regions, apiEndpoint } = params;
  const endpoint = apiEndpoint ?? DEFAULT_API_ENDPOINT;

  // Build color descriptions for the prompt
  let colorList = "";
  if (regions.length > 0) {
    const byColor = new Map<string, string>();
    for (const r of regions) {
      byColor.set(r.hex, r.colorName);
    }
    colorList = Array.from(byColor.entries())
      .map(([hex, name]) => `${name} (${hex})`)
      .join(" and ");
  } else {
    colorList = `${color.name} (${color.hex})`;
  }

  const hasGuide = !!guideImageBase64;

  const prompt = hasGuide
    ? [
        `I'm showing you two images of the same room.`,
        `The FIRST image is the original photograph.`,
        `The SECOND image is a guide showing which surfaces I want repainted — the tinted/colored areas indicate exactly which surfaces to change.`,
        `Generate a realistic photograph based on the FIRST image, but repaint ONLY the surfaces that are tinted in the SECOND image.`,
        `Use the color ${colorList} for the painted surfaces.`,
        `The paint should have a smooth matte finish with natural light interaction.`,
        `Keep everything else EXACTLY as it is — furniture, objects, lighting, shadows, floor, unpainted surfaces.`,
        `The result should look like a professional real estate photo.`,
      ].join(" ")
    : [
        `Generate a realistic interior photograph of this exact same room,`,
        `but with the walls painted in ${colorList}.`,
        `The paint should have a smooth matte finish with natural light interaction.`,
        `Preserve ALL furniture, objects, lighting, shadows, floor, and architectural details exactly as they are.`,
        `The result should look like a professional real estate photo where only the painted surfaces have changed color.`,
      ].join(" ");

  const mimeType = detectMimeType(imageBase64);
  const cleanBase64 = stripDataUriPrefix(imageBase64);

  const parts: Array<{ inlineData: { mimeType: string; data: string } } | { text: string }> = [
    { inlineData: { mimeType, data: cleanBase64 } },
  ];

  if (hasGuide) {
    const guideMime = detectMimeType(guideImageBase64);
    const cleanGuide = stripDataUriPrefix(guideImageBase64);
    parts.push({ inlineData: { mimeType: guideMime, data: cleanGuide } });
  }

  parts.push({ text: prompt });

  const requestBody = {
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        imageBase64: null,
        text: "",
        error: `API request failed (${response.status}): ${errorText}`,
      };
    }

    const data: GeminiResponse = await response.json();

    if (data.error) {
      return {
        imageBase64: null,
        text: "",
        error: `Gemini error (${data.error.code}): ${data.error.message}`,
      };
    }

    if (!data.candidates || data.candidates.length === 0) {
      return {
        imageBase64: null,
        text: "",
        error: "No candidates returned from Gemini",
      };
    }

    const responseParts = data.candidates[0].content.parts;
    return extractResult(responseParts);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown network error";
    return {
      imageBase64: null,
      text: "",
      error: `Network error: ${message}`,
    };
  }
}

function extractResult(
  parts: GeminiPart[]
): { imageBase64: string | null; text: string; error: string | null } {
  let imageBase64: string | null = null;
  const textParts: string[] = [];

  for (const part of parts) {
    if (part.inlineData?.data && !imageBase64) {
      imageBase64 = part.inlineData.data;
    }
    if (part.text) {
      textParts.push(part.text);
    }
  }

  return {
    imageBase64,
    text: textParts.join("\n"),
    error: null,
  };
}

function detectMimeType(base64: string): string {
  const match = base64.match(/^data:(image\/[a-zA-Z+]+);base64,/);
  if (match) return match[1];

  if (base64.startsWith("iVBOR")) return "image/png";
  if (base64.startsWith("UklGR")) return "image/webp";
  return "image/jpeg";
}

function stripDataUriPrefix(base64: string): string {
  const commaIndex = base64.indexOf(",");
  if (commaIndex !== -1 && base64.startsWith("data:")) {
    return base64.slice(commaIndex + 1);
  }
  return base64;
}

/**
 * Converts a File object to a base64 string (without data URI prefix).
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("FileReader did not return a string"));
        return;
      }
      const commaIndex = result.indexOf(",");
      resolve(commaIndex !== -1 ? result.slice(commaIndex + 1) : result);
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Resizes an image file to fit within a maximum dimension while preserving
 * aspect ratio. Returns base64-encoded JPEG and the final dimensions.
 */
export function resizeImage(
  file: File,
  maxDimension: number
): Promise<{ base64: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;

      if (width > maxDimension || height > maxDimension) {
        const scale = maxDimension / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }

      try {
        const canvas = typeof OffscreenCanvas !== "undefined"
          ? new OffscreenCanvas(width, height)
          : createCanvasElement(width, height);

        const ctx = canvas.getContext("2d") as
          | CanvasRenderingContext2D
          | OffscreenCanvasRenderingContext2D
          | null;

        if (!ctx) {
          reject(new Error("Failed to get canvas 2D context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        if (canvas instanceof OffscreenCanvas) {
          canvas.convertToBlob({ type: "image/jpeg", quality: 0.85 }).then(
            (blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                const result = reader.result;
                if (typeof result !== "string") {
                  reject(new Error("FileReader did not return a string"));
                  return;
                }
                const commaIndex = result.indexOf(",");
                resolve({
                  base64: commaIndex !== -1 ? result.slice(commaIndex + 1) : result,
                  width,
                  height,
                });
              };
              reader.onerror = () => reject(new Error("Failed to read resized blob"));
              reader.readAsDataURL(blob);
            },
            (err) => reject(err),
          );
        } else {
          const dataUrl = (canvas as HTMLCanvasElement).toDataURL("image/jpeg", 0.85);
          const commaIndex = dataUrl.indexOf(",");
          resolve({
            base64: commaIndex !== -1 ? dataUrl.slice(commaIndex + 1) : dataUrl,
            width,
            height,
          });
        }
      } catch (err) {
        reject(err instanceof Error ? err : new Error("Canvas operation failed"));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image for resizing"));
    };

    img.src = url;
  });
}

function createCanvasElement(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}
