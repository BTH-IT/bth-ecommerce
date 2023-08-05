import { Metadata } from 'next';
import React from 'react';
import SupplierContainer from './_components/SupplierContainer';
import '@/css/pages/supplier.css';
import PermissionHOC from '@/components/PermissionHOC';
export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Suppliers',
  description: 'BTH Ecommerce | Dashboard - Suppliers',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const SupplierPage = PermissionHOC(() => {
  return <SupplierContainer></SupplierContainer>;
});

export default SupplierPage;
