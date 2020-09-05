import singletonRouter from 'next/router';

import { root } from './root';

export const routeChangeStarted = root.createEvent('routeChangeStarted');

routeChangeStarted.watch((...args) => console.log('r change:', args));

const connectRouterToEffector = (singletonRouter) => {
  if (singletonRouter.router) {
    const router = singletonRouter.router;

    console.log('router loaded', router);

    router.events.on('routeChangeStart', routeChangeStarted);
  } else if (typeof window !== 'undefined') {
    console.log('router not loaded, retry');
    setTimeout(() => {
      connectRouterToEffector(singletonRouter);
    });
  }
};

connectRouterToEffector(singletonRouter);
