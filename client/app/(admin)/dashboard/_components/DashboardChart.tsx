'use client';
import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import Chart from 'react-apexcharts';
import '../../../../css/vendors/apexcharts.min.css';
import { authActions } from '@/redux/features/authSlice';
import toast from 'react-hot-toast';
import orderService from '@/services/orderService';
import { handleRefreshToken } from '@/utils/clientActions';
import { useAppDispatch } from '@/redux/hooks';
import { OrderType } from '@/types/order';
import { useRouter } from 'next/navigation';

const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const options: any = {
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: true,
      tools: {
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
      },
    },
  },
  colors: ['#0062f5', '#43aaff'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    type: 'string',
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
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
        {typeof window !== 'undefined' && (
          <Chart
            options={options}
            series={[
              {
                name: 'Tổng sản phẩm bán được',
                data: chartData.totalSoldProductsList,
              },
              {
                name: 'Tổng doanh thu bán được',
                data: chartData.totalMoneyList,
              },
            ]}
            type="area"
            height={500}
            width={'100%'}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardChart;
