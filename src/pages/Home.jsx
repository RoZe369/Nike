    import React from 'react';
import HeroBanner from '../components/features/HeroBanner.jsx';
import ProductForm from '../components/features/ProductForm.jsx';
import Cart from '../components/features/Cart.jsx';

export default function Home() {
  return (
    <>
      <HeroBanner />
      <ProductForm />
      <Cart />
    </>
  );
}