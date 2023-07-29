'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { authActions, selectAuth } from '@/redux/features/authSlice';
import Link from 'next/link';
import { Modal, Button, Table, Pagination } from 'rsuite';
import { OrderType } from '@/types/order';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import orderService from '@/services/orderService';
import { usePagination } from '@/hooks/usePagination';
import moment from 'moment';
import { convertCurrency } from '@/utils/contains';
import { DatePicker, Input, Space } from 'antd';
import SeeMoreOrder from '@/app/(user)/history/_components/SeeMoreOrder';
import OrderActionCell from './OrderActionCell';
import UpdateOrderStatusForm from './UpdateOrderStatusForm';

const orderItemLinkList = [
  {
    href: '/dashboard/orders',
    className: '',
    title: 'All Orders',
    param: '',
  },
  {
    href: '/dashboard/orders?type=waiting',
    className: 'waiting',
    title: 'Waiting',
    param: 'waiting',
  },
  {
    href: '/dashboard/orders?type=shipping',
    className: 'shipping',
    title: 'Shipping',
    param: 'shipping',
  },
  {
    href: '/dashboard/orders?type=done',
    className: 'done',
    title: 'Done',
    param: 'done',
  },
  {
    href: '/dashboard/orders?type=canceled',
    className: 'canceled',
    title: 'Canceled',
    param: 'canceled',
  },
];

const { RangePicker } = DatePicker;
const { Search } = Input;

const { Column, HeaderCell, Cell } = Table;
export type RangeValue = Parameters<
  NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>['onChange']>
>[0];

const OrderContainer = () => {
  const loginSuccess = Boolean(useAppSelector(selectAuth).accessToken);
  const router = useRouter();

  const params = useSearchParams();
  const type = params.get('type') || '';
  const [search, setSearch] = useState<string>('');

  const [dateRange, setDateRange] = useState<RangeValue | null>(null);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<OrderType | null>(null);
  const [orderList, setOrderList] = useState<OrderType[]>([]);

  const dispatch = useAppDispatch();
  const [modalData, setModalData] = useState({
    title: 'Xem chi tiết',
    key: 'see-more',
  });

  useEffect(() => {
    if (!loginSuccess) {
      router.replace('/login');
    }
  }, [loginSuccess]);

  const handleOpen = async (order: OrderType) => {
    setOrder(order);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const {
    page,
    setPage,
    getDataSorted,
    loading,
    handleSortColumn,
    sortColumn,
    sortType,
  } = usePagination(orderList);

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
        const success = await handleRefreshToken(dispatch);

        if (success) {
          const res = await orderService.getAll({
            type: orderType,
            dateRange: dateRangeFilter,
            search: search.trim().toLowerCase(),
          });

          setOrderList(res);
        } else {
          router.replace('/login');
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    fetchOrderList();
  }, [type, dateRange, search]);

  const handleSearching = async (value: string) => {
    if (!value) return;

    setSearch(value);
  };

  return (
    <div className="orders">
      <ul className="orders-header">
        {orderItemLinkList.map((link) => (
          <li
            key={link.href}
            className={`orders-header_item ${
              link.param === type ? 'active' : ''
            }`}
          >
            <Link
              href={link.href}
              className={`orders-header_title ${link.className}`}
            >
              <span>{link.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="orders-table">
        <div className="orders-table_filter">
          <Space direction="vertical" size={12}>
            <Search placeholder="search" onSearch={handleSearching} />
          </Space>
          <Space direction="vertical" size={12}>
            <RangePicker onChange={(value) => setDateRange(value)} />
          </Space>
        </div>
        <div>
          <Table
            data={getDataSorted()}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            loading={loading}
            autoHeight={true}
          >
            <Column fixed width={250} align="center">
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="_id" />
            </Column>

            <Column sortable width={200} align="center">
              <HeaderCell>Hình thức thanh toán</HeaderCell>
              <Cell dataKey="purchaseForm">
                {(rowData) => (
                  <span className="paid-item">{rowData.purchaseForm}</span>
                )}
              </Cell>
            </Column>

            <Column sortable width={200} align="center">
              <HeaderCell>Thời gian</HeaderCell>
              <Cell dataKey="createdAt">
                {(rowData) => `${moment(rowData.createdAt).format('L')}`}
              </Cell>
            </Column>

            <Column sortable width={200} align="center">
              <HeaderCell>Trạng thái</HeaderCell>
              <Cell dataKey="status">
                {(rowData) => (
                  <span className={`status-item ${rowData.status}`}>
                    {rowData.status}
                  </span>
                )}
              </Cell>
            </Column>
            <Column sortable width={400} align="center">
              <HeaderCell>Tổng tiền</HeaderCell>
              <Cell dataKey="totalPay">
                {(rowData) => (
                  <span className="price-item">
                    {convertCurrency(rowData.totalPay)}
                  </span>
                )}
              </Cell>
            </Column>
            <Column fixed="right" width={250} align="center">
              <HeaderCell>Hành động</HeaderCell>
              <OrderActionCell
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
              layout={['total', '-', 'pager', 'skip']}
              total={orderList.length}
              limit={50}
              activePage={page}
              onChangePage={setPage}
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
          {modalData.key === 'delete-order' && order && (
            <p className="text-center">Bạn thật sự muốn xóa đơn hàng chứ?</p>
          )}
          {modalData.key === 'update-order' && order && (
            <UpdateOrderStatusForm
              order={order}
              handleClose={handleClose}
            ></UpdateOrderStatusForm>
          )}
        </Modal.Body>
        {modalData.key === 'delete-order' && order && (
          <Modal.Footer>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
            <Button onClick={handleClose} appearance="primary">
              Ok
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default OrderContainer;
