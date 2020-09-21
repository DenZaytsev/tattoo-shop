import React from 'react';
import { NextSeo } from 'next-seo';

import { Products } from '../src/features/products';

export default function Home() {
  return (
    <div>
      <NextSeo
        title="Jeune Pokes"
        description="Jeune Pokes - тут можно выбрать себе клевый скетч и сделать с ним тату! А еще можно заказать клевую кастомную футболку или стикер!"
      />

      <Products />
    </div>
  );
}
