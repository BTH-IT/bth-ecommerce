'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { Modal, Button, Table, Pagination } from 'rsuite';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import { usePagination } from '@/hooks/usePagination';
import { Input, Space } from 'antd';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { SupplierType } from '@/types/supplier';
import supplierService from '@/services/supplierService';
import SupplierActionCell from './SupplierActionCell';
import SupplierForm from './SupplierForm';

const { Search } = Input;

const { Column, HeaderCell, Cell } = Table;

const SupplierContainer = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [supplier, setSupplier] = useState<SupplierType | null>(null);
  const [supplierList, setSupplierList] = useState<SupplierType[]>([]);
  const [search, setSearch] = useState<string>('');

  const dispatch = useAppDispatch();
  const [modalData, setModalData] = useState({
    title: 'Sửa nhà cung cấp',
    key: 'update-supplier',
  });

  const handleOpen = async (supplier: SupplierType) => {
    setSupplier(supplier);
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
  } = usePagination(supplierList);

  useEffect(() => {
    async function fetchSupplierList() {
      try {
        const success = await handleRefreshToken(dispatch);

        if (success) {
          const res = await supplierService.getAll({
            search,
          });

          setSupplierList(res);
        } else {
          router.replace('/login');
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    fetchSupplierList();
  }, [search]);

  const handleSearching = async (value: string) => {
    setSearch(value);
  };

  const handleAdding = () => {
    setModalData({
      title: 'Thêm nhà cung cấp',
      key: 'add-supplier',
    });
    setSupplier(null);
    setAdd(true);
    setOpen(true);
  };

  return (
    <div className="suppliers-table">
      <div className="suppliers-table_header">
        <div className="suppliers-table_filter">
          <Space direction="vertical" size={12}>
            <Search placeholder="search" onSearch={handleSearching} />
          </Space>
          <div className="suppliers-table_add-btn" onClick={handleAdding}>
            <PlusCircleIcon className="w-6 h-6"></PlusCircleIcon>
            <span className="font-semibold">Add New Supplier</span>
          </div>
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
            <Column width={300} align="center">
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="_id" />
            </Column>

            <Column sortable width={300} align="center">
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name"></Cell>
            </Column>

            <Column width={200} align="center">
              <HeaderCell>Phone number</HeaderCell>
              <Cell dataKey="phoneNum"></Cell>
            </Column>

            <Column width={350} align="center">
              <HeaderCell>Address</HeaderCell>
              <Cell dataKey="address"></Cell>
            </Column>

            <Column width={410} align="center">
              <HeaderCell>Hành động</HeaderCell>
              <SupplierActionCell
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
              total={supplierList.length}
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
          {modalData.key === 'delete-supplier' && supplier && (
            <p className="text-center">Bạn thật sự muốn xóa đơn hàng chứ?</p>
          )}
          {(modalData.key === 'add-supplier' ||
            modalData.key === 'update-supplier') && (
            <SupplierForm
              add={add}
              handleClose={handleClose}
              supplier={supplier}
            ></SupplierForm>
          )}
        </Modal.Body>
        {modalData.key === 'delete-supplier' && supplier && (
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

export default SupplierContainer;
