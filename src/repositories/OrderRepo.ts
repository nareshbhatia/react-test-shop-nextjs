import fs from 'fs';
import orders from '../data/orders.json';

// Orders are saved in a JSON file for simplicity.
// For production applications, store in a real database.
export const OrderRepo = {
  getOrders: () => orders,
};
