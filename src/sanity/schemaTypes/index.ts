import { seo } from "./objects/seo";
import { portableText } from "./objects/portableText";
import { articlePortableText } from "./objects/articlePortableText";
import { campaignHero } from "./objects/campaignHero";
import { featureBlock } from "./objects/featureBlock";
import { productCard } from "./objects/productCard";
import { colorPaletteEmbed } from "./objects/colorPaletteEmbed";
import { stepByStep } from "./objects/stepByStep";
import { beforeAfter } from "./objects/beforeAfter";
import { videoEmbed } from "./objects/videoEmbed";
import { ctaBlock } from "./objects/ctaBlock";
import { calloutBox } from "./objects/calloutBox";
import { comparisonTable } from "./objects/comparisonTable";
import { materialsList } from "./objects/materialsList";
import { productSlider } from "./objects/productSlider";
import { colorSlider } from "./objects/colorSlider";
import { articleSlider } from "./objects/articleSlider";
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
import { homePage } from "./documents/homePage";

export const schemaTypes = [
  // Objects
  seo,
  portableText,
  articlePortableText,
  campaignHero,
  featureBlock,
  productCard,
  colorPaletteEmbed,
  stepByStep,
  beforeAfter,
  videoEmbed,
  ctaBlock,
  calloutBox,
  comparisonTable,
  materialsList,
  productSlider,
  colorSlider,
  articleSlider,
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
  homePage,
];
