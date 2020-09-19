import { root } from '../root';
import type { AllProductsType } from '../../domain/products';

export const $allProducts = root.createStore<AllProductsType>({
  TShirt: [],
  Sticker: [],
});
export const $isEmpty = $allProducts.map((s) => !(s.Sticker || s.TShirt));
export const $stickers = $allProducts.map((s) => s.Sticker);
export const $tshirts = $allProducts.map((s) => s.TShirt);
