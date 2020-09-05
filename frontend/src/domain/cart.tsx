import { root } from './root';

export const toggleCart = root.createEvent();
export const openCart = root.createEvent();
export const closeCart = root.createEvent();

export const $cartVisible = root.createStore(false);

$cartVisible
  .on(toggleCart, (s) => !s)
  .on(openCart, () => true)
  .on(closeCart, () => false);
