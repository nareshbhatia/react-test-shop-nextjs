import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { CheckoutInfo, Order, OrderItem } from '../../../models';
import { DB_URL } from '../../../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const checkoutInfo = req.body as CheckoutInfo;

  // Get the cart
  const resCart = await fetch(`${DB_URL}/cart`);
  const cart = await resCart.json();

  // Move cart items into the order
  const order: Order = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    items: cart,
    shippingAddress: checkoutInfo.shippingAddress,
  };

  // Create the order
  await fetch(`${DB_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

  // clear the cart
  cart.forEach(async (item: OrderItem) => {
    await fetch(`${DB_URL}/cart/${item.id}`, {
      method: 'DELETE',
    });
  });

  // return the new order
  res.status(201).send(order);
}
