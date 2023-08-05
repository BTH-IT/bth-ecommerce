import { Metadata } from 'next';
import React from 'react';
import '../../../../css/pages/import-order.css';
import ImportOrderContainer from './_components/ImportOrderContainer';
import PermissionHOC from '@/components/PermissionHOC';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Import Orders',
  description: 'BTH Ecommerce | Dashboard - Import Orders',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const ImportOrderPage = () => {
  return <ImportOrderContainer></ImportOrderContainer>;
};

export default ImportOrderPage;
