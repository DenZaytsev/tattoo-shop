import { shopApi } from '../api';
import { root } from '../root';
import { notify } from '../../features/notifications/model';
import { ProductCategories } from '../../domain/products';
import type { AllProductsType, AnyProduct } from '../../domain/products';

export const getAllProductsFx = root.createEffect({
  async handler() {
    const prods = await shopApi.getAllProducts();

    return prods;
  },
});

export const $allProducts = root.createStore<AllProductsType>([]);

$allProducts.on(getAllProductsFx.doneData, (_, data) => data);

export const $isEmpty = $allProducts.map((s) => s?.length === 0);

export const $stickers = $allProducts.map((s) =>
  s.find((el) => el.categoryTitle === ProductCategories.Sticker),
);
export const $stickersList = $stickers.map(
  (stickers) => stickers?.content || [],
);

export const $tshirts = $allProducts.map((s) =>
  s.find((el) => el.categoryTitle === ProductCategories.TShirt),
);
export const $tshirtsList = $tshirts.map((tshirts) => tshirts?.content || []);

export const getProductFx = root.createEffect({
  async handler({ category, slug }) {
    const prod = await shopApi.getProduct({ category, slug });

    return prod;
  },
});

export const $currentProductPage = root.createStore<AnyProduct | null>(null);

$currentProductPage.on(getProductFx.doneData, (_, data) => data);

getProductFx.fail.watch((...args) => {
  console.log('fail args', args);
  notify({ text: 'Что-то пошло не так', type: 'error' });
});
