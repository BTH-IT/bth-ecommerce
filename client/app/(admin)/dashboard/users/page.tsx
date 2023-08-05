import { Metadata } from 'next';
import React from 'react';
import UserContainer from './_components/UserContainer';
import '@/css/pages/user.css';
import PermissionHOC from '@/components/PermissionHOC';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Users',
  description: 'BTH Ecommerce | Dashboard - Users',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const UserPage = PermissionHOC(() => {
  return <UserContainer></UserContainer>;
});

export default UserPage;
