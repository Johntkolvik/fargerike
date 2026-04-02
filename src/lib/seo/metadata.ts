import type { Metadata } from "next";
import type {
  SanityProduct,
  SanityColor,
  SanityArticle,
  SanityStore,
  SanityService,
} from "@/types/sanity";

const SITE_NAME = "Fargerike";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fargerike.no";

function base(title: string, description?: string): Metadata {
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    openGraph: {
      title,
      description: description ?? undefined,
      siteName: SITE_NAME,
    },
  };
}

export function generateProductMetadata(product: SanityProduct): Metadata {
  return base(
    product.seo?.metaTitle || product.displayName,
    product.seo?.metaDescription || `${product.displayName} fra ${product.brand ?? "Fargerike"}`,
  );
}

export function generateColorMetadata(color: SanityColor): Metadata {
  return base(
    color.seo?.metaTitle || `${color.name} – Farge`,
    color.seo?.metaDescription ||
      `${color.name}${color.ncsCode ? ` (${color.ncsCode})` : ""} – Se kompatible produkter og inspirasjon`,
  );
}

export function generateArticleMetadata(article: SanityArticle): Metadata {
  return base(
    article.seo?.metaTitle || article.title,
    article.seo?.metaDescription || article.excerpt,
  );
}

export function generateStoreMetadata(store: SanityStore): Metadata {
  return base(
    store.seo?.metaTitle || `Fargerike ${store.name}`,
    store.seo?.metaDescription ||
      `Fargerike ${store.name}${store.address?.city ? ` i ${store.address.city}` : ""} – Åpningstider, tjenester og kontaktinfo`,
  );
}

export function generateServiceMetadata(service: SanityService): Metadata {
  return base(
    service.seo?.metaTitle || service.title,
    service.seo?.metaDescription ||
      `${service.title} – Bestill time hos Fargerike`,
  );
}
