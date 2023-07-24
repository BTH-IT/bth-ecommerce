'use client';

import { selectAuth } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import orderService from '@/services/orderService';
import { OrderType } from '@/types/order';
import { handleRefreshToken } from '@/utils/clientActions';
import { convertCurrency } from '@/utils/contains';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const HistoryTableContent = ({ type }: { type: string | null }) => {
  const dispatch = useAppDispatch();
  const [orderList, setOrderList] = useState<OrderType[]>([]);
  const user: any = useAppSelector(selectAuth).user;

  useEffect(() => {
    let orderType: any = null;
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
          });
        } catch (error: any) {
          if (error.statusCode === 403) {
            await handleRefreshToken(dispatch);
            res = await orderService.getAll({
              userId: user._id,
              type: orderType,
            });
          }
        }
        if (!res) throw new Error('Error server');

        setOrderList(res);
      } catch (error: any) {
        if (error.statusCode === 403) {
          await handleRefreshToken(dispatch);
          await fetchOrderList();
        }
      }
    }

    fetchOrderList();
  }, [type]);

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
          <span className="status-item ${convertSatus(item.trang_thai)}">
            {order.status}
          </span>
        </td>
        <td className="history__table-body-item">
          <span className="info-item">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              width={36}
              height={36}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </span>
        </td>
      </tr>
    ))
  );
};

export default HistoryTableContent;
