import React from 'react';
import type { NextPage } from 'next';

import { ProductPageContent } from '../../src/features/product-page-content';

// Client route doubles the /product/[category]/[slug] route for client side, because Next.js
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

const ProductPage: NextPage = () => {
  return <ProductPageContent />;
};

export default ProductPage;
