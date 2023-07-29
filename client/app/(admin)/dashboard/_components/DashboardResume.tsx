'use client';

import { authActions } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import orderService from '@/services/orderService';
import { OrderType } from '@/types/order';
import { handleRefreshToken } from '@/utils/clientActions';
import { convertCurrency } from '@/utils/contains';
import {
  BanknotesIcon,
  QueueListIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';

const DashboardResume = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [resume, setResume] = useState<{
    orderList: OrderType[];
    totalMoney: number;
    totalSoldProducts: number;
  }>({
    orderList: [],
    totalMoney: 0,
    totalSoldProducts: 0,
  });

  useEffect(() => {
    async function fetchOrderList() {
      try {
        const success = await handleRefreshToken(dispatch);

        if (success) {
          let res = [];

          if (dateRange) {
            res = await orderService.getAll({
              dateRange: {
                from: dateRange[0],
                to: dateRange[1],
              },
              report: true,
            });
          } else {
            res = await orderService.getAll({ report: true });
          }

          const totalMoney = res.reduce((p, c) => {
            return p + c.totalPay;
          }, 0);

          const totalSoldProducts = res.reduce((p, c) => {
            return (
              p + c.boughtProducts.reduce((acc, cur) => acc + cur.amount, 0)
            );
          }, 0);

          setResume({
            orderList: res,
            totalMoney: totalMoney,
            totalSoldProducts,
          });
        } else {
          router.replace('/login');
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    fetchOrderList();
  }, [dateRange]);

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
            <p>{convertCurrency(resume.totalMoney)}</p>
          </div>
          <div className="dashboard-resume_icon">
            <BanknotesIcon className="w-7 h-7"></BanknotesIcon>
          </div>
        </div>
        <div className="dashboard-resume_item">
          <div className="dashboard-resume_info">
            <h4>Total Sold Products</h4>
            <p>{resume.totalSoldProducts}</p>
          </div>
          <div className="dashboard-resume_icon">
            <QueueListIcon className="w-7 h-7"></QueueListIcon>
          </div>
        </div>
        <div className="dashboard-resume_item">
          <div className="dashboard-resume_info">
            <h4>Total Orders</h4>
            <p>{resume.orderList.length}</p>
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
