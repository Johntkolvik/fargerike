export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
}

export interface SanitySeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; width: number; height: number };
  alt?: string;
  imageType?: string;
  caption?: string;
  room?: string;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityProductVariant {
  volume: string;
  price: number;
  ean?: string;
}

export interface SanityFaq {
  question: string;
  answer: string;
}

export interface SanityEquipment {
  category: string;
  productName: string;
  description?: string;
}

export interface SanityCertification {
  name: string;
  description?: string;
}

export interface SanityProduct extends SanityDocument {
  _type: "product";
  sku: string;
  displayName: string;
  subtitle?: string;
  slug: SanitySlug;
  category?: SanityProductCategory;
  brand?: string;
  productLine?: string;
  description?: unknown[];
  highlights?: string[];
  images?: SanityImage[];
  // Technical
  surfaceTypes?: string[];
  notSuitableFor?: string[];
  coverage?: string;
  coats?: number;
  dryingTimeDust?: string;
  dryingTimeRecoat?: string;
  gloss?: string;
  binderType?: string;
  vocContent?: string;
  applicationMethods?: string[];
  cleanup?: string;
  certifications?: SanityCertification[];
  technicalSpecs?: { label: string; value: string }[];
  // Variants
  variants?: SanityProductVariant[];
  bases?: string[];
  // Content
  faq?: SanityFaq[];
  recommendedEquipment?: SanityEquipment[];
  relatedArticles?: SanityArticle[];
  seo?: SanitySeo;
}

export interface SanityCompatibleProduct {
  surfaceType: string;
  product: SanityProduct;
  shortDescription?: string;
}

export interface SanityColorComparison {
  comparisonText: string;
  comparedColor?: SanityColor;
}

export interface SanityColor extends SanityDocument {
  _type: "color";
  name: string;
  colorCode?: string;
  slug: SanitySlug;
  hexValue?: string;
  ncsCode?: string;
  brand?: string;
  colorChart?: string;
  colorFamily?: string;
  usage?: string[];
  description?: string;
  environmentImages?: SanityImage[];
  colorComparisons?: SanityColorComparison[];
  compatibleProducts?: SanityCompatibleProduct[];
  relatedColors?: SanityColor[];
  complementaryColors?: SanityColor[];
  relatedArticles?: SanityArticle[];
  faq?: SanityFaq[];
  seo?: SanitySeo;
}

export interface SanityService extends SanityDocument {
  _type: "service";
  title: string;
  slug: SanitySlug;
  serviceType?: string;
  description?: unknown[];
  price?: number;
  duration?: string;
  preparation?: string;
  faq?: SanityFaq[];
  images?: SanityImage[];
  availableAtStores?: SanityStore[];
  seo?: SanitySeo;
}

export interface SanityArticle extends SanityDocument {
  _type: "article";
  title: string;
  slug: SanitySlug;
  articleType: string;
  excerpt?: string;
  mainImage?: SanityImage;
  body?: unknown[];
  relatedProducts?: SanityProduct[];
  relatedColors?: SanityColor[];
  contentCluster?: SanityContentCluster;
  publishedAt?: string;
  seo?: SanitySeo;
}

export interface SanityStore extends SanityDocument {
  _type: "store";
  name: string;
  slug: SanitySlug;
  address?: { street?: string; postalCode?: string; city?: string };
  coordinates?: { lat: number; lng: number };
  phone?: string;
  email?: string;
  pinmetoId?: string;
  openingHours?: { day: string; open: string; close: string }[];
  services?: SanityService[];
  localContent?: unknown[];
  images?: SanityImage[];
  seo?: SanitySeo;
}

export interface SanityProductCategory extends SanityDocument {
  _type: "productCategory";
  title: string;
  slug: SanitySlug;
  parent?: SanityProductCategory;
  description?: string;
  image?: SanityImage;
  seo?: SanitySeo;
}

export interface SanityContentCluster extends SanityDocument {
  _type: "contentCluster";
  title: string;
  slug: SanitySlug;
  description?: string;
  pillarContent?: unknown[];
  seo?: SanitySeo;
}
