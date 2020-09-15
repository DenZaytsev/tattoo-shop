import React from 'react';
import { useRouter } from 'next/router';

const ProductPage: React.FC = () => {
  const {
    query: { slug },
  } = useRouter();

  return <div>product slug: {slug}</div>;
};

export default ProductPage;
