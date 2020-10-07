import singletonRouter from 'next/router';
import type { NextRouter } from 'next/router';
// import { createDomain } from 'effector';

import { root } from '../../src/core/root';

export const routerDomain = root.createDomain('router');

type NextRouterEventWithError = [any, string];

export const routeChangeStart = routerDomain.createEvent<string>(
  'routeChangeStarted',
);
export const routeChangeComplete = routerDomain.createEvent<string>();
export const routeChangeError = routerDomain.createEvent<
  NextRouterEventWithError
>();
export const beforeHistoryChange = routerDomain.createEvent<string>();
export const hashChangeStart = routerDomain.createEvent<string>();
export const hashChangeComplete = routerDomain.createEvent<string>();

export const pushFx = routerDomain.createEffect();
export const doThenPushFx = routerDomain.createEffect({
  handler: async ({ fn, params, pushParams }) => {
    await fn(params);
    pushFx(pushParams);
  },
});

const connectRouterToEffector = (nextRouter) => {
  nextRouter.ready(() => {
    const { router }: { router: NextRouter } = nextRouter;

    // forward next.js router events to effector events
    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);
    router.events.on('routeChangeError', (err, url) =>
      routeChangeError([err, url]),
    );
    router.events.on('beforeHistoryChange', beforeHistoryChange);
    router.events.on('hashChangeStart', hashChangeStart);
    router.events.on('hashChangeComplete', hashChangeComplete);

    pushFx.use(async ({ url, as, options }) => {
      await router.push(url, as, options);
    });
  });
};

connectRouterToEffector(singletonRouter);
