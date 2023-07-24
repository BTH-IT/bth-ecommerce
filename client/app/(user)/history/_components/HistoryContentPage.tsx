'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import HistoryTableContent from './HistoryTableContent';
import { handleRefreshToken } from '@/utils/clientActions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import orderService from '@/services/orderService';
import { selectAuth } from '@/redux/features/authSlice';
import { OrderType } from '@/types/order';
import Link from 'next/link';

const HistoryContentPage = () => {
  const loginSuccess = Boolean(useAppSelector(selectAuth).accessToken);
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get('type');

  useLayoutEffect(() => {
    if (!loginSuccess) {
      router.push('/');
    }
  }, [loginSuccess]);

  return (
    <>
      <div className="history__header">
        <div className="history__header-title">Lịch sử mua hàng</div>
        <div className="history__header-date-container">
          <input type="text" name="dates" className="history__header-date" />
        </div>
      </div>
      <div className="history__menu">
        <ul className="history__menu-list">
          <li id="all">
            <Link
              href={'/history'}
              className={`history__menu-item ${
                !type || type === 'all' ? 'active' : ''
              }`}
            >
              Tất cả
            </Link>
          </li>
          <li id="waiting">
            <Link
              href={'/history?type=waiting'}
              className={`history__menu-item ${
                type && type === 'waiting' ? 'active' : ''
              }`}
            >
              Chờ xử lý
            </Link>
          </li>
          <li id="shipping">
            <Link
              href={'/history?type=shipping'}
              className={`history__menu-item ${
                type && type === 'shipping' ? 'active' : ''
              }`}
            >
              Đang giao
            </Link>
          </li>
          <li id="completed">
            <Link
              href={'/history?type=done'}
              className={`history__menu-item ${
                type && type === 'done' ? 'active' : ''
              }`}
            >
              Hoàn thành
            </Link>
          </li>
          <li id="canceled">
            <Link
              href={'/history?type=canceled'}
              className={`history__menu-item ${
                type && type === 'canceled' ? 'active' : ''
              }`}
            >
              Đã huỷ
            </Link>
          </li>
        </ul>
      </div>
      <div className="history__table table-responsive-xxl text-nowrap">
        <table className="table table-xxl table-borderless">
          <thead className="mb-10 history__table-header">
            <tr>
              <th className="history__table-header-item">Mã đơn hàng</th>
              <th className="history__table-header-item">
                Hình thức thanh toán
              </th>
              <th className="history__table-header-item">Thời gian</th>
              <th className="history__table-header-item">Tổng tiền</th>
              <th className="history__table-header-item">Trạng thái</th>
              <th className="history__table-header-item">Hành động</th>
            </tr>
          </thead>
          <tbody className="history__table-body">
            <HistoryTableContent type={type}></HistoryTableContent>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HistoryContentPage;
