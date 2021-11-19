import React, { Fragment } from 'react';
import { NumberUtils } from '@react-force/number-utils';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { OrderItem, OrderItemUtils } from '../../models';
import { HorizontalContainer } from '../Containers';
import styles from './CartView.module.css';

export interface CartViewProps {
  cart: Array<OrderItem>;
}

export const CartView = ({ cart }: CartViewProps) => {
  const router = useRouter();

  // This function forces a call to getServerSideProps(),
  // thus refreshing the page data.
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleQuantityChange = async (productId: string, quantity: string) => {
    await fetch('/api/cart/set-item-quantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity: parseInt(quantity, 10) }),
    });
    refreshData();
  };

  const handleDelete = async (productId: string) => {
    await fetch('/api/cart/delete-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    refreshData();
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <Fragment>
      <HorizontalContainer className="justify-between items-center">
        <h2>Shopping Cart</h2>
        {cart.length > 0 ? (
          <button className="btn btn-sm btn-secondary" onClick={handleCheckout}>
            Checkout
          </button>
        ) : null}
      </HorizontalContainer>
      {cart.length === 0 ? (
        <p>Please click on a product to start your order.</p>
      ) : (
        <table data-testid="order-items" className="mt-3">
          <tbody>
            {cart.map((item, index) => (
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
                {NumberUtils.formatAsMoney(OrderItemUtils.totalItems(cart))}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </Fragment>
  );
};
