import { Metadata } from 'next';
import React from 'react';
import '@/css/pages/product.css';
import ProductContainer from './_components/ProductContainer';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Orders',
  description: 'BTH Ecommerce | Dashboard - Orders',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const ProductPage = () => {
  return <ProductContainer></ProductContainer>;
};

export default ProductPage;
