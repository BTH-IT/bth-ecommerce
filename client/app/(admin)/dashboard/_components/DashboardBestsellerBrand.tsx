'use client';

import { OrderType } from '@/types/order';
import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import BestsellerBrandTable from './BestsellerBrandTable';
import { authActions } from '@/redux/features/authSlice';
import toast from 'react-hot-toast';
import { handleRefreshToken } from '@/utils/clientActions';
import { useAppDispatch } from '@/redux/hooks';
import orderService from '@/services/orderService';
import { ProductListType } from './DashboardBestsellerProduct';
import brandService from '@/services/brandService';
import { BrandType } from '@/types/brand';

export type BrandListType = BrandType & {
  productBrandList: ProductListType[];
  amount: number;
};

const DashboardBestsellerBrand = () => {
  const dispatch = useAppDispatch();
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [brandList, setBrandList] = useState<BrandListType[]>([]);

  useEffect(() => {
    async function fetchOrderList() {
      try {
        await handleRefreshToken(dispatch);

        let res: OrderType[] = [];
        const resBrand: BrandType[] = await brandService.getAll({});

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

        const newBrandList: BrandListType[] = resBrand.map((brand) => {
          const productBrandList: ProductListType[] = productList.filter(
            (product) => product.brand._id === brand._id,
          );

          const amount = productBrandList.reduce((p, c) => p + c.amount, 0);

          return {
            ...brand,
            productBrandList,
            amount,
          };
        });

        newBrandList.sort((a, b) => b.amount - a.amount);

        setBrandList(newBrandList);
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
        <h3>Bestseller Brand Report</h3>
        <DateRangePicker
          showOneCalendar
          placeholder="Chọn khoảng thời gian"
          style={{ width: 300 }}
          onChange={(value) => setDateRange(value)}
        />
      </div>
      <BestsellerBrandTable brandList={brandList}></BestsellerBrandTable>
    </div>
  );
};

export default DashboardBestsellerBrand;
