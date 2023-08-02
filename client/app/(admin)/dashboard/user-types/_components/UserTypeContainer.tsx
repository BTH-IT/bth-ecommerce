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
import { UserGenreType } from '@/types/user-type';
import userTypeService from '@/services/userTypeService';
import moment from 'moment';
import UserTypeActionCell from './UserTypeActionCell';
import UserTypeForm from './UserTypeForm';

const { Search } = Input;

const { Column, HeaderCell, Cell } = Table;

const UserTypeContainer = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [userType, setUserType] = useState<UserGenreType | null>(null);
  const [userTypeList, setUserTypeList] = useState<UserGenreType[]>([]);
  const [search, setSearch] = useState<string>('');

  const dispatch = useAppDispatch();
  const [modalData, setModalData] = useState({
    title: 'Sửa loại người dùng',
    key: 'update-user-type',
  });

  const handleOpen = async (userType: UserGenreType) => {
    setUserType(userType);
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
  } = usePagination(userTypeList);

  useEffect(() => {
    async function fetchBrandList() {
      try {
        const success = await handleRefreshToken(dispatch);

        if (success) {
          const res = await userTypeService.getAll({
            search,
          });

          setUserTypeList(res);
        } else {
          router.replace('/login');
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    fetchBrandList();
  }, [search]);

  const handleSearching = async (value: string) => {
    if (!value) return;

    setSearch(value);
  };

  const handleAdding = () => {
    setModalData({
      title: 'Thêm loại người dùng',
      key: 'add-user-type',
    });
    setUserType(null);
    setAdd(true);
    setOpen(true);
  };

  return (
    <div className="user-types-table">
      <div className="user-types-table_header">
        <div className="user-types-table_filter">
          <Space direction="vertical" size={12}>
            <Search placeholder="search" onSearch={handleSearching} />
          </Space>
          <div className="user-types-table_add-btn" onClick={handleAdding}>
            <PlusCircleIcon className="w-6 h-6"></PlusCircleIcon>
            <span className="font-semibold">Add New User Type</span>
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
            <Column width={400} align="center">
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="_id" />
            </Column>

            <Column sortable width={325} align="center">
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name"></Cell>
            </Column>

            <Column width={350} align="center">
              <HeaderCell>Created At</HeaderCell>
              <Cell dataKey="createdAt">
                {(rowData) => `${moment(rowData.createdAt).format('L')}`}
              </Cell>
            </Column>

            <Column width={500} align="center">
              <HeaderCell>Hành động</HeaderCell>
              <UserTypeActionCell
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
              total={userTypeList.length}
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
          {modalData.key === 'delete-user-type' && userType && (
            <p className="text-center">Bạn thật sự muốn xóa đơn hàng chứ?</p>
          )}
          {(modalData.key === 'add-user-type' ||
            modalData.key === 'update-user-type') && (
            <UserTypeForm
              add={add}
              handleClose={handleClose}
              userType={userType}
            ></UserTypeForm>
          )}
        </Modal.Body>
        {modalData.key === 'delete-user-type' && userType && (
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

export default UserTypeContainer;
