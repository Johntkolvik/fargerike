/**
 * API Route: /api/gemini
 *
 * Server-side proxy for Gemini API calls. Keeps the API key secret
 * (not exposed to the browser). Replaces the Vite dev-server proxy
 * from mg-color-prototype.
 */

import { NextRequest, NextResponse } from "next/server";

const GEMINI_MODEL = "gemini-3.1-flash-image-preview";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: { message: "GEMINI_API_KEY is not configured", code: 500 } },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Proxy error";
    return NextResponse.json(
      { error: { message, code: 500 } },
      { status: 500 }
    );
  }
}
