import { Metadata } from 'next';
import React from 'react';
import ImportProductContainer from './_components/ImportProductContainer';
import '@/css/pages/import-product.css';
export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Import Products',
  description: 'BTH Ecommerce | Dashboard - Import Products',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const ImportProductPage = () => {
  return <ImportProductContainer></ImportProductContainer>;
};

export default ImportProductPage;
