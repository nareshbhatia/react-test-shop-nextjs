import React from 'react';
import {
  CartView,
  CatalogView,
  Header,
  HorizontalContainer,
  ScrollingContainer,
  ViewVerticalContainer,
} from '../components';
import { Cart, Catalog } from '../models';
import { DB_URL } from '../utils';

interface HomePageProps {
  catalog: Catalog;
  cart: Cart;
}

const HomePage = ({ catalog, cart }: HomePageProps) => {
  return (
    <ViewVerticalContainer>
      <Header />
      <HorizontalContainer className="min-h-0 container">
        <ScrollingContainer className="flex-1 my-2">
          <CatalogView catalog={catalog} />
        </ScrollingContainer>
        <ScrollingContainer className="paper border-paper ml-2 my-2 p-2 w-400">
          <CartView cart={cart} />
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

  const resCatalog = await fetch(`${DB_URL}/catalog`);
  const catalog = await resCatalog.json();

  const resCart = await fetch(`${DB_URL}/cart`);
  const cart = await resCart.json();

  return {
    props: {
      catalog,
      cart,
    },
  };
}

export default HomePage;
