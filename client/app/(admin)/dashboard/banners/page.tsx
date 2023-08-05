import { Metadata } from 'next';
import React from 'react';
import '../../../../css/pages/banner.css';
import BannerContainer from './_components/BannerContainer';
import PermissionHOC from '@/components/PermissionHOC';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Banners',
  description: 'BTH Ecommerce | Dashboard - Banners',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const BannerPage = () => {
  return <BannerContainer></BannerContainer>;
};

export default BannerPage;
