import React, { Fragment } from 'react';
import { OrderItem } from '../../models';
import { OrderItemList } from '../OrderView';

export interface CartSummaryProps {
  cart: Array<OrderItem>;
}

export const CartSummary = ({ cart }: CartSummaryProps) => {
  return (
    <Fragment>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <OrderItemList items={cart} className="mt-3" />
      )}
    </Fragment>
  );
};
