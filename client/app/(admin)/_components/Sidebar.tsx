'use client';

import React from 'react';
import '../../../css/layouts/sidebar-dashboard.css';
import Link from 'next/link';
import Image from 'next/image';
import {
  Cog6ToothIcon,
  CreditCardIcon,
  HomeIcon,
  KeyIcon,
  QueueListIcon,
  RectangleGroupIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  TagIcon,
  TruckIcon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';

const sidebarItemList: any = [
  {
    href: '/dashboard',
    icon: <HomeIcon className="w-5 h-5" />,
    title: 'Dashboard',
  },
  {
    href: '/dashboard/orders',
    icon: <CreditCardIcon className="w-5 h-5" />,
    title: 'Orders',
  },
  {
    href: '/dashboard/import-orders',
    icon: <CreditCardIcon className="w-5 h-5" />,
    title: 'Import Orders',
  },
  {
    href: '/dashboard/brands',
    icon: <TagIcon className="w-5 h-5" />,
    title: 'Brands',
  },
  ,
  {
    href: '/dashboard/roles',
    icon: <RectangleGroupIcon className="w-5 h-5" />,
    title: 'Roles',
  },
  ,
  {
    href: '/dashboard/products',
    icon: <QueueListIcon className="w-5 h-5" />,
    title: 'Products',
  },
  ,
  {
    href: '/dashboard/users',
    icon: <UsersIcon className="w-5 h-5" />,
    title: 'Users',
  },
  ,
  {
    href: '/dashboard/user-types',
    icon: <UserGroupIcon className="w-5 h-5" />,
    title: 'User Types',
  },
  ,
  {
    href: '/dashboard/accounts',
    icon: <KeyIcon className="w-5 h-5" />,
    title: 'Accounts',
  },
  ,
  {
    href: '/dashboard/warranties',
    icon: <ShieldCheckIcon className="w-5 h-5" />,
    title: 'Warranties',
  },
  ,
  {
    href: '/dashboard/suppliers',
    icon: <TruckIcon className="w-5 h-5" />,
    title: 'Suppliers',
  },
  {
    href: '/dashboard/import-products',
    icon: <ShoppingCartIcon className="w-5 h-5" />,
    title: 'Import Products',
  },
  {
    href: '/dashboard/authorization',
    icon: <Cog6ToothIcon className="w-5 h-5" />,
    title: 'Authorization',
  },
  {
    href: '/dashboard/features',
    icon: <Squares2X2Icon className="w-5 h-5" />,
    title: 'Features',
  },
  {
    href: '/dashboard/banners',
    icon: <Squares2X2Icon className="w-5 h-5" />,
    title: 'Banners',
  },
];

sidebarItemList.sort(function (a: any, b: any) {
  return ('' + a.title).localeCompare(b.title);
});

const Sidebar = () => {
  const params = usePathname();

  return (
    <div className="sidebar-dashboard">
      <div className="sidebar-dashboard-logo">
        <Link href="/dashboard" className="sidebar-dashboard-logo__link">
          <span className="logo-img">
            <Image src="/logo.svg" alt="logo" width={50} height={50}></Image>
          </span>
          <span className="logo-text">
            <Image
              src="/logo-text.svg"
              alt="logo"
              width={125}
              height={24}
            ></Image>
          </span>
        </Link>
      </div>
      <ul className="sidebar-dashboard-actions">
        {sidebarItemList.map((sidebar: any) => (
          <li
            className={`sidebar-dashboard-actions__item ${
              params == sidebar.href ? 'active' : ''
            }`}
            key={sidebar.title}
          >
            <Link
              href={sidebar.href}
              className="sidebar-dashboard-actions__link"
            >
              <span className="sidebar-dashboard-actions__icon">
                {sidebar.icon}
              </span>
              <span className="sidebar-dashboard-actions__title">
                {sidebar.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
