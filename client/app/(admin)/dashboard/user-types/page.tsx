import { Metadata } from 'next';
import React from 'react';
import UserTypeContainer from './_components/UserTypeContainer';
import '@/css/pages/user-type.css';
import PermissionHOC from '@/components/PermissionHOC';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - User Types',
  description: 'BTH Ecommerce | Dashboard - User Types',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const UserTypePage = PermissionHOC(() => {
  return <UserTypeContainer></UserTypeContainer>;
});

export default UserTypePage;
