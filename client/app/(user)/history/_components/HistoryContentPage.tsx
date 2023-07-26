'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { authActions, selectAuth } from '@/redux/features/authSlice';
import Link from 'next/link';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { Modal, Button, Table, Pagination } from 'rsuite';
import { OrderType } from '@/types/order';
import UpdateOrderForm from './UpdateOrderForm';
import SeeMoreOrder from './SeeMoreOrder';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import orderService from '@/services/orderService';
import { usePagination } from '@/hooks/usePagination';
import ActionCell from './ActionCell';
import moment from 'moment';

const { Column, HeaderCell, Cell } = Table;

const HistoryContentPage = () => {
  const loginSuccess = Boolean(useAppSelector(selectAuth).accessToken);
  const router = useRouter();

  const params = useSearchParams();
  const type = params.get('type');

  const [dateRange, setDateRage] = useState<DateRange | null>(null);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<OrderType | null>(null);
  const [orderList, setOrderList] = useState<OrderType[]>([]);

  const user: any = useAppSelector(selectAuth).user;
  const dispatch = useAppDispatch();
  const [modalData, setModalData] = useState({
    title: 'Xem chi tiết',
    key: 'see-more',
  });

  const handleOpen = async (order: OrderType) => {
    setOrder(order);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const {
    handleChangeLimit,
    limit,
    page,
    setPage,
    getDataSorted,
    loading,
    handleSortColumn,
    sortColumn,
    sortType,
  } = usePagination(orderList);

  useLayoutEffect(() => {
    if (!loginSuccess) {
      router.push('/');
    }
  }, [loginSuccess]);

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
        await handleRefreshToken(dispatch);

        const res = await orderService.getAll({
          userId: user._id,
          type: orderType,
          dateRange: dateRangeFilter,
        });

        setOrderList(res);
      } catch (error: any) {
        toast.error(error.message);
        if (error.statusCode === 403) {
          dispatch(authActions.logout());
        }
      }
    }

    fetchOrderList();
  }, [type, dateRange]);

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
        <div>
          <Table
            height={420}
            data={getDataSorted()}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            loading={loading}
            autoHeight={true}
          >
            <Column sortable fixed flexGrow={1}>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="_id" />
            </Column>

            <Column sortable width={200}>
              <HeaderCell>Hình thức thanh toán</HeaderCell>
              <Cell dataKey="purchaseForm">
                {(rowData) => (
                  <span className="paid-item">{rowData.purchaseForm}</span>
                )}
              </Cell>
            </Column>

            <Column sortable width={200}>
              <HeaderCell>Thời gian</HeaderCell>
              <Cell dataKey="createdAt">
                {(rowData) => `${moment(rowData.createdAt).format('L')}`}
              </Cell>
            </Column>

            <Column sortable width={200}>
              <HeaderCell>Trạng thái</HeaderCell>
              <Cell dataKey="status">
                {(rowData) => (
                  <span className={`status-item ${rowData.status}`}>
                    {rowData.status}
                  </span>
                )}
              </Cell>
            </Column>
            <Column sortable width={200}>
              <HeaderCell>Tổng tiền</HeaderCell>
              <Cell dataKey="totalPay" />
            </Column>
            <Column fixed="right" width={100}>
              <HeaderCell>Hành động</HeaderCell>
              <ActionCell
                dataKey="_id"
                handleOpen={handleOpen}
                handleModal={setModalData}
              />
            </Column>
          </Table>
          <div style={{ padding: 20 }}>
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="xs"
              layout={['total', '-', 'limit', '|', 'pager', 'skip']}
              total={orderList.length}
              limitOptions={[10, 30, 50]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
            />
          </div>
        </div>
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
            <p className="text-center">Bạn thật sự muốn hủy đơn hàng chứ?</p>
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
