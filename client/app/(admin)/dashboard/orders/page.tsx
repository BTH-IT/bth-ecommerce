import { Metadata } from 'next';
import React from 'react';
import '../../../../css/pages/order.css';
import OrderContainer from './_components/OrderContainer';
import PermissionHOC from '@/components/PermissionHOC';
export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Orders',
  description: 'BTH Ecommerce | Dashboard - Orders',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const OrderPage = () => {
  return <OrderContainer></OrderContainer>;
};

export default OrderPage;
