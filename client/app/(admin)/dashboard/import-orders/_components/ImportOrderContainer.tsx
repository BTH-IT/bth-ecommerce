'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { Modal, Button, Table, Pagination } from 'rsuite';
import { OrderType } from '@/types/order';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import { usePagination } from '@/hooks/usePagination';
import moment from 'moment';
import { convertCurrency } from '@/utils/contains';
import { DatePicker, Input, Space } from 'antd';
import importOrderService from '@/services/importOrderService';
import ImportActionCell from './ImportOrderActionCell';
import PermissionHOC from '@/components/PermissionHOC';
import { ImportOrderType } from '@/types/import-order';
import SeeMoreImportOrder from './SeeMoreImportOrder';

const { RangePicker } = DatePicker;
const { Search } = Input;

const { Column, HeaderCell, Cell } = Table;
export type RangeValue = Parameters<
  NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>['onChange']>
>[0];

const ImportOrderContainer = () => {
  return PermissionHOC(() => {
    const router = useRouter();

    const [dateRange, setDateRange] = useState<RangeValue | null>(null);
    const [open, setOpen] = useState(false);
    const [importOrder, setImportOrder] = useState<ImportOrderType | null>(
      null,
    );
    const [importOrderList, setImportOrderList] = useState<OrderType[]>([]);
    const [search, setSearch] = useState<string>('');
    const dispatch = useAppDispatch();
    const [modalData, setModalData] = useState({
      title: 'Xem chi tiết',
      key: 'see-more',
    });

    const handleOpen = async (importOrder: ImportOrderType) => {
      setImportOrder(importOrder);
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
    } = usePagination(importOrderList);

    useEffect(() => {
      let dateRangeFilter: any = null;

      if (dateRange !== null) {
        dateRangeFilter = {
          from: dateRange[0],
          to: dateRange[1],
        };
      }

      async function fetchOrderList() {
        try {
          const success = await handleRefreshToken(dispatch);

          if (success) {
            const res = await importOrderService.getAll({
              dateRange: dateRangeFilter,
            });

            setImportOrderList(res);
          } else {
            router.replace('/login');
          }
        } catch (error: any) {
          toast.error(error.message);
        }
      }

      fetchOrderList();
    }, [dateRange, search]);

    const handleSearching = async (value: string) => {
      setSearch(value);
    };

    const handleRemoveImportOrder = async () => {
      try {
        const success = await handleRefreshToken(dispatch);

        if (success) {
          if (importOrder) {
            await importOrderService.remove(importOrder._id);
            toast.success('Delete successfully');
            router.refresh();
          }
        } else {
          router.replace('/');
        }
      } catch (error: any) {
        console.log(error.message);
      } finally {
        handleClose();
        toast.success('Delete failure');
      }
    };

    return (
      <div className="import-orders">
        <div className="import-orders-table">
          <div className="import-orders-table_filter">
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

              <Column sortable width={250} align="center">
                <HeaderCell>Employee Id</HeaderCell>
                <Cell dataKey="employee"></Cell>
              </Column>

              <Column sortable width={200} align="center">
                <HeaderCell>Supplier Id</HeaderCell>
                <Cell dataKey="supplier"></Cell>
              </Column>

              <Column sortable width={200} align="center">
                <HeaderCell>Thời gian</HeaderCell>
                <Cell dataKey="createdAt">
                  {(rowData) => `${moment(rowData.createdAt).format('L')}`}
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
                <ImportActionCell
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
                total={importOrderList.length}
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
            {modalData.key === 'see-more' && importOrder && (
              <SeeMoreImportOrder
                importOrder={importOrder}
              ></SeeMoreImportOrder>
            )}
            {modalData.key === 'delete-import-order' && importOrder && (
              <p className="text-center">Bạn thật sự muốn xóa đơn hàng chứ?</p>
            )}
          </Modal.Body>
          {modalData.key === 'delete-import-order' && importOrder && (
            <Modal.Footer>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
              <Button onClick={handleRemoveImportOrder} appearance="primary">
                Ok
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      </div>
    );
  });
};

export default ImportOrderContainer;
