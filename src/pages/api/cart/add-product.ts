import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { DB_URL } from '../../../utils';

interface AddProductInput {
  productId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productId } = req.body as AddProductInput;

  // get product details
  const resProduct = await fetch(`${DB_URL}/catalog/${productId}`);
  const product = await resProduct.json();

  // find if the product is already in the cart
  const resItems = await fetch(`${DB_URL}/cart?productId=${productId}`);
  const items = await resItems.json();
  switch (items.length) {
    case 0:
      const newOrderItem = {
        id: uuidv4(),
        productId,
        productName: product.name,
        price: product.price,
        quantity: 1,
      }
      await fetch(`${DB_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrderItem),
      });
      res.status(201).send(newOrderItem);
      break;
    case 1:
      const existingOrderItem = items[0];
      existingOrderItem.quantity++;
      await fetch(`${DB_URL}/cart/${existingOrderItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(existingOrderItem),
      });
      res.status(200).send(existingOrderItem);
      break;
    default:
      res.status(500).send({
        error: `Found ${items.length} items with id ${productId} in the cart`,
      });
      break;
  }
}
