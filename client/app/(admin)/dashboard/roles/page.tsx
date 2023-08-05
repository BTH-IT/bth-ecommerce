import { Metadata } from 'next';
import React from 'react';
import RoleContainer from './_components/RoleContainer';
import '@/css/pages/role.css';
import PermissionHOC from '@/components/PermissionHOC';
export const metadata: Metadata = {
  title: 'BTH Ecommerce | Dashboard - Roles',
  description: 'BTH Ecommerce | Dashboard - Roles',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const RolePage = PermissionHOC(() => {
  return <RoleContainer></RoleContainer>;
});

export default RolePage;
