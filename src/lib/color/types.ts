export interface Color {
  id: string;
  name: string;
  nameSE: string;
  nameDK: string;
  ncs: string;
  hex: string | null;
  rgb: { r: number | null; g: number | null; b: number | null };
  luminance: number | null;
  description: string;
  descriptionEN: string;
  application: "interior" | "exterior" | "both";
  matchingColors: string[];
  imagesInterior: string[];
  imagesExterior: string[];
  tags: string[];
  staffColors?: string[];
  staffNames?: string[];
  murColors?: string[];
  murNames?: string[];
  terrasseColors?: string[];
  terrasseNames?: string[];
}

export interface Collection {
  id: string;
  name: string;
  brand: string;
  applicationArea: string;
  description: string;
  year: number | null;
  type: "palette" | "trend" | "specialty";
  colorIds: string[];
}

export interface Family {
  familyCode: string;
  name: string;
  shortName: string;
  finishName: string;
  applicationArea: string;
  section: string;
  description: string;
  badge: string | null;
  glossOptions?: string[];
  specs: {
    washClass: string;
    voc: string;
    coverage: string;
    dryTime: string;
  };
  products: Product[];
}

export interface Product {
  productCode: string;
  fillLevel: string;
  priceNOK: number;
}

export type ApplicationFilter = "all" | "interior" | "exterior";
export type TempFilter = "all" | "varm" | "kald" | "nøytral";
export type LightFilter = "all" | "lys" | "mørk";
