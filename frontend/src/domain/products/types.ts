export const Sizes = {
  S: 'SMALL',
  M: 'MEDIUM',
  L: 'LARGE',
  XL: 'EXTRA LARGE',
} as const;

export const Colours = {
  B: 'BLACK',
  W: 'WHITE',
} as const;

export const ProductCategories = {
  TattooSketch: 'TattooSketch',
  Sticker: 'Sticker',
  TShirt: 'TShirt',
} as const;

export type TattooSketchProduct = {
  id: number;
  title: string;
  description?: string;
  vacant?: boolean;
  image?: string;
  slug: string;
};

export type BaseProduct = {
  id: number;
  title: string;
  description?: string;
  price?: number;
  quantity: number;
  category: string;
  image?: string;
  slug: string;
};

type ValueOf<T> = T[keyof T];
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type Size = ValueOf<typeof Sizes>;
export type Colour = ValueOf<typeof Colours>;

export type TShirtProduct = Partial<BaseProduct> & {
  size: Size;
  colour: Colour;
};

export type StickerProduct = Partial<BaseProduct>;

export type AnyProduct = TattooSketchProduct | BaseProduct | TShirtProduct;

export type CategoryToProduct = {
  [ProductCategories.TShirt]: TShirtProduct;
  [ProductCategories.Sticker]: StickerProduct;
  [ProductCategories.TattooSketch]: TattooSketchProduct;
};

export type AllProducts = {
  [key in keyof CategoryToProduct]?: Array<Pick<CategoryToProduct, key>>;
};
