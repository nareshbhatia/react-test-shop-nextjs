import React from 'react';
import { useRouter } from 'next/router';
import {
  Header,
  HorizontalContainer,
  ScrollingContainer,
  ViewVerticalContainer,
} from '../components';
import { CheckoutInfo, OrderItem } from '../models';
import { CheckoutForm, CartSummary } from '../components';
import { DB_URL } from '../utils';

interface CheckoutPageProps {
  cart: Array<OrderItem>;
}

const CheckoutPage = ({ cart }: CheckoutPageProps) => {
  const router = useRouter();

  const handleSubmit = async (checkoutInfo: CheckoutInfo) => {
    await fetch('/api/cart/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutInfo),
    });

    router.push('/orders');
  };

  return (
    <ViewVerticalContainer>
      <Header />
      <HorizontalContainer className="min-h-0 container">
        <ScrollingContainer className="flex-1 my-2">
          <CheckoutForm onSubmit={handleSubmit} />
        </ScrollingContainer>
        <ScrollingContainer className="paper border-paper ml-2 my-2 p-2 w-400">
          <CartSummary cart={cart} />
        </ScrollingContainer>
      </HorizontalContainer>
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

  const resCart = await fetch(`${DB_URL}/cart`);
  const cart = await resCart.json();

  return {
    props: {
      cart,
    },
  };
}

export default CheckoutPage;
