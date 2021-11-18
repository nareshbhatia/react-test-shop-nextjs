import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { Catalog } from '../../models';
import { ProductView } from '../ProductView';

export interface CatalogViewProps {
  catalog: Catalog;
}

export const CatalogView = ({ catalog }: CatalogViewProps) => {
  const router = useRouter();

  // This function forces a call to getServerSideProps(),
  // thus refreshing the page data.
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleProductClicked = async (productId: string) => {
    await fetch('/api/cart/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    refreshData();
  };

  return (
    <Fragment>
      {Object.values(catalog).map((product) => (
        <ProductView
          key={product.id}
          product={product}
          onClick={handleProductClicked}
        />
      ))}
    </Fragment>
  );
};
