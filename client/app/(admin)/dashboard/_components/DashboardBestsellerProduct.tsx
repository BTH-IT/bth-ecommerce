'use client';

import { OrderType } from '@/types/order';
import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import BestsellerProductTable from './BestsellerProductTable';
import { useAppDispatch } from '@/redux/hooks';
import { handleRefreshToken } from '@/utils/clientActions';
import orderService from '@/services/orderService';
import toast from 'react-hot-toast';
import { ProductType } from '@/types/product';
import { useRouter } from 'next/navigation';

export type ProductListType = ProductType & {
  amount: number;
};

const DashboardBestsellerProduct = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [productList, setProductList] = useState<ProductListType[]>([]);

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

          const productList: ProductListType[] = [];

          res.forEach((order) => {
            order.boughtProducts.forEach((boughtProduct) => {
              if (productList.length <= 0) {
                productList.push({
                  ...boughtProduct.product,
                  amount: boughtProduct.amount,
                });
                return;
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
