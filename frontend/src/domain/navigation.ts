import { root } from './root';

export const toggleNav = root.createEvent();
export const openNav = root.createEvent();
export const closeNav = root.createEvent();

export const $navVisible = root.createStore(false);

$navVisible
  .on(toggleNav, (s) => !s)
  .on(openNav, () => true)
  .on(closeNav, () => false);
