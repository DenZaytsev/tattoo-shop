import { root } from './root';

export const toggleMenu = root.createEvent();
export const openMenu = root.createEvent();
export const closeMenu = root.createEvent();

export const $menuVisible = root.createStore(false);

$menuVisible
  .on(toggleMenu, (s) => !s)
  .on(openMenu, () => true)
  .on(closeMenu, () => false);
