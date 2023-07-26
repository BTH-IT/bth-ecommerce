'use client';

import { authActions } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import {
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const HeaderDashboard = () => {
  const dispatch = useAppDispatch();
  const params = usePathname();
  return (
    <div className="header-dashboard">
      {params !== '/dashboard' ? (
        <div className="header-dashboard__navigation">
          <Link href="/dashboard">Dashboard</Link>
          <span>/</span>
          <span>{params.split('/')[1]}</span>
        </div>
      ) : (
        <div className="header-dashboard__navigation">
          <span>/</span>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      )}

      <div className="header-dashboard__action">
        <Link href="/dashboard/profile" className="header-dashboard__link">
          <span className="header-dashboard__icon">
            <UserCircleIcon className="w-8 h-8"></UserCircleIcon>
          </span>
          <span className="header-dashboard__title">Profile</span>
        </Link>
        <Link
          href="/login"
          className="header-dashboard__link"
          onClick={() => dispatch(authActions.logout())}
        >
          <span className="header-dashboard__icon">
            <ArrowLeftOnRectangleIcon className="w-8 h-8"></ArrowLeftOnRectangleIcon>
          </span>
          <span className="header-dashboard__title">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default HeaderDashboard;
