import React, { Fragment } from 'react';
import { NumberUtils } from '@react-force/number-utils';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { Cart, CartUtils } from '../../models';
import { HorizontalContainer } from '../Containers';
import styles from './CartView.module.css';

export interface CartViewProps {
  cart: Cart;
}

export const CartView = ({ cart }: CartViewProps) => {
  const router = useRouter();

  const handleQuantityChange = (productId: string, quantity: string) => {
    // setItemQuantityMutation.mutate({
    //   productId,
    //   quantity: parseInt(quantity, 10),
    // });
  };

  const handleDelete = (productId: string) => {
    // deleteItemMutation.mutate(productId);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <Fragment>
      <HorizontalContainer className="justify-between items-center">
        <h2>Shopping Cart</h2>
        {cart.items.length > 0 ? (
          <button className="btn btn-sm btn-secondary" onClick={handleCheckout}>
            Checkout
          </button>
        ) : null}
      </HorizontalContainer>
      {cart.items.length === 0 ? (
        <p>Please click on a product to start your order.</p>
      ) : (
        <table data-testid="order-items" className="mt-3">
          <tbody>
            {cart.items.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td className={`${styles.qtyCol} text-right`}>
                  <input
                    data-testid="quantity-input"
                    className={styles.qty}
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.productId, e.target.value)
                    }
                  />
                </td>
                <td
                  className={`${styles.priceCol} text-right`}
                  data-testid="price-cell"
                >
                  {NumberUtils.formatAsMoney(item.price * item.quantity)}
                </td>
                <td className={`${styles.delCol} text-center`}>
                  <AiTwotoneDelete
                    data-testid="delete-button"
                    className="cursor-pointer"
                    onClick={() => handleDelete(item.productId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total</td>
              <td className="text-right">
                {NumberUtils.formatAsMoney(CartUtils.total(cart))}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </Fragment>
  );
};