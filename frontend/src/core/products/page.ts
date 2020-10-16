import { shopApi } from '../api';
import { root } from '../root';
import { pushFx } from '../../../lib/next-router-effector';
import { notify } from '../../features/notifications/model';
import { showLoader } from '../../features/app-loader-indicator/model';
import type { AnyProduct } from '../../domain/products';

// declarations

export const getProductFx = root.createEffect({
  async handler({ category, slug }) {
    const prod = await shopApi.getProduct({ category, slug });

    return prod;
  },
});

export const $currentProductPage = root.createStore<AnyProduct | null>(null);

export const openProductPageFx = root.createEffect({
  async handler({ category, slug }) {
    showLoader();

    await getProductFx({ category, slug });

    await pushFx({
      url: '/product/client-route',
      as: `/product/${category}/${slug}`,
    });
  },
});

// interactions

$currentProductPage.on(getProductFx.doneData, (_, data) => data);

getProductFx.fail.watch(() => {
  notify({ text: 'Что-то пошло не так', type: 'error' });
});
