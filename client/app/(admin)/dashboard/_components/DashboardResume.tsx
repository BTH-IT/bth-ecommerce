'use client';

import {
  BanknotesIcon,
  QueueListIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';

const DashboardResume = () => {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  return (
    <div className="dashboard-resume">
      <div className="dashboard-resume__header">
        <h3>Sales Report</h3>
        <DateRangePicker
          showOneCalendar
          placeholder="Chọn khoảng thời gian"
          style={{ width: 300 }}
          onChange={(value) => setDateRange(value)}
        />
      </div>
      <div className="dashboard-resume_content">
        <div className="dashboard-resume_item">
          <div className="dashboard-resume_info">
            <h4>Total Moneys</h4>
            <p>5000000 VND</p>
          </div>
          <div className="dashboard-resume_icon">
            <BanknotesIcon className="w-7 h-7"></BanknotesIcon>
          </div>
        </div>
        <div className="dashboard-resume_item">
          <div className="dashboard-resume_info">
            <h4>Total Sold Products</h4>
            <p>5000000</p>
          </div>
          <div className="dashboard-resume_icon">
            <QueueListIcon className="w-7 h-7"></QueueListIcon>
          </div>
        </div>
        <div className="dashboard-resume_item">
          <div className="dashboard-resume_info">
            <h4>Total Orders</h4>
            <p>10000</p>
          </div>
          <div className="dashboard-resume_icon">
            <ShoppingCartIcon className="w-7 h-7"></ShoppingCartIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardResume;
