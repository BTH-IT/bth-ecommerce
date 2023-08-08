'use client';
import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import toast from 'react-hot-toast';
import orderService from '@/services/orderService';
import { handleRefreshToken } from '@/utils/clientActions';
import { useAppDispatch } from '@/redux/hooks';
import { OrderType } from '@/types/order';
import { useRouter } from 'next/navigation';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
  ChartConfiguration,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
);

const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const options: any = {
  plugins: {
    legend: true,
  },
  responsive: true,
  scales: {
    y: {
      ticks: {
        font: {
          size: 17,
          weight: 'bold',
        },
      },
      title: {
        display: true,
        text: 'Sales',
        padding: {
          bottom: 10,
        },
        font: {
          size: 30,
          style: 'italic',
          family: 'Arial',
        },
      },
      min: 50,
    },
    x: {
      ticks: {
        font: {
          size: 17,
          weight: 'bold',
        },
      },
      title: {
        display: true,
        text: 'Month',
        padding: {
          top: 10,
        },
        font: {
          size: 30,
          style: 'italic',
          family: 'Arial',
        },
      },
    },
  },
};

const DashboardChart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [chartData, setChartData] = useState<{
    orderList: OrderType[];
    totalMoneyList: number[];
    totalSoldProductsList: number[];
  }>({
    orderList: [],
    totalMoneyList: [],
    totalSoldProductsList: [],
  });

  useEffect(() => {
    async function fetchOrderList() {
      try {
        const success = await handleRefreshToken(dispatch);

        if (success) {
          let res: OrderType[] = [];

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

          const totalMoneyList = monthList.map((month) => {
            const orderList = res.filter((order) => {
              const monthOrder = new Date(order.createdAt).getMonth() + 1;
              return month === monthOrder;
            });

            return orderList.reduce((p, c) => p + c.totalPay, 0);
          });

          const totalSoldProductsList = monthList.map((month) => {
            const orderList = res.filter((order) => {
              const monthOrder = new Date(order.createdAt).getMonth() + 1;
              return month === monthOrder;
            });

            return orderList.reduce((p, c) => {
              return (
                p + c.boughtProducts.reduce((acc, cur) => acc + cur.amount, 0)
              );
            }, 0);
          });

          setChartData({
            orderList: res,
            totalMoneyList,
            totalSoldProductsList,
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

  const data = {
    labels: monthList,
    datasets: [
      {
        label: 'Revenue',
        data: chartData.totalMoneyList,
        borderColor: '#0ea5e9',
        borderWidth: 3,
        pointBorderColor: '#0ea5e9',
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, '#7dd3fc');
          gradient.addColorStop(1, 'white');
          return gradient;
        },
      },
      {
        label: 'Sold Product',
        data: chartData.totalSoldProductsList,
        borderColor: '#6366f1',
        borderWidth: 3,
        pointBorderColor: '#6366f1',
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, '#a5b4fc');
          gradient.addColorStop(1, 'white');
          return gradient;
        },
      },
    ],
  };

  return (
    <div className="dashboard-chart">
      <div className="dashboard-resume__header">
        <h3>Sales Chart</h3>
        <DateRangePicker
          showOneCalendar
          placeholder="Chọn khoảng thời gian"
          style={{ width: 300 }}
          onChange={(value) => setDateRange(value)}
        />
      </div>
      <div className="dashboard-resume__chart">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default DashboardChart;
