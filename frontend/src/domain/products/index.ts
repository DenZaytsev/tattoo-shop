import {
  Record,
  Array,
  Number,
  String,
  Undefined,
  Static,
  Null,
} from 'runtypes';

export const Sizes = {
  S: 'SMALL',
  M: 'MEDIUM',
  L: 'LARGE',
  XL: 'EXTRA LARGE',
} as const;

const SizesAsArray = Object.keys(Sizes);

export const Colours = {
  B: 'Чёрный',
  W: 'Белый',
} as const;

const ColoursAsArray = Object.keys(Colours);

export const ProductCategories = {
  Sticker: 'sticker',
  TShirt: 'tshirt',
} as const;

const BaseSketch = {
  id: Number,
  title: String,
  image: String.Or(Null),
  slug: String,
};

export const Sketch = Record(BaseSketch);
export type SketchType = Static<typeof Sketch>;

const BaseProductStruct = {
  title: String,
  description: String.Or(Null),
  price: String.withConstraint(
    (n) => parseFloat(n) >= 0 || 'price is less than zero (absurd!)',
  ),
  quantity: Number.withConstraint(
    (n) => n >= 0 || 'quantity must be zero or more',
  ).Or(Undefined),
  image: String.Or(Null),
  slug: String,
  categoryTitle: String,
};

export const BaseProduct = Record(BaseProductStruct);

export const TShirt = Record({
  ...BaseProductStruct,
  size: String.withConstraint(
    (str) => SizesAsArray.includes(str) || 'unknown size',
  )
    .Or(Undefined)
    .Or(Null),
  colour: String.withConstraint(
    (str) => ColoursAsArray.includes(str) || 'unknown colour',
  )
    .Or(Undefined)
    .Or(Null),
});

export const Category = Record({
  categoryId: Number,
  categoryTitle: String,
  content: Array(BaseProduct),
});

export const AllProducts = Array(Category);

export type AllProductsType = Static<typeof AllProducts>;

export type AnyProduct = Partial<Static<typeof BaseProduct & typeof TShirt>>;
