import { Metadata } from 'next';
import React from 'react';
import BrandContainer from './_components/BannerContainer';
import '../../../../css/pages/brand.css';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Orders',
  description: 'BTH Ecommerce | Dashboard - Orders',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const BrandPage = () => {
  return <BrandContainer></BrandContainer>;
};

export default BrandPage;
