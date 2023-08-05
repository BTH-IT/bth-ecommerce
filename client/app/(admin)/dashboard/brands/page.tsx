import { Metadata } from 'next';
import React from 'react';
import BrandContainer from './_components/BrandContainer';
import '../../../../css/pages/brand.css';
import PermissionHOC from '@/components/PermissionHOC';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Orders',
  description: 'BTH Ecommerce | Dashboard - Orders',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const BrandPage = PermissionHOC(() => {
  return <BrandContainer></BrandContainer>;
});

export default BrandPage;
