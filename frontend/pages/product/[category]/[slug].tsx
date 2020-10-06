import React from 'react';
import type { NextPage } from 'next';
import { serialize, fork, allSettled } from 'effector/fork';

import { ProductPageContent } from '../../../src/features/product-page-content';
import { root } from '../../../src/core/root';
import { getProductFx } from '../../../src/core/products';

// There is a client route in other file that doubles this server-route /product/[category]/[slug], because Next.js
// does not shallow client side routing without server prerendering for pages with getServerSideProps
// its results in unwanted full-page reload
// If there is a need to open product page from other client route, then do something like this:
//
// const clientOnlyTransition = (e) => {
//     e.preventDefault();

//     const unwatch = getProductFx.done.watch(() => { // subscribe to successful data-loaded event
//       router.push(                                  // push to client route, when product page data is loaded
//         {
//           pathname: '/product/client-route',
//         },
//         `/product/${categoryTitle}/${slug}`,        // set an "as" value for url via next api to url, thats corresponding to server side route /product/[category]/[slug]
//       );                                            // this way this link will be shareable with server prerender
//       unwatch();
//     });

//     getProductFx({ category: categoryTitle, slug }); // dont forget to trigger data loading somewhere
//   };

export const getServerSideProps = async ({ query: { category, slug } }) => {
  const scope = fork(root);

  await allSettled(getProductFx, { scope, params: { category, slug } });

  return {
    props: {
      values: serialize(scope),
    },
  };
};

const ProductPage: NextPage = () => {
  return <ProductPageContent />;
};

export default ProductPage;
