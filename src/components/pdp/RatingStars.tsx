"use client";

import { useId } from "react";

type Props = {
  score: number;
  count: number;
  size?: "sm" | "md";
};

export function RatingStars({ score, count, size = "sm" }: Props) {
  const clipId = useId();
  const fullStars = Math.floor(score);
  const hasHalf = score - fullStars >= 0.25;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  const starSize = size === "sm" ? 14 : 18;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-label={`${score} av 5 stjerner`}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <svg key={`f-${i}`} width={starSize} height={starSize} viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
        {hasHalf && (
          <svg width={starSize} height={starSize} viewBox="0 0 24 24" fill="none" stroke="none">
            <defs>
              <clipPath id={clipId}>
                <rect x="0" y="0" width="12" height="24" />
              </clipPath>
            </defs>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#e5e7eb" />
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f59e0b" clipPath={`url(#${clipId})`} />
          </svg>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <svg key={`e-${i}`} width={starSize} height={starSize} viewBox="0 0 24 24" fill="#e5e7eb" stroke="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span className={`text-zinc-600 ${size === "sm" ? "text-xs" : "text-sm"}`}>
        {score.toFixed(1)}
      </span>
      <span className={`text-zinc-400 ${size === "sm" ? "text-xs" : "text-sm"}`}>
        ({count} anmeldelser)
      </span>
    </div>
  );
}
