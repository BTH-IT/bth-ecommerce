'use client';

import { OrderType } from '@/types/order';
import React, { useState } from 'react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import BestsellerBrandTable from './BestsellerBrandTable';

const DashboardBestsellerBrand = () => {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [orderList, setOrderList] = useState<OrderType[]>([]);

  return (
    <div className="dashboard-bestseller">
      <div className="dashboard-resume__header">
        <h3>Bestseller Brand Report</h3>
        <DateRangePicker
          showOneCalendar
          placeholder="Chọn khoảng thời gian"
          style={{ width: 300 }}
          onChange={(value) => setDateRange(value)}
        />
      </div>
      <BestsellerBrandTable
        brandList={[]}
        productList={[]}
      ></BestsellerBrandTable>
    </div>
  );
};

export default DashboardBestsellerBrand;
