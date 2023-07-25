'use client';

import React, { useLayoutEffect, useState } from 'react';
import HistoryTableContent from './HistoryTableContent';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/features/authSlice';
import Link from 'next/link';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { Modal, Button, Placeholder } from 'rsuite';
import { OrderType } from '@/types/order';
import { handleRefreshToken } from '@/utils/clientActions';
import orderService from '@/services/orderService';
import UpdateOrderForm from './UpdateOrderForm';
import SeeMoreOrder from './SeeMoreOrder';

const HistoryContentPage = () => {
  const dispatch = useAppDispatch();
  const loginSuccess = Boolean(useAppSelector(selectAuth).accessToken);
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get('type');
  const [dateRange, setDateRage] = useState<DateRange | null>(null);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<OrderType | null>(null);
  const handleOpen = async (orderId: string) => {
    await handleRefreshToken(dispatch);
    try {
      const res = await orderService.getById(orderId);

      setOrder(res);
    } catch (error: any) {
      if (error.statusCode === 403) {
        await handleRefreshToken(dispatch);
        await handleOpen(orderId);
      }
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [modalData, setModalData] = useState({
    title: 'Xem chi tiết',
    key: 'see-more',
  });

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
          <DateRangePicker
            showOneCalendar
            placeholder="Chọn khoảng thời gian"
            style={{ width: 300, zIndex: 1 }}
            onChange={(value) => setDateRage(value)}
          />
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
            <HistoryTableContent
              type={type}
              dateRange={dateRange}
              handleOpen={handleOpen}
              handleModal={setModalData}
            ></HistoryTableContent>
          </tbody>
        </table>
      </div>
      <Modal overflow={true} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{modalData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalData.key === 'see-more' && order && (
            <SeeMoreOrder order={order}></SeeMoreOrder>
          )}
          {modalData.key === 'update-order' && order && (
            <UpdateOrderForm
              order={order}
              handleClose={handleClose}
            ></UpdateOrderForm>
          )}
          {modalData.key === 'cancel-order' && order && (
            <p className="text-center">Bạn thật sự muốn xóa chứ?</p>
          )}
        </Modal.Body>
        {modalData.key === 'see-more' ||
          (modalData.key === 'cancel-order' && order && (
            <Modal.Footer>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
              <Button onClick={handleClose} appearance="primary">
                Ok
              </Button>
            </Modal.Footer>
          ))}
      </Modal>
    </>
  );
};

export default HistoryContentPage;
