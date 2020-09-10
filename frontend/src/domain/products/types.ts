export type TattooSketch = {
  title: string;
  description?: string;
  vacant?: boolean;
  image?: string;
  slug: string;
};

export type Product = {
  title: string;
  description?: string;
  price?: number;
  quantity: number;
  category: string;
  image?: string;
  slug: string;
};

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

type ValueOf<T> = T[keyof T];

export type Size = ValueOf<typeof Sizes>;
export type Colour = ValueOf<typeof Colours>;

export type TShirt = Product & {
  size: Size;
  color: Colour;
};

export type AnyProduct = TattooSketch | Product | TShirt;
