import { forward } from 'effector';

import {
  routeChangeStart,
  routeChangeComplete,
} from '../../../lib/next-router-effector';
import { showLoader, hideLoader } from '../app-loading';
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

forward({
  from: routeChangeStart,
  to: showLoader,
});

forward({
  from: routeChangeComplete,
  to: hideLoader,
});
