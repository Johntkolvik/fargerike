const bucketImages: Record<string, string> = {
  "606": "/images/bucket-wonderwall.png",
  "429": "/images/bucket-lady.png",
  "686": "/images/bucket-balance.png",
  "680": "/images/bucket-purecolor.png",
  "677": "/images/bucket-minerals.png",
  "300": "/images/bucket-drygolin-extreme.png",
  "688": "/images/bucket-drygolin-extreme.png",
  "462": "/images/bucket-drygolin-extreme.png",
};

export function getBucketImage(familyCode: string): string {
  return bucketImages[familyCode] ?? "/images/bucket-lady.png";
}
