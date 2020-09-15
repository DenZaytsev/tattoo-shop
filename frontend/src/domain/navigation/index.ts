import { routeChangeComplete } from '../../../lib/next-router-effector';
import { root } from '../root';

export const toggleNav = root.createEvent();
export const openNav = root.createEvent();
export const closeNav = root.createEvent();

export const $mobileNavVisible = root.createStore(false);

$mobileNavVisible
  .on(toggleNav, (s) => !s)
  .on(openNav, () => true)
  .on(closeNav, () => false)
  .on(routeChangeComplete, () => false);
