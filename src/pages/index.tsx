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
import { CartRepo, CatalogRepo } from '../repositories';

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
  return {
    props: {
      catalog: CatalogRepo.getCatalog(),
      cart: CartRepo.getCart(),
    },
  };
}

export default HomePage;
