import { Metadata } from 'next';
import React from 'react';
import SupplierContainer from './_components/SupplierContainer';
import '@/css/pages/supplier.css';
export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Suppliers',
  description: 'BTH Ecommerce | Dashboard - Suppliers',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const SupplierPage = () => {
  return <SupplierContainer></SupplierContainer>;
};

export default SupplierPage;
