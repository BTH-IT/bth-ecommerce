import { Metadata } from 'next';
import React from 'react';
import OrderContainer from './_components/OrderContainer';
import '../../../../css/pages/order.css';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Import Orders',
  description: 'BTH Ecommerce | Dashboard - Import Orders',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const ImportOrderPage = () => {
  return <OrderContainer></OrderContainer>;
};

export default ImportOrderPage;
