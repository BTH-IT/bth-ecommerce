'use client';

import { selectAuth } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import orderService from '@/services/orderService';
import { OrderType } from '@/types/order';
import { handleRefreshToken } from '@/utils/clientActions';
import { convertCurrency } from '@/utils/contains';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import MoreAction from './MoreAction';
import { DateRange } from 'rsuite/esm/DateRangePicker';

const HistoryTableContent = ({
  type,
  dateRange,
  handleOpen,
  handleModal,
}: {
  type: string | null;
  dateRange: DateRange | null;
  handleOpen: (orderId: string) => void;
  handleModal: React.Dispatch<
    React.SetStateAction<{
      title: string;
      key: string;
    }>
  >;
}) => {
  const dispatch = useAppDispatch();
  const [orderList, setOrderList] = useState<OrderType[]>([]);
  const user: any = useAppSelector(selectAuth).user;

  useEffect(() => {
    let orderType: any = null;
    let dateRangeFilter: any = null;

    if (dateRange !== null) {
      dateRangeFilter = {
        from: dateRange[0],
        to: dateRange[1],
      };
    }

    if (type) {
      switch (type) {
        case 'waiting':
          orderType = 'waiting';
          break;
        case 'shipping':
          orderType = 'shipping';
          break;
        case 'wait-for-pay':
          orderType = 'wait-for-pay';
          break;
        case 'done':
          orderType = 'done';
          break;
        case 'canceled':
          orderType = 'canceled';
          break;
      }
    }

    async function fetchOrderList() {
      try {
        let res;
        try {
          res = await orderService.getAll({
            userId: user._id,
            type: orderType,
            dateRange: dateRangeFilter,
          });
        } catch (error: any) {
          if (error.statusCode === 403) {
            try {
              await handleRefreshToken(dispatch);
              res = await orderService.getAll({
                userId: user._id,
                type: orderType,
                dateRange: dateRangeFilter,
              });
            } catch (error: any) {
              console.log(error.message);
            }
          }
        }
        if (!res) throw new Error('Error server');

        setOrderList(res);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    fetchOrderList();
  }, [type, dateRange]);

  return (
    orderList.length > 0 &&
    orderList.map((order) => (
      <tr key={order._id}>
        <td className="history__table-body-item">{order._id}</td>
        <td className="history__table-body-item">
          <span className="paid-item">{order.purchaseForm}</span>
        </td>
        <td className="history__table-body-item">
          {moment(order.createdAt).format('L')}
        </td>
        <td className="history__table-body-item">
          <span className="price-item">{convertCurrency(order.totalPay)}</span>
        </td>
        <td className="history__table-body-item">
          <span className={`status-item ${order.status}`}>{order.status}</span>
        </td>
        <td className="history__table-body-item">
          <MoreAction
            orderId={order._id}
            handleOpen={handleOpen}
            handleModal={handleModal}
          ></MoreAction>
        </td>
      </tr>
    ))
  );
};

export default HistoryTableContent;
