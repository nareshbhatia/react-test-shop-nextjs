import fs from 'fs';
import cart from '../data/cart.json';

// Cart is saved in a JSON file for simplicity.
// For production applications, store in a real database.
export const CartRepo = {
  getCart: () => cart,
};
