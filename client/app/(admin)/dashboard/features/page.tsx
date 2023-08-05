import { Metadata } from 'next';
import React from 'react';
import '@/css/pages/feature.css';
import FeatureContainer from './_components/FeatureContainer';
import PermissionHOC from '@/components/PermissionHOC';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Features',
  description: 'BTH Ecommerce | Dashboard - Features',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const FeaturePage = PermissionHOC(() => {
  return <FeatureContainer></FeatureContainer>;
});

export default FeaturePage;
