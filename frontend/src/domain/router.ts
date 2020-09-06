import singletonRouter from 'next/router';

import { root } from './root';

export const routerDomain = root.createDomain('router');

export const routeChangeStart = routerDomain.createEvent('routeChangeStarted');
export const routeChangeComplete = routerDomain.createEvent();
export const routeChangeError = routerDomain.createEvent();
export const beforeHistoryChange = routerDomain.createEvent();
export const hashChangeStart = routerDomain.createEvent();
export const hashChangeComplete = routerDomain.createEvent();

const connectRouterToEffector = (singletonRouter) => {
  singletonRouter.ready(() => {
    const router = singletonRouter.router;

    // forward next.js router events to effector events
    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);
    router.events.on('routeChangeError', (err, url) =>
      routeChangeError([err, url]),
    );
    router.events.on('beforeHistoryChange', beforeHistoryChange);
    router.events.on('hashChangeStart', hashChangeStart);
    router.events.on('hashChangeComplete', hashChangeComplete);
  });
};

connectRouterToEffector(singletonRouter);
