export interface AlgoliaProductRecord {
  objectID: string;
  sku: string;
  displayName: string;
  brand?: string;
  category?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  slug: string;
}

export interface AlgoliaArticleRecord {
  objectID: string;
  title: string;
  excerpt?: string;
  articleType: string;
  slug: string;
  imageUrl?: string;
  publishedAt?: string;
}

export interface AlgoliaColorRecord {
  objectID: string;
  name: string;
  ncsCode?: string;
  hexValue?: string;
  brand?: string;
  colorChart?: string;
  slug: string;
}
