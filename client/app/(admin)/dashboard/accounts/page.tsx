import { Metadata } from 'next';
import React from 'react';
import AccountContainer from './_components/AccountContainer';
import '../../../../css/pages/account.css';
import PermissionHOC from '@/components/PermissionHOC';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Accounts',
  description: 'BTH Ecommerce | Dashboard - Accounts',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const AccountPage = PermissionHOC(() => {
  return <AccountContainer></AccountContainer>;
});

export default AccountPage;
