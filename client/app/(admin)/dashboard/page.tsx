import { Metadata } from 'next';
import React from 'react';
import DashboardContainer from './_components/DashboardContainer';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard',
  description: 'BTH Ecommerce | Dashboard',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const DashboardPage = () => {
  return <DashboardContainer></DashboardContainer>;
};

export default DashboardPage;
