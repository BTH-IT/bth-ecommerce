'use client';

import { usePagination } from '@/hooks/usePagination';
import { OrderType } from '@/types/order';
import { convertCurrency } from '@/utils/contains';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { DateRangePicker, Pagination, Table } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import BestsellerProductTable from './BestsellerProductTable';
import { useAppDispatch } from '@/redux/hooks';
import { handleRefreshToken } from '@/utils/clientActions';
import orderService from '@/services/orderService';
import { authActions } from '@/redux/features/authSlice';
import toast from 'react-hot-toast';
import { ProductType } from '@/types/product';

export type ProductListType = ProductType & {
  amount: number;
};

const DashboardBestsellerProduct = () => {
  const dispatch = useAppDispatch();
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [productList, setProductList] = useState<ProductListType[]>([]);

  useEffect(() => {
    async function fetchOrderList() {
      try {
        await handleRefreshToken(dispatch);

        let res: OrderType[] = [];

        if (dateRange) {
          res = await orderService.getAll({
            dateRange: {
              from: dateRange[0],
              to: dateRange[1],
            },
          });
        } else {
          res = await orderService.getAll({});
        }

        const productList: ProductListType[] = [];

        res.forEach((order) => {
          order.boughtProducts.forEach((boughtProduct) => {
            if (productList.length <= 0) {
              productList.push({
                ...boughtProduct.product,
                amount: boughtProduct.amount,
              });
            }

            const isHave = productList.findIndex(
              (product) => product._id === boughtProduct.product._id,
            );

            if (isHave !== -1) {
              productList[isHave].amount += boughtProduct.amount;
            } else {
              productList.push({
                ...boughtProduct.product,
                amount: boughtProduct.amount,
              });
            }
          });
        });

        productList.sort((a, b) => b.amount - a.amount);

        setProductList(productList);
      } catch (error: any) {
        toast.error(error.message);
        if (error.statusCode === 403) {
          dispatch(authActions.logout());
        }
      }
    }

    fetchOrderList();
  }, [dateRange]);

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
      <BestsellerProductTable
        productList={productList}
      ></BestsellerProductTable>
    </div>
  );
};

export default DashboardBestsellerProduct;
