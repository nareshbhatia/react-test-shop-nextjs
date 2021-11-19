import type { NextApiRequest, NextApiResponse } from 'next';
import { DB_URL } from '../../../utils';

interface SetItemQuantityInput {
  productId: string;
  quantity: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productId, quantity } = req.body as SetItemQuantityInput;

  // get the item corresponding to the product
  const resItems = await fetch(`${DB_URL}/cart?productId=${productId}`);
  const items = await resItems.json();
  switch (items.length) {
    case 0:
      res.status(404).send({
        error: `${productId} is not in the cart`,
      });
      break;
    case 1:
      const existingOrderItem = items[0];
      existingOrderItem.quantity = quantity;
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
