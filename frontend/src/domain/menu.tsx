import { root } from './root';
import { notify } from './notifications';
import { routeChangeStarted } from './router';

export const toggleMenu = root.createEvent();
export const openMenu = root.createEvent();
export const closeMenu = root.createEvent();

export const $menuVisible = root.createStore(false);

$menuVisible
  .on(toggleMenu, (s) => !s)
  .on(openMenu, () => true)
  .on(closeMenu, () => false)
  .on(routeChangeStarted, (s) => !s);

$menuVisible.watch((s) =>
  notify({
    text: `Меню ${s ? 'открыто' : 'закрыто'}!`,
    type: s ? 'success' : 'error',
  }),
);