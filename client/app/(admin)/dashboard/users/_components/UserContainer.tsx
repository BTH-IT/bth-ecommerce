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
import { UserType } from '@/types/auth';
import userService from '@/services/userService';
import UserActionCell from './UserActionCell';
import UserForm from './UserForm';
import PermissionHOC from '@/components/PermissionHOC';

const { Search } = Input;

const { Column, HeaderCell, Cell } = Table;

const UserContainer = () => {
  return PermissionHOC(() => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [add, setAdd] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);
    const [userList, setUserList] = useState<UserType[]>([]);
    const [search, setSearch] = useState<string>('');

    const dispatch = useAppDispatch();
    const [modalData, setModalData] = useState({
      title: 'Sửa người dùng',
      key: 'update-user',
    });

    const handleOpen = async (user: UserType) => {
      setUser(user);
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
    } = usePagination(userList);

    useEffect(() => {
      async function fetchUserList() {
        try {
          const success = await handleRefreshToken(dispatch);

          if (success) {
            const res = await userService.getAll({
              search,
            });

            setUserList(res);
          } else {
            router.replace('/login');
          }
        } catch (error: any) {
          toast.error(error.message);
        }
      }

      fetchUserList();
    }, [search]);

    const handleSearching = async (value: string) => {
      setSearch(value);
    };

    const handleAdding = () => {
      setModalData({
        title: 'Thêm người dùng',
        key: 'add-user',
      });
      setUser(null);
      setAdd(true);
      setOpen(true);
    };

    const handleRemoveUser = async () => {
      try {
        const success = await handleRefreshToken(dispatch);

        if (success) {
          if (user) {
            await userService.remove(user._id);
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
      <div className="users-table">
        <div className="users-table_header">
          <div className="users-table_filter">
            <Space direction="vertical" size={12}>
              <Search placeholder="search" onSearch={handleSearching} />
            </Space>
            <div className="users-table_add-btn" onClick={handleAdding}>
              <PlusCircleIcon className="w-6 h-6"></PlusCircleIcon>
              <span className="font-semibold">Add New User</span>
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

              <Column sortable width={200} align="center">
                <HeaderCell>Fullname</HeaderCell>
                <Cell dataKey="fullname"></Cell>
              </Column>

              <Column width={150} align="center">
                <HeaderCell>Gender</HeaderCell>
                <Cell dataKey="gender"></Cell>
              </Column>

              <Column width={150} align="center">
                <HeaderCell>Birth Year</HeaderCell>
                <Cell dataKey="birthYear"></Cell>
              </Column>

              <Column sortable width={200} align="center">
                <HeaderCell>Phone Number</HeaderCell>
                <Cell dataKey="phone"></Cell>
              </Column>

              <Column sortable width={200} align="center">
                <HeaderCell>Address</HeaderCell>
                <Cell dataKey="address"></Cell>
              </Column>

              <Column sortable width={300} align="center">
                <HeaderCell>Account Id</HeaderCell>
                <Cell dataKey="account">
                  {(rowData) => <span>{rowData.account._id}</span>}
                </Cell>
              </Column>

              <Column sortable width={200} align="center">
                <HeaderCell>Type</HeaderCell>
                <Cell dataKey="typo">
                  {(rowData) => <span>{rowData.type.name}</span>}
                </Cell>
              </Column>

              <Column width={300} align="center">
                <HeaderCell>Hành động</HeaderCell>
                <UserActionCell
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
                total={userList.length}
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
            {modalData.key === 'delete-user' && user && (
              <p className="text-center">Bạn thật sự muốn xóa đơn hàng chứ?</p>
            )}
            {(modalData.key === 'add-user' ||
              modalData.key === 'update-user') && (
              <UserForm
                add={add}
                handleClose={handleClose}
                user={user}
              ></UserForm>
            )}
          </Modal.Body>
          {modalData.key === 'delete-user' && user && (
            <Modal.Footer>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
              <Button onClick={handleRemoveUser} appearance="primary">
                Ok
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      </div>
    );
  });
};

export default UserContainer;
