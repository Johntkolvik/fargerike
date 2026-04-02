import { seo } from "./objects/seo";
import { portableText } from "./objects/portableText";
import { campaignHero } from "./objects/campaignHero";
import { featureBlock } from "./objects/featureBlock";
import { product } from "./documents/product";
import { color } from "./documents/color";
import { service } from "./documents/service";
import { article } from "./documents/article";
import { store } from "./documents/store";
import { productCategory } from "./documents/productCategory";
import { contentCluster } from "./documents/contentCluster";
import { productFamily } from "./documents/productFamily";
import { productAttribute } from "./documents/productAttribute";
import { colorCollection } from "./documents/colorCollection";

export const schemaTypes = [
  // Objects
  seo,
  portableText,
  campaignHero,
  featureBlock,
  // Documents
  product,
  productFamily,
  productAttribute,
  color,
  colorCollection,
  service,
  article,
  store,
  productCategory,
  contentCluster,
];
