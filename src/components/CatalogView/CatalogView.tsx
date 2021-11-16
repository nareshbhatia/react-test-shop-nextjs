import React, { Fragment } from 'react';
import { Catalog } from '../../models';
import { ProductView } from '../ProductView';

export interface CatalogViewProps {
  catalog: Catalog;
}

export const CatalogView = ({ catalog }: CatalogViewProps) => {
  const handleProductClicked = (productId: string) => {
    // addProductMutation.mutate(productId);
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
