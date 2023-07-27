import { Inter } from 'next/font/google';
import React from 'react';
import Sidebar from '../_components/Sidebar';
import '../../../css/pages/manager.css';
import HeaderDashboard from '../_components/HeaderDashboard';
import Footer from '@/components/Footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex dashboard">
      <Sidebar></Sidebar>
      <div className="flex-1 content">
        <HeaderDashboard></HeaderDashboard>
        {children}
      </div>
    </div>
  );
}
