import { Metadata } from 'next';
import React from 'react';
import '@/css/pages/warranty.css';
import WarrantyContainer from './_components/WarrantyContainer';
export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Warranties',
  description: 'BTH Ecommerce | Dashboard - Warranties',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const WarrantyPage = () => {
  return <WarrantyContainer></WarrantyContainer>;
};

export default WarrantyPage;
