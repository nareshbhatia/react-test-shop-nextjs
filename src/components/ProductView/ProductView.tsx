import React from 'react';
import Image from 'next/image';
import { NumberUtils } from '@react-force/number-utils';
import { Product } from '../../models';
import { HorizontalContainer } from '../Containers';
import styles from './ProductView.module.css';

export interface ProductViewProps {
  product: Product;
  onClick: (productId: string) => void;
}

export const ProductView = ({ product, onClick }: ProductViewProps) => {
  const { id, name, description, price, photo } = product;

  return (
    <HorizontalContainer
      testId="product"
      className={`${styles.product} paper border-paper items-center`}
      onClick={() => onClick(id)}
    >
      <div className={styles.photo}>
        <Image src={photo} alt={name} layout="fill" objectFit="contain" />
      </div>
      <div className="ml-4">
        <h3>{name}</h3>
        <p className="mt-0">{description}</p>
        <p className="mb-0">${NumberUtils.formatAsMoney(price)}</p>
      </div>
    </HorizontalContainer>
  );
};
