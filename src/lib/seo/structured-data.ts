import type { SanityStore, SanityArticle, SanityService } from "@/types/sanity";

export function buildLocalBusinessJsonLd(store: SanityStore) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    name: `Fargerike ${store.name}`,
    address: store.address
      ? {
          "@type": "PostalAddress",
          streetAddress: store.address.street,
          postalCode: store.address.postalCode,
          addressLocality: store.address.city,
          addressCountry: "NO",
        }
      : undefined,
    geo: store.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: store.coordinates.lat,
          longitude: store.coordinates.lng,
        }
      : undefined,
    telephone: store.phone,
    email: store.email,
  };
}

export function buildArticleJsonLd(article: SanityArticle) {
  return {
    "@context": "https://schema.org",
    "@type": article.articleType === "howto" ? "HowTo" : "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    publisher: {
      "@type": "Organization",
      name: "Fargerike",
    },
  };
}

export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
