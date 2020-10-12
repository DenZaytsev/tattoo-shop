import { root } from '../../core/root';
import { shopApi } from '../../core/api';

export const toggleCart = root.createEvent();
export const openCart = root.createEvent();
export const closeCart = root.createEvent();

export const $cartVisible = root.createStore(false);

$cartVisible
  .on(toggleCart, (s) => !s)
  .on(openCart, () => true)
  .on(closeCart, () => false);

export const $cart = root.createStore({});

export const getCartFx = root.createEffect({
  async handler() {
    const data = await shopApi.getCart();

    return data;
  },
});

$cart.on(getCartFx.doneData, (_, data) => data);

export const addToCartFx = root.createEffect({
  async handler({ category, slug }) {
    await shopApi.addToCart({ category, slug });
    await getCartFx();
  },
});
