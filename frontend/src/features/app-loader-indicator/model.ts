import { root } from '../../core/root';

export const showLoader = root.createEvent();
export const hideLoader = root.createEvent();

export const $isAppLoading = root.createStore(false);

$isAppLoading.on(showLoader, () => true).on(hideLoader, () => false);
