import { shopApi } from '../api';
import { root } from '../root';
import { notify } from '../notifications';
import { ProductCategories } from '../../domain/products';
import type { AllProductsType } from '../../domain/products';

export const getAllProductsFx = root.createEffect({
  async handler() {
    const prods = await shopApi.getAllProducts();

    return prods;
  },
});

export const $allProducts = root.createStore<AllProductsType>([]);

$allProducts.on(getAllProductsFx.doneData, (_, data) => data);

getAllProductsFx.fail.watch((...args) => {
  console.log('fail args', args);
  notify({ text: 'Что-то пошло не так', type: 'error' });
});

export const $isEmpty = $allProducts.map((s) => s.length === 0);

export const $stickers = $allProducts.map((s) =>
  s.find((el) => el.categoryTitle === ProductCategories.Sticker),
);
export const $stickersList = $stickers.map((stickers) => stickers.content);

export const $tshirts = $allProducts.map((s) =>
  s.find((el) => el.categoryTitle === ProductCategories.TShirt),
);
export const $tshirtsList = $tshirts.map((tshirts) => tshirts.content);
