import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import type { PortableTextBlock } from "@portabletext/react";

interface FeatureBlockProps {
  title?: string;
  body?: PortableTextBlock[];
  image?: { asset: { url: string }; alt?: string };
  layout?: "left" | "right";
}

export function FeatureBlock({ title, body, image, layout = "left" }: FeatureBlockProps) {
  return (
    <div className={`grid gap-8 lg:grid-cols-2 ${layout === "right" ? "lg:flex-row-reverse" : ""}`}>
      {image && (
        <div className={layout === "right" ? "lg:order-2" : ""}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.asset.url}
            alt={image.alt || ""}
            className="w-full rounded-xl object-cover"
          />
        </div>
      )}
      <div className={layout === "right" ? "lg:order-1" : ""}>
        {title && <h3 className="text-xl font-semibold">{title}</h3>}
        {body && (
          <div className="mt-4">
            <PortableTextRenderer value={body} />
          </div>
        )}
      </div>
    </div>
  );
}
