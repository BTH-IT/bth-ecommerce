'use client';

import React, { useEffect, useState } from 'react';
import DashboardResume from './DashboardResume';
import DashboardChart from './DashboardChart';
import DashboardBestsellerProduct from './DashboardBestsellerProduct';
import DashboardBestsellerBrand from './DashboardBestsellerBrand';
import PermissionHOC from '@/components/PermissionHOC';

const DashboardContainer = PermissionHOC(() => {
  return (
    <div className="dashboard-page">
      <DashboardResume></DashboardResume>
      <DashboardChart></DashboardChart>
      <DashboardBestsellerProduct></DashboardBestsellerProduct>
      <DashboardBestsellerBrand></DashboardBestsellerBrand>
    </div>
  );
});

export default DashboardContainer;
