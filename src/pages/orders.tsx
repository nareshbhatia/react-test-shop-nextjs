import React from 'react';
import {
  Header,
  OrderView,
  ScrollingContainer,
  ViewVerticalContainer,
} from '../components';
import { Order } from '../models';
import { DB_URL } from '../utils';

interface OrdersPageProps {
  orders: Array<Order>;
}

const OrdersPage = ({ orders }: OrdersPageProps) => {
  return (
    <ViewVerticalContainer>
      <Header />
      <ScrollingContainer className="container flex-1 my-2">
        {orders.length === 0 ? (
          <p>Your have no orders.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="w-640">
              <OrderView order={order} />
            </div>
          ))
        )}
      </ScrollingContainer>
    </ViewVerticalContainer>
  );
};

export async function getServerSideProps() {
  // From https://nextjs.org/docs/basic-features/data-fetching:
  //
  // You should not use fetch() to call an API route in getServerSideProps.
  // Instead, directly import the logic used inside your API route. You may
  // need to slightly refactor your code for this approach.
  //
  // Fetching from an external API is fine!

  const resOrders = await fetch(`${DB_URL}/orders`);
  const orders = await resOrders.json();

  const sortedOrders = orders.sort((order1: Order, order2: Order) => {
    const date1 = new Date(order1.createdAt);
    const date2 = new Date(order2.createdAt);
    if (date1 < date2) return 1;
    if (date1 > date2) return -1;
    return 0;
  });

  return {
    props: {
      orders: sortedOrders,
    },
  };
}

export default OrdersPage;
