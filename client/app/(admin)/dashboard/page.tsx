import { Metadata } from 'next';
import React from 'react';
import DashboardResume from './_components/DashboardResume';
import DashboardChart from './_components/DashboardChart';
import DashboardBestsellerProduct from './_components/DashboardBestsellerProduct';
import DashboardBestsellerBrand from './_components/DashboardBestsellerBrand';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard',
  description: 'BTH Ecommerce | Dashboard',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const DashboardPage = async () => {
  return (
    <div className="dashboard-page">
      <DashboardResume></DashboardResume>
      <DashboardChart></DashboardChart>
      <DashboardBestsellerProduct></DashboardBestsellerProduct>
      <DashboardBestsellerBrand></DashboardBestsellerBrand>
    </div>
  );
};

export default DashboardPage;
