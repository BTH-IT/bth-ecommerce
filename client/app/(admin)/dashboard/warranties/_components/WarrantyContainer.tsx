'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { Modal, Button, Table, Pagination } from 'rsuite';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import { usePagination } from '@/hooks/usePagination';
import { Input, Space } from 'antd';
import ProductActionCell from './WarrantyActionCell';
import WarrantyForm from './WarrantyForm';
import { WarrantyType } from '@/types/warranty';
import warrantyService from '@/services/warrantyService';

const { Search } = Input;

const { Column, HeaderCell, Cell } = Table;

const WarrantyContainer = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [warranty, setWarranty] = useState<WarrantyType | null>(null);
  const [warrantyList, setWarrantyList] = useState<WarrantyType[]>([]);
  const [search, setSearch] = useState<string>('');

  const dispatch = useAppDispatch();
  const [modalData, setModalData] = useState({
    title: 'Sửa bảo hành',
    key: 'update-warranty',
  });

  const handleOpen = async (warranty: WarrantyType) => {
    setWarranty(warranty);
    setOpen(true);
  };

  const handleClose = () => {
    setAdd(false);
    setOpen(false);
  };

  const {
    page,
    setPage,
    getDataSorted,
    loading,
    handleSortColumn,
    sortColumn,
    sortType,
  } = usePagination(warrantyList);

  useEffect(() => {
    async function fetchWarrantyList() {
      try {
        const success = await handleRefreshToken(dispatch);

        if (success) {
          const res = await warrantyService.getAll({
            search,
          });

          setWarrantyList(res);
        } else {
          router.replace('/login');
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    fetchWarrantyList();
  }, [search]);

  const handleSearching = async (value: string) => {
    setSearch(value);
  };

  return (
    <div className="warranties-table">
      <div className="warranties-table_header">
        <div className="warranties-table_filter">
          <Space direction="vertical" size={12}>
            <Search placeholder="search" onSearch={handleSearching} />
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
            bordered
          >
            <Column fixed width={200} align="center">
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="_id" />
            </Column>

            <Column sortable width={200} align="center">
              <HeaderCell>Product Name</HeaderCell>
              <Cell dataKey="productName"></Cell>
            </Column>

            <Column fixed="right" width={300} align="center">
              <HeaderCell>Hành động</HeaderCell>
              <ProductActionCell
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
              total={warrantyList.length}
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
          {modalData.key === 'delete-warranty' && warranty && (
            <p className="text-center">Bạn thật sự muốn xóa đơn hàng chứ?</p>
          )}
          {modalData.key === 'update-warranty' && (
            <WarrantyForm
              handleClose={handleClose}
              warranty={warranty}
            ></WarrantyForm>
          )}
        </Modal.Body>
        {modalData.key === 'delete-warranty' && warranty && (
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

export default WarrantyContainer;
