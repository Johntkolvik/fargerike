import { defineQuery } from "next-sanity";

export const PRODUCT_BY_SKU_QUERY = defineQuery(`
  *[_type == "product" && sku == $sku][0]{
    ...,
    category->,
    relatedArticles[]->{ _id, title, slug, articleType, mainImage, excerpt }
  }
`);

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0]{
    ...,
    "images": images[]{ _key, alt, imageType, "url": asset->url },
    category->,
    productFamily->{ familyCode, name, brand, supportedColorBrands },
    attributeValues[]{ value, numericValue, displayLabel, attribute->{ name, code, shortDescription, whyItMatters, regulatoryContext, unit, scale } },
    featureBlocks[]{ _key, layout, eyebrow, heading, body, stat, imagePosition, backgroundColor,
      cta{ label, href, style },
      "image": image{ alt, "url": asset->url },
      cards[]{ _key, icon, heading, body, "image": image{ "url": asset->url } }
    },
    faq[]{ _key, question, answer },
    certifications[]{ name, description, url, iconType },
    recommendedEquipment[]{ _key, category, productName, description, price, tag, campaignPrice, slug, imageUrl },
    relatedArticles[]->{ _id, title, slug, articleType, mainImage, excerpt }
  }
`);

export const COLOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "color" && slug.current == $slug][0]{
    ...,
    compatibleProducts[]{ surfaceType, shortDescription, product->{ _id, displayName, slug, brand, images } },
    relatedColors[]->{ _id, name, slug, hexValue, ncsCode, colorCode },
    complementaryColors[]->{ _id, name, slug, hexValue, ncsCode, colorCode }
  }
`);

export const SERVICE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    ...,
    availableAtStores[]->{ _id, name, slug, address, phone }
  }
`);

export const ARTICLE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    ...,
    relatedProducts[]->{ _id, displayName, slug, brand, images },
    relatedColors[]->{ _id, name, slug, hexValue, ncsCode },
    contentCluster->{ _id, title, slug }
  }
`);

export const STORE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "store" && slug.current == $slug][0]{
    ...,
    services[]->{ _id, title, slug, serviceType }
  }
`);

export const STORES_ALL_QUERY = defineQuery(`
  *[_type == "store"] | order(name asc) {
    _id, name, slug, address, coordinates, phone, openingHours
  }
`);

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "productCategory" && slug.current == $slug][0]{
    ...,
    parent->{ _id, title, slug },
    "children": *[_type == "productCategory" && parent._ref == ^._id]{
      _id, title, slug, image
    }
  }
`);

export const HOMEPAGE_QUERY = defineQuery(`{
  "articles": *[_type == "article" && articleType == "inspirasjon"] | order(publishedAt desc) [0..5] {
    _id, title, slug, excerpt, mainImage, articleType
  },
  "categories": *[_type == "productCategory" && !defined(parent)] | order(title asc) {
    _id, title, slug, image
  }
}`);

export const SITEMAP_QUERY = defineQuery(`{
  "products": *[_type == "product"]{ "slug": slug.current, _updatedAt },
  "colors": *[_type == "color"]{ "slug": slug.current, _updatedAt },
  "services": *[_type == "service"]{ "slug": slug.current, _updatedAt },
  "articles": *[_type == "article"]{ "slug": slug.current, _updatedAt },
  "stores": *[_type == "store"]{ "slug": slug.current, _updatedAt },
  "categories": *[_type == "productCategory"]{ "slug": slug.current, _updatedAt }
}`);
