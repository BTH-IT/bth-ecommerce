'use client';

import { usePagination } from '@/hooks/usePagination';
import { OrderType } from '@/types/order';
import { convertCurrency } from '@/utils/contains';
import moment from 'moment';
import React, { useState } from 'react';
import { DateRangePicker, Pagination, Table } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import BestsellerProductTable from './BestsellerProductTable';

const { Column, HeaderCell, Cell } = Table;

const DashboardBestsellerProduct = () => {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [orderList, setOrderList] = useState<OrderType[]>([]);

  return (
    <div className="dashboard-bestseller">
      <div className="dashboard-resume__header">
        <h3>Bestseller Product Report</h3>
        <DateRangePicker
          showOneCalendar
          placeholder="Chọn khoảng thời gian"
          style={{ width: 300 }}
          onChange={(value) => setDateRange(value)}
        />
      </div>
      <BestsellerProductTable productList={[]}></BestsellerProductTable>
    </div>
  );
};

export default DashboardBestsellerProduct;
