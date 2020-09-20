import React from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

const ProductPage: React.FC = () => {
  const {
    query: { slug },
  } = useRouter();

  return (
    <>
      <NextSeo
        title="Продуктнейм (или скетч)"
        description="Лучшая футболочка, просто топ"
      />
      <div>product slug: {slug}</div>
    </>
  );
};

export default ProductPage;
