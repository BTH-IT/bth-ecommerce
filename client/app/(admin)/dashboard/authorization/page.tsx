import { Metadata } from 'next';
import React from 'react';
import AuthorizationContainer from './_components/AuthorizationContainer';
import '@/css/pages/role.css';
export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Authorization',
  description: 'BTH Ecommerce | Dashboard - Orders',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const AuthorizationPage = () => {
  return <AuthorizationContainer></AuthorizationContainer>;
};

export default AuthorizationPage;
