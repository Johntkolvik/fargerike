"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "fargerike-user-images";
const MAX_IMAGES = 12;

export interface UserImage {
  id: string;
  thumbnail: string;
  full: string;
  timestamp: number;
}

function loadImages(): UserImage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as UserImage[];
  } catch {
    return [];
  }
}

function saveImages(images: UserImage[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  } catch {
    if (images.length > 1) {
      saveImages(images.slice(-Math.ceil(images.length / 2)));
    }
  }
}

function createThumbnail(base64: string, maxDim: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const scale = maxDim / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve(base64); return; }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.onerror = () => resolve(base64);
    img.src = base64.startsWith("data:") ? base64 : `data:image/jpeg;base64,${base64}`;
  });
}

let idCounter = Date.now();

export function useUserImages() {
  const [images, setImages] = useState<UserImage[]>([]);

  // Load from localStorage on mount (client-only)
  useEffect(() => {
    setImages(loadImages());
  }, []);

  useEffect(() => {
    if (images.length > 0) saveImages(images);
  }, [images]);

  const addImage = useCallback(async (fullBase64: string) => {
    const fullSrc = fullBase64.startsWith("data:")
      ? fullBase64
      : `data:image/jpeg;base64,${fullBase64}`;
    const thumbnail = await createThumbnail(fullSrc, 240);
    const id = `user-img-${++idCounter}`;
    setImages((prev) => [...prev, { id, thumbnail, full: fullBase64, timestamp: Date.now() }].slice(-MAX_IMAGES));
    return id;
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  return { images, addImage, removeImage };
}
