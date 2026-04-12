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
    "body": body[]{
      ...,
      _type == "productCard" => { ..., product->{ _id, displayName, slug, brand, images, variants } },
      _type == "colorPaletteEmbed" => { ..., colors[]->{ _id, name, slug, hexValue } },
      _type == "comparisonTable" => { ..., products[]->{ _id, displayName, slug, brand, technicalSpecs, variants } },
      _type == "productSlider" => { ..., products[]->{ _id, name, shortName, badge, brand, description, variants[]{ price }, image } },
      _type == "colorSlider" => { ..., colors[]->{ _id, name, slug, hexValue, colorCode }, collection->{ name } },
      _type == "articleSlider" => { ..., articles[]->{ _id, title, slug, excerpt, articleType, "mainImage": mainImage{ alt, "asset": asset->{ _ref, url } } } },
      _type == "materialsList" => { ..., items[]{ ..., product->{ _id, slug } } }
    },
    relatedProducts[]->{ _id, name, familyCode, brand, applicationArea, badge, shortName, description, image, variants[]{ price } },
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
    _id, name, slug, address, coordinates, county, phone, email, openingHours
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
  "homePage": *[_type == "homePage"][0]{
    hero {
      heading,
      tagline,
      "imageUrl": image.asset->url,
      primaryCta,
      secondaryCta,
      backgroundColor
    },
    categoryEntries[] {
      title,
      description,
      "imageUrl": image.asset->url,
      link
    },
    inspirationSection {
      heading,
      articles[]-> {
        _id, title, "slug": slug.current, excerpt, articleType,
        "imageUrl": mainImage.asset->url
      }
    }
  },
  "latestGuides": *[_type == "article" && articleType == "howto"] | order(publishedAt desc) [0..2] {
    _id, title, "slug": slug.current, excerpt, readingTime, articleType,
    "imageUrl": mainImage.asset->url
  },
  "latestInspiration": *[_type == "article" && articleType == "inspirasjon"] | order(publishedAt desc) [0..4] {
    _id, title, "slug": slug.current, excerpt, articleType, room,
    "imageUrl": mainImage.asset->url
  }
}`);

export const ALL_PRODUCT_ATTRIBUTES_QUERY = defineQuery(`
  *[_type == "productAttribute"]{
    code,
    name,
    shortDescription,
    whyItMatters,
    regulatoryContext,
    unit,
    scale[]{ label, value, description, isBest }
  }
`);

export const CATEGORY_PAGE_QUERY = defineQuery(`{
  "category": *[_type == "productCategory" && slug.current == $slug][0]{
    title, description, "imageUrl": image.asset->url
  },
  "contentCluster": *[_type == "contentCluster" && slug.current == $slug][0]{
    title, description, "imageUrl": image.asset->url
  },
  "articles": *[_type == "article" && ($slug in relatedCategories[]->slug.current || $slug in contentCluster->slug.current)] | order(publishedAt desc) [0..5]{
    _id, title, "slug": slug.current, excerpt, articleType, "imageUrl": mainImage.asset->url
  },
  "subcategories": *[_type == "productCategory" && parent->slug.current == $slug]{
    _id, title, "slug": slug.current, "imageUrl": image.asset->url
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
