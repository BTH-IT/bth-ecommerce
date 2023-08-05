import { Metadata } from 'next';
import React from 'react';
import PermissionHOC from '@/components/PermissionHOC';
import DashboardContainer from './_components/DashboardContainer';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard',
  description: 'BTH Ecommerce | Dashboard',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const DashboardPage = PermissionHOC(() => {
  return <DashboardContainer></DashboardContainer>;
});

export default DashboardPage;
