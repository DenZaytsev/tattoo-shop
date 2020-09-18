import { root } from '../root';
import type { AllProducts } from './types';

export const $allProducts = root.createStore<AllProducts>({});
export const $isEmpty = $allProducts.map((s) => !(s.Sticker || s.TShirt));
export const $stickers = $allProducts.map((s) => s.Sticker || []);
export const $tshirts = $allProducts.map((s) => s.TShirt || []);
