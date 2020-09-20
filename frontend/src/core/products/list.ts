import { shopApi } from '../api';
import { root } from '../root';
import { notify } from '../notifications';
import type { AllProductsType } from '../../domain/products';

export const getAllProductsFx = root.createEffect({
  async handler() {
    const prods = await shopApi.getAllProducts();

    return prods;
  },
});

export const $allProducts = root.createStore<AllProductsType>({
  TShirt: [],
  Sticker: [],
});

$allProducts.on(getAllProductsFx.doneData, (_, data) => data);

getAllProductsFx.fail.watch((...args) => {
  console.log('fail args', args);
  notify({ text: 'Что-то пошло не так', type: 'error' });
});

export const $isEmpty = $allProducts.map((s) => !(s.Sticker || s.TShirt));
export const $stickers = $allProducts.map((s) => s.Sticker);
export const $tshirts = $allProducts.map((s) => s.TShirt);
