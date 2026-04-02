"use client";

import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";

const components: PortableTextComponents = {
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
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
};

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
